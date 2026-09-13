document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const successBox = document.getElementById('successBox');
  const successDetails = document.getElementById('successDetails');

  const inputs = {
    fullName: document.getElementById('fullName'),
    studentId: document.getElementById('studentId'),
    email: document.getElementById('email'),
    course: document.getElementById('course'),
    terms: document.getElementById('terms')
  };

  const validateField = (fieldKey) => {
    const input = inputs[fieldKey];
    const errorSpan = document.getElementById(`${fieldKey}Error`);
    let errorMessage = '';

    if (fieldKey === 'fullName' && !input.value.trim()) {
      errorMessage = 'Please enter your full name.';
    } else if (fieldKey === 'studentId' && !input.value.trim()) {
      errorMessage = 'Student ID is required.';
    } else if (fieldKey === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value.trim()) {
        errorMessage = 'Email address is required.';
      } else if (!emailRegex.test(input.value)) {
        errorMessage = 'Please enter a valid email address.';
      }
    } else if (fieldKey === 'course' && !input.value) {
      errorMessage = 'Please select a course module.';
    } else if (fieldKey === 'terms' && !input.checked) {
      errorMessage = 'You must accept the registration rules.';
    }

    errorSpan.textContent = errorMessage;
    return errorMessage === '';
  };

  // Add real-time validation event listeners
  Object.keys(inputs).forEach((key) => {
    const eventType = inputs[key].type === 'checkbox' || inputs[key].tagName === 'SELECT' ? 'change' : 'input';
    inputs[key].addEventListener(eventType, () => validateField(key));
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(inputs).forEach((key) => {
      if (!validateField(key)) {
        isValid = false;
      }
    });

    if (isValid) {
      const studentName = inputs.fullName.value.trim();
      const selectedCourse = inputs.course.value;

      successDetails.textContent = `Student ${studentName} successfully registered for ${selectedCourse}.`;
      successBox.classList.remove('hidden');
      form.reset();
    } else {
      successBox.classList.add('hidden');
    }
  });
});