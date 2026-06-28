import sample from "./sample.json";
import { segmentsService } from "../service";

export async function seedSegments() {
  return segmentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
