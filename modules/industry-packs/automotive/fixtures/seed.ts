import sample from "./sample.json";
import { automotiveService } from "../service";

export async function seedAutomotive() {
  return automotiveService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
