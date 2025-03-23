import { NextResponse } from "next/server";
import axios from 'axios';

// Create an API client to forward requests to the real database
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function GET() {
    try {
        // Get user statistics from the real API
        const response = await apiClient.get('/users/stats');
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return NextResponse.json(
            { message: "Error fetching user stats" },
            { status: 500 }
        );
    }
} 