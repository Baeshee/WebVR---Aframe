window.onload = () => {
  const camera = document.getElementById("js--vision");
  let antwoorden = document.getElementsByClassName("js--antwoord_pickup");
  const antwoord_holder = document.getElementsByClassName(
    "js--antwoord_holder"
  );
  let scene = document.getElementById("js--scene");
  const text = document.getElementsByClassName("js--hint-text");
  const doors = document.getElementsByClassName("js--door");
  let hold = null;
  let ani = document.createAttribute("animation");

  const buttons = document.getElementsByClassName("js--button1");
  let zani = document.createAttribute("animation");
  let bani = document.createAttribute("animation");
  let door_open = new Audio("./Sounds/dooropen.mp3");
  door_open.volume = 0.3;

  let utter = new SpeechSynthesisUtterance();
  utter.lang = "nl-NL";
  utter.volume = 0.5;

  function doorInfoUnlock() {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (evt) {
        if (i == 0) {
          bani.value =
            "property: rotation; easing: linear; dur: 1000; to: 0 0 135";
          buttons[i].setAttribute("animation", bani.value);
          door_open.play();
          zani.value =
            "property: position; easing: linear; dur: 11000; to:" +
            doors[1].getAttribute("position").x +
            " -4.6 " +
            doors[1].getAttribute("position").z;
          doors[1].setAttribute("animation", zani.value);
        }
        if(i==1){
            bani.value =
            "property: rotation; easing: linear; dur: 1000; to: 0 0 135";
          buttons[i].setAttribute("animation", bani.value);
          door_open.play();
          zani.value =
            "property: position; easing: linear; dur: 11000; to:" +
            doors[6].getAttribute("position").x +
            " -4.6 " +
            doors[6].getAttribute("position").z;
          doors[6].setAttribute("animation", zani.value);
        }

      });
    }
  }
  doorInfoUnlock();

  function addListeners() {
    for (let i = 0; i < antwoorden.length; i++) {
      antwoorden[i].addEventListener("click", function (evt) {
        if (hold == null && evt.target.classList.contains("js--a0")) {
          camera.innerHTML +=
            '<a-box id="js--antwoord_holding" class="js--antwoord_pickup js--interact" src="./img/Sponge.jpg" width="0.8" depth="0.8" height="0.8" position="0.5 -0.8 -1"></a-box>';
          hold = 0;
        }
        if (hold == null && evt.target.classList.contains("js--a1")) {
          camera.innerHTML +=
            '<a-box id="js--antwoord_holding" class="js--antwoord_pickup js--interact" src="./img/Gramkleuring_positief.jpg" width="0.8" depth="0.8" height="0.8" position="0.5 -0.8 -1"></a-box>';
          hold = 1;
        }
        if (hold == null && evt.target.classList.contains("js--a2")) {
          camera.innerHTML +=
            '<a-box id="js--antwoord_holding" class="js--antwoord_pickup js--interact" src="./img/Asporogeen_2.png" width="0.8" depth="0.8" height="0.8" position="0.5 -0.8 -1"></a-box>';
          hold = 2;
        }
        if (hold == null && evt.target.classList.contains("js--a3")) {
          camera.innerHTML +=
            '<a-box id="js--antwoord_holding" class="js--antwoord_pickup js--interact" src="./img/Asporogeen.png" width="0.8" depth="0.8" height="0.8" position="0.5 -0.8 -1"></a-box>';
          hold = 3;
        }

        this.remove();
        text[2].setAttribute("value", "");
      });
    }
  }

  addListeners();

  for (let i = 0; i < antwoord_holder.length; i++) {
    antwoord_holder[i].addEventListener("click", function (evt) {
      let box = document.createElement("a-box");
      box.setAttribute("width", "0.8");
      box.setAttribute("depth", "0.8");
      box.setAttribute("height", "0.8");
      box.setAttribute("position", {
        x: this.getAttribute("position").x,
        y: "0.5",
        z: this.getAttribute("position").z,
      });

      if (hold == 0) {
        box.setAttribute("class", "js--antwoord_pickup js--a0 js--interact");
        box.setAttribute("src", "./img/Sponge.jpg");
        if (evt.target == antwoord_holder[0]) {
          text[2].setAttribute("value", "Dit is een spons geen bacterie.");
        }
      }
      if (hold == 1) {
        box.setAttribute("class", "js--antwoord_pickup js--a1 js--interact");
        box.setAttribute("src", "./img/Gramkleuring_positief.jpg");
        if (evt.target == antwoord_holder[0]) {
            door_open.play();
          text[2].setAttribute(
            "value",
            "Deze is inderdaad asporogeen, want asporogeen heeft geen ander gekleurde sporen."
          );
          ani.value =
            "property: position; easing: linear; dur: 11000; to:" +
            doors[4].getAttribute("position").x +
            " -4.6 " +
            doors[4].getAttribute("position").z;
          doors[4].setAttribute("animation", ani.value);
        }
      }
      if (hold == 2) {
        box.setAttribute("class", "js--antwoord_pickup js--a2 js--interact");
        box.setAttribute("src", "./img/Asporogeen_2.png");
        if (evt.target == antwoord_holder[0]) {
          text[2].setAttribute(
            "value",
            "Deze bacterie is sporogeen, want hij heeft 2 kleuren."
          );
        }
      }
      if (hold == 3) {
        box.setAttribute("class", "js--antwoord_pickup js--a3 js--interact");
        box.setAttribute("src", "./img/Asporogeen.png");
        if (evt.target == antwoord_holder[0]) {
          text[2].setAttribute(
            "value",
            "Deze bacterie is ook sporogeen, want hij heeft 2 kleuren."
          );
        }
      }

      scene.appendChild(box);
      document.getElementById("js--antwoord_holding").remove();
      hold = null;
      addListeners();
    });
  }
};
