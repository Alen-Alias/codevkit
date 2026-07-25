import { formatDistanceToNow } from 'date-fns';

export function timestampToDate(timestamp: number, isMilliseconds: boolean): {
  utc: string;
  local: string;
  iso: string;
  relative: string;
} {
  const ms = isMilliseconds ? timestamp : timestamp * 1000;
  const date = new Date(ms);

  return {
    utc: date.toUTCString(),
    local: date.toLocaleString(),
    iso: date.toISOString(),
    relative: formatDistanceToNow(date, { addSuffix: true }),
  };
}

export function dateToTimestamp(date: Date): {
  seconds: number;
  milliseconds: number;
} {
  const ms = date.getTime();
  return {
    seconds: Math.floor(ms / 1000),
    milliseconds: ms,
  };
}
