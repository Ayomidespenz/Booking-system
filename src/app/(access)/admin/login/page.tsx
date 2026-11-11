import type { Metadata } from "next";
import { AccessPage } from "@/components/portal/access-page";

export const metadata: Metadata = {
  title: "Administrator sign in",
  description: "Frontend preview of restricted platform administration access.",
};

export default function AdminLoginPage() {
  return <AccessPage portal="admin" mode="login" />;
}
