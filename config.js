async function cadastrar() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  // 🔒 Validação básica
  if (!nome || !email) {
    mostrarMensagem("⚠️ Preencha nome e email!", "erro");
    return;
  }

  try {
    const res = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify([{ nome, email }])
    });

    // 🔎 pega erro real do Supabase
    if (!res.ok) {
      const erro = await res.json();
      console.log("Erro do Supabase:", erro);

      // erro comum: email duplicado
      if (erro.message && erro.message.includes("duplicate")) {
        mostrarMensagem("❌ Email já cadastrado!", "erro");
      } else {
        mostrarMensagem("❌ Erro ao cadastrar aluno", "erro");
      }

      return;
    }

    // ✅ sucesso
    mostrarMensagem("✅ Aluno cadastrado com sucesso!", "sucesso");

    // limpa campos
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";

    listar();

  } catch (e) {
    console.log("Erro geral:", e);
    mostrarMensagem("❌ Erro de conexão com o servidor", "erro");
  }
}