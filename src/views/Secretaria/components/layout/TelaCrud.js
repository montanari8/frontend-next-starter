import styles from './TelaCrud.module.scss'
import React, { useState, useEffect } from 'react';



//Layout
import CardsOficina from './CardsOficina';
import CadastroOficinaModal from './CadastroOficinaModal'

/*
    Props
        titulo      = título da página
        abrir       = tela que deve ser aberta
        fechar      = tela que deve ser fechada
        placeholder = texto dentro do input
    

*/

function TelaCrud({ titulo, abrir, fechar, placeholder }) {

    //Salvar o Projeto
    const [projects, setProjects] = useState([])

    //palavra de busca
    const [palavra, setPalavra] = useState()

    //mensagem
    const [mensagem, setMensagem] = useState(false)

    // Fechar a atual tela e abrir a tela inicial
    function abrirFechar() {
        abrir(true) // abri a tela inicio
        fechar(false) // fecha a tela atual
    }

    //Carregamento Inicial ao abrir o componente
    useEffect(() => {

        fetch('https://sexta-e-nois-dbjson.vercel.app/projetos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(

            resp => resp.json()


        ).then(

            data => {

                console.log(data)

                setProjects(data)
            }

        ).catch(

            err => console.log(err)

        )
    }, [])

    //recarrega página
    function recarregaPagina() {
        fetch('https://sexta-e-nois-dbjson.vercel.app/projetos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(

            resp => resp.json()


        ).then(

            data => {

                console.log(data)
                setProjects(data)
            }

        ).catch(

            err => console.log(err)

        )
    }


    //Carrega as oficinas pesquisadas    
    function carregaOficinas(palavra) {
        let oficina = RegExp(`${palavra}`, 'gi')
        fetch('https://sexta-e-nois-dbjson.vercel.app/projetos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            resp => resp.json()
        ).then(
            data => {

                function busca(projeto) {
                    let teste = projeto.search(oficina) > -1 ? true : false
                    //console.log(teste) verdadeiro ou falso

                    if (teste) {
                        setMensagem(false)
                        return teste
                    } else {
                        setMensagem(true)
                        return teste

                    }
                }
                setProjects(data.filter((project) =>
                    busca(project.nome),
                    setMensagem(false)
                ))
            },
        ).catch(
            err => console.log(err)
        )
    }
    

    /*
    function carregaOficinas(expressao) {
        let oficina = RegExp(`${expressao}`, 'gi')


        function busca(projeto) {
            let teste = projeto.search(oficina) > -1 ? true : false
            //console.log(teste) verdadeiro ou falso

            if (teste) {
                setMensagem(false)
                return teste
            } else {
                setMensagem(true)
                return teste

            }
        }
        setProjects(data.filter((project) =>
            busca(project.nome),
            setMensagem(false)
        ))

    }
    */

    //não deixa a págian dar reload
    const submit = (e) => {
        e.preventDefault()
        carregaOficinas(palavra)

    }

    //Pega valor dos inputs do formulário
    function buscaInput(e) {
        let texto = e.target.value
        //console.log(texto)
        carregaOficinas(texto)
        setPalavra(texto)
    }

    //Cadastrar nova oficina
    function cadastrarOficina(oficina) {

        fetch("https://sexta-e-nois-dbjson.vercel.app/projetos",
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(oficina) // vai receber a nova oficina
            })
            .then(

                (resp) => resp.json()
            )
            .then(
                (data) => { console.log(data) },
                // adicionar mensagem
                carregaOficinas(oficina.nome),
                timeOut()
            )
            .catch(
                (err) => console.log(err)
            )
    }

    //Remover oficina pelo ID
    function removerOficinaID(id) {
        fetch(`https://sexta-e-nois-dbjson.vercel.app/projetos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(

            timeOut(),
            resp => resp.json()
        ).then(
            data => {

            }
        ).catch(
            err => console.log(err)

        )
    }

    //Limpa variaveis e atualiza as oficinas
    function timeOut() {
        setTimeout(() => {
            setPalavra(''),
            setProjects({}),
            recarregaPagina()
        }, "1100")
    }

    //atualizar nova oficina
    function atualizarOficina(oficina) {

        fetch(`https://sexta-e-nois-dbjson.vercel.app/projetos/${oficina.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(oficina) // vai receber a nova oficina
            })
            .then(

                (resp) => resp.json()
            )
            .then(
                (data) => { console.log(data) },
                // adicionar mensagem
                carregaOficinas(oficina.nome),
                timeOut()
            )
            .catch(
                (err) => console.log(err)
            )
    }




    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h1>{titulo}</h1>
                <div>
                    <button onClick={abrirFechar} className="btn btn-dark">Voltar</button>
                </div>
            </div>
            <hr />

            <div className={styles.formDiv}>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        name='nome'
                        placeholder={placeholder}
                        onChange={buscaInput}
                    />

                    <button
                        className='btn btn-primary'
                        onClick={carregaOficinas}
                    >Consultar
                    </button>


                </form>
                <div className={styles.btncadastro}>

                    <CadastroOficinaModal

                        textbtn={'Cadastrar'}
                        titulo={'Cadastrar Oficina'}
                        metodoCadastrarOfinca={cadastrarOficina}

                    />

                </div>
            </div>

            <section className={styles.mainSection}>
                {projects.length <= 0 && mensagem === true && (
                    <p>Não há <s>{titulo}</s> referente ao termo digitado!</p>
                )}
                {projects.length > 0 &&
                    projects.map((project) => (


                        <CardsOficina

                            id={project.id}

                            titulo={project.nome}
                            paragrafo={project.requisitos}
                            link={project.id}
                            pesquisa={removerOficinaID}
                            key={project.id}
                            oficina={project}
                            metodoAtualizaOficina={atualizarOficina}


                        />


                    ))

                }
                {projects.length <= 0 && mensagem !== true && (
                    <p>Nenhuma oficina foi cadastrada!</p>
                )}


            </section>


        </div>

    )


}

export default TelaCrud