import sample from "./sample.json";
import { knowledgeBaseService } from "../service";

export async function seedKnowledgeBase() {
  return knowledgeBaseService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
