class MarqueeModule {
    constructor(elementId, speedSeconds = 60) {
        this.el = document.getElementById(elementId);
        this.lastText = "";
        this.setSpeed(speedSeconds);
    }

    setSpeed(speedSeconds) {
        const speed = Number(speedSeconds);
        const safeSpeed = Number.isFinite(speed) && speed > 0 ? speed : 60;
        this.el.style.animationDuration = safeSpeed + "s";
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
