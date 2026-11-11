import type { Metadata } from "next";
import { AccessPage } from "@/components/portal/access-page";

export const metadata: Metadata = {
  title: "Partner sign in",
  description: "Frontend preview of hotel and shortlet partner access.",
};

export default function PartnerLoginPage() {
  return <AccessPage portal="partner" mode="login" />;
}
