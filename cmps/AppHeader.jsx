const { NavLink } = ReactRouterDOM


export function AppHeader({ onSetPage }) {

  return (
    <header className="app-header container">
      <section>
        <h1>React Book App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/book">Books</NavLink>
        </nav>
      </section>
    </header>
  )
}