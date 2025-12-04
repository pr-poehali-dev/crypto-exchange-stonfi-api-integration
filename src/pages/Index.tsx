import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import SwapWidget from '@/components/SwapWidget';
import PoolsCard from '@/components/PoolsCard';
import TransactionHistory from '@/components/TransactionHistory';
import WalletConnect from '@/components/WalletConnect';
import FAQ from '@/components/FAQ';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        <section className="text-center space-y-4 py-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-gradient-shift">
            Обменивайте криптовалюту
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Лучшие курсы из множества пулов ликвидности STON.fi
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-sm">247 активных пулов</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
              <span className="text-sm">📊 Объём $45.2M за 24ч</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
              <span className="text-sm">⚡ Комиссия от 0.3%</span>
            </div>
          </div>
        </section>

        <StatsCard />

        <section id="swap" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SwapWidget />
          </div>
          <div>
            <PoolsCard />
          </div>
        </section>

        <section id="history" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>
          <div id="wallet">
            <WalletConnect />
          </div>
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <footer className="text-center py-12 border-t border-border">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-xl">💎</span>
              </div>
              <span className="text-xl font-bold gradient-text">STON Exchange</span>
            </div>
            <p className="text-muted-foreground">
              Децентрализованная биржа на базе TON блокчейна
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <a href="#" className="hover:text-primary transition-colors">
                Документация
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Telegram
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Twitter
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 STON Exchange. Powered by STON.fi protocol
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
