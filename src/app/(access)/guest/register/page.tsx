import type { Metadata } from "next";
import { AccessPage } from "@/components/portal/access-page";

export const metadata: Metadata = {
  title: "Create guest account",
  description: "Frontend preview of guest account registration.",
};

export default function GuestRegisterPage() {
  return <AccessPage portal="guest" mode="register" />;
}
