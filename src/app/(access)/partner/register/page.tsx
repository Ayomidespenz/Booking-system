import type { Metadata } from "next";
import { AccessPage } from "@/components/portal/access-page";

export const metadata: Metadata = {
  title: "Partner registration",
  description: "Frontend preview of hotel and shortlet partner registration.",
};

export default function PartnerRegisterPage() {
  return <AccessPage portal="partner" mode="register" />;
}
