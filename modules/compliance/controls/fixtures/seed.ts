import sample from "./sample.json";
import { controlsService } from "../service";

export async function seedControls() {
  return controlsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
