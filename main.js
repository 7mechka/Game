let playerSprite = document.querySelector('.player')
let enemySprite = document.querySelector('.enemy')

let playerStats = document.querySelector('.player__stats')
let enemyStats = document.querySelector('.enemy__stats')

let battleBtn = document.querySelector('.battle')
let invBtn = document.querySelector('.inventory')
let charBtn = document.querySelector('.character')
let menuBtn = document.querySelector('.menu')

let isReady = true

let tmp
let battleTmp
let invTmp    
let charTmp
let menuTmp


battleBtn.addEventListener('click', () => {
    if (battleBtn.attributes["data-button"].value !== 'battleBtn') {
        hadleClick(battleBtn, 2)
    }
    else {
        hadleClick(battleBtn)
    }
} )
invBtn.addEventListener('click', () => {
    if (invBtn.attributes["data-button"].value !== 'inventoryBtn') {
        hadleClick(invBtn, 2)
    }
    else {
        hadleClick(invBtn)
    }
} )
charBtn.addEventListener('click', () => {
    if (charBtn.attributes["data-button"].value !== 'characterBtn') {
        hadleClick(charBtn, 2)
    }
    else {
        hadleClick(charBtn)
    }
} )
menuBtn.addEventListener('click', () => {
    if (menuBtn.attributes["data-button"].value !== 'menuBtn') {
        hadleClick(menuBtn, 2)
    }
    else {
        hadleClick(menuBtn)
    }
} )

enemySprite.addEventListener('click', () => {
    moveEnemy(enemySprite)
})
playerSprite.addEventListener('click', () => {
    movePlayer(playerSprite)
})
function movePlayer() {
    setTimeout( () => {
        playerSprite.style.translate = '0 0'
    },  .5 * 1000)
    playerSprite.style.translate = '200px 0'
}
function moveEnemy(obj) {
    setTimeout( () => {
        obj.style.translate = '0 0'
    },  .5 * 1000)
    obj.style.translate = '-200px 0'
}
class enemyCreator {
    constructor(name, hp, dmg, def) {
        this.name = name
        this.hp = hp
        this.dmg = dmg
        this.def = def
        this.block = def * 0.0045 
    }
}
class playerCreator extends enemyCreator {
    constructor(name, hp, dmg, def, lvl, exp) {
        super(name, hp, dmg, def, lvl, exp)
        this.lvl = lvl
        this.exp = exp
    }
}
function attack(damager, defender) {
    let blockedDmg = damager.dmg * defender.block
    let damage = damager.dmg - Math.round(blockedDmg)

    defender.hp -= damage
    fillStats()

    if (damager === player) {
        movePlayer()
    }
    else {
        moveEnemy(enemySprite)
    }

    checkDeath()
}

function defaultMenu() {
    battleBtn.innerText = 'Битва'
    battleBtn.attributes['data-button'].value = 'battleBtn'

    invBtn.innerText = 'Инвентарь'
    invBtn.attributes['data-button'].value = 'inventoryBtn'

    charBtn.innerText = 'Персонаж'
    charBtn.attributes['data-button'].value = 'characterBtn'

    menuBtn.innerText = 'Меню'
    menuBtn.attributes['data-button'].value = 'menuBtn'

    playerStats.innerHTML = ''
    enemyStats.innerHTML = ''
}

function globalEventsHandler(btn) {
    btn.classList.forEach(elem => {
        if (elem === 'battle') {
            if (btn.attributes['data-button'].value === 'battleBtn') {
                battleMenu()
            }
            else if (btn.attributes['data-button'].value === 'attackBtn') {
                attack(enemy, player)

                setTimeout( () => {
                    attack(player, enemy)
                },  2 * 1000)
            }
        }
        else if (elem === 'inventory') {
            if (btn.attributes['data-button'].value === 'inventoryBtn') {
                console.log('inventory button')
            }
        }
        else if (elem === 'character') {
            if (btn.attributes['data-button'].value === 'characterBtn') {
                console.log('character button')
            }
        }
        else if (elem === 'menu') {
            if (btn.attributes['data-button'].value === 'menuBtn') {
                console.log('menu button')
                defaultMenu()
            }
        }
    });
}

function battleMenu() {
    fillStats()
    battleBtn.attributes['data-button'].value = 'attackBtn'
    battleBtn.innerText = 'Атака'

    invBtn.attributes['data-button'].value = 'defBtn'
    invBtn.innerText = 'Защита'

    charBtn.attributes['data-button'].value = 'dodgeBtn'
    charBtn.innerText = 'Уклонение'

    menuBtn.innerText = 'Отмена'
}

function fillStats() {
    playerStats.innerHTML = `Name: ${player.name}<br>
                             HP: ${player.hp}<br>
                             Attack: ${player.dmg}<br>
                             Defense: ${player.def}<br>
                             LVL: ${player.lvl}<br>
                             EXP: ${player.exp}`

    enemyStats.innerHTML = `Name: ${enemy.name}<br>
                             HP: ${enemy.hp}<br>
                             Attack: ${enemy.dmg}<br>
                             Defense: ${enemy.def}<br>`
}

function battle(player, enemy) {

}

function checkDeath() {
    if (player.hp <= 0) {
        alert('ГГ сдох!')
    }
    else if (enemy.hp <= 0) {
        alert('Енеми ис гон!')
    }
}

function hadleClick(obj, time = 1) {
    // console.log(`time = ${time} isReady = ${isReady}`)
    if (!isReady) {
        return
    }
    else {
        isReady = false
        globalEventsHandler(obj)
        tmp = obj.firstChild.data
        let wait = 'Ожидание...'

        battleTmp = battleBtn.firstChild.data
        invTmp = invBtn.firstChild.data
        charTmp = charBtn.firstChild.data
        menuTmp = menuBtn.firstChild.data

        battleBtn.innerText = wait
        invBtn.innerText = wait
        charBtn.innerText = wait
        menuBtn.innerText = wait
        obj.innerText = 'Ожидание...'
    }
    setTimeout(() => {
        isReady = true

        battleBtn.innerText = battleTmp
        invBtn.innerText = invTmp
        charBtn.innerText = charTmp
        menuBtn.innerText = menuTmp
    }, time * 1000)
}

let player = new playerCreator('Hero', 100, 20, 20, 1, 0)
let enemy = new enemyCreator('Enemy', 80, 10, 10)

defaultMenu()