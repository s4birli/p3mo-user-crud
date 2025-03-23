import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

// Create an API client to forward requests to the real database
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const response = await apiClient.get(`/users/${id}`);
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        // Check if it's a 404 error
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 
            'status' in error.response && error.response.status === 404) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        console.error('Error fetching user:', error);
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
        const id = params.id;
        const userData = await request.json();
        const response = await apiClient.put(`/users/${id}`, userData);
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        // Check if it's a 404 error
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 
            'status' in error.response && error.response.status === 404) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        console.error('Error updating user:', error);
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
        const id = params.id;
        await apiClient.delete(`/users/${id}`);
        return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
        // Check if it's a 404 error
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 
            'status' in error.response && error.response.status === 404) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        console.error('Error deleting user:', error);
        return NextResponse.json(
            { message: "Error deleting user" },
            { status: 500 }
        );
    }
} 