import '../Styles/Home/Home.scss';

import { useEffect, useState } from 'react'

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
    let [categories, setCategories] = useState([])
    let [catDict, setCatDict] = useState()


    function removeCategory(e){
        e.preventDefault()

        let categoryName = e.target.innerText
        categories.splice(categories.indexOf(categoryName), 1)

        setCategories(categories)
    
    }
    

    function makeList(res){

        let categoryList = []

        res.forEach((restaurant) => {
            restaurant.categories.forEach(element => {
                categoryList.push(element.title)
            });
        })

        categoryList = [...new Set(categoryList)]

        setCategories(categoryList)
        
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
                },
                params: {
                    location: {zip},
                    radius : 40000,
                    limit: 20
                }
                }
            )
            .then((res) =>
                makeList(res.data.businesses)
            )
            .catch((error) => console.log(error.response));
        } else {
            alert('Zipcode is invalid!')
        }
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
            <ol className="RestaurantList">
                {categories.map(category => <li><button onClick={removeCategory}>{category}</button></li>)}
            </ol>
        </div>
    );
}

export default Home;
