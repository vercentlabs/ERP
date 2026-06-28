import type { Router } from "express";
import { entitlementsController } from "./controller";
import { manifest } from "./manifest";

export function registerEntitlementsRoutes(router: Router) {
  router.get(manifest.routeBase, entitlementsController.list);
  router.post(manifest.routeBase, entitlementsController.create);
  router.patch(`${manifest.routeBase}/:id`, entitlementsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, entitlementsController.transition);
}
