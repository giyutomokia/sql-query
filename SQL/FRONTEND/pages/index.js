import React from 'react'
import QueryRunner from '../components/QueryRunner'
import TablesPanel from '../components/TablesPanel'

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: 300, borderRight: '1px solid #eee', padding: 16 }}>
        <h3>Available Tables</h3>
        <TablesPanel />
      </div>
      <div style={{ flex: 1, padding: 16 }}>
        <h1>SQL Runner</h1>
        <QueryRunner />
      </div>
    </div>
  )
}
