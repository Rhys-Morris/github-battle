import React from 'react';
import PropTypes from 'prop-types';
import fetchPopularRepos from '../utils/api.js'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function LanguagesNav({ selected, onUpdateLanguage}) {
    const languages = [
        'All',
        'JavaScript',
        'Ruby', 
        'Java', 
        'CSS',
        'Python'
    ]
    return (
        <ul className="flex-center">
            {languages.map((lang) => {
                return (
                    <li key={ lang }>
                        <button 
                            className='btn-clear nav-link' 
                            onClick={ () => onUpdateLanguage(lang) }
                            style={ lang === selected ? {color: 'red'} : null }>
                            { lang }
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }) {
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { owner, name, html_url, stargazers_count, forks, open_issues } = repo;
                const { login, avatar_url } = owner

                return (
                    <li key={html_url} className='repo bg-light'>
                        <h4 className='header-lg center-text'>#{index + 1}</h4>
                        <img 
                        className='avatar'
                        src={avatar_url}
                        alt={`Avatar for ${login}`}/>
                        <h2 className='center-text'>
                            <a className='link' href={html_url}>
                                {login}
                            </a>
                        </h2>
                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22} />
                                <a href={`https://github.com/${login}`}>
                                    {login}
                                </a>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                {open_issues.toLocaleString()} open issues
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            errorMessage: null
        }

        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            errorMessage: null
        });

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then(data => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch(errorMessage => {
                    console.warn(`Error fetching repos ${errorMessage}`)

                    this.setState({
                        errorMessage: 'There was an error fetching the repositories'
                    })
                })
        }
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    isLoading() {
        const { selectedLanguage, errorMessage, repos } = this.state;
        return !repos[selectedLanguage] && errorMessage === null;
    }
    
    render() {
        const { selectedLanguage, repos, errorMessage } = this.state;

        return (
            <React.Fragment>
                <LanguagesNav 
                  selected={selectedLanguage} 
                  onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>LOADING</p>}

                {errorMessage && <p>{errorMessage}</p>}

                {repos[selectedLanguage] &&  <ReposGrid repos={repos[selectedLanguage]}/>}
            </React.Fragment>
        )
    }
}

export default Popular;