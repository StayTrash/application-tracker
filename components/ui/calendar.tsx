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
                caption_label: 'text-sm font-semibold text-zinc-100',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                    'h-7 w-7 bg-zinc-800/50 border border-zinc-700/50 rounded-full flex items-center justify-center p-0 text-zinc-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/50 transition-all z-20 backdrop-blur-sm'
                ),
                nav_button_previous: 'absolute left-1 top-1/2 -translate-y-1/2',
                nav_button_next: 'absolute right-1 top-1/2 -translate-y-1/2',
                table: 'flex flex-col space-y-2 border-collapse',
                head_row: 'grid grid-cols-7 mb-1',
                head_cell: 'text-center text-xs font-medium text-zinc-500 py-1 w-9',
                row: 'grid grid-cols-7 w-full mt-1 gap-1',
                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-violet-900/20 [&:has([aria-selected])]:bg-violet-900/30 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: cn(
                    'h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-zinc-800 rounded-md transition-all duration-200 text-zinc-300 hover:text-white active:scale-95 inline-flex items-center justify-center hover:shadow-[0_0_10px_rgba(167,139,250,0.1)]'
                ),
                day_selected:
                    'bg-violet-600 text-white hover:bg-violet-600 focus:bg-violet-600 shadow-[0_0_15px_-3px_rgba(124,58,237,0.6)] font-bold border border-violet-500',
                selected:
                    'bg-violet-600 text-white hover:bg-violet-600 focus:bg-violet-600 shadow-[0_0_15px_-3px_rgba(124,58,237,0.6)] font-bold border border-violet-500',
                day_today: 'bg-zinc-800/50 text-violet-400 border border-violet-500/30 font-semibold',
                today: 'bg-zinc-800/50 text-violet-400 border border-violet-500/30 font-semibold',
                day_outside: 'text-zinc-700 opacity-40 hover:opacity-100 transition-opacity',
                outside: 'text-zinc-700 opacity-40 hover:opacity-100 transition-opacity',
                day_disabled: 'text-zinc-800 opacity-20',
                disabled: 'text-zinc-800 opacity-20',
                day_range_middle:
                    'aria-selected:bg-violet-900/40 aria-selected:text-violet-200 aria-selected:border-y aria-selected:border-violet-500/20',
                range_middle:
                    'aria-selected:bg-violet-900/40 aria-selected:text-violet-200 aria-selected:border-y aria-selected:border-violet-500/20',
                day_range_start: 'bg-violet-600 text-white hover:bg-violet-600 focus:bg-violet-600 shadow-md font-bold',
                range_start: 'bg-violet-600 text-white hover:bg-violet-600 focus:bg-violet-600 shadow-md font-bold',
                day_range_end: 'bg-violet-600 text-white hover:bg-violet-600 focus:bg-violet-600 shadow-md font-bold',
                range_end: 'bg-violet-600 text-white hover:bg-violet-600 focus:bg-violet-600 shadow-md font-bold',
                day_hidden: 'invisible',
                hidden: 'invisible',
                tbody: 'block',
                head: 'block',
                ...classNames,
            }}
            // components prop removed to use defaults or slots in v9
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
