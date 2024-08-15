const url = "http://localhost:3000/";

///     FUNÇÕES DO CADASTRO DE NOTICIAS  ///
// Função para confirmar a exclusão do noticia
function confirmDeleteFaq(id) {
    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/faqs/${id}`, config)
        .then(response => {
            console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Faq excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Após o tempo definido (1500 ms), redirecione para a página desejada
                window.location.href = `../faqs/`;
            });
        })
        .catch(error => {
            console.error('Erro ao excluir faq:', error);
            // Lida com erros, se necessário
        });
}

// Função de validação do formulário
function validateForm(formData) {
    const titulo = formData.get('titulo');
    const resposta = formData.get('resposta');
    const ordem = formData.get('ordem');

    if (!titulo || !resposta || !ordem) {
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

    return true; // Todos os campos estão preenchidos corretamente
}

// Evento quando o botão "Salvar" do formulário de edição é clicado
function UpdateFaqClick(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editFaqForm'));

    // Obter o ID do trabalho a ser editado
    const faqId = document.querySelector('#editFaqId').value;

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

        // Fazer uma solicitação PUT para atualizar o trabalho
        axios.put(`${url}api/faqs/${faqId}`, formData, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Faq alterado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../faqs/`;
                });
            })
            .catch(error => {
                console.error('Erro ao atualizar faq:', error);
                // Lida com erros, se necessário
            });
    }
}

// Evento quando o botão "Salvar" do formulário de criação é clicado
function CreateFaqClick(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createFaqForm'));

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

        // Fazer uma solicitação POST para criar o trabalho
        axios.post(`${url}api/faqs/`, formData, config)  // Corrigido de 'trarabalhos' para 'trabalhos'
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Faq criado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../faqs/`;
                });
            })
            .catch(error => {
                console.error('Erro ao criar faq:', error);
                // Lida com erros, se necessário
            });
    }
}
