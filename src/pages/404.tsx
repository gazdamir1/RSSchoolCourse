import React from "react"
import styles from "../styles/Notfound.module.css"
const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <div className="title">404 - Not Found</div>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound