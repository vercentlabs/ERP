import sample from "./sample.json";
import { demandForecastingService } from "../service";

export async function seedDemandForecasting() {
  return demandForecastingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
