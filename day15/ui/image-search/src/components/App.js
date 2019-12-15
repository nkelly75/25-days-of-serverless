import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

// const IMAGE_SEARCH_FUNC = 'http://localhost:7071/api/ImageSearch?code=R3KMbSSkWj2WQOVlN0NRifcjohatOZmbkFYzlP8FRTf9abxWnHpiFQ==';
const IMAGE_SEARCH_FUNC = 'https://ngk25dos15.azurewebsites.net/api/ImageSearch?code=tTvEsyS8Zr3V3P8GRfM8P7rcaG/fZ5VU6ch0N4MnSaah7h8nYIAESQ==';

class App extends React.Component {

    state = { images: [] };

    onSearchSubmit = async (term) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        const response = await axios.get(IMAGE_SEARCH_FUNC + '&text=' + term,
            {
                headers:
                    headers
            });

        this.setState({ images: response.data });
    }

    render() {
        return (
            <div>
                <SearchBar userSubmit={this.onSearchSubmit} />
                <ImageList foundImages={this.state.images} />
            </div>
        )
    }
}


export default App;