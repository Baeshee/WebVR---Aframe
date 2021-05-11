AFRAME.registerComponent('moving', {
  schema: {

  },

  init: function () {
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');

    function pythagoras(x1, z1, x2, z2) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2))
    }

    this.moveToLocation = function () {
      for (let i = 0; i < places.length; i++) {
        places[i].addEventListener('click', function (evt) {
          let att = document.createAttribute("animation");
          let camera_position = camera.getAttribute('position');
          let box_position = this.getAttribute('position');
          let duration = pythagoras(box_position.x, box_position.z, camera_position.x, camera_position.z) * 333;
          att.value = "property: position; easing: linear; dur: " + duration + "; to: " + this.getAttribute('position').x + " 0 " + this.getAttribute('position').z;
          camera.setAttribute('animation', att.value);
        });
      }
    }

    this.el.addEventListener("click", this.moveToLocation);

  },

  update: function () {
    this.moveToLocation();
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});