import React from 'react'
import Link from 'next/link'
/*import styles from './Header.module.css'*/

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header /*className={styles.header}*/>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header