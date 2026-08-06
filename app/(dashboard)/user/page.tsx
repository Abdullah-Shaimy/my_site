import ProtectedRoute from "../../components/ProtectedRoute";

export default function UserDashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-3xl font-bold font-josefin mb-6">My Dashboard</h1>
        
        {/* Placeholder for User Services/Orders */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-josefin">My Active Services</h2>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
              View All
            </button>
          </div>
          <div className="text-zinc-400 text-sm py-8 text-center border-2 border-dashed border-zinc-800 rounded-lg">
            You don't have any active services yet.
          </div>
        </div>

        {/* Placeholder for Recent Invoices/Payments */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-bold font-josefin mb-4">Recent Invoices</h2>
          <div className="text-zinc-400 text-sm py-4 text-center border-2 border-dashed border-zinc-800 rounded-lg">
            No recent invoices found.
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
