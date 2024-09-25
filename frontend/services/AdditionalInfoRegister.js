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

    if (!name || !surname || !bio) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("bio", bio);

    if (profilePicFile) {
      formData.append("profile_photo", profilePicFile);
    } else {
      formData.append("profile_photo", "../assets/default_profile.png");
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("Resposta do servidor:", response);

      const data = await response.json();

      if (response.ok) {
        // Armazenar os dados no localStorage
        localStorage.setItem("username", data.username || "Username Padrão");
        localStorage.setItem("email", data.email || "email@example.com");
        localStorage.setItem("name", name || "Nome Padrão");
        localStorage.setItem("surname", surname || "Sobrenome Padrão");
        localStorage.setItem("bio", bio || "Descrição padrão");
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

        console.log(localStorage); // Adicione este log
        alert("Cadastro concluído!");
        window.location.href = "Login.html"; // Certifique-se de que o caminho está correto
      } else {
        console.log("Erro na resposta:", data);
        alert(data.message || "Erro ao criar o perfil.");
      }
    } catch (error) {
      console.error("Erro ao criar o perfil:", error);
      alert("Ocorreu um erro ao tentar criar o perfil.");
    }
  });
});
