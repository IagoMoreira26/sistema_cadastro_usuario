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
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Armazenar os dados no localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Redirecionar para a página de informações adicionais
    window.location.href = "./AdditionalInfoRegister.html";
  });
