document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  fetchCourses();
});

async function fetchCourses() {
  const response = await fetch('/courses');
  const courses = await response.json();
  const coursesList = document.getElementById('coursesList');

  courses.forEach((course) => {
    const courseDiv = document.createElement('div');
    courseDiv.innerHTML = `
            <input type="checkbox" name="courseId" value="${course._id}">
            <label>${course.name}</label>
        `;
    coursesList.appendChild(courseDiv);
  });
}

async function deleteSelectedCourses() {
  const form = document.getElementById('deleteCoursesForm');
  const formData = new FormData(form);
  const selectedCourseIds = formData.getAll('courseId');

  if (selectedCourseIds.length === 0) {
    alert('Please select at least one course to delete.');
    return;
  }

  const confirmDelete = confirm(
    'Are you sure you want to delete the selected courses?',
  );
  if (!confirmDelete) {
    return;
  }

  const response = await fetch('/courses/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ courseIds: selectedCourseIds }),
  });

  if (response.ok) {
    alert('Selected courses deleted successfully!');
    location.reload();
    fetchCourses(); // Refresh the course list
  } else {
    alert('Failed to delete selected courses. Please try again.');
  }
}
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
