'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Send,
  LogOut,
  Search,
  Filter,
  Eye,
  Trash2,
  X,
} from 'lucide-react';

export default function AdminSubmissions() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    loadSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [searchTerm, statusFilter, submissions]);

  const loadSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data);
        setFilteredSubmissions(data.data);
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
  };

  const updateStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes }),
      });

      if (response.ok) {
        loadSubmissions();
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`/api/submissions?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadSubmissions();
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    router.push('/admin');
  };

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
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
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
              className="flex items-center gap-3 rounded-lg bg-primary-500/10 px-4 py-3 text-primary-500 transition-colors"
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
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-neutral-900">Client Submissions</h1>
          <p className="text-neutral-600">Manage and respond to project inquiries</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 py-3 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Submissions Table */}
        <div className="rounded-xl bg-white shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="py-20 text-center text-neutral-500">
              No submissions found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr className="text-left text-sm text-neutral-600">
                    <th className="p-4">Client</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission._id} className="border-t border-neutral-100">
                      <td className="p-4">
                        <div className="font-medium text-neutral-900">{submission.name}</div>
                        <div className="text-sm text-neutral-500">{submission.country}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-neutral-600">{submission.email}</div>
                        <div className="text-sm text-neutral-500">{submission.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="capitalize text-neutral-900">{submission.projectType}</div>
                        <div className="text-sm text-neutral-500">{submission.plotArea} sq.ft</div>
                      </td>
                      <td className="p-4 text-neutral-600">{submission.budget}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          submission.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                          submission.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                          submission.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                          submission.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-neutral-600">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="rounded-lg bg-primary-100 p-2 text-primary-600 transition-colors hover:bg-primary-200"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteSubmission(submission._id)}
                            className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-neutral-600">Client Name</label>
                <p className="text-neutral-900">{selectedSubmission.name}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-600">Email</label>
                  <p className="text-neutral-900">{selectedSubmission.email}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-600">Phone</label>
                  <p className="text-neutral-900">{selectedSubmission.phone}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-600">Country</label>
                  <p className="text-neutral-900">{selectedSubmission.country}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-600">Project Type</label>
                  <p className="capitalize text-neutral-900">{selectedSubmission.projectType}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-600">Plot Area</label>
                  <p className="text-neutral-900">{selectedSubmission.plotArea} sq.ft</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-600">Budget</label>
                  <p className="text-neutral-900">{selectedSubmission.budget}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-neutral-600">Timeline</label>
                <p className="text-neutral-900">{selectedSubmission.timeline}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-neutral-600">Description</label>
                <p className="text-neutral-900">{selectedSubmission.description}</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-600">Update Status</label>
                <select
                  defaultValue={selectedSubmission.status}
                  onChange={(e) => updateStatus(selectedSubmission._id, e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
