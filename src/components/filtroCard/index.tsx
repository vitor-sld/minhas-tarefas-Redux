import * as Style from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { useDispatch, useSelector } from 'react-redux'
import { alterarFiltro } from '../../store/reducers/filtro'
import { RootReducer } from '../../store'

export type Props = {
  legenda?:
    | 'pendentes'
    | 'concluidas'
    | 'urgentes'
    | 'importantes'
    | 'normal'
    | 'todas'
  criterio: 'prioridade' | 'status' | 'todas'
  valor?: enums.Prioridade | enums.Status
}

const FiltroCard = ({ legenda, criterio, valor }: Props) => {
  const dispatch = useDispatch()
  const { filtro, tarefas } = useSelector((state: RootReducer) => state)

  const verificaEstaAtivo = () => {
    const mesmoCriterio = filtro.criterio === criterio
    const mesmoValor = filtro.valor === valor

    return mesmoCriterio && mesmoValor
  }

  const ativo = verificaEstaAtivo()

  const contarTarefas = () => {
    if (criterio === 'todas') return tarefas.itens.length
    if (criterio === 'prioridade') {
      return tarefas.itens.filter((item) => item.prioridade === valor).length
    }
    if (criterio === 'status') {
      return tarefas.itens.filter((item) => item.status === valor).length
    }
  }

  const contador = contarTarefas()

  const filtrar = () => {
    dispatch(
      alterarFiltro({
        criterio,
        valor
      })
    )
  }
  return (
    <Style.Card ativo={ativo} onClick={filtrar}>
      <Style.Label>{contador}</Style.Label>
      <Style.Contador>{legenda}</Style.Contador>
    </Style.Card>
  )
}
export default FiltroCard
