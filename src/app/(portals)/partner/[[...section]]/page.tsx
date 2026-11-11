import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortalWorkspace } from "@/components/portal/portal-workspace";
import { partnerSections } from "@/lib/data/portal-demo";

type PartnerPageProps = {
  params: Promise<{ section?: string[] }>;
};

export const metadata: Metadata = {
  title: "Partner dashboard",
  description: "Frontend preview of property operations for Ijebu Ode partners.",
};

export function generateStaticParams() {
  return [
    { section: undefined },
    ...Object.keys(partnerSections).map((name) => ({ section: [name] })),
  ];
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { section } = await params;
  const activeSection = section?.[0] ?? "overview";
  if ((section?.length ?? 0) > 1 || (activeSection !== "overview" && !(activeSection in partnerSections))) notFound();

  return <PortalWorkspace portal="partner" section={activeSection} />;
}
