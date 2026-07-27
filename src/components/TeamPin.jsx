import { useState } from 'react'
import { getZone } from '../utils/zones'
import styles from './TeamPin.module.css'

export default function TeamPin({ team, side, top }) {
  const [imgError, setImgError] = useState(false)
  const { color, label } = getZone(team.rank)

  return (
    <div
      className={`${styles.pin} ${styles[side]}`}
      style={{ top }}
    >
      {side === 'left' && (
        <>
          {label && <span className={styles.zone} style={{ color }}>{label}</span>}
          <span className={styles.pts}>{team.pts}</span>
        </>
      )}

      <div className={styles.logoWrap} style={{ borderColor: color }}>
        {!imgError ? (
          <img
            src={team.logo}
            alt={team.name}
            className={styles.logo}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.fallback}>{team.name.slice(0, 3).toUpperCase()}</span>
        )}
      </div>

      {side === 'right' && (
        <>
          <span className={styles.pts}>{team.pts}</span>
          {label && <span className={styles.zone} style={{ color }}>{label}</span>}
        </>
      )}

      <div className={styles.tooltip}>
        <span className={styles.tooltipName}>{team.name}</span>
        <span className={styles.tooltipStats}>{team.won}W {team.draw}D {team.lost}L</span>
      </div>
    </div>
  )
}
