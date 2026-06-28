import sample from "./sample.json";
import { importsService } from "../service";

export async function seedImports() {
  return importsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
