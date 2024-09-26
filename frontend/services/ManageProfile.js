document.addEventListener("DOMContentLoaded", async () => {
  // Obtém o token e o userId do localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Verifica se o token ou userId estão disponíveis
  if (!token || !userId) {
    alert("Usuário não autenticado!");
    window.location.href = "login.html"; // Redireciona para a tela de login se não houver token ou userId
    return;
  }

  // Função para buscar o perfil pelo userId
  async function getProfileById(userId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/profiles/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Passa o token para autenticação
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erro ao buscar perfil. Verifique sua conexão ou tente mais tarde."
        );
      }

      const data = await response.json();
      console.log(data);
      return data.profile; // Retorna os dados do perfil
    } catch (error) {
      console.error("Erro ao buscar o perfil:", error);
      throw error;
    }
  }

  // Tenta buscar o perfil e popular os campos da página
  try {
    const profile = await getProfileById(userId); // Chama a função para buscar os dados do perfil

    // Popula os campos da página com as informações do perfil
    document.getElementById("username").textContent =
      profile.username || "Username não cadastrado";
    document.getElementById("email").textContent =
      profile.email || "Email não cadastrado";
    document.getElementById("name").textContent =
      profile.name || "Nome não cadastrado";
    document.getElementById("surname").textContent =
      profile.surname || "Sobrenome não cadastrado";
    document.getElementById("profile_photo").src =
      profile.profile_photo || "../assets/default_profile.png";
    document.getElementById("bio").textContent =
      profile.bio || "Biografia não cadastrada";
  } catch (error) {
    console.error("Erro ao carregar o perfil:", error);
    alert("Erro ao carregar o perfil. Tente novamente mais tarde.");
    window.location.href = "login.html";
  }
});
