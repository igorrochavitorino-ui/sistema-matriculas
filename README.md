# 🎓 Sistema de Matrículas Web

Projeto de um sistema simples de gestão escolar utilizando JavaScript puro e integração com o Supabase.  
O objetivo é demonstrar operações CRUD completas consumindo uma API REST sem uso de bibliotecas externas.

---

## 🚀 Tecnologias Utilizadas

- JavaScript (ES6+)
- Fetch API
- Supabase (REST API)
- HTML5 e CSS3

---

## ⚙️ Guia de Configuração

### 📌 1. Criar tabela no Supabase

```sql
create table alunos (
  id bigint generated always as identity primary key,
  nome text not null,
  email text unique not null,
  data_cadastro timestamp with time zone default now()
);

alter table alunos enable row level security;

create policy "Permitir tudo"
on alunos
for all
using (true)
with check (true);
