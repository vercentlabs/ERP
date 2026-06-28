import sample from "./sample.json";
import { workCentersService } from "../service";

export async function seedWorkCenters() {
  return workCentersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
