AFRAME.registerComponent('button', {
    schema: {
        
    },

    init: function () {
        const doors = document.getElementsByClassName("js--door");
        const buttons = document.getElementsByClassName("js--button");
        const text = document.getElementsByClassName("js--hint-text");
        let ani = document.createAttribute('animation');
        let bani = document.createAttribute('animation');
        
      
        this.activateButton = function(){
            for (let i = 0; i < buttons.length; i++){
                buttons[i].addEventListener('click', function(evt){
                    let door_open = new Audio("./Sounds/dooropen.mp3");
                    door_open.volume = 0.05;
                    const pipet = document.getElementsByClassName("js--pickup_pipet")[0];
                    bani.value = 'property: rotation; easing: linear; dur: 1000; to: 0 90 -45';
                    buttons[i].setAttribute('animation', bani.value);
        
                    // Foute antwoorden
                    if(i == 2){
                        text[0].setAttribute('value', "Dit is helaas het verkeerde antwoord, de kleur hier is blauwe niet roze.");
                    }
                    if(i == 3){
                        text[1].setAttribute('value', "Dit is helaas het verkeerde antwoord, de vorm van deze soort is bolvormig.");
                    }
                    if (i == 6){
                        text[3].setAttribute('value', "Dit is helaas het verkeerde antwoord, de bacterie is niet verkleurd en dit gebeurt wel als hij niet zuurvast is.");
                    }

                    // Goede antwoorden
                    if(i == 1){
                        door_open.play();
                        ani.value = 'property: position; easing: linear; dur: 11000; to:' + doors[2].getAttribute('position').x + " -4.6 " + doors[2].getAttribute('position').z;
                        doors[2].setAttribute('animation', ani.value);
                        text[0].setAttribute('value', "Dit is het juiste antwoord, de kleur is namelijk bij gram positief blauw.");
                    }
                    if (i == 5){
                        door_open.play();
                        ani.value = 'property: position; easing: linear; dur: 11000; to:' + doors[3].getAttribute('position').x + " -4.6 " + doors[3].getAttribute('position').z;
                        doors[3].setAttribute('animation', ani.value);
                        text[1].setAttribute('value', "Dit is het juiste antwoord, de vorm van een bacil is namelijk staafvorming.");
                    }
                    if(i == 7){
                        door_open.play();
                        ani.value = 'property: position; easing: linear; dur: 11000; to:' + doors[5].getAttribute('position').x + " -4.6 " + doors[5].getAttribute('position').z;
                        doors[5].setAttribute('animation', ani.value); //deur 5 in normaal
                        text[3].setAttribute('value', "Dit is het juiste antwoord, de bacterie is niet verkleurd en dit gebeurt als de bacterie zuurvast is.");
                        pipet.remove();
                    }

                    // Antwoorden die er totaal niet bij horen
                    if(i == 0){
                        text[0].setAttribute('value', "Gram neutraal is niet benoemd binnen dit onderwerp, tenzij je een zwart wit filter hebt.");
                    }
                    if(i == 4){
                        text[1].setAttribute('value', "Als het goed is heb je dit nog niet behandeld, daarnaast hoe zie je hier een spiraal in?");
                    }
                });
            } 
        }

        const secret_button = document.getElementsByClassName("js--secret_button");
        const secret_door = document.getElementsByClassName("js--secret_door");
        let secret_bani = document.createAttribute('animation');
        let secret_sound = new Audio("./Sounds/Secret_Sound.mp3");
        secret_sound.volume = 0.02;


        this.activateSecretButton = function(){
            for (let i = 0; i < secret_button.length; i++){
                secret_button[i].addEventListener('click', function(evt){
                    secret_bani.value = 'property: rotation; easing: linear; dur: 1000; to: -135 0 0';
                    secret_button[i].setAttribute('animation', secret_bani.value);
        
                    if(i == 0){
                        secret_sound.play();
                        secret_door[0].remove();
                    }
                });
    
            }
        }

        this.el.addEventListener("click", this.activateButton);
        this.el.addEventListener("click", this.activateSecretButton);
    },

    update: function () {
      this.activateButton();
      this.activateSecretButton();
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
