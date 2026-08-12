import type { PreviewVariant } from '../../../src/previews/types'
import type { PayloadPanelProps } from './PayloadPanel'

const baseFields = [
  { label: 'session_id', value: 'sess_demo' },
  { label: 'region', value: 'eu-central-1' },
  { label: 'authenticated', value: true, tone: 'success' as const },
]

export const payloadPanelVariants: PreviewVariant<PayloadPanelProps>[] = [
  {
    id: 1,
    label: 'Ready — minimal fields',
    props: { title: 'GET /health', status: 'ready', fields: [{ label: 'status', value: 'ok' }] },
  },
  {
    id: 2,
    label: 'Ready — full session',
    props: {
      title: 'GET /v1/session/bootstrap',
      status: 'ready',
      endpoint: 'https://api.evolved.dev/v1/session/bootstrap',
      fields: baseFields,
      rawPayload: { session_id: 'sess_demo', region: 'eu-central-1', authenticated: true },
    },
  },
  {
    id: 3,
    label: 'Streaming status',
    props: {
      title: 'POST /v1/events/stream',
      status: 'streaming',
      endpoint: 'https://api.evolved.dev/v1/events/stream',
      fields: [{ label: 'chunks', value: 128 }, { label: 'open', value: true }],
    },
  },
  {
    id: 4,
    label: 'Idle status',
    props: { title: 'Worker idle', status: 'idle', fields: [{ label: 'queue', value: 0 }] },
  },
  {
    id: 5,
    label: 'Error status',
    props: {
      title: 'GET /v1/billing',
      status: 'error',
      fields: [{ label: 'code', value: 402, tone: 'warning' }],
      rawPayload: { error: 'payment_required' },
    },
  },
  {
    id: 6,
    label: 'Long endpoint URL',
    props: {
      title: 'Proxy request',
      endpoint:
        'https://api.evolved.dev/v1/organizations/acme/projects/evolved-web/environments/production/deployments/latest',
      fields: [{ label: 'method', value: 'GET' }],
    },
  },
  {
    id: 7,
    label: 'Many fields grid',
    props: {
      title: 'Metrics snapshot',
      fields: Array.from({ length: 8 }, (_, i) => ({
        label: `metric_${i + 1}`,
        value: `${(i + 1) * 11}ms`,
      })),
    },
  },
  {
    id: 8,
    label: 'Boolean false',
    props: {
      title: 'Auth check',
      fields: [{ label: 'authenticated', value: false, tone: 'muted' }],
    },
  },
  {
    id: 9,
    label: 'Numeric values',
    props: {
      title: 'Rate limits',
      fields: [
        { label: 'limit', value: 1000 },
        { label: 'remaining', value: 847, tone: 'success' },
        { label: 'reset_in', value: 3600, tone: 'muted' },
      ],
    },
  },
  {
    id: 10,
    label: 'Large JSON payload',
    props: {
      title: 'Feature flags',
      rawPayload: Object.fromEntries(
        Array.from({ length: 20 }, (_, i) => [`flag_${i}`, i % 2 === 0]),
      ),
      fields: [{ label: 'count', value: 20 }],
    },
  },
  {
    id: 11,
    label: 'No raw JSON',
    props: { title: 'Simple panel', fields: [{ label: 'version', value: '2.4.1' }] },
  },
  {
    id: 12,
    label: 'Headline-style title only',
    props: { title: 'Deployment succeeded', fields: [] },
  },
  {
    id: 13,
    label: 'Warning tone fields',
    props: {
      title: 'Deprecation notice',
      fields: [{ label: 'sunset', value: '2026-12-01', tone: 'warning' }],
    },
  },
  {
    id: 14,
    label: 'German labels',
    props: {
      title: 'Sitzung aktiv',
      fields: [
        { label: 'benutzer', value: 'alex' },
        { label: 'region', value: 'eu-central-1' },
      ],
    },
  },
  {
    id: 15,
    label: 'Monospace values',
    props: {
      title: 'Build artifact',
      fields: [{ label: 'sha', value: 'a1b2c3d4e5f6789012345678901234567890abcd' }],
    },
  },
  {
    id: 16,
    label: 'Empty fields array',
    props: { title: 'Awaiting data', fields: [] },
  },
  {
    id: 17,
    label: 'Nested raw only',
    props: {
      title: 'Debug dump',
      rawPayload: { user: { id: 1, roles: ['admin', 'editor'] }, meta: { trace: 'abc' } },
      fields: [{ label: 'type', value: 'debug' }],
    },
  },
  {
    id: 18,
    label: 'Short title',
    props: { title: 'OK', fields: [{ label: 'code', value: 200, tone: 'success' }] },
  },
  {
    id: 19,
    label: 'Long title wrap',
    props: {
      title: 'GET /v1/analytics/reports/weekly/performance/summary/export',
      fields: [{ label: 'format', value: 'json' }],
    },
  },
  {
    id: 20,
    label: 'Production-like bootstrap',
    props: {
      title: 'GET /v1/session/bootstrap',
      status: 'ready',
      endpoint: 'https://api.evolved.dev/v1/session/bootstrap',
      fields: [
        { label: 'session_id', value: 'sess_8f2c91a0' },
        { label: 'region', value: 'eu-central-1' },
        { label: 'feature_flags', value: 12, tone: 'muted' },
        { label: 'authenticated', value: true, tone: 'success' },
      ],
      rawPayload: {
        session_id: 'sess_8f2c91a0',
        feature_flags: ['parallax_hero', 'snap_deck'],
        ttl_seconds: 3600,
      },
    },
  },
]
