import React from 'react'

export default function ResultsTable({ columns = [], rows = [] }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3>Results</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              {columns.map(c => (
                <th key={c} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px' }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((cell, j) => (
                  <td key={j} style={{ padding: '6px', borderBottom: '1px solid #f6f6f6' }}>{String(cell)}</td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td style={{ padding: 8 }}>No rows returned.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
