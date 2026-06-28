import sample from "./sample.json";
import { unitsOfMeasureService } from "../service";

export async function seedUnitsOfMeasure() {
  return unitsOfMeasureService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
