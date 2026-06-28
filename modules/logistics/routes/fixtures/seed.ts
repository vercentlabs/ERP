import sample from "./sample.json";
import { routesService } from "../service";

export async function seedRoutes() {
  return routesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
