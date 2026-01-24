'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button'; // Assuming button component exists or will create utils? Wait, no button component yet.
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
                caption: 'flex justify-center pt-1 relative items-center mb-2',
                caption_label: 'text-sm font-semibold text-zinc-100 tracking-wide',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                    'h-7 w-7 bg-zinc-800/50 border border-zinc-700/50 rounded-md flex items-center justify-center p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600 transition-all z-10'
                ),
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'text-zinc-500 rounded-md w-9 font-medium text-[0.8rem] uppercase tracking-wider',
                row: 'flex w-full mt-2',
                cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-zinc-800/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: cn(
                    'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-zinc-800 rounded-md transition-colors text-zinc-300 hover:text-zinc-100'
                ),
                day_selected:
                    'bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white focus:bg-indigo-600 focus:text-white shadow-lg shadow-indigo-500/20 font-medium',
                day_today: 'bg-zinc-800/80 text-zinc-100 border border-zinc-700',
                day_outside: 'text-zinc-700 opacity-40',
                day_disabled: 'text-zinc-700 opacity-40',
                day_range_middle:
                    'aria-selected:bg-zinc-800 aria-selected:text-zinc-100',
                day_hidden: 'invisible',
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
            }}
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
