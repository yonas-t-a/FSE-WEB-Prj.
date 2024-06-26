document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = 'ADMIN_SignIn.html';
  }
  document.addEventListener('DOMContentLoaded', () => {
    fetchDepartments();

    document
      .getElementById('addCourseForm')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const courseData = collectFormData();
        if (await courseExists(courseData.code)) {
          alert('Course already exists!');
        } else {
          await addCourse(courseData);
        }
      });
  });
});

async function fetchDepartments() {
  const response = await fetch('/departments');
  const departments = await response.json();
  const departmentsDiv = document.getElementById('departments');
  departments.forEach((dept) => {
    const radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.name = 'departmentId';
    radioBtn.value = dept._id;
    const label = document.createElement('label');
    label.textContent = dept.name;
    departmentsDiv.appendChild(radioBtn);
    departmentsDiv.appendChild(label);
    departmentsDiv.appendChild(document.createElement('br'));
  });
}

function collectFormData() {
  const form = document.getElementById('addCourseForm');
  const formData = new FormData(form);
  const courseData = {
    code: formData.get('code'),
    name: formData.get('name'),
    level: formData.get('level'),
    courseInfo: formData.get('courseInfo'),
    syllabus: formData.get('syllabus'),
    externalLink: formData.get('externalLink'),
    books: collectBooks(),
    lectureVideos: collectVideos(),
    lectureAudios: collectAudios(),
    exams: collectExams(),
    departmentId: formData.get('departmentId'),
  };
  return courseData;
}

function collectBooks() {
  const bookDivs = document.querySelectorAll('#books div');
  return Array.from(bookDivs).map((div) => {
    return {
      id: generateRandomId(),
      name: div.querySelector('input[name="bookName"]').value,
      author: div.querySelector('input[name="bookAuthor"]').value,
      category: div.querySelector('input[name="bookCategory"]').value,
    };
  });
}

function collectVideos() {
  const videoDivs = document.querySelectorAll('#videos div');
  return Array.from(videoDivs).map((div) => {
    return {
      id: generateRandomId(),
      name: div.querySelector('input[name="videoName"]').value,
      embedIframe: div.querySelector('textarea[name="embedIframe"]').value,
    };
  });
}

function collectAudios() {
  const audioDivs = document.querySelectorAll('#audios div');
  return Array.from(audioDivs).map((div) => {
    return {
      id: generateRandomId(),
      name: div.querySelector('input[name="audioName"]').value,
      link: div.querySelector('input[name="audioLink"]').value,
    };
  });
}

function collectExams() {
  const examDivs = document.querySelectorAll('#exams div');
  return Array.from(examDivs).map((div) => {
    return {
      year: div.querySelector('input[name="examYear"]').value,
      examQuestion: div.querySelector('input[name="examQuestion"]').value,
      solution: div.querySelector('input[name="examSolution"]').value,
    };
  });
}

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

async function courseExists(courseCode) {
  const response = await fetch(`/courses?code=${courseCode}`);
  const courses = await response.json();
  return courses.some((course) => course.code === courseCode);
}

async function addCourse(courseData) {
  const response = await fetch('/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });
  if (response.ok) {
    alert('Course added successfully!');
    document.getElementById('addCourseForm').reset();
  } else {
    alert('Failed to add course. Please try again.');
  }
}

function addBook() {
  if (document.querySelectorAll('#books div').length < 3) {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `
            <label>Book Name:</label>
            <input type="text" name="bookName" required>
            <label>Author:</label>
            <input type="text" name="bookAuthor" required>
            <label>Category:</label>
            <input type="text" name="bookCategory" required>
        `;
    document.getElementById('books').appendChild(bookDiv);
  } else {
    alert('Maximum 3 books allowed.');
  }
}

function addVideo() {
  if (document.querySelectorAll('#videos div').length < 40) {
    const videoDiv = document.createElement('div');
    videoDiv.innerHTML = `
            <label>Video Name:</label>
            <input type="text" name="videoName" required>
            <label>Embedding Iframe:</label>
            <textarea name="embedIframe" required></textarea>
        `;
    document.getElementById('videos').appendChild(videoDiv);
  } else {
    alert('Maximum 40 videos allowed.');
  }
}

function addAudio() {
  if (document.querySelectorAll('#audios div').length < 10) {
    const audioDiv = document.createElement('div');
    audioDiv.innerHTML = `
            <label>Audio Name:</label>
            <input type="text" name="audioName" required>
            <label>Audio Link:</label>
            <input type="url" name="audioLink" required>
        `;
    document.getElementById('audios').appendChild(audioDiv);
  } else {
    alert('Maximum 10 audios allowed.');
  }
}

function addPrerequisite() {
  const prerequisiteDiv = document.createElement('div');
  prerequisiteDiv.innerHTML = `
        <label>Course ID:</label>
        <input type="text" name="prerequisiteId">
    `;
  document.getElementById('prerequisites').appendChild(prerequisiteDiv);
}

function addExam() {
  const examDiv = document.createElement('div');
  examDiv.innerHTML = `
        <label>Year:</label>
        <input type="text" name="examYear">
        <label>Exam Question:</label>
        <input type="text" name="examQuestion">
        <label>Solution:</label>
        <input type="text" name="examSolution">
    `;
  document.getElementById('exams').appendChild(examDiv);
}
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'ADMIN_SignIn.html';
}
