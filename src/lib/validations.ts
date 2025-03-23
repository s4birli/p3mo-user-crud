import { z } from 'zod';
import { UserRole } from '@/types';

export const userSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    dateOfBirth: z.string()
        .refine((value) => {
            // First check if format matches YYYY-MM-DD pattern
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(value)) {
                return false;
            }
            
            // Then check if the date is valid
            try {
                const [year, month, day] = value.split('-').map(Number);
                
                // JavaScript months are 0-indexed, so we subtract 1 from the month
                const date = new Date(year, month - 1, day);
                
                // Check if the date is valid by comparing the components
                return (
                    date.getFullYear() === year &&
                    date.getMonth() === month - 1 &&
                    date.getDate() === day &&
                    !isNaN(date.getTime())
                );
            } catch {
                return false;
            }
        }, "Invalid date format. Must be in YYYY-MM-DD format"),
    roleId: z.number().int().positive("Role ID must be a positive number"),
    isActive: z.boolean(),
    country: z.string().min(2, "Country must be at least 2 characters"),
}); 