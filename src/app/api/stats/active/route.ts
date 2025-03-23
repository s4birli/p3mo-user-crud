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
 * GET /api/stats/active
 * Aktif ve inaktif kullanıcı sayılarını getirir
 */
export async function GET() {
  try {
    // Backend API çağrısı - doğru endpoint'e yönlendirme
    const response = await apiClient.get('/Stats/active');
    
    // Yanıtı dön
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching active/inactive stats:', error);
    return NextResponse.json(
      { 
        message: "Error fetching active/inactive stats",
        active: 0,
        inactive: 0,
        total: 0
      },
      { status: 500 }
    );
  }
} 