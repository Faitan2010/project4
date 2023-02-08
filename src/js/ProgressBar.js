'use strict';

export const ProgressBar = function (progressBar) {
    this.progressBar = progressBar;
    this.contentHeight = this.getDocumentHeight();

    this.init();
}

ProgressBar.prototype.getDocumentHeight = function () {
    const body = document.body;
    const html = document.documentElement;
    const sizes = [
        body.scrollHeight,
        body.offsetHeight,
        html.scrollHeight,
        html.offsetHeight,
        html.clientHeight,
    ];

    const max = Math.max(...sizes);

    return max - window.innerHeight;
}

ProgressBar.prototype.getWindowScrollY = function () {
    return window.pageYOffset || window.scrollY;
}

ProgressBar.prototype.getOffsetY = function (scrollable) {
    return scrollable / this.contentHeight;
}

ProgressBar.prototype.progressScrollHandler = function () {
    const scrollable = this.getWindowScrollY();
    const offsetY = this.getOffsetY(scrollable);
    this.setBarWidth(offsetY);
}

ProgressBar.prototype.setBarWidth = function (offsetY = 0) {
    this.progressBar.style.width = `${100 * offsetY}%`;
}

ProgressBar.prototype.init = function () {
    window.addEventListener('scroll', this.progressScrollHandler.bind(this));
}
