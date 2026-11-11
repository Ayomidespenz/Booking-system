import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, CircleAlert, Clock3, ShieldCheck } from "lucide-react";
import {
  adminNavigation,
  adminSections,
  partnerNavigation,
  partnerSections,
  type PortalKind,
  type PortalSection,
} from "@/lib/data/portal-demo";
import { SITE } from "@/lib/data/site";

type PortalWorkspaceProps = {
  portal: PortalKind;
  section: string;
};

const demoStats = {
  partner: [
    { label: "Occupancy", value: "74%", note: "Illustrative this month", trend: "+6%" },
    { label: "Bookings", value: "38", note: "Sample records only", trend: "+4" },
    { label: "Revenue recorded", value: "₦2.39m", note: "Not live financial data", trend: "+8%" },
    { label: "Needs attention", value: "2", note: "Example exceptions", trend: "Review" },
  ],
  admin: [
    { label: "Verified properties", value: "12", note: "Sample dashboard data", trend: "+2" },
    { label: "Booking requests", value: "86", note: "Illustrative this month", trend: "+12%" },
    { label: "Payment exceptions", value: "3", note: "Example reconciliation queue", trend: "Review" },
    { label: "Zero-result searches", value: "18", note: "Illustrative this month", trend: "−4%" },
  ],
} as const;

function isActive(href: string, pathname: string) {
  return href === pathname || (href !== "/partner" && href !== "/admin" && pathname.startsWith(`${href}/`));
}

