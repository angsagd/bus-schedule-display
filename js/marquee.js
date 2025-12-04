class MarqueeModule {
    constructor(elementId) {
        this.el = document.getElementById(elementId);
        this.lastText = "";
    }

    setText(newText) {
        if (!newText || newText === this.lastText) return;

        this.lastText = newText;
        this.el.textContent = newText;

        // Restart animasi
        this.el.style.animation = "none";
        void this.el.offsetWidth;
        this.el.style.animation = "";
    }
}
