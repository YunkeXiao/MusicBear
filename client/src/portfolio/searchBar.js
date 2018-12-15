import React from 'react';
import * as helpers from '../helpers';

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();


class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchArtist = this.searchArtist.bind(this);
        this.chooseArtist = this.chooseArtist.bind(this);
        this.state = {
            userInput: '',
            searchResults: [],
        }
    }

    // Look for artists using indexOf on our database of artists
    searchArtist = (search) => {
        // let url = 'http://musicbear.herokuapp.com/api/artists/?search=' + search.replace(' ', '+');
        let url = 'http://localhost:5000/api/artists/?search=' + search.replace(' ', '+');
        xhr.open('GET', url, true);
        xhr.onload = () => {
            let json = JSON.parse(xhr.responseText);
            let artistList = [];
            json.forEach((artist) => {
                artistList.push(artist)
            });
            this.setState({searchResults: artistList});
        };
        xhr.send();
    };

    // BUGS: NEED DATABASE
    chooseArtist = (name) => {
        let artist = (() => {
            for (let item of this.state.searchResults) {
                if (name === item.name) {
                    return item
                }
            }
        })();
        this.props.chooseArtist(artist.name, artist.listeners);
        console.log(artist);
    };

    handleSubmit() {
        this.searchArtist(this.state.userInput);
    }

    handleInput(e) {
        this.setState({userInput: e.target.value})
    }

    render() {
        let artistList = this.state.searchResults.map((artist) => {
            return <li className="artistItem" key={artist.name}
                       onClick={() => this.chooseArtist(artist.name)}>{helpers.capitalize(artist.name)}</li>
        });
        return (
            <div id='search'>
                <label>
                    <span className='label'>Search:</span><br/>
                    <div id='searchInputs'>
                        <input type='text' placeholder="Enter the artist's name" id='searchInput'
                               onChange={this.handleInput} value={this.state.userInput}/>
                        <input type='button' value='Go' onClick={this.handleSubmit} id='searchButton'/>
                    </div>
                    <ul id='artistList'>{artistList}</ul>
                </label>
            </div>
        )
    }
}

export default SearchBar;
