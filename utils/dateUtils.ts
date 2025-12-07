/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayString = (): string => {
  const today = new Date();
  return formatDateToString(today);
};

/**
 * Format a date to YYYY-MM-DD string
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parse YYYY-MM-DD string to Date
 */
export const parseStringToDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return formatDateToString(date1) === formatDateToString(date2);
};

/**
 * Get date N days ago
 */
export const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDateToString(date);
};

/**
 * Calculate days between two dates
 */
export const daysBetween = (date1: string, date2: string): number => {
  const d1 = parseStringToDate(date1);
  const d2 = parseStringToDate(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
