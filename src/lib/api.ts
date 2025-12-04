const API_BASE = 'https://functions.poehali.dev';

const ENDPOINTS = {
  stonApi: '642ee3bc-a747-4ccb-a424-0452b2caa09b',
  wallets: 'cee39a26-ff5e-41d1-8754-bab51883297a',
  transactions: '179704ce-6b18-4d77-a9f5-d048bf2b0801',
};

export const api = {
  getStonMarkets: async () => {
    const response = await fetch(
      `${API_BASE}/${ENDPOINTS.stonApi}?endpoint=markets`
    );
    if (!response.ok) throw new Error('Failed to fetch markets');
    return response.json();
  },

  getStonPools: async () => {
    const response = await fetch(
      `${API_BASE}/${ENDPOINTS.stonApi}?endpoint=pools`
    );
    if (!response.ok) throw new Error('Failed to fetch pools');
    return response.json();
  },

  registerWallet: async (address: string, walletType: string) => {
    const response = await fetch(`${API_BASE}/${ENDPOINTS.wallets}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, wallet_type: walletType }),
    });
    if (!response.ok) throw new Error('Failed to register wallet');
    return response.json();
  },

  getWallet: async (address: string) => {
    const response = await fetch(
      `${API_BASE}/${ENDPOINTS.wallets}?address=${address}`
    );
    if (!response.ok) throw new Error('Failed to fetch wallet');
    return response.json();
  },

  getTransactions: async (walletAddress?: string, limit: number = 50) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (walletAddress) params.append('wallet_address', walletAddress);
    
    const response = await fetch(
      `${API_BASE}/${ENDPOINTS.transactions}?${params}`
    );
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  createTransaction: async (data: {
    tx_hash: string;
    wallet_address: string;
    tx_type: string;
    from_token: string;
    to_token: string;
    from_amount: string;
    to_amount: string;
    rate: string;
    status?: string;
    pool_address?: string;
    fee_ton?: string;
    slippage?: string;
  }) => {
    const response = await fetch(`${API_BASE}/${ENDPOINTS.transactions}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  },
};
