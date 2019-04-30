class ClockCalendar extends HTMLElement {
    date = new Date();
    constructor() {
        super();
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
}

window.customElements.define("clock-calendar", ClockCalendar);

function filUp(date) {
    if (date.lenth < 2) {
        date = "0" + date;
    }
    return date;
}

