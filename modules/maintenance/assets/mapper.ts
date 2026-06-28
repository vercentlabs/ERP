import type { AssetsRecord } from "./types";

export function mapAssetsToCommandCenter(record: AssetsRecord) {
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
