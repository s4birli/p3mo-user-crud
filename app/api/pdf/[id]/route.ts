import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

// Create an API client to forward requests to the backend PDF service
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * GET /api/pdf/[id]
 * Belirli bir kullanıcı için PDF dosyası oluşturur ve döndürür
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Wait for the params object to resolve first
        const id = params.id;
        
        // Backend PDF API'sine yönlendir
        const response = await apiClient.get(`/Pdf/${id}`, {
            responseType: 'arraybuffer' // Binary dosya için gerekli
        });
        
        // Content-Type ve diğer header'ları backend'den al
        const headers = new Headers();
        
        // Content-Type header'ı ekle
        const contentType = response.headers['content-type'] || 'application/pdf';
        headers.append('Content-Type', contentType);
        
        // Content-Disposition header'ı ekle (dosya adı için)
        const contentDisposition = response.headers['content-disposition'] || `attachment; filename="user-${id}.pdf"`;
        headers.append('Content-Disposition', contentDisposition);
        
        // PDF dosyasını döndür
        return new NextResponse(response.data, {
            status: 200,
            headers: headers
        });
    } catch (error: unknown) {
        console.error('Error generating PDF:', error);
        
        // Hata türüne göre yanıt ver
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 
            'status' in error.response) {
            
            const status = error.response.status;
            
            if (status === 404) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }
        }
        
        return NextResponse.json(
            { message: "Error generating PDF" },
            { status: 500 }
        );
    }
} 