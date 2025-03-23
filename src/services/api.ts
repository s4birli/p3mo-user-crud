import axios from 'axios';
import { User, UserFormData, UserStats, Role } from '@/types';

// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
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

// User API services
export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData: UserFormData): Promise<User> => {
    const transformedData = prepareUserForSubmission(userData);
    const response = await api.post<User>('/users', transformedData);
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
    
    const response = await api.put<User>(`/users/${id}`, updateData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Role API services
export const roleService = {
  // Get all roles
  getAllRoles: async (): Promise<Role[]> => {
    const response = await api.get<Role[]>('/roles');
    return response.data;
  },

  // Get role by ID
  getRoleById: async (id: number): Promise<Role> => {
    const response = await api.get<Role>(`/roles/${id}`);
    return response.data;
  },

  // Create new role
  createRole: async (roleData: Omit<Role, 'id'>): Promise<Role> => {
    const response = await api.post<Role>('/roles', roleData);
    return response.data;
  },

  // Update role
  updateRole: async (id: number, roleData: Partial<Omit<Role, 'id'>>): Promise<Role> => {
    const response = await api.put<Role>(`/roles/${id}`, roleData);
    return response.data;
  },

  // Delete role
  deleteRole: async (id: number): Promise<void> => {
    await api.delete(`/roles/${id}`);
  },
};

// PDF API services
export const pdfService = {
  // Generate user PDF (mocked)
  generateUserPdf: async (id: number): Promise<Blob> => {
    // This is a mock implementation that returns an empty PDF blob
    // In a real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call delay
    return new Blob(['PDF content for user ' + id], { type: 'application/pdf' });
  },
};

// Statistics API services
export const statsService = {
  // Fetch statistics required for dashboard
  getUserStats: async (): Promise<UserStats> => {
    try {
      // Active/inactive statistics
      const activeStatsResponse = await api.get('/stats/active');
      const activeStats = activeStatsResponse.data;

      // Role distribution statistics
      const roleDistResponse = await api.get('/stats/roles');
      const roleDistribution = roleDistResponse.data;

      // Monthly registration statistics
      const regStatsResponse = await api.get('/stats/registration');
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

      return {
        activeCount: activeStats.active,
        inactiveCount: activeStats.inactive,
        roleDistribution: roleCounts,
        monthlyRegistrations: monthlyRegs,
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw error;
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