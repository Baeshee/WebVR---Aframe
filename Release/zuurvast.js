AFRAME.registerComponent('zuurvast', {
    schema: {
        
    },

    init: function() {
        const image = document.getElementsByClassName("js--imageChange");
        const pixel = document.querySelectorAll("[image]");
        console.log("in init")
        let hold = null;

        this.changeHold = function(){
            hold = 'pipet';
        }

        this.changePicture = function() {
            for (let i = 0; i < pixel.length; i++) {
                pixel[i].addEventListener("mouseenter", function(evt){
                    if(hold == 'pipet'){
                        console.log("in this.test");
                        image[i].setAttribute("src", "./img/zuurvast.png");  
                    } 
                });
                
            }
        };

        this.el.addEventListener("hold", this.changeHold);
        this.el.addEventListener("mouseenter", this.changePicture);
        
    },

    update: function () {
        this.el.addEventListener("hold", this.changeHold);
        this.changePicture();
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});




    