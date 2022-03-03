let categories = [
    ['id1', 'Greek'],
    ['id2', 'Ice Cream'],
    ['id1', 'Chicken']
]

let biz = {
    id1 : {info: 'restaurant info 1'},
    id2 : {info: 'restaurant info 2'}
}

let displayedBiz = {}//[]


for (let i = 0; i < categories.length; i++) {
    let currentCat = categories[i]
    let id = currentCat[0]
    
    displayedBiz[id] = biz[id] // Object
    // displayedBiz.push(biz[id]) // Array
}


console.log('display', displayedBiz)
