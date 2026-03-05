import { formatDate } from "@/lib/utils";
import { STATUS_CONFIG } from "@/lib/constants";
import type { Lead, LeadStatus } from "@/types";

function escapeCSV(value: string): string {
  if (value.includes(";") || value.includes('"') || value.includes("\n")) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

export function generateLeadCSV(leads: Lead[]): string {
  const BOM = "\uFEFF";
  const headers = [
    "Name",
    "Adresse",
    "Stadt",
    "PLZ",
    "Telefon",
    "Email",
    "Website",
    "Branche",
    "Score",
    "Status",
    "Erstellt",
  ].join(";");

  const rows = leads.map((lead) =>
    [
      escapeCSV(lead.name),
      escapeCSV(lead.address),
      escapeCSV(lead.city),
      escapeCSV(lead.zip ?? ""),
      escapeCSV(lead.phone ?? ""),
      escapeCSV(lead.email ?? ""),
      escapeCSV(lead.website ?? ""),
      escapeCSV(lead.category),
      String(lead.overallScore ?? ""),
      STATUS_CONFIG[lead.status as LeadStatus]?.label ?? lead.status,
      formatDate(lead.createdAt),
    ].join(";")
  );

  return BOM + headers + "\n" + rows.join("\n");
}
