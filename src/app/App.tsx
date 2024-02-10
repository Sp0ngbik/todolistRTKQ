import { Provider } from 'react-redux'

import { Router } from '@/app/router'
import { store } from '@/service/store'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
