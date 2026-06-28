import type { SegmentsRecord } from "./types";

export function mapSegmentsToCommandCenter(record: SegmentsRecord) {
  return {
    id: record.id,
    title: record.name,
    status: record.status,
    priority: record.priority,
    ownerId: record.ownerId,
    risk: record.priority === "critical" || record.status === "rejected",
    nextAction: record.status === "draft" ? "Submit" : record.status === "submitted" ? "Approve or reject" : "Monitor",
  };
}
