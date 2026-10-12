# 🎬 Portfolio Netflix — Portfólio Profissional

> Site de portfólio profissional com tema inspirado na Netflix, desenvolvido como LAB01 da disciplina DIAW (Desenvolvimento e Integração de Aplicações Web) — PUC Minas.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        Portfólio web interativo com design inspirado na interface da <b>Netflix</b>, incluindo tela de seleção de perfil, navegação fluida entre seções, apresentação bilíngue (PT/EN), linha do tempo de projetos com scroll horizontal, cards de experiências e formulário de contato funcional. Desenvolvido com <b>React 19 + Vite</b>, priorizando <i>responsividade</i>, <i>performance</i> e <i>identidade visual coerente</i>.
      </div>
    </td>
    <td>
      <div align="center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Inspiração Netflix" width="100px"/>
      </div>
    </td>
  </tr>
</table>

---

## 🚧 Status do Projeto

![React](https://img.shields.io/badge/React-19.2.8-007ec6?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3.0-007ec6?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-007ec6?style=for-the-badge&logo=javascript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom-007ec6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📚 Índice
- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
- [Wireframes / Protótipos](#-wireframes--protótipos)
- [Documentações Utilizadas](#-documentações-utilizadas)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 🔗 Links Úteis
* 🌐 **Demo Online:** *Deploy previsto para Sprint 03*
* 📐 **Wireframes (Figma):** [Abrir no Figma](https://www.figma.com/design/35wg3pyp6jvxaeUw2304LJ)
* 📦 **Repositório GitHub:** [github.com/jpommoura](https://github.com/jpommoura)

---

## 📝 Sobre o Projeto

Este projeto é um **portfólio profissional web** desenvolvido como parte do LAB01 da disciplina **DIAW** (Desenvolvimento e Integração de Aplicações Web) do curso de **Engenharia de Software** da **PUC Minas**, ministrada pelo **Prof. João Paulo Carneiro Aramuni**.

O objetivo é apresentar de forma moderna e interativa a trajetória acadêmica, projetos desenvolvidos, habilidades técnicas e formas de contato do desenvolvedor. O diferencial é o **tema inspirado na Netflix**, com tela de seleção de perfil, layout dark com acentos em vermelho (#e50914), e navegação intuitiva.

O site é composto por:
- **Tela de seleção de perfil** — simula a interface de escolha de perfil da Netflix
- **Seção Sobre Mim** — com apresentação bilíngue (Português/Inglês)
- **Seção Projetos** — linha do tempo horizontal dos projetos desenvolvidos
- **Seção Experiências** — cards com formação acadêmica e atividades
- **Seção Contato** — ícones clicáveis + formulário de envio de mensagem

---

## ✨ Funcionalidades Principais

- 🎬 **Tela de Seleção de Perfil:** Interface estilo Netflix com animação hover
- 🌐 **Bilíngue (PT/EN):** Toggle de idioma na seção Sobre Mim
- 📂 **Projetos em Scroll Horizontal:** Row estilo Netflix com setas de navegação
- 🎨 **Design Responsivo:** Adapta-se a desktop, tablet e mobile
- 📧 **Formulário de Contato:** Com campos validados e envio via EmailJS
- 🔗 **Links de Contato:** E-mail, WhatsApp, LinkedIn e GitHub com ícones clicáveis
- 🧭 **Navegação Fluida:** Navbar fixa com scroll suave entre seções
- 🌙 **Identidade Visual Netflix:** Paleta dark (#141414) com acentos vermelhos (#e50914)

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end

| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **React** | 19.2.8 | Biblioteca para construção de interfaces |
| **Vite** | 8.3.0 | Build tool ultrarrápido |
| **React Router DOM** | 7.18.4 | Navegação entre páginas (SPA) |
| **React Icons** | 5.7.0 | Biblioteca de ícones (Font Awesome, etc.) |
| **CSS3** | — | Estilização customizada (sem frameworks CSS) |
| **Google Fonts** | — | Fonte Inter (300–700) |

### ⚙️ Ferramentas

| Ferramenta | Descrição |
| :--- | :--- |
| **Git / GitHub** | Controle de versão e hospedagem do código |
| **Figma** | Wireframes e prototipação |
| **Vercel** | Hospedagem na nuvem (previsto Sprint 03) |
| **EmailJS** | Envio de e-mail direto do front-end |

---

## 🔧 Instalação e Execução

### Pré-requisitos

* **Node.js:** Versão LTS (v18.x ou superior)
* **npm:** Gerenciador de pacotes (vem com o Node.js)

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/jpommoura/portfolio.git
cd portfolio
```

2. **Instale as dependências:**

```bash
npm install
```

### Execução

```bash
npm run dev
```

🎨 O site estará disponível em **http://localhost:5173**

### Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `/dist`.

---

## 📂 Estrutura de Pastas

```
portfolio/
├── public/                    # Arquivos estáticos
├── src/
│   ├── assets/                # Imagens e recursos
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Navbar.jsx         # Barra de navegação fixa
│   │   ├── Navbar.css
│   │   ├── Hero.jsx           # Seção "Sobre Mim" (PT/EN)
│   │   ├── Hero.css
│   │   ├── Projects.jsx       # Linha do tempo de projetos
│   │   ├── Projects.css
│   │   ├── Experiences.jsx    # Cards de experiências
│   │   ├── Experiences.css
│   │   ├── Contact.jsx        # Ícones + formulário de contato
│   │   ├── Contact.css
│   │   ├── Footer.jsx         # Rodapé
│   │   └── Footer.css
│   ├── pages/                 # Páginas da aplicação
│   │   ├── ProfileSelect.jsx  # Tela de seleção de perfil
│   │   ├── ProfileSelect.css
│   │   ├── Home.jsx           # Página principal (Browse)
│   │   └── Home.css
│   ├── App.jsx                # Rotas da aplicação
│   ├── main.jsx               # Entry point (React + Router)
│   └── index.css              # Estilos globais
├── index.html                 # HTML base
├── package.json               # Dependências e scripts
├── vite.config.js             # Configuração do Vite
└── README.md                  # Este arquivo
```

---

## 🖼 Demonstração

### Aplicação Web

| Tela de Seleção de Perfil | Página Principal (Hero) |
| :---: | :---: |
| *Screenshot será adicionado* | *Screenshot será adicionado* |

| Seção Projetos | Seção Contato |
| :---: | :---: |
| *Screenshot será adicionado* | *Screenshot será adicionado* |

> **Nota:** Screenshots e GIFs do projeto em execução serão adicionados na Sprint 03.

---

## 📐 Wireframes / Protótipos

Os wireframes de média fidelidade foram criados no **Figma** e representam a estrutura planejada para cada seção do portfólio.

🔗 **Link do Figma:** [Portfolio Netflix - Wireframes](https://www.figma.com/design/35wg3pyp6jvxaeUw2304LJ)

### Páginas prototipadas:

1. **Seleção de Perfil** — Tela inicial estilo Netflix com perfil clicável
2. **Home (Browse)** — Página completa com:
   - Navbar fixa com links de navegação
   - Hero / Sobre Mim com toggle PT/EN
   - Projetos em row horizontal scrollável
   - Experiências em cards com borda vermelha
   - Contato com ícones + formulário
   - Footer

---

## 📖 Documentações Utilizadas

| Documentação | Link |
| :--- | :--- |
| React | https://react.dev/ |
| Vite | https://vite.dev/ |
| React Router DOM | https://reactrouter.com/ |
| React Icons | https://react-icons.github.io/react-icons/ |
| EmailJS | https://www.emailjs.com/ |
| Google Fonts (Inter) | https://fonts.google.com/specimen/Inter |

---

## 👤 Autor

| Foto | Nome | GitHub | LinkedIn | E-mail |
| :---: | :---: | :---: | :---: | :---: |
| <img src="https://github.com/jpommoura.png" alt="João Pedro" width="80px" style="border-radius:50%"/> | João Pedro Oliveira Monteiro Moura | [@jpommoura](https://github.com/jpommoura) | [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-pedro-oliveira-monteiro-moura-a91800393) | jpommoura@gmail.com |

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
p o r t f o l i o   n e t f l i x   s t y l e  
 