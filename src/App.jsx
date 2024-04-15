import './css/App.css'
import Navigation from './components/Navigation'
import Switch from './components/Switch'
import Footer from './components/Footer'
import SearchContextProvider from './Context'

function App() {

  return (
    <SearchContextProvider>
      <Navigation />
      <Switch />
      <Footer />
    </SearchContextProvider>
  )
}

export default App
