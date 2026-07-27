import styles from './Legend.module.css'

const zones = [
  { label: 'Champions League', color: 'var(--ucl)' },
  { label: 'Europa League',    color: 'var(--uel)' },
  { label: 'Conf. League',     color: 'var(--uecl)' },
  { label: 'Relegation',       color: 'var(--rel)' },
]

export default function Legend() {
  return (
    <div className={styles.legend}>
      {zones.map(z => (
        <span key={z.label} className={styles.item}>
          <span className={styles.dot} style={{ background: z.color }} />
          {z.label}
        </span>
      ))}
    </div>
  )
}
