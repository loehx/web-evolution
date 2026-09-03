import type { PreviewVariant } from '../../src/previews/types'
import type { ViewportSnapDeckProps } from './ViewportSnapDeck'

type SnapPreviewProps = Omit<ViewportSnapDeckProps, 'children'> & { slides?: string[] }

export const viewportSnapDeckVariants: PreviewVariant<SnapPreviewProps>[] = [
  { id: 1, label: 'Three slides — default', props: { slides: ['Intro', 'Features', 'Outro'] } },
  { id: 2, label: 'Two slides', props: { slides: ['First', 'Second'] } },
  { id: 3, label: 'Five slides', props: { slides: ['1', '2', '3', '4', '5'] } },
  {
    id: 4,
    label: 'Long slide titles',
    props: {
      slides: [
        'Full viewport storytelling for product launches',
        'Secondary chapter with supporting metrics',
      ],
    },
  },
  { id: 5, label: 'Snap disabled', props: { enabled: false, slides: ['Normal', 'Scroll', 'Flow'] } },
  { id: 6, label: 'Scrollbar visible', props: { hideScrollbar: false, slides: ['A', 'B', 'C'] } },
  {
    id: 7,
    label: 'Single slide',
    props: { slides: ['Only one full-height panel'] },
  },
  {
    id: 8,
    label: 'Numeric chapters',
    props: { slides: ['Chapter 01', 'Chapter 02', 'Chapter 03', 'Chapter 04'] },
  },
  {
    id: 9,
    label: 'Emoji slides',
    props: { slides: ['🎯 Goal', '🛠 Build', '🚀 Launch'] },
  },
  {
    id: 10,
    label: 'German slides',
    props: { slides: ['Einführung', 'Details', 'Abschluss'] },
  },
  {
    id: 11,
    label: 'Short labels',
    props: { slides: ['A', 'B', 'C', 'D'] },
  },
  {
    id: 12,
    label: 'Mixed length labels',
    props: { slides: ['Hi', 'A much longer middle chapter title', 'Bye'] },
  },
  {
    id: 13,
    label: 'Six slides stress',
    props: { slides: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'] },
  },
  {
    id: 14,
    label: 'Onboarding flow',
    props: { slides: ['Welcome', 'Connect data', 'Invite team', 'Done'] },
  },
  {
    id: 15,
    label: 'Portfolio flow',
    props: { slides: ['Work', 'Process', 'Contact'] },
  },
  {
    id: 16,
    label: 'Pricing flow',
    props: { slides: ['Free', 'Pro', 'Enterprise'] },
  },
  {
    id: 17,
    label: 'Docs flow',
    props: { slides: ['Install', 'Configure', 'Deploy', 'Monitor'] },
  },
  {
    id: 18,
    label: 'Empty-ish labels',
    props: { slides: [' ', 'Middle', ' '] },
  },
  {
    id: 19,
    label: 'All caps',
    props: { slides: ['DISCOVER', 'DESIGN', 'DELIVER'] },
  },
  {
    id: 20,
    label: 'Evolved-web story',
    props: {
      slides: ['Occupy the viewport', 'Stack your components', 'Release to the page'],
      enabled: true,
      hideScrollbar: true,
    },
  },
]
