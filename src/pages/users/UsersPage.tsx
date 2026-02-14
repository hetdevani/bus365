import { useState, useEffect } from 'react';
import { PageLayout } from '../../designSystem/layouts/PageLayout';
import {
    Card,
    Button,
    EmptyState,
    Select,
    toast,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHeadCustom,
    TablePagination,
    TableRow,
    Label,
    TableToolbar,
    ConfirmDialog
} from '../../designSystem';
import {
    IconPlus,
    IconUsers,
    IconCheck,
    IconChart,
    IconEdit,
    IconTrash
} from '../../designSystem/components/Icon';
import { cn } from '../../core/utils';
import { AnimatePresence } from 'framer-motion';
import { useUserStore, type User } from '../../store/userStore';
import { UserDrawer, type DrawerMode } from './components/UserDrawer';

/**
 * Users Page
 * 
 * Advanced user management with Drawer, Store, and Bulk Actions.
 */
export default function UsersPage() {
    const { users, isLoading, fetchUsers, createUser, updateUser, deleteUser, deleteManyUsers } = useUserStore();

    // UI State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<DrawerMode>('create');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Dialog State
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

    // Table State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Filtering
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const paginatedUsers = filteredUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Handlers
    const handleOpenCreate = () => {
        setDrawerMode('create');
        setSelectedUser(null);
        setIsDrawerOpen(true);
    };

    const handleOpenEdit = (user: User) => {
        setDrawerMode('edit');
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const handleOpenView = (user: User) => {
        setDrawerMode('view');
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const handleSubmit = async (data: Omit<User, 'id' | 'joinDate'>) => {
        try {
            if (drawerMode === 'create') {
                await createUser(data);
                toast.success('User created successfully');
            } else if (drawerMode === 'edit' && selectedUser) {
                await updateUser(selectedUser.id, data);
                toast.success('User updated successfully');
            }
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteUser(deleteId);
            setDeleteId(null);
            toast.success('User disabled');
        }
    };

    const handleBulkDelete = async () => {
        await deleteManyUsers(selected);
        setSelected([]);
        setIsBulkDeleteOpen(false);
        toast.success(`${selected.length} users deleted`);
    };

    return (
        <PageLayout title="User Management">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-text-primary tracking-tight">Team Overview</h2>
                        <p className="text-text-secondary mt-1">Manage institutional roles and access levels</p>
                    </div>
                    <Button
                        variant="primary"
                        size="lg"
                        leftIcon={<IconPlus size={20} />}
                        onClick={handleOpenCreate}
                        className="shadow-xl shadow-primary-500/20"
                    >
                        Provision New Member
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Platform Users', value: users.length, icon: <IconUsers />, color: 'primary' },
                        { label: 'Active Sessions', value: users.filter(u => u.status === 'Active').length, icon: <IconCheck />, color: 'success' },
                        { label: 'Privileged Access', value: users.filter(u => u.role === 'Admin').length, icon: <IconPlus />, color: 'danger' },
                        { label: 'Operational Teams', value: '4', icon: <IconChart />, color: 'warning' },
                    ].map((stat, i) => (
                        <Card
                            key={i}
                            className={cn(
                                "overflow-hidden border-none shadow-none transition-transform hover:-translate-y-1",
                                stat.color === 'primary' && 'bg-[#C8FACD] text-[#005249]',
                                stat.color === 'success' && 'bg-[#D3FCD2] text-[#065E49]',
                                stat.color === 'danger' && 'bg-[#FFE7D9] text-[#7A0C2E]',
                                stat.color === 'warning' && 'bg-[#FFF7CD] text-[#7A4F01]',
                            )}
                        >
                            <div className="p-6 flex flex-col items-start gap-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center text-white mb-2",
                                    stat.color === 'primary' && 'bg-[#007B55]',
                                    stat.color === 'success' && 'bg-[#118D57]',
                                    stat.color === 'danger' && 'bg-[#B71D18]',
                                    stat.color === 'warning' && 'bg-[#B76E00]',
                                )}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                                    <p className="text-sm font-bold opacity-70 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Main Content Area */}
                <Card variant="elevated" className="border-none shadow-premium overflow-hidden">
                    <TableToolbar
                        numSelected={selected.length}
                        filterName={searchQuery}
                        onFilterName={(e) => setSearchQuery(e.target.value)}
                        onDeleteRows={() => setIsBulkDeleteOpen(true)}
                        placeholder="Search users..."
                        actions={
                            <div className="flex gap-2">
                                <Select
                                    value={selectedRole}
                                    onChange={setSelectedRole}
                                    options={[
                                        { value: 'all', label: 'Every Role' },
                                        { value: 'Admin', label: 'Administrators' },
                                        { value: 'Manager', label: 'Management' },
                                        { value: 'User', label: 'Operations' },
                                    ]}
                                    className="w-40"
                                />
                                <Select
                                    value={selectedStatus}
                                    onChange={setSelectedStatus}
                                    options={[
                                        { value: 'all', label: 'Any Status' },
                                        { value: 'Active', label: 'Active' },
                                        { value: 'Inactive', label: 'Inactive' },
                                        { value: 'Pending', label: 'Pending' },
                                        { value: 'Banned', label: 'Banned' },
                                    ]}
                                    className="w-40"
                                />
                            </div>
                        }
                    />

                    <TableContainer>
                        <Table>
                            <TableHeadCustom
                                headLabel={[
                                    { id: 'name', label: 'Identity' },
                                    { id: 'role', label: 'Authorization' },
                                    { id: 'status', label: 'State' },
                                    { id: 'joinDate', label: 'Affiliation Date' },
                                    { id: 'actions', label: '', align: 'right' },
                                ]}
                                rowCount={filteredUsers.length}
                                numSelected={selected.length}
                                onSelectAllRows={(checked) =>
                                    setSelected(checked ? filteredUsers.map((u) => u.id) : [])
                                }
                            />

                            <TableBody>
                                <AnimatePresence mode="popLayout">
                                    {isLoading ? (
                                        // Loading Skeleton
                                        [...Array(5)].map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell colSpan={6}>
                                                    <div className="animate-pulse flex items-center gap-4 py-2">
                                                        <div className="w-10 h-10 bg-neutral-200 rounded-full" />
                                                        <div className="space-y-2 flex-1">
                                                            <div className="h-4 bg-neutral-200 rounded w-1/4" />
                                                            <div className="h-3 bg-neutral-200 rounded w-1/3" />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : paginatedUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" className="py-20">
                                                <EmptyState
                                                    title="No Operatives Found"
                                                    description="Adjust your verification parameters or provision a new team member."
                                                    action={{
                                                        label: 'Clear All Parameters',
                                                        onClick: () => {
                                                            setSearchQuery('');
                                                            setSelectedRole('all');
                                                            setSelectedStatus('all');
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedUsers.map((user) => (
                                            <TableRow
                                                key={user.id}
                                                hover
                                                selected={selected.includes(user.id)}
                                                className="group"
                                            >
                                                <TableCell className="w-[48px] px-0 pl-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(user.id)}
                                                        onChange={() => {
                                                            const newSelected = selected.includes(user.id)
                                                                ? selected.filter((id) => id !== user.id)
                                                                : [...selected, user.id];
                                                            setSelected(newSelected);
                                                        }}
                                                        className="w-4 h-4 rounded border-border-default text-primary-600 focus:ring-primary-500"
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <div
                                                        className="flex items-center gap-4 cursor-pointer"
                                                        onClick={() => handleOpenView(user)}
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center text-text-primary font-bold shadow-inner uppercase text-sm">
                                                            {user.name.substring(0, 2)}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm text-text-primary group-hover:text-primary-600 transition-colors">{user.name}</p>
                                                            <p className="text-xs text-text-tertiary">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <Label color={user.role === 'Admin' ? 'primary' : user.role === 'Manager' ? 'secondary' : 'default'} variant="soft">
                                                        {user.role}
                                                    </Label>
                                                </TableCell>

                                                <TableCell>
                                                    <Label
                                                        color={
                                                            user.status === 'Active' ? 'success' :
                                                                user.status === 'Banned' ? 'error' :
                                                                    user.status === 'Pending' ? 'warning' : 'default'
                                                        }
                                                        variant="soft"
                                                    >
                                                        {user.status}
                                                    </Label>
                                                </TableCell>

                                                <TableCell>
                                                    {new Date(user.joinDate).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-8 h-8 p-0 text-text-secondary hover:text-primary-600"
                                                            onClick={() => handleOpenEdit(user)}
                                                        >
                                                            <IconEdit size={16} />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-8 h-8 p-0 text-text-secondary hover:text-danger-600"
                                                            onClick={() => setDeleteId(user.id)}
                                                        >
                                                            <IconTrash size={16} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        count={filteredUsers.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setPage}
                        onRowsPerPageChange={setRowsPerPage}
                    />
                </Card>
            </div>

            {/* Drawers & Dialogs */}
            <UserDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                mode={drawerMode}
                user={selectedUser}
                onSubmit={handleSubmit}
                onEdit={handleOpenEdit}
            />

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Disable User Account?"
                description="This action will restrict the user's access to the platform. It can be reversed later."
                confirmLabel="Disable Account"
                loading={isLoading}
            />

            <ConfirmDialog
                isOpen={isBulkDeleteOpen}
                onClose={() => setIsBulkDeleteOpen(false)}
                onConfirm={handleBulkDelete}
                title={`Delete ${selected.length} Users?`}
                description="Are you sure you want to permanently delete these users? This action cannot be undone."
                confirmLabel="Delete All"
                variant="danger"
                loading={isLoading}
            />
        </PageLayout>
    );
}
