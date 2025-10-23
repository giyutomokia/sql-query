import React, { useEffect, useState } from 'react'

export default function TablesPanel() {
  const [tables, setTables] = useState([])
  const [selected, setSelected] = useState(null)
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => { fetchTables() }, [])

  async function fetchTables() {
    setErr(null)
    try {
      const res = await fetch('http://localhost:8000/api/tables')
      const data = await res.json()
      setTables(data.tables || [])
    } catch (e) { setErr('Failed to fetch tables') }
  }

  async function showTable(name) {
    setSelected(name)
    setInfo(null)
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch(`http://localhost:8000/api/table/${name}`)
      if (!res.ok) throw new Error('Table fetch failed')
      const data = await res.json()
      setInfo(data)
    } catch (e) { setErr(String(e)) }
    setLoading(false)
  }

  return (
    <div>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <ul style={{ paddingLeft: 0 }}>
        {tables.map(t => (
          <li key={t} style={{ listStyle: 'none', margin: '6px 0' }}>
            <button onClick={() => showTable(t)}
              style={{ background: 'none', border: 'none', color: '#0366d6', cursor: 'pointer' }}>
              {t}
            </button>
          </li>
        ))}
      </ul>

      {loading && <div>Loading table...</div>}

      {info && (
        <div style={{ marginTop: 12 }}>
          <h4>Schema</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Column</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {info.schema.map((col, idx) => (
                <tr key={idx}>
                  <td>{col.name}</td>
                  <td>{col.type}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 style={{ marginTop: 10 }}>Sample Rows</h4>
          <div style={{ maxHeight: 160, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {info.samples.length > 0
                    ? Object.keys(info.samples[0]).map(h => <th key={h}>{h}</th>)
                    : <th>No rows</th>}
                </tr>
              </thead>
              <tbody>
                {info.samples.map((r, i) => (
                  <tr key={i}>
                    {Object.values(r).map((v, idx) => <td key={idx}>{String(v)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
