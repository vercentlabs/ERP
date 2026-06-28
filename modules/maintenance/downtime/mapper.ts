import type { DowntimeRecord } from "./types";

export function mapDowntimeToCommandCenter(record: DowntimeRecord) {
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
