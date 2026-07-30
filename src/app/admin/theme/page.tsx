import { redirect } from "next/navigation";

export default function ThemeRedirectPage() {
  redirect("/admin/settings?tab=theme");
}
