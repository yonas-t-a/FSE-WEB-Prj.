document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});
document.addEventListener('DOMContentLoaded', async function () {
  const departmentsList = document.getElementById('departmentsList');
  const collegesList = document.getElementById('collegesList');

  async function fetchDepartments() {
    const response = await fetch('/departments');
    const departments = await response.json();
    departmentsList.innerHTML = '';
    departments.forEach((department) => {
      const div = document.createElement('div');
      div.innerHTML = `
                <input type="radio" name="department" value="${department._id}">
                ${department.name}
            `;
      departmentsList.appendChild(div);
    });
  }

  async function fetchColleges() {
    const response = await fetch('/colleges');
    const colleges = await response.json();
    collegesList.innerHTML = '';
    colleges.forEach((college) => {
      const div = document.createElement('div');
      div.innerHTML = `
                <input type="radio" name="college" value="${college._id}">
                ${college.name}
            `;
      collegesList.appendChild(div);
    });
  }

  async function updateDepartment(departmentId, newName, newCollegeId) {
    const response = await fetch('/departments/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ departmentId, newName, newCollegeId }),
    });

    const result = await response.json();
    return response.ok
      ? 'Department updated successfully!'
      : `Error: ${result.message}`;
  }

  document
    .getElementById('editDepartmentForm')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      const selectedDepartment = document.querySelector(
        'input[name="department"]:checked',
      );
      const newDepartmentName =
        document.getElementById('newDepartmentName').value;
      const selectedCollege = document.querySelector(
        'input[name="college"]:checked',
      );

      if (selectedDepartment) {
        const departmentId = selectedDepartment.value;
        const newName = newDepartmentName || null;
        const newCollegeId = selectedCollege ? selectedCollege.value : null;
        const message = await updateDepartment(
          departmentId,
          newName,
          newCollegeId,
        );
        document.getElementById('message').textContent = message;
        await fetchDepartments(); // Refresh the list
        await fetchColleges(); // Refresh the list
      } else {
        document.getElementById('message').textContent =
          'Please select a department';
      }
    });

  await fetchDepartments();
  await fetchColleges();
});
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
