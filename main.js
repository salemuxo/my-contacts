// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let outputEl = document.getElementById("output");
let confirmEl = document.getElementById("confirmation");

// contact array
const contacts = loadContacts();
displayContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "display-all") {
    displayContacts();
  } else if (selection === "add") {
    addContact();
  } else if (selection === "remove") {
    removeContact();
  } else if (selection === "display-name") {
    displayByName();
  } else if (selection === "display-country") {
    displayByCountry();
  } else if (selection === "find-email") {
    searchByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
  confirmEl.innerHTML = "";
}

// add contact using prompts for name, email, number, country unless email already exists
function addContact() {
  let name = prompt("Enter Contact Name:");
  let email = prompt("Enter Contact E-Mail Address:");
  let number = prompt("Enter Contact Phone Number:");
  let country = prompt("Enter Contact Country:");

  if (findByEmail(email) === -1) {
    contacts.push(newContact(name, email, number, country));
    saveContacts();
    confirmEl.innerHTML = "Contact added";
  } else confirmEl.innerHTML = "Contact email already exists.";
}

// remove contact by email
function removeContact() {
  let removeEmail = findByEmail(prompt("Enter Contact Email:"));
  if (removeEmail != -1) {
    contacts.splice(removeEmail, 1);
    saveContacts();
    confirmEl.innerHTML = "Contact removed";
  }
}

// display all contacts including name
function displayByName() {
  let displayName = prompt("Enter Contact Name:");
  for (let i = 0; i < contacts.length; i++) {
    document.getElementById(contacts[i].name).style.display = "block";
    if (!contacts[i].name.toLowerCase().includes(displayName.toLowerCase()))
      document.getElementById(contacts[i].name).style.display = "none";
  }
}

// display all contacts with specific country
function displayByCountry() {
  let displayCountry = prompt("Enter Contact Country:");
  for (let i = 0; i < contacts.length; i++) {
    document.getElementById(contacts[i].name).style.display = "block";
    if (contacts[i].country != displayCountry) {
      document.getElementById(contacts[i].name).style.display = "none";
    }
  }
}

// display contact with certain email
function searchByEmail() {
  let displayEmail = prompt("Enter Contact Email:");
  if (findByEmail(displayEmail) != -1) {
    for (let i = 0; i < contacts.length; i++) {
      document.getElementById(contacts[i].name).style.display = "block";
      if (contacts[i].email != displayEmail)
        document.getElementById(contacts[i].name).style.display = "none";
    }
  }
}

// helper functions
// turn contact into html div
function getHTMLStr(contact, i) {
  return `
    <div id="${contact.name}">
      <h3>${i}: ${contact.name}</h3>
      <p>${contact.email}</p>
      <p>${contact.number} (${contact.country})</p>
    </div>
  `;
}

// turn contact info into object
function newContact(contactName, contactEmail, contactNumber, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    number: contactNumber,
    country: contactCountry,
  };
}

// save contacts to localStorage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// load contacts from localStorage
function loadContacts() {
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
}

// find contact by email, return -1 if false or index if true
function findByEmail(searchEmail) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email === searchEmail) {
      return i;
    }
  }
  return -1;
}
