import type { Router } from "express";
import { customerGroupsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomerGroupsRoutes(router: Router) {
  router.get(manifest.routeBase, customerGroupsController.list);
  router.post(manifest.routeBase, customerGroupsController.create);
  router.patch(`${manifest.routeBase}/:id`, customerGroupsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customerGroupsController.transition);
}
