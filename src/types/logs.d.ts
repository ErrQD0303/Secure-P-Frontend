/**
 * Represents a log entry object.
 *
 * @property {number} [id] - The unique identifier of the log entry.
 * @property {string} message - The log message.
 * @property {string} level - The severity level of the log entry.
 * @property {string} [timestamp] - The timestamp when the log entry was created.
 * @property {Error} [innerError] - An optional inner error associated with the log entry.
 */
export interface LogEntry {
  id?: number;
  message: string;
  level: string;
  timestamp?: string;
  innerError?: string;
}

/**
 * Represents a log entry data transfer object.
 *
 * @property {number} [id] - The unique identifier of the log entry.
 * @property {string} message - The log message.
 * @property {string} level - The severity level of the log entry.
 * @property {string} [timestamp] - The timestamp when the log entry was created.
 * @property {Error} [innerError] - An optional inner error associated with the log entry.
 */
export interface LogEntryDto {
  id?: number;
  message: string;
  level: string;
  timestamp?: string;
  innerError?: Error;
}
