const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const PLAYER_STRONG_ATTACK_VALUE = 15;
const HEAL_PLAYER_VALUE = 20;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let playerAttackMode;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);

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

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);