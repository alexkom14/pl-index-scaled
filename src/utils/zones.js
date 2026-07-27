export function getZone(rank) {
  if (rank <= 4) return { label: 'UCL', color: 'var(--ucl)' }
  if (rank === 5) return { label: 'UEL', color: 'var(--uel)' }
  if (rank === 6) return { label: 'UECL', color: 'var(--uecl)' }
  if (rank >= 18) return { label: 'REL', color: 'var(--rel)' }
  return { label: null, color: 'var(--muted)' }
}

export function toPercent(pts, min, max) {
  return ((pts - min) / (max - min)) * 100
}
