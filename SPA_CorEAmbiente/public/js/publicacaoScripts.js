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

// Function to validate file extensions
function validateFileExtension(file) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
}

// Function to validate the form
function validateForm(formData, isEdit = false) {
    const titulo = formData.get('titulo');
    const conteudo = formData.get('conteudo');
    const imagem_principal = formData.get('imagem_principal');

    if (!titulo.trim() || !conteudo.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false;
    }

    if (!isEdit || (imagem_principal && imagem_principal.size)) {
        if (!imagem_principal.size) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, selecione uma imagem principal!',
            });
            return false;
        }

        if (!validateFileExtension(imagem_principal)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'A imagem principal deve ser um arquivo de imagem válido (jpg, jpeg, png, gif)!',
            });
            return false;
        }
    }

    const imagensInternas = formData.getAll('imagens_internas');
    for (let i = 0; i < imagensInternas.length; i++) {
        if (!validateFileExtension(imagensInternas[i])) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Uma das imagens internas não é válida. Certifique-se de que todos os arquivos são jpg, jpeg, png, ou gif.',
            });
            return false;
        }
    }

    return true;
}

// Function to handle form submission
function CreatePublicacaoClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#createPublicacaoForm'));

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        axios.post(`${url}api/publicacoes/`, formData, config)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Publicação criada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.href = `../publicacoes/`;
                });
            })
            .catch(error => {
                console.error('Erro ao criar publicação:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao criar a publicação. Por favor, tente novamente.',
                });
            });
    }
}

// Evento quando o botão "Salvar" do formulário de edição é clicado
function UpdatePublicacaoClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#editPublicacaoForm'));
    const publicacaoId = document.querySelector('#editPublicacaoId').value;

    if (validateForm(formData, true)) { // Passando "true" para indicar que é uma edição
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
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
