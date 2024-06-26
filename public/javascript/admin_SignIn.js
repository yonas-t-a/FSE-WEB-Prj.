document
  .getElementById('adminSignInForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const signInData = {
      email,
      password,
    };

    console.log(signInData); // Log the sign-in data to verify the inputs

    try {
      const response = await fetch('http://localhost:3000/admins/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert('Admin signed in successfully!');
        localStorage.setItem('adminToken', responseData.token);
        window.location.href = 'ADMIN_home.html';
      } else {
        const errorData = await response.json();
        alert('Error signing in admin: ' + errorData.message);
      }
    } catch (error) {
      alert('Error signing in admin: ' + error.message);
    }
  });
