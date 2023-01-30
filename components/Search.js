import React from 'react';
import './Search.css';
import axios from 'axios';

class Search extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            count: 0,
            query: '',
            results: {},
            loading: false,
            message: '',
            isVegan: false,
        };
        this.cancel = '';
    }
    
    setVegan() {
        if (document.getElementById("vegan-filter").checked) {
            this.isVegan = true;
        }
    }
    
    fetchSearchResults = (query) => {
        let searchKeyWord = document.getElementById("search-input").value;
        let apiKey = "507872abd58655867817f88b91eef2d4";
        let apiID = "0b073934";
        
        // if isVegan is true, then use isVegan in url
        let urlString = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchKeyWord + "&app_id=" + apiID + "&app_key=" + apiKey;
        if (this.state.isVegan) {
            urlString += "&health=vegan";
        }
        
        const url = encodeURI(urlString);

        if (this.cancel) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios.get(url, {
			cancelToken: this.cancel.token,
		})
		.then((res) => {
			const resultNotFoundMsg = !res.data.hits.length
				? 'There are no more search results. Please try a new search.'
				: '';			
            this.setState({
                count: res.data.count,
                results: res.data.hits,
                message: resultNotFoundMsg,
                loading: false,
			});
		})
        .catch((error) => {
            if (axios.isCancel(error) || error) {
                this.setState({
                    loading: false,
                    message: 'Failed to fetch results.',
                }); 
            }
        });
    }

    renderSearchResults = () => {
        const {results} = this.state;	
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    <p className="result-count">Found {this.state.count} recipes</p>
                    {results.map((result) => {
                        return (
                            <div className="recipe">
                                <a href={result.recipe.url} className="result-items">{result.recipe.label}</a>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    render() {
        return (
            <div className="container">
                <h1 className="heading">Recipe Search</h1>
                <div id="filter">
                    <label for="vegan-filter">Vegan</label><input type="radio" className="vegan-filter" onClick={(state) => this.setState({isVegan:true})}/>
                </div>
                <label className="search-label" htmlFor="search-input">
                    <input 
                        type="text" 
                        id="search-input" 
                        placeholder="Search..."
                    />
                    <i className="fa fa-search search-icon" onClick={this.fetchSearchResults}/>
                </label>
                <h2>Results </h2>
                {this.renderSearchResults()}
            </div>  
        )
    }
}

export default Search;