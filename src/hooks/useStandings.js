import { useState, useEffect } from 'react'

export function useStandings() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.football-data.org/v4/competitions/PL/standings', {
      headers: {
        'X-Auth-Token': import.meta.env.VITE_API_KEY
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        const overall = data.standings.find(s => s.type === 'TOTAL')
        const mapped = overall.table.map(row => ({
          rank: row.position,
          pts: row.points,
          name: row.team.name,
          logo: row.team.crest,
          won: row.won,
          draw: row.draw,
          lost: row.lost
        }))
        setTeams(mapped)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { teams, loading, error }
}