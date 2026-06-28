import sample from "./sample.json";
import { customer360Service } from "../service";

export async function seedCustomer360() {
  return customer360Service.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
