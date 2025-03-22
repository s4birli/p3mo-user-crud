import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "../route";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = parseInt(params.id);

        // In a real application, this would call a backend API
        // const response = await fetch(`https://your-backend.com/api/users/${userId}`);
        // const user = await response.json();

        // Instead, we'll find the user in our mock data
        const user = mockUsers.find(user => user.id === userId);

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { message: 'Error fetching user' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = parseInt(params.id);
        const userData = await request.json();

        // In a real application, this would call a backend API
        // const response = await fetch(`https://your-backend.com/api/users/${userId}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(userData)
        // });
        // const updatedUser = await response.json();

        // Instead, we'll update the user in our mock data
        const userIndex = mockUsers.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Update user data, preserving the ID
        mockUsers[userIndex] = {
            ...mockUsers[userIndex],
            ...userData,
            id: userId // Ensure ID remains the same
        };

        return NextResponse.json(mockUsers[userIndex]);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { message: 'Error updating user' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = parseInt(params.id);

        // In a real application, this would call a backend API
        // const response = await fetch(`https://your-backend.com/api/users/${userId}`, {
        //   method: 'DELETE'
        // });

        // Instead, we'll remove the user from our mock data
        const userIndex = mockUsers.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const deletedUser = mockUsers[userIndex];
        mockUsers.splice(userIndex, 1);

        return NextResponse.json(
            { message: 'User deleted successfully', user: deletedUser }
        );
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { message: 'Error deleting user' },
            { status: 500 }
        );
    }
} 