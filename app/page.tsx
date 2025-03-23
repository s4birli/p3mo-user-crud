'use client';

import { useState, useEffect } from 'react';
import { UserStats } from '@/types';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { statsService } from '@/services/api';
import { toast } from 'sonner';

export default function Home() {
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    active: 0,
    inactive: 0,
    roleDistribution: { Admin: 0, User: 0, Guest: 0 },
    monthlyRegistrations: []
  });

  // Load statistics from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const statsData = await statsService.getUserStats();
        setStats(statsData);
      } catch {
        toast.error("Statistics could not be loaded. Please try again later.");
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto space-y-8 py-10">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
        <UserDashboard stats={stats} isLoading={isLoadingStats} />
      </div>
    </div>
  );
}
