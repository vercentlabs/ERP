import sample from "./sample.json";
import { customerPortalService } from "../service";

export async function seedCustomerPortal() {
  return customerPortalService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
