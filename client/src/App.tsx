import './App.css'
import Login from "./components/layouts/forms/login"
import Dashboard from "./components/layouts/dashboard"
import Container from './components/elements/container'
import useLocalStorage from "./hooks/useLocalStorage"

function App() {

  const [id, setId] = useLocalStorage<string | null>("id", null);

  return (
    <div className="App">
      { id ? 
      <Dashboard id={id} />:
      <Container.Flex variant='center-vertical' style = {{ height: "100vh", marginInline: "2em"}}>
        <Login setId={setId} />
      </Container.Flex>
      }
    </div>
  )
}

export default App
