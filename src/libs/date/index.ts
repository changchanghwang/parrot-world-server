import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function add({
  date,
  unit,
  value,
  timezone,
}: {
  date: Date;
  value: number;
  unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
  timezone: string;
}) {
  return dayjs(date).tz(timezone).add(value, unit).toDate();
}
