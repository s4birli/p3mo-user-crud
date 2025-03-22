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
    },
    {
        id: 9,
        firstName: "James",
        lastName: "Jackson",
        email: "james.jackson@example.com",
        dateOfBirth: "1986-04-10",
        role: "User",
        isActive: true,
        country: "Netherlands",
        createdAt: "2023-09-14T15:30:00Z",
    },
    {
        id: 10,
        firstName: "Jessica",
        middleName: "Ann",
        lastName: "White",
        email: "jessica.white@example.com",
        dateOfBirth: "1994-06-22",
        role: "Guest",
        isActive: false,
        country: "Sweden",
        createdAt: "2023-10-05T10:15:00Z",
        avatarUrl: "https://ui-avatars.com/api/?name=Jessica+White",
    },
];

export async function GET() {
    // In a real application, this would fetch from a backend API
    // const response = await fetch('https://your-backend.com/api/users');
    // const users = await response.json();

    return NextResponse.json(mockUsers);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Extract user data from form
        const firstName = formData.get('firstName') as string;
        const middleName = formData.get('middleName') as string || undefined;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const dateOfBirth = formData.get('dateOfBirth') as string;
        const role = formData.get('role') as 'Admin' | 'User' | 'Guest';
        const isActive = formData.get('isActive') === 'true';
        const country = formData.get('country') as string;

        // Handle file upload
        const avatarFile = formData.get('avatarFile') as File | null;
        let avatarUrl = undefined;

        if (avatarFile) {
            // In a real application, you would upload to a storage service
            // and get back a URL. For this demo, we'll use UI Avatars
            avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;

            // Example of how you would handle this with a real backend:
            // const backendResponse = await fetch('https://your-backend.com/api/upload', {
            //   method: 'POST',
            //   body: formData
            // });
            // const result = await backendResponse.json();
            // avatarUrl = result.avatarUrl;
        }

        // Create new user
        const newUser: User = {
            id: mockUsers.length + 1,
            firstName,
            middleName,
            lastName,
            email,
            dateOfBirth,
            role,
            isActive,
            country,
            createdAt: new Date().toISOString(),
            avatarUrl,
        };

        // In a real application, you would send the data to the backend
        // const response = await fetch('https://your-backend.com/api/users', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(newUser)
        // });

        // For this demo, we'll just add to our mock data
        mockUsers.push(newUser);

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { message: 'Error creating user' },
            { status: 500 }
        );
    }
} 