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

const favoriteBlog = (blogs) => {
    var indexMostLikeBlogs = 0
    for(var i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > blogs[indexMostLikeBlogs].likes) {
            indexMostLikeBlogs = i
        }
    }
    return blogs[indexMostLikeBlogs]
}

const mostBlogs = (blogs) => {
    var authorArray = []
    for (var i = 0; i < blogs.length; i++) {
        authorArray[blogs[i].author] = 0
    }

    for(var i = 0; i <  blogs.length; i++) {
        authorArray[blogs[i].author] += 1
    }
    var mostBlogVal = 0
    var authorBlog = {
        author: '',
        blogs: 0,
    }
    for (var i = 0; i < blogs.length; i++) {
        if(authorArray[blogs[i].author] > mostBlogVal) {
            mostBlogVal = authorArray[blogs[i].author]
            authorBlog = {
                author: blogs[i].author,
                blogs: mostBlogVal,
            }
        }
    }
    return authorBlog
}

const mostLikes = (blogs) => {
    var indexMostLikeBlogs = 0
    for(var i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > blogs[indexMostLikeBlogs].likes) {
            indexMostLikeBlogs = i
        }
    }
    var authorLikes = {
        author: blogs[indexMostLikeBlogs].author,
        likes: blogs[indexMostLikeBlogs].likes,
    }
    return authorLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}