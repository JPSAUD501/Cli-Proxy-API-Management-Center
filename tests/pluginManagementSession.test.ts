import { describe, expect, test } from 'bun:test';
import {
  createPluginManagementSession,
  getSameOriginPluginTarget,
  isPluginManagementSessionRequest,
  PLUGIN_MANAGEMENT_SESSION_REQUEST,
} from '../src/features/plugins/pluginManagementSession';

describe('plugin management session bridge', () => {
  test('accepts only the versioned request contract', () => {
    expect(
      isPluginManagementSessionRequest({
        type: PLUGIN_MANAGEMENT_SESSION_REQUEST,
        version: 1,
      })
    ).toBe(true);
    expect(
      isPluginManagementSessionRequest({
        type: PLUGIN_MANAGEMENT_SESSION_REQUEST,
        version: 2,
      })
    ).toBe(false);
    expect(isPluginManagementSessionRequest({ type: 'other', version: 1 })).toBe(false);
  });

  test('allows only same-origin plugin resources', () => {
    const origin = 'https://ai-proxy.example';
    expect(getSameOriginPluginTarget('/v0/resource/plugins/example', origin)).toBe(origin);
    expect(getSameOriginPluginTarget('https://ai-proxy.example/plugin', origin)).toBe(origin);
    expect(getSameOriginPluginTarget('https://plugins.example/plugin', origin)).toBeNull();
    expect(getSameOriginPluginTarget('not a valid url', origin)).toBe(origin);
  });

  test('creates an in-memory response without transport metadata', () => {
    expect(createPluginManagementSession('secret')).toEqual({
      type: 'cliproxy:management-session',
      version: 1,
      managementKey: 'secret',
    });
  });
});
