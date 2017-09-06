const rollDice = () => ({
    type: 'ROLL_DICE',
});

const moveCheckers = ({ from, moveBy, player, checkers }) => ({
    type: 'MOVE_CHECKERS',
    from,
    moveBy,
    player,
    checkers,
});

const kickChecker = ({ player, from }) => ({
    type: 'KICK_CHECKER',
    player,
    from,
});

const newGame = () => ({
    type: 'NEW_GAME',
});

// "Export" the Actions
ReduxActions = {
    rollDice,
    moveCheckers,
    kickChecker,
    newGame,
};
