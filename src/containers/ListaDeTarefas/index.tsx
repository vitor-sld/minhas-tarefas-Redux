import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import Tarefa from '../../components/Tarefa'
import * as Style from '../../styles/index'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens
    if (termo != undefined) {
      tarefasFiltradas = itens.filter(
        (item) => item.titulo.toLocaleLowerCase().search(termo) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (itens) => itens.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (itens) => itens.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e  "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem =
        `${quantidade} tarefa(s) encontrada(s) como: 'todas' ` + complementacao
    } else {
      mensagem =
        `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio}=${valor}`}" ` +
        complementacao
    }
    return mensagem
  }

  const tarefas = filtraTarefas()
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <Style.MainContainer>
      <Style.Titulo as="p"> {mensagem}</Style.Titulo>
      <ul>
        {tarefas.map((item) => {
          return (
            <li key={item.titulo}>
              <Tarefa
                id={item.id}
                titulo={item.titulo}
                descricao={item.descricao}
                prioridade={item.prioridade}
                status={item.status}
              />
            </li>
          )
        })}
      </ul>
    </Style.MainContainer>
  )
}

export default ListaDeTarefas
