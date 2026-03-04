import prisma from "@/lib/db/client";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatusDropdown } from "@/components/leads/StatusDropdown";
import { LeadNotes } from "@/components/leads/LeadNotes";
import { cn, formatDateTime } from "@/lib/utils";
import { ArrowLeft, MapPin, Phone, Globe, Mail, Clock } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    select: { name: true },
  });
  return {
    title: lead ? `${lead.name} — LeadFinder` : "Lead nicht gefunden",
  };
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { analysis: true, briefing: true, salesScript: true },
  });

  if (!lead) return notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/leads"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Liste
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50">
            {lead.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-zinc-400">{lead.city}</span>
            <Badge className="bg-zinc-800 text-zinc-300 text-xs">
              {lead.category}
            </Badge>
            <Badge
              className={cn(
                "text-xs",
                lead.source === "OSM"
                  ? "bg-blue-500/20 text-blue-400"
                  : lead.source === "GOOGLE_MAPS"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-zinc-700 text-zinc-300"
              )}
            >
              {lead.source}
            </Badge>
          </div>
        </div>
        <StatusDropdown leadId={lead.id} currentStatus={lead.status} />
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 mt-1 text-zinc-500 shrink-0" />
            <div>
              <p className="text-sm text-zinc-400">Adresse</p>
              {lead.googleMapsUrl ? (
                <a
                  href={lead.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-100 hover:text-blue-400 transition-colors"
                >
                  {lead.address}
                  {lead.zip ? `, ${lead.zip}` : ""} {lead.city}
                </a>
              ) : (
                <p className="text-zinc-100">
                  {lead.address}, {lead.city}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 mt-1 text-zinc-500 shrink-0" />
            <div>
              <p className="text-sm text-zinc-400">Telefon</p>
              {lead.phone ? (
                <a
                  href={`tel:${lead.phone}`}
                  className="text-zinc-100 hover:text-blue-400"
                >
                  {lead.phone}
                </a>
              ) : (
                <span className="text-zinc-600">Nicht verfügbar</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="h-4 w-4 mt-1 text-zinc-500 shrink-0" />
            <div>
              <p className="text-sm text-zinc-400">Website</p>
              {lead.website ? (
                <a
                  href={lead.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 truncate block max-w-[300px]"
                >
                  {lead.website}
                </a>
              ) : (
                <span className="text-red-400">Keine Website</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 mt-1 text-zinc-500 shrink-0" />
            <div>
              <p className="text-sm text-zinc-400">Email</p>
              {lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="text-zinc-100 hover:text-blue-400"
                >
                  {lead.email}
                </a>
              ) : (
                <span className="text-zinc-600">Nicht verfügbar</span>
              )}
            </div>
          </div>

          {lead.openingHours && (
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 mt-1 text-zinc-500 shrink-0" />
              <div>
                <p className="text-sm text-zinc-400">Öffnungszeiten</p>
                <p className="text-zinc-100">{lead.openingHours}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <LeadNotes leadId={lead.id} initialNotes={lead.notes} />

      <div className="flex gap-4 text-xs text-zinc-600 mt-4">
        <span>Erstellt: {formatDateTime(lead.createdAt)}</span>
        <span>Aktualisiert: {formatDateTime(lead.updatedAt)}</span>
      </div>

      {/* Tabs kommen in US-016 */}
    </div>
  );
}
