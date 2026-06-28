import type { Router } from "express";
import { renewalsController } from "./controller";
import { manifest } from "./manifest";

export function registerRenewalsRoutes(router: Router) {
  router.get(manifest.routeBase, renewalsController.list);
  router.post(manifest.routeBase, renewalsController.create);
  router.patch(`${manifest.routeBase}/:id`, renewalsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, renewalsController.transition);
}
