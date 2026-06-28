import type { Router } from "express";
import { plansController } from "./controller";
import { manifest } from "./manifest";

export function registerPlansRoutes(router: Router) {
  router.get(manifest.routeBase, plansController.list);
  router.post(manifest.routeBase, plansController.create);
  router.patch(`${manifest.routeBase}/:id`, plansController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, plansController.transition);
}
