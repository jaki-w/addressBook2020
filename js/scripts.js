//Business Logic for AddressBook

function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i<this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i<this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}



//Business Logic for Contacts

function Contact(firstName, lastName, phoneNumber, addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = addresses;
}

function Addresses(homeAddress, workAddress, personalEmailAddress, workEmailAddress) {
  this.homeAddress = homeAddress;
  this.workAddress = workAddress;
  this.personalEmailAddress = personalEmailAddress;
  this.workEmailAddress = workEmailAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
Contact.prototype.updateContact = function(newPhoneNumber) {
  this.phoneNumber = newPhoneNumber;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".home-address").html(contact.addresses.homeAddress);
  $(".work-address").html(contact.addresses.workAddress);
  $(".personal-email-address").html(contact.addresses.personalEmailAddress);
  $(".work-email-address").html(contact.addresses.workEmailAddress);
  
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedPersonalEmailAddress = $("input#new-personal-email-address").val();
    const inputtedWorkEmailAddress = $("input#new-work-email-address").val();
    const inputtedHomeAddress = $("input#new-home-address").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    const inputtedAddresses = new Addresses(inputtedHomeAddress, inputtedWorkAddress, inputtedPersonalEmailAddress, inputtedWorkEmailAddress);
    $("input#new-first-name").val();
    $("input#new-last-name").val();
    $("input#new-phone-number").val();
    $("input#new-personal-email-address").val();
    $("input#new-work-email-address").val();
    $("input#new-home-address").val();
    $("input#new-work-address").val();
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(newContact);
  });
});