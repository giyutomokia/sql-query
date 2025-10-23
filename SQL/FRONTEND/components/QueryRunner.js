import React, { useState } from 'react'
import ResultsTable from './ResultsTable'

export default function QueryRunner() {
  const [query, setQuery] = useState('SELECT * FROM Customers LIMIT 10;')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function run() {
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await fetch('http://localhost:8000/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Query failed')
      setResult(data)
    } catch (e) { setError(String(e)) }
    setLoading(false)
  }

  return (
    <div>
      <textarea value={query} onChange={e => setQuery(e.target.value)} rows={8}
        style={{ width: '100%', fontFamily: 'monospace', fontSize: 14 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={run} disabled={loading} style={{ padding: '8px 12px' }}>
          Run Query
        </button>
        {loading && <span> Running...</span>}
      </div>

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {result && <ResultsTable columns={result.columns} rows={result.rows} />}
    </div>
  )
}
