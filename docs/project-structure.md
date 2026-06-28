# Vercent ERP Project Structure

This document captures the final recommended SaaS ERP project structure. It is designed as a clean enterprise monorepo, using the current repository as the migration baseline.

```txt
vercent-erp-platform/
|- .github/
|  |- dependabot.yml
|  `- workflows/
|     |- ci.yml
|     |- monorepo-ci.yml
|     |- api-contracts.yml
|     |- database-migrations.yml
|     |- security-scan.yml
|     |- docker-build.yml
|     |- deploy-dev.yml
|     |- deploy-staging.yml
|     |- deploy-production.yml
|     |- backup-verify.yml
|     `- release.yml
|
|- apps/
|  |- web/
|  |  |- Dockerfile
|  |  |- README.md
|  |  |- package.json
|  |  |- next.config.mjs
|  |  |- eslint.config.mjs
|  |  |- postcss.config.mjs
|  |  |- tailwind.config.ts
|  |  |- tsconfig.json
|  |  |- components.json
|  |  |- public/
|  |  |  |- brand/
|  |  |  |  |- logo.png
|  |  |  |  `- text-logo.png
|  |  |  |- icons/
|  |  |  `- images/
|  |  `- src/
|  |     |- app/
|  |     |  |- layout.tsx
|  |     |  |- page.tsx
|  |     |  |- loading.tsx
|  |     |  |- error.tsx
|  |     |  |- not-found.tsx
|  |     |  |- globals.css
|  |     |  |- login/page.tsx
|  |     |  |- forgot-password/page.tsx
|  |     |  |- reset-password/page.tsx
|  |     |  |- unauthorized/page.tsx
|  |     |  |- dashboard/page.tsx
|  |     |  |- command-center/page.tsx
|  |     |  |- crm/
|  |     |  |  |- leads/page.tsx
|  |     |  |  |- leads/[id]/page.tsx
|  |     |  |  |- accounts/page.tsx
|  |     |  |  |- accounts/[id]/page.tsx
|  |     |  |  |- contacts/page.tsx
|  |     |  |  |- contacts/[id]/page.tsx
|  |     |  |  |- customers/page.tsx
|  |     |  |  |- customers/[id]/page.tsx
|  |     |  |  |- opportunities/page.tsx
|  |     |  |  |- campaigns/page.tsx
|  |     |  |  |- activities/page.tsx
|  |     |  |  `- customer-360/page.tsx
|  |     |  |- sales/
|  |     |  |  |- pipeline/page.tsx
|  |     |  |  |- quotations/page.tsx
|  |     |  |  |- quotations/[id]/page.tsx
|  |     |  |  |- orders/page.tsx
|  |     |  |  |- orders/[id]/page.tsx
|  |     |  |  |- delivery-notes/page.tsx
|  |     |  |  |- invoices/page.tsx
|  |     |  |  |- credit-notes/page.tsx
|  |     |  |  |- returns/page.tsx
|  |     |  |  |- price-books/page.tsx
|  |     |  |  |- commissions/page.tsx
|  |     |  |  `- forecasting/page.tsx
|  |     |  |- procurement/
|  |     |  |  |- suppliers/page.tsx
|  |     |  |  |- requisitions/page.tsx
|  |     |  |  |- rfqs/page.tsx
|  |     |  |  |- supplier-quotations/page.tsx
|  |     |  |  |- purchase-orders/page.tsx
|  |     |  |  |- goods-receipts/page.tsx
|  |     |  |  |- purchase-returns/page.tsx
|  |     |  |  |- vendor-bills/page.tsx
|  |     |  |  |- three-way-match/page.tsx
|  |     |  |  |- contracts/page.tsx
|  |     |  |  `- supplier-scorecards/page.tsx
|  |     |  |- inventory/
|  |     |  |  |- items/page.tsx
|  |     |  |  |- item-categories/page.tsx
|  |     |  |  |- units-of-measure/page.tsx
|  |     |  |  |- warehouses/page.tsx
|  |     |  |  |- locations/page.tsx
|  |     |  |  |- stock-ledger/page.tsx
|  |     |  |  |- stock-balances/page.tsx
|  |     |  |  |- stock-transfers/page.tsx
|  |     |  |  |- stock-adjustments/page.tsx
|  |     |  |  |- serial-batches/page.tsx
|  |     |  |  |- barcode/page.tsx
|  |     |  |  |- cycle-counts/page.tsx
|  |     |  |  |- replenishment/page.tsx
|  |     |  |  |- demand-planning/page.tsx
|  |     |  |  |- safety-stock/page.tsx
|  |     |  |  `- valuation/page.tsx
|  |     |  |- warehouse/
|  |     |  |  |- receiving/page.tsx
|  |     |  |  |- putaway/page.tsx
|  |     |  |  |- bins/page.tsx
|  |     |  |  |- picking/page.tsx
|  |     |  |  |- packing/page.tsx
|  |     |  |  |- shipping/page.tsx
|  |     |  |  |- waves/page.tsx
|  |     |  |  |- dock-management/page.tsx
|  |     |  |  `- mobile-scanning/page.tsx
|  |     |  |- logistics/
|  |     |  |  |- carriers/page.tsx
|  |     |  |  |- shipments/page.tsx
|  |     |  |  |- freight-rates/page.tsx
|  |     |  |  |- tracking/page.tsx
|  |     |  |  |- routes/page.tsx
|  |     |  |  |- delivery-runs/page.tsx
|  |     |  |  `- proof-of-delivery/page.tsx
|  |     |  |- finance/
|  |     |  |  |- chart-of-accounts/page.tsx
|  |     |  |  |- fiscal-years/page.tsx
|  |     |  |  |- accounting-periods/page.tsx
|  |     |  |  |- journals/page.tsx
|  |     |  |  |- general-ledger/page.tsx
|  |     |  |  |- accounts-receivable/page.tsx
|  |     |  |  |- accounts-payable/page.tsx
|  |     |  |  |- payments/page.tsx
|  |     |  |  |- receipts/page.tsx
|  |     |  |  |- bank-reconciliation/page.tsx
|  |     |  |  |- taxes/page.tsx
|  |     |  |  |- currencies/page.tsx
|  |     |  |  |- cost-centers/page.tsx
|  |     |  |  |- profit-centers/page.tsx
|  |     |  |  |- budgets/page.tsx
|  |     |  |  |- fixed-assets/page.tsx
|  |     |  |  |- revenue-recognition/page.tsx
|  |     |  |  |- period-close/page.tsx
|  |     |  |  |- consolidation/page.tsx
|  |     |  |  |- cash-flow/page.tsx
|  |     |  |  `- reports/page.tsx
|  |     |  |- manufacturing/
|  |     |  |  |- bom/page.tsx
|  |     |  |  |- routings/page.tsx
|  |     |  |  |- work-centers/page.tsx
|  |     |  |  |- production-orders/page.tsx
|  |     |  |  |- mrp/page.tsx
|  |     |  |  |- mps/page.tsx
|  |     |  |  |- shop-floor/page.tsx
|  |     |  |  |- capacity-planning/page.tsx
|  |     |  |  |- subcontracting/page.tsx
|  |     |  |  |- scrap-rework/page.tsx
|  |     |  |  `- costing/page.tsx
|  |     |  |- quality/
|  |     |  |  |- inspection-plans/page.tsx
|  |     |  |  |- inspections/page.tsx
|  |     |  |  |- non-conformance/page.tsx
|  |     |  |  |- corrective-actions/page.tsx
|  |     |  |  |- supplier-quality/page.tsx
|  |     |  |  |- customer-quality/page.tsx
|  |     |  |  `- certificates/page.tsx
|  |     |  |- maintenance/
|  |     |  |  |- assets/page.tsx
|  |     |  |  |- equipment/page.tsx
|  |     |  |  |- preventive-maintenance/page.tsx
|  |     |  |  |- maintenance-orders/page.tsx
|  |     |  |  |- spare-parts/page.tsx
|  |     |  |  |- downtime/page.tsx
|  |     |  |  `- asset-performance/page.tsx
|  |     |  |- hr/
|  |     |  |  |- employees/page.tsx
|  |     |  |  |- departments/page.tsx
|  |     |  |  |- designations/page.tsx
|  |     |  |  |- attendance/page.tsx
|  |     |  |  |- leave/page.tsx
|  |     |  |  |- shifts/page.tsx
|  |     |  |  |- recruitment/page.tsx
|  |     |  |  |- onboarding/page.tsx
|  |     |  |  |- performance/page.tsx
|  |     |  |  |- learning/page.tsx
|  |     |  |  |- expenses/page.tsx
|  |     |  |  `- documents/page.tsx
|  |     |  |- payroll/
|  |     |  |  |- salary-components/page.tsx
|  |     |  |  |- salary-structures/page.tsx
|  |     |  |  |- payroll-periods/page.tsx
|  |     |  |  |- payroll-runs/page.tsx
|  |     |  |  |- payslips/page.tsx
|  |     |  |  |- deductions/page.tsx
|  |     |  |  |- benefits/page.tsx
|  |     |  |  |- loans-advances/page.tsx
|  |     |  |  |- tax-declarations/page.tsx
|  |     |  |  |- accounting-posting/page.tsx
|  |     |  |  `- statutory/india/page.tsx
|  |     |  |- projects/
|  |     |  |  |- page.tsx
|  |     |  |  |- [id]/page.tsx
|  |     |  |  |- programs/page.tsx
|  |     |  |  |- milestones/page.tsx
|  |     |  |  |- tasks/page.tsx
|  |     |  |  |- resource-planning/page.tsx
|  |     |  |  |- timesheets/page.tsx
|  |     |  |  |- expenses/page.tsx
|  |     |  |  |- billing/page.tsx
|  |     |  |  |- costing/page.tsx
|  |     |  |  `- profitability/page.tsx
|  |     |  |- helpdesk/
|  |     |  |  |- tickets/page.tsx
|  |     |  |  |- tickets/[id]/page.tsx
|  |     |  |  |- queues/page.tsx
|  |     |  |  |- slas/page.tsx
|  |     |  |  |- escalations/page.tsx
|  |     |  |  |- entitlements/page.tsx
|  |     |  |  |- knowledge-base/page.tsx
|  |     |  |  |- returns-repairs/page.tsx
|  |     |  |  `- analytics/page.tsx
|  |     |  |- field-service/
|  |     |  |  |- work-orders/page.tsx
|  |     |  |  |- dispatch/page.tsx
|  |     |  |  |- technicians/page.tsx
|  |     |  |  |- route-planning/page.tsx
|  |     |  |  |- mobile-jobs/page.tsx
|  |     |  |  |- customer-assets/page.tsx
|  |     |  |  |- service-parts/page.tsx
|  |     |  |  `- field-invoicing/page.tsx
|  |     |  |- commerce/
|  |     |  |  |- catalog/page.tsx
|  |     |  |  |- storefront/page.tsx
|  |     |  |  |- carts/page.tsx
|  |     |  |  |- checkout/page.tsx
|  |     |  |  |- orders/page.tsx
|  |     |  |  |- promotions/page.tsx
|  |     |  |  |- coupons/page.tsx
|  |     |  |  `- channel-sync/page.tsx
|  |     |  |- subscriptions/
|  |     |  |  |- products/page.tsx
|  |     |  |  |- plans/page.tsx
|  |     |  |  |- contracts/page.tsx
|  |     |  |  |- billing-schedules/page.tsx
|  |     |  |  |- metered-usage/page.tsx
|  |     |  |  |- renewals/page.tsx
|  |     |  |  |- dunning/page.tsx
|  |     |  |  `- revenue-recognition/page.tsx
|  |     |  |- enterprise-performance/
|  |     |  |  |- planning/page.tsx
|  |     |  |  |- budgeting/page.tsx
|  |     |  |  |- forecasting/page.tsx
|  |     |  |  |- scenario-modeling/page.tsx
|  |     |  |  |- variance-analysis/page.tsx
|  |     |  |  |- management-reporting/page.tsx
|  |     |  |  `- board-packs/page.tsx
|  |     |  |- sustainability/
|  |     |  |  |- emissions/page.tsx
|  |     |  |  |- energy-usage/page.tsx
|  |     |  |  |- carbon-accounting/page.tsx
|  |     |  |  |- sustainability-reports/page.tsx
|  |     |  |  |- supplier-sustainability/page.tsx
|  |     |  |  `- compliance-disclosures/page.tsx
|  |     |  |- analytics/
|  |     |  |  |- dashboards/page.tsx
|  |     |  |  |- reports/page.tsx
|  |     |  |  |- report-builder/page.tsx
|  |     |  |  |- kpis/page.tsx
|  |     |  |  |- data-marts/page.tsx
|  |     |  |  |- scheduled-reports/page.tsx
|  |     |  |  `- ai-insights/page.tsx
|  |     |  |- automation/
|  |     |  |  |- workflows/page.tsx
|  |     |  |  |- approvals/page.tsx
|  |     |  |  |- rules/page.tsx
|  |     |  |  `- scheduler/page.tsx
|  |     |  |- ai/
|  |     |  |  |- assistant/page.tsx
|  |     |  |  |- agents/page.tsx
|  |     |  |  |- recommendations/page.tsx
|  |     |  |  `- document-intelligence/page.tsx
|  |     |  |- integrations/
|  |     |  |  |- marketplace/page.tsx
|  |     |  |  |- installed/page.tsx
|  |     |  |  |- webhooks/page.tsx
|  |     |  |  |- api-keys/page.tsx
|  |     |  |  `- developer-portal/page.tsx
|  |     |  |- extension-studio/
|  |     |  |  |- app-builder/page.tsx
|  |     |  |  |- custom-objects/page.tsx
|  |     |  |  |- custom-pages/page.tsx
|  |     |  |  |- custom-fields/page.tsx
|  |     |  |  |- custom-workflows/page.tsx
|  |     |  |  |- custom-reports/page.tsx
|  |     |  |  |- custom-dashboards/page.tsx
|  |     |  |  |- scripting/page.tsx
|  |     |  |  `- validation-rules/page.tsx
|  |     |  `- settings/
|  |     |     |- page.tsx
|  |     |     |- users/page.tsx
|  |     |     |- teams/page.tsx
|  |     |     |- roles/page.tsx
|  |     |     |- companies/page.tsx
|  |     |     |- branches/page.tsx
|  |     |     |- fiscal-calendars/page.tsx
|  |     |     |- custom-fields/page.tsx
|  |     |     |- custom-layouts/page.tsx
|  |     |     |- naming-series/page.tsx
|  |     |     |- localization/page.tsx
|  |     |     |- audit-logs/page.tsx
|  |     |     |- compliance/page.tsx
|  |     |     `- security/page.tsx
|  |     |- components/
|  |     |  |- layout/AppShell.tsx
|  |     |  |- layout/Sidebar.tsx
|  |     |  |- layout/Topbar.tsx
|  |     |  |- layout/ModuleHeader.tsx
|  |     |  |- layout/Breadcrumbs.tsx
|  |     |  |- ui/Button.tsx
|  |     |  |- ui/Card.tsx
|  |     |  |- ui/DataTable.tsx
|  |     |  |- ui/FormDrawer.tsx
|  |     |  |- ui/StatusBadge.tsx
|  |     |  |- ui/CommandPalette.tsx
|  |     |  |- ui/ConfirmDialog.tsx
|  |     |  |- documents/AttachmentsPanel.tsx
|  |     |  |- documents/CommentsPanel.tsx
|  |     |  |- documents/AuditInfo.tsx
|  |     |  |- documents/DocumentActionsMenu.tsx
|  |     |  |- documents/WorkflowActions.tsx
|  |     |  |- charts/KpiCard.tsx
|  |     |  |- charts/TrendChart.tsx
|  |     |  |- charts/FunnelChart.tsx
|  |     |  `- forms/DynamicForm.tsx
|  |     |- features/
|  |     |  |- crm/
|  |     |  |- sales/
|  |     |  |- procurement/
|  |     |  |- inventory/
|  |     |  |- warehouse/
|  |     |  |- logistics/
|  |     |  |- finance/
|  |     |  |- manufacturing/
|  |     |  |- quality/
|  |     |  |- maintenance/
|  |     |  |- hr/
|  |     |  |- payroll/
|  |     |  |- projects/
|  |     |  |- helpdesk/
|  |     |  |- field-service/
|  |     |  |- commerce/
|  |     |  |- subscriptions/
|  |     |  |- analytics/
|  |     |  |- automation/
|  |     |  |- ai/
|  |     |  `- settings/
|  |     |- context/AuthContext.tsx
|  |     |- hooks/useAuth.ts
|  |     |- hooks/usePermissions.ts
|  |     |- hooks/useWorkspace.ts
|  |     |- hooks/useDebounce.ts
|  |     |- hooks/useInfiniteScroll.ts
|  |     `- lib/
|  |        |- api/client.ts
|  |        |- api/index.ts
|  |        |- auth.ts
|  |        |- permissions.ts
|  |        |- menu.ts
|  |        |- modules.ts
|  |        |- formatters.ts
|  |        |- csv.ts
|  |        |- documents.ts
|  |        `- response.ts
|  |
|  |- mobile/
|  |  |- package.json
|  |  |- app.json
|  |  |- eas.json
|  |  |- App.tsx
|  |  |- index.ts
|  |  |- babel.config.js
|  |  |- metro.config.js
|  |  |- tailwind.config.js
|  |  |- tsconfig.json
|  |  |- vitest.config.ts
|  |  |- assets/
|  |  |  |- icon.png
|  |  |  |- adaptive-icon.png
|  |  |  |- splash-icon.png
|  |  |  `- favicon.png
|  |  `- src/
|  |     |- navigation/RootNavigator.tsx
|  |     |- navigation/AppDrawer.tsx
|  |     |- navigation/AppTabs.tsx
|  |     |- navigation/menuConfig.ts
|  |     |- context/AuthContext.tsx
|  |     |- components/ui/Button.tsx
|  |     |- components/ui/Card.tsx
|  |     |- components/ui/Input.tsx
|  |     |- components/ui/Chip.tsx
|  |     |- modules/crm/LeadsScreen.tsx
|  |     |- modules/crm/ContactsScreen.tsx
|  |     |- modules/sales/OrdersScreen.tsx
|  |     |- modules/inventory/ItemsScreen.tsx
|  |     |- modules/warehouse/ScannerScreen.tsx
|  |     |- modules/projects/ProjectsScreen.tsx
|  |     |- modules/helpdesk/TicketsScreen.tsx
|  |     |- modules/field-service/DispatchScreen.tsx
|  |     |- modules/hr/AttendanceScreen.tsx
|  |     |- modules/payroll/PayslipsScreen.tsx
|  |     |- modules/analytics/DashboardScreen.tsx
|  |     |- services/api.ts
|  |     |- services/apiBase.ts
|  |     |- services/authStorage.ts
|  |     |- services/offlineQueue.ts
|  |     |- services/offlineRuntime.ts
|  |     |- services/realtime.ts
|  |     |- services/pushNotifications.ts
|  |     |- theme/index.ts
|  |     |- theme/colors.ts
|  |     |- theme/spacing.ts
|  |     |- theme/typography.ts
|  |     `- utils/normalizers.ts
|  |
|  |- landing/
|  |- admin-console/
|  |- customer-portal/
|  |- supplier-portal/
|  |- employee-portal/
|  |- partner-portal/
|  |- developer-portal/
|  `- extension-studio/
|
|- services/
|  |- api/
|  |- control-plane/
|  |- workers/
|  |- realtime/
|  |- billing/
|  |- metering/
|  |- automation/
|  |- integrations/
|  |- files/
|  |- search/
|  |- ai/
|  |- data-platform/
|  |- extension-runtime/
|  `- master-data/
|
|- modules/
|  |- platform/
|  |  |- auth/
|  |  |- users/
|  |  |- teams/
|  |  |- roles-permissions/
|  |  |- companies/
|  |  |- branches/
|  |  |- fiscal-calendars/
|  |  |- workflow-approvals/
|  |  |- audit-logs/
|  |  |- custom-fields/
|  |  |- custom-layouts/
|  |  |- naming-series/
|  |  |- documents/
|  |  |- comments/
|  |  |- notifications/
|  |  |- imports/
|  |  |- exports/
|  |  |- search/
|  |  |- localization/
|  |  |- integrations/
|  |  `- settings/
|  |
|  |- master-data/
|  |  |- parties/
|  |  |- customers/
|  |  |- suppliers/
|  |  |- items/
|  |  |- employees/
|  |  |- locations/
|  |  |- chart-master/
|  |  |- tax-master/
|  |  |- currency-master/
|  |  |- uom-master/
|  |  |- address-book/
|  |  |- data-quality/
|  |  |- deduplication/
|  |  `- data-governance/
|  |
|  |- crm/
|  |  |- leads/
|  |  |- accounts/
|  |  |- contacts/
|  |  |- customers/
|  |  |- opportunities/
|  |  |- activities/
|  |  |- campaigns/
|  |  |- segments/
|  |  |- lead-scoring/
|  |  `- customer-360/
|  |
|  |- sales/
|  |  |- price-books/
|  |  |- quotations/
|  |  |- sales-orders/
|  |  |- delivery-notes/
|  |  |- invoices/
|  |  |- credit-notes/
|  |  |- returns/
|  |  |- discounts/
|  |  |- commissions/
|  |  |- sales-targets/
|  |  `- forecasting/
|  |
|  |- procurement/
|  |  |- suppliers/
|  |  |- supplier-portal/
|  |  |- purchase-requisitions/
|  |  |- rfqs/
|  |  |- supplier-quotations/
|  |  |- purchase-orders/
|  |  |- blanket-orders/
|  |  |- purchase-contracts/
|  |  |- goods-receipts/
|  |  |- purchase-returns/
|  |  |- vendor-bills/
|  |  |- three-way-match/
|  |  |- landed-costs/
|  |  |- procurement-policies/
|  |  `- supplier-scorecards/
|  |
|  |- inventory/
|  |  |- items/
|  |  |- item-categories/
|  |  |- units-of-measure/
|  |  |- warehouses/
|  |  |- locations/
|  |  |- stock-ledger/
|  |  |- stock-balances/
|  |  |- stock-transfers/
|  |  |- stock-adjustments/
|  |  |- reservations/
|  |  |- serial-batches/
|  |  |- barcode/
|  |  |- cycle-counts/
|  |  |- replenishment/
|  |  |- demand-planning/
|  |  |- safety-stock/
|  |  `- valuation/
|  |
|  |- warehouse/
|  |  |- receiving/
|  |  |- putaway/
|  |  |- bins/
|  |  |- picking/
|  |  |- packing/
|  |  |- shipping/
|  |  |- waves/
|  |  |- replenishment-tasks/
|  |  |- dock-management/
|  |  `- mobile-scanning/
|  |
|  |- logistics/
|  |  |- carriers/
|  |  |- shipments/
|  |  |- freight-rates/
|  |  |- shipment-tracking/
|  |  |- routes/
|  |  |- delivery-runs/
|  |  |- proof-of-delivery/
|  |  `- transport-costing/
|  |
|  |- finance/
|  |  |- chart-of-accounts/
|  |  |- fiscal-years/
|  |  |- accounting-periods/
|  |  |- journals/
|  |  |- general-ledger/
|  |  |- sub-ledgers/
|  |  |- accounts-receivable/
|  |  |- accounts-payable/
|  |  |- payments/
|  |  |- receipts/
|  |  |- bank-accounts/
|  |  |- bank-reconciliation/
|  |  |- taxes/
|  |  |- currencies/
|  |  |- exchange-rates/
|  |  |- cost-centers/
|  |  |- profit-centers/
|  |  |- budgets/
|  |  |- fixed-assets/
|  |  |- revenue-recognition/
|  |  |- deferred-revenue/
|  |  |- period-close/
|  |  |- consolidation/
|  |  |- cash-flow/
|  |  `- financial-reports/
|  |
|  |- enterprise-performance/
|  |  |- planning/
|  |  |- budgeting/
|  |  |- forecasting/
|  |  |- scenario-modeling/
|  |  |- variance-analysis/
|  |  |- management-reporting/
|  |  `- board-packs/
|  |
|  |- manufacturing/
|  |  |- bill-of-materials/
|  |  |- routings/
|  |  |- work-centers/
|  |  |- production-orders/
|  |  |- mrp/
|  |  |- mps/
|  |  |- shop-floor/
|  |  |- capacity-planning/
|  |  |- subcontracting/
|  |  |- scrap-rework/
|  |  |- production-costing/
|  |  `- manufacturing-analytics/
|  |
|  |- quality/
|  |  |- inspection-plans/
|  |  |- quality-inspections/
|  |  |- non-conformance/
|  |  |- corrective-actions/
|  |  |- supplier-quality/
|  |  |- customer-quality/
|  |  `- quality-certificates/
|  |
|  |- maintenance/
|  |  |- assets/
|  |  |- equipment/
|  |  |- preventive-maintenance/
|  |  |- maintenance-orders/
|  |  |- spare-parts/
|  |  |- downtime/
|  |  `- asset-performance/
|  |
|  |- product-lifecycle/
|  |  |- products/
|  |  |- variants/
|  |  |- engineering-change-orders/
|  |  |- product-revisions/
|  |  |- compliance-documents/
|  |  `- lifecycle-costing/
|  |
|  |- hr/
|  |  |- employees/
|  |  |- departments/
|  |  |- designations/
|  |  |- employment-contracts/
|  |  |- attendance/
|  |  |- leave/
|  |  |- shifts/
|  |  |- recruitment/
|  |  |- onboarding/
|  |  |- performance/
|  |  |- learning/
|  |  |- expenses/
|  |  `- employee-documents/
|  |
|  |- payroll/
|  |  |- salary-components/
|  |  |- salary-structures/
|  |  |- payroll-periods/
|  |  |- payroll-runs/
|  |  |- payslips/
|  |  |- deductions/
|  |  |- benefits/
|  |  |- loans-advances/
|  |  |- tax-declarations/
|  |  |- accounting-posting/
|  |  `- localizations/
|  |     `- india/
|  |        |- pf/
|  |        |- esi/
|  |        |- professional-tax/
|  |        |- tds/
|  |        |- gratuity/
|  |        `- form-16/
|  |
|  |- projects/
|  |  |- projects/
|  |  |- programs/
|  |  |- milestones/
|  |  |- project-tasks/
|  |  |- resource-planning/
|  |  |- timesheets/
|  |  |- project-expenses/
|  |  |- project-billing/
|  |  |- project-costing/
|  |  |- profitability/
|  |  `- project-templates/
|  |
|  |- helpdesk/
|  |  |- tickets/
|  |  |- queues/
|  |  |- slas/
|  |  |- escalations/
|  |  |- entitlements/
|  |  |- knowledge-base/
|  |  |- customer-portal/
|  |  |- returns-repairs/
|  |  |- service-contracts/
|  |  `- service-analytics/
|  |
|  |- field-service/
|  |  |- service-work-orders/
|  |  |- dispatch/
|  |  |- technicians/
|  |  |- route-planning/
|  |  |- mobile-jobs/
|  |  |- customer-assets/
|  |  |- service-parts/
|  |  `- field-invoicing/
|  |
|  |- commerce/
|  |  |- catalog/
|  |  |- storefront/
|  |  |- carts/
|  |  |- checkout/
|  |  |- commerce-orders/
|  |  |- promotions/
|  |  |- coupons/
|  |  |- customer-groups/
|  |  `- channel-sync/
|  |
|  |- subscriptions/
|  |  |- products/
|  |  |- plans/
|  |  |- contracts/
|  |  |- billing-schedules/
|  |  |- metered-usage/
|  |  |- renewals/
|  |  |- dunning/
|  |  `- revenue-recognition/
|  |
|  |- compliance/
|  |  |- controls/
|  |  |- segregation-of-duties/
|  |  |- approvals-audit/
|  |  |- data-retention/
|  |  |- consent-management/
|  |  |- tax-compliance/
|  |  |- statutory-reports/
|  |  `- certifications/
|  |
|  |- risk-management/
|  |  |- risk-register/
|  |  |- risk-assessments/
|  |  |- incidents/
|  |  |- mitigations/
|  |  |- policy-management/
|  |  `- internal-controls/
|  |
|  |- sustainability/
|  |  |- emissions/
|  |  |- energy-usage/
|  |  |- carbon-accounting/
|  |  |- sustainability-reports/
|  |  |- supplier-sustainability/
|  |  `- compliance-disclosures/
|  |
|  |- analytics/
|  |  |- dashboards/
|  |  |- reports/
|  |  |- report-builder/
|  |  |- kpis/
|  |  |- data-marts/
|  |  |- scheduled-reports/
|  |  |- embedded-analytics/
|  |  `- ai-insights/
|  |
|  |- ai/
|  |  |- erp-assistant/
|  |  |- document-intelligence/
|  |  |- demand-forecasting/
|  |  |- cash-flow-forecasting/
|  |  |- anomaly-detection/
|  |  |- workflow-recommendations/
|  |  `- agent-orchestration/
|  |
|  |- extension-studio/
|  |  |- custom-objects/
|  |  |- custom-pages/
|  |  |- custom-fields/
|  |  |- custom-workflows/
|  |  |- custom-reports/
|  |  |- custom-dashboards/
|  |  |- scripting/
|  |  |- formula-fields/
|  |  |- validation-rules/
|  |  `- app-builder/
|  |
|  |- industry-packs/
|  |  |- discrete-manufacturing/
|  |  |- process-manufacturing/
|  |  |- retail/
|  |  |- wholesale-distribution/
|  |  |- professional-services/
|  |  |- construction/
|  |  |- healthcare/
|  |  |- education/
|  |  |- nonprofit/
|  |  |- food-and-beverage/
|  |  |- apparel/
|  |  |- automotive/
|  |  `- software-saas/
|  |
|  |- data-platform/
|  |  |- operational-data-store/
|  |  |- event-streams/
|  |  |- cdc/
|  |  |- data-lake/
|  |  |- data-warehouse/
|  |  |- semantic-layer/
|  |  |- metrics-layer/
|  |  `- bi-connectors/
|  |
|  `- integration-marketplace/
|     |- connectors/
|     |- installed-apps/
|     |- webhooks/
|     |- api-keys/
|     |- oauth-connections/
|     |- public-api/
|     |- sdk-management/
|     `- developer-portal/
|
|- packages/
|  |- shared-types/
|  |  |- package.json
|  |  `- src/index.ts
|  |- shared-ui/
|  |  |- package.json
|  |  `- src/index.ts
|  |- shared-sdk/
|  |  |- package.json
|  |  `- src/index.ts
|  |- observability/
|  |  |- package.json
|  |  `- src/index.ts
|  |- database/
|  |  |- package.json
|  |  `- src/
|  |     |- knex.ts
|  |     |- transactions.ts
|  |     |- tenantConnection.ts
|  |     `- migrations.ts
|  |- permissions/
|  |  |- package.json
|  |  `- src/
|  |     |- rbac.ts
|  |     |- abac.ts
|  |     |- permissionMatrix.ts
|  |     `- policyEvaluator.ts
|  |- workflows/
|  |  |- package.json
|  |  `- src/
|  |     |- workflowDefinition.ts
|  |     |- workflowRuntime.ts
|  |     |- approvalMatrix.ts
|  |     `- ruleEvaluator.ts
|  |- document-engine/
|  |  |- package.json
|  |  `- src/
|  |     |- documentStatus.ts
|  |     |- documentActions.ts
|  |     |- documentLifecycle.ts
|  |     `- documentNumbering.ts
|  |- reporting-engine/
|  |  |- package.json
|  |  `- src/
|  |     |- reportDefinition.ts
|  |     |- queryBuilder.ts
|  |     |- exportRenderer.ts
|  |     `- scheduledReports.ts
|  |- localization/
|  |  |- package.json
|  |  `- src/
|  |     |- currencies.ts
|  |     |- taxRegions.ts
|  |     |- dateFormats.ts
|  |     `- translations.ts
|  |- integrations-sdk/
|  |  |- package.json
|  |  `- src/
|  |     |- connector.ts
|  |     |- webhook.ts
|  |     |- oauth.ts
|  |     `- rateLimits.ts
|  `- test-utils/
|     |- package.json
|     `- src/
|        |- testDb.ts
|        |- tenantFactory.ts
|        |- authFactory.ts
|        `- fixtures.ts
|
|- database/
|  |- control-plane/
|  |  |- migrations/
|  |  |  |- 001_create_tenants.sql
|  |  |  |- 002_create_subscriptions.sql
|  |  |  |- 003_create_plan_entitlements.sql
|  |  |  |- 004_create_tenant_databases.sql
|  |  |  |- 005_create_billing_accounts.sql
|  |  |  |- 006_create_usage_meters.sql
|  |  |  |- 007_create_api_clients.sql
|  |  |  `- 008_create_audit_events.sql
|  |  `- seeds/
|  |     |- default_plans.sql
|  |     |- default_entitlements.sql
|  |     `- default_platform_admin.sql
|  `- tenant/
|     |- migrations/
|     |  |- 001_core.sql
|     |  |- 010_platform_identity.sql
|     |  |- 020_platform_security.sql
|     |  |- 030_platform_documents.sql
|     |  |- 040_platform_workflows.sql
|     |  |- 050_crm.sql
|     |  |- 060_sales.sql
|     |  |- 070_procurement.sql
|     |  |- 080_inventory.sql
|     |  |- 090_warehouse.sql
|     |  |- 100_logistics.sql
|     |  |- 110_finance.sql
|     |  |- 120_enterprise_performance.sql
|     |  |- 130_manufacturing.sql
|     |  |- 140_quality.sql
|     |  |- 150_maintenance.sql
|     |  |- 160_product_lifecycle.sql
|     |  |- 170_hr.sql
|     |  |- 180_payroll.sql
|     |  |- 190_projects.sql
|     |  |- 200_helpdesk.sql
|     |  |- 210_field_service.sql
|     |  |- 220_commerce.sql
|     |  |- 230_subscriptions.sql
|     |  |- 240_compliance.sql
|     |  |- 250_risk_management.sql
|     |  |- 260_sustainability.sql
|     |  |- 270_analytics.sql
|     |  |- 280_ai.sql
|     |  |- 290_extensions.sql
|     |  `- 300_integrations.sql
|     |- seeds/
|     |  |- default_roles.sql
|     |  |- default_permissions.sql
|     |  |- default_chart_of_accounts_india.sql
|     |  |- default_tax_templates_india.sql
|     |  |- default_numbering_series.sql
|     |  |- default_workflows.sql
|     |  `- default_dashboards.sql
|     |- views/
|     |  |- finance_trial_balance.sql
|     |  |- finance_balance_sheet.sql
|     |  |- finance_profit_and_loss.sql
|     |  |- finance_cash_flow.sql
|     |  |- inventory_stock_balance.sql
|     |  |- inventory_stock_valuation.sql
|     |  |- sales_pipeline.sql
|     |  |- procurement_pending_receipts.sql
|     |  |- manufacturing_wip.sql
|     |  |- hr_attendance_summary.sql
|     |  |- payroll_register.sql
|     |  |- project_profitability.sql
|     |  `- helpdesk_sla_performance.sql
|     |- functions/
|     |  |- post_gl_entry.sql
|     |  |- reverse_gl_entry.sql
|     |  |- update_stock_balance.sql
|     |  |- calculate_inventory_valuation.sql
|     |  |- calculate_tax.sql
|     |  |- calculate_payroll.sql
|     |  |- generate_document_number.sql
|     |  `- enforce_tenant_scope.sql
|     `- policies/
|        |- tenant_rls.sql
|        |- company_scope_rls.sql
|        |- branch_scope_rls.sql
|        `- sensitive_fields_rls.sql
|
|- infrastructure/
|  |- docker/
|  |  |- compose.local.yml
|  |  |- compose.test.yml
|  |  |- postgres-init/01-create-databases.sh
|  |  `- redis/redis.conf
|  |- kubernetes/
|  |  |- namespace.yaml
|  |  |- configmap.yaml
|  |  |- secret.example.yaml
|  |  |- api-deployment.yaml
|  |  |- web-deployment.yaml
|  |  |- worker-deployment.yaml
|  |  |- realtime-deployment.yaml
|  |  |- migration-job.yaml
|  |  |- service.yaml
|  |  |- ingress.yaml
|  |  |- hpa.yaml
|  |  `- kustomization.yaml
|  |- terraform/
|  |  |- providers.tf
|  |  |- variables.tf
|  |  |- main.tf
|  |  |- outputs.tf
|  |  |- rds.tf
|  |  |- elasticache.tf
|  |  |- eks.tf
|  |  |- s3.tf
|  |  |- iam.tf
|  |  |- cloudwatch.tf
|  |  `- terraform.tfvars.example
|  `- aws/
|     |- README.md
|     |- backup-policy.json
|     |- s3-lifecycle.json
|     `- iam-policies/
|
|- scripts/
|  |- db/
|  |  |- migrate-control-plane.ts
|  |  |- migrate-tenant.ts
|  |  |- migrate-all-tenants.ts
|  |  |- check-safe-migrations.ts
|  |  |- check-database-scope.ts
|  |  `- seed-tenant-owner.ts
|  |- generators/
|  |  |- scaffold-module.ts
|  |  |- scaffold-page.ts
|  |  |- scaffold-migration.ts
|  |  `- scaffold-report.ts
|  |- deploy/
|  |  |- run-migrations.ts
|  |  |- trigger-hooks.ts
|  |  `- validate-kubernetes-manifests.ts
|  |- backups/
|  |  |- backup-and-verify.ts
|  |  `- restore-tenant.ts
|  |- devex/
|  |  |- local-dev-doctor.ts
|  |  |- module-structure.ts
|  |  |- workspace-standards.ts
|  |  |- platform-governance.ts
|  |  `- release-contract.ts
|  `- data-migration/
|     |- migrate-current-crm.ts
|     |- migrate-current-web-app.ts
|     |- migrate-current-mobile-app.ts
|     |- migrate-current-services.ts
|     `- verify-migration.ts
|
|- tests/
|  |- unit/
|  |- integration/
|  |- contract/
|  |- e2e/
|  |- load/
|  |- security/
|  `- fixtures/
|
|- docs/
|  |- architecture/
|  |  |- overview.md
|  |  |- monorepo.md
|  |  |- multi-tenancy.md
|  |  |- module-system.md
|  |  |- event-driven-architecture.md
|  |  |- security-model.md
|  |  |- database-design.md
|  |  |- scaling.md
|  |  `- disaster-recovery.md
|  |- modules/
|  |  |- crm.md
|  |  |- sales.md
|  |  |- procurement.md
|  |  |- inventory.md
|  |  |- warehouse.md
|  |  |- logistics.md
|  |  |- finance.md
|  |  |- manufacturing.md
|  |  |- quality.md
|  |  |- maintenance.md
|  |  |- hr.md
|  |  |- payroll.md
|  |  |- projects.md
|  |  |- helpdesk.md
|  |  |- field-service.md
|  |  |- commerce.md
|  |  |- subscriptions.md
|  |  |- compliance.md
|  |  |- sustainability.md
|  |  `- analytics.md
|  |- api/
|  |  |- public-api.md
|  |  |- webhooks.md
|  |  `- sdk.md
|  |- database/
|  |  |- migrations.md
|  |  |- tenant-schema.md
|  |  |- rls.md
|  |  `- backup-restore.md
|  |- security/
|  |  |- rbac-abac.md
|  |  |- audit.md
|  |  |- encryption.md
|  |  |- compliance.md
|  |  `- incident-response.md
|  `- deployment/
|     |- local.md
|     |- aws.md
|     |- kubernetes.md
|     `- ci-cd.md
|
|- .dockerignore
|- .editorconfig
|- .env.example
|- .gitattributes
|- .gitignore
|- .prettierignore
|- .prettierrc.json
|- eslint.config.mjs
|- package.json
|- pnpm-lock.yaml
|- pnpm-workspace.yaml
|- turbo.json
|- tsconfig.base.json
|- knip.json
`- README.md
```

## Standard file structure inside every module leaf

Every final leaf module, for example `modules/crm/leads/`, `modules/finance/general-ledger/`, `modules/payroll/payroll-runs/`, `modules/inventory/stock-ledger/`, should contain:

```txt
<module>/
|- index.ts
|- manifest.ts
|- permissions.ts
|- events.ts
|- constants.ts
|- types.ts
|- schemas.ts
|- routes.ts
|- controller.ts
|- service.ts
|- repository.ts
|- mapper.ts
|- policies.ts
|- validators.ts
|- audit.ts
|- workflows/
|  |- index.ts
|  |- create.workflow.ts
|  |- update.workflow.ts
|  |- submit.workflow.ts
|  |- approve.workflow.ts
|  |- reject.workflow.ts
|  |- cancel.workflow.ts
|  `- close.workflow.ts
|- jobs/
|  |- index.ts
|  |- sync.job.ts
|  |- reminder.job.ts
|  `- recompute.job.ts
|- reports/
|  |- index.ts
|  |- summary.report.ts
|  |- detail.report.ts
|  `- export.report.ts
|- integrations/
|  |- index.ts
|  |- inbound.adapter.ts
|  |- outbound.adapter.ts
|  `- webhook.adapter.ts
|- fixtures/
|  |- sample.json
|  `- seed.ts
`- tests/
   |- routes.test.ts
   |- service.test.ts
   |- repository.test.ts
   |- permissions.test.ts
   |- workflows.test.ts
   `- reports.test.ts
```

This is the final structure I would use for **Vercent ERP**.
