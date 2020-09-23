const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const monsterDamage = dealMonsterDamage(PLAYER_ATTACK_VALUE);
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentMonsterHealth -= monsterDamage;
    currentPlayerHealth -= playerDamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You lost!");
    } else if (currentPlayerHealth < 0 && currentMonsterHealth < 0) {
        alert("You have a draw!");  
    }
}

attackBtn.addEventListener('click', attackHandler);