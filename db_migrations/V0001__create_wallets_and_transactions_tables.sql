-- Таблица пользователей и их кошельков
CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    address VARCHAR(100) UNIQUE NOT NULL,
    wallet_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_connected TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица транзакций
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    tx_hash VARCHAR(100) UNIQUE NOT NULL,
    wallet_address VARCHAR(100) NOT NULL,
    tx_type VARCHAR(20) NOT NULL,
    from_token VARCHAR(50) NOT NULL,
    to_token VARCHAR(50) NOT NULL,
    from_amount DECIMAL(20, 8) NOT NULL,
    to_amount DECIMAL(20, 8) NOT NULL,
    rate DECIMAL(20, 8) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    pool_address VARCHAR(100),
    fee_ton DECIMAL(10, 6),
    slippage DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_transactions_wallet ON transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallets_address ON wallets(address);