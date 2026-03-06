import type { Metadata } from "next";
import prisma from "@/lib/db/client";
import { SettingsForm } from "@/components/leadfinder/settings/SettingsForm";

export const metadata: Metadata = {
  title: "Einstellungen — LeadFinder",
};

export default async function SettingsPage() {
  const settings = await prisma.settings.findUnique({
    where: { id: "default" },
  });

  const [leadCount, analyzedCount, briefingCount, scriptCount] =
    await Promise.all([
      prisma.lead.count(),
      prisma.websiteAnalysis.count(),
      prisma.briefing.count(),
      prisma.salesScript.count(),
    ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-50">Einstellungen</h1>
      <SettingsForm
        initialSettings={settings}
        stats={{ leadCount, analyzedCount, briefingCount, scriptCount }}
      />
    </div>
  );
}
