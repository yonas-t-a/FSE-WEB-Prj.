document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});

function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
