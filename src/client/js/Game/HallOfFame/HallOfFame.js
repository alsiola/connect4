import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import PlayerList from './PlayerList';
import { loadHallOfFameData, changePage } from '../../Redux/ActionCreators/HallOfFame';
import { pages, currentPage, isLoading, loadFailed } from '../../Redux/Selectors/HallOfFame';

class HallOfFame extends React.Component {
    onOpen() {
        this.props.loadHallOfFameData()
    }

    incrementPage(i) {
        this.props.changePage({
            page: this.props.currentPage + i
        });
    }

    render() {
        return (
            <Modal 
                show={this.props.show} 
                onHide={() => this.props.hide()} 
                onEnter={() => this.onOpen()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Hall Of Fame</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.isLoading &&
                        <div>Loading...</div>    
                    }
                    {this.props.loadFailed &&
                        <div>Something went wrong, sorry. <Button onClick={() => this.onOpen()}>Try Again</Button></div>    
                    }
                    {(!this.props.isLoading && !this.props.loadFailed) &&
                        <div>
                            <PlayerList />

                            <ButtonToolbar>
                                <Button onClick={() => this.incrementPage(-1)} disabled={this.props.currentPage <= 1}>Previous</Button>                        
                                <Button onClick={() => this.incrementPage(+1)} disabled={(this.props.currentPage + 1) > this.props.pages}>Next</Button>
                            </ButtonToolbar>
                            
                            <div>
                                Page {this.props.currentPage} of {this.props.pages} pages.
                            </div>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

HallOfFame.propTypes = {
    show: React.PropTypes.bool.isRequired,
    hide: React.PropTypes.func.isRequired,
    pages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    loadFailed: React.PropTypes.bool.isRequired,
    loadHallOfFameData: React.PropTypes.func.isRequired,
    changePage: React.PropTypes.func.isRequired
}

export default connect(state => ({
    pages: pages(state),
    currentPage: currentPage(state),
    isLoading: isLoading(state),
    loadFailed: loadFailed(state)
}),
{
    loadHallOfFameData,
    changePage
})(HallOfFame);