import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "../../users/route";
import { User } from "@/types";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const user = mockUsers.find(u => u.id === id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching user" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const userData = await request.json();
        const userIndex = mockUsers.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Update user properties
        const user = mockUsers[userIndex];
        const updatedUser: User = {
            ...user,
            ...userData,
            id: user.id,
            role: userData.roleId ? getRoleName(userData.roleId) : user.role,
            updatedAt: new Date().toISOString()
        };

        mockUsers[userIndex] = updatedUser;

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating user" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const userIndex = mockUsers.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        mockUsers.splice(userIndex, 1);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting user" },
            { status: 500 }
        );
    }
}

// Helper function to get role name from ID
function getRoleName(roleId: number): "Admin" | "User" | "Guest" {
    switch (roleId) {
        case 1:
            return "Admin";
        case 2:
            return "User";
        case 3:
            return "Guest";
        default:
            return "User"; // Default role
    }
} 