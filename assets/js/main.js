/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var isMobileWidth = false;

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});
})(jQuery);

let Keyboard = window.SimpleKeyboard.default;

  let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    physicalKeyboardHighlight: true,
    maxLength: 70,
    mergeDisplay: true,
    onInit: () => {
      $('body').addClass('keyboard-shown');
      //$(".simple-keyboard-input").focus();
    },
    layout: null,
    display: {}
  });

  resizeHandler();

  function onChange(input) {
    if(!window.skTagline){
      window.skTagline = document.querySelector('.tagSndLine').innerHTML;
    }
    document.querySelector(".tagSndLine").innerHTML = input || window.skTagline;
    console.log("Input changed", input);
  }

  function onKeyPress(button) {
    console.log("Button pressed", button);
  
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shiftleft}" || button === "{shiftright}" || button === "{capslock}" || button === "{shift}" || button === "{lock}") handleShift();
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

  /*document.querySelector(".simple-keyboard-input").addEventListener("change", event => {
    keyboard.setInput(event.target.value);
  });*/

  /*document.querySelector(".simple-keyboard-input").addEventListener("keydown", event => {
    if($('.dot_icon').hasClass('circ_animate')){
      $('.dot_icon').removeClass('circ_animate');
    }
  });*/

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
              '{numbers} {space} {ent}'
            ],
            'shift': [
              'Q W E R T Y U I O P',
              'A S D F G H J K L',
              '{shiftleft} Z X C V B N M {backspace}',
              '{numbers} {space} {ent}'
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
            "{ent}": "return",
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
        //document.querySelector(".simple-keyboard-input").setAttribute("placeholder", "Tap on the keyboard");
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
        //document.querySelector(".simple-keyboard-input").setAttribute("placeholder", "Tap on the keyboard or type to start");
        allowInput();
      }
    }
  }

  function mobileDisableInput(){
    /**
     * If mobile, no keyboard deploy..
     */
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      //document.querySelector(".simple-keyboard-input").setAttribute("readonly", "true");

      keyboard.setOptions({
        physicalKeyboardHighlight: false
      });

      $('body').addClass("mobile");
    } else {
      $('body').removeClass("mobile");
    }
  }

  function allowInput(){
    /*document.querySelector(".simple-keyboard-input").removeAttribute("readonly");*/

    keyboard.setOptions({
      physicalKeyboardHighlight: true
    });
  }