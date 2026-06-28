import type { Router } from "express";
import { cartsController } from "./controller";
import { manifest } from "./manifest";

export function registerCartsRoutes(router: Router) {
  router.get(manifest.routeBase, cartsController.list);
  router.post(manifest.routeBase, cartsController.create);
  router.patch(`${manifest.routeBase}/:id`, cartsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, cartsController.transition);
}
