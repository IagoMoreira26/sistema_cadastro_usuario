document.addEventListener("DOMContentLoaded", function () {
  const profilePicInput = document.getElementById("profilePic");

  profilePicInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector(".profile-photo img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  document.querySelector(".btn").addEventListener("click", async function () {
    const name = document.querySelector("input[placeholder='Nome']").value;
    const surname = document.querySelector(
      "input[placeholder='Sobrenome']"
    ).value;
    const bio = document.querySelector(
      "textarea[placeholder='Descrição']"
    ).value;
    const profilePicFile = profilePicInput.files[0];

    // Verificação de campos obrigatórios
    if (!name.trim() || !surname.trim() || !bio.trim()) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    // Recuperar os dados do localStorage (username, email, password)
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    // Criar um FormData para enviar todos os dados
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name.trim());
    formData.append("surname", surname.trim());
    formData.append("bio", bio.trim());

    // Adicionar a foto de perfil, se existir
    if (profilePicFile) {
      formData.append("profile_photo", profilePicFile);
    } else {
      formData.append("profile_photo", "../assets/default_profile.png");
    }

    // Enviar a requisição com todos os dados
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        body: formData, // FormData permite enviar dados mistos (campos + arquivo)
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        // Armazenar os dados no localStorage
        localStorage.setItem("profileId", data.id);
        localStorage.setItem("token", token);
        localStorage.setItem(
          "profile_photo",
          profilePicFile
            ? await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(profilePicFile);
              })
            : "../assets/default_profile.png"
        );

        alert("Cadastro concluído!");
        window.location.href = "./Login.html"; // Certifique-se de que o caminho está correto
      } else {
        alert(data.message || "Erro ao registrar.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Ocorreu um erro ao tentar registrar.");
    }
  });
});
