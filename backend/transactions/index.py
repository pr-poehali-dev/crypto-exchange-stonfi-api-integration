import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Управление транзакциями: создание, получение истории
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с request_id, function_name
    Returns: HTTP response dict с данными транзакций
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Wallet-Address',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            wallet_address = params.get('wallet_address')
            limit = int(params.get('limit', 50))
            
            if wallet_address:
                cursor.execute(
                    "SELECT * FROM transactions WHERE wallet_address = %s ORDER BY created_at DESC LIMIT %s",
                    (wallet_address, limit)
                )
            else:
                cursor.execute(
                    "SELECT * FROM transactions ORDER BY created_at DESC LIMIT %s",
                    (limit,)
                )
            
            transactions = cursor.fetchall()
            
            result = []
            for tx in transactions:
                result.append({
                    'id': tx['id'],
                    'tx_hash': tx['tx_hash'],
                    'wallet_address': tx['wallet_address'],
                    'tx_type': tx['tx_type'],
                    'from_token': tx['from_token'],
                    'to_token': tx['to_token'],
                    'from_amount': str(tx['from_amount']),
                    'to_amount': str(tx['to_amount']),
                    'rate': str(tx['rate']),
                    'status': tx['status'],
                    'pool_address': tx['pool_address'],
                    'fee_ton': str(tx['fee_ton']) if tx['fee_ton'] else None,
                    'slippage': str(tx['slippage']) if tx['slippage'] else None,
                    'created_at': tx['created_at'].isoformat() if tx['created_at'] else None,
                    'completed_at': tx['completed_at'].isoformat() if tx['completed_at'] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'transactions': result}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute(
                """
                INSERT INTO transactions 
                (tx_hash, wallet_address, tx_type, from_token, to_token, from_amount, to_amount, rate, status, pool_address, fee_ton, slippage)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, tx_hash, created_at
                """,
                (
                    body_data['tx_hash'],
                    body_data['wallet_address'],
                    body_data.get('tx_type', 'swap'),
                    body_data['from_token'],
                    body_data['to_token'],
                    body_data['from_amount'],
                    body_data['to_amount'],
                    body_data['rate'],
                    body_data.get('status', 'pending'),
                    body_data.get('pool_address'),
                    body_data.get('fee_ton'),
                    body_data.get('slippage')
                )
            )
            
            result = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': result['id'],
                    'tx_hash': result['tx_hash'],
                    'created_at': result['created_at'].isoformat()
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
