import json
import urllib.request
import urllib.error
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Проксирует запросы к STON.fi API для получения курсов и пулов ликвидности
    Args: event - dict с httpMethod, queryStringParameters
          context - object с request_id, function_name
    Returns: HTTP response dict с данными пулов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    endpoint = params.get('endpoint', 'markets')
    
    ston_api_base = 'https://api.ston.fi/v1'
    
    try:
        if endpoint == 'markets':
            url = f'{ston_api_base}/markets'
        elif endpoint == 'assets':
            url = f'{ston_api_base}/assets'
        elif endpoint == 'pools':
            url = f'{ston_api_base}/pools'
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid endpoint'}),
                'isBase64Encoded': False
            }
        
        req = urllib.request.Request(url)
        req.add_header('Accept', 'application/json')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = response.read().decode('utf-8')
            result = json.loads(data)
        
        if isinstance(result, dict) and 'asset_list' in result:
            result['asset_list'] = result['asset_list'][:10]
        elif isinstance(result, list):
            result = result[:10]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    except urllib.error.HTTPError as e:
        return {
            'statusCode': e.code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'STON.fi API error: {e.reason}'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }