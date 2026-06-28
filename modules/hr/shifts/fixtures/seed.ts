import sample from "./sample.json";
import { shiftsService } from "../service";

export async function seedShifts() {
  return shiftsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
