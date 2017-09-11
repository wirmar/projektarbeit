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

const initialState = () => ({
    board: emptyBoard,
    dice: [generateRandomNumber(1, 6), generateRandomNumber(1, 6)],
    currentPlayer: players[generateRandomNumber(0, 1)],
    bar: {
        white: 0,
        black: 0,
    },
    removed: {
        white: 0,
        black: 0,
    },
});

const localStorageKey = 'reduxState';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem(localStorageKey);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
        console.error(err);
        // use initial state on error
        return undefined;
    }
};

const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(localStorageKey, serializedState);
    } catch (err) {
        // ignore write errors
        console.error(err);
    }
};

const calculateToOfMove = ({ player, from, moveBy }, state) => {
    let to;
    if (player === 'white') {
        to = from + moveBy;
        if (to >= 24) {
            to = 'removed';
        }
    } else {
        to = from - moveBy;
        if (to < 0) {
            to ='removed';
        }
    }
    if (typeof to === 'number' && state.board[to].checkers === 1 && state.board[to].player !== player) {
        return 'bar';
    }
    return to;
};

const isMoveValid = ({ player, from, moveBy }, to, state) => {
    if (typeof to === 'number') {
        return state.board[to].player === player || state.board[to].checkers <= 1;
    } else if (to === 'removed') {
        const isExact = (player === 'white' ? 23 - from : from) === moveBy - 1;
        return state.board.reduce((acc, val) => {
            if (player === 'white') {
                const offset = isExact ? 17 : from;
                return acc && (val.field > offset || val.checkers === 0 || val.player !== player);
            }
            const offset = isExact ? 6 : from;
            return acc && (val.field < offset || val.checkers === 0 || val.player !== player);
        }, true);
    } else if (to === 'bar') {
        return true;
    }
    return false;
};

const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case 'MOVE_CHECKERS':
            const checkersLeft = state.board[action.from].checkers - action.checkers;
            const to = calculateToOfMove(action, state);
            if (!isMoveValid(action, to, state)) {
                return state;
            }
            if (to === 'removed' || to === 'bar') {
                return {
                    ...state,
                    [to]: {
                        ...state.removed,
                        [action.player]: state.removed[action.player] + 1,
                    },
                    board: [
                        ...state.board.slice(0, action.from),
                        { ...state.board[action.from], checkers: checkersLeft, player: checkersLeft > 0 ? action.player : null },
                        ...state.board.slice(action.from + 1),
                    ],
                };
            }
            if (action.player === 'white') {
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
                return {
                    ...state,
                    board: [
                        ...state.board.slice(0, to),
                        { ...state.board[to], checkers: state.board[to].checkers + action.checkers, player: action.player },
                        ...state.board.slice(to + 1, action.from),
                        { ...state.board[action.from], checkers: checkersLeft, player: checkersLeft > 0 ? action.player : null },
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
        case 'NEW_GAME':
            return initialState();
        default:
            return state;
    }
};

const store = Redux.createStore(reducer, loadState());

store.subscribe(() => {
    saveState(store.getState());
});

// "Export" the ReduxMixin
ReduxMixin = PolymerRedux(store);
