const registerForm = document.getElementById('registerForm');

function registerUser(e) {
e.preventDefault();

const emailInput = e.target.email;
const passwordInput = e.target.password;

const formData = {
  email: emailInput.value,
  password: passwordInput.value
}

// Send a POST fetch request to our register route
fetch('/auth/register', {
  method: 'POST',
  headers: {
'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
  .then(res => res.txt()) 
  .then(data => {
    console.log(data)
  })

  // Attach the form data (email & password) from our inputs to the body

  // Stringify the body object as JSON and console.log the server response

}
 
registerForm.addEventListener('submit', registerUser);