import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

// Create an API client to forward requests to the real database
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * GET /api/roles/[id]
 * Belirli bir rolü ID'ye göre getirir
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Wait for the params object to resolve first
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        const response = await apiClient.get(`/Roles/${id}`);
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        // Check if it's a 404 error
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 
            'status' in error.response && error.response.status === 404) {
            return NextResponse.json(
                { message: "Role not found" },
                { status: 404 }
            );
        }

        console.error('Error fetching role:', error);
        return NextResponse.json(
            { message: "Error fetching role" },
            { status: 500 }
        );
    }
} 