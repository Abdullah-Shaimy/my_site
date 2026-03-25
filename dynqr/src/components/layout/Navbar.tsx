import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-slate-900">
          DynQR Free
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/codes/new">Create QR</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}