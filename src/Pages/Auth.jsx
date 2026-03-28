import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
    const navigate = useNavigate()
    const [mode, setMode] = useState('signup')
    const [error, setError] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signUp, signIn } = useContext(AuthContext)

    const onSubmit = (data) => {
        setError(null)
        if (mode === 'signup') {
            const result = signUp(data.email, data.password)
            if (!result.success) {
                setError(result.message)
            } else {
                navigate('/')
            }
        } else {
            const result = signIn(data.email, data.password)
            if (!result.success) {
                setError(result.message)
            }
            else {
                navigate('/')
            }
        }

    }

    return <div className="page">
        <div className="container">
            <div className="auth-container">
                <div className="auth-header">
                    <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                id="email"
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                id="password"
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Password cannot exceed 12 characters"
                                    }
                                })}
                            />
                            {errors.password && <p className="form-error">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            {mode === 'signup' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>
                    <div className="auth-switch">
                        {mode === 'signup' ? (
                            <p>Already have an account? <span className="auth-link" onClick={() => setMode('signin')}>Sign In</span></p>
                        ) : (
                            <p>Don't have an account? <span className="auth-link" onClick={() => setMode('signup')}>Sign Up</span></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
}