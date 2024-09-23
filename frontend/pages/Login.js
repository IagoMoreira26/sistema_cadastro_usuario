document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const email = document.getElementById("email").value; // Obtém o valor do campo de email
    const password = document.getElementById("password").value; // Obtém o valor do campo de senha

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Define o tipo de conteúdo da requisição
        },
        body: JSON.stringify({ email, password }), // Converte os dados em JSON
      });

      const data = await response.json(); // Converte a resposta em JSON
      document.getElementById("message").innerText = data.message; // Exibe a mensagem retornada

      if (response.ok) {
        localStorage.setItem("token", data.token); // Armazena o token no localStorage
        window.location.href = "/profile.html"; // Redireciona para a página do perfil
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error); // Loga o erro no console
      document.getElementById("message").innerText =
        "Erro ao fazer login. Tente novamente."; // Mensagem de erro
    }
  });
