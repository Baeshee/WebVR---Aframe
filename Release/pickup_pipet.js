AFRAME.registerComponent('pipet', {
    schema: {
        
    },

    init: function () {
      const pipet = document.getElementsByClassName("js--pickup_pipet");
      let hold  = null;

      this.pickupPipet = function(){
          for (let i = 0; i < pipet.length; i++){
              pipet[i].addEventListener("click", function(evt) {
                const camera = document.getElementById('js--vision');
                  if (hold == null){
                      camera.innerHTML += '<a-gltf-model pipet src="#pipet-gltf"  class="js--pickup_pipet js--interact" zuurvast scale="2 2 2" position="0.5 0 -1" rotation="0 0 180"></a-gltf-model>'
                      
                      hold = 'pipet';
                      this.remove();
                      this.emit("hold");
                  }
              })
          }
      }

      this.el.addEventListener("click", this.pickupPipet);
    },

    update: function () {
      this.pickupPipet();
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
