AFRAME.registerComponent("pickup", {
  schema: {},

  init: function () {
    const camera = document.getElementById("js--vision");
    let scene = document.getElementById("js--scene");
    const microscope = document.getElementById("microscope");
    const gasbrander = document.getElementById("gasbrander");
    const preparaat = document.getElementById("preparaat");
    const microscope_place = document.getElementById("microscope_place");
    const gasbrander_place = document.getElementById("gasbrander_place");
    const prep_place = document.getElementById("preparaat_place");
    let holdms = null;
    let holdgb = null;
    let holdprep = null;
    const doors = document.getElementsByClassName("js--door");
    let ani = document.createAttribute("animation");
    let bani = document.createAttribute("animation");
    

    this.doorUnlock = function () {
      if (holdms == "placed" && holdgb == "placed" && holdprep == "placed") {
        // console.log("goed");
        buttons[0].addEventListener("click", function (evt) {
          bani.value =
            "property: rotation; easing: linear; dur: 1000; to: 0 0 -135";
          buttons[0].setAttribute("animation", bani.value);
          ani.value =
            "property: position; easing: linear; dur: 5000; to:" +
            doors[0].getAttribute("position").x +
            " -4.6 " +
            doors[0].getAttribute("position").z;
          doors[0].setAttribute("animation", ani.value);
        });
      }
    };

    this.pickup_ms = function () {
      microscope.addEventListener("click", function (evt) {
        if (holdms == null && document.getElementById("microscope")) {
          camera.innerHTML +=
            '<a-obj-model collectible id="js--hold" class="js--item js--col1 js--interact" src="#microscope-obj" mtl="#microscope-mtl" position="0.5 -1 -1" scale="0.09 0.09 0.09"></a-obj-model>';
          holdms = "item";
          document.getElementById("microscope").remove();
        }
      });
    };

    this.pickup_gb = function () {
      gasbrander.addEventListener("click", function (evt) {
        if (holdgb == null && document.getElementById("gasbrander")) {
          camera.innerHTML +=
            '<a-gltf-model id="js--gasbrander" src="#gasbrander-gltf" position="0.5 -1 -1" scale="1.2 1.2 1.2"></a-gltf-model>';
          holdgb = "hold";
          document.getElementById("gasbrander").remove();
        }
      });
    };

    this.pickup_prep = function () {
      preparaat.addEventListener("click", function (evt) {
        if (holdprep == null && document.getElementById("preparaat")) {
          camera.innerHTML +=
            '<a-gltf-model id="js--prep" class="js--interact" src="#preparaat-gltf" position="0.5 -0.5 -1" scale="0.04 0.04 0.04"></a-gltf-model>';
          holdprep = "prep";
          document.getElementById("preparaat").remove();
        }
      });
    };

    this.putdown_ms = function () {
      microscope_place.addEventListener("click", function (evt) {
        if (holdms == "item" && document.getElementById("js--hold")) {
          let microscope = document.createElement("a-obj-model");
          microscope.setAttribute(
            "class",
            "js--pickup js--item js--col1 js--interact"
          );
          microscope.setAttribute("src", "#microscope-obj");
          microscope.setAttribute("mtl", "#microscope-mtl");
          microscope.setAttribute("scale", "0.09 0.09 0.09");
          microscope.setAttribute("position", {
            x: this.getAttribute("position").x,
            y: "1.1",
            z: this.getAttribute("position").z,
          });
          holdms = "placed";
          scene.appendChild(microscope);
          document.getElementById("js--hold").remove();
          unlockDoor();
        }
      });
    };

    this.putdown_gb = function () {
      gasbrander_place.addEventListener("click", function (evt) {
        if (holdgb == "hold" && document.getElementById("js--gasbrander")) {
          let gasbrander = document.createElement("a-gltf-model");
          gasbrander.setAttribute("class", "js--pickup js--interact");
          gasbrander.setAttribute("src", "#gasbrander-gltf");
          gasbrander.setAttribute("scale", "1.2 1.2 1.2");
          gasbrander.setAttribute("position", {
            x: this.getAttribute("position").x,
            y: "0.9",
            z: this.getAttribute("position").z,
          });
          holdgb = "placed";
          scene.appendChild(gasbrander);
          document.getElementById("js--gasbrander").remove();
          unlockDoor();
        }
      });
    };

    this.putdown_prep = function () {
      prep_place.addEventListener("click", function (evt) {
        if (holdprep == "prep" && document.getElementById("js--prep")) {
          let prep = document.createElement("a-gltf-model");
          prep.setAttribute("class", "js--pickup js--interact");
          prep.setAttribute("src", "#preparaat-gltf");
          prep.setAttribute("scale", "0.04 0.04 0.04");
          prep.setAttribute("position", {
            x: this.getAttribute("position").x,
            y: "1.05",
            z: this.getAttribute("position").z,
          });
          holdprep = "placed";
          scene.appendChild(prep);
          document.getElementById("js--prep").remove();
          unlockDoor();
        }
        // if (holdms == "placed" && holdgb == "placed" && holdprep == "placed") {
        //   console.log("goed");
      });
    };

    function unlockDoor() {
      if (holdms == "placed" && holdgb == "placed" && holdprep == "placed") {
        let door_open = new Audio("./Sounds/dooropen.mp3");
        door_open.play();
        ani.value =
          "property: position; easing: linear; dur: 11000; to:" +
          doors[0].getAttribute("position").x +
          " -4.6 " +
          doors[0].getAttribute("position").z;
        doors[0].setAttribute("animation", ani.value);
      }
    }

    this.el.addEventListener("click", this.pickup_ms);
    this.el.addEventListener("click", this.putdown_ms);
    this.el.addEventListener("click", this.pickup_gb);
    this.el.addEventListener("click", this.putdown_gb);
    this.el.addEventListener("click", this.pickup_prep);
    this.el.addEventListener("click", this.putdown_prep);
  },

  update: function () {
    this.pickup_ms();
    this.putdown_ms();
    this.pickup_gb();
    this.putdown_gb();
    this.pickup_prep();
    this.putdown_prep();
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
});
