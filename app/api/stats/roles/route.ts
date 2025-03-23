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
 * GET /api/stats/roles
 * Kullanıcı rollerine göre dağılım istatistiklerini getirir
 */
export async function GET() {
  try {
    // Backend API çağrısı - doğru endpoint'e yönlendirme
    const response = await apiClient.get('/Stats/roles');
    
    // Yanıtı dön
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching role distribution stats:', error);
    return NextResponse.json(
      [],
      { status: 500 }
    );
  }
} 