/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'signin.html'; // Redirect to sign-in page if no token
    }
  
    // Optionally, verify the token by sending it to the back-end
    fetch('/auth/verify-token', {
      headers: {
      _Authorization: `Bearer ${token}`,
          get "Authorization"() {
              return this["_Authorization"];
          },
          set "Authorization"(value) {
              this["_Authorization"] = value;
          },
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid token');
      }
    })
    .catch(() => {
      localStorage.removeItem('token');
      window.location.href = 'signin.html'; // Redirect to sign-in page if token is invalid
    });
  });
  