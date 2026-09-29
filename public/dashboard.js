const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");


// User must be logged in
if (!token || !storedUser) {
    window.location.href = "login.html";
}

const user = JSON.parse(storedUser);


// Elements
const welcome =
    document.getElementById("welcome");

const userInfo =
    document.getElementById("userInfo");

const adminDashboard =
    document.getElementById("adminDashboard");

const studentDashboard =
    document.getElementById("studentDashboard");

const logoutButton =
    document.getElementById("logoutButton");


// ================================
// BASIC USER INFORMATION
// ================================

welcome.textContent =
    `Welcome, ${user.name}`;

userInfo.textContent =
    `${user.role.toUpperCase()} • ${user.role === "student"
        ? `Year ${user.year}, Section ${user.section}`
        : "Exam Administrator"
    }`;


// ================================
// LOGOUT
// ================================

logoutButton.addEventListener("click", () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

});


// ================================
// ROLE DASHBOARD
// ================================

if (user.role === "admin") {

    adminDashboard.classList.remove("hidden");

    loadAdminExams();

} else {

    studentDashboard.classList.remove("hidden");

    loadStudentExams();

}


// ================================
// ADMIN: ADD EXAM
// ================================

const examForm =
    document.getElementById("examForm");


if (examForm) {

    examForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const message =
                document.getElementById("examMessage");


            const subject =
                document
                    .getElementById("subject")
                    .value
                    .trim();

            const year =
                document.getElementById("examYear").value;

            const section =
                document
                    .getElementById("examSection")
                    .value
                    .trim()
                    .toUpperCase();

            const examDate =
                document.getElementById("examDate").value;

            const startTime =
                document.getElementById("startTime").value;

            const endTime =
                document.getElementById("endTime").value;


            // Frontend validation
            if (endTime <= startTime) {

                message.textContent =
                    "End time must be after start time.";

                return;

            }


            const data = {

                subject,
                year,
                section,
                examDate,
                startTime,
                endTime

            };


            try {

                const response = await fetch(
                    "/api/exams",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body: JSON.stringify(data)

                    }
                );


                const result =
                    await response.json();


                if (!response.ok) {

                    message.textContent =
                        result.message;

                    return;

                }


                message.textContent =
                    "Exam added successfully.";


                examForm.reset();


                loadAdminExams();


            } catch (error) {

                message.textContent =
                    "Unable to connect to server.";

            }

        }
    );

}


// ================================
// ADMIN: LOAD ALL EXAMS
// ================================

async function loadAdminExams() {

    const container =
        document.getElementById(
            "adminExamList"
        );


    try {

        const response = await fetch(
            "/api/exams",
            {

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }

            }
        );


        const exams =
            await response.json();


        if (!response.ok) {

            container.innerHTML =
                `<p>${exams.message}</p>`;

            return;

        }


        if (exams.length === 0) {

            container.innerHTML =
                `
        <div class="empty-state">
          No exams have been scheduled yet.
        </div>
        `;

            return;

        }


        container.innerHTML = createExamTable(
            exams,
            true
        );


    } catch (error) {

        container.innerHTML =
            `
      <div class="empty-state">
        Unable to load exams.
      </div>
      `;

    }

}


// ================================
// STUDENT: LOAD OWN EXAMS
// ================================

async function loadStudentExams() {

    const container =
        document.getElementById(
            "studentExamList"
        );

    const studentClass =
        document.getElementById(
            "studentClass"
        );


    studentClass.textContent =
        `Showing exams for Year ${user.year}, Section ${user.section}`;


    try {

        const response = await fetch(
            "/api/exams/my",
            {

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }

            }
        );


        const exams =
            await response.json();


        if (!response.ok) {

            container.innerHTML =
                `<p>${exams.message}</p>`;

            return;

        }


        if (exams.length === 0) {

            container.innerHTML =
                `
        <div class="empty-state">
          No exams are currently scheduled
          for your class.
        </div>
        `;

            return;

        }


        container.innerHTML =
            createExamTable(
                exams,
                false
            );


    } catch (error) {

        container.innerHTML =
            `
      <div class="empty-state">
        Unable to load your timetable.
      </div>
      `;

    }

}


// ================================
// CREATE TABLE
// ================================

function createExamTable(
    exams,
    showDeleteButton
) {

    let html = `

    <table class="exam-table">

      <thead>

        <tr>

          <th>Subject</th>
          <th>Year</th>
          <th>Section</th>
          <th>Date</th>
          <th>Time</th>

          ${showDeleteButton
            ? "<th>Action</th>"
            : ""
        }

        </tr>

      </thead>

      <tbody>

  `;


    exams.forEach((exam) => {

        html += `

      <tr>

        <td>
          ${escapeHTML(exam.subject)}
        </td>

        <td>
          ${escapeHTML(exam.year)}
        </td>

        <td>
          ${escapeHTML(exam.section)}
        </td>

        <td>
          ${formatDate(exam.examDate)}
        </td>

        <td>
          ${formatTime(exam.startTime)}
          -
          ${formatTime(exam.endTime)}
        </td>

        ${showDeleteButton
                ? `
              <td>

                <button
                  class="delete-button"
                  onclick="deleteExam('${exam._id}')"
                >
                  Delete
                </button>

              </td>
            `
                : ""
            }

      </tr>

    `;

    });


    html += `

      </tbody>

    </table>

  `;


    return html;

}


// ================================
// ADMIN: DELETE EXAM
// ================================

async function deleteExam(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this exam?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `/api/exams/${id}`,
            {

                method: "DELETE",

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }

            }
        );


        const result =
            await response.json();


        if (!response.ok) {

            alert(result.message);

            return;

        }


        loadAdminExams();


    } catch (error) {

        alert("Unable to delete exam.");

    }

}


// ================================
// DATE FORMAT
// ================================

function formatDate(dateString) {

    const date =
        new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ================================
// TIME FORMAT
// ================================

function formatTime(time) {

    const [hour, minute] =
        time.split(":");

    const date =
        new Date();

    date.setHours(
        Number(hour),
        Number(minute)
    );

    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


// ================================
// BASIC HTML ESCAPING
// ================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}