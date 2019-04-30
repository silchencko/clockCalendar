const clockCalendarContainer = document.querySelector(".Clock-Calendar");
// debugger;
const clockTemplate = document.querySelector('#clock');
const calendarTemplate = document.querySelector('#calendar');

class ClockCalendar extends HTMLElement {
    date = new Date();
    // clock = document.querySelector('#clock');
    // calendar = document.querySelector('#calendar');
    // clockInstance = document.importNode(clock.content, true);
    // calendarInstance = document.importNode(calendar.content, true);
    // currentTemplate = clockInstance;


    connectedCallback() {
        this.clock = true;
        this.shortTime = true;
        this.uaDate = true;
        this.appendChild(document.importNode(clockTemplate.content, true));
        // const clock = document.querySelector('#clock');
        // const calendar = document.querySelector('#calendar');
        // const clockInstance = document.importNode(clock.content, true);
        // const calendarInstance = document.importNode(calendar.content, true);
        // const currentTemplate = clockInstance;
        if (this.clock) {
            this.setShortDate();
        }
        this.addEventListener('contextmenu', e => {
            debugger;
            e.preventDefault();

            // if (e.button === 3) {

                if (this.clock) {
                    this.setShortDate();
                    this.clock = !this.clock;
                } else {
                    this.setFullDate();
                    this.clock = !this.clock;
                }
            // }
        });
        this.addEventListener('click', e => {
            if (this.clock) {
                if (this.shortTime) {
                    this.setFullDate();
                } else {
                    this.setShortDate();
                }
                this.shortTime = !this.shortTime;
            } else {
                if (this.uaDate) {
                    this.setUEDate();
                } else {
                    this.setUADate();
                }
                this.uaDate = !this.uaDate;
            }
        });

        // this.appendChild(clockInstance);
        this.setFullDate();

    }
    setShortDate() {
        this.innerHTML = this.date.getHours() + ':' + this.date.getMinutes();      
    }
    setFullDate() {
        this.innerHTML = this.date.getHours() + ':'
                       + this.date.getMinutes() + ':'
                       + this.date.getSeconds();
    }
    setUADate() {
        this.innerHTML = this.date.getDay() + '/'
            + (this.date.getMonth() + 1) + '/'
            + this.date.getFullYear();
    }
    setUEDate() {
        this.innerHTML = (this.date.getMonth() + 1) + '/'
            + this.date.getDay() + '/'
            + this.date.getFullYear();
    }

}

window.customElements.define("clock-calendar", ClockCalendar);

function fillUp(date) {
    if (date.length < 2) {
        date = "0" + date;
    }
    return date;
}

