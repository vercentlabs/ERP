import sample from "./sample.json";
import { biConnectorsService } from "../service";

export async function seedBiConnectors() {
  return biConnectorsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
