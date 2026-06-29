
export default function Sidebar() {
  const items = [
    'OVERVIEW',
    'RUNTIME',
    'AGENTS',
    'MEMORY',
    'EVENTS',
    'INTELLIGENCE',
    'SECURITY',
    'STORAGE',
    'DIRECTOR'
  ]

  return (
    <div
      style={{
        width: '260px',
        borderRight: '1px solid #222',
        padding: '20px'
      }}
    >
      <h2>MALEKA</h2>

      {items.map(item => (
        <div key={item} style={{marginTop:'16px'}}>
          {item}
        </div>
      ))}
    </div>
  )
}
