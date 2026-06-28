import sample from "./sample.json";
import { forecastingService } from "../service";

export async function seedForecasting() {
  return forecastingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
