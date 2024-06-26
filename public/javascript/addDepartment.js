document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});
async function departmentExists(name) {
  const response = await fetch(`/departments?name=${name}`);
  const departments = await response.json();
  return departments.some((department) => department.name === name);
}
async function fetchColleges() {
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
    label.innerText = college.name;

    const br = document.createElement('br');

    collegeList.appendChild(radioBtn);
    collegeList.appendChild(label);
    collegeList.appendChild(br);
  });
}
async function addDepartment(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const collegeId = document.querySelector(
    'input[name="college"]:checked',
  ).value;

  if (await departmentExists(name)) {
    alert('Department already exists!');
  } else {
    const response = await fetch('/departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, collegeId }),
    });

    if (response.ok) {
      alert('Department added successfully!');
    } else {
      alert('Failed to add department.');
    }
  }
}
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}

window.onload = fetchColleges;
