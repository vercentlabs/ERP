import type { Router } from "express";
import { semanticLayerController } from "./controller";
import { manifest } from "./manifest";

export function registerSemanticLayerRoutes(router: Router) {
  router.get(manifest.routeBase, semanticLayerController.list);
  router.post(manifest.routeBase, semanticLayerController.create);
  router.patch(`${manifest.routeBase}/:id`, semanticLayerController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, semanticLayerController.transition);
}
