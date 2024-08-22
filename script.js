let roles = {
  "civil": document.getElementById("civil"),
  "doctor" : document.getElementById("doctor"), 
  "policeman" : document.getElementById("policeman"), 
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
let role_names = ["Civil", "Doctor", "Policeman", "Mafia"];
function recalculateAvailableRoles(){
  // copy all values from inputs to array
  let i = 0;
  for (const [name, element] of Object.entries(roles)) {
    available_roles[i++] = element.value;
  }
  console.log(available_roles)
}

let change_disabled = false; // are inputs disabled?
function pick(){
  disable();
  let names = [];
  
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
    element.value = 0;
  }
  // reset available roles to 0
  for(let i = 0; i < available_roles.length; i++){
    available_roles[i] = 0;
  }
}