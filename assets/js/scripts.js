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

// Seleção dos elementos do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const inputPesquisa = document.getElementById('pesquisa');
    const btnLimparCampos = document.getElementById('limpar-campos');
    const btnLimparLista = document.getElementById('limpar-lista');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');

    // Função para carregar usuários do localStorage
    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log('Usuários carregados:', usuarios);
        atualizarListaUsuarios(usuarios);
    }

    // Função para atualizar a lista de usuários na tela
    function atualizarListaUsuarios(usuarios) {
        listaUsuarios.innerHTML = '';

        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = '<li>Nenhum usuário cadastrado</li>';
            return;
        }

        usuarios.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="usuario-item">
                    <div class="usuario-info">
                        <p><strong>Data:</strong> ${usuario.data}</p>
                        <p><strong>Nome:</strong> ${usuario.nome}</p>
                        <p><strong>Email:</strong> ${usuario.email}</p>
                    </div>
                    <button onclick="excluirUsuario(${index})" class="btn-excluir">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            `;
            listaUsuarios.appendChild(li);
        });
    }

    // Função para adicionar novo usuário
    function adicionarUsuario(nome, email) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const novoUsuario = {
            nome: nome,
            email: email,
            data: new Date().toLocaleString('pt-BR')
        };
        
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log('Usuário adicionado:', novoUsuario);
        carregarUsuarios();
    }

    // Função para excluir usuário específico
    window.excluirUsuario = function(index) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarUsuarios();
    }

    // Event Listeners
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Formulário submetido');
        
        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        
        if (!nome || !email) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        adicionarUsuario(nome, email);
        form.reset();
    });

    btnLimparCampos.addEventListener('click', () => {
        inputNome.value = '';
        inputEmail.value = '';
    });

    btnLimparLista.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar toda a lista?')) {
            localStorage.removeItem('usuarios');
            carregarUsuarios();
        }
    });

    inputPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuariosFiltrados = usuarios.filter(usuario => 
            usuario.nome.toLowerCase().includes(termo) ||
            usuario.email.toLowerCase().includes(termo)
        );
        atualizarListaUsuarios(usuariosFiltrados);
    });

    // Carregar usuários ao iniciar
    carregarUsuarios();
});
