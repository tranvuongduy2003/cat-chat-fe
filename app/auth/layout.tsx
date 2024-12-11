import { AuthProtectedRoute } from "@/HOC/auth-protected-route";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProtectedRoute>{children}</AuthProtectedRoute>;
}
