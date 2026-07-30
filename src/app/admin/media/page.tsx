import { redirect } from "next/navigation";

export default function MediaRedirectPage() {
  redirect("/admin/settings?tab=media");
}
