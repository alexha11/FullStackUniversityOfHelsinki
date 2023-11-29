const dummy = (blogs) => {
    return 1
}

const totalLikes = (listBlog) => {
    var sum = 0
    for(var i  = 0; i < listBlog.length; i++) {
        sum += listBlog[i].likes
    }
    console.log(sum)
    return sum
}

// const favoriteBlog = (blogs) => {
//     for(var i = 0; i < blogs.length; i++) {
        
//     }
    
// }

module.exports = {
    dummy,
    totalLikes,
    // favoriteBlog
}