import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../Loader/Loader"
import "./Details.css"
import useQuery from "../../hooks/useQuery"
import { characterAPI } from "../../services/CharacterService"

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, error, isLoading } = characterAPI.useFetchCharacterDetailsQuery(
    { id: id }
  )

  const query = useQuery()
  const navigate = useNavigate()
  const currentPage = parseInt(query.get("page") || "1", 10)

  const handleCloseDetails = () => {
    navigate(`/?page=${currentPage}`)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>Loading error</h1>
      ) : data ? (
        <div className="details">
          <button
            title="CloseBut"
            className="closeDetails"
            onClick={handleCloseDetails}
          >
            Close Details
          </button>
          <div className="detailsTitle">{data.name}</div>
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
