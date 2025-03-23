export type UserRole = 'Admin' | 'User' | 'Guest';

// Interface that defines role information
export interface Role {
    id: number;
    name: string;
    description: string;
}

// User model returned by the API
export interface User {
    id: number;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    role: UserRole;
    roleId: number;
    isActive: boolean;
    country: string;
    createdAt: string;
}

// Model used for the form
export interface UserFormData {
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    roleId: number;
    isActive: boolean;
    country: string;
}

// Structure of statistical data for the Dashboard
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