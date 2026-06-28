import sample from "./sample.json";
import { metricsLayerService } from "../service";

export async function seedMetricsLayer() {
  return metricsLayerService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
