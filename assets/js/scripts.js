//global
// Inicializar Tradutor Google ao scroll
let translatorLoaded = false;
document.addEventListener('scroll', function() {
    if (!translatorLoaded) {
        const script = document.createElement('script');
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
        translatorLoaded = true;
    }
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'pt', includedLanguages: 'en,es,fr,it,de,ko,ru,zh-TW', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL },
        'google_translate_element'
    );
}

// cadastro
// Validação de senha
document.querySelector('.form-cadastro').addEventListener('submit', function(event) {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        event.preventDefault();
    }
});

// Força da senha
document.getElementById('senha').addEventListener('input', function() {
    const strengthMessage = document.getElementById('strength-message');
    const strength = this.value.length;

    if (strength < 6) {
        strengthMessage.textContent = 'Senha fraca';
        strengthMessage.style.color = 'red';
    } else if (strength < 12) {
        strengthMessage.textContent = 'Senha média';
        strengthMessage.style.color = 'orange';
    } else {
        strengthMessage.textContent = 'Senha forte';
        strengthMessage.style.color = 'green';
    }
});

// Scroll suave
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cadastro');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const pesquisa = document.getElementById('pesquisa');
    const limparCamposBtn = document.getElementById('limpar-campos');
    const limparListaBtn = document.getElementById('limpar-lista');

    // Carregar usuários do Local Storage
    function carregarUsuarios() {
        listaUsuarios.innerHTML = '';
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.forEach(usuario => adicionarUsuarioNaLista(usuario));
    }

    // Adicionar usuário na lista
    function adicionarUsuarioNaLista(usuario) {
        const li = document.createElement('li');
        li.textContent = `${usuario.data} - ${usuario.nome} - ${usuario.email}`;
        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'Excluir';
        excluirBtn.addEventListener('click', function() {
            excluirUsuario(usuario);
        });
        li.appendChild(excluirBtn);
        listaUsuarios.appendChild(li);
    }

    // Salvar usuário no Local Storage
    function salvarUsuario(usuario) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Excluir usuário do Local Storage
    function excluirUsuario(usuario) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(u => u.email !== usuario.email);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarUsuarios();
    }

    // Limpar campos do formulário
    function limparCampos() {
        formCadastro.reset();
    }

    // Limpar lista de usuários
    function limparLista() {
        localStorage.removeItem('usuarios');
        carregarUsuarios();
    }

    // Pesquisar usuários
    function pesquisarUsuarios() {
        const termo = pesquisa.value.toLowerCase();
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        listaUsuarios.innerHTML = '';
        usuarios
            .filter(usuario => usuario.nome.toLowerCase().includes(termo) || usuario.email.toLowerCase().includes(termo))
            .forEach(usuario => adicionarUsuarioNaLista(usuario));
    }

    // Evento de submissão do formulário
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const data = new Date().toLocaleString();
        const usuario = { nome, email, data };
        salvarUsuario(usuario);
        adicionarUsuarioNaLista(usuario);
        limparCampos();
    });

    // Evento de clique no botão de limpar campos
    limparCamposBtn.addEventListener('click', limparCampos);

    // Evento de clique no botão de limpar lista
    limparListaBtn.addEventListener('click', limparLista);

    // Evento de input no campo de pesquisa
    pesquisa.addEventListener('input', pesquisarUsuarios);

    // Carregar usuários ao iniciar
    carregarUsuarios();
});
