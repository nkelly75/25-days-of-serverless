import React from 'react';
import axios from 'axios';

import './Form.css';

const CREATE_WISH_FUNC = 'https://ngk25dos11.azurewebsites.net/api/CreateWish';

class Form extends React.Component {
    state = {
        description: '',
        kidName: '',
        address: '',
        wishType: ''
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        console.dir(this.state);

        const headers = {
            'Content-Type': 'application/json'
        };
        const response = await axios.post(CREATE_WISH_FUNC, this.state, {
            headers: headers
        });
        console.dir(response);

        this.setState({
            description: '',
            kidName: '',
            address: '',
            wishType: ''
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span className="formtext">Christmas Wish</span>
                <fieldset>
                    <div className="block">
                        <label>Desribe your wish</label>
                        <input type="text"
                            placeholder="Enter description"
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                            required />
                    </div>
                    <div className="block">
                        <label>Your Name</label>
                        <input type="text"
                            placeholder="Enter your name"
                            value={this.state.kidName}
                            onChange={event => this.setState({ kidName: event.target.value })}
                            required />
                    </div>
                    <div className="block">
                        <label>Your Address</label>
                        <input type="text"
                            placeholder="Enter your address"
                            value={this.state.address}
                            onChange={event => this.setState({ address: event.target.value })}
                            required />
                    </div>
                    <div className="block">
                        <label>Wish Type</label>
                        <input type="text"
                            placeholder="e.g. toy, clothes, animal"
                            value={this.state.wishType}
                            onChange={event => this.setState({ wishType: event.target.value })}
                            required />
                    </div>
                </fieldset>
                <p>
                    <button>Send to Santa!</button>
                </p>
            </form>
        );
    }
}

export default Form;