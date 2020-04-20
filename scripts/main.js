'use strict';

const calendar = document.querySelector('#calendar');

function calendarTable(defaultYear, defaultMonth, element) {
  const currentMonth = defaultMonth - 1;

  render();
  renderBody(defaultYear, currentMonth);

  function render() {
    const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    element.innerHTML = `
        <table>
        <thead>
          <tr>
            ${weekDays.map(day => `
              <th>${day}</th>
            `).join('')}
          </tr>
        </thead>

        <tbody>

        </tbody>
      </table>
    `;
  }

  function renderBody(year, month) {
    const tBody = element.querySelector('tbody');
    const weeks = getWeeks(year, month);

    tBody.innerHTML = `
      ${weeks.map(days => `
        <tr>
          ${days.map(day => `
            <td>${day || ''}</td>
          `).join('')}
        </tr>
      `).join('')}
    `;
  }

  function getWeeks(year, month) {
    const theFirstOfNextMonth = new Date(year, month + 1, 1);
    const current = new Date(year, month, 1);
    const realMonth = current.getMonth();

    while (current.getDay() !== 1) {
      current.setDate(current.getDate() - 1);
    }

    const weeks = [];

    // eslint-disable-next-line no-unmodified-loop-condition
    while (current < theFirstOfNextMonth) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        if (current.getMonth() !== realMonth) {
          week.push(0);
        } else {
          week.push(current.getDate());
        }

        current.setDate(current.getDate() + 1);
      }

      weeks.push(week);
    }

    return weeks;
  }
}
calendarTable(2019, 10, calendar);
