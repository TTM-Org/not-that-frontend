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

    function removeCategory(e){
        e.preventDefault()

        console.log(e.target.childNodes[0].childNodes[0])

    }
    
    function removeDuplicates(entries){
        const unique = {};

        const originalEntries = [...entries];
        for (const entry of originalEntries)
        {
            if (entry in unique){
                const index = entries.indexOf(entry);
                entries.splice(index, 1);
                
                continue;
            }

            unique[entry] = true;
        }

        return entries;
    }

    function makeList(res){

        let categoryList = []

        const restaurantList = res.map(restaurant => <li key={restaurant.id}>{restaurant.alias}<br/></li>)
        res.map((restaurant) => {
            restaurant.categories.forEach(element => {
                categoryList.push({alias: element.alias, title: element.title})
            });
        })

        categoryList = removeDuplicates(categoryList)

        setCategories(categoryList.map(category => <li><button onClick={removeCategory}><span className='alias'>{category.alias}</span> {category.title}</button></li>))
        setResults(restaurantList)
        
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
            <ol className="RestaurantList">
                {/* {results} */}
                {categories}
            </ol>
        </div>
    );
}

export default Home;
