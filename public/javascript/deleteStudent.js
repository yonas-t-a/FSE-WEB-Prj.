document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});
document.addEventListener('DOMContentLoaded', async function () {
  const studentsList = document.getElementById('studentsList');

  async function fetchStudents() {
    const response = await fetch('/students');
    const students = await response.json();
    students.forEach((student) => {
      const div = document.createElement('div');
      div.innerHTML = `
                <input type="checkbox" name="student" value="${student.email}">
                ${student.name}, ${student.email}
            `;
      studentsList.appendChild(div);
    });
  }

  async function deleteStudents(emails) {
    const response = await fetch('/students', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emails }),
    });

    const result = await response.json();
    return response.ok
      ? 'Students deleted successfully!'
      : `Error: ${result.message}`;
  }

  document
    .getElementById('deleteStudentForm')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      const checkedBoxes = document.querySelectorAll(
        'input[name="student"]:checked',
      );
      const emails = Array.from(checkedBoxes).map((box) => box.value);

      if (emails.length > 0) {
        const message = await deleteStudents(emails);
        document.getElementById('message').textContent = message;
        location.reload();
        await fetchStudents();
      } else {
        document.getElementById('message').textContent = 'No students selected';
      }
    });

  await fetchStudents();
});
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
