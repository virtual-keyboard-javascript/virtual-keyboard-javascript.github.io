var isMobileWidth = false;

let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
    onChange: function(input){ onChange(input) },
    onKeyPress: function(button) { onKeyPress(button) },
    physicalKeyboardHighlight: true,
    maxLength: 70,
    mergeDisplay: true,
    onInit: function() {
        $('body').addClass('keyboard-shown');
        //$(".simple-keyboard-input").focus();
    },
    layout: null,
    display: {}
});

resizeHandler();

function onChange(input) {
    if(!window.skTagline){
        window.skTagline = document.querySelector('.tagSndLine').textContent;
    }
    document.querySelector(".tagSndLine").textContent = input || window.skTagline;
    console.log("Input changed", input);
    }

    function onKeyPress(button) {
    console.log("Button pressed", button);

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


document.addEventListener('keydown', function(e) {
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
            layoutName: "default",
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
            layoutName: "default",
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

    keyboard.setOptions({
        physicalKeyboardHighlight: true
    });
}
