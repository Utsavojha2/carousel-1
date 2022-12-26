const arrowButtons = document.querySelectorAll(".btn");
const indicatorButtons = document.querySelectorAll(".btn-small");
const defaultCarouselLimit = 3500;

class Carousel {
  constructor() {
    this.sliderImages = Array.from(
      document.querySelector(".carousel").children
    );
    this.currentSlide = 0;
    this.carouselInterval = new Interrval(() => {
      this.currentSlide++;
      this.sliderImages.forEach(this.buildCarousel.bind(this));
    }, defaultCarouselLimit);

    for (const button of arrowButtons) {
      button.addEventListener("click", this.onClick.bind(this));
    }

    for (const button of indicatorButtons) {
      button.addEventListener("click", (e) =>
        this.onIndicatorClick.call(this, e)
      );
    }
  }

  onClick(e) {
    const btnClass = e.currentTarget.className;
    if (btnClass === "btn btn-next") {
      return this.onNextClick();
    }
    this.onBack();
  }

  clearAndRestartInterval() {
    this.carouselInterval.clear();
    this.sliderImages.forEach(this.buildCarousel.bind(this));
    this.carouselInterval.restart(this.buildCarousel.bind(this));
  }

  onIndicatorClick(e) {
    const targetId = +e.target.getAttribute("id");
    this.currentSlide = targetId;
    this.clearAndRestartInterval();
  }

  onNextClick() {
    this.currentSlide++;
    if (this.currentSlide === this.sliderImages.length) {
      this.currentSlide--;
      return;
    }
    this.clearAndRestartInterval();
  }

  onBack() {
    if (this.currentSlide === 0) {
      return;
    }
    this.currentSlide--;
    this.clearAndRestartInterval();
  }

  buildCarousel(image, i, total) {
    if (this.currentSlide === total.length) {
      this.currentSlide = 0;
    }
    if (this.currentSlide - 1 === total.length) {
      image.style.transition = `transform 2.5s ease-in-out`;
    }
    const currentPosition = (i - this.currentSlide) * 100;
    image.style.transform = `translateX(${currentPosition}%)`;
  }
}

const car = new Carousel();
