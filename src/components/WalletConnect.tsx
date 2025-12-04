import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Wallet {
  name: string;
  icon: string;
  connected: boolean;
}

const wallets: Wallet[] = [
  { name: 'Tonkeeper', icon: '💎', connected: false },
  { name: 'OpenMask', icon: '🎭', connected: false },
  { name: 'MyTonWallet', icon: '👛', connected: false },
  { name: 'Tonhub', icon: '🔷', connected: false },
];

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  const handleConnect = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setConnected(true);
  };

  const handleDisconnect = () => {
    setSelectedWallet(null);
    setConnected(false);
  };

  if (connected && selectedWallet) {
    return (
      <Card className="glass-card p-6 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">Кошелёк</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDisconnect}
            className="text-destructive hover:text-destructive"
          >
            <Icon name="LogOut" size={16} className="mr-2" />
            Отключить
          </Button>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-primary/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{selectedWallet.icon}</div>
            <div>
              <p className="font-semibold text-lg">{selectedWallet.name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                UQC...7xK9
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Баланс TON</p>
              <p className="text-xl font-bold">125.5</p>
            </div>
            <div className="p-3 rounded-lg bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">В USD</p>
              <p className="text-xl font-bold">$232.50</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-xl">💎</span>
              <span className="font-medium">TON</span>
            </div>
            <span className="font-bold">125.5</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-xl">💵</span>
              <span className="font-medium">USDT</span>
            </div>
            <span className="font-bold">1,500.0</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔷</span>
              <span className="font-medium">STON</span>
            </div>
            <span className="font-bold">5,000</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-6 space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold gradient-text text-center">
        Подключить кошелёк
      </h2>
      <p className="text-center text-muted-foreground">
        Выберите кошелёк для начала работы
      </p>

      <div className="space-y-3">
        {wallets.map((wallet) => (
          <Button
            key={wallet.name}
            variant="outline"
            onClick={() => handleConnect(wallet)}
            className="w-full h-16 justify-start gap-4 text-lg hover:bg-primary/10 hover:border-primary transition-all"
          >
            <span className="text-3xl">{wallet.icon}</span>
            <span className="font-semibold">{wallet.name}</span>
            <Icon name="ChevronRight" size={20} className="ml-auto" />
          </Button>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-center text-muted-foreground">
          Подключая кошелёк, вы соглашаетесь с{' '}
          <a href="#" className="text-primary hover:underline">
            условиями использования
          </a>
        </p>
      </div>
    </Card>
  );
}
