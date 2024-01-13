const selectors = {
    cards: document.querySelector('.cards'),
    start: document.querySelector('button')
}

const state = {
    selectedCards: 0,
    totalSelected: 0,
}

const shuffle = array => {
    const  clonedArray = [...array]

    for (let index = clonedArray.length-1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index =0; index < items; index ++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        clonedArray.slice(randomIndex, 1)
    }
    
    return randomPicks
}

const generateGame = () => {
    const emojis = [
        {icon:'🍭', color:'green'},
        {icon:'🍱', color:'red' },
        {icon:'🍣', color:'blue' },
        {icon:'🍧', color:'yellow' },
        {icon:'🌈', color:'purple' },
        {icon:'🍙', color:'brown' },
        {icon:'🥞', color:'green' },
        {icon:'🍩', color:'red' },
        {icon:'🍪', color:'blue' },
        {icon:'🧁', color:'yellow' },
        {icon:'🥨', color:'purple' },
        {icon:'🥬', color:'brown' },
        {icon: '🐟', color:'green'},
        {icon:'🍕', color:'red' },
        {icon:'🍔', color:'blue' },
        {icon:'🥑', color:'yellow' },
        {icon:'🌮', color:'purple' },
        {icon:'🍒', color:'brown' },        
    ]
    const picks = pickRandom(emojis, 8)
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="cards">
            ${items.map(item => `        
            <div class="card ${item.color}">
                ${item.icon}
            </div>
            `).join('')}
        </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html')         
    selectors.cards.replaceWith(parser.querySelector('.cards')) 
}

const resetCards = () => {
    document.querySelectorAll('.selected:not(.matched)').forEach(card => {
    card.classList.remove('selected')
    })
    state.selectedCards = 0;
}

const selectCard = card => {    
    state.selectedCards++; 

    if (state.selectedCards <= 2) {
    card.classList.add('selected');
    }

    if (state.selectedCards === 2) {
    const selectedCards = document.querySelectorAll('.selected:not(.matched)')

    if (selectedCards[0].innerText === selectedCards[1].innerText) {
        selectedCards[0].classList.add('matched')
        selectedCards[1].classList.add('matched')
        state.selectedCards = 0;
        state.totalSelected++;
    }
    setTimeout(() => {
        resetCards()
    })
    }

    if (state.totalSelected === 8) {
        const queryCards = document.querySelector('.cards')
        queryCards.innerHTML = 'You won the game.';
        queryCards.classList.add('allMatched')
    }
    
    if (state.selectedCards > 2) {
        resetCards()
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target

        if (eventTarget.className.includes('card') && !eventTarget.className.includes('selected')){
            selectCard(eventTarget)
        } else if (eventTarget.nodeName ==='BUTTON') {
            setTimeout(() => {
                location.reload()
            })
        }    
    })
}
generateGame()
attachEventListeners()