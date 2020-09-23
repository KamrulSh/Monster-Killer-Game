const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const PLAYER_STRONG_ATTACK_VALUE = 15;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let playerAttackMode;
adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
    if (mode == "ATTACK") {
        playerAttackMode = PLAYER_ATTACK_VALUE;
    } else if (mode == "STRONG_ATTACK") {
        playerAttackMode = PLAYER_STRONG_ATTACK_VALUE;
    }
    const monsterDamage = dealMonsterDamage(playerAttackMode);
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentMonsterHealth -= monsterDamage;
    currentPlayerHealth -= playerDamage;
    console.log(currentMonsterHealth, currentPlayerHealth);
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You lost!");
    } else if (currentPlayerHealth < 0 && currentMonsterHealth < 0) {
        alert("You have a draw!");  
    }
}

function attackHandler() {
    attackMonster("ATTACK");
}

function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);