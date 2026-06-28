import type { Router } from "express";
import { knowledgeBaseController } from "./controller";
import { manifest } from "./manifest";

export function registerKnowledgeBaseRoutes(router: Router) {
  router.get(manifest.routeBase, knowledgeBaseController.list);
  router.post(manifest.routeBase, knowledgeBaseController.create);
  router.patch(`${manifest.routeBase}/:id`, knowledgeBaseController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, knowledgeBaseController.transition);
}
