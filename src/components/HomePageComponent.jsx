import React from 'react'
import PropTypes from 'prop-types'
import PageComponent from './PageComponent'
import JoinSessionComponent from './JoinSessionComponent';
import StartNewSessionComponent from './StartNewSessionComponent';

const HomePageComponent = ({isFollower, sessionId, onStartSession}) => (
  <PageComponent>
    <div className="home-page">
      <h1 className="home-page__title">P2P Editor</h1>
      {isFollower ?
          <JoinSessionComponent sessionId={sessionId} onJoinSession={onStartSession} /> :
          <StartNewSessionComponent onStartSession={onStartSession} />
      }
    </div>
  </PageComponent>
)

HomePageComponent.propTypes = {
    sessionId: PropTypes.string,
    isFollower: PropTypes.bool,
    onStartSession: PropTypes.func.isRequired
}

export default HomePageComponent
