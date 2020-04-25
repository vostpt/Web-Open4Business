import { Injectable } from '@angular/core';

@Injectable()
export class ParserService {

  alldays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
  weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
  weekend = ['Sab', 'Dom'];

  constructor() { }

  formatWeekdaysListProperty(weekdays: string) {
    let formattedString = '';

    if (weekdays) {
      try {
        let parsedWeekdays = weekdays.replace(/ /g, '').split(',');
        parsedWeekdays = parsedWeekdays.map((d) => d.charAt(0).toUpperCase() + d.toLowerCase().substring(1, 3));

        if (parsedWeekdays.filter(value => this.alldays.includes(value)).length == this.alldays.length) {
          formattedString = 'Todos os dias';
        } else if (parsedWeekdays.filter(value => this.weekdays.includes(value)).length == this.weekdays.length){
          formattedString = 'Seg a Sex';
        } else if (parsedWeekdays.filter(value => this.weekend.includes(value)).length == this.weekend.length){
          formattedString = 'Fim de semana';
        } else {
          formattedString = parsedWeekdays.join(', ');
        }
      } catch (error) {}
    }

    return formattedString;
  }


  formatScheduleProperty(property: string) {
    if (!property) {
      return '';
    }

    try {
      return property.replace(/ /g, '')
          .split('-')
          .map(day => day.substring(0, 5))
          .join(' às ');
    } catch (error) {
      return '';
    }
  }
}
