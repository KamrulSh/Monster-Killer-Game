const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const PLAYER_STRONG_ATTACK_VALUE = 15;
const HEAL_PLAYER_VALUE = 20;
const MAX_LIFE = 100;

const userInputedLife = prompt("Input life for Player and monster", "100");
let chosenMaxLife = parseInt(userInputedLife);
if (chosenMaxLife <= 0 || isNaN(chosenMaxLife) || chosenMaxLife >= 100) {
    alert("Inputed life is not valid! Your default value is 100");
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let playerAttackMode;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife, MAX_LIFE);

function attackMonster(mode) {
    let initialPlayerHealth = currentPlayerHealth;
    let initialMonsterHealth = currentMonsterHealth;
    if (mode == "ATTACK") {
        playerAttackMode = PLAYER_ATTACK_VALUE;
    } else if (mode == "STRONG_ATTACK") {
        playerAttackMode = PLAYER_STRONG_ATTACK_VALUE;
    }
    const monsterDamage = dealMonsterDamage(playerAttackMode);
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentMonsterHealth -= monsterDamage;
    currentPlayerHealth -= playerDamage;
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        currentMonsterHealth = initialMonsterHealth;
        alert("You are alive as you have a bonus life.")
        setPlayerHealth(initialPlayerHealth);
        setMonsterHealth(initialMonsterHealth);
        alert("Now you can heal! Enjoy!");
    }

    console.log(currentMonsterHealth, currentPlayerHealth);
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You lost!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("You have a draw!");  
    }
}

function attackHandler() {
    attackMonster("ATTACK");
}

function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {

    if (hasBonusLife) {
        alert("You can't heal now. You can use heal with your bonus point.");
    } else {
        let healValue;
        if (currentPlayerHealth >= chosenMaxLife - HEAL_PLAYER_VALUE) {
            alert("You can't heal more than your current value.")
            healValue = chosenMaxLife - currentPlayerHealth;
        } else {
            healValue = HEAL_PLAYER_VALUE;
        }
        increasePlayerHealth(healValue);
        currentPlayerHealth += healValue;
        console.log(currentMonsterHealth, currentPlayerHealth);
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);