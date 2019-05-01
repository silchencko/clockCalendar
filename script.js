const defaultScheme = new CSSStyleSheet();
defaultScheme.replace(`:host { display: inline-block; 
    width: 150px; 
    height: 40px; 
    padding: 20px;
    font-size: 32px;
    text-align: center;
    background-color: rgba(00,55,00,0.2); }`);
const hoverScheme = new CSSStyleSheet();
hoverScheme.replace(`:host { display: inline-block;
    width: 150px; 
    height: 40px; 
    padding: 20px;
    font-size: 32px;
    text-align: center;
    background-color: rgba(00,55,00,0.5); }`);
document.adoptedStyleSheets = [defaultScheme, hoverScheme];

class ClockCalendar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [defaultScheme];
      }
    connectedCallback() {
        this.clock = true;
        this.shortTime = true;
        this.uaDate = true;
 
        this.addEventListener('contextmenu', e => {
            e.preventDefault();
            this.clock = !this.clock;
            this.draw();
        });
        this.addEventListener('click', () => {
            if (this.clock) {
                this.shortTime = !this.shortTime;
            } else {
                this.uaDate = !this.uaDate;
            }
            this.draw();
        });
        this.addEventListener('mouseover', () => {
            this.shadowRoot.adoptedStyleSheets = [hoverScheme];
        });
        this.addEventListener('mouseout', () => {
            this.shadowRoot.adoptedStyleSheets = [defaultScheme];
        })

        setInterval(() => {
            this.draw();
        }, 1000);
    }
    draw() {
        const date = new Date();
        if (this.clock) {
            this.drawTime(date);
        } else {
            this.drawDate(date);
        }
    }
    drawTime(date) {
        if (this.shortTime) {
            this.drawShortTime(date);
        } else {
            this.drawFullTime(date);
        }
    }
    drawShortTime(date) {
        this.shadowRoot.innerHTML = this.fillUp(date.getHours()) + ':' + this.fillUp(date.getMinutes());
    }
    drawFullTime(date) {
        this.shadowRoot.innerHTML = this.fillUp(date.getHours()) + ':'
        + this.fillUp(date.getMinutes()) + ':'
        + this.fillUp(date.getSeconds());
    }
    drawDate(date) {
        if (this.uaDate) {
            this.drawUADate(date);
        } else {
            this.drawEUDate(date);
        }
    }
    drawUADate(date) {
        this.shadowRoot.innerHTML = this.fillUp(date.getDay()) + '.'
            + this.fillUp((date.getMonth() + 1)) + '.'
            + this.fillUp(date.getFullYear());
    }
    drawEUDate(date) {
        this.shadowRoot.innerHTML = this.fillUp((date.getMonth() + 1)) + '/'
            + this.fillUp(date.getDay()) + '/'
            + this.fillUp(date.getFullYear());
    }
    fillUp(time) {
        while (time.toString().length < 2) {
            time = "0" + time;
        }
        return time;
    }
}

window.customElements.define("clock-calendar", ClockCalendar);


