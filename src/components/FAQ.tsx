import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const faqs = [
  {
    question: 'Как работает агрегация пулов ликвидности?',
    answer:
      'Наш алгоритм анализирует курсы всех доступных пулов на STON.fi в реальном времени и автоматически выбирает лучший маршрут обмена с минимальным проскальзыванием и наименьшими комиссиями.',
  },
  {
    question: 'Какие комиссии взимаются за обмен?',
    answer:
      'Комиссия сети TON составляет около 0.05 TON за транзакцию. Дополнительно взимается комиссия пула (обычно 0.3%), которая распределяется между поставщиками ликвидности.',
  },
  {
    question: 'Безопасно ли подключать свой кошелёк?',
    answer:
      'Да, мы используем стандартные протоколы TON Connect. Мы никогда не храним ваши приватные ключи и не имеем доступа к средствам без вашего явного подтверждения каждой транзакции.',
  },
  {
    question: 'Что такое проскальзывание (slippage)?',
    answer:
      'Проскальзывание — это разница между ожидаемой ценой обмена и фактической. Мы устанавливаем толерантность проскальзывания 0.5% по умолчанию, но вы можете настроить это значение в настройках.',
  },
  {
    question: 'Как зарабатывать на предоставлении ликвидности?',
    answer:
      'Вы можете добавить свои токены в пулы ликвидности и получать процент от каждой транзакции в этом пуле. APY варьируется от 30% до 60% в зависимости от пула.',
  },
];

export default function FAQ() {
  return (
    <Card className="glass-card p-6 space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold gradient-text">Часто задаваемые вопросы</h2>
      <p className="text-muted-foreground">
        Ответы на популярные вопросы о работе платформы
      </p>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
