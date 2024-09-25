// Seleção de elementos do DOM
const lockIcon = document.getElementById("lockIcon");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const messageElement = document.getElementById("message");

// Evento de clique para alternar a visibilidade da senha
lockIcon.addEventListener("click", () => {
  const isPasswordVisible = passwordInput.getAttribute("type") === "text";
  passwordInput.setAttribute("type", isPasswordVisible ? "password" : "text");

  // Alterna os ícones de bloqueio
  lockIcon.classList.toggle("bxs-lock-alt", !isPasswordVisible);
  lockIcon.classList.toggle("bxs-lock-open", isPasswordVisible);
});

// Função para validar e-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Função para exibir mensagens de erro
function displayMessage(message) {
  messageElement.innerText = message;
}

// Evento de envio do formulário de login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  const email = document.getElementById("email").value.trim(); // Remove espaços em branco
  const password = passwordInput.value.trim(); // Remove espaços em branco

  // Validação simples antes de fazer a requisição
  if (!email || !password) {
    return displayMessage("Por favor, preencha todos os campos.");
  }

  if (!validateEmail(email)) {
    return displayMessage("Por favor, insira um e-mail válido.");
  }

  try {
    const response = await fetch("http://localhost:3000/api/login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Verifique a resposta da API
    if (!response.ok) {
      return displayMessage(data.message || "Erro ao fazer login.");
    }

    loginForm.reset(); // Limpa os campos do formulário
    window.location.href = `./ManageProfile.html`;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    displayMessage("Erro ao fazer login. Tente novamente.");
  }
});
