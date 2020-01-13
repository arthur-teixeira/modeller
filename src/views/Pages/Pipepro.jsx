import React from "react";
import ReactDOM from "react-dom";

import data from "./data.json";
import "./styles.css";
import Board from "react-trello";
import api from "../../api/axios.js";
import PipeproCardInfoForm from "../Components/PipeproCardInfoForm";
import PipeproAddCardForm from "../Components/PipeproAddCardForm";
import { getCardById, updateCardById } from "../Components/PipeproAPI";

const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class Pipepro extends React.Component {
    state = {
        boardData: { lanes: [] },
        id: "",
        cardOpen: false,
        cardSelected: {}
    }

    setEventBus = eventBus => {
        this.setState({ eventBus })
    }

    async componentWillMount() {
        //const response = await this.getBoard()
        const response = await api.get('/pipe/buscar/' + this.props.match.params.id);
        console.log(response.data.processo)
        this.setState({
            boardData: JSON.parse(response.data.processo),
            id: this.props.match.params.id
        })
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    updatePipe = () => {
        api.put('/pipe/atualizar/' + this.state.id, {
            processo: JSON.stringify(this.state.boardData)
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    completeCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: { id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app' }
        })
        this.state.eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk' })
    }

    addCard = () => {

        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'APE_0000',
            card: { id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down' }
        })
    }

    shouldReceiveNewData = nextData => {
        //console.log('New card has been added')
        //console.log(JSON.stringify(nextData))
        this.setState({ boardData: nextData })
        //console.log("resultado")
        //console.log(JSON.stringify(this.state.boardData))
        this.updatePipe();

    }

    handleCardAdd = (card, laneId) => {
        console.log(`New card added to lane ${laneId}`)
        console.dir(card)
    }

    onCardClick = (cardId, metadata, laneId) => {
        let card = getCardById(this.state.boardData, laneId, cardId)
        this.setState({
            cardOpen: true,
            cardSelected: card
        })
    }

    onCloseCardForm = (card, flag) => {
        if (flag) {
            let pipeNew = updateCardById(this.state.boardData, card);
            console.log('return')
            console.log(pipeNew)
            this.setState({
                cardOpen: false,
                boardData: pipeNew
            })
            this.updatePipe();
        } else {
            this.setState({ cardOpen: false })
        }
    }

    render() {
        return (
            <div className="Pipepro">
                <h1>PIPEPRO</h1>
                <Board
                    style={{ backgroundColor: 'lightsteelblue' }}
                    //data={data} 
                    draggable editable canAddLanes editLaneTitle
                    onCardAdd={this.handleCardAdd}
                    data={this.state.boardData}
                    onDataChange={this.shouldReceiveNewData}
                    eventBusHandle={this.setEventBus}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    onCardClick={(cardId, metadata, laneId) => this.onCardClick(cardId, metadata, laneId)}
                    components={{ NewCardForm: PipeproAddCardForm }}
                />
                <PipeproCardInfoForm open={this.state.cardOpen} onCloseCardForm={this.onCloseCardForm}
                    card={this.state.cardSelected} />
            </div>
        );
    }
}

export default Pipepro
