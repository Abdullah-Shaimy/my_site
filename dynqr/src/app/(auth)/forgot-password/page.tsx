"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Forgot password</h1>
        <p className="mt-1 text-sm text-slate-600">We will send a reset link to your email.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>

        {submitted ? (
          <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            If this email exists, reset instructions are on the way.
          </p>
        ) : null}

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
