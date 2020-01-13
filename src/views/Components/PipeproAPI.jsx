function getLaneIndex(lanes, id) {
    for (let i=0; i<lanes.length; i++)
        if (lanes[i].id == id)
            return i;
    return -1;
}

function getCardIndex(cards, id) {
    for (let i=0; i<cards.length; i++)
        if (cards[i].id == id)
            return i;
    return -1;
}

export function getCardById(pipe, laneId, cardId) {
    const lanes = pipe.lanes.filter(lane => {
        return lane.id === laneId;
    });
    let laneItem = lanes[0]
    const cards = laneItem.cards.filter(card => {
        return card.id === cardId;
    });
    let cardItem = cards[0];
    return cardItem;
}

export function updateCardById(pipe, card) {
    let pipeNew = pipe;
    let laneId = card.laneId;
    let cardId = card.id;
    let laneIndex = getLaneIndex(pipe.lanes, laneId);
    let cardIndex = getCardIndex(pipe.lanes[laneIndex].cards, cardId);
    pipeNew.lanes[laneIndex].cards[cardIndex] = card;
    console.log('pipenew')
    console.log(pipeNew);
    return pipeNew;
}