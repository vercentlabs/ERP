import type { Router } from "express";
import { opportunitiesController } from "./controller";
import { manifest } from "./manifest";

export function registerOpportunitiesRoutes(router: Router) {
  router.get(manifest.routeBase, opportunitiesController.list);
  router.post(manifest.routeBase, opportunitiesController.create);
  router.get(`${manifest.routeBase}/stats`, opportunitiesController.stats);
  router.get(`${manifest.routeBase}/pipeline-summary`, opportunitiesController.pipelineSummary);
  router.get(`${manifest.routeBase}/forecast-summary`, opportunitiesController.forecastSummary);
  router.get(`${manifest.routeBase}/:id`, opportunitiesController.getById);
  router.patch(`${manifest.routeBase}/:id`, opportunitiesController.update);
  router.delete(`${manifest.routeBase}/:id`, opportunitiesController.softDelete);
  router.post(`${manifest.routeBase}/:id/stage`, opportunitiesController.changeStage);
  router.post(`${manifest.routeBase}/:id/assign`, opportunitiesController.assign);
}
