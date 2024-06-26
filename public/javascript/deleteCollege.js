document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetchColleges();
});

async function fetchColleges() {
  try {
    const response = await fetch('/colleges');
    const colleges = await response.json();
    const collegeList = document.getElementById('collegeList');

    colleges.forEach((college) => {
      const radioBtn = document.createElement('input');
      radioBtn.type = 'radio';
      radioBtn.name = 'college';
      radioBtn.value = college._id;
      radioBtn.id = college._id;

      const label = document.createElement('label');
      label.htmlFor = college._id;
      label.textContent = college.name;

      const div = document.createElement('div');
      div.appendChild(radioBtn);
      div.appendChild(label);

      collegeList.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
  }
}

async function deleteSelectedCollege() {
  const selectedCollegeId = document.querySelector(
    'input[name="college"]:checked',
  ).value;
  if (!selectedCollegeId) {
    alert('Please select a college to delete.');
    return;
  }

  try {
    await fetch('/colleges/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collegeId: selectedCollegeId }),
    });
    alert('College and related departments and courses deleted successfully.');
    location.reload(); // Note ####### this to include also on the other delating files.
  } catch (error) {
    console.error('Error deleting college:', error);
    alert('Failed to delete the college.');
  }
}
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}