import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "hour"
})
export class HourPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {

    if (args && args[0] == "short") {
      return this.shortFormat(value);
    }
    if (args && args[0] == "medium") {
      return this.mediumFormat(value);
    }

    if (!value) {
      return "0 دقیقه";
    }

    value = value / 60; // minute
    const m = Math.ceil(value % 60);
    const h = value / 60;

    if (h >= 1) {
      const text = `${h.toFixed()} ساعت`;
      if (m > 1 && m < 60) {
        return text + ` و ${m.toFixed()} دقیقه`;
      }
      return text;
    } else {
      return `${m.toFixed()} دقیقه`;
    }
  }

  mediumFormat(value: number): string {
    if (!value) {
      return "0 دقیقه";
    }

    // value = value / 60; // minute
    const s = Math.ceil(value % 60);
    let m = Math.floor(value / 60);
    let h = 0;

    while (m > 59) {
      m = m - 60;
      h += 1;
    }

    if (h >= 1) {
      const text = `${h.toFixed()} ساعت`;
      if (m > 1 && m < 60) {
        return text + ` و\n ${m.toFixed()} دقیقه`;
      }
      return text;
    } else {
      const text = `${m.toFixed()} دقیقه`;
      if (s > 1 && s < 60) {
        return text + ` و\n ${s.toFixed()} ثانیه`;
      }
      return text;
    }
  }

  shortFormat(value: number): string {
    if (!value) {
      return "00:00";
    }

    value = value / 60; // minute
    const m = Math.ceil(value % 60);
    const h = value / 60;

    if (h >= 1) {
      const text = `${h.toFixed()}`;
      if (m > 1 && m < 60) {
        return text + `:${m.toFixed()}`;
      }
      return text + ":00";
    } else {
      return `00:${m.toFixed()}`;
    }
  }

}


