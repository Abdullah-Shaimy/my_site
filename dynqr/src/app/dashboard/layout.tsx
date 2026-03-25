import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <Sidebar />
        <section className="min-w-0 flex-1 space-y-4">{children}</section>
      </div>
    </div>
  );
}
