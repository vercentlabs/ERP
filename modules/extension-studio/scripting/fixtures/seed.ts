import sample from "./sample.json";
import { scriptingService } from "../service";

export async function seedScripting() {
  return scriptingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
