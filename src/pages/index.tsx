import React from "react"
import MainPage from "../components/Main/Main"
import { GetServerSideProps } from "next"
import { ApiResponse, ICharacter } from "../types"

type IndexProps = {
  data: ApiResponse
}

const index: React.FC<IndexProps> = ({ data }) => {
  return (
    <MainPage>
      <div>
        {data.results.map((character: ICharacter) => (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
      </div>
    </MainPage>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?name=Rick&page=1`
  )
  const data: ApiResponse = await response.json()

  return {
    props: {
      data,
    },
  }
}

export default index
