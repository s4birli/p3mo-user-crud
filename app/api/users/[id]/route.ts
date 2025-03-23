import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { updateUserSchema } from '@/lib/validations';

// Create an API client to forward requests to the real database
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * GET /api/users/[id]
 * Belirli bir kullanıcıyı ID'ye göre getirir
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Wait for the params object to resolve first
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
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

/**
 * PUT /api/users/[id]
 * Belirli bir kullanıcıyı günceller
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Wait for the params object to resolve first
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        const userData = await request.json();
        
        // Zod ile veri doğrulama
        const validationResult = updateUserSchema.safeParse(userData);
        
        // Doğrulama başarısız olursa
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.format();
            return NextResponse.json(
                { 
                    message: "Validation failed", 
                    errors: formattedErrors 
                },
                { status: 400 }
            );
        }
        
        // Doğrulanmış veriyi kullan
        const validatedData = validationResult.data;
        
        // Backend API çağrısı
        const response = await apiClient.put(`/users/${id}`, validatedData);
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

/**
 * DELETE /api/users/[id]
 * Belirli bir kullanıcıyı siler
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Wait for the params object to resolve first
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
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