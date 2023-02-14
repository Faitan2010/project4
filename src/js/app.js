import {ProgressBar} from "./ProgressBar.js";


$(document).ready(function(){

    new WOW().init();

    $('.slider-container').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
    });

    const headerMenu = document.querySelector('.header-info');
    const headerOnMobile = document.querySelector('.header-on-mobile');
    const html = document.querySelector('.html');
    if (window.innerWidth <= 1024) {
      let prevScrollValue = window.scrollY;
      window.addEventListener('scroll', animateHeader);
      function animateHeader() {
          if (prevScrollValue < window.scrollY) {

              if (!headerMenu.classList.contains('header-animate')) {
                  headerMenu.classList.add('header-animate');
                  headerOnMobile.classList.add('active');
                  html.classList.add('active')
              }
          } else {

              if (headerMenu.classList.contains('header-animate')) {
                  headerMenu.classList.remove('header-animate');
                  headerOnMobile.classList.remove('active')
                  html.classList.remove('active')
              }
          }

          prevScrollValue = window.scrollY;
      }
  }

  const menu = document.querySelector('.menu-icon');
  const header = document.querySelector('.menu-header');

  menu.addEventListener('click', (e) => {
    header.classList.toggle('active');
})
  new AnchorButton()
  
  const form = document.querySelector('#email-form')

  const submitForm = new SubmitForm(form);
  submitForm.init()

    const progressBar = document.querySelector('.progress-bar');

    if (progressBar) {
        new ProgressBar(progressBar);
    }
  });


function SubmitForm (form) {
  if (!form) {
    return;
  }
  const _this = this;
  this.formField = form.querySelector('#email-form');
  this.emailInput = form.querySelector('.email');
  this.EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  this.validateEmail = (value) => {
    return _this.EMAIL_REGEXP.test(value)
  };


  this.updateInput = (e) => {
    if (_this.validateEmail(e.target.value)) {
      e.target.style.borderColor = 'green';
      return
    }
      e.target.style.borderColor = 'red';
    
  }
  this.init = () => {
    _this.emailInput.addEventListener('input', _this.updateInput);
  }

}




function AnchorButton() {
    this.anchorButton = document.querySelector('#anchor-button');
    this.formButton = document.querySelector('#button-with-form');

    const _this = this
    
    this.movingToContent = () => {
        _this.formButton.scrollIntoView({block: "center", behavior: "smooth"})
    }
    this.anchorButton.addEventListener('click', _this.movingToContent);
    this.formButton.addEventListener('click', (e) => {
      e.preventDefault()
    })
}


