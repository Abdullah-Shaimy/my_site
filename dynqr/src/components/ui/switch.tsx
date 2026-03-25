"use client";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`h-6 w-11 rounded-full transition ${checked ? "bg-primary" : "bg-slate-300"}`}
    >
      <span className={`block h-5 w-5 rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}