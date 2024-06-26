document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  fetchDepartments();
});

async function fetchDepartments() {
  const response = await fetch('/departments');
  const departments = await response.json();
  const departmentsList = document.getElementById('departmentsList');

  departments.forEach((department) => {
    const departmentDiv = document.createElement('div');
    departmentDiv.innerHTML = `
            <input type="radio" name="departmentId" value="${department._id}">
            <label>${department.name}</label>
        `;
    departmentsList.appendChild(departmentDiv);
  });
}

async function deleteSelectedDepartment() {
  const form = document.getElementById('deleteDepartmentForm');
  const formData = new FormData(form);
  const selectedDepartmentId = formData.get('departmentId');

  if (!selectedDepartmentId) {
    alert('Please select a department to delete.');
    return;
  }

  const confirmDelete = confirm(
    'Are you sure you want to delete the selected department and all associated courses?',
  );
  if (!confirmDelete) {
    return;
  }

  const response = await fetch('/departments/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ departmentId: selectedDepartmentId }),
  });

  if (response.ok) {
    alert('Selected department and associated courses deleted successfully!');
    location.reload();
    fetchDepartments(); // Refresh the department list
  } else {
    alert('Failed to delete selected department. Please try again.');
  }
}
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
