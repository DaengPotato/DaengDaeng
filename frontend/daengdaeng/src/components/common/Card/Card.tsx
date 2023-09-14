import React from 'react'
import styles from './Card.module.scss'

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.Card}>{children}</div>
}

export default Card
