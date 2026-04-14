const SUPABASE_URL = "https://obwnwcfzzpyhqljaszor.supabase.co/rest/v1/alunos";
const API_KEY = "sb_publishable_eY2pBB5brdVmp0l1qgEFig_7gX7_GU4";

const config = {
  headers: {
    "Content-Type": "application/json",
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    Prefer: "return=representation",
  },
};

function mostrarMensagem(texto, tipo) {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.className = tipo;

  setTimeout(() => (msg.textContent = ""), 3000);
}

async function listar() {
  const res = await fetch(`${SUPABASE_URL}?select=*`, {
    headers: config.headers,
  });

  const data = await res.json();

  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  data.forEach((aluno) => {
    tabela.innerHTML += `
      <tr>
        <td>${aluno.id}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>
          <button onclick="editar(${aluno.id}, '${aluno.nome}')">Editar</button>
          <button onclick="deletar(${aluno.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

async function cadastrar() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) {
    mostrarMensagem("⚠️ Preencha os campos!", "erro");
    return;
  }

  try {
    const res = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify([{ nome, email }]),
    });

    if (!res.ok) throw new Error();

    mostrarMensagem("✅ Cadastrado com sucesso!", "sucesso");

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";

    listar();
  } catch {
    mostrarMensagem("❌ Erro ao cadastrar", "erro");
  }
}

function editar(id, nomeAtual) {
  const novoNome = prompt("Novo nome:", nomeAtual);
  if (!novoNome) return;

  fetch(`${SUPABASE_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ nome: novoNome }),
  }).then(() => {
    mostrarMensagem("✏️ Atualizado!", "sucesso");
    listar();
  });
}

async function deletar(id) {
  await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
    method: "DELETE",
    headers: config.headers,
  });

  mostrarMensagem("🗑️ Deletado!", "sucesso");
  listar();
}

listar();
