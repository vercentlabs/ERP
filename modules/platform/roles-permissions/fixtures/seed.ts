import sample from "./sample.json";
import { rolesPermissionsService } from "../service";

export async function seedRolesPermissions() {
  return rolesPermissionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
