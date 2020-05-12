let movies = require('./getMovies');
let fs = require('fs');

movies().then( res => {
    let json = JSON.stringify(res)
fs.writeFile('moviesList.json',json,function(){})
})
