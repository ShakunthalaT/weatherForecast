import {Link} from 'react-router-dom'
import './index.css' 

const Cities = (props)=>{
    const{cityDetails} = props 
    const{cityName,country,geonameId,timezone} = cityDetails 

    return(
          <li className='city-list' key={geonameId}>
            <div className='city-name-container'>
               <Link to={`/WeatherHome/${cityName}`} className='link'>
               <p className='city-name text'>{cityName}</p>
                </Link> 
            </div>
            <div className='table-column'>
                <p className='country-name text'>{country}</p>
            </div> 
               <div className='table-column time-view'>
                <p className='timezone '>{timezone}</p>
                </div>
            </li>
    )
}

export default Cities