import type { LeadRecord } from "./types";

export function mapLeadsToCommandCenter(record: LeadRecord) {
  return {
    id: record.id,
    title: `${record.firstName} ${record.lastName}`.trim(),
    status: record.status,
    score: record.score,
    ownerId: record.ownerUserId,
    risk: record.status === "NEW" && record.score >= 80,
    nextAction: record.status === "NEW" ? "Contact" : record.status === "CONTACTED" ? "Qualify or disqualify" : "Monitor",
  };
}
