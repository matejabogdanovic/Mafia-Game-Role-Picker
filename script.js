// I AM NOT PROUD THIS CODE. I JUST WROTE IT AS FAST AS POSSIBLE <3

let roles = {
  "civil": document.getElementById("civil"),
  "doctor" : document.getElementById("doctor"), 
  "police" : document.getElementById("police"), 
  "mafia" : document.getElementById("mafia")
}; 

// adding event listeners to keep track of number of players for each role
for (const [name, element] of Object.entries(roles)) {
  element.addEventListener("change", recalculateAvailableRoles)
}

// adding event listener when the button is pressed to pick a role and reset button
let btn_pick = document.querySelector("#pick");
let btn_reset = document.querySelector("#reset");
btn_pick.addEventListener("click", pick);
btn_reset.addEventListener("click", enable);

let available_roles = [0, 0, 0, 0]; // civils = 0, doctors = 0, policemen = 0, mafias = 0
let role_names = ["Civil", "Doctor", "Police", "Mafia"];
function recalculateAvailableRoles(){
  // copy all values from inputs to array
  let i = this.getAttribute("data-index");
  available_roles[i] = Number(this.value==""?0:this.value);
  console.log("Available roles list: ", available_roles)
}

let change_disabled = false; // are inputs disabled?
function pick(){
  disable();
  createNames();

  if(!names.length){btn_pick.disabled = true; return;}
  pickARole();
  if(!names.length){btn_pick.disabled = true;}
}

let picked_role_field = document.getElementById("picked-role");
let roles_left = document.querySelector(".roles-left");
// const role_text_color = ["text-civil", "text-doctor", "text-police", "text-mafia"];
const role_text_color = ["text-civil", "text-civil", "text-civil", "text-civil"];
let rolename = "###";
function pickARole(){
  rolename = names.pop();

  roles_left.innerHTML = names.length;
}

let btn_eye = document.getElementById("eye");

// for pc
btn_eye.addEventListener('mousedown', handlePressStart);
btn_eye.addEventListener('mouseup', handlePressEnd);

// for mobile
btn_eye.addEventListener('touchstart', handlePressStart);
btn_eye.addEventListener('touchend', handlePressEnd);
function handlePressStart(){
  console.log("down")
  picked_role_field.innerHTML = rolename;
  let i = 0;
  for(; i < role_names.length; i++){
    if(rolename==role_names[i])break;
  }
  picked_role_field.className = role_text_color[i];
}

function handlePressEnd(){
  console.log("up")
  picked_role_field.innerHTML = "###";
  picked_role_field.className = role_text_color[0];
  rolename = "###";
}


let names = new Array();
let picked = false;
function createNames(){
  if(picked) return;
  picked = true;
  let i = 0;
  let brojac = 0;
  while(i<available_roles.length){
    if(brojac>=available_roles[i]){
      brojac = 0;
      ++i;
    }else{    
      names.push(role_names[i]);
      brojac++;
    }
  }
  
  console.log("Created names: ", names);
  shuffle(names);
  console.log("Shuffled names: ", names);
}

function disable(){
  if(!change_disabled){
    change_disabled = true;
    for (const [name, element] of Object.entries(roles)) {
      element.disabled = true;
    }
  }
}

function enable(){
  change_disabled = false;
  // enable inputs and reset values
  for (const [name, element] of Object.entries(roles)) {
    element.disabled = false;
    element.value = "";
  }
  // reset available roles to 0
  for(let i = 0; i < available_roles.length; i++){
    available_roles[i] = 0;
  }

  //
  picked = false;
  names = [];

  //
  btn_pick.disabled = false;

  //
  picked_role_field.innerHTML = "###";

  //
  roles_left.innerHTML = "#";

  //
  rolename = "###";
}


function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

