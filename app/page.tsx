export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to Performance Dashboard 🚀</h1>
      <p>Go to <a href='/dashboard' style={{ color: 'blue', textDecoration: 'underline' }}>Dashboard</a></p>
    </main>
  );
}
