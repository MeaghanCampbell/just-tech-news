// add script tag for this front end javascript to login page, only one we want to load this

// async keyword is added to functions to tell them to return a promise rather than directly returning the value
// promise represents the eventual completion or failure of an asynchronous operation and it's value
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
    // using async await, we can make asynchnerous code easier to write and read after
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        // because we use await, we don't need to use catch or then
        headers: { 'Content-Type': 'application/json' }
      })
      // check response status
      if (response.ok) {
          console.log('success') 
      } else {
          alert(response.statusText)
      }
    }
}

// login form handler
async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
          // go to homepage
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }

// listener for submit button on signup
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// listen for submit button on login
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

