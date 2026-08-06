import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div>
        <h1 className="text-3xl font-bold font-josefin mb-6">Admin Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats Cards */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-white">24</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Active Services</h3>
            <p className="text-3xl font-bold text-white">8</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-emerald-400">$1,240</p>
          </div>
        </div>
        
        {/* Placeholder for Recent Activity */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-bold font-josefin mb-4">Recent Activity</h2>
          <div className="text-zinc-400 text-sm py-4 text-center border-2 border-dashed border-zinc-800 rounded-lg">
            No recent activity to show.
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
