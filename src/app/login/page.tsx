import { login, signup } from './actions'
import styles from './login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className={styles.input}
            />
          </div>
          
          <div className={styles.buttonGroup}>
            <button formAction={login} className={styles.primaryButton}>
              Log in
            </button>
            <button formAction={signup} className={styles.secondaryButton}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
