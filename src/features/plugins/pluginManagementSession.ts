export const PLUGIN_MANAGEMENT_SESSION_VERSION = 1 as const;
export const PLUGIN_MANAGEMENT_SESSION_REQUEST = 'cliproxy:management-session-request' as const;
export const PLUGIN_MANAGEMENT_SESSION_RESPONSE = 'cliproxy:management-session' as const;

export interface PluginManagementSessionRequest {
  type: typeof PLUGIN_MANAGEMENT_SESSION_REQUEST;
  version: typeof PLUGIN_MANAGEMENT_SESSION_VERSION;
}

export interface PluginManagementSessionResponse {
  type: typeof PLUGIN_MANAGEMENT_SESSION_RESPONSE;
  version: typeof PLUGIN_MANAGEMENT_SESSION_VERSION;
  managementKey: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isPluginManagementSessionRequest = (
  value: unknown
): value is PluginManagementSessionRequest =>
  isRecord(value) &&
  value.type === PLUGIN_MANAGEMENT_SESSION_REQUEST &&
  value.version === PLUGIN_MANAGEMENT_SESSION_VERSION;

export const getSameOriginPluginTarget = (iframeSrc: string, pageOrigin: string): string | null => {
  try {
    const targetOrigin = new URL(iframeSrc, pageOrigin).origin;
    return targetOrigin === pageOrigin ? targetOrigin : null;
  } catch {
    return null;
  }
};

export const createPluginManagementSession = (
  managementKey: string
): PluginManagementSessionResponse => ({
  type: PLUGIN_MANAGEMENT_SESSION_RESPONSE,
  version: PLUGIN_MANAGEMENT_SESSION_VERSION,
  managementKey,
});
