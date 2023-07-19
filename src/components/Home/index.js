import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCards from '../TravelCards'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {travelList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTravelList()
  }

  getTravelList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const responsive = await fetch(apiUrl, options)
    const data = await responsive.json()
    console.log(data)
    const formattedData = data.packages.map(eachItem => ({
      id: eachItem.id,
      Description: eachItem.description,
      Name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))
    this.setState({
      travelList: formattedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelView = () => {
    const {travelList} = this.state
    return (
      <ul className="travels-cards-container">
        {travelList.map(eachItem => (
          <TravelCards key={eachItem.id} travelDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderTravelList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderTravelView()
      default:
        return null
    }
  }

  render() {
    const {travelList} = this.state
    console.log(travelList)
    return (
      <div className="app-container">
        <h1 style={{color: '#334155', fontWeight: 700, fontSize: 30}}>
          Travel Guide
        </h1>
        <hr style={{width: 180, borderColor: '#52bbf0'}} />
        {this.renderTravelList()}
      </div>
    )
  }
}

export default Home
