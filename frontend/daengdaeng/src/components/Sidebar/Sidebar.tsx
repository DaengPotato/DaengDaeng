import { Dispatch, SetStateAction } from 'react'
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
      <img src="/img/close.png" alt="close" onClick={handleCloseMenu} />
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
    </div>
  )
}

export default Sidebar
