import { cookies } from "next/headers";
import { supabase } from "../lib/supabase";
import AccessKeyScreen from "./components/AccessKeyScreen";
import MailDashboard from "./components/MailDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Mail Dashboard",
  description: "Secure private mailing system control panel.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MailPage() {
  const cookieStore = await cookies();
  const accessKeyCookie = cookieStore.get("mail_access_key");
  let isAuthorized = false;

  if (accessKeyCookie && accessKeyCookie.value) {
    try {
      const { data: isValid, error } = await supabase.rpc("verify_mail_access_key", {
        input_key: accessKeyCookie.value,
      });
      if (!error && isValid) {
        isAuthorized = true;
      }
    } catch (e) {
      console.error("Failed to verify authorization cookie server-side:", e);
    }
  }

  return (
    <div className="relative w-full">
      {isAuthorized ? <MailDashboard /> : <AccessKeyScreen />}
    </div>
  );
}
