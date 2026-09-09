const tabela = document.querySelector('#tabelaFuncionarios')
const btnCarregar = document.querySelector('#btnCarregar')

function carregarFuncionarios() {

    tabela.innerHTML = ''

    fetch('http://localhost:3000/funcionarios')

        .then(response => response.json())

        .then(funcionarios => {

            funcionarios.forEach(funcionario => {

                const linha = document.createElement('tr')

                linha.innerHTML = `
                    <td>${funcionario.id}</td>
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.cargo}</td>
                    <td>${funcionario.salario}</td>
                    <td>${funcionario.dtadmissao}</td>
                `

                tabela.appendChild(linha)
            })
        })

        .catch(error => {
            console.log('Erro:', error)
        })
}

btnCarregar.addEventListener('click', carregarFuncionarios)