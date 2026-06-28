import type { Router } from "express";
import { discountsController } from "./controller";
import { manifest } from "./manifest";

export function registerDiscountsRoutes(router: Router) {
  router.get(manifest.routeBase, discountsController.list);
  router.post(manifest.routeBase, discountsController.create);
  router.patch(`${manifest.routeBase}/:id`, discountsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, discountsController.transition);
}
