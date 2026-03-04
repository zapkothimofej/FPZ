"use server";

import prisma from "@/lib/db/client";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(leadId: string, status: string) {
  await prisma.lead.update({ where: { id: leadId }, data: { status } });
  revalidatePath(`/leads/${leadId}`);
  revalidatePath("/leads");
  revalidatePath("/");
}

export async function updateLeadNotes(leadId: string, notes: string) {
  await prisma.lead.update({ where: { id: leadId }, data: { notes } });
  revalidatePath(`/leads/${leadId}`);
}
