import type { Dispatch, SetStateAction } from 'react'

import { CloseIcon } from '@/public/icons'

import styles from './Sidebar.module.scss'

const Sidebar = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className={`${styles.Sidebar} ${isMenuOpen ? 'open' : ''}`}>
      <button onClick={handleCloseMenu}>
        <CloseIcon width="30px" height="30px" />
      </button>
      <ul></ul>
    </div>
  )
}

export default Sidebar
