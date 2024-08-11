import React from "react"
import styles from "./Loader.module.css"

const Loader: React.FC = () => {
  return (
    <div data-testid="Loader" className={styles.loaderWrapper}>
      <img
        src="/images/loader.svg"
        className={styles.loader}
        alt="Loading..."
      />
    </div>
  )
}

export default Loader
