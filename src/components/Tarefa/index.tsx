import { ChangeEvent, useEffect, useState } from 'react'
import * as Style from './styles'
import { useDispatch } from 'react-redux'
import { remover, editar, alterarStatus } from '../../store/reducers/tarefa'
import TarefaClass from '../../models/tarefa'
import { Botao, BotaoSalvar } from '../../styles'
import * as enums from '../../utils/enums/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(!estaEditando)
    setDescricao(descricaoOriginal)
  }
  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    console.log(evento.target.checked)
    dispatch(alterarStatus({ id, finalizado: evento.target.checked }))
  }

  return (
    <Style.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          checked={status === enums.Status.CONCLUIDA}
          id={titulo}
          onChange={alteraStatusTarefa}
        />
        <Style.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </Style.Titulo>
      </label>

      <Style.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </Style.Tag>
      <Style.Tag parametro="status" status={status}>
        {status}
      </Style.Tag>
      <Style.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <Style.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(editar({ titulo, prioridade, status, descricao, id }))
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <Style.BotaoCancelarRemover onClick={() => cancelarEdicao()}>
              Cancelar
            </Style.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(!estaEditando)}>Editar</Botao>
            <Style.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </Style.BotaoCancelarRemover>
          </>
        )}
      </Style.BarraAcoes>
    </Style.Card>
  )
}

export default Tarefa
