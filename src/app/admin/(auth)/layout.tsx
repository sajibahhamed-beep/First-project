// Standalone layout for the (auth) route group.
// Pages inside (auth)/ do NOT inherit the admin sidebar/header layout.
// The route group parentheses "(auth)" are invisible in the URL —
// /admin/(auth)/login still resolves to /admin/login in the browser.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#090b0e" }}>{children}</body>
    </html>
  );
}
