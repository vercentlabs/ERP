import sample from "./sample.json";
import { chartMasterService } from "../service";

export async function seedChartMaster() {
  return chartMasterService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
