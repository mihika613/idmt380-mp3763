const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#primary-menu");

toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", !isOpen);
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Open menu" : "Close menu"
    );

    menu.classList.toggle("open");
});

// FIRST NAME
const firstNameInput = document.getElementById('first-name');
const firstNameError = document.getElementById('first-name-error');

firstNameInput.addEventListener('blur', function() {
  const firstName = this.value.trim();

  if (firstName.length < 2) {
    this.setAttribute('aria-invalid', 'true');
    firstNameError.hidden = false;
  } else {
    this.setAttribute('aria-invalid', 'false');
    firstNameError.hidden = true;
  }
});


// LAST NAME
const lastNameInput = document.getElementById('last-name');
const lastNameError = document.getElementById('last-name-error');

lastNameInput.addEventListener('blur', function() {
  const lastName = this.value.trim();

  if (lastName.length < 2) {
    this.setAttribute('aria-invalid', 'true');
    lastNameError.hidden = false;
  } else {
    this.setAttribute('aria-invalid', 'false');
    lastNameError.hidden = true;
  }
});


// EMAIL
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

emailInput.addEventListener('blur', function() {
  const email = this.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    this.setAttribute('aria-invalid', 'true');
    emailError.hidden = false;
  } else {
    this.setAttribute('aria-invalid', 'false');
    emailError.hidden = true;
  }
});

// PHONE
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phone-error');

phoneInput.addEventListener('blur', function() {
  const phone = this.value.trim();
  const phonePattern = /^[0-9()\-\s]{10,}$/;

  if (!phonePattern.test(phone)) {
    this.setAttribute('aria-invalid', 'true');
    phoneError.hidden = false;
  } else {
    this.setAttribute('aria-invalid', 'false');
    phoneError.hidden = true;
  }
});


// MESSAGE
const messageInput = document.getElementById('message');
const messageError = document.getElementById('message-error');

messageInput.addEventListener('blur', function () {
  const message = this.value.trim();

  if (message.length === 0) {
    this.setAttribute('aria-invalid', 'true');
    messageError.hidden = false;
  } else {
    this.setAttribute('aria-invalid', 'false');
    messageError.hidden = true;
  }
});


const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  let isValid = true;

// FIRST NAME
if (firstNameInput.value.trim().length < 2) {
  firstNameInput.setAttribute("aria-invalid", "true");
  firstNameError.hidden = false;
  isValid = false;
}

// LAST NAME
if (lastNameInput.value.trim().length < 2) {
  lastNameInput.setAttribute("aria-invalid", "true");
  lastNameError.hidden = false;
  isValid = false;
}

// EMAIL
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(emailInput.value.trim())) {
  emailInput.setAttribute("aria-invalid", "true");
  emailError.hidden = false;
  isValid = false;
}

// PHONE (optional but validate if entered)
const phone = phoneInput.value.trim();
const phonePattern = /^[0-9()\-\s]{10,}$/;
if (phone.length > 0 && !phonePattern.test(phone)) {
  phoneInput.setAttribute("aria-invalid", "true");
  phoneError.hidden = false;
  isValid = false;
}

// MESSAGE
if (messageInput.value.trim().length === 0) {
  messageInput.setAttribute("aria-invalid", "true");
  messageError.hidden = false;
  isValid = false;
}

// STOP submit if invalid
if (!isValid) {
  e.preventDefault();
}
});