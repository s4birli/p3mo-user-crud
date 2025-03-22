'use client';

import { useState, useEffect } from 'react';
import { User, UserStats } from '@/types';
import UserDashboard from '@/components/dashboard/UserDashboard';
import UserTable from '@/components/users/UserTable';
import UserFormDialog from '@/components/users/UserFormDialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock users data
const dummyUsers: User[] = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        dateOfBirth: "1990-01-15",
        role: "Admin",
        isActive: true,
        country: "United States",
        createdAt: "2023-01-10T12:00:00Z",
        avatarUrl: "https://ui-avatars.com/api/?name=John+Doe",
    },
    {
        id: 2,
        firstName: "Jane",
        middleName: "Marie",
        lastName: "Smith",
        email: "jane.smith@example.com",
        dateOfBirth: "1992-05-20",
        role: "User",
        isActive: true,
        country: "Canada",
        createdAt: "2023-02-15T10:30:00Z",
        avatarUrl: "https://ui-avatars.com/api/?name=Jane+Smith",
    },
    {
        id: 3,
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        dateOfBirth: "1985-11-08",
        role: "Guest",
        isActive: false,
        country: "United Kingdom",
        createdAt: "2023-03-05T14:45:00Z",
    },
    {
        id: 4,
        firstName: "Emily",
        lastName: "Brown",
        email: "emily.brown@example.com",
        dateOfBirth: "1988-07-12",
        role: "User",
        isActive: true,
        country: "Australia",
        createdAt: "2023-04-20T09:15:00Z",
        avatarUrl: "https://ui-avatars.com/api/?name=Emily+Brown",
    },
    {
        id: 5,
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@example.com",
        dateOfBirth: "1995-03-25",
        role: "User",
        isActive: true,
        country: "Germany",
        createdAt: "2023-05-12T16:20:00Z",
    },
    {
        id: 6,
        firstName: "Sarah",
        middleName: "Elizabeth",
        lastName: "Martinez",
        email: "sarah.martinez@example.com",
        dateOfBirth: "1991-09-30",
        role: "Admin",
        isActive: true,
        country: "Spain",
        createdAt: "2023-06-08T11:10:00Z",
        avatarUrl: "https://ui-avatars.com/api/?name=Sarah+Martinez",
    },
    {
        id: 7,
        firstName: "Robert",
        lastName: "Anderson",
        email: "robert.anderson@example.com",
        dateOfBirth: "1987-12-05",
        role: "Guest",
        isActive: false,
        country: "France",
        createdAt: "2023-07-17T13:40:00Z",
    },
    {
        id: 8,
        firstName: "Lisa",
        lastName: "Thomas",
        email: "lisa.thomas@example.com",
        dateOfBirth: "1993-08-18",
        role: "User",
        isActive: true,
        country: "Italy",
        createdAt: "2023-08-22T08:55:00Z",
        avatarUrl: "https://ui-avatars.com/api/?name=Lisa+Thomas",
    }
];

// Mock stats data
const dummyStats: UserStats = {
    activeCount: 6,
    inactiveCount: 2,
    roleDistribution: {
        Admin: 2,
        User: 4,
        Guest: 2
    },
    monthlyRegistrations: [
        { month: "2023-01", count: 1 },
        { month: "2023-02", count: 1 },
        { month: "2023-03", count: 1 },
        { month: "2023-04", count: 1 },
        { month: "2023-05", count: 1 },
        { month: "2023-06", count: 1 },
        { month: "2023-07", count: 1 },
        { month: "2023-08", count: 1 }
    ]
};

export default function UsersPage() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState<UserStats>({
        activeCount: 0,
        inactiveCount: 0,
        roleDistribution: { Admin: 0, User: 0, Guest: 0 },
        monthlyRegistrations: []
    });

    // Load dummy data with a small delay to simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setUsers(dummyUsers);
            setStats(dummyStats);
            setIsLoadingUsers(false);
            setIsLoadingStats(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Handle adding a new user (dummy implementation)
    const handleUserAdded = () => {
        toast.success("User added successfully!");
        // In a real implementation, we would refresh the user list here
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">
                        View and manage all users in the system
                    </p>
                </div>
                <Button>Add User</Button>
            </div>

            {/* Dashboard Charts */}
            <UserDashboard stats={stats} isLoading={isLoadingStats} />

            {/* User Table */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <UserTable users={users} isLoading={isLoadingUsers} />
            </div>
        </div>
    );
} 