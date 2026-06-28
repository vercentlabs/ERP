import sample from "./sample.json";
import { customerGroupsService } from "../service";

export async function seedCustomerGroups() {
  return customerGroupsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
