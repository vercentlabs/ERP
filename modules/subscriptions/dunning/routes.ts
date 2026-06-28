import type { Router } from "express";
import { dunningController } from "./controller";
import { manifest } from "./manifest";

export function registerDunningRoutes(router: Router) {
  router.get(manifest.routeBase, dunningController.list);
  router.post(manifest.routeBase, dunningController.create);
  router.patch(`${manifest.routeBase}/:id`, dunningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dunningController.transition);
}
