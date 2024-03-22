/**
 * yyyy-mm-dd 형태의 string
 */
type CalendarTime = string;

type Optional<T> = T | undefined;

type Result<T> = Promise<{ data: T }>;
