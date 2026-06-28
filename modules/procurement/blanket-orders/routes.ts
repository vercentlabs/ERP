import type { Router } from "express";
import { blanketOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerBlanketOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, blanketOrdersController.list);
  router.post(manifest.routeBase, blanketOrdersController.create);
  router.patch(`${manifest.routeBase}/:id`, blanketOrdersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, blanketOrdersController.transition);
}
