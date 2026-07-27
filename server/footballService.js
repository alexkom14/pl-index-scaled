const BASE_URL = 'https://api.football-data.org/v4'

async function footballFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'X-Auth-Token': process.env.API_KEY },
  })

  if (!res.ok) {
    const err = new Error(`Football API error: ${res.status} ${res.statusText}`)
    err.status = res.status
    throw err
  }

  return res.json()
}

export async function getStandings() {
  const data = await footballFetch('/competitions/PL/standings')
  return data.standings[0].table.map(entry => ({
    rank:   entry.position,
    name:   entry.team.shortName,
    pts:    entry.points,
    won:    entry.won,
    draw:   entry.draw,
    lost:   entry.lost,
    played: entry.playedGames,
    logo:   entry.team.crest,
  }))
}

export async function getTopScorers() {
  const data = await footballFetch('/competitions/PL/scorers?limit=10')
  return data.scorers.map(s => ({
    name:  s.player.name,
    team:  s.team.shortName,
    goals: s.goals,
    logo:  s.team.crest,
  }))
}
