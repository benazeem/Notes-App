import './App.css'
import NotesPage from './pages/NotesPage'
import { Provider } from 'react-redux'
import {store} from './store/rtkStore'
import { ToastContainer } from 'react-toastify';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={store}>
      <div className='overflow-hidden h-full w-full'>
      <ToastContainer position="top-left" autoClose={5000} />
     <NotesPage />
     </div>
    </Provider>
    </>
  )
}

export default App
