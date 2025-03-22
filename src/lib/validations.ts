import { z } from 'zod';
import { UserRole } from '@/types';

export const userSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }).max(50),
    middleName: z.string().max(50).optional(),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }).max(50),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    dateOfBirth: z.string().refine((date) => {
        const today = new Date();
        const dob = new Date(date);
        const age = today.getFullYear() - dob.getFullYear();
        return age >= 18 && age <= 100;
    }, { message: 'User must be between 18 and 100 years old' }),
    role: z.enum(['Admin', 'User', 'Guest'] as const),
    isActive: z.boolean(),
    country: z.string().min(2, { message: 'Country must be at least 2 characters' }).max(56),
    avatarFile: z.instanceof(File).optional(),
}); 