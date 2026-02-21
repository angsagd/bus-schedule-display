class MarqueeModule {
    constructor(elementId, speedSeconds = 60) {
        this.el = document.getElementById(elementId);
        if (!this.el) return;

        this.lastText = "";
        this.speedSeconds = 60;
        this.containerWidth = 0;
        this.textWidth = 0;
        this.positionX = 0;
        this.lastTick = 0;
        this.rafId = null;

        // Gunakan animasi JS agar perpindahan loop bisa tanpa jeda kosong.
        this.el.style.animation = "none";
        this.el.style.paddingLeft = "0";
        this.el.style.display = "inline-block";
        this.el.style.whiteSpace = "nowrap";
        this.el.style.willChange = "transform";

        this.setSpeed(speedSeconds);
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener("resize", this.handleResize);

        this.start();
    }

    setSpeed(speedSeconds) {
        const speed = Number(speedSeconds);
        this.speedSeconds = Number.isFinite(speed) && speed > 0 ? speed : 60;
    }

    handleResize() {
        this.recalculateMetrics(true);
    }

    recalculateMetrics(resetToRight = false) {
        if (!this.el) return;

        const parent = this.el.parentElement;
        this.containerWidth = parent ? parent.clientWidth : 0;
        this.textWidth = this.el.scrollWidth;

        if (resetToRight) {
            this.positionX = this.containerWidth;
        } else if (this.positionX < -this.textWidth) {
            this.positionX = this.containerWidth;
        }

        this.el.style.transform = "translateX(" + this.positionX + "px)";
    }

    start() {
        if (!this.el || this.rafId !== null) return;
        this.recalculateMetrics(true);
        this.lastTick = performance.now();

        const tick = (now) => {
            this.update(now);
            this.rafId = window.requestAnimationFrame(tick);
        };

        this.rafId = window.requestAnimationFrame(tick);
    }

    update(now) {
        if (!this.el) return;

        if (!this.textWidth || !this.containerWidth) {
            this.recalculateMetrics(true);
            this.lastTick = now;
            return;
        }

        const dt = (now - this.lastTick) / 1000;
        this.lastTick = now;

        const distancePerCycle = this.containerWidth + this.textWidth;
        const pxPerSecond = distancePerCycle / this.speedSeconds;
        this.positionX -= pxPerSecond * dt;

        if (this.positionX <= -this.textWidth) {
            this.positionX = this.containerWidth;
        }

        this.el.style.transform = "translateX(" + this.positionX + "px)";
    }

    setText(newText) {
        if (!this.el) return;

        const safeText = String(newText || "").trim();
        if (!safeText || safeText === this.lastText) return;

        this.lastText = safeText;
        this.el.textContent = safeText;
        this.recalculateMetrics(true);
    }
}
