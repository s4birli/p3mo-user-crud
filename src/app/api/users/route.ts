import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

// Simulating database with mock data
export const mockUsers: User[] = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        dateOfBirth: "1990-01-15",
        role: "Admin",
        roleId: 1,
        isActive: true,
        country: "United States",
        createdAt: "2023-01-10T12:00:00Z",
    },
    {
        id: 2,
        firstName: "Jane",
        middleName: "Marie",
        lastName: "Smith",
        email: "jane.smith@example.com",
        dateOfBirth: "1992-05-20",
        role: "User",
        roleId: 2,
        isActive: true,
        country: "United Kingdom",
        createdAt: "2023-02-15T10:30:00Z",
    },
    {
        id: 3,
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.j@example.com",
        dateOfBirth: "1985-11-10",
        role: "User",
        roleId: 2,
        isActive: false,
        country: "Canada",
        createdAt: "2023-03-20T09:15:00Z",
    },
    {
        id: 4,
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah.w@example.com",
        dateOfBirth: "1995-07-22",
        role: "Guest",
        roleId: 3,
        isActive: true,
        country: "Australia",
        createdAt: "2023-04-05T14:45:00Z",
    },
    {
        id: 5,
        firstName: "David",
        middleName: "Robert",
        lastName: "Brown",
        email: "david.brown@example.com",
        dateOfBirth: "1988-09-30",
        role: "Admin",
        roleId: 1,
        isActive: true,
        country: "Germany",
        createdAt: "2023-05-12T11:20:00Z",
    },
    {
        id: 6,
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.d@example.com",
        dateOfBirth: "1993-03-15",
        role: "User",
        roleId: 2,
        isActive: true,
        country: "France",
        createdAt: "2023-06-22T13:10:00Z",
    },
    {
        id: 7,
        firstName: "James",
        lastName: "Wilson",
        email: "james.w@example.com",
        dateOfBirth: "1991-12-05",
        role: "Guest",
        roleId: 3,
        isActive: false,
        country: "Spain",
        createdAt: "2023-07-30T08:45:00Z",
    },
    {
        id: 8,
        firstName: "Olivia",
        middleName: "Grace",
        lastName: "Taylor",
        email: "olivia.t@example.com",
        dateOfBirth: "1994-08-17",
        role: "User",
        roleId: 2,
        isActive: true,
        country: "Italy",
        createdAt: "2023-08-10T15:30:00Z",
    },
    {
        id: 9,
        firstName: "Daniel",
        lastName: "Anderson",
        email: "daniel.a@example.com",
        dateOfBirth: "1987-04-25",
        role: "Admin",
        roleId: 1,
        isActive: true,
        country: "Japan",
        createdAt: "2023-09-18T10:00:00Z",
    },
    {
        id: 10,
        firstName: "Sophia",
        lastName: "Martinez",
        email: "sophia.m@example.com",
        dateOfBirth: "1996-02-10",
        role: "User",
        roleId: 2,
        isActive: true,
        country: "Brazil",
        createdAt: "2023-10-25T12:15:00Z",
    },
];

// Helper to generate an ID for new users
let nextUserId = mockUsers.length + 1;

export async function GET() {
    return NextResponse.json(mockUsers);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Basic validation
        if (!body.firstName || !body.lastName || !body.email) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create new user with incremented ID
        const newUser: User = {
            id: nextUserId++,
            firstName: body.firstName,
            middleName: body.middleName || undefined,
            lastName: body.lastName,
            email: body.email,
            dateOfBirth: body.dateOfBirth,
            role: getRoleName(body.roleId),
            roleId: body.roleId,
            isActive: body.isActive ?? true,
            country: body.country,
            createdAt: new Date().toISOString(),
        };

        // Add to mock database
        mockUsers.push(newUser);

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error creating user' },
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