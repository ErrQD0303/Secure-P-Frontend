export interface LogEntry {
  id?: number;
  message: string;
  level: string;
  timestamp?: string;
  innerError?: string;
}

export interface LogEntryDto {
  id?: number;
  message: string;
  level: string;
  timestamp?: string;
  innerError?: Error;
}
