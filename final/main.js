// NAV TOGGLE
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#primary-menu");

toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";

  toggle.setAttribute("aria-expanded", !isOpen);
  toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");

  menu.classList.toggle("open");
});

const form = document.querySelector(".contact-form");
if (form) {
  // INPUT REFERENCES
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput  = document.getElementById("last-name");
  const emailInput     = document.getElementById("email");
  const phoneInput     = document.getElementById("phone");
  const messageInput   = document.getElementById("message");

  const firstNameError = document.getElementById("first-name-error");
  const lastNameError  = document.getElementById("last-name-error");
  const emailError     = document.getElementById("email-error");
  const phoneError     = document.getElementById("phone-error");
  const messageError   = document.getElementById("message-error");

  const formFeedback = document.getElementById("form-feedback");


  // ---------- REAL-TIME FIELD VALIDATION ----------

  // FIRST NAME
  if (firstNameInput) {
    firstNameInput.addEventListener("blur", () => {
      const isValid = firstNameInput.value.trim().length >= 1;
      setFieldState(firstNameInput, firstNameError, isValid);
    });
  }

  // LAST NAME
  if (lastNameInput) {
    lastNameInput.addEventListener("blur", () => {
      const isValid = lastNameInput.value.trim().length >= 1;
      setFieldState(lastNameInput, lastNameError, isValid);
    });
  }

  // EMAIL
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = pattern.test(emailInput.value.trim());
      setFieldState(emailInput, emailError, isValid);
    });
  }

  // ---------- PHONE AUTO-FORMAT ----------
  if (phoneInput) {
    phoneInput.addEventListener("input", formatPhoneNumber);

    function formatPhoneNumber(e) {
      let digits = e.target.value.replace(/\D/g, "").slice(0, 10);

      if (digits.length > 6) {
        digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      } else if (digits.length > 3) {
        digits = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else if (digits.length > 0) {
        digits = `(${digits}`;
      }

      e.target.value = digits;
    }

    // PHONE VALIDATION ON BLUR
    phoneInput.addEventListener("blur", () => {
      const pattern = /^\(\d{3}\) \d{3}-\d{4}$/;
      const value = phoneInput.value.trim();
      const isValid = value.length === 0 || pattern.test(value);
      setFieldState(phoneInput, phoneError, isValid);
    });
  }

  // MESSAGE
  if (messageInput) {
    messageInput.addEventListener("blur", () => {
      const isValid = messageInput.value.trim().length > 0;
      setFieldState(messageInput, messageError, isValid);
    });
  }

  // FORM SUBMIT VALIDATION 
  form.addEventListener("submit", function (e) {
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (firstNameInput.value.trim().length < 1) {
      setFieldState(firstNameInput, firstNameError, false);
      isValid = false;
    }

    if (lastNameInput.value.trim().length < 1) {
      setFieldState(lastNameInput, lastNameError, false);
      isValid = false;
    }

    if (!emailPattern.test(emailInput.value.trim())) {
      setFieldState(emailInput, emailError, false);
      isValid = false;
    }

    const phoneVal = phoneInput.value.trim();
    if (phoneVal.length > 0 && !phonePattern.test(phoneVal)) {
      setFieldState(phoneInput, phoneError, false);
      isValid = false;
    }

    if (messageInput.value.trim().length === 0) {
      setFieldState(messageInput, messageError, false);
      isValid = false;
    }


    if (!isValid) {
      e.preventDefault();
      formFeedback.textContent = "Please re-enter the correct values into the form.";
      formFeedback.className = "form-feedback error";
      formFeedback.hidden = false;
    } else {
      e.preventDefault(); // remove when backend is connected
      formFeedback.textContent = "Your message was sent successfully!";
      formFeedback.className = "form-feedback success";
      formFeedback.hidden = false;
    }
  });


  // ACCESSIBLE FIELD STATE
  function setFieldState(input, errorEl, isValid) {
    input.classList.remove("valid", "invalid");

    let icon = input.parentElement.querySelector(".validation-icon");
    if (!icon) {
      icon = document.createElement("span");
      icon.className = "validation-icon";
      input.parentElement.appendChild(icon);
    }

    if (isValid) {
      input.classList.add("valid");
      input.setAttribute("aria-invalid", "false");
      errorEl.hidden = true;
      icon.textContent = "✓";
      icon.classList.add("valid");
      icon.classList.remove("invalid");
    } else {
      input.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
      errorEl.hidden = false;
      icon.textContent = "✕";
      icon.classList.add("invalid");
      icon.classList.remove("valid");
    }
  }


  const discardBtn = document.getElementById("discard-btn");

  if (discardBtn) {
    discardBtn.addEventListener("click", () => {
        // Clear all inputs and textarea
        form.reset();

        // Remove validation states
        [firstNameInput, lastNameInput, emailInput, phoneInput, messageInput].forEach(input => {
            input.classList.remove("valid", "invalid");
            input.setAttribute("aria-invalid", "false");
            const icon = input.parentElement.querySelector(".validation-icon");
            if (icon) icon.remove();
        });

        // Hide error messages
        [firstNameError, lastNameError, emailError, phoneError, messageError].forEach(err => {
            err.hidden = true;
        });

        // Hide form feedback
        formFeedback.hidden = true;
    });
  }
}