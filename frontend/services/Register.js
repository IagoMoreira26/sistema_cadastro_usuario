document.getElementById("registerForm").addEventListener("submit", async (event) => {
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
            localStorage.setItem("token", data.token);
            window.location.href = "Additional_Info_Register.html"; // Redireciona para a tela de informações adicionais
        } else {
            document.getElementById("message").innerText = data.message;
        }
    } catch (error) {
        console.error("Erro ao registrar:", error);
    }
});
