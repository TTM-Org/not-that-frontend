import '../Styles/Home/Home.scss';

import { useState } from 'react'

const corsApiUrl = 'https://cors-anywhere.herokuapp.com/'
const axios = require('axios');
const apiKey = 'MnJ_QLBKGQO88Wst6Zv8i0_dwR35IHw6wkMM4SkkbqwVWCT3gK9D3TCWLEee-3jMLk-v8YPgJ6tF07WLf3e_zsgzjRzR8iWM669-sSAPepc4sGM8YQwL-iAAqOaXYXYx'
const searchValues = {
  location : '30052',
  radius : 40000
}

function Home() {
    
    let [zip, setZip] = useState('') // zipcode state for form submission
    let [results, setResults] = useState([]) // result state

    function makeList(res){

        const restaurantList = res.map(restaurant => <li key={restaurant.id}>{restaurant.alias}<br/><img src={restaurant.image_url}/></li>)

        setResults(restaurantList)
        // setResults(res.map((restaurant) => {
        //     console.log(restaurant)
        //     return (
        //         <li>
        //             {restaurant.alias}
        //             <br/>
        //             {restaurant.location.address1}
        //         </li>
        //     )
        // }))
        
    }

    function onSubmit(e){
        e.preventDefault() // prevent refresh

        if (zip.toString().length === 5) {
            
            axios
            .get(
                `${corsApiUrl}https://api.yelp.com/v3/businesses/search`,
                {
                headers: {
                    Authorization: `Bearer ${apiKey}`//,
                    // Location: ''
                },
                params: {
                    location: {zip},
                    radius : 40000
                }
                }
            )
            .then((res) =>
                // dispatch({ type: 'ADD_RESTAURANTS', restaurants: res.data.businesses })
                makeList(res.data.businesses)
                // console.log(res.data.businesses)
            )
            .catch((error) => console.log(error.response));
        } else {
            alert('Zipcode is invalid!')
        }
        
        console.log(zip)
    }

    function onChange(e){
        setZip(e.target.value)
    }

    

    return (
        <div className="Home">
            <form onSubmit={onSubmit}>
                <input name='Zipcode' placeholder='zipcode' type='number' value={zip} onChange={onChange}/>
                <button type='submit' >submit</button>
            </form>
            <ul className="RestaurantList">
                {results}
            </ul>
        </div>
    );
}

export default Home;
