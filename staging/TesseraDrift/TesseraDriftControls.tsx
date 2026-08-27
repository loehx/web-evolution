import { cn } from '@/lib/utils'
import {
  DEFAULT_TESSERA_DRIFT_SETTINGS,
  type TesseraDriftSettings,
  type TesseraSliderKey,
} from './tesseraSettings'

type ControlSpec = {
  key: TesseraSliderKey
  label: string
  min: number
  max: number
  step: number
  format: (value: number) => string
}

const SLIDER_CONTROLS: ControlSpec[] = [
  {
    key: 'squareCount',
    label: 'Density',
    min: 20,
    max: 200,
    step: 1,
    format: (v) => Math.round(v).toString(),
  },
  {
    key: 'cloudCount',
    label: 'Cloud squares',
    min: 0,
    max: 400,
    step: 1,
    format: (v) => Math.round(v).toString(),
  },
  {
    key: 'squareSize',
    label: 'Square size',
    min: 3,
    max: 18,
    step: 1,
    format: (v) => `${Math.round(v)}px`,
  },
  {
    key: 'jitter',
    label: 'Jitter',
    min: 0,
    max: 40,
    step: 1,
    format: (v) => `${Math.round(v)}px`,
  },
  {
    key: 'letterScale',
    label: 'Letter scale',
    min: 20,
    max: 90,
    step: 1,
    format: (v) => Math.round(v).toString(),
  },
  {
    key: 'letterSpacing',
    label: 'Tracking',
    min: -0.05,
    max: 0.2,
    step: 0.005,
    format: (v) => v.toFixed(3),
  },
  {
    key: 'fontWeight',
    label: 'Weight',
    min: 300,
    max: 900,
    step: 100,
    format: (v) => Math.round(v).toString(),
  },
  {
    key: 'sampleThreshold',
    label: 'Fill threshold',
    min: 40,
    max: 240,
    step: 5,
    format: (v) => Math.round(v).toString(),
  },
  {
    key: 'parallaxY',
    label: 'Parallax Y',
    min: 0,
    max: 1,
    step: 0.01,
    format: (v) => v.toFixed(2),
  },
  {
    key: 'parallaxX',
    label: 'Spread X',
    min: 0,
    max: 1.2,
    step: 0.01,
    format: (v) => v.toFixed(2),
  },
  {
    key: 'depthMin',
    label: 'Depth min',
    min: 0,
    max: 1,
    step: 0.01,
    format: (v) => v.toFixed(2),
  },
  {
    key: 'depthMax',
    label: 'Depth max',
    min: 0,
    max: 1,
    step: 0.01,
    format: (v) => v.toFixed(2),
  },
]

type TesseraFieldKey = 'headline' | 'squareColor' | 'background' | 'seed'

export function TesseraDriftControls({
  settings,
  onChange,
  onFieldChange,
  onToggle,
  onReshuffle,
  className,
}: {
  settings: TesseraDriftSettings
  onChange: (key: TesseraSliderKey, value: number) => void
  onFieldChange: (key: TesseraFieldKey, value: string | number) => void
  onToggle: (key: 'showRunway') => void
  onReshuffle: () => void
  className?: string
}) {
  return (
    <aside
      className={cn(
        'absolute right-4 top-14 z-20 max-h-[calc(100svh-5rem)] w-[min(18rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-white/10 bg-black/55 p-4 backdrop-blur-md',
        className,
      )}
      aria-label="Tessera drift settings"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
        Tessera controls
      </p>

      <ul className="space-y-3">
        {SLIDER_CONTROLS.map(({ key, label, min, max, step, format }) => {
          const value = settings[key]
          return (
            <li key={key}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-xs text-white/70">
                <label htmlFor={`tessera-${key}`}>{label}</label>
                <span className="tabular-nums text-white/45">{format(value)}</span>
              </div>
              <input
                id={`tessera-${key}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(key, Number(event.target.value))}
                className="h-1.5 w-full cursor-ew-resize appearance-none rounded-full bg-white/15 accent-amber-200 [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-100"
              />
            </li>
          )
        })}
      </ul>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
        <div>
          <label htmlFor="tessera-headline" className="mb-1 block text-xs text-white/70">
            Headline text
          </label>
          <input
            id="tessera-headline"
            type="text"
            value={settings.headline}
            onChange={(event) => onFieldChange('headline', event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="tessera-square-color" className="mb-1 block text-xs text-white/70">
              Square
            </label>
            <input
              id="tessera-square-color"
              type="color"
              value={settings.squareColor}
              onChange={(event) => onFieldChange('squareColor', event.target.value)}
              className="h-9 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent"
            />
          </div>
          <div>
            <label htmlFor="tessera-bg-color" className="mb-1 block text-xs text-white/70">
              Background
            </label>
            <input
              id="tessera-bg-color"
              type="color"
              value={settings.background}
              onChange={(event) => onFieldChange('background', event.target.value)}
              className="h-9 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70">
          <input
            type="number"
            value={settings.seed}
            onChange={(event) => onFieldChange('seed', Number(event.target.value))}
            className="w-14 bg-transparent text-white/80"
          />
          <span>Seed</span>
        </label>
      </div>

      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
        <button
          type="button"
          aria-pressed={settings.showRunway}
          onClick={() => onToggle('showRunway')}
          className={cn(
            'w-full rounded-lg border px-3 py-2 text-left text-xs transition',
            settings.showRunway
              ? 'border-white/25 bg-white/10 text-white'
              : 'border-white/10 text-white/55',
          )}
        >
          Bottom runway (+100svh)
        </button>
        <button
          type="button"
          onClick={onReshuffle}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white/15"
        >
          Reshuffle layout
        </button>
      </div>

      <p className="mt-4 text-[0.6rem] leading-relaxed text-white/30">
        Defaults: density {DEFAULT_TESSERA_DRIFT_SETTINGS.squareCount} · cloud{' '}
        {DEFAULT_TESSERA_DRIFT_SETTINGS.cloudCount} · seed{' '}
        {DEFAULT_TESSERA_DRIFT_SETTINGS.seed}
      </p>
    </aside>
  )
}
