const longDateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const shortDateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
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

export function estimateReadingTime(content: string) {
  const hanCharacters = content.match(/\p{Script=Han}/gu)?.length ?? 0;
  const otherWords = content.replace(/\p{Script=Han}/gu, ' ')
    .match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  // Display an estimate using 400 Han characters or 220 other words per minute.
  return Math.max(1, Math.ceil(hanCharacters / 400 + otherWords / 220));
}
