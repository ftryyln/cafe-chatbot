import ChatInterface from './components/ChatInterface'

function App() {
  return (
    <div className="app-container h-screen w-full flex justify-center items-center bg-bg">
      <div className="w-full max-w-md h-[90vh] rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white/50">
        <ChatInterface />
      </div>
    </div>
  )
}

export default App
