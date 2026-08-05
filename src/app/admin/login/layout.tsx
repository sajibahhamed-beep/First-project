// Login page gets its own standalone layout — no sidebar or header.
// This overrides the parent admin/layout.tsx for this route only.
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
