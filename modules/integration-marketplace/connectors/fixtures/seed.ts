import sample from "./sample.json";
import { connectorsService } from "../service";

export async function seedConnectors() {
  return connectorsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
