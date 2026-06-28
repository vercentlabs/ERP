import sample from "./sample.json";
import { designationsService } from "../service";

export async function seedDesignations() {
  return designationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
