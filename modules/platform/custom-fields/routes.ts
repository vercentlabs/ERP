import type { Router } from "express";
import { customFieldsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomFieldsRoutes(router: Router) {
  router.get(manifest.routeBase, customFieldsController.list);
  router.post(manifest.routeBase, customFieldsController.create);
  router.patch(`${manifest.routeBase}/:id`, customFieldsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customFieldsController.transition);
}
