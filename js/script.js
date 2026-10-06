// Get HTML elements
const studentForm = document.querySelector("#studentForm");

const studentName = document.querySelector("#studentName");
const studentEmail = document.querySelector("#studentEmail");
const studentMajor = document.querySelector("#studentMajor");
const studentLevel = document.querySelector("#studentLevel");

const studentsTableBody = document.querySelector("#studentsTableBody");
const studentCount = document.querySelector("#studentCount");
const searchInput = document.querySelector("#searchInput");
const emptyMessage = document.querySelector("#emptyMessage");
const submitButton = document.querySelector("#submitButton");

// Students array
let students = [];

// Current editing student
let editingStudentId = null;

// Add Student
studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = studentName.value.trim();
    const email = studentEmail.value.trim();
    const major = studentMajor.value.trim();
    const level = studentLevel.value;

    if (editingStudentId === null) {
        const newStudent = {
            id: Date.now(),
            name: name,
            email: email,
            major: major,
            level: level
        };
        students.push(newStudent);
    } else {
        const student = students.find(function (student) {
            return student.id === editingStudentId;
        });
        student.name = name;
        student.email = email;
        student.major = major;
        student.level = level;

        editingStudentId = null;

        submitButton.textContent = "Add Student";
    }
    studentForm.reset();
    displayStudents();
});

// Display Students
function displayStudents(studentList = students) {

    studentsTableBody.innerHTML = "";
    studentCount.textContent = studentList.length;

    if (studentList.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    studentList.forEach(function (student, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.major}</td>
            <td>${student.level}</td>

            <td>
                <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
}


// Delete Student
function deleteStudent(id) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) {
        return;
    }
    students = students.filter(function (student) {
        return student.id !== id;
    });
    displayStudents();
}

// Edit Student
function editStudent(id) {

    const student = students.find(function (student) {
        return student.id === id;
    });

    studentName.value = student.name;
    studentEmail.value = student.email;
    studentMajor.value = student.major;
    studentLevel.value = student.level;

    editingStudentId = id;

    submitButton.textContent = "Update Student";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Search Students
searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.toLowerCase().trim();
    const filteredStudents = students.filter(function (student) {
        return (
            student.name.toLowerCase().includes(searchValue) ||
            student.email.toLowerCase().includes(searchValue) ||
            student.major.toLowerCase().includes(searchValue) ||
            student.level.toLowerCase().includes(searchValue)
        );
    });
    displayStudents(filteredStudents);
});