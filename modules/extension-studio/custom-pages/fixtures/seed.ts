import sample from "./sample.json";
import { customPagesService } from "../service";

export async function seedCustomPages() {
  return customPagesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
