export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/PL/standings',
      {
        headers: {
          'X-Auth-Token': import.meta.env.VITE_API_KEY,
        },
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch standings' })
    }

    const data = await response.json()
    const teams = data.standings[0].table.map(entry => ({
      rank: entry.position,
      name: entry.team.shortName,
      pts: entry.points,
      won: entry.won,
      draw: entry.draw,
      lost: entry.lost,
      played: entry.playedGames,
      logo: entry.team.crest,
    }))

    res.setHeader('Cache-Control', 's-maxage=300') // cache 5 mins on Vercel
    res.status(200).json(teams)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
