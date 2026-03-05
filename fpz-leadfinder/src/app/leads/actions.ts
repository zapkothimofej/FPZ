"use server";

import prisma from "@/lib/db/client";
import { revalidatePath } from "next/cache";

export async function bulkUpdateStatus(leadIds: string[], status: string) {
  await prisma.lead.updateMany({
    where: { id: { in: leadIds } },
    data: { status },
  });
  revalidatePath("/leads");
  revalidatePath("/");
}

export async function bulkDelete(leadIds: string[]) {
  await prisma.lead.deleteMany({
    where: { id: { in: leadIds } },
  });
  revalidatePath("/leads");
  revalidatePath("/");
}

export async function createLead(data: {
  name: string;
  address: string;
  city: string;
  zip?: string;
  phone?: string;
  email?: string;
  website?: string;
  category: string;
  googleMapsUrl?: string;
  openingHours?: string;
  notes?: string;
}) {
  const lead = await prisma.lead.create({
    data: { ...data, source: "MANUAL", status: "NEW" },
  });
  revalidatePath("/leads");
  revalidatePath("/");
  return lead;
}
