const express = require('express')
const path = require('path')
const database = require('./database')

const app = express()

app.use(express.static(path.join(__dirname, '../admin')))

app.use(express.json())

// Busca todos os funcionarios cadastrados no banco de dados
app.get('/funcionarios', (req, res)=>{

    database.query('SELECT * FROM tb_funcionarios', (error, results)=>{

        if(error){

            return res.status(500).json({

                erro: 'Erro ao buscar funcionarios'

            })

        }
            res.json(results)


    })

})

// Busca o funcionario cadastrado no banco de dados pelo id
app.get('/funcionarios/:id', (req, res)=>{

    const {id} = req.params

    database.query(

        'SELECT * FROM tb_funcionarios WHERE id= ?',
        [id],
        (error, results) => {

            if(error){

                return res.status(500).json({

                    erro: 'Erro ao buscar funcionario'

                })

            }

            if(results.length == 0) {

                return res.status(404).json({

                    erro: 'Funcionario nao encontrado'

                })
            }

            res.json(results[0])

        }

    )

})

// Cadastra um novo funcionario no banco de dados
  app.post('/funcionarios', (req, res)=>{

        const{nome, cargo, salario, dtadmissao} = req.body

        database.query('INSERT INTO tb_funcionarios (nome, cargo, salario, dtadmissao) VALUES (?,?,?,?)',
            [nome, cargo, salario, dtadmissao],
            (error, results)=>{
                if(error){

                    return res.status(500).json({

                        erro:'Erro ao cadastrar funcionario'

                    })

                }
                res.status(201).json({

                    mensagem: 'Funcionario cadastrado com sucesso!',
                    id: results.insertId

                })

            }

        )
    })


app.listen(3000,()=>{

console.log('Servidor rodando na porta 3000')

})

