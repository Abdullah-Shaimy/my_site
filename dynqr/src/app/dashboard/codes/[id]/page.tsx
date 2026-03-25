import { notFound } from "next/navigation";
import EditCodeForm from "@/components/dashboard/EditCodeForm";
import { getCodeById } from "@/lib/db/mock-db";

export const dynamic = "force-dynamic";

interface EditCodePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCodePage({ params }: EditCodePageProps) {
  const { id } = await params;
  const code = getCodeById(id);

  if (!code) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <EditCodeForm initialCode={code} />
    </div>
  );
}
