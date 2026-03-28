import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    return <nav className="navbar">
        <div className="navbar-container">
            <Link className='navbar-brand' to="/">Marketplace</Link>
            <div className="navbar-links">
                <Link to="/" className='navbar-link'>Home</Link>
                <Link to="/checkout" className='navbar-link'>Checkout</Link>
            </div>
            <div className="navbar-auth">
                {user ? (<div className="navbar-user"><span className='navbar-greeting' onClick={() => navigate('/auth')}>Hi!, {user.email}</span>
                    <button className='btn btn-secondary' onClick={logout}>Logout</button></div>) : (
                    <div className='navbar-auth-links'>
                        <Link to="/auth" className='btn  btn-secondary'>Login</Link>
                        <Link to="/auth" className='btn btn-primary'>Sign Up</Link>
                    </div>)}
            </div>
        </div>
    </nav>
}