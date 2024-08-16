const url = "http://localhost:3000/";

///     FUNÇÕES DO CADASTRO DE PUBLICAÇÕES  ///
// Função para confirmar a exclusão da publicação
function confirmDeletePublicacao(id) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    axios.delete(`${url}api/publicacoes/${id}`, config)
        .then(response => {
            console.log(response.data);

            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Publicação excluída com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = `../publicacoes/`;
            });
        })
        .catch(error => {
            console.error(error);
            // Handle errors if necessary
        });
}

// Função de validação do formulário
function validateForm(formData) {
    const titulo = formData.get('titulo');
    const conteudo = formData.get('conteudo');
    const imagem_principal = formData.get('imagem_principal');

    if (!titulo || !conteudo || !imagem_principal) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false;
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const imageExtension = imagem_principal.name.split('.').pop().toLowerCase();
   /*  if (!allowedExtensions.includes(`.${imageExtension}`)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A imagem deve ser um arquivo de imagem válido (jpg, jpeg, png, gif)!',
        });
        return false;
    } */

    return true;
}

// Evento quando o botão "Salvar" do formulário de edição é clicado
function UpdatePublicacaoClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#editPublicacaoForm'));
    const publicacaoId = document.querySelector('#editPublicacaoId').value;

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        axios.put(`${url}api/publicacoes/${publicacaoId}`, formData, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Publicação alterada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = `../publicacoes/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Handle errors if necessary
            });
    }
}

// Evento quando o botão "Salvar" do formulário de criação é clicado
function CreatePublicacaoClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#createPublicacaoForm'));

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        axios.post(`${url}api/publicacoes/`, formData, config)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Publicação criada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = `../publicacoes/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Handle errors if necessary
            });
    }
}
