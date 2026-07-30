import { redirect } from "next/navigation";

export default function SeoRedirectPage() {
  redirect("/admin/settings?tab=seo");
}
