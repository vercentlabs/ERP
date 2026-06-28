import sample from "./sample.json";
import { anomalyDetectionService } from "../service";

export async function seedAnomalyDetection() {
  return anomalyDetectionService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
