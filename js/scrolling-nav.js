(function($) {
  "use strict"; // Start of use strict

  var isMobileWidth = false;

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  let Keyboard = window.SimpleKeyboard.default;

  let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    physicalKeyboardHighlight: true,
    maxLength: 70,
    mergeDisplay: true,
    onInit: () => {
      $('body').addClass('keyboard-shown');
      $(".simple-keyboard-input").focus();
    },
    layout: {
      'default': [
        '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
        '{tab} q w e r t y u i o p [ ] \\',
        '{capslock} a s d f g h j k l ; \' {enter}',
        '{shiftleft} z x c v b n m , . / {shiftright}',
        '.com @ {space}'
      ],
      'shift': [
        '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
        '{tab} Q W E R T Y U I O P { } |',
        '{capslock} A S D F G H J K L : " {enter}',
        '{shiftleft} Z X C V B N M < > ? {shiftright}',
        '.com @ {space}'
      ]
    },
    display: {}
  });

  resizeHandler();

  function onChange(input) {
    document.querySelector(".simple-keyboard-input").value = input;
    console.log("Input changed", input);
  }

  function onKeyPress(button) {
    console.log("Button pressed", button);
  
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shiftleft}" || button === "{shiftright}" || button === "{capslock}") handleShift();
    if (button === "{numbers}" || button === "{abc}") handleNumbers();

    if($('.dot_icon').hasClass('circ_animate')){
      $('.dot_icon').removeClass('circ_animate');
    }
  }
  
  function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";
  
    keyboard.setOptions({
      layoutName: shiftToggle
    });
  }

  function handleNumbers() {
    let currentLayout = keyboard.options.layoutName;
    let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";
  
    keyboard.setOptions({
      layoutName: numbersToggle
    });
  }

  document.querySelector(".simple-keyboard-input").addEventListener("change", event => {
    keyboard.setInput(event.target.value);
  });

  document.querySelector(".simple-keyboard-input").addEventListener("keydown", event => {
    if($('.dot_icon').hasClass('circ_animate')){
      $('.dot_icon').removeClass('circ_animate');
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === "Tab"){
      e.preventDefault();
    }
  });

  window.addEventListener('resize', resizeHandler);
  window.addEventListener('orientationchange', resizeHandler);

  function resizeHandler(){
    if (window.innerWidth <= 850){
      if(!isMobileWidth){
        isMobileWidth = true;
        keyboard.setOptions({
          mergeDisplay: true,
          layout: {
            'default': [
              'q w e r t y u i o p',
              'a s d f g h j k l',
              '{shiftleft} z x c v b n m {backspace}',
              '{numbers} {space} {enter}'
            ],
            'shift': [
              'Q W E R T Y U I O P',
              'A S D F G H J K L',
              '{shiftleft} Z X C V B N M {backspace}',
              '{numbers} {space} {enter}'
            ],
            'numbers': [
              "1 2 3",
              "4 5 6",
              "7 8 9",
              "{abc} 0 {backspace}",
            ]
          },
          display: {
            "{numbers}": "123",
            "{enter}": "return",
            "{escape}": "esc ⎋",
            "{tab}": "tab ⇥",
            "{backspace}": "⌫",
            "{capslock}": "caps lock ⇪",
            "{shiftleft}": "⇧",
            "{shiftright}": "shift ⇧",
            "{controlleft}": "ctrl ⌃",
            "{controlright}": "ctrl ⌃",
            "{altleft}": "alt ⌥",
            "{altright}": "alt ⌥",
            "{metaleft}": "cmd ⌘",
            "{metaright}": "cmd ⌘",
            "{abc}": "ABC"
          }
        });
        document.querySelector(".simple-keyboard-input").setAttribute("placeholder", "Tap on the keyboard");
        mobileDisableInput();
      }
    } else {
      if(isMobileWidth){
        isMobileWidth = false;

        keyboard.setOptions({
          mergeDisplay: true,
          layout: {
            'default': [
              '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
              '{tab} q w e r t y u i o p [ ] \\',
              '{capslock} a s d f g h j k l ; \' {enter}',
              '{shiftleft} z x c v b n m , . / {shiftright}',
              '.com @ {space}'
            ],
            'shift': [
              '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
              '{tab} Q W E R T Y U I O P { } |',
              '{capslock} A S D F G H J K L : " {enter}',
              '{shiftleft} Z X C V B N M < > ? {shiftright}',
              '.com @ {space}'
            ]
          },
          display: {}
        });
        document.querySelector(".simple-keyboard-input").setAttribute("placeholder", "Tap on the keyboard or type to start");
        allowInput();
      }
    }
  }

  function mobileDisableInput(){
    /**
     * If mobile, no keyboard deploy..
     */
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      document.querySelector(".simple-keyboard-input").setAttribute("readonly", "true");

      keyboard.setOptions({
        physicalKeyboardHighlight: false
      });

      $('body').addClass("mobile");
    } else {
      $('body').removeClass("mobile");
    }
  }

  function allowInput(){
    document.querySelector(".simple-keyboard-input").removeAttribute("readonly");

    keyboard.setOptions({
      physicalKeyboardHighlight: true
    });
  }

})(jQuery); // End of use strict
