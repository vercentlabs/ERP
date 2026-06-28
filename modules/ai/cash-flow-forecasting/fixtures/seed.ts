import sample from "./sample.json";
import { cashFlowForecastingService } from "../service";

export async function seedCashFlowForecasting() {
  return cashFlowForecastingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
