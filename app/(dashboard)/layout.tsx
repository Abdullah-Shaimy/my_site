"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = role === "admin" 
    ? [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Users", href: "/admin/users", icon: UserIcon },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ]
    : [
        { name: "Dashboard", href: "/user", icon: LayoutDashboard },
        { name: "My Services", href: "/user/services", icon: Settings },
      ];

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full max-w-7xl mx-auto pt-28 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block flex-shrink-0">
        <div className="h-full rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-bold font-josefin text-white">
              {role === "admin" ? "Admin Panel" : "My Account"}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 truncate">
              {user?.email}
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-colors mt-auto"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-8">
        <div className="h-full rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-6 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
