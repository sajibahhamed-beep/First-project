// Bare passthrough layout for the (auth) route group.
// NO <html> or <body> here — the root app/layout.tsx already provides those.
// Pages inside (auth)/admin/ are served at /admin/... URLs but are
// completely outside the src/app/admin/ directory tree, so they never
// inherit the admin sidebar/header layout.
export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
