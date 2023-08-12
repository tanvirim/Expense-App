import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>

<nav className="navbar navbar-expand-lg bg-body-tertiary">

  <div className="container-fluid">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">Expense Management</Link>
        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
                User
            </Link>
            </li>
        </ul>
        </div>

  </div>
</nav>

      
    </>
  )
}

export default Header
