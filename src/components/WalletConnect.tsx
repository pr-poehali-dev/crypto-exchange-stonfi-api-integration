import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useTonConnectUI, useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function WalletConnect() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();

  useEffect(() => {
    if (wallet && address) {
      api.registerWallet(address, wallet.name || 'unknown')
        .then(() => {
          toast.success('Кошелёк успешно подключён!');
        })
        .catch((error) => {
          console.error('Failed to register wallet:', error);
        });
    }
  }, [wallet, address]);

  const handleConnect = async () => {
    try {
      await tonConnectUI.openModal();
    } catch (error) {
      toast.error('Ошибка подключения кошелька');
      console.error('Connection error:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      toast.success('Кошелёк отключён');
    } catch (error) {
      toast.error('Ошибка отключения');
      console.error('Disconnect error:', error);
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  if (wallet && address) {
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-2xl">
              💎
            </div>
            <div>
              <p className="font-semibold text-lg">{wallet.name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {formatAddress(address)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Статус</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <p className="text-sm font-semibold">Подключён</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Сеть</p>
              <p className="text-sm font-semibold">TON Mainnet</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground">
            Используйте кошелёк для обмена токенов
          </p>
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

      <Button
        onClick={handleConnect}
        className="w-full h-16 text-lg bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 transition-all glow-effect"
      >
        <Icon name="Wallet" size={24} className="mr-3" />
        Подключить TON кошелёк
      </Button>

      <div className="space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Icon name="Check" size={16} className="text-success" />
          Поддержка всех TON кошельков
        </p>
        <p className="flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-success" />
          Безопасное подключение через TON Connect
        </p>
        <p className="flex items-center gap-2">
          <Icon name="Lock" size={16} className="text-success" />
          Приватные ключи всегда у вас
        </p>
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
