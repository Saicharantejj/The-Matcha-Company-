import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('CHASKA Root ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5EEDD] text-[#17245B] flex flex-col items-center justify-center p-6 text-center font-sans">
          <span className="text-4xl mb-4">🍿</span>
          <h1 className="text-2xl font-black uppercase font-display mb-2">CHASKA</h1>
          <p className="text-sm font-medium mb-4 max-w-md">Something went wrong while rendering this page.</p>
          <pre className="bg-white/80 p-4 rounded-xl text-xs text-red-600 max-w-lg overflow-x-auto mb-6 border border-[#17245B]/10">
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn bg-[#E2AE35] text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD] px-6 py-3 text-xs font-bold uppercase rounded-full shadow-md"
          >
            RELOAD PAGE
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  )
}


