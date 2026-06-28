import type { Router } from "express";
import { putawayController } from "./controller";
import { manifest } from "./manifest";

export function registerPutawayRoutes(router: Router) {
  router.get(manifest.routeBase, putawayController.list);
  router.post(manifest.routeBase, putawayController.create);
  router.patch(`${manifest.routeBase}/:id`, putawayController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, putawayController.transition);
}
