import type { Router } from "express";
import { storefrontController } from "./controller";
import { manifest } from "./manifest";

export function registerStorefrontRoutes(router: Router) {
  router.get(manifest.routeBase, storefrontController.list);
  router.post(manifest.routeBase, storefrontController.create);
  router.patch(`${manifest.routeBase}/:id`, storefrontController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, storefrontController.transition);
}
