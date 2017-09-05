const emptyField = { checkers: 0, player: null };

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const emptyBoard = [
    { checkers: 2, player: 'white', field: 0 },
    {... emptyField, field: 1 },
    {... emptyField, field: 2 },
    {... emptyField, field: 3 },
    {... emptyField, field: 4 },
    { checkers: 5, player: 'black', field: 5 },
    {... emptyField, field: 6 },
    { checkers: 3, player: 'black', field: 7 },
    {... emptyField, field: 8 },
    {... emptyField, field: 9 },
    {... emptyField, field: 10 },
    { checkers: 5, player: 'white', field: 11 },
    { checkers: 5, player: 'black', field: 12 },
    {... emptyField, field: 13 },
    {... emptyField, field: 14 },
    {... emptyField, field: 15 },
    { checkers: 3, player: 'white', field: 16 },
    {... emptyField, field: 17 },
    { checkers: 5, player: 'white', field: 18 },
    {... emptyField, field: 19 },
    {... emptyField, field: 20 },
    {... emptyField, field: 21 },
    {... emptyField, field: 22 },
    { checkers: 2, player: 'black', field: 23 },
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
                currentPlayer: players[(players.findIndex(p => p === state.currentPlayer) + 1) % 2],
            };
        case 'KICK_CHECKER':
            return {
                ...state,
                bar: {
                    ...state.bar,
                    [action.player]: state.bar[action.player] + 1,
                },
                board: [
                    ...state.board.slice(0, action.from),
                    { ...state.board[action.from], ...emptyField },
                    ...state.board.slice(action.from + 1),
                ],
            };
        default:
            return state;
    }
};

const store = Redux.createStore(reducer);

console.log(reducer(undefined, { type: 'MOVE_CHECKERS', from: 5, moveBy: 1, player: 'black', checkers: 1 }));

// "Export" the ReduxMixin
ReduxMixin = PolymerRedux(store);
