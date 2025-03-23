import axios from 'axios';
import { User, UserFormData, UserStats, Role } from '@/types';

// Frontend için Next.js API routes (BFF)
const BFF_API_URL = '/api';

// Frontend için axios instance - BFF üzerinden çağrı yapacak
const bffApi = axios.create({
  baseURL: BFF_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Prepare UserFormData for backend
const prepareUserForSubmission = (userData: UserFormData): Record<string, unknown> => {
  return {
    email: userData.email,
    isActive: userData.isActive,
    firstName: userData.firstName,
    middleName: userData.middleName || '',
    lastName: userData.lastName,
    dateOfBirth: userData.dateOfBirth,
    roleId: userData.roleId,
    country: userData.country
  };
};

// User API services - BFF üzerinden çağrı yapacak
export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await bffApi.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await bffApi.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData: UserFormData): Promise<User> => {
    const transformedData = prepareUserForSubmission(userData);
    const response = await bffApi.post<User>('/users', transformedData);
    return response.data;
  },

  // Update user
  updateUser: async (id: number, userData: Partial<UserFormData>): Promise<User> => {
    // Create partial update data
    const updateData: Record<string, unknown> = {};
    
    if (userData.email !== undefined) updateData.email = userData.email;
    if (userData.isActive !== undefined) updateData.isActive = userData.isActive;
    if (userData.firstName !== undefined) updateData.firstName = userData.firstName;
    if (userData.middleName !== undefined) updateData.middleName = userData.middleName;
    if (userData.lastName !== undefined) updateData.lastName = userData.lastName;
    if (userData.dateOfBirth !== undefined) updateData.dateOfBirth = userData.dateOfBirth;
    if (userData.roleId !== undefined) updateData.roleId = userData.roleId;
    if (userData.country !== undefined) updateData.country = userData.country;
    
    const response = await bffApi.put<User>(`/users/${id}`, updateData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    await bffApi.delete(`/users/${id}`);
  },
};

// Role API services
export const roleService = {
  // Get all roles
  getAllRoles: async (): Promise<Role[]> => {
    const response = await bffApi.get<Role[]>('/roles');
    return response.data;
  },

  // Get role by ID
  getRoleById: async (id: number): Promise<Role> => {
    const response = await bffApi.get<Role>(`/roles/${id}`);
    return response.data;
  },

  // Create new role
  createRole: async (roleData: Omit<Role, 'id'>): Promise<Role> => {
    const response = await bffApi.post<Role>('/roles', roleData);
    return response.data;
  },

  // Update role
  updateRole: async (id: number, roleData: Partial<Omit<Role, 'id'>>): Promise<Role> => {
    const response = await bffApi.put<Role>(`/roles/${id}`, roleData);
    return response.data;
  },

  // Delete role
  deleteRole: async (id: number): Promise<void> => {
    await bffApi.delete(`/roles/${id}`);
  },
};

// PDF API services
export const pdfService = {
  // Generate user PDF
  generateUserPdf: async (id: number): Promise<Blob> => {
    const response = await bffApi.get(`/pdf/${id}`, {
      responseType: 'blob'
    });
    return response.data;
  },
};

// Statistics API services
export const statsService = {
  // Fetch statistics required for dashboard
  getUserStats: async (): Promise<UserStats> => {
    try {
      // Active/inactive statistics
      const activeStatsResponse = await bffApi.get('/stats/active');
      const activeStats = activeStatsResponse.data;

      // Role distribution statistics
      const roleDistResponse = await bffApi.get('/stats/roles');
      const roleDistribution = roleDistResponse.data;

      // Monthly registration statistics
      const regStatsResponse = await bffApi.get('/stats/registration');
      const registrationStats = regStatsResponse.data;

      // Transform role distribution
      const roleCounts = {
        Admin: 0,
        User: 0,
        Guest: 0
      };

      // Process role distribution
      roleDistribution.forEach((item: { role: string; count: number }) => {
        if (item.role in roleCounts) {
          roleCounts[item.role as keyof typeof roleCounts] = item.count;
        }
      });

      // Transform registration statistics
      const monthlyRegs = registrationStats.map((item: { month: number; year: number; count: number }) => ({
        month: `${item.year}-${item.month.toString().padStart(2, '0')}`,
        count: item.count
      }));

      // Return combined stats
      return {
        active: activeStats.active || 0,
        inactive: activeStats.inactive || 0,
        roleDistribution: roleCounts,
        monthlyRegistrations: monthlyRegs
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Return default empty stats on error
      return {
        active: 0,
        inactive: 0,
        roleDistribution: {
          Admin: 0,
          User: 0,
          Guest: 0
        },
        monthlyRegistrations: []
      };
    }
  }
};

// Create an API object with all services
const apiServices = {
  user: userService,
  role: roleService,
  pdf: pdfService,
  stats: statsService,
};

export default apiServices; 