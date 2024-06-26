document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});
document.addEventListener('DOMContentLoaded', async function () {
  const collegesList = document.getElementById('collegesList');

  async function fetchColleges() {
    const response = await fetch('/colleges');
    const colleges = await response.json();
    colleges.forEach((college) => {
      const div = document.createElement('div');
      div.innerHTML = `
                <input type="radio" name="college" value="${college._id}">
                ${college.name}
            `;
      collegesList.appendChild(div);
    });
  }

  async function updateCollege(collegeId, newName) {
    const response = await fetch('/colleges/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collegeId, newName }),
    });

    const result = await response.json();
    return response.ok
      ? 'College name updated successfully!'
      : `Error: ${result.message}`;
  }

  document
    .getElementById('editCollegeForm')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      const selectedCollege = document.querySelector(
        'input[name="college"]:checked',
      );
      const newName = document.getElementById('newName').value;

      if (selectedCollege && newName) {
        const message = await updateCollege(selectedCollege.value, newName);
        document.getElementById('message').textContent = message;
        location.reload();
        await fetchColleges(); // Refresh the list
      } else {
        document.getElementById('message').textContent =
          'Please select a college and enter a new name';
      }
    });

  await fetchColleges();
});
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
