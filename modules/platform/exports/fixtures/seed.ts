import sample from "./sample.json";
import { exportsService } from "../service";

export async function seedExports() {
  return exportsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
