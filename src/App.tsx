import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import EstiloGlobal, { Container } from './styles'
import store from './store'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>Página não encontrada</h1>
  },
  {
    path: 'cadastrar',
    element: <Cadastro />
  }
])

function App() {
  return (
    <>
      <Provider store={store}>
        <EstiloGlobal />
        <Container>
          <RouterProvider router={rotas} />
        </Container>
      </Provider>
    </>
  )
}

export default App
