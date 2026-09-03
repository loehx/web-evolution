import type { PreviewVariant } from '../../src/previews/types'
import type { ModalSpotlightProps } from './ModalSpotlight'

const noop = () => {}

export const modalSpotlightVariants: PreviewVariant<ModalSpotlightProps>[] = [
  {
    id: 1,
    label: 'Open with title and body',
    props: {
      open: true,
      title: 'Confirm action',
      onClose: noop,
      children: 'Are you sure you want to continue? This cannot be undone.',
    },
  },
  {
    id: 2,
    label: 'Closed state',
    props: { open: false, title: 'Hidden modal', children: 'You should not see this.' },
  },
  {
    id: 3,
    label: 'Title only, no body',
    props: { open: true, title: 'Success!', onClose: noop },
  },
  {
    id: 4,
    label: 'Body only, no title',
    props: {
      open: true,
      onClose: noop,
      children: 'Your changes have been saved automatically.',
    },
  },
  {
    id: 5,
    label: 'Very long title',
    props: {
      open: true,
      title:
        'This is an unusually long modal title that should wrap across multiple lines on narrow viewports without breaking layout',
      onClose: noop,
      children: 'Short body.',
    },
  },
  {
    id: 6,
    label: 'Long body paragraphs',
    props: {
      open: true,
      title: 'Terms of service',
      onClose: noop,
      children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  },
  {
    id: 7,
    label: 'Empty body string',
    props: { open: true, title: 'Empty content', onClose: noop, children: '' },
  },
  {
    id: 8,
    label: 'Small size',
    props: {
      open: true,
      size: 'sm',
      title: 'Quick note',
      onClose: noop,
      children: 'Compact dialog for alerts.',
    },
  },
  {
    id: 9,
    label: 'Large size',
    props: {
      open: true,
      size: 'lg',
      title: 'Feature overview',
      onClose: noop,
      children: 'Wide panel for richer content, forms, or media embeds.',
    },
  },
  {
    id: 10,
    label: 'No onClose handler',
    props: {
      open: true,
      title: 'Persistent modal',
      children: 'No close button or backdrop dismiss — preview only.',
    },
  },
  {
    id: 11,
    label: 'Rich text-like body',
    props: {
      open: true,
      title: 'Upgrade plan',
      onClose: noop,
      children: 'Unlock Pro features: unlimited projects, priority support, and advanced analytics.',
    },
  },
  {
    id: 12,
    label: 'Question CTA copy',
    props: {
      open: true,
      title: 'Delete project?',
      onClose: noop,
      children: 'All files and collaborators will lose access. Type the project name to confirm.',
    },
  },
  {
    id: 13,
    label: 'Single word title',
    props: { open: true, title: 'Oops', onClose: noop, children: 'Something went wrong.' },
  },
  {
    id: 14,
    label: 'Unicode title and body',
    props: {
      open: true,
      title: 'Bienvenue 👋',
      onClose: noop,
      children: 'Votre compte est prêt. Commencez à explorer dès maintenant.',
    },
  },
  {
    id: 15,
    label: 'Code-like body',
    props: {
      open: true,
      title: 'API key',
      onClose: noop,
      children: 'sk_live_51H...copy this key now — it will not be shown again.',
    },
  },
  {
    id: 16,
    label: 'Marketing announcement',
    props: {
      open: true,
      title: 'Introducing v2.0',
      onClose: noop,
      children: 'Faster builds, new components, and a redesigned preview gallery.',
    },
  },
  {
    id: 17,
    label: 'Form prompt style',
    props: {
      open: true,
      title: 'Name your workspace',
      onClose: noop,
      children: 'Choose a name your team will recognize. You can change it later in settings.',
    },
  },
  {
    id: 18,
    label: 'Warning tone',
    props: {
      open: true,
      title: 'Unsaved changes',
      onClose: noop,
      children: 'You have unsaved edits. Leave without saving?',
    },
  },
  {
    id: 19,
    label: 'Minimal one-liner',
    props: { open: true, onClose: noop, children: 'Copied to clipboard.' },
  },
  {
    id: 20,
    label: 'Medium default with list body',
    props: {
      open: true,
      title: 'What is included',
      onClose: noop,
      children:
        '• 20 preview variants per component\n• Accessible markup\n• Tailwind + Motion stack\n• Keep or die review',
    },
  },
]
