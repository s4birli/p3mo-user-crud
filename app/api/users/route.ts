import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { userApiSchema } from '@/lib/validations';

// Create an API client to forward requests to the real database
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * GET /api/users
 * Kullanıcıların listesini getirir
 */
export async function GET() {
  try {
    // Backend API çağrısı
    const response = await apiClient.get('/users');
    
    // Yanıtı dön
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * Yeni kullanıcı oluşturur
 */
export async function POST(request: NextRequest) {
  try {
    // İstek gövdesini al
    const body = await request.json();
    
    // Zod validasyonu
    const validationResult = userApiSchema.safeParse(body);
    
    // Validasyon hatası varsa
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
    
    // Validasyon başarılıysa, veriyi backend'e ilet
    const validatedData = validationResult.data;
    
    // Backend API çağrısı
    const response = await apiClient.post('/users', validatedData);
    
    // Başarılı yanıt
    return NextResponse.json(response.data, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Hata işleme
    console.error('Error creating user:', error);
    
    // Backend'den gelen hata yanıtını ilet
    if (error.response) {
      return NextResponse.json(
        { message: error.response.data.message || 'Error creating user' },
        { status: error.response.status || 500 }
      );
    }
    
    // Genel hata yanıtı
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
} 