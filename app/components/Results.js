import React from 'react'
import { battle } from '../utils/api.js'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'
import Card from './Card.js'
import PropTypes from 'prop-types'
import Loading from './Loading.js'
import Tooltip from './Tooltip.js'


function ProfileList ({profile}) {
    const { name, location, company, followers, following } = profile;

    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgba(239, 115, 115)' size={22} />
                {name}
            </li>
            {location && (
                <li>
                    <Tooltip text="User's location">
                        <FaCompass color='rgb(144, 115, 255)' size={22}/>
                        {location}
                    </Tooltip>
                </li>
            )}
            {company && (
                <li>
                    <Tooltip text="User's company">
                        <FaBriefcase color='#795548' size={22}/>
                        {company}
                    </Tooltip>
                </li>
            )}
            <li>
                <FaUsers color='rgba(129, 195, 245)' size={22} />
                {followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgba(64, 183, 95)' size={22} />
                {following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        const { playerOne, playerTwo } = this.props

        battle([playerOne, playerTwo])
            .then(players => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message,
                    loading: false
                })
            })
    }

    render() {
        const { winner, loser, error, loading } = this.state
        const { onReset } = this.props

        if (loading) {
            return <Loading text='Battling'/>
        }

        if(error) {
            return <p className='center-text error'>{error}</p>
        }

        return (
            <React.Fragment>
                <div className='grid space-around container-sm'>

                    <Card 
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        name={winner.profile.login}
                        href={winner.profile.html_url}
                    >
                        <ProfileList
                            profile={winner.profile}
                        />
                    </Card>

                    <Card 
                        header={winner.score === loser.score ? 'Tie' : 'Loser'}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        name={loser.profile.login}
                        href={loser.profile.html_url}
                    >
                        <ProfileList
                            profile={loser.profile}
                        />
                    </Card>
                </div>
                <button
                    className='btn btn-dark btn-space'
                    onClick={onReset}
                >
                    Reset
                </button>
        </React.Fragment>
        )
    }
}

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}