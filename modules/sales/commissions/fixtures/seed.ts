import sample from "./sample.json";
import { commissionsService } from "../service";

export async function seedCommissions() {
  return commissionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
