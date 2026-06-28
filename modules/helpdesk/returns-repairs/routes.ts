import type { Router } from "express";
import { returnsRepairsController } from "./controller";
import { manifest } from "./manifest";

export function registerReturnsRepairsRoutes(router: Router) {
  router.get(manifest.routeBase, returnsRepairsController.list);
  router.post(manifest.routeBase, returnsRepairsController.create);
  router.patch(`${manifest.routeBase}/:id`, returnsRepairsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, returnsRepairsController.transition);
}
