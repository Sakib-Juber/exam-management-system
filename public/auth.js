const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");


// ================================
// REGISTER
// ================================

if (registerForm) {

    const roleSelect = document.getElementById("role");

    const studentFields =
        document.getElementById("studentFields");


    roleSelect.addEventListener("change", () => {

        if (roleSelect.value === "student") {

            studentFields.classList.remove("hidden");

        } else {

            studentFields.classList.add("hidden");

        }

    });


    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const message =
                document.getElementById("message");


            const role =
                document.getElementById("role").value;


            const data = {

                name:
                    document.getElementById("name").value.trim(),

                email:
                    document.getElementById("email").value.trim(),

                password:
                    document.getElementById("password").value,

                role

            };


            if (role === "student") {

                data.year =
                    document.getElementById("year").value;

                data.section =
                    document
                        .getElementById("section")
                        .value
                        .trim()
                        .toUpperCase();

            }


            try {

                const response = await fetch(
                    "/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );


                const result = await response.json();


                if (!response.ok) {

                    message.textContent = result.message;

                    return;
                }


                message.textContent =
                    "Registration successful. Redirecting to login...";


                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1000);


            } catch (error) {

                message.textContent =
                    "Unable to connect to server.";

            }

        }
    );

}


// ================================
// LOGIN
// ================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const message =
                document.getElementById("message");


            const data = {

                email:
                    document.getElementById("email").value.trim(),

                password:
                    document.getElementById("password").value,

                role:
                    document.getElementById("role").value

            };


            try {

                const response = await fetch(
                    "/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );


                const result = await response.json();


                if (!response.ok) {

                    message.textContent = result.message;

                    return;

                }


                // Store authentication information
                localStorage.setItem(
                    "token",
                    result.token
                );
                
                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );


                window.location.href =
                    "dashboard.html";


            } catch (error) {

                message.textContent =
                    "Unable to connect to server.";

            }

        }
    );

}