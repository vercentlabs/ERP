import sample from "./sample.json";
import { energyUsageService } from "../service";

export async function seedEnergyUsage() {
  return energyUsageService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
