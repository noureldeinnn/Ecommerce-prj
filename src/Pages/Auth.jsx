import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Auth() {
    const [mode, setMode] = useState('signup')
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log("Form data submitted:", data)
        alert(`Successfully ${mode === 'signup' ? 'signed up' : 'signed in'}!`)
    }

    return <div className="page">
        <div className="container">
            <div className="auth-container">
                <div className="auth-header">
                    <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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