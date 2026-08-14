import { cn } from '@/lib/utils'
import {
  STAR_COLOR_META,
  type StarAscentSettings,
  type StarAscentSliderKey,
  type StarColorKey,
} from './starAscentSettings'

type ControlSpec = {
  key: StarAscentSliderKey
  label: string
  min: number
  max: number
  step: number
  format: (value: number) => string
}

const SLIDER_CONTROLS: ControlSpec[] = [
  {
    key: 'starSize',
    label: 'Star size',
    min: 0.02,
    max: 0.5,
    step: 0.005,
    format: (v) => v.toFixed(3),
  },
  {
    key: 'starCount',
    label: 'Star count',
    min: 5_000,
    max: 100_000,
    step: 1_000,
    format: (v) => Math.round(v).toLocaleString(),
  },
  {
    key: 'motionBrightness',
    label: 'Motion brightness',
    min: 1,
    max: 5,
    step: 0.1,
    format: (v) => `${v.toFixed(1)}×`,
  },
  {
    key: 'motionBlur',
    label: 'Motion sensitivity',
    min: 0,
    max: 2.5,
    step: 0.05,
    format: (v) => v.toFixed(2),
  },
  {
    key: 'rotationSpeed',
    label: 'Rotation speed',
    min: 0,
    max: 0.15,
    step: 0.001,
    format: (v) => v.toFixed(3),
  },
]

function enabledColorCount(colors: StarAscentSettings['colors']) {
  return STAR_COLOR_META.filter(({ key }) => colors[key]).length
}

export function StarAscentControls({
  settings,
  onChange,
  onToggleColor,
  className,
}: {
  settings: StarAscentSettings
  onChange: (key: StarAscentSliderKey, value: number) => void
  onToggleColor: (key: StarColorKey) => void
  className?: string
}) {
  const activeColors = enabledColorCount(settings.colors)

  return (
    <aside
      className={cn(
        'absolute right-4 top-14 z-20 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-black/55 p-4 backdrop-blur-md',
        className,
      )}
      aria-label="Star field settings"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
        Field controls
      </p>
      <ul className="space-y-3">
        {SLIDER_CONTROLS.map(({ key, label, min, max, step, format }) => {
          const value = settings[key]
          return (
            <li key={key}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-xs text-white/70">
                <label htmlFor={`star-ascent-${key}`}>{label}</label>
                <span className="tabular-nums text-white/45">{format(value)}</span>
              </div>
              <input
                id={`star-ascent-${key}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(key, Number(event.target.value))}
                className="h-1.5 w-full cursor-ew-resize appearance-none rounded-full bg-white/15 accent-violet-300 [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-200"
              />
            </li>
          )
        })}
      </ul>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Star colors
        </p>
        <ul className="space-y-2">
          {STAR_COLOR_META.map(({ key, label, hex }) => {
            const active = settings.colors[key]
            const locked = active && activeColors <= 1
            return (
              <li key={key}>
                <button
                  type="button"
                  aria-pressed={active}
                  disabled={locked}
                  onClick={() => onToggleColor(key)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-xs transition',
                    active
                      ? 'border-white/25 bg-white/10 text-white'
                      : 'border-white/10 bg-transparent text-white/40',
                    locked && 'cursor-not-allowed opacity-70',
                  )}
                >
                  <span
                    aria-hidden
                    className="size-4 shrink-0 rounded-sm border border-white/20"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="flex-1">{label}</span>
                  <span className="font-mono text-[0.65rem] text-white/35">{hex}</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/45">
                    {active ? 'On' : 'Off'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
