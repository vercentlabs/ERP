import type { Router } from "express";
import { contactsController } from "./controller";
import { manifest } from "./manifest";

export function registerContactsRoutes(router: Router) {
  router.get(manifest.routeBase, contactsController.list);
  router.post(manifest.routeBase, contactsController.create);
  router.patch(`${manifest.routeBase}/:id`, contactsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, contactsController.transition);
}
