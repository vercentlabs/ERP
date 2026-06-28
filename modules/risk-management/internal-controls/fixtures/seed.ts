import sample from "./sample.json";
import { internalControlsService } from "../service";

export async function seedInternalControls() {
  return internalControlsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
