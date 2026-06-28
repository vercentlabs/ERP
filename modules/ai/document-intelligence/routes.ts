import type { Router } from "express";
import { documentIntelligenceController } from "./controller";
import { manifest } from "./manifest";

export function registerDocumentIntelligenceRoutes(router: Router) {
  router.get(manifest.routeBase, documentIntelligenceController.list);
  router.post(manifest.routeBase, documentIntelligenceController.create);
  router.patch(`${manifest.routeBase}/:id`, documentIntelligenceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, documentIntelligenceController.transition);
}
