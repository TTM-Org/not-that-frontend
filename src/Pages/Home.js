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
        return res.map((value) => {
            return (
                <li>

                </li>
            )
        })
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
                }
                }
            )
            .then((res) =>
                // dispatch({ type: 'ADD_RESTAURANTS', restaurants: res.data.businesses })
                setResults(results)
            )
            .catch((error) => console.log(error.response));
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
            {results}
        </div>
    );
}

export default Home;
