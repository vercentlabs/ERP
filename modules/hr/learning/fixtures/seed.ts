import sample from "./sample.json";
import { learningService } from "../service";

export async function seedLearning() {
  return learningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
