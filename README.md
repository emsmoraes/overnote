# Overnote

> Uma aplicação para criar e descobrir anotações de outros usuários.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão 20.9.0 ou superior do `<NodeJS>`
- Você instalou a versão 2.39 ou superior do `<Git>`
- Você tem uma máquina `<Windows / Linux / Mac>`.
- Você tem o `<Docker>` instalado na sua maquina.

## 🚀 Instalando

Para instalar o Overnote, faça isso:

Linux, macOS e Windows:

## 1. Clone o projeto do GitHub:

```
<git clone https://github.com/emsmoraes/overnote>
```

## 2. Entre na pasta do projeto:

```
<cd Overnote>
```

## 3. Instale as dependências usando o npm:

```
<npm i>
```

## 4. Configure as variáveis de ambiente:

```
Duplique o arquivo <.env.example> e renomeie para <.env>
```

## 5. Crie o container no docker:

```
<docker compose up -d>
```

## 6. Suba as migrações para o banco criado:

Para preparar o banco com as migrações:

```
Rode a migração usando <npx prisma migrate dev>
```

## ☕ Usando

```
para rodar o projeto, use: <npm run dev>
Após rodar o comando, acesse: <http://localhost:3000/login>
```

## ⛓️ Projeto hospedado

[Clique Aqui](https://Overnotev1.vercel.app/)

## Tecnologias Utilizadas

- **Next.js** (v14.2.16)
- **Prisma** (v6.2.1)
- **React** (v18)
- **Tailwind CSS** (v3.4.1)
- **TypeScript** (v5)

# Anotações

- Optei por usar **Server Actions** para realizar as alterações no banco de dados, ao invés da API do Next. Permitindo assim, que as operações de banco de dados sejam realizadas diretamente no servidor, sem a necessidade de criar rotas de API dedicadas. Isso simplifica a arquitetura da aplicação, reduzindo a quantidade de código e a complexidade geral.

- Optei por usar **Zod** juntamente ao **React Hook Form** para fazer a validação na criação e edição de anotações. Isso permite uma validação de dados de forma mais estruturada e tipada, melhorando a confiabilidade do sistema e a experiência do desenvolvedor.

- Optei por usar **Tailwind CSS** junto ao **Shadcn** por ser minha stack principal e por já estarem configurados no escopo inicial do projeto. Facilitando a integração e mantendo a consistência no design.

- Para a edição da anotação ser salva automaticamente, implementei um **debounce** no conteúdo da anotação. A chamada para o backend é feita após um pequeno delay, o que ajuda a priorizar a performance e reduzir as chamadas desnecessárias ao banco de dados e api.

- Tive algumas dificuldades na edição, mas não no salvamento automático. O principal desafio foi o gerenciamento dos status de salvamento, como "salvando", "salvo", "erro" e etc. Nada de outro mundo, mas foi um ponto que exigiu um pouco mais de atenção.  

- Optei por estruturar as rotas utilizando pastas com o nome da entidade e um `index` dentro delas. Porém, em um projeto real que escalaria e utilizasse **Server Actions**, eu organizaria as pastas nomeadas pela entidade e criaria várias actions individuais dentro delas.

- Optei por usar **Promise.all** na página de Dashboard para otimizar o carregamento das informações. Como o Dashboard precisa buscar diversos dados de forma eficiente, utilizei **Promise.all** para executar todas essas requisições simultaneamente. Isso permite que as promessas sejam resolvidas em paralelo, melhorando a performance da página, pois não preciso esperar que cada requisição seja concluída antes de iniciar a próxima.

- Adicionei validações do lado do servidor para impedir que usuários diferentes do criador editem anotações de outros usuários, ou veja anotações privadas de outros.

## 🤝 Criador

Feito Por:

<table>
  <tr>
    <td align="center">
      <a href="#" title="defina o titulo do link">
        <img src="https://avatars.githubusercontent.com/u/85969484?s=400&u=b0e89e575a7cb91fc9f8a69e126a9d7587aa9478&v=4" width="100px;" alt="Foto do Eduardo Meneses no GitHub"/><br>
        <sub>
          <b>Eduardo Meneses</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
