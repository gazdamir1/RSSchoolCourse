import React from "react"
import Loader from "../Loader/Loader"
import styles from "./Details.module.css"
import { characterAPI } from "../../services/CharacterService"
import { useRouter } from "next/router"

const Details: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error, isLoading } = characterAPI.useFetchCharacterDetailsQuery(
    { id: id as string }
  )

  const { query } = useRouter()

  const currentPage = parseInt((query.page as string) || "1", 10)

  const handleCloseDetails = () => {
    router.push(`/?page=${currentPage}`)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>Loading error</h1>
      ) : data ? (
        <div className={styles.details}>
          <button
            title="CloseBut"
            className={styles.closeDetails}
            onClick={handleCloseDetails}
          >
            Close Details
          </button>
          <div className={styles.detailsTitle}>{data.name}</div>
          <div>
            Status: <b>{data.status}</b>{" "}
          </div>
          <div>
            Species: <b>{data.species}</b>
          </div>
          <div>
            Type: <b>{data.type}</b>
          </div>
          <div>
            Gender: <b>{data.gender}</b>
          </div>
          <div>
            Created: <b>{data.created}</b>
          </div>
          <img src={data.image} alt={data.name} />
        </div>
      ) : (
        <h1>No data</h1>
      )}
    </>
  )
}

export default Details
