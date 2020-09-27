const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const PLAYER_STRONG_ATTACK_VALUE = 15;
const HEAL_PLAYER_VALUE = 20;
const MAX_LIFE = 100;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_GAME_OVER = "GAME_OVER";

// function for taking user inputed life for player and monster
let chosenMaxLife;
function maxInputValues() {
    const userInputedLife = prompt("Input life for Player and monster", "100");
    chosenMaxLife = parseInt(userInputedLife);
    if (chosenMaxLife <= 0 || isNaN(chosenMaxLife)) {
        throw {message: "Input is not valid."};
    } else if (chosenMaxLife > 100) {
        throw {message: "Input can't more than 100"};
    }
    return chosenMaxLife;
}

// this is for handling user input to input value and show error msg  
try {
    chosenMaxLife = maxInputValues();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert("You typed somthing wrong. Set default value to 100.");
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let playerAttackMode;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife, MAX_LIFE);
let battleLog = [];
let logPlayerAttack;

function attackMonster(mode) {
    // ternary expression
    playerAttackMode = mode === MODE_ATTACK ? PLAYER_ATTACK_VALUE : PLAYER_STRONG_ATTACK_VALUE;
    logPlayerAttack = mode === MODE_ATTACK ? LOG_PLAYER_ATTACK: LOG_PLAYER_STRONG_ATTACK;
    // if (mode == MODE_ATTACK) {
    //     playerAttackMode = PLAYER_ATTACK_VALUE;
    //     logPlayerAttack = LOG_PLAYER_ATTACK;
    // } else if (mode == MODE_STRONG_ATTACK) {
    //     playerAttackMode = PLAYER_STRONG_ATTACK_VALUE;
    //     logPlayerAttack = LOG_PLAYER_STRONG_ATTACK;
    // }
    const monsterDamage = dealMonsterDamage(playerAttackMode);
    currentMonsterHealth -= monsterDamage;
    writeAttackLog(logPlayerAttack, monsterDamage, currentPlayerHealth, currentMonsterHealth);
    endGame();
}

function endGame() {
    let initialPlayerHealth = currentPlayerHealth;
    let initialMonsterHealth = currentMonsterHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPlayerHealth -= playerDamage;
    writeAttackLog(LOG_MONSTER_ATTACK, playerDamage, currentPlayerHealth, currentMonsterHealth);
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        currentMonsterHealth = initialMonsterHealth;
        alert("You are alive as you have a bonus life.");
        setPlayerHealth(initialPlayerHealth);
        setMonsterHealth(initialMonsterHealth);
        alert("Now you can heal! Enjoy!");
    }

    console.log(currentPlayerHealth, currentMonsterHealth);
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        writeAttackLog(LOG_GAME_OVER, "player won", currentPlayerHealth, currentMonsterHealth);
        alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        writeAttackLog(LOG_GAME_OVER, "monster won", currentPlayerHealth, currentMonsterHealth);
        alert("You lost!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        writeAttackLog(LOG_GAME_OVER, "play drawn", currentPlayerHealth, currentMonsterHealth);
        alert("You have a draw!");  
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        resetNewGame();
    }
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
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
        writeAttackLog(LOG_PLAYER_HEAL, healValue, currentPlayerHealth, currentMonsterHealth);
        console.log(currentPlayerHealth, currentMonsterHealth);
    }
}

function resetNewGame() {
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    adjustHealthBars(chosenMaxLife, MAX_LIFE);
}

function writeAttackLog(event, value, playerHealth, monsterHealth) {
    let logEntry = {
        Event: event,
        Value: value,
        finalPlayerHealth: playerHealth,
        finalMonsterHealth: monsterHealth
    };
    // if (event === LOG_PLAYER_ATTACK) {
    //     logEntry.destroy = "MONSTER";
    // } else if (event === LOG_PLAYER_STRONG_ATTACK) {
    //     logEntry.destroy = "MONSTER";
    // } else if (event === LOG_MONSTER_ATTACK) {
    //     logEntry.destroy = "PLAYER";
    // } else if (event === LOG_PLAYER_HEAL) {
    //     logEntry.player = "HEALED";
    // } else if (event === LOG_GAME_OVER) {
    //     logEntry.gameOver = "FINISH";
    // }

    // switch case statement
    switch(event) {
        case LOG_PLAYER_ATTACK:
            logEntry.destroy = "MONSTER";
            break;
        case LOG_PLAYER_STRONG_ATTACK:
            logEntry.destroy = "MONSTER";
            break;
        case LOG_MONSTER_ATTACK:
            logEntry.destroy = "PLAYER";
            break;
        case LOG_PLAYER_HEAL:
            logEntry.player = "HEALED";
            break;
        case LOG_GAME_OVER:
            logEntry.gameOver = "FINISH";
            break;
        default:
            logEntry = {};
    }
     
    battleLog.push(logEntry);
}

function printLogHandler() {
    console.log(battleLog);
    let i = 0;
    for (logEntry of battleLog) {
        console.log("#"+ i + "-----------------");
        for (key in logEntry) {
            console.log(key + " => " + logEntry[key]);
        }
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);