import React from "react"
import { ICharacter } from "../../types"
import "./Results.css"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks/redux"
import {
  selectCharacter,
  unselectCharacter,
} from "../../store/reducers/SelectedCharacterSlice"

interface ResultsProps {
  items: ICharacter[]
  onItemClick: (id: number) => void
}

const Results: React.FC<ResultsProps> = ({ items, onItemClick }) => {
  const dispatch = useDispatch()
  const selectedCharacters = useAppSelector(
    (state) => state.selectedItems.selectedCharacters
  )

  const isSelected = (id: number) => {
    return selectedCharacters.some((character) => character.id === id)
  }

  const handleSelectToggle = (character: ICharacter) => {
    if (isSelected(character.id)) {
      dispatch(unselectCharacter(character.id))
    } else dispatch(selectCharacter(character))
  }

  return (
    <div className="results">
      {items.length === 0 ? (
        <div>No results found</div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="fullCard">
            <div className="resultCardInterface">
              <input
                className="resultCardCheckbox"
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={() => handleSelectToggle(item)}
              />

              <button
                className="resultCardOpenDetailsButton"
                onClick={() => onItemClick(item.id)}
              >
                Open Details
              </button>
            </div>

            <h3 className="charName">{item.name}</h3>
            <img src={item.image} className="resultImage" />
          </div>
        ))
      )}
    </div>
  )
}

export default Results
