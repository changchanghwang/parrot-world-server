/**
 * yyyy-mm-dd 형태의 string
 */
type CalendarDate = `${number}-${number}-${number}`;

type Optional<T> = T | undefined;

type Result<T> = Promise<{ data: T }>;
