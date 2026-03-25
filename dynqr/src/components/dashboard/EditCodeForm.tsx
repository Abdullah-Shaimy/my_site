"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { QRCodeRecord } from "@/lib/types";

type ApiResponse = {
  data?: QRCodeRecord;
  error?: string;
  success?: boolean;
};

interface EditCodeFormProps {
  initialCode: QRCodeRecord;
}

export default function EditCodeForm({ initialCode }: EditCodeFormProps) {
  const router = useRouter();
  const [code, setCode] = useState(initialCode);
  const [name, setName] = useState(initialCode.name);
  const [destinationUrl, setDestinationUrl] = useState(initialCode.destinationUrl);
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const shareLink = useMemo(() => {
    return origin ? `${origin}/qr/${code.shortId}` : `/qr/${code.shortId}`;
  }, [code.shortId, origin]);

  const pngUrl = useMemo(() => {
    return `/api/generate-qr?format=png&text=${encodeURIComponent(shareLink)}`;
  }, [shareLink]);

  const svgUrl = useMemo(() => {
    return `/api/generate-qr?format=svg&text=${encodeURIComponent(shareLink)}`;
  }, [shareLink]);

  async function saveChanges(nextActive: boolean): Promise<boolean> {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/codes/${code.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          destinationUrl,
          active: nextActive,
        }),
      });

      const payload = (await response.json()) as ApiResponse;

      if (!response.ok || !payload.data) {
        setError(payload.error ?? "Unable to save changes.");
        return false;
      }

      setCode(payload.data);
      setName(payload.data.name);
      setDestinationUrl(payload.data.destinationUrl);
      setMessage("Changes saved.");
      router.refresh();
      return true;
    } catch {
      setError("Network error. Please retry.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveChanges(code.active);
  }

  async function handleToggle() {
    const nextActive = !code.active;
    setCode((prev) => ({ ...prev, active: nextActive }));

    const ok = await saveChanges(nextActive);
    if (!ok) {
      setCode((prev) => ({ ...prev, active: !nextActive }));
    }
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setMessage("Share link copied.");
      setError(null);
    } catch {
      setError("Clipboard access denied.");
    }
  }

  async function handleDelete() {
    const shouldDelete = window.confirm("Delete this QR code permanently?");
    if (!shouldDelete) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/codes/${code.id}`, {
        method: "DELETE",
      });

      const payload = (await response.json()) as ApiResponse;

      if (!response.ok || !payload.success) {
        setError(payload.error ?? "Unable to delete QR code.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  const pngDownloadUrl = `${pngUrl}&download=1&filename=${encodeURIComponent(`${code.shortId}.png`)}`;
  const svgDownloadUrl = `${svgUrl}&download=1&filename=${encodeURIComponent(`${code.shortId}.svg`)}`;

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Edit QR Code</h2>
            <p className="text-sm text-slate-600">Short ID: <span className="font-mono">{code.shortId}</span></p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-700">{code.active ? "Active" : "Inactive"}</span>
            <Switch checked={code.active} onCheckedChange={handleToggle} />
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <Label htmlFor="name">QR Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={80}
            />
          </div>

          <div>
            <Label htmlFor="destinationUrl">Destination URL</Label>
            <Input
              id="destinationUrl"
              type="url"
              value={destinationUrl}
              onChange={(event) => setDestinationUrl(event.target.value)}
              required
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            Redirect link: <span className="break-all font-mono">{shareLink}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <button
              type="button"
              onClick={copyShareLink}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Copy Share Link
            </button>
            <a
              href={pngDownloadUrl}
              download={`${code.shortId}.png`}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Download PNG
            </a>
            <a
              href={svgDownloadUrl}
              download={`${code.shortId}.svg`}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Download SVG
            </a>
          </div>
        </form>

        {error ? (
          <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
        ) : null}

        {message ? (
          <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </p>
        ) : null}

        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
          <Link href="/dashboard" className="text-sm text-blue-700 hover:underline">
            Back to dashboard
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-md border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
          >
            Delete QR
          </button>
        </div>
      </Card>

      <QRCodeDisplay imageUrl={pngUrl} label="QR Preview" copyValue={shareLink} copyLabel="Copy redirect link" />

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">Analytics Snapshot</h3>
        <p className="mt-2 text-sm text-slate-600">Total scans: <strong className="text-slate-900">{code.scans}</strong></p>
        <p className="mt-1 text-sm text-slate-600">
          Last scanned: {code.lastScannedAt ? new Date(code.lastScannedAt).toLocaleString() : "Never scanned"}
        </p>
      </Card>
    </div>
  );
}

