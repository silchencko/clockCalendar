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
        let content = '';
        if (this.clock) {
            content = this.drawTime(date);
        } else {
            content = this.drawDate(date);
        }
        this.shadowRoot.innerHTML = content;
    }
    drawTime(date) {
        if (this.shortTime) {
            return this.drawShortTime(date);
        } else {
            return this.drawFullTime(date);
        } 
    }
    drawShortTime(date) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return date.toLocaleTimeString('uk', options);
    }
    drawFullTime(date) {
        const options = { hour: '2-digit', minute: '2-digit', second:'2-digit' };
        return date.toLocaleTimeString('uk', options);
    }
    drawDate(date) {
        if (this.uaDate) {
            return this.drawUADate(date);
        } else {
            return this.drawEUDate(date);
        }
    }
    drawUADate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('uk', options);
    }
    drawEUDate(date) {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }
}

customElements.define("clock-calendar", ClockCalendar);


