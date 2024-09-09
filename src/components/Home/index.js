import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import { BsFilter } from "react-icons/bs";
import { FaSort } from "react-icons/fa6";
import {BsSearch} from 'react-icons/bs'
import Cities from "../Cities"

import './index.css'



class Home extends Component{
state = {
    getData:[],
    isLoading:true,
    searchInput: '',
} 

componentDidMount(){
    this.getWeatherData()
} 

getWeatherData = async() =>{
     const url = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20" 
     const options = {
        method : "GET",
     }

     const response = await fetch(url,options)
     const data = await response.json()
   
     if (response.ok === true) {
         const updatedData = data.results.map(each => ({
          cityName:each.name,
          country:each.cou_name_en,
          geonameId:each.geoname_id,
          timezone:each.timezone,
        }))
        this.setState({
          getData: updatedData,
          isLoading:false
        })
      }
} 

renderCitiesList = () => {
    const {getData} = this.state
    return (
      <div>
      <ul className="city-list-container">
              {getData.map(each => (
                <Cities cityDetails={each} key={each.geonameId} />
          ))}
      </ul>
    </div>
    )
  } 

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

    render(){
       const{isLoading,searchInput} = this.state
        return(
          <div className='home-container'>
          { isLoading ? (this.renderLoadingView()):
          (
            <div>
             <div className="search-input-container">
              <BsSearch className="search-icon" />
              <input
                type="search"
                placeholder="Search The Cities"
                value={searchInput}
                onChange={this.onChangeSearch}
                className="search-input"
              />
            </div>
           <div className="city-table" >
          <div className="table-header">
            <div className="city-name-column">
             <div className="icons-container">
                <button
                  type="button"
                  className="sorting-icon"
                  
                >
                <FaSort size="20"/>
                </button>
                <p className="table-header-title">City name</p>
                <button
                  type="button"
                  className="sorting-icon"
                  
                  >
                 <BsFilter size="25"/>
                </button>
              </div>
            </div>
            <div className="home-table-column">
              <p className="table-header-title">Country</p>
            </div>
            <div className="home-table-column">
              <p className="table-header-title">Timezone</p>
            </div>
            </div>
            <hr className="line" />
            {this.renderCitiesList()}
            </div>
            </div>
        )}
        </div>
       )
    }
    
}
export default Home