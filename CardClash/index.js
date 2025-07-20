let deckId
let computerScore = 0
let userScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining-cards")
const computerScoreEl = document.getElementById("computer-score")
const userScoreEl = document.getElementById("user-score")


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.innerText = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.innerText = `Remaining Cards: ${data.remaining}`

            const cardSlots = cardsContainer.children
            for (let i = 0; i < data.cards.length; i++) {
                const card = data.cards[i]
                const cardSlot = cardSlots[i]
                cardSlot.innerHTML = `<img src="${card.image}" class="card" />`;
            }

            const winnerText = determineWinner(data.cards[0], data.cards[1])
            header.innerText = winnerText

            if (data.remaining === 0) {
                drawCardBtn.disabled = true

                if (computerScore > userScore) {
                    header.innerText = "Oops! The computer won!"
                } else if (userScore > computerScore) {
                    header.innerText = "Congrats! You won!"
                } else {
                    header.innerText = "It's a tie!"
                }
            }
        })
})

const map1 = new Map()
map1.set("2", 2)
map1.set("3", 3)
map1.set("4", 4)
map1.set("5", 5)
map1.set("6", 6)
map1.set("7", 7)
map1.set("8", 8)
map1.set("9", 9)
map1.set("10", 10)
map1.set("JACK", 11)
map1.set("QUEEN", 12)
map1.set("KING", 13)
map1.set("ACE", 14)

function determineWinner(card1, card2) {
    if (map1.get(card1.value) > map1.get(card2.value)) {
        computerScore++
        computerScoreEl.innerText = `Computer Score: ${computerScore}`
        return "Computer Wins!"
    } else if (map1.get(card1.value) < map1.get(card2.value)) {
        userScore++
        userScoreEl.innerText = `Your Score: ${userScore}`
        return "You Win!"
    } else {
        return "War!"
    }
}
