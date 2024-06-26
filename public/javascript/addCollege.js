document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
  document
    .getElementById('addCollegeForm')
    .addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;

      // Fetch existing colleges
      const existingCollegesResponse = await fetch('/colleges');
      if (!existingCollegesResponse.ok) {
        alert('Failed to fetch existing colleges');
        return;
      }

      const existingColleges = await existingCollegesResponse.json();

      // Check if the college already exists
      const collegeExists = existingColleges.some(
        (college) => college.name.toLowerCase() === name.toLowerCase(),
      );

      if (collegeExists) {
        alert('College already exists');
        return;
      }

      // Add new college
      const response = await fetch('/colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert('College added successfully');
        document.getElementById('addCollegeForm').reset();
      } else {
        alert('Failed to add college');
      }
    });
});
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
