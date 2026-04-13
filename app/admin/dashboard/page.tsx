'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Send,
  LogOut,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  totalSubmissions: number;
  newSubmissions: number;
  completedProjects: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalSubmissions: 0,
    newSubmissions: 0,
    completedProjects: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminData');

    if (!token || !admin) {
      router.push('/admin');
      return;
    }

    setAdminData(JSON.parse(admin));
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Fetch submissions
      const submissionsRes = await fetch('/api/submissions');
      const submissionsData = await submissionsRes.json();

      // Fetch projects
      const projectsRes = await fetch('/api/projects');
      const projectsData = await projectsRes.json();

      if (submissionsData.success && projectsData.success) {
        const submissions = submissionsData.data;
        const projects = projectsData.data;

        setStats({
          totalProjects: projects.length,
          totalSubmissions: submissions.length,
          newSubmissions: submissions.filter((s: any) => s.status === 'new').length,
          completedProjects: projects.filter((p: any) => p.status === 'published').length,
        });

        setRecentSubmissions(submissions.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    router.push('/admin');
  };

  const statCards = [
    {
      icon: FolderKanban,
      label: 'Total Projects',
      value: stats.totalProjects,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      icon: Send,
      label: 'Total Submissions',
      value: stats.totalSubmissions,
      color: 'bg-primary-500',
      trend: '+8%',
    },
    {
      icon: Clock,
      label: 'New Submissions',
      value: stats.newSubmissions,
      color: 'bg-yellow-500',
      trend: '+3',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: stats.completedProjects,
      color: 'bg-green-500',
      trend: '+5',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-neutral-900 text-white">
        <div className="p-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
              <span className="text-xl font-bold">A</span>
            </div>
            <div>
              <div className="font-bold">ArchLife</div>
              <div className="text-xs text-neutral-400">Admin Panel</div>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-lg bg-primary-500/10 px-4 py-3 text-primary-500 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="/admin/projects"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <FolderKanban className="h-5 w-5" />
              Projects
            </a>
            <a
              href="/admin/submissions"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <Send className="h-5 w-5" />
              Submissions
            </a>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600">
            Welcome back, {adminData?.name || 'Admin'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-neutral-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-green-600">{stat.trend} this month</p>
                </div>
                <div className={`rounded-lg ${stat.color} p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Submissions */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-neutral-900">Recent Submissions</h2>
          
          {recentSubmissions.length === 0 ? (
            <p className="py-8 text-center text-neutral-500">No submissions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 text-left text-sm text-neutral-600">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Project Type</th>
                    <th className="pb-3">Budget</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((submission) => (
                    <tr key={submission._id} className="border-b border-neutral-100">
                      <td className="py-4 font-medium text-neutral-900">{submission.name}</td>
                      <td className="py-4 text-neutral-600">{submission.email}</td>
                      <td className="py-4 capitalize text-neutral-600">{submission.projectType}</td>
                      <td className="py-4 text-neutral-600">{submission.budget}</td>
                      <td className="py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          submission.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                          submission.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          submission.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-neutral-100 text-neutral-700'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="py-4 text-neutral-600">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-center">
            <a
              href="/admin/submissions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600"
            >
              View All Submissions
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
