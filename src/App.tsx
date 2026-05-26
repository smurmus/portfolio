import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import BoardPage from './pages/BoardPage'

const CaseStudy = lazy(() => import('./pages/CaseStudy'))

function CaseStudyFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-board-bg)',
      fontFamily: 'var(--font-handwriting)',
      fontSize: 16,
      color: 'var(--color-text-secondary)',
    }}>
      loading...
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardPage />} />
      <Route
        path="/case-study/:id"
        element={
          <Suspense fallback={<CaseStudyFallback />}>
            <CaseStudy />
          </Suspense>
        }
      />
    </Routes>
  )
}
