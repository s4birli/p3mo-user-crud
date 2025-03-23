import { NextResponse } from "next/server";
import { User, UserStats } from "@/types";

// Using the mock users from the previous route
// In a real application, you would import from a database or context
import { mockUsers } from "../route";

export async function GET() {
    try {
        const stats = calculateUserStats(mockUsers);
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching user stats" },
            { status: 500 }
        );
    }
}

// Helper function to calculate stats
function calculateUserStats(users: User[]): UserStats {
    // Active vs Inactive
    const activeCount = users.filter(user => user.isActive).length;
    const inactiveCount = users.length - activeCount;

    // Role distribution
    const roleDistribution = {
        Admin: users.filter(user => user.role === 'Admin').length,
        User: users.filter(user => user.role === 'User').length,
        Guest: users.filter(user => user.role === 'Guest').length,
    };

    // Monthly registrations
    const monthlyData = users.reduce((acc: { [key: string]: number }, user) => {
        const date = new Date(user.createdAt);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

        if (!acc[monthYear]) {
            acc[monthYear] = 0;
        }

        acc[monthYear]++;
        return acc;
    }, {});

    // Convert to array and sort by date
    const monthlyRegistrations = Object.entries(monthlyData)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => a.month.localeCompare(b.month));

    return {
        activeCount,
        inactiveCount,
        roleDistribution,
        monthlyRegistrations,
    };
} 