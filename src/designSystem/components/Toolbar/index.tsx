import { IconSearch, IconTrash } from '../../components/Icon';
import { Button } from '../../components/Button';

// ----------------------------------------------------------------------

export interface TableToolbarProps {
    numSelected?: number;
    filterName?: string;
    onFilterName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteRows?: () => void;
    placeholder?: string;
    actions?: React.ReactNode;
}

export function TableToolbar({
    numSelected = 0,
    filterName,
    onFilterName,
    onDeleteRows,
    placeholder = 'Search...',
    actions,
}: TableToolbarProps) {
    if (numSelected > 0) {
        return (
            <div className="flex items-center justify-between p-4 bg-primary-500/5 text-primary-600 rounded-lg mb-2 animate-fade-in">
                <div className="flex items-center gap-2">
                    <h6 className="text-sm font-bold">{numSelected} selected</h6>
                </div>

                <div className="flex items-center gap-2">
                    {onDeleteRows && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDeleteRows}
                            className="text-danger-600 hover:text-danger-700 hover:bg-danger-500/10"
                        >
                            <IconTrash size={18} />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between p-6 gap-4 flex-wrap bg-background-base/30 backdrop-blur-sm border-b border-border-default">
            <div className="relative flex-1 max-w-md w-full">
                <IconSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                    size={20}
                />
                <input
                    value={filterName}
                    onChange={onFilterName}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2.5 bg-background-surface border border-border-default rounded-xl text-sm transition-all focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none placeholder:text-text-tertiary"
                />
            </div>

            <div className="flex items-center gap-2">
                {actions}
                {/* <Button variant="outline" size="icon">
                    <IconFilter size={20} />
                </Button> */}
            </div>
        </div>
    );
}
