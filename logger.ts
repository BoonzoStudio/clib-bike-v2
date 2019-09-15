export class Logger {
  static silent = true;

  static log(message: string) {
    if (!Logger.silent) {
      console.log(message);
    }
  }
}
