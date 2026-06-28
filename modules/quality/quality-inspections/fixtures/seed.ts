import sample from "./sample.json";
import { qualityInspectionsService } from "../service";

export async function seedQualityInspections() {
  return qualityInspectionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
