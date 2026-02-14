import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type UserRole = 'Admin' | 'Manager' | 'User';
export type UserStatus = 'Active' | 'Inactive' | 'Banned' | 'Pending';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar?: string;
    phoneNumber?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    company?: string;
    isVerified?: boolean;
    joinDate: string;
}

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchUsers: () => Promise<void>;
    createUser: (user: Omit<User, 'id' | 'joinDate'>) => Promise<void>;
    updateUser: (id: string, updates: Partial<User>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    deleteManyUsers: (ids: string[]) => Promise<void>;
}

// Mock initial data
const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        role: 'Admin',
        status: 'Active',
        joinDate: '2024-01-15',
        phoneNumber: '+1 234 567 890',
        country: 'USA',
        company: 'Acme Corp',
        isVerified: true
    },
    {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.c@company.com',
        role: 'Manager',
        status: 'Active',
        joinDate: '2024-02-20',
        phoneNumber: '+1 987 654 321',
        country: 'Canada',
        company: 'TechFlow',
        isVerified: true
    },
    {
        id: '3',
        name: 'Emily Davis',
        email: 'emily.d@company.com',
        role: 'User',
        status: 'Active',
        joinDate: '2024-03-10',
        country: 'UK',
        isVerified: true
    },
    {
        id: '4',
        name: 'Alex Turner',
        email: 'alex.t@company.com',
        role: 'User',
        status: 'Inactive',
        joinDate: '2023-12-05',
        country: 'Australia',
        isVerified: false
    },
    {
        id: '5',
        name: 'Jessica Lee',
        email: 'jessica.l@company.com',
        role: 'Manager',
        status: 'Active',
        joinDate: '2024-01-25',
        country: 'Singapore',
        isVerified: true
    },
];

const SIMULATED_DELAY = 800;

export const useUserStore = create<UserState>((set, get) => ({
    users: MOCK_USERS,
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
            // In a real app, this would be an API call
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch users' });
        }
    },

    createUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

            const newUser: User = {
                ...userData,
                id: uuidv4(),
                joinDate: new Date().toISOString(),
            };

            set(state => ({
                users: [newUser, ...state.users],
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to create user' });
            throw error;
        }
    },

    updateUser: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

            set(state => ({
                users: state.users.map(user =>
                    user.id === id ? { ...user, ...updates } : user
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to update user' });
            throw error;
        }
    },

    deleteUser: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

            set(state => ({
                users: state.users.filter(user => user.id !== id),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to delete user' });
            throw error;
        }
    },

    deleteManyUsers: async (ids) => {
        set({ isLoading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

            set(state => ({
                users: state.users.filter(user => !ids.includes(user.id)),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to delete users' });
            throw error;
        }
    }
}));
