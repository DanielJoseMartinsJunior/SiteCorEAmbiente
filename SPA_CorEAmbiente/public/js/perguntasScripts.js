const url = "http://localhost:3000/";


///     FUNÇÕES DO CADASTRO DE NOTICIAS  ///
// Função para confirmar a exclusão do noticia
function confirmDeletePerguntas(id) {
    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/perguntas/${id}`, config)
        .then(response => {
            console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Pergunta excluída com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Após o tempo definido (1500 ms), redirecione para a página desejada
                window.location.href = `../perguntas/`;
            });
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
}



// Função de validação do formulário
function validateForm(formData) {
    const titulo = formData.get('titulo');
    const resposta = formData.get('resposta');
    const ordem = formData.get('ordem');

    console.log({ titulo, resposta, ordem });  // Log para verificar os valores

    if (!titulo || !resposta || !ordem) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false;
    }
    return true;
}


// Evento quando o botão "Salvar" do formulário de edição é clicado
function UpdatePerguntasClick(event) {

    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editPerguntasForm'));

    // Obter o ID do noticia a ser editado
    const perguntasId = document.querySelector('#editPerguntasId').value;

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
        // Fazer uma solicitação PUT para atualizar o noticia
        axios.put(`${url}api/perguntas/${perguntasId}`, formData, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Pergunta alterada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../perguntas/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });

    }
};


// Evento quando o botão "Salvar" do formulário de edição é clicado
function CreatePerguntasClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#createPerguntasForm'));

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        console.log([...formData]); // Log para verificar o conteúdo de formData

        axios.post(`${url}api/perguntas/`, formData, config)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Pergunta criada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = `../perguntas/`;
                });
            })
            .catch(error => {
                console.error(error);
                console.error('Erro ao criar pergunta:', error.response ? error.response.data : error.message);
            });
    }
}