import type { Router } from "express";
import { priceBooksController } from "./controller";
import { manifest } from "./manifest";

export function registerPriceBooksRoutes(router: Router) {
  router.get(manifest.routeBase, priceBooksController.list);
  router.post(manifest.routeBase, priceBooksController.create);
  router.patch(`${manifest.routeBase}/:id`, priceBooksController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, priceBooksController.transition);
}
