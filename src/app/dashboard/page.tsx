import { createClient } from '@/utils/supabase/server'
import { logout } from '../login/actions'
import styles from './dashboard.module.css'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Mock data for MVP before Phase 3 DB integration
  const mockCards: any[] = []

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>Make A Birthday</div>
        <div className={styles.headerActions}>
          <span>{user?.email}</span>
          <form>
            <button formAction={logout} className={styles.logoutButton}>
              Log out
            </button>
          </form>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>My Birthday Experiences</h1>
          <Link href="/editor/new" className={styles.createButton}>
            + Create Birthday
          </Link>
        </div>

        {mockCards.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>You haven't created any birthday experiences yet.</p>
            <Link href="/editor/new" className={styles.createButton}>
              Create your first experience
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* Render cards here once DB is connected */}
          </div>
        )}
      </main>
    </div>
  )
}
