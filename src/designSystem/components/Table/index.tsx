import React, { forwardRef } from 'react';
import { cn } from '../../../core/utils';
import { IconChevronLeft, IconChevronRight } from '../../components/Icon';

// ----------------------------------------------------------------------
// Table Container
// ----------------------------------------------------------------------

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('overflow-x-auto scrollbar-none', className)} {...props}>
                {children}
            </div>
        );
    }
);
TableContainer.displayName = 'TableContainer';

// ----------------------------------------------------------------------
// Table
// ----------------------------------------------------------------------

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <table ref={ref} className={cn('w-full min-w-[800px] table-fixed', className)} {...props}>
                {children}
            </table>
        );
    }
);
Table.displayName = 'Table';

// ----------------------------------------------------------------------
// Table Head
// ----------------------------------------------------------------------

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <thead ref={ref} className={cn('bg-neutral-500/5', className)} {...props}>
                {children}
            </thead>
        );
    }
);
TableHead.displayName = 'TableHead';

// ----------------------------------------------------------------------
// Table Body
// ----------------------------------------------------------------------

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <tbody ref={ref} className={cn('divide-y divide-border-subtle/50', className)} {...props}>
                {children}
            </tbody>
        );
    }
);
TableBody.displayName = 'TableBody';

// ----------------------------------------------------------------------
// Table Row
// ----------------------------------------------------------------------

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
    selected?: boolean;
    hover?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ className, children, selected, hover = true, ...props }, ref) => {
        return (
            <tr
                ref={ref}
                className={cn(
                    'transition-colors duration-200',
                    hover && 'hover:bg-neutral-500/5',
                    selected && 'bg-primary-500/10 hover:bg-primary-500/15',
                    className
                )}
                {...props}
            >
                {children}
            </tr>
        );
    }
);
TableRow.displayName = 'TableRow';

// ----------------------------------------------------------------------
// Table Cell
// ----------------------------------------------------------------------

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
    align?: 'left' | 'center' | 'right' | 'justify';
    type?: 'th' | 'td';
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ className, children, align = 'left', type = 'td', ...props }, ref) => {
        const Component = type;
        return (
            <Component
                ref={ref}
                className={cn(
                    'px-4 py-4 text-sm whitespace-nowrap',
                    type === 'th' && 'text-text-secondary font-semibold text-xs uppercase tracking-wider h-14 bg-background-base/80 backdrop-blur-md sticky top-0 z-10',
                    type === 'td' && 'text-text-primary',
                    align === 'center' && 'text-center',
                    align === 'right' && 'text-right',
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
TableCell.displayName = 'TableCell';

// ----------------------------------------------------------------------
// Table Pagination
// ----------------------------------------------------------------------

export interface TablePaginationProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange?: (newRowsPerPage: number) => void;
    rowsPerPageOptions?: number[];
    className?: string;
}

export function TablePagination({
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions = [5, 10, 25],
    className,
}: TablePaginationProps) {
    const totalPages = Math.ceil(count / rowsPerPage);
    const startRow = page * rowsPerPage + 1;
    const endRow = Math.min((page + 1) * rowsPerPage, count);

    return (
        <div className={cn('flex items-center justify-end border-t border-border-dashed p-4 gap-4 md:gap-8 flex-wrap', className)}>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>Rows per page:</span>
                <select
                    value={rowsPerPage}
                    onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
                    className="bg-transparent border-none outline-none font-semibold text-text-primary cursor-pointer focus:ring-0"
                >
                    {rowsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-text-secondary">
                    {startRow}-{endRow} of {count}
                </span>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 0}
                        className="p-1 rounded-full hover:bg-neutral-500/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                        <IconChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="p-1 rounded-full hover:bg-neutral-500/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                        <IconChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Custom Table Head Helper
// ----------------------------------------------------------------------

export interface TableHeadCustomProps {
    headLabel: Array<{ id: string; label: string; align?: 'left' | 'center' | 'right'; width?: string | number }>;
    rowCount?: number;
    numSelected?: number;
    onSelectAllRows?: (checked: boolean) => void;
}

export function TableHeadCustom({
    headLabel,
    rowCount = 0,
    numSelected = 0,
    onSelectAllRows,
}: TableHeadCustomProps) {
    return (
        <TableHead>
            <TableRow hover={false}>
                {onSelectAllRows && (
                    <TableCell type="th" className="w-[48px] px-0 pl-4">
                        <input
                            type="checkbox"
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={(e) => onSelectAllRows(e.target.checked)}
                            className="w-4 h-4 rounded border-border-default text-primary-600 focus:ring-primary-500"
                        />
                    </TableCell>
                )}

                {headLabel.map((head) => (
                    <TableCell
                        key={head.id}
                        type="th"
                        align={head.align || 'left'}
                        style={{ width: head.width, minWidth: head.width }}
                    >
                        {head.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
