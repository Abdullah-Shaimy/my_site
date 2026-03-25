import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/codes/new", label: "Create QR" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-full border-r border-slate-200 bg-white p-4 md:w-64">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Menu</p>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}