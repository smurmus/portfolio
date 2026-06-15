import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import BoardPage from './pages/BoardPage'

const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const About = lazy(() => import('./pages/About'))
const WorkHistory = lazy(() => import('./pages/WorkHistory'))
const BigHealth = lazy(() => import('./pages/BigHealth'))
const Hearth = lazy(() => import('./pages/Hearth'))

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
    <>
    <Routes>
      <Route path="/" element={<BoardPage />} />
      <Route
        path="/about"
        element={
          <Suspense fallback={<CaseStudyFallback />}>
            <About />
          </Suspense>
        }
      />
      <Route
        path="/work"
        element={
          <Suspense fallback={<CaseStudyFallback />}>
            <WorkHistory />
          </Suspense>
        }
      />
      <Route
        path="/big-health"
        element={
          <Suspense fallback={<CaseStudyFallback />}>
            <BigHealth />
          </Suspense>
        }
      />
      <Route
        path="/hearth"
        element={
          <Suspense fallback={<CaseStudyFallback />}>
            <Hearth />
          </Suspense>
        }
      />
      <Route
        path="/:id"
        element={
          <Suspense fallback={<CaseStudyFallback />}>
            <CaseStudy />
          </Suspense>
        }
      />
    </Routes>
    <Analytics />
    </>
  )
}
