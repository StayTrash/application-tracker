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
                month: 'space-y-4 text-slate-800 dark:text-zinc-200',
                caption: 'flex justify-center pt-1 relative items-center mb-4',
                caption_label: 'text-sm font-semibold text-slate-800 dark:text-zinc-100',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                    'h-7 w-7 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-full flex items-center justify-center p-0 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all z-20'
                ),
                nav_button_previous: 'absolute left-1 top-1/2 -translate-y-1/2',
                nav_button_next: 'absolute right-1 top-1/2 -translate-y-1/2',
                table: 'flex flex-col space-y-2 border-collapse',
                head_row: 'grid grid-cols-7 mb-1',
                head_cell: 'text-center text-xs font-medium text-slate-500 dark:text-zinc-500 py-1 w-9',
                row: 'grid grid-cols-7 w-full mt-1 gap-1',
                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-indigo-50 dark:[&:has([aria-selected].day-outside)]:bg-indigo-500/10 [&:has([aria-selected])]:bg-indigo-50 dark:[&:has([aria-selected])]:bg-indigo-500/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: cn(
                    'h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md transition-all duration-200 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 active:scale-95 inline-flex items-center justify-center'
                ),
                day_selected:
                    'bg-indigo-600 text-white hover:bg-indigo-600 focus:bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 font-bold',
                selected:
                    'bg-indigo-600 text-white hover:bg-indigo-600 focus:bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 font-bold',
                day_today: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 font-semibold',
                today: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 font-semibold',
                day_outside: 'text-slate-300 dark:text-zinc-600 opacity-60 hover:opacity-100 transition-opacity',
                outside: 'text-slate-300 dark:text-zinc-600 opacity-60 hover:opacity-100 transition-opacity',
                day_disabled: 'text-slate-300 dark:text-zinc-600 opacity-30',
                disabled: 'text-slate-300 dark:text-zinc-600 opacity-30',
                day_range_middle:
                    'aria-selected:bg-indigo-100 dark:aria-selected:bg-indigo-500/20 aria-selected:text-indigo-700 dark:aria-selected:text-indigo-300',
                range_middle:
                    'aria-selected:bg-indigo-100 dark:aria-selected:bg-indigo-500/20 aria-selected:text-indigo-700 dark:aria-selected:text-indigo-300',
                day_range_start: 'bg-indigo-600 text-white hover:bg-indigo-600 focus:bg-indigo-600 shadow-md font-bold',
                range_start: 'bg-indigo-600 text-white hover:bg-indigo-600 focus:bg-indigo-600 shadow-md font-bold',
                day_range_end: 'bg-indigo-600 text-white hover:bg-indigo-600 focus:bg-indigo-600 shadow-md font-bold',
                range_end: 'bg-indigo-600 text-white hover:bg-indigo-600 focus:bg-indigo-600 shadow-md font-bold',
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
