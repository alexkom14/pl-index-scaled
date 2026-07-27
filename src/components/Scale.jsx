import styles from './Scale.module.css'

export default function Scale({ min, max, height }) {
  const ticks = []
  for (let p = max; p >= min; p -= 5) {
    const pct = ((p - min) / (max - min)) * 100
    const major = p % 10 === 0
    ticks.push({ p, pct, major })
  }

  return (
    <div className={styles.scale} style={{ height }}>
      {ticks.map(({ p, pct, major }) => (
        <div
          key={p}
          className={`${styles.tick} ${major ? styles.major : ''}`}
          style={{ top: `${100 - pct}%` }}
        >
          <span className={styles.num}>{p}</span>
          <span className={styles.mark} />
        </div>
      ))}
    </div>
  )
}
