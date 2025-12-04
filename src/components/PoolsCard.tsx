import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Pool {
  name: string;
  rate: number;
  liquidity: string;
  volume24h: string;
  apy: number;
  impact: number;
}

const pools: Pool[] = [
  {
    name: 'TON/USDT',
    rate: 1.8543,
    liquidity: '$12.5M',
    volume24h: '$3.2M',
    apy: 45.2,
    impact: 0.02,
  },
  {
    name: 'TON/jUSDT',
    rate: 1.8521,
    liquidity: '$8.3M',
    volume24h: '$1.8M',
    apy: 38.5,
    impact: 0.05,
  },
  {
    name: 'STON/TON',
    rate: 1.8498,
    liquidity: '$5.1M',
    volume24h: '$950K',
    apy: 52.1,
    impact: 0.08,
  },
];

export default function PoolsCard() {
  return (
    <Card className="glass-card p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">Лучшие пулы</h2>
        <Badge variant="outline" className="text-success border-success">
          <Icon name="TrendingUp" size={14} className="mr-1" />
          Live
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        Агрегируем лучшие курсы из множества пулов ликвидности
      </p>

      <div className="space-y-3">
        {pools.map((pool, index) => (
          <div
            key={pool.name}
            className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-primary/50"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{pool.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Ликвидность: {pool.liquidity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">{pool.rate.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground">Курс</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Объём 24ч</p>
                <p className="font-semibold">{pool.volume24h}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">APY</p>
                <p className="font-semibold text-success">{pool.apy}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Влияние</p>
                <p className="font-semibold text-warning">{pool.impact}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <Icon name="Zap" size={16} className="text-warning" />
            Автовыбор лучшего пула
          </span>
          <Badge variant="secondary" className="bg-neon-purple/20">
            Активно
          </Badge>
        </div>
      </div>
    </Card>
  );
}
