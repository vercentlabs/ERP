import sample from "./sample.json";
import { dataLakeService } from "../service";

export async function seedDataLake() {
  return dataLakeService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
