// logger.ts
type Severity = "verbose" | "info" | "warning" | "error";

export class Logger {
  private logLevel: Severity;

  constructor(logLevel: Severity = "info") {
    this.logLevel = logLevel;
  }

  // Determines if the log is enabled based on severity
  isEnabled(name: string, severity: Severity): boolean {
    const levels = ["verbose", "info", "warning", "error"];
    return levels.indexOf(severity) >= levels.indexOf(this.logLevel);
  }

  // Logs the message
  log(name: string, severity: Severity, message: string, args?: any[]): void {
    if (this.isEnabled(name, severity)) {
      const formattedMessage = `${severity.toUpperCase()}: [${name}] ${message}`;
      console.log(formattedMessage, ...(args || []));
    }
  }
}

