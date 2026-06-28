import sample from "./sample.json";
import { authService } from "../service";

export async function seedAuth() {
  return authService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
