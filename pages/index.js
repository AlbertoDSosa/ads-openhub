import Head from 'next/head'
import styles from 'styles/Home.module.css'
import Header from 'components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ADS OpenHub | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Home</h1>
        <p className={styles.description}></p>

        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://albertodsosa.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Alberto D.Sosa
        </a>
      </footer>
    </div>
  )
}
