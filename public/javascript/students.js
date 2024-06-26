document.addEventListener('DOMContentLoaded', async () => {
  const studentList = document.getElementById('studentList');

  try {
    const response = await fetch('/api/students');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const students = await response.json();

    students.forEach((student) => {
      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.password}</td>
          <td><a href="#" onclick="deleteStudent('${student._id}')">Delete</a></td>
        `;

      studentList.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching students:', error);
  }
});

async function deleteStudent(studentId) {
  try {
    const response = await fetch(`/api/students/${studentId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      console.error('Failed to delete student');
    }
  } catch (error) {
    console.error('Error deleting student:', error);
  }
}
