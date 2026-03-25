"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Password updated. Please login again.");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Reset password</h1>
        <p className="mt-1 text-sm text-slate-600">Set a new secure password for your account.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full">
            Update password
          </Button>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}

        <p className="mt-4 text-sm text-slate-600">
          Back to{" "}
          <Link href="/login" className="text-blue-700 hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
