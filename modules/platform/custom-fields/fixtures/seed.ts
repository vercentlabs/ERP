import sample from "./sample.json";
import { customFieldsService } from "../service";

export async function seedCustomFields() {
  return customFieldsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
