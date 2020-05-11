export class DateFormatter {
  static formatDateTime(date: Date): string {
    return `${this.formatDate(date)}, בשעה ${this.formatTime(date)}`
  }

  private static formatDate(date: Date): string {
    const now = new Date(Date.now());
    const dayDifference = this.calculateDayDifference(date, now);
    switch (dayDifference) {
      case 0:
        return 'היום';

      case 1:
        return 'אתמול';

      case 2:
        return 'שלשום';

      default:
        return date.toLocaleDateString();
    }

  }

  private static calculateDayDifference(lhs: Date, rhs: Date): number {
    // Reset dates to earliest time (ceil), otherwise the day difference will be lost in the division below
    lhs = this.createResetDayDate(lhs)
    rhs = this.createResetDayDate(rhs)

    const msecDiff = Math.abs(lhs.getTime() - rhs.getTime()); // Get instants (msec from epoch)
    const msecInDay = 1000 * 60 * 60 * 24;

    return Math.ceil(msecDiff / msecInDay); // Calculate day diff (convert from msec diff to days diff)
  }

  private static createResetDayDate(prev: Date) {
    return new Date(
      prev.getFullYear(),
      prev.getMonth(),
      prev.getDate(),
      0,
      0,
      0,
      0);
  }

  private static formatTime(date: Date): string {
    const minutes = date.getMinutes();
    let minutesString = minutes.toString();

    if (minutes < 10) {
      minutesString = `0${ minutesString }`;
    }

    return `${ date.getHours() }:${ minutesString }`;
  }
}
