'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
// Button import removed
// I will remove buttonVariants dependency for now and hardcode styles or create button component.
// Reverting to basic styles.

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4 text-zinc-100',
                caption: 'flex justify-center pt-1 relative items-center mb-4',
                caption_label: 'text-sm font-bold text-zinc-100 tracking-wide',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                    'h-8 w-8 bg-zinc-800 border border-zinc-700/50 rounded-full flex items-center justify-center p-0 text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all z-20 shadow-sm'
                ),
                nav_button_previous: 'absolute left-1 top-1/2 -translate-y-1/2',
                nav_button_next: 'absolute right-1 top-1/2 -translate-y-1/2',
                table: 'w-full border-collapse space-y-1',
                head_row: 'grid grid-cols-7 mb-2 w-full',
                head_cell: 'text-zinc-500 rounded-md w-9 font-semibold text-[0.75rem] uppercase tracking-wider flex items-center justify-center',
                row: 'grid grid-cols-7 w-full mt-2',
                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-zinc-800/30 first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl focus-within:relative focus-within:z-20 flex items-center justify-center',
                day: cn(
                    'h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-zinc-800 rounded-full transition-all duration-200 text-zinc-300 hover:text-zinc-50 hover:scale-110 active:scale-95 inline-flex items-center justify-center'
                ),
                day_selected:
                    'bg-indigo-600 text-white hover:bg-indigo-500 focus:bg-indigo-600 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] font-bold ring-2 ring-indigo-500/20 scale-100',
                day_today: 'bg-zinc-800/50 text-indigo-400 border border-indigo-500/50 font-semibold',
                day_outside: 'text-zinc-700 opacity-40 hover:opacity-100 transition-opacity',
                day_disabled: 'text-zinc-800 opacity-20',
                day_range_middle:
                    'aria-selected:bg-zinc-800 aria-selected:text-zinc-100',
                day_hidden: 'invisible',
                ...classNames,
            }}
            // components prop removed to use defaults or slots in v9
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
