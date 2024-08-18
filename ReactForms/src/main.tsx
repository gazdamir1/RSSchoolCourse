import { Link } from 'react-router-dom'
import styles from './Main.module.css'
import { useAppSelector } from './forms/redux/store'

const Main = () => {
  const customFormData = useAppSelector((state) => state.data.customFormData)
  console.log(customFormData)

  const hookFormData = useAppSelector((state) => state.data.hookFormData)
  console.log(hookFormData)

  const reversedCustomFormData = customFormData.slice().reverse()
  const reversedHookFormData = hookFormData.slice().reverse()

  return (
    <div className={styles.MainContainer}>
      <h1>Main page</h1>

      <div className={styles.formDataContainer}>
        <div className={styles.formColumnLeft}>
          <Link to="/custom_form" className={styles.links}>
            Custom form
          </Link>
          <h2>Uncontrolled Form Data</h2>
          <div className={styles.somethingAboutUs}>
            {reversedCustomFormData.map((data, index) => (
              <div
                key={index}
                className={`${styles.tile} ${index === 0 ? styles.newTile : ''}`}
              >
                <p>
                  <strong>Name:</strong> {data.name}
                </p>
                <p>
                  <strong>Age:</strong> {data.age}
                </p>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
                <p>
                  <strong>Gender:</strong> {data.gender}
                </p>
                <p>
                  <strong>Country:</strong> {data.country}
                </p>
                {data.image && (
                  <img
                    src={data.image}
                    alt="uploaded"
                    style={{ width: 300, height: 300 }}
                  />
                )}
                <hr className={styles.formSeparator} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.formColumnRight}>
          <Link to="/hook_form" className={styles.links}>
            React-hook form
          </Link>
          <h2>Controlled Form Data</h2>

          <div className={styles.somethingAboutUs}>
            {reversedHookFormData.map((data, index) => (
              <div
                key={index}
                className={`${styles.tile} ${index === 0 ? styles.newTile : ''}`}
              >
                <p>
                  <strong>Name:</strong> {data.name}
                </p>
                <p>
                  <strong>Age:</strong> {data.age}
                </p>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
                <p>
                  <strong>Gender:</strong> {data.gender}
                </p>
                <p>
                  <strong>Country:</strong> {data.country}
                </p>
                {data.image && (
                  <img
                    src={data.image}
                    alt="uploaded"
                    style={{ width: 300, height: 300 }}
                  />
                )}
                <hr className={styles.formSeparator} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
