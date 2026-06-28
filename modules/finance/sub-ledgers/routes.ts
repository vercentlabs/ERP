import type { Router } from "express";
import { subLedgersController } from "./controller";
import { manifest } from "./manifest";

export function registerSubLedgersRoutes(router: Router) {
  router.get(manifest.routeBase, subLedgersController.list);
  router.post(manifest.routeBase, subLedgersController.create);
  router.patch(`${manifest.routeBase}/:id`, subLedgersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, subLedgersController.transition);
}
