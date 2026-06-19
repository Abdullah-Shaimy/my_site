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
  let senderEmail = "";
  let templates = [];

  if (accessKeyCookie && accessKeyCookie.value) {
    try {
      const { data, error } = await supabase.rpc("get_mail_sender_info", {
        input_key: accessKeyCookie.value,
      });
      if (!error && data && data.length > 0) {
        isAuthorized = true;
        senderEmail = data[0].sender_email;
        templates = data[0].templates;
      }
    } catch (e) {
      console.error("Failed to verify authorization cookie server-side:", e);
    }
  }

  return (
    <div className="relative w-full">
      {isAuthorized ? (
        <MailDashboard senderEmail={senderEmail} templates={templates} />
      ) : (
        <AccessKeyScreen />
      )}
    </div>
  );
}
