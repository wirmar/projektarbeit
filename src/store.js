const emptyField = { checkers: 0, player: null };

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min +1)) + min;

const emptyBoard = [
    { checkers: 2, player: 'white' },
    emptyField,
    emptyField,
    emptyField,
    emptyField,
    { checkers: 5, player: 'black' },
    emptyField,
    { checkers: 3, player: 'black' },
    emptyField,
    emptyField,
    emptyField,
    { checkers: 5, player: 'white' },
    { checkers: 5, player: 'black' },
    emptyField,
    emptyField,
    emptyField,
    { checkers: 3, player: 'white' },
    emptyField,
    { checkers: 5, player: 'white' },
    emptyField,
    emptyField,
    emptyField,
    emptyField,
    { checkers: 2, player: 'black' },
];

const players = ['white', 'black'];

const initialState = {
    board: emptyBoard,
    dice: [1, 1],
    currentPlayer: players[generateRandomNumber(0, 1)],
    bar: {
        white: 0,
        black: 0,
    },
    removed: {
        white: 0,
        black: 0,
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_CHECKERS':
            const checkersLeft = state.board[action.from].checkers - action.checkers;
            if (action.player === 'white') {
                const to = action.from + action.moveBy;
                return {
                    ...state,
                    board: [
                        ...state.board.slice(0, action.from),
                        { checkers: checkersLeft, player: checkersLeft > 0 ? action.player : null },
                        ...state.board.slice(action.from + 1, to),
                        { checkers: state.board[to].checkers + action.checkers, player: action.player },
                        ...state.board.slice(to + 1),
                    ],
                };
            } else {
                const to = action.from - action.moveBy;
                return {
                    ...state,
                    board: [
                        ...state.board.slice(0, to),
                        { checkers: state.board[to].checkers + action.checkers, player: checkersLeft > 0 ? action.player : null },
                        ...state.board.slice(to + 1, action.from),
                        { checkers: checkersLeft, player: action.player },
                        ...state.board.slice(action.from + 1),
                    ],
                };
            }
        default:
            return state;
    }
};

const store = Redux.createStore(reducer);

const moveWhitePiecesAction = {
    type: 'MOVE_CHECKERS',
    from: 0,
    moveBy: 2,
    player: 'white',
    checkers: 2,
};

console.log(reducer(undefined, moveWhitePiecesAction));

// Export the ReduxMixin
ReduxMixin = PolymerRedux(store);
