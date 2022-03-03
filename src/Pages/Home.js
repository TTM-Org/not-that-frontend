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
    
    const [zip, setZip] = useState('') // zipcode state for form submission
    const [businesses, setBusinesses] = useState([])
    const [categories, setCategories] = useState([])

    const [trigger, setTrigger] = useState(true)

    useEffect(() => {
        console.log(categories)
    }, [trigger])
    


    function removeCategory(e, category){
        e.preventDefault()

        let categoryName = e.target.innerText
        categories.forEach((element, index) => {
            if (element[0] === categoryName) {return categories.splice(index, 1)}
        })

        setCategories(categories)
        setTrigger(!trigger)
    }
    

    function makeList(res){

        let titleList = []
        let initCategoryList = []
        let categoryList = []
        let biz = {}

        res.forEach((restaurant) => {
            restaurant.categories.forEach(element => {
                biz[restaurant.id] = restaurant
                initCategoryList.push([element.title, restaurant.id])
                // titleList.push(element.title)
                // categoryList.push(element.title)
            });
        })

        initCategoryList.forEach((element, index) => {
            if (titleList.includes(element[0])){
            } else {
                titleList.push(element[0])
                categoryList.push([element[0], element[1]])
            }
        })

        setCategories(categoryList)
        setBusinesses(biz) 

    }

    function onCategorySubmit(e){
        let display = []

        categories.forEach((element) => {
            display.push(businesses[element[1]])
        })

        setBusinesses(display)
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
            .then((res) => {
                makeList(res.data.businesses)
            })
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
                {categories.map((category, index) => (
                <li key={index}><button onClick={(e) => removeCategory(e, category)}>{category[0]}</button></li>
                ))}
            </ol>

            <button onClick={onCategorySubmit} type='submit' >submit </button>
        </div>
    );
}

export default Home;
