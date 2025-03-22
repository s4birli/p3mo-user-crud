import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserTableProps {
    users: User[];
    isLoading: boolean;
}

export default function UserTable({ users, isLoading }: UserTableProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof User;
        direction: 'ascending' | 'descending';
    } | null>(null);

    // Filter users based on search term and role
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            searchTerm === '' ||
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.country.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === 'All' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    // Sort users based on sort config
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig) return 0;

        const key = sortConfig.key;

        // Handle undefined values with sensible defaults
        let aValue: any = a[key] ?? '';
        let bValue: any = b[key] ?? '';

        // Handle string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Request sort function
    const requestSort = (key: keyof User) => {
        let direction: 'ascending' | 'descending' = 'ascending';

        if (sortConfig && sortConfig.key === key) {
            direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        }

        setSortConfig({ key, direction });
    };

    // Get sort direction indicator
    const getSortDirectionIndicator = (key: keyof User) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    // Handle row click to navigate to user detail
    const handleRowClick = (userId: number) => {
        router.push(`/user/${userId}`);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="rounded-md border">
                <div className="h-24 animate-pulse bg-muted" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Input
                    placeholder="Search by name, email, country..."
                    className="max-w-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="w-full sm:w-[180px]">
                    <Select
                        value={roleFilter}
                        onValueChange={(value) => setRoleFilter(value as UserRole | 'All')}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Roles</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Guest">Guest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    onClick={() => requestSort('email')}
                                    className="w-full justify-start font-medium"
                                >
                                    Email {getSortDirectionIndicator('email')}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    onClick={() => requestSort('role')}
                                    className="w-full justify-start font-medium"
                                >
                                    Role {getSortDirectionIndicator('role')}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    onClick={() => requestSort('country')}
                                    className="w-full justify-start font-medium"
                                >
                                    Country {getSortDirectionIndicator('country')}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    onClick={() => requestSort('isActive')}
                                    className="w-full justify-start font-medium"
                                >
                                    Status {getSortDirectionIndicator('isActive')}
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    onClick={() => handleRowClick(user.id)}
                                    className="cursor-pointer hover:bg-muted/50"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                                                <AvatarFallback>
                                                    {user.firstName.charAt(0)}
                                                    {user.lastName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">
                                                    {user.firstName} {user.middleName ? `${user.middleName.charAt(0)}. ` : ''}
                                                    {user.lastName}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Created: {new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className={`
                      inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : ''}
                      ${user.role === 'User' ? 'bg-green-100 text-green-800' : ''}
                      ${user.role === 'Guest' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}>
                                            {user.role}
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.country}</TableCell>
                                    <TableCell>
                                        <div className={`
                      w-fit inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                      ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    `}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
} 