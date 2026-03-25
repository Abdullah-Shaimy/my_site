import NewCodeForm from "@/components/dashboard/NewCodeForm";

export default function NewCodePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Create QR Code</h1>
      <NewCodeForm />
    </div>
  );
}
