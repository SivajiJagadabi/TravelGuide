import './index.css'

const TravelCards = props => {
  const {travelDetails} = props
  const {imageUrl, Name, Description} = travelDetails
  return (
    <li className="travel-card">
      <img src={imageUrl} className="image" alt={Name} />
      <h1 className="name">{Name}</h1>
      <p className="description">{Description}</p>
    </li>
  )
}

export default TravelCards
