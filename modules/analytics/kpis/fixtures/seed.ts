import sample from "./sample.json";
import { kpisService } from "../service";

export async function seedKpis() {
  return kpisService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
