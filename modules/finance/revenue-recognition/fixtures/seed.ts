import sample from "./sample.json";
import { revenueRecognitionService } from "../service";

export async function seedRevenueRecognition() {
  return revenueRecognitionService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
