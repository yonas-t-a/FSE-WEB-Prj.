function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/signin.html';
  }
}

isAuthenticated();

// public/javascript/auth.js
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'signin.html';
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'signin.html';
}
