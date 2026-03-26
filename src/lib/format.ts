const longDateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function formatLongDate(value: string) {
  return longDateFormatter.format(new Date(value));
}

export function formatShortDate(value: string) {
  return shortDateFormatter.format(new Date(value));
}

export function formatTag(tag: string) {
  return tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
