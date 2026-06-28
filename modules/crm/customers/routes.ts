import type { Router } from "express";
import { customersController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomersRoutes(router: Router) {
  router.get(manifest.routeBase, customersController.list);
  router.post(manifest.routeBase, customersController.create);
  router.patch(`${manifest.routeBase}/:id`, customersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customersController.transition);
}
