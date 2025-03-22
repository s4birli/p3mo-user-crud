import { useState } from 'react';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface UserDetailProps {
    user: User;
}

interface PdfResponse {
    downloadUrl: string;
    fileName: string;
}

export default function UserDetail({ user }: UserDetailProps) {
    const [downloadProgress, setDownloadProgress] = useState<{
        isGenerating: boolean;
        isDownloading: boolean;
    }>({
        isGenerating: false,
        isDownloading: false,
    });

    const generatePDF = async () => {
        try {
            // Simulate PDF generation
            setDownloadProgress({ isGenerating: true, isDownloading: false });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            setDownloadProgress({ isGenerating: false, isDownloading: true });

            // Simulate download delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset state
            setDownloadProgress({ isGenerating: false, isDownloading: false });

            toast.success('In a real app, the PDF would be downloaded now!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            setDownloadProgress({ isGenerating: false, isDownloading: false });
            toast.error('Error simulating PDF generation');
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <CardTitle className="text-2xl">{user.firstName} {user.middleName} {user.lastName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={generatePDF}
                        disabled={downloadProgress.isGenerating || downloadProgress.isDownloading}
                    >
                        {downloadProgress.isGenerating
                            ? 'Generating PDF...'
                            : downloadProgress.isDownloading
                                ? 'Downloading...'
                                : 'Print User Details'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Avatar and Basic Info */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <Avatar className="h-24 w-24">
                        <AvatarImage
                            src={user.avatarUrl}
                            alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback className="text-xl">
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center md:text-left">
                        <h3 className="font-medium">Role</h3>
                        <p className={`
              inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : ''}
              ${user.role === 'User' ? 'bg-green-100 text-green-800' : ''}
              ${user.role === 'Guest' ? 'bg-yellow-100 text-yellow-800' : ''}
            `}>
                            {user.role}
                        </p>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="font-medium">Status</h3>
                        <p className={`
              inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
            `}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                </div>

                {/* User Details */}
                <div className="col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-muted-foreground">Full Name</h3>
                            <p className="mt-1">
                                {user.firstName} {user.middleName ? `${user.middleName} ` : ''}{user.lastName}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-muted-foreground">Email</h3>
                            <p className="mt-1">{user.email}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-muted-foreground">Date of Birth</h3>
                            <p className="mt-1">{formatDate(user.dateOfBirth)}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-muted-foreground">Country</h3>
                            <p className="mt-1">{user.country}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-muted-foreground">Created At</h3>
                            <p className="mt-1">{formatDate(user.createdAt)}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-muted-foreground">Account Status</h3>
                            <p className="mt-1">{user.isActive ? 'Active' : 'Inactive'}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
                <div className="text-sm text-muted-foreground">
                    User ID: {user.id}
                </div>
            </CardFooter>
        </Card>
    );
} 