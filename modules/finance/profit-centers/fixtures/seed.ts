import sample from "./sample.json";
import { profitCentersService } from "../service";

export async function seedProfitCenters() {
  return profitCentersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
