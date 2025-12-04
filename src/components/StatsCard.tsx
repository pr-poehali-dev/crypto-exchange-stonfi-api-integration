import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Stat {
  label: string;
  value: string;
  change: number;
  icon: string;
}

const stats: Stat[] = [
  { label: 'Объём 24ч', value: '$45.2M', change: 12.5, icon: 'TrendingUp' },
  { label: 'Всего транзакций', value: '125,432', change: 8.3, icon: 'ArrowRightLeft' },
  { label: 'Активные пулы', value: '247', change: 5.1, icon: 'Waves' },
  { label: 'TVL', value: '$186M', change: 15.7, icon: 'CircleDollarSign' },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
              <Icon name={stat.icon as any} size={24} className="text-primary" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                stat.change > 0 ? 'text-success' : 'text-destructive'
              }`}
            >
              <Icon
                name={stat.change > 0 ? 'TrendingUp' : 'TrendingDown'}
                size={16}
              />
              {Math.abs(stat.change)}%
            </div>
          </div>

          <div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
