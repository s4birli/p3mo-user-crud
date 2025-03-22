export type UserRole = 'Admin' | 'User' | 'Guest';

export interface User {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    role: UserRole;
    isActive: boolean;
    country: string;
    createdAt: string;
    avatarUrl?: string;
}

export interface UserFormData extends Omit<User, 'id' | 'createdAt' | 'avatarUrl'> {
    avatarFile?: File;
}

export interface UserStats {
    activeCount: number;
    inactiveCount: number;
    roleDistribution: {
        Admin: number;
        User: number;
        Guest: number;
    };
    monthlyRegistrations: {
        month: string;
        count: number;
    }[];
} 