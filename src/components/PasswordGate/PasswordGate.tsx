import { useState } from 'react'
import styles from './PasswordGate.module.css'

const PASSWORD = import.meta.env.VITE_BY_REQUEST_PASSWORD as string
const STORAGE_KEY = 'portfolio_unlocked'

export default function PasswordGate({ children, company }: { children: React.ReactNode; company?: string }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (unlocked) return <>{children}</>

  return (
    <div className={styles.gate}>
      <div className={styles.card}>
        <span className={styles.lock} aria-hidden>🔒</span>
        <h2 className={styles.title}>{company ?? 'password protected'}</h2>
        <p className={styles.hint}>password required</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            placeholder="password"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            autoFocus
          />
          {error && <p className={styles.error}>try again</p>}
          <button type="submit" className={styles.button}>enter →</button>
        </form>
      </div>
    </div>
  )
}
