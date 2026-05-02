import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MessageSquare, Activity, Settings, Search, Trash2, ShieldAlert, MapPin } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const stats = [
    { label: 'Active Users', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Sessions', value: '25,492', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Security Alerts', value: '0', icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Messages Sent', value: '432', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blueprint-blue">Admin Control</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'users' ? 'bg-blueprint-blue text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">User Management</span>
          </button>
          <button
            onClick={() => setActiveTab('comms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'comms' ? 'bg-blueprint-blue text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Admin Comms</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Security Settings</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 className="w-5 h-5" />
            <span className="font-medium">Wipe Analytics</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-500 mt-1">Real-time visitor analytics and user control panel.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="px-4 py-2 bg-blueprint-blue text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                Export Data
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Recent Visitors</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search IP or Session..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blueprint-blue transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">IP / Location</th>
                    <th className="px-6 py-4">Session Duration</th>
                    <th className="px-6 py-4">Device Info</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">192.168.1.{i * 23}</div>
                        <div className="text-gray-500 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> New York, US
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600">{(i * 4.2).toFixed(1)}m</td>
                      <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">
                        Chrome / macOS Ventura
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                          Online
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blueprint-blue font-bold hover:underline">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
              <button className="text-sm font-semibold text-blueprint-blue hover:text-blue-700">
                View All User Activity
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
