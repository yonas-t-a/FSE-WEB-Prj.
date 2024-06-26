document
  .getElementById('adminSignUpForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const adminData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        alert('Admin signed up successfully!');
        document.getElementById('adminSignUpForm').reset();
      } else {
        const errorData = await response.json();
        alert('Error signing up admin: ' + errorData.message);
      }
    } catch (error) {
      alert('Error signing up admin: ' + error.message);
    }
  });
