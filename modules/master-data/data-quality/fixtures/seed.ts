import sample from "./sample.json";
import { dataQualityService } from "../service";

export async function seedDataQuality() {
  return dataQualityService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
