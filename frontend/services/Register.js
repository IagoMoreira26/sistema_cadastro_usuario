const lockIcon = document.getElementById("lockIcon");
const passwordInput = document.getElementById("password");

lockIcon.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  lockIcon.classList.toggle("bxs-lock-alt");
  lockIcon.classList.toggle("bxs-lock-open");
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("profileId", data.id);
          localStorage.setItem("token", data.token);
          window.location.href = "./AdditionalInfoRegister.html";
        } else {
          document.getElementById("message").innerText = "Token não recebido!";
        }
      } else {
        document.getElementById("message").innerText =
          data.message || "Erro desconhecido!";
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      document.getElementById("message").innerText =
        "Erro ao registrar. Tente novamente mais tarde.";
    }
  });
