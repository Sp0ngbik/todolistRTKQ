import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Router } from '@/app/router'
import { store } from '@/service/store'

import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer autoClose={2000} hideProgressBar position={'bottom-center'} theme={'dark'} />
    </Provider>
  )
}

export default App
