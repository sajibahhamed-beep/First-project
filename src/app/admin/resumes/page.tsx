import { redirect } from "next/navigation";

export default function ResumesRedirectPage() {
  redirect("/admin/settings?tab=resumes");
}
