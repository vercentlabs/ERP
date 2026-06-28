import sample from "./sample.json";
import { recruitmentService } from "../service";

export async function seedRecruitment() {
  return recruitmentService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
