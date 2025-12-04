import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

const navItems = [
  { label: 'Обмен', href: '#swap', icon: 'ArrowRightLeft' },
  { label: 'Пулы', href: '#pools', icon: 'Waves' },
  { label: 'История', href: '#history', icon: 'History' },
  { label: 'Кошельки', href: '#wallet', icon: 'Wallet' },
  { label: 'FAQ', href: '#faq', icon: 'HelpCircle' },
];

export default function Header() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const handleWalletAction = async () => {
    if (wallet) {
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center animate-glow">
            <span className="text-2xl font-bold">💎</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">STON Exchange</h1>
            <p className="text-xs text-muted-foreground">Powered by STON.fi</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              <Button variant="ghost" className="gap-2">
                <Icon name={item.icon as any} size={16} />
                {item.label}
              </Button>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="hidden md:flex">
            <Icon name="Bell" size={20} />
          </Button>
          <Button 
            onClick={handleWalletAction}
            className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
          >
            <Icon name={wallet ? "LogOut" : "Wallet"} size={16} className="mr-2" />
            {wallet ? "Отключить" : "Подключить"}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
}
