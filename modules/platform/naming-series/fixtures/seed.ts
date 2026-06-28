import sample from "./sample.json";
import { namingSeriesService } from "../service";

export async function seedNamingSeries() {
  return namingSeriesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
