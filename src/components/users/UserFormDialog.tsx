import { useState } from 'react';
import { User, UserFormData } from '@/types';
import UserForm from '@/components/forms/UserForm';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import useApi from '@/hooks/useApi';

interface UserFormDialogProps {
    user?: User;
    onSuccess?: () => void;
    trigger?: React.ReactNode;
}

export default function UserFormDialog({ user, onSuccess, trigger }: UserFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [{ isLoading }, { post, upload }] = useApi<User>();

    const handleSubmit = async (data: UserFormData) => {
        try {
            if (data.avatarFile) {
                // If there's a file, use FormData and the upload method
                const formData = new FormData();

                // Add all user data to form
                Object.entries(data).forEach(([key, value]) => {
                    if (key !== 'avatarFile' && value !== undefined) {
                        if (typeof value === 'boolean') {
                            formData.append(key, value.toString());
                        } else {
                            formData.append(key, value as string);
                        }
                    }
                });

                // Add the file
                if (data.avatarFile) {
                    formData.append('avatarFile', data.avatarFile);
                }

                await upload('/api/users', formData);
            } else {
                // Regular JSON submission without file
                await post('/api/users', data);
            }

            toast.success('User saved successfully!');
            setOpen(false);

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error saving user:', error);
            toast.error('Failed to save user. Please try again.');
        }
    };

    const title = user ? 'Edit User' : 'Add New User';
    const description = user
        ? 'Update the user information below.'
        : 'Fill in the user details below to create a new user.';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button>Add User</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[675px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <UserForm
                        defaultValues={user}
                        isSubmitting={isLoading}
                        onSubmit={handleSubmit}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
} 