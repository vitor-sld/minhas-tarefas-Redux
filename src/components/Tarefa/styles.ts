import styled from 'styled-components'
import variaveis from '../../styles/variaveis'
import * as enums from '../../utils/enums/Tarefa'
import { Botao } from '../../styles'

export type TagProps = {
  prioridade?: enums.Prioridade
  status?: enums.Status
  parametro: 'status' | 'prioridade'
}

function retornaCorDeFundo(props: TagProps): string {
  if (props.parametro === 'status') {
    switch (props.status) {
      case enums.Status.PENDENTE:
        return variaveis.amarelo
      case enums.Status.CONCLUIDA:
        return variaveis.verde
      default:
        return '#ccc'
    }
  } else {
    switch (props.prioridade) {
      case enums.Prioridade.URGENTE:
        return variaveis.vermelho
      case enums.Prioridade.IMPORTANTE:
        return variaveis.amarelo2
      default:
        return '#ccc'
    }
  }
}

export const Card = styled.div`
  background-color: #fcfcfc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 16px;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
`

export const Titulo = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`

export const Tag = styled.span<TagProps>`
  display: inline-block;
  padding: 4px 8px;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  border-radius: 8px;
  background-color: ${(props) => retornaCorDeFundo(props)};
  margin: 0 16px 16px 0;
`

export const Descricao = styled.textarea`
  display: block;
  width: 100%;
  color: #8b8b8b;
  line-height: 24px;
  font-size: 14px;
  font-family: 'Roboto Mono', monospace;
  margin-bottom: 16px;
  resize: none;
  border: none;
  background-color: transparent;
`

export const BarraAcoes = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 16px;
`
export const BotaoCancelarRemover = styled(Botao)`
  background-color: ${variaveis.vermelho};
`
