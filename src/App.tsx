import './App.css'

import Desktop from './components/Desktop'
import DosPlayer from './components/apps/DosPlayer'

function App() {
  return (
    //<Desktop />
    <DosPlayer bundleUrl="/digger.jsdos" />
  )
}

export default App
