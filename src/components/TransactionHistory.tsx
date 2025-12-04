import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';
import { useTonAddress } from '@tonconnect/ui-react';

interface Transaction {
  id: number;
  tx_hash: string;
  wallet_address: string;
  tx_type: string;
  from_token: string;
  to_token: string;
  from_amount: string;
  to_amount: string;
  rate: string;
  status: string;
  pool_address: string | null;
  fee_ton: string | null;
  slippage: string | null;
  created_at: string;
  completed_at: string | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-success border-success';
    case 'pending':
      return 'text-warning border-warning';
    case 'failed':
      return 'text-destructive border-destructive';
    default:
      return 'text-muted-foreground border-border';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Завершено';
    case 'pending':
      return 'В процессе';
    case 'failed':
      return 'Ошибка';
    default:
      return status;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'swap':
      return 'ArrowRightLeft';
    case 'add':
      return 'Plus';
    case 'remove':
      return 'Minus';
    default:
      return 'ArrowRightLeft';
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'только что';
  if (diffMins < 60) return `${diffMins} минут назад`;
  if (diffHours < 24) return `${diffHours} час${diffHours === 1 ? '' : 'а/ов'} назад`;
  return `${diffDays} день/дня/дней назад`;
};

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const address = useTonAddress();

  useEffect(() => {
    loadTransactions();
  }, [address]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await api.getTransactions(address || undefined, 10);
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">История транзакций</h2>
        <button 
          onClick={loadTransactions}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Обновить
          <Icon name="RefreshCw" size={16} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Icon name="Loader2" size={32} className="animate-spin text-primary" />
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            {address ? 'У вас пока нет транзакций' : 'Подключите кошелёк для просмотра транзакций'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Icon name={getTypeIcon(tx.tx_type) as any} size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-mono text-xs">{tx.tx_hash.slice(0, 12)}...</p>
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(tx.created_at)}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(tx.status)}>
                  {getStatusText(tx.status)}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{tx.from_amount} {tx.from_token}</span>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                  <span className="font-medium">{tx.to_amount} {tx.to_token}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Курс: {parseFloat(tx.rate).toFixed(4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Icon name="Clock" size={16} />
        Обновлено только что
      </div>
    </Card>
  );
}
