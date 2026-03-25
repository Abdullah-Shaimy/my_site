import { redirect } from "next/navigation";

export const metadata = {
  title: "DynQR Free Service | Abdullah",
  description: "Dynamic QR Code Management System by Abdullah.",
};

export default function DynQRGatewayPage() {
  const dynqrUrl = process.env.NEXT_PUBLIC_DYNQR_URL || "https://dynqr-two.vercel.app";
  redirect(dynqrUrl);
}
