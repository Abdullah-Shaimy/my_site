import { notFound } from "next/navigation";
import EditCodeForm from "@/components/dashboard/EditCodeForm";
import { getCodeByIdDb } from "@/lib/db";

export const dynamic = "force-dynamic";

interface EditCodePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCodePage({ params }: EditCodePageProps) {
  const { id } = await params;
  const code = await getCodeByIdDb(id);

  if (!code) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <EditCodeForm initialCode={code} />
    </div>
  );
}
