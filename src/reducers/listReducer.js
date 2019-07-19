import { CONSTANTS } from '../actions';

let listID = 2;
let cardID = 4;

const initailState = [
    {
        title: "Last Episode",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "we created a static list and a static card"
            },
            {
                id: `card-${1}`,
                text: "we used a mix between material UI React and styled component"
            }
        ]
    },
    {
        title: "This Episode",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "we will create our first reducer"
            },
            {
                id: `card-${3}`,
                text: "and render many cards on our list with static data"
            }
        ]
    }
]


const listReducer = (state = initailState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1;
            return [...state, newList];

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;
            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });
            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = [...state];
            //dragging list around
            if (type === 'list') {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }
            //in the same list 
            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            //other list
            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id);
                //pull out the card from this list
                const card = listStart.cards.splice(droppableIndexStart, 1);
                //find the list where drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id);
                //put the card in the new list 
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }
        default:
            return state;
    }
}

export default listReducer;