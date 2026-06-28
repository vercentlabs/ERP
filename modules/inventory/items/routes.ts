import type { Router } from "express";
import { itemsController } from "./controller";
import { manifest } from "./manifest";

export function registerItemsRoutes(router: Router) {
  router.get(manifest.routeBase, itemsController.list);
  router.post(manifest.routeBase, itemsController.create);
  router.patch(`${manifest.routeBase}/:id`, itemsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, itemsController.transition);
}
