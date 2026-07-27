import { useMemo } from 'react'
import Scale from './Scale'
import TeamPin from './TeamPin'
import styles from './Index.module.css'

const CHART_H = 1000
const MIN_PTS = 15
const MAX_PTS = 85
const PIN_H = 32

function toTop(pts) {
  return ((1 - (pts - MIN_PTS) / (MAX_PTS - MIN_PTS)) * CHART_H)
}

function placePins(teams, side) {
  const sorted = [...teams].sort((a, b) => b.pts - a.pts)
  const placed = []

  sorted.forEach(team => {
    const ideal = toTop(team.pts)
    let y = ideal
    for (let i = 0; i < 40; i++) {
      const clash = placed.find(p => Math.abs(p.y - y) < PIN_H)
      if (!clash) break
      y = clash.y + PIN_H
    }
    placed.push({ team, y })
  })

  return placed
}

export default function Index({ teams }) {
  const leftTeams = useMemo(() => teams.filter((_, i) => i % 2 === 0), [teams])
  const rightTeams = useMemo(() => teams.filter((_, i) => i % 2 !== 0), [teams])

  const leftPins = useMemo(() => placePins(leftTeams, 'left'), [leftTeams])
  const rightPins = useMemo(() => placePins(rightTeams, 'right'), [rightTeams])

  const gridLines = [80, 70, 60, 50, 40, 30, 20]

  return (
    <div className={styles.wrap}>
      <div className={styles.chart} style={{ height: CHART_H }}>
        <div className={styles.col} style={{ height: CHART_H }}>
          {leftPins.map(({ team, y }) => (
            <TeamPin key={team.rank} team={team} side="left" top={y} />
          ))}
        </div>

        <div className={styles.scaleWrap} style={{ height: CHART_H }}>
          {gridLines.map(p => (
            <div
              key={p}
              className={styles.gridLine}
              style={{ top: toTop(p) }}
            />
          ))}
          <Scale min={MIN_PTS} max={MAX_PTS} height={CHART_H} />
        </div>

        <div className={styles.col} style={{ height: CHART_H }}>
          {rightPins.map(({ team, y }) => (
            <TeamPin key={team.rank} team={team} side="right" top={y} />
          ))}
        </div>
      </div>
    </div>
  )
}
