import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();

const write = async (filePath, content) => {
  const absolutePath = join(root, filePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, `${content.trimEnd()}\n`, "utf8");
};

const files = {
  "apps/web/src/lib/api/client.ts": `export type ApiClientOptions = {
  baseUrl: string;
  tenantId: string;
  accessToken?: string;
};

export function createApiClient(options: ApiClientOptions) {
  const headers = {
    "content-type": "application/json",
    "x-tenant-id": options.tenantId,
    ...(options.accessToken ? { authorization: \`Bearer \${options.accessToken}\` } : {}),
  };

  return {
    async get<T>(path: string): Promise<T> {
      const response = await fetch(new URL(path, options.baseUrl), { headers });
      if (!response.ok) throw new Error(await response.text());
      return response.json() as Promise<T>;
    },
    async post<T>(path: string, body: unknown): Promise<T> {
      const response = await fetch(new URL(path, options.baseUrl), {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json() as Promise<T>;
    },
  };
}`,
  "apps/web/src/lib/api/index.ts": `export * from "./client";`,
  "apps/web/src/lib/auth.ts": `export type SessionUser = {
  id: string;
  name: string;
  tenantId: string;
  roles: string[];
  permissions: string[];
};

export function canAccess(user: SessionUser | undefined, permission: string) {
  return Boolean(user?.permissions.includes("*") || user?.permissions.includes(permission));
}`,
  "apps/web/src/lib/permissions.ts": `export function hasAnyPermission(grants: string[], required: string[]) {
  return grants.includes("*") || required.some((permission) => grants.includes(permission));
}

export function modulePermission(module: string, action: string) {
  return \`\${module}:\${action}\`;
}`,
  "apps/web/src/lib/modules.ts": `export const erpModules = [
  "crm",
  "sales",
  "procurement",
  "inventory",
  "finance",
  "manufacturing",
  "hr",
  "payroll",
  "projects",
  "helpdesk",
  "analytics",
  "ai",
] as const;

export type ErpModule = (typeof erpModules)[number];`,
  "apps/web/src/lib/menu.ts": `import { erpModules } from "./modules";

export const mainMenu = erpModules.map((module) => ({
  label: module.replace(/-/g, " ").replace(/\\b\\w/g, (letter) => letter.toUpperCase()),
  href: \`/\${module}\`,
}));`,
  "apps/web/src/lib/formatters.ts": `export function formatCurrency(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
}`,
  "apps/web/src/lib/csv.ts": `export function toCsv(rows: Record<string, unknown>[]) {
  if (rows.length === 0) return "";
  const columns = Object.keys(rows[0]);
  const body = rows.map((row) => columns.map((column) => JSON.stringify(row[column] ?? "")).join(","));
  return [columns.join(","), ...body].join("\\n");
}`,
  "apps/web/src/lib/documents.ts": `export type DocumentAction = "submit" | "approve" | "reject" | "cancel" | "close";

export function nextDocumentAction(status: string): DocumentAction | undefined {
  if (status === "draft") return "submit";
  if (status === "submitted") return "approve";
  if (status === "approved") return "close";
  return undefined;
}`,
  "apps/web/src/lib/response.ts": `export type ApiError = {
  error: string;
  message: string;
};

export function isApiError(value: unknown): value is ApiError {
  return typeof value === "object" && value !== null && "error" in value && "message" in value;
}`,
  "apps/web/src/hooks/useAuth.ts": `import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}`,
  "apps/web/src/hooks/usePermissions.ts": `import { useAuth } from "./useAuth";

export function usePermissions() {
  const { user } = useAuth();
  return {
    can(permission: string) {
      return Boolean(user?.permissions.includes("*") || user?.permissions.includes(permission));
    },
  };
}`,
  "apps/web/src/hooks/useWorkspace.ts": `import { useAuth } from "./useAuth";

export function useWorkspace() {
  const { user } = useAuth();
  return {
    tenantId: user?.tenantId ?? "demo-tenant",
    user,
  };
}`,
  "apps/web/src/hooks/useDebounce.ts": `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}`,
  "apps/web/src/hooks/useInfiniteScroll.ts": `import { useEffect } from "react";

export function useInfiniteScroll(callback: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) callback();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback, enabled]);
}`,
  "apps/web/src/context/AuthContext.tsx": `"use client";

import { createContext, type ReactNode } from "react";
import type { SessionUser } from "../lib/auth";

export const AuthContext = createContext<{ user?: SessionUser }>({});

export function AuthProvider({ user, children }: { user?: SessionUser; children: ReactNode }) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}`,
  "packages/localization/src/currencies.ts": `export const supportedCurrencies = ["INR", "USD", "EUR", "GBP", "AED"] as const;

export function defaultCurrencyForCountry(countryCode: string) {
  return countryCode.toUpperCase() === "IN" ? "INR" : "USD";
}`,
  "packages/localization/src/taxRegions.ts": `export type TaxRegion = {
  countryCode: string;
  name: string;
  indirectTaxName: string;
};

export const taxRegions: TaxRegion[] = [
  { countryCode: "IN", name: "India", indirectTaxName: "GST" },
  { countryCode: "US", name: "United States", indirectTaxName: "Sales Tax" },
];`,
  "packages/localization/src/dateFormats.ts": `export function dateFormatForLocale(locale: string) {
  return locale === "en-IN" ? "dd/MM/yyyy" : "yyyy-MM-dd";
}`,
  "packages/localization/src/translations.ts": `export type TranslationDictionary = Record<string, Record<string, string>>;

export function translate(dictionary: TranslationDictionary, locale: string, key: string) {
  return dictionary[locale]?.[key] ?? dictionary.en?.[key] ?? key;
}`,
  "packages/integrations-sdk/src/connector.ts": `export type Connector = {
  id: string;
  name: string;
  authType: "api-key" | "oauth" | "webhook";
  scopes: string[];
};

export function defineConnector(connector: Connector) {
  return connector;
}`,
  "packages/integrations-sdk/src/webhook.ts": `export type WebhookDelivery = {
  url: string;
  event: string;
  payload: unknown;
};

export async function deliverWebhook(delivery: WebhookDelivery) {
  const response = await fetch(delivery.url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event: delivery.event, payload: delivery.payload }),
  });
  return { ok: response.ok, status: response.status };
}`,
  "packages/integrations-sdk/src/oauth.ts": `export type OAuthToken = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
};

export function isTokenExpired(token: OAuthToken, now = new Date()) {
  return token.expiresAt ? new Date(token.expiresAt) <= now : false;
}`,
  "packages/integrations-sdk/src/rateLimits.ts": `export type RateLimit = {
  key: string;
  limit: number;
  windowSeconds: number;
};

export function rateLimitKey(tenantId: string, connectorId: string) {
  return \`integration:\${tenantId}:\${connectorId}\`;
}`,
  "packages/test-utils/src/testDb.ts": `export function createTestDatabaseUrl(name = "vercent_test") {
  return \`postgres://vercent:vercent@localhost:5432/\${name}\`;
}`,
  "packages/test-utils/src/tenantFactory.ts": `export function createTenant(overrides: Partial<{ id: string; name: string; plan: string }> = {}) {
  return { id: "tenant_test", name: "Test Tenant", plan: "growth", ...overrides };
}`,
  "packages/test-utils/src/authFactory.ts": `export function createAuthContext(overrides: Partial<{ tenantId: string; actorId: string; permissions: string[] }> = {}) {
  return {
    tenantId: "tenant_test",
    actorId: "user_test",
    roles: ["admin"],
    permissions: ["*"],
    ...overrides,
  };
}`,
  "packages/test-utils/src/fixtures.ts": `export const sampleFixture = {
  tenantId: "tenant_test",
  code: "TEST-001",
  name: "Sample Fixture",
  priority: "medium",
};`,
  "apps/mobile/babel.config.js": `module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};`,
  "apps/mobile/metro.config.js": `const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;`,
  "apps/mobile/tailwind.config.js": `module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#155eef",
      },
    },
  },
  plugins: [],
};`,
  "apps/mobile/vitest.config.ts": `import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});`,
  "apps/mobile/src/services/apiBase.ts": `export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export function tenantHeaders(tenantId: string, token?: string) {
  return {
    "content-type": "application/json",
    "x-tenant-id": tenantId,
    ...(token ? { authorization: \`Bearer \${token}\` } : {}),
  };
}`,
  "apps/mobile/src/services/api.ts": `import { API_BASE_URL, tenantHeaders } from "./apiBase";

export async function getMobileDashboard(tenantId: string) {
  const response = await fetch(\`\${API_BASE_URL}/api/command-center\`, {
    headers: tenantHeaders(tenantId),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}`,
  "apps/mobile/src/services/authStorage.ts": `const memory = new Map<string, string>();

export async function saveToken(token: string) {
  memory.set("token", token);
}

export async function readToken() {
  return memory.get("token");
}`,
  "apps/mobile/src/services/offlineQueue.ts": `export type OfflineJob = {
  id: string;
  type: string;
  payload: unknown;
};

const jobs: OfflineJob[] = [];

export function enqueueOfflineJob(job: OfflineJob) {
  jobs.push(job);
}

export function drainOfflineJobs() {
  return jobs.splice(0, jobs.length);
}`,
  "apps/mobile/src/services/offlineRuntime.ts": `import { drainOfflineJobs } from "./offlineQueue";

export async function syncOfflineJobs(sender: (job: unknown) => Promise<void>) {
  for (const job of drainOfflineJobs()) await sender(job);
}`,
  "apps/mobile/src/services/realtime.ts": `export function createRealtimeChannel(tenantId: string) {
  return {
    tenantId,
    subscribe(event: string, handler: (payload: unknown) => void) {
      return { event, unsubscribe: () => handler };
    },
  };
}`,
  "apps/mobile/src/services/pushNotifications.ts": `export async function registerPushNotifications(userId: string) {
  return {
    userId,
    token: \`push_\${userId}\`,
    registeredAt: new Date().toISOString(),
  };
}`,
  "apps/mobile/src/navigation/menuConfig.ts": `export const mobileMenu = [
  { label: "Dashboard", route: "Dashboard" },
  { label: "Leads", route: "Leads" },
  { label: "Orders", route: "Orders" },
  { label: "Inventory", route: "Items" },
  { label: "Approvals", route: "Approvals" },
];`,
  "apps/mobile/src/theme/colors.ts": `export const colors = {
  brand: "#155eef",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  surface: "#ffffff",
};`,
  "apps/mobile/src/theme/spacing.ts": `export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};`,
  "apps/mobile/src/theme/typography.ts": `export const typography = {
  title: { fontSize: 24, fontWeight: "700" },
  body: { fontSize: 16, fontWeight: "400" },
  caption: { fontSize: 12, fontWeight: "400" },
} as const;`,
  "apps/mobile/src/theme/index.ts": `export * from "./colors";
export * from "./spacing";
export * from "./typography";`,
  "apps/mobile/src/utils/normalizers.ts": `export function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}`,
};

for (const [filePath, content] of Object.entries(files)) {
  await write(filePath, content);
}

console.log(JSON.stringify({ status: "client-packages-enriched", files: Object.keys(files).length }, null, 2));
