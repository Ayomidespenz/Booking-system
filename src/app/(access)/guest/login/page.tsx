import type { Metadata } from "next";
import { AccessPage } from "@/components/portal/access-page";

export const metadata: Metadata = {
  title: "Guest sign in",
  description: "Frontend preview of guest account access.",
};

export default function GuestLoginPage() {
  return <AccessPage portal="guest" mode="login" />;
}
