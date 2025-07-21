// Unsplash pictures api
try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (error) {
    // Use a default background image and author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1506057213367-028a17ec52e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTMwMTExNjV8&ixlib=rb-4.1.0&q=85)
    `
    document.getElementById("author").textContent = `By: Dan Aragón`
}


// Crypto coin stats api
try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if (!res.ok) {
        throw Error("Something went wrong")
    }
    const data = await res.json()
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small}>
        <span>${data.name}</span>
    `
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
    `
} catch (error) {
    console.error(error)
}

// Function to get current time
function getCurrentTime() {
    const date = new Date()
    const currentTime = date.toLocaleTimeString("en-us", { timeStyle: "short" })
    document.querySelector(".time").innerText = currentTime
}

// Update clock every second
setInterval(getCurrentTime, 1000)

// Display location and weather 
navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    } catch (error) {
        console.error(error)
    }
})