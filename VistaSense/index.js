fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image and author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1506057213367-028a17ec52e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTMwMTExNjV8&ixlib=rb-4.1.0&q=85)
        `
        document.getElementById("author").textContent = `By: Dan Aragón`
    })


fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small}>
            <span>${data.name}</span>
        `
    })
    .catch(err => console.error(err))