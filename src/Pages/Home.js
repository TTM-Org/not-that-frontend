import '../Styles/Home/Home.scss';
import { useState } from 'react';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Results from '../components/Results';


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
    const [initCategories, setInitCategories] = useState([])
    const [categories, setCategories] = useState([])
    
    function removeCategory(e, category){
        e.preventDefault()

        let categoryName = e.target.innerText
        categories.forEach((element, index) => {
            if (element[0] === categoryName) {return categories.splice(index, 1)}
        })
        setCategories([...categories])
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
            });
        })
        
        setInitCategories(initCategoryList)
        console.log(initCategoryList)

        initCategoryList.forEach((element, index) => {
            if (titleList.includes(element[0])){
            } else {
                titleList.push(element[0])
                categoryList.push([element[0], element[1]])
            }
        })

        setCategories(categoryList)
        setBusinesses(biz)
        console.log(businesses)
    }

    function onCategorySubmit(e){
        let display = []

        categories.forEach((category) => {
            initCategories.forEach((initCategory) => {
                if (category[0] === initCategory[0]) {
                    display.push(businesses[initCategory[1]])
                }
            })
        })

        setBusinesses(display)
        // our results are stored in businesses
        console.log('businesses, ', businesses)
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
        <div className="flex flex-col w-3/4 justify-center align-center text-center">
            <Search />
            <Categories />
            <Results />

            <div className='flex m-10 justify-center align-center '>
                <form onSubmit={onSubmit}>
                    <input className='bg-red-500 rounded-xl text-center placeholder:text-black placeholder:text-center px-4 py-2 focus:shadow-lg focus:outline-none' name='Zipcode' placeholder='Enter zipcode' type='numeric' value={zip} onChange={onChange}/>
                    {/* <button type='submit' >submit</button> */}
                </form>
            </div>
            <p>Select what you DON'T want.</p>
            <ol className="flex flex-wrap justify-center align-center">
                {categories.map((category, key) => <button key={key} className="flex justify-center align-center p-3 rounded-2xl text-white m-3 bg-red-500 " onClick={(e) => removeCategory(e, category)}><li>{category[0]}</li></button>)}
            </ol>

            <button className=' flex justify-center self-center bg-red-500 rounded-xl text-center placeholder:text-black placeholder:text-center px-4 py-2 w-1/6' onClick={onCategorySubmit} type='submit' >SUBMIT</button>
            
            {/* businesses turns into an object that we can not map over */}
            {/* <ol className="flex flex-wrap justify-center align-center">
                {businesses ? businesses.map((business, key) => <p key={key}>Business Card</p>) : ''}
            </ol> */}

        </div>
    );
}

export default Home;