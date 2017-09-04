const emptyField = { checkers: 0, player: null };

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min +1)) + min;

const emptyBoard = [
    { checkers: 2, player: 'white', field: 1 },
    {... emptyField, field: 2 },
    {... emptyField, field: 3 },
    {... emptyField, field: 4 },
    {... emptyField, field: 5 },
    { checkers: 5, player: 'black', field: 6 },
    {... emptyField, field: 7 },
    { checkers: 3, player: 'black', field: 8 },
    {... emptyField, field: 9 },
    {... emptyField, field: 10 },
    {... emptyField, field: 11 },
    { checkers: 5, player: 'white', field: 12 },
    { checkers: 5, player: 'black', field: 13 },
    {... emptyField, field: 14 },
    {... emptyField, field: 15 },
    {... emptyField, field: 16 },
    { checkers: 3, player: 'white', field: 17 },
    {... emptyField, field: 18 },
    { checkers: 5, player: 'white', field: 19 },
    {... emptyField, field: 20 },
    {... emptyField, field: 21 },
    {... emptyField, field: 22 },
    {... emptyField, field: 23 },
    { checkers: 2, player: 'black', field: 24 },
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
                        { ...state.board[action.from], checkers: checkersLeft, player: checkersLeft > 0 ? action.player : null },
                        ...state.board.slice(action.from + 1, to),
                        { ...state.board[to], checkers: state.board[to].checkers + action.checkers, player: action.player },
                        ...state.board.slice(to + 1),
                    ],
                };
            } else {
                const to = action.from - action.moveBy;
                return {
                    ...state,
                    board: [
                        ...state.board.slice(0, to),
                        { ...state.board[to], checkers: state.board[to].checkers + action.checkers, player: checkersLeft > 0 ? action.player : null },
                        ...state.board.slice(to + 1, action.from),
                        { ...state.board[action.from], checkers: checkersLeft, player: action.player },
                        ...state.board.slice(action.from + 1),
                    ],
                };
            }
        case 'ROLL_DICE':
            return {
                ...state,
                dice: [generateRandomNumber(1, 6), generateRandomNumber(1, 6)],
            };
        default:
            return state;
    }
};

const store = Redux.createStore(reducer);

const moveWhitePiecesAction = {
    type: 'MOVE_CHECKERS',
    from: 6,
    moveBy: 2,
    player: 'black',
    checkers: 2,
};

console.log(reducer(undefined, moveWhitePiecesAction));
console.log(reducer(undefined, { type: 'ROLL_DICE' }).dice);

// Export the ReduxMixin
ReduxMixin = PolymerRedux(store);
