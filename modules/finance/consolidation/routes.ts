import type { Router } from "express";
import { consolidationController } from "./controller";
import { manifest } from "./manifest";

export function registerConsolidationRoutes(router: Router) {
  router.get(manifest.routeBase, consolidationController.list);
  router.post(manifest.routeBase, consolidationController.create);
  router.patch(`${manifest.routeBase}/:id`, consolidationController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, consolidationController.transition);
}
