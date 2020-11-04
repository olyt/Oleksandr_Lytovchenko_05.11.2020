export default class CloseIcon {
    constructor(color, height, wight) {
        this.color = color;
        this.height = height;
        this.wight = wight;
    }

    render(parent) {
        parent.insertAdjacentHTML("beforeend", `<svg
            style="pointer-events: none"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            height="${this.height}"
            width="${this.wight}"
            viewBox="0 0 340.8 340.8"        
        >
            <path fill=${this.color} d="M182.4 169.6l50-50c3.2-3.2 3.2-8.8 0-12-3.2-3.2-8.8-3.2-12 0l-50 50-50-50c-3.2-3.2-8.8-3.2-12 0-3.2 3.2-3.2 8.8 0 12l50 50-50 49.6c-3.2 3.2-3.2 8.8 0 12 1.6 1.6 4 2.4 6 2.4s4.4-.8 6-2.4l50-50 50 50c1.6 1.6 4 2.4 6 2.4s4.4-.8 6-2.4c3.2-3.2 3.2-8.8 0-12l-50-49.6z"/>
        </svg>`)
    }
}