
const url = "http://localhost:3000/";


///     FUNÇÕES DO CADASTRO DE BANNER  ///
// Função para confirmar a exclusão do banner
function confirmDeleteDepoimento(id) {

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/depoimentos/${id}`,config)
        .then(response => {
            console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Depoimento excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
              });

            // Remover o card da lista após a exclusão
            const cardToRemove = document.querySelector(`#card${id}`);
            if (cardToRemove) {
                cardToRemove.remove();
            }
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
}


// Evento quando o botão "Editar" do modal é clicado
document.querySelector('#editDepoimentoModal').addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget; // Botão que acionou o modal
    const depoimentoId = button.getAttribute('data-id'); // ID do banner a ser editado

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer uma solicitação GET para obter os dados do banner
    axios.get(`${url}api/depoimentos/${depoimentoId}`,config)
        .then(response => {
            const depoimentoData = response.data; // Dados do banner

            // Preencher o formulário com os dados do banner
            document.querySelector('#editTitulo').value = depoimentoData.titulo;
            document.querySelector('#editDescricao').value = depoimentoData.descricao;
            document.querySelector('#editOrdem').value = depoimentoData.ordem;
            document.querySelector('#editImagem').value = '';
            // Preencha os outros campos do banner conforme necessário

            // Armazenar o ID do banner no campo oculto
            document.querySelector('#editDepoimentoId').value = depoimentoId;
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
});


    // Função de validação do formulário
    function validateForm(formData) {
        const titulo = formData.get('titulo');
        const descricao = formData.get('descricao');
        const imagem = formData.get('imagem');
        const ordem = formData.get('ordem');

        if (!titulo || !descricao || !imagem || !ordem) {
            // Exibir mensagem de erro para o usuário
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, preencha todos os campos obrigatórios!',
              });
            return false; // Impede o envio do formulário
        }

        if (ordem < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'A ordem deve ser um número maior ou igual a 1!',
              });
            return false;
        }

        // Validar a imagem
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const imageExtension = imagem.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(`.${imageExtension}`)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'A imagem deve ser um arquivo de imagem válido (jpg, jpeg, png, gif)!',
              });
            return false;
        }

        return true; // Todos os campos estão preenchidos corretamente
    }

// Evento quando o botão "Salvar" do modal de edição é clicado
document.querySelector('#saveEditDepoimento').addEventListener('click', function () {
    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editDepoimentoForm'));

    // Obter o ID do banner a ser editado
    const depoimentoId = document.querySelector('#editDepoimentoId').value;



    // Chama a função de validação antes de enviar a solicitação PUT
    if (validateForm(formData)) {

        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho com a autorizção do token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        // Fazer uma solicitação PUT para atualizar o banner
        axios.put(`${url}api/depoimentos/${depoimentoId}`, formData, config)
        .then(response => {
            console.log(response.data);

            // Fechar o modal após a edição
            $('#editDepoimentoModal').modal('hide'); // Fecha o modal

            Swal.fire({
                icon: 'success',
                title: 'Dados gravados com sucesso',
                showConfirmButton: false,
                timer: 1500
              });

            // Atualizar o card correspondente na lista de banners
            const depoimentoId = response.data.id; // Supondo que a resposta contenha o ID atualizado
            const cardElement = document.querySelector(`#card${depoimentoId}`); // Use um seletor único para localizar o card

            // Atualize os elementos HTML dentro do card com os novos dados
            const tituloElement = cardElement.querySelector('.card-title');
            const descricaoElement = cardElement.querySelector('.card-text');
            const imagemElement = cardElement.querySelector('.card-img-top');

            tituloElement.textContent = response.data.titulo;
            descricaoElement.textContent = response.data.descricao;
            imagemElement.src = `${url}img/depoimentos/${response.data.imagem}`;

        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });

    }
});


// Evento quando o botão "Salvar" do modal de criação é clicado
document.querySelector('#saveCreateDepoimento').addEventListener('click', function () {
    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createDepoimentoForm'));

    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer uma solicitação POST para criar um novo banner
    axios.post(`${url}api/depoimentos`, formData, config)
        .then(response => {
            console.log(response.data);
            
            // Fechar o modal após a edição
            $('#createDepoimentoModal').modal('hide'); // Fecha o modal
            
            Swal.fire({
                icon: 'success',
                title: 'Dados gravados com sucesso',
                showConfirmButton: false,
                timer: 1500
              });

            // Criar um novo card com os dados recebidos da API
            const newDepoimentoData = response.data;
            createDepoimentoCard(newfDepoimentoData);

            // Limpar os campos do formulário de criação para o próximo uso
            document.querySelector('#createDepoimentoForm').reset();
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
    }
});

// Função para criar um novo card de banner com os dados fornecidos
function createDepoimentoCard(depoimentoData) {
    // Crie um elemento de coluna do Bootstrap
    const colElement = document.createElement('div');
    colElement.classList.add('col-md-3', 'mb-4');
    colElement.id = `card${depoimentoData.id}`;

    // Crie um card com base nos dados do banner
    colElement.innerHTML = `
        <div class="card h-100">
            <img src="${url}img/depoimentos/${depoimentoData.imagem}" class="card-img-top" alt="${depoimentoData.titulo}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${depoimentoData.titulo}</h5>
                <p class="card-text">${depoimentoData.descricao}</p>
                <div class="d-flex mt-auto justify-content-between">
                    <!-- Link de Edição -->
                    <button class="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#editDepoimentoModal" data-id="${depoimentoData.id}"><i class="bi bi-pencil"></i> Editar</button>

                    <!-- Link de Exclusão - Botão para acionar o modal -->
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal${depoimentoData.id}"><i class="bi bi-trash3"></i> Excluir</button>

                </div>
            </div>
        </div>
        <!-- Modal de Confirmação de Exclusão -->

        <div class="modal fade" id="confirmDeleteModal${depoimentoData.id}" tabindex="-1"
            aria-labelledby="confirmDeleteModalLabel${depoimentoData.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="confirmDeleteModalLabel${depoimentoData.id}">Exclusão</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Tem certeza que deseja excluir o depoimento: <strong>${depoimentoData.titulo}</strong>?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i> Cancelar</button>
                        <!-- Botão de Confirmação - Chama a função JavaScript para excluir -->
                        <button type="button" class="btn btn-danger" onclick="confirmDeleteDepoimento(${depoimentoData.id})"><i class="bi bi-check-circle"></i> Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adicione o novo card à lista de banners
    const depoimentoListElement = document.querySelector('#card-list');
    depoimentoListElement.appendChild(colElement);
}


// Evento quando o formulário de pesquisa é enviado
document.querySelector('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = document.querySelector('#valorPesquisa').value;

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };    

    // Fazer uma solicitação GET para buscar banners com base no título
    axios.get(`${url}api/depoimentos/search?titulo=${valorPesquisa}`,config)
        .then(response => {
            console.log(response.data);
            
            // Limpar a lista de banners existente
            const depoimentoListElement = document.querySelector('#card-list');
            depoimentoListElement.innerHTML = '';

            // Criar novos cards de banner com os dados recebidos da API
            response.data.forEach(depoimentoData => {
                createDepoimentoCard(depoimentoData);
            });
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
});