import { useAtomValue } from "jotai"
import { useUser } from "./demo"

function App() {
  const data = useAtomValue(useUser)
  return <h1>Hi {data}</h1>
}

export default App
