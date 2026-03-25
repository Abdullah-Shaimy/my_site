"use client";

import { useState } from "react";

interface QRCodeDisplayProps {
  imageUrl: string;
  label: string;
  copyValue?: string;
  copyLabel?: string;
}

export default function QRCodeDisplay({ imageUrl, label, copyValue, copyLabel }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  async function copyValueToClipboard() {
    const value = copyValue ?? imageUrl;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-slate-800">{label}</p>
      <img src={imageUrl} alt={label} className="h-56 w-56 rounded-lg border border-slate-100 object-contain" />
      <button
        type="button"
        onClick={copyValueToClipboard}
        className="mt-3 rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700"
      >
        {copied ? "Copied" : copyLabel ?? "Copy value"}
      </button>
    </div>
  );
}
