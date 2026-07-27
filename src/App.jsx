import { useStandings } from './hooks/useStandings'
import Index from './components/Index'
import Legend from './components/Legend'
import styles from './App.module.css'

export default function App() {
  const { teams, loading, error } = useStandings()

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>PL INDEX</h1>
        <p className={styles.season}>2024 / 25</p>
      </header>

      <Legend />

      {loading && (
        <div className={styles.state}>
          <span className={styles.dot} />
          <span>fetching standings</span>
        </div>
      )}

      {error && (
        <div className={styles.state}>
          <span className={styles.err}>failed to load — {error}</span>
        </div>
      )}

      {!loading && !error && <Index teams={teams} />}

      <footer className={styles.footer}>
        data via football-data.org
      </footer>
    </div>
  )
}
