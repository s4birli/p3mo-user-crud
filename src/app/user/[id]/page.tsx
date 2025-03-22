'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/types';
import UserDetail from '@/components/users/UserDetail';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock users data for demo
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
    }
];

export default function UserDetailPage() {
    const router = useRouter();
    const params = useParams();
    const userId = typeof params.id === 'string' ? parseInt(params.id) : 0;

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<Error | null>(null);

    // Load user data from dummy data
    useEffect(() => {
        if (!userId) return;

        // Simulate API loading delay
        const timer = setTimeout(() => {
            const foundUser = dummyUsers.find(u => u.id === userId);

            if (foundUser) {
                setUser(foundUser);
                setIsLoading(false);
            } else {
                setError(new Error("User not found"));
                setIsLoading(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [userId]);

    // If user ID is invalid, redirect to users page
    useEffect(() => {
        if (!userId) {
            router.push('/users');
        }
    }, [userId, router]);

    // Handle PDF generation separately for demo
    const handlePrintClick = () => {
        toast.success("PDF generation would happen in a real app!");
    };

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                    <Link href="/users">
                        <Button variant="outline">Back to Users</Button>
                    </Link>
                </div>
                <div className="h-[500px] rounded-lg bg-muted animate-pulse"></div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                    <Link href="/users">
                        <Button variant="outline">Back to Users</Button>
                    </Link>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                    <h3 className="text-lg font-semibold">Error Loading User</h3>
                    <p>The requested user could not be found or an error occurred.</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => router.push('/users')}
                    >
                        Return to User List
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                <Link href="/users">
                    <Button variant="outline">Back to Users</Button>
                </Link>
            </div>
            <UserDetail user={user} />
        </div>
    );
} 