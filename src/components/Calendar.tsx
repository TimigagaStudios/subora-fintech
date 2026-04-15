import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CalendarView = ({ subscriptions }: { subscriptions: any[] }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Renewal Calendar</h1>
          <p className="text-text-secondary font-medium">Keep track of your upcoming payments across the year.</p>
        </div>
        <div className="flex items-center gap-4 bg-text-primary/5 p-2 rounded-2xl border border-border">
          <button onClick={prevMonth} className="p-2 hover:bg-text-primary/5 rounded-xl text-text-secondary hover:text-text-primary transition-all">
            <ChevronLeft size={20} />
          </button>
          <span className="text-lg font-black min-w-40 text-center uppercase">{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-text-primary/5 rounded-xl text-text-secondary hover:text-text-primary transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-px bg-border rounded-3xl overflow-hidden border border-border">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-secondary-background p-4 text-center text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] border-b border-border">
            {day}
          </div>
        ))}
        {/* Placeholder for days before month start */}
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-secondary-background/50 min-h-32" />
        ))}
        {days.map(day => {
          const daySubs = subscriptions.filter(sub => {
            const billingDate = new Date(sub.next_billing_date);
            return isSameDay(day, billingDate);
          });

          return (
            <div key={day.toString()} className="bg-secondary-background/80 min-h-32 p-3 group hover:bg-text-primary/5 transition-all relative">
               <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "text-sm font-black w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                    isSameDay(day, new Date()) ? "bg-accent text-black shadow-lg shadow-accent/20" : "text-text-secondary group-hover:text-text-primary"
                  )}>
                    {format(day, 'd')}
                  </span>
                  {daySubs.length > 0 && <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,153,0.5)] animate-pulse" />}
               </div>
               <div className="space-y-1.5 relative z-10">
                  {daySubs.map(sub => (
                    <div key={sub.id} className="p-2 bg-accent/10 border border-accent/20 rounded-xl text-[10px] font-black text-accent truncate uppercase tracking-tighter">
                       {sub.name} • ${sub.price}
                    </div>
                  ))}
               </div>
               {daySubs.length === 0 && (
                  <button className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-text-secondary/30 transition-all">
                     <Plus size={20} />
                  </button>
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
