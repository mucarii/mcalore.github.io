document.addEventListener('DOMContentLoaded', () => {
    // Verificar se estamos na página admin
    if (!document.getElementById('form-cadastro')) {
        return; // Se não estiver na página admin, não executa o código
    }

    const form = document.getElementById('form-cadastro');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const inputPesquisa = document.getElementById('pesquisa');
    const btnLimparCampos = document.getElementById('limpar-campos');
    const btnLimparLista = document.getElementById('limpar-lista');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');

    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log('Usuários carregados:', usuarios);
        atualizarListaUsuarios(usuarios);
    }

    function atualizarListaUsuarios(usuarios) {
        if (!listaUsuarios) return;
        
        listaUsuarios.innerHTML = '';

        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = '<li>Nenhum usuário cadastrado</li>';
            return;
        }

        usuarios.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.className = 'usuario-item';
            li.innerHTML = `
                <div class="usuario-info">
                    <p><strong>Data:</strong> ${usuario.data}</p>
                    <p><strong>Nome:</strong> ${usuario.nome}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                </div>
                <button onclick="excluirUsuario(${index})" class="btn-excluir">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            `;
            listaUsuarios.appendChild(li);
        });
    }

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

    // Função global para excluir usuário
    window.excluirUsuario = function(index) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarUsuarios();
    };

    // Event Listeners
    if (form) {
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
    }

    if (btnLimparCampos) {
        btnLimparCampos.addEventListener('click', () => {
            inputNome.value = '';
            inputEmail.value = '';
        });
    }

    if (btnLimparLista) {
        btnLimparLista.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar toda a lista?')) {
                localStorage.removeItem('usuarios');
                carregarUsuarios();
            }
        });
    }

    if (inputPesquisa) {
        inputPesquisa.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuariosFiltrados = usuarios.filter(usuario => 
                usuario.nome.toLowerCase().includes(termo) ||
                usuario.email.toLowerCase().includes(termo)
            );
            atualizarListaUsuarios(usuariosFiltrados);
        });
    }

    // Carregar usuários ao iniciar
    carregarUsuarios();
}); 