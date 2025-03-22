import { UserStats } from '@/types';
import ActiveUsersChart from '@/components/charts/ActiveUsersChart';
import RoleDistributionChart from '@/components/charts/RoleDistributionChart';
import MonthlyRegistrationsChart from '@/components/charts/MonthlyRegistrationsChart';

interface UserDashboardProps {
    stats: UserStats;
    isLoading: boolean;
}

export default function UserDashboard({ stats, isLoading }: UserDashboardProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ActiveUsersChart
                activeCount={stats.activeCount}
                inactiveCount={stats.inactiveCount}
            />
            <RoleDistributionChart
                roleDistribution={stats.roleDistribution}
            />
            <MonthlyRegistrationsChart
                monthlyRegistrations={stats.monthlyRegistrations}
            />
        </div>
    );
} 