import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortalWorkspace } from "@/components/portal/portal-workspace";
import { adminSections } from "@/lib/data/portal-demo";

type AdminPageProps = {
  params: Promise<{ section?: string[] }>;
};

export const metadata: Metadata = {
  title: "Platform administration",
  description: "Frontend preview of Ijebu Ode marketplace administration tools.",
};

export function generateStaticParams() {
  return [
    { section: undefined },
    ...Object.keys(adminSections).map((name) => ({ section: [name] })),
  ];
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { section } = await params;
  const activeSection = section?.[0] ?? "overview";
  if ((section?.length ?? 0) > 1 || (activeSection !== "overview" && !(activeSection in adminSections))) notFound();

  return <PortalWorkspace portal="admin" section={activeSection} />;
}
