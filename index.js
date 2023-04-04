const form = document.querySelector('#registration-form');
const firstName = form.querySelector('#first-name');
const lastName = form.querySelector('#last-name');
const birthdate = form.querySelector('#birthdate');
const email = form.querySelector('#email');
const password = form.querySelector('#password');
const repeatPassword = form.querySelector('#repeat-password');

const showError = (input, message) => {
  const errorElement = input.parentElement.querySelector('.error-message');
  errorElement.innerText = message;
  return !message;
}

const validateName = (input) => {
  const value = input.value.trim();
  if (value.length < 2 || value.length > 25) {
    return showError(input, 'Поле должно содержать от 2 до 25 символов');
  } else {
    return showError(input, '');
  }
}

const validateBirthdate = (input) => {
  const value = input.value;
  if (!value || new Date(value) > new Date()) {
    return showError(input, 'Некорректная дата рождения');
  } else {
    return showError(input, '');
  }
}

const validateEmail = (input) => {
  const value = input.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    return showError(input, 'Введите корректный email');
  } else {
    return showError(input, '');
  }
}

const validatePassword = (input) => {
  const value = input.value.trim();
  const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

  if (!regex.test(value)) {
    return showError(input, 'Пароль должен быть не менее 8 символов, содержать минимум 1 цифру, 1 символ в верхнем регистре и 1 специальный символ !@#$%');
  } else {
    return showError(input, '');
  }
}

const validateRepeatPassword = (input, passwordInput) => {
  const value = input.value.trim();

  if (!value || value !== passwordInput.value.trim()) {
    return showError(input, 'Пароли не совпадают');
  } else {
    return showError(input, '');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const isValidForm =
  validateName(firstName, 'Имя') &&
  validateName(lastName, 'Фамилия') &&
  validateBirthdate(birthdate) &&
  validateEmail(email) &&
  validatePassword(password) &&
  validateRepeatPassword(repeatPassword, password);

  if (isValidForm) {
    const postData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      birthdate: birthdate.value,
      email: email.value.trim(),
      password: password.value.trim(),
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await(response.json())
      .then(form.reset())
      .then(alert('Данные успешно отправлены!'));

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
});
