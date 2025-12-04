import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
}

const tokens: Token[] = [
  { symbol: 'TON', name: 'Toncoin', icon: '💎', balance: 125.5 },
  { symbol: 'USDT', name: 'Tether USD', icon: '💵', balance: 1500.0 },
  { symbol: 'jUSDT', name: 'Jetton USDT', icon: '🪙', balance: 2340.5 },
  { symbol: 'STON', name: 'STON Token', icon: '🔷', balance: 5000 },
];

export default function SwapWidget() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [rate, setRate] = useState(1.85);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fromAmount) {
      const calculated = (parseFloat(fromAmount) * rate).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  }, [fromAmount, rate]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setRate(1 / rate);
  };

  const handleSwap = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFromAmount('');
      setToAmount('');
    }, 2000);
  };

  return (
    <Card className="glass-card p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">Обмен</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Icon name="Settings" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Icon name="History" size={20} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Отдаёте</span>
            <span>Баланс: {fromToken.balance} {fromToken.symbol}</span>
          </div>
          <div className="gradient-border">
            <div className="flex items-center gap-3 p-4">
              <Button variant="outline" className="flex items-center gap-2 min-w-[120px]">
                <span className="text-2xl">{fromToken.icon}</span>
                <span className="font-semibold">{fromToken.symbol}</span>
                <Icon name="ChevronDown" size={16} />
              </Button>
              <Input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="text-right text-2xl font-bold border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <Button
            size="icon"
            variant="outline"
            onClick={handleSwapTokens}
            className="rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all hover:rotate-180 duration-300"
          >
            <Icon name="ArrowDownUp" size={20} />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Получаете</span>
            <span>Баланс: {toToken.balance} {toToken.symbol}</span>
          </div>
          <div className="gradient-border">
            <div className="flex items-center gap-3 p-4">
              <Button variant="outline" className="flex items-center gap-2 min-w-[120px]">
                <span className="text-2xl">{toToken.icon}</span>
                <span className="font-semibold">{toToken.symbol}</span>
                <Icon name="ChevronDown" size={16} />
              </Button>
              <Input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="text-right text-2xl font-bold border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4 rounded-lg bg-muted/50">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Курс</span>
          <span className="font-semibold">1 {fromToken.symbol} = {rate.toFixed(4)} {toToken.symbol}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Комиссия сети</span>
          <span className="font-semibold text-success">~0.05 TON</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Проскальзывание</span>
          <span className="font-semibold">0.5%</span>
        </div>
      </div>

      <Button
        onClick={handleSwap}
        disabled={!fromAmount || isLoading}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 transition-all glow-effect"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Icon name="Loader2" size={20} className="animate-spin" />
            Обработка...
          </div>
        ) : (
          'Обменять'
        )}
      </Button>
    </Card>
  );
}
