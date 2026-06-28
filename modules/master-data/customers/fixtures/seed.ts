import sample from "./sample.json";
import { customersService } from "../service";

export async function seedCustomers() {
  return customersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
