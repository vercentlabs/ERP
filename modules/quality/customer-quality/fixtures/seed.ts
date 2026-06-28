import sample from "./sample.json";
import { customerQualityService } from "../service";

export async function seedCustomerQuality() {
  return customerQualityService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
