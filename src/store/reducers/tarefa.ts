import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/tarefa'
import * as enums from '../../utils/enums/Tarefa'

type tarefasState = {
  itens: Tarefa[]
}
const initialState: tarefasState = {
  itens: [
    {
      titulo: 'Estudar Typescript',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE,
      descricao: 'Ver aula 3 da EBAC',
      id: 1
    },
    {
      titulo: 'Pagar a conta de internet',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.CONCLUIDA,
      descricao: 'Baixar a fatura no Gmail',
      id: 2
    },
    {
      titulo: 'Ir para a Academia',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE,
      descricao: 'Fazer treino B',
      id: 3
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...(state.itens = state.itens.filter(
          (tarefa) => tarefa.id !== action.payload
        ))
      ]
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLocaleLowerCase() ===
          action.payload.titulo.toLocaleLowerCase()
      )

      if (tarefaJaExiste) {
        alert('Esta tarefa Já existe')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]
        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alterarStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})
export const { remover, editar, cadastrar, alterarStatus } =
  tarefasSlice.actions
export default tarefasSlice.reducer
