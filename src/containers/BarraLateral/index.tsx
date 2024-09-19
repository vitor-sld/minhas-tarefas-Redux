import { useDispatch } from 'react-redux'
import { alterarTermo } from '../../store/reducers/filtro'
import { useNavigate } from 'react-router-dom'

import FiltroCard from '../../components/filtroCard'
import * as Styles from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { Botao, Campo } from '../../styles'

type Props = {
  mostrarFiltros?: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Styles.Aside>
      {mostrarFiltros ? (
        <div>
          <Campo
            type="text"
            placeholder="Buscar"
            onChange={(evento) => dispatch(alterarTermo(evento.target.value))}
          />
          <Styles.Filtros>
            <FiltroCard
              valor={enums.Status.PENDENTE}
              criterio="status"
              legenda="pendentes"
            />
            <FiltroCard
              valor={enums.Status.CONCLUIDA}
              criterio="status"
              legenda="concluidas"
            />
            <FiltroCard
              valor={enums.Prioridade.URGENTE}
              criterio="prioridade"
              legenda="urgentes"
            />
            <FiltroCard
              valor={enums.Prioridade.IMPORTANTE}
              criterio="prioridade"
              legenda="importantes"
            />
            <FiltroCard
              valor={enums.Prioridade.NORMAL}
              criterio="prioridade"
              legenda="normal"
            />
            <FiltroCard criterio="todas" legenda="todas" />
          </Styles.Filtros>
        </div>
      ) : (
        <Botao onClick={() => navigate('/')} type="button">
          Voltar a lista de tarefas
        </Botao>
      )}
    </Styles.Aside>
  )
}

export default BarraLateral