function WorkspaceHeader({ portal, section }: PortalWorkspaceProps) {
  const isPartner = portal === "partner";
  const navigation = isPartner ? partnerNavigation : adminNavigation;
  const basePath = isPartner ? "/partner" : "/admin";
  const pathname = section === "overview" ? basePath : `${basePath}/${section}`;

  return (
    <>
      <header className="border-b border-ink-900/10 bg-white dark:border-sand-100/10 dark:bg-ink-950">
        <div className="container-x flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
          <Link href="/" className="font-display text-2xl font-semibold text-ink-950 dark:text-sand-50">
            {SITE.name}<span className="text-gold-500">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gold-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-700 dark:bg-gold-500/15 dark:text-gold-300">
              Frontend preview
            </span>
            {isPartner ? (
              <>
                <Link href="/partner/login" className="hidden text-sm font-medium text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300 sm:inline">Partner sign in</Link>
                <Link href="/partner/register" className="hidden text-sm font-medium text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300 sm:inline">Register</Link>
                <Link href="/admin" className="hidden text-sm font-medium text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300 xl:inline">Admin preview</Link>
              </>
            ) : (
              <>
                <Link href="/admin/login" className="hidden text-sm font-medium text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300 sm:inline">Admin sign in</Link>
                <Link href="/partner" className="hidden text-sm font-medium text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300 xl:inline">Partner preview</Link>
              </>
            )}
            <Link href="/" className="text-sm font-medium text-ink-600 hover:text-gold-700 dark:text-sand-300 dark:hover:text-gold-300">
              Guest site
            </Link>
          </div>
        </div>
      </header>

      <div className="container-x pt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
              {isPartner ? "Partner dashboard" : "Platform administration"}
            </p>
            <h1 className="mt-2 font-display text-3xl text-ink-950 dark:text-sand-50">
              {isPartner ? "Your property, at a glance." : "Marketplace operations."}
            </h1>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
              {isPartner ? "Sample workspace · Ijebu Ode" : "Internal preview · Ijebu Ode"}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs text-ink-400">
            <Clock3 className="h-4 w-4" aria-hidden />
            Preview data · not synced
          </span>
        </div>

        <nav className="no-scrollbar mt-6 flex gap-2 overflow-x-auto border-b border-ink-900/10 pb-px dark:border-sand-100/10" aria-label={`${isPartner ? "Partner" : "Admin"} navigation`}>
          {navigation.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${active ? "border-gold-500 text-ink-950 dark:text-sand-50" : "border-transparent text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-sand-50"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

function DemoNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gold-500/25 bg-gold-50 p-4 text-sm text-ink-700 dark:bg-gold-500/10 dark:text-sand-200" role="note">
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-700 dark:text-gold-300" aria-hidden />
      <p>
        <strong className="font-semibold">Frontend preview.</strong> All names, counts, prices, and statuses on this screen are sample data. Actions are not connected to a backend and nothing is saved.
      </p>
    </div>
  );
}

function StatCards({ portal }: { portal: PortalKind }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {demoStats[portal].map((stat, index) => {
        const Icon = index === 3 ? CircleAlert : index % 2 === 0 ? ArrowUpRight : ArrowDownRight;
        return (
          <article key={stat.label} className="rounded-xl border border-ink-900/10 bg-white p-5 dark:border-sand-100/10 dark:bg-ink-900">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-ink-500 dark:text-ink-300">{stat.label}</p>
              <Icon className={`h-4 w-4 ${index === 3 ? "text-gold-600 dark:text-gold-400" : "text-sage-500"}`} aria-hidden />
            </div>
            <p className="mt-4 font-display text-3xl text-ink-950 dark:text-sand-50">{stat.value}</p>
            <p className="mt-2 text-xs text-ink-400">{stat.note}</p>
          </article>
        );
      })}
    </div>
  );
}

function Overview({ portal }: { portal: PortalKind }) {
  const isPartner = portal === "partner";

  return (
    <>
      <StatCards portal={portal} />
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-xl border border-ink-900/10 bg-white p-5 dark:border-sand-100/10 dark:bg-ink-900 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl text-ink-950 dark:text-sand-50">
                {isPartner ? "Today’s operations" : "Marketplace health"}
              </h2>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
                {isPartner ? "Illustrative arrivals, departures, and room readiness." : "Example work queues for a platform operations team."}
              </p>
            </div>
            <span className="rounded-full bg-sand-100 px-3 py-1 text-xs text-ink-500 dark:bg-ink-800 dark:text-ink-300">Sample</span>
          </div>
          <div className="mt-5 space-y-3">
            {(isPartner
              ? [
                  ["Arrivals", "3 sample stays expected today", "Ready"],
                  ["Departures", "2 sample stays expected today", "On track"],
                  ["Room 204", "No matching payment in preview data", "Review"],
                ]
              : [
                  ["Property verification", "2 sample listings need review", "Queue"],
                  ["Payment reconciliation", "3 sample records need review", "Queue"],
                  ["Guest support", "1 example issue awaiting triage", "Queue"],
                ]
            ).map(([title, detail, status]) => (
              <div key={title} className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/10 pt-3 first:border-0 first:pt-0 dark:border-sand-100/10">
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-sand-100">{title}</p>
                  <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">{detail}</p>
                </div>
                <span className="rounded-full bg-sand-100 px-2.5 py-1 text-[11px] font-medium text-ink-600 dark:bg-ink-800 dark:text-sand-200">{status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-ink-900/10 bg-white p-5 dark:border-sand-100/10 dark:bg-ink-900 sm:p-6">
          <h2 className="font-display text-xl text-ink-950 dark:text-sand-50">
            {isPartner ? "Availability snapshot" : "Trust and safety"}
          </h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            {isPartner ? "A visual placeholder for the property calendar." : "Example checks that keep the local marketplace dependable."}
          </p>
          {isPartner ? (
            <div className="mt-6 space-y-4">
              {[
                ["Sample Hotel", 74],
                ["Sample Family Apartment", 48],
              ].map(([label, occupancy]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between gap-3 text-xs">
                    <span className="text-ink-600 dark:text-sand-200">{label}</span>
                    <span className="font-semibold text-ink-900 dark:text-sand-100">{occupancy}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-sand-200 dark:bg-ink-800">
                    <div className="h-full rounded-full bg-gold-500" style={{ width: `${occupancy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="mt-5 space-y-3 text-sm text-ink-600 dark:text-sand-200">
              {["Listing identity and document review", "Availability and booking exceptions", "Payment and refund reconciliation"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

function SectionTable({ section }: { section: PortalSection }) {
  return (
    <section className="overflow-hidden rounded-xl border border-ink-900/10 bg-white dark:border-sand-100/10 dark:bg-ink-900">
      <div className="border-b border-ink-900/10 px-5 py-4 dark:border-sand-100/10 sm:px-6">
        <h2 className="font-display text-xl text-ink-950 dark:text-sand-50">{section.title}</h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{section.description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-sand-100/70 text-[11px] uppercase tracking-wide text-ink-500 dark:bg-ink-800 dark:text-ink-300">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold sm:px-6">Item</th>
              <th scope="col" className="px-5 py-3 font-semibold">Context</th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/10 dark:divide-sand-100/10">
            {section.rows.map((row) => (
              <tr key={`${row.primary}-${row.secondary}`} className="align-top">
                <th scope="row" className="px-5 py-4 font-semibold text-ink-900 dark:text-sand-100 sm:px-6">{row.primary}</th>
                <td className="px-5 py-4 text-ink-600 dark:text-sand-200">{row.secondary}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-ink-700 dark:bg-ink-800 dark:text-sand-200">{row.status}</span>
                </td>
                <td className="px-5 py-4 text-ink-500 dark:text-ink-300">{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function PortalWorkspace({ portal, section }: PortalWorkspaceProps) {
  const isPartner = portal === "partner";
  const normalizedSection = section || "overview";
  const sectionData = (isPartner ? partnerSections : adminSections)[normalizedSection];
  const pageTitle = sectionData?.title ?? (isPartner ? "Partner overview" : "Admin overview");

  return (
    <div className="min-h-screen bg-sand-50 pb-12 dark:bg-ink-950">
      <WorkspaceHeader portal={portal} section={section} />
      <main className="container-x pt-6">
        <DemoNotice />
        <div className="mb-5 mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
            {isPartner ? "Partner workspace" : "Platform admin"}
          </p>
          <h2 className="mt-1 font-display text-2xl text-ink-950 dark:text-sand-50">{pageTitle}</h2>
        </div>
        {normalizedSection === "overview" || !sectionData
          ? <Overview portal={portal} />
          : <SectionTable section={sectionData} />}
        <p className="mt-8 text-center text-xs text-ink-400">
          Preview UI only. Authentication, permissions, persistence, and live data will be provided by the separate backend.
        </p>
      </main>
    </div>
  );
}
