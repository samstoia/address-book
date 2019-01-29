// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
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
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, homeAddress, workAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.homeAddress = homeAddress;
  this.workAddress = workAddress;
  };

  function WorkAddress(street, city, state, zip) {
    this.street = street,
    this.city = city,
    this.state = state,
    this.zip = zip

  }

  function HomeAddress(street, city, state, zip) {
    this.street = street,
    this.city = city,
    this.state = state,
    this.zip = zip
  }

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook()

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
    addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".home-street").html(contact.homeAddress.street);
  $(".home-city").html(contact.homeAddress.city);
  $(".home-state").html(contact.homeAddress.state);
  $(".home-zip").html(contact.homeAddress.zip);
  $(".work-street").html(contact.workAddress.street);
  $(".work-city").html(contact.workAddress.city);
  $(".work-state").html(contact.workAddress.state);
  $(".work-zip").html(contact.workAddress.zip);
  // $(".work-address").html(contact.address.workAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
  showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};




$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedHomeStreet = $("input#new-home-street").val();
    var inputtedHomeCity = $("input#new-home-city").val();
    var inputtedHomeState = $("input#new-home-state").val();
    var inputtedHomeZip = $("input#new-home-zip").val();
    var inputtedWorkStreet = $("input#new-work-street").val();
    var inputtedWorkCity = $("input#new-work-city").val();
    var inputtedWorkState = $("input#new-work-state").val();
    var inputtedWorkZip = $("input#new-work-zip").val();
    var newHomeAddress = new HomeAddress(inputtedHomeStreet, inputtedHomeCity, inputtedHomeState, inputtedHomeZip);
    var newWorkAddress = new WorkAddress(inputtedWorkStreet, inputtedWorkCity, inputtedWorkState, inputtedWorkZip)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, newHomeAddress, newWorkAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(newContact);
  });
});
