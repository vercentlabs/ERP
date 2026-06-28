import type { Router } from "express";
import { productsController } from "./controller";
import { manifest } from "./manifest";

export function registerProductsRoutes(router: Router) {
  router.get(manifest.routeBase, productsController.list);
  router.post(manifest.routeBase, productsController.create);
  router.patch(`${manifest.routeBase}/:id`, productsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, productsController.transition);
}
