import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Управление кошельками: регистрация, обновление последнего подключения
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с request_id, function_name
    Returns: HTTP response dict с данными кошелька
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
            address = params.get('address')
            
            if not address:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Address parameter required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT * FROM wallets WHERE address = %s",
                (address,)
            )
            
            wallet = cursor.fetchone()
            cursor.close()
            conn.close()
            
            if not wallet:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Wallet not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': wallet['id'],
                    'address': wallet['address'],
                    'wallet_type': wallet['wallet_type'],
                    'created_at': wallet['created_at'].isoformat() if wallet['created_at'] else None,
                    'last_connected': wallet['last_connected'].isoformat() if wallet['last_connected'] else None
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute(
                """
                INSERT INTO wallets (address, wallet_type)
                VALUES (%s, %s)
                ON CONFLICT (address) DO UPDATE 
                SET last_connected = CURRENT_TIMESTAMP
                RETURNING id, address, wallet_type, created_at, last_connected
                """,
                (body_data['address'], body_data['wallet_type'])
            )
            
            wallet = cursor.fetchone()
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
                    'id': wallet['id'],
                    'address': wallet['address'],
                    'wallet_type': wallet['wallet_type'],
                    'created_at': wallet['created_at'].isoformat(),
                    'last_connected': wallet['last_connected'].isoformat()
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute(
                """
                UPDATE wallets 
                SET last_connected = CURRENT_TIMESTAMP
                WHERE address = %s
                RETURNING id, address, last_connected
                """,
                (body_data['address'],)
            )
            
            wallet = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            
            if not wallet:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Wallet not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': wallet['id'],
                    'address': wallet['address'],
                    'last_connected': wallet['last_connected'].isoformat()
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
