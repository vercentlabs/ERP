import sample from "./sample.json";
import { scenarioModelingService } from "../service";

export async function seedScenarioModeling() {
  return scenarioModelingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
