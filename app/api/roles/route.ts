import { NextResponse } from "next/server";
import axios from 'axios';

// Create an API client to forward requests to the real database
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * GET /api/roles
 * Tüm rolleri getirir
 */
export async function GET() {
  try {
    // Backend API çağrısı
    const response = await apiClient.get('/Roles');
    
    // Yanıtı dön
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      [],
      { status: 500 }
    );
  }
} 