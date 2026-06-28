import sample from "./sample.json";
import { catalogService } from "../service";

export async function seedCatalog() {
  return catalogService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
