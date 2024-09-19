import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form, Opcoes } from './styles'
import * as Style from '../../styles'
import * as enums from '../../utils/enums/Tarefa'
import { cadastrar } from '../../store/reducers/tarefa'

const Formulario = () => {
  const dispatch = useDispatch()
  const navgate = useNavigate()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()

    dispatch(
      cadastrar({
        titulo,
        prioridade,
        status: enums.Status.PENDENTE,
        descricao
      })
    )
    navgate('/')
  }

  return (
    <Style.MainContainer>
      <Style.Titulo>Nova Tarefa</Style.Titulo>
      <Form onSubmit={cadastrarTarefa}>
        <Style.Campo
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          type="text"
          placeholder="Título"
        />
        <Style.Campo
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />

        <Opcoes>
          <p>Prioridade</p>
          {Object.values(enums.Prioridade).map((prioridade) => (
            <div key={prioridade}>
              <input
                value={prioridade}
                type="radio"
                name="prioridade"
                onChange={(evento) =>
                  setPrioridade(evento.target.value as enums.Prioridade)
                }
                id={prioridade}
                defaultChecked={prioridade === enums.Prioridade.NORMAL}
              />{' '}
              <label htmlFor={prioridade}>{prioridade}</label>
            </div>
          ))}
        </Opcoes>

        <Style.BotaoSalvar>Cadastrar</Style.BotaoSalvar>
      </Form>
    </Style.MainContainer>
  )
}

export default Formulario
