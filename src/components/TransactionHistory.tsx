import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'swap' | 'add' | 'remove';
  from: string;
  to: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  time: string;
}

const transactions: Transaction[] = [
  {
    id: '#TXN-1234',
    type: 'swap',
    from: '125.5 TON',
    to: '232.5 USDT',
    amount: '$232.50',
    status: 'completed',
    time: '2 минуты назад',
  },
  {
    id: '#TXN-1233',
    type: 'swap',
    from: '50 USDT',
    to: '26.98 TON',
    amount: '$50.00',
    status: 'completed',
    time: '15 минут назад',
  },
  {
    id: '#TXN-1232',
    type: 'add',
    from: '100 TON',
    to: 'TON/USDT LP',
    amount: '$185.00',
    status: 'pending',
    time: '1 час назад',
  },
  {
    id: '#TXN-1231',
    type: 'swap',
    from: '500 STON',
    to: '270.4 TON',
    amount: '$500.00',
    status: 'completed',
    time: '3 часа назад',
  },
];

const getStatusColor = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return 'text-success border-success';
    case 'pending':
      return 'text-warning border-warning';
    case 'failed':
      return 'text-destructive border-destructive';
  }
};

const getStatusText = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return 'Завершено';
    case 'pending':
      return 'В процессе';
    case 'failed':
      return 'Ошибка';
  }
};

const getTypeIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'swap':
      return 'ArrowRightLeft';
    case 'add':
      return 'Plus';
    case 'remove':
      return 'Minus';
  }
};

export default function TransactionHistory() {
  return (
    <Card className="glass-card p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">История транзакций</h2>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          Показать всё
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

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
                  <Icon name={getTypeIcon(tx.type) as any} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{tx.id}</p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(tx.status)}>
                {getStatusText(tx.status)}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{tx.from}</span>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                <span className="font-medium">{tx.to}</span>
              </div>
              <span className="text-lg font-bold">{tx.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Icon name="Clock" size={16} />
        Обновлено только что
      </div>
    </Card>
  );
}
