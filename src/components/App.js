import React from 'react';
import { connect } from 'react-redux';

import TrelloList from './TrelloList';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from '../actions';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class App extends React.Component {

  onDragEnd = (result) => {
    //TODO: rendering logic
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return; //if dragging it to outside of list 
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))

  }

  render() {
    const { list } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                {list.map((list, index) =>
                  <TrelloList
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />)}
                <TrelloActionButton list />
              </ListContainer>
            )}
          </Droppable>

        </div>
      </DragDropContext>
    );
  }
}

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row"
  }
}

const mapStateToProps = state => ({
  list: state.list
})


export default connect(mapStateToProps)(App);
