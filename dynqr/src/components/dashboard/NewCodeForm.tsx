"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { QRCodeRecord } from "@/lib/types";

type ApiResponse = {
  data?: QRCodeRecord;
  error?: string;
};

export default function NewCodeForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("https://");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          destinationUrl,
        }),
      });

      const payload = (await response.json()) as ApiResponse;

      if (!response.ok || !payload.data) {
        setError(payload.error ?? "Unable to create QR code.");
        return;
      }

      router.push(`/dashboard/codes/${payload.data.id}`);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">QR Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example: Menu Link"
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
            placeholder="https://example.com"
            required
          />
        </div>

        {error ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
        ) : null}

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Dynamic QR"}
        </Button>
      </form>
    </Card>
  );
}
