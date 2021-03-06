import React from 'react';
const {PropTypes} = React;
import Radium from 'radium';
import {browserHistory, Link} from 'react-router';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

import Button from '../../Button/Button.jsx';
import Icon from '../../Icon/Icon.jsx';
import SocialIcons from '../../SocialIcons/SocialIcons.jsx';

import {
  BREAKPOINTS,
  COLORS,
  DIMENSIONS,
  ICONS,
  MODALS,
  SIGN_IN_STATUSES,
} from '../../../constants.js';

import {css} from '../../../utils';

import {EVENTS} from '../../../tracker.js';

const baseStyles = {
  header: {
    position: 'absolute',
    width: '100%',
    height: DIMENSIONS.SPACE_L * 3,
    backgroundColor: COLORS.PRIMARY_DARK,
  },
  headerContent: {
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: COLORS.WHITE,
    height: DIMENSIONS.SPACE_L,
    padding: '0 8px',
    [BREAKPOINTS.TABLET_LANDSCAPE]: {
      padding: `0 ${DIMENSIONS.SPACE_M}px`,
    },
  },
  title: {
    fontSize: 35,
  },
  actionItems: {
    display: 'flex',
    alignItems: 'center',
  },
  headerButton: {
    height: DIMENSIONS.SPACE_M,
    color: COLORS.WHITE,
    marginLeft: DIMENSIONS.LAYOUT.HEADER_SPACING,
  },
  signInOrOutButton: {
    color: COLORS.WHITE,
    marginLeft: DIMENSIONS.LAYOUT.HEADER_SPACING,
  },
  homePageHeaderButton: {
    margin: '15px 15px 15px 0',
    fontWeight: 400,
    padding: '10px 20px',
    [BREAKPOINTS.TABLET_PORTRAIT]: {
      minWidth: '120px',
    },
  },
  headerMinorButton: {
    textDecoration: 'underline',
    textTransform: 'none',
  },
  headerSecondaryButton: {
    textDecoration: 'underline',
    [BREAKPOINTS.PHONE_ONLY]: {
      textTransform: 'none',
    },
    [BREAKPOINTS.TABLET_PORTRAIT]: {
      textDecoration: 'none',
      border: `1px solid ${COLORS.WHITE}`,
    },
  },
  headerPrimaryButton: {
    backgroundColor: COLORS.ACCENT,
    color: COLORS.WHITE,
    ...css.shadow('small'),
  },
  showForPhoneOnly: {
    [BREAKPOINTS.TABLET_PORTRAIT]: {
      display: 'none',
    },
  },
  showForTabletPortraitUp: {
    [BREAKPOINTS.PHONE_ONLY]: {
      display: 'none',
    },
  },
  userName: {
    marginRight: 20,
    display: 'none',
    [BREAKPOINTS.TABLET_LANDSCAPE]: {
      display: 'inline-block',
    },
  },
  gettingStarted: {
    marginRight: 20,
  },
};

class Header extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(nextProps.user, this.props.user) ||
      !isEqual(nextProps.location, this.props.location)
    );
  }

  render() {
    const {user, updateUser, showModal, signOut, location, navigateToProject} = this.props;
    const styles = cloneDeep(baseStyles);

    const actionItems = {
      signInButton: (
        <Button
          key="signInButton"
          style={{...styles.homePageHeaderButton, ...styles.headerSecondaryButton}}
          category={EVENTS.CATEGORIES.UI_INTERACTION}
          action={EVENTS.ACTIONS.CLICKED.SIGN_IN}
          label="Header button"
          onClick={() => {
            showModal(MODALS.SOCIAL_SIGN_IN);
          }}
        >
          {MALLA_TEXT.signIn}
        </Button>
      ),
      signUpButton: (
        <Button
          key="signUpButton"
          style={{...styles.homePageHeaderButton, ...styles.headerPrimaryButton}}
          category={EVENTS.CATEGORIES.UI_INTERACTION}
          action={EVENTS.ACTIONS.CLICKED.SIGN_UP}
          label="Header button"
          onClick={() => {
            showModal(MODALS.SOCIAL_SIGN_IN);
          }}
        >
          {MALLA_TEXT.signUp}
        </Button>
      ),
      showHelp: (
        <Button
          key="showHelp"
          style={styles.headerButton}
          category={EVENTS.CATEGORIES.UI_INTERACTION}
          action={EVENTS.ACTIONS.SHOWED_HELP}
          label="Header button"
          onClick={() => {
            updateUser({
              showHelp: true,
            });
          }}
        >{MALLA_TEXT.help}</Button>
      ),
      signOutButton: (
        <Button
          key="signOutButton"
          style={styles.signInOrOutButton}
          onClick={signOut}
          category={EVENTS.CATEGORIES.UI_INTERACTION}
          action={EVENTS.ACTIONS.CLICKED.SIGN_OUT}
          label="Header button"
        >{MALLA_TEXT.signOut}</Button>
      ),
      myProjects: (
        <Button
          key="myProjects"
          style={{...styles.homePageHeaderButton, ...styles.headerSecondaryButton}}
          category={EVENTS.CATEGORIES.UI_INTERACTION}
          action={EVENTS.ACTIONS.CLICKED.MY_PROJECTS}
          label="Header button"
          onClick={() => {
            if (user.lastUrl) {
              browserHistory.push(user.lastUrl);
            } else {
              navigateToProject();
            }
          }}
        >My workspace</Button>
      ),
      gettingStarted: (
        <span
          key="gettingStarted"
          style={styles.gettingStarted}
        >
          <Link to="/docs/getting-started">Getting started guide</Link>
        </span>
      ),
      userName: (
        <span
          key="userName"
          style={styles.userName}
          title={`Signed in with ${user.provider}`}
        >{user.name}</span>
      ),
      feedback: (
        <Button
          key="feedback"
          style={styles.headerButton}
          category={EVENTS.CATEGORIES.UI_INTERACTION}
          action={EVENTS.ACTIONS.CLICKED.FEEDBACK}
          label="Header button"
          title={MALLA_TEXT.feedbackTooltip}
          onClick={() => {
            showModal(MODALS.FEEDBACK);
          }}
        >
          <Icon
            color={COLORS.WHITE}
            icon={ICONS.BUBBLE}
            size={22}
          />
        </Button>
      ),
    };

    const atHome = location && location.pathname === '/';
    const inTheGuide = location && location.pathname === '/docs/getting-started';
    const inTheApp = location && location.pathname && location.pathname.startsWith('/s/');
    const signedIn = user.signInStatus === SIGN_IN_STATUSES.SIGNED_IN;

    const actionItemElements = [];
    let homeLink = null;

    if (atHome) {
      styles.header.backgroundColor = 'transparent';
      styles.header.height = DIMENSIONS.LAYOUT.HEADER_HEIGHT_HOME;

      actionItemElements.push(
        <span
          key="gettingStarted"
          style={styles.gettingStarted}
        >
          <Link to="/docs/getting-started">Getting started guide</Link>
        </span>
      );
    }

    if (atHome || inTheGuide) {
      if (signedIn) {
        actionItemElements.push(actionItems.myProjects);
        actionItemElements.push(actionItems.signOutButton);
      } else {
        actionItemElements.push(actionItems.signInButton);
        actionItemElements.push(actionItems.signUpButton);
      }
    }

    if (inTheApp) {
      actionItemElements.push(
        <span
          key="gettingStarted"
          style={styles.gettingStarted}
        >
          <Link to="/docs/getting-started">Help</Link>
        </span>
      );

      if (signedIn) {
        actionItemElements.push(actionItems.userName);
        actionItemElements.push(actionItems.signOutButton);
        actionItemElements.push(<SocialIcons key="socialButtons" buttonHeight={styles.headerButton.height} />);
        actionItemElements.push(actionItems.feedback);
      }
    }

    if (inTheApp || inTheGuide) {
      homeLink = (
        <h1 style={styles.title}>
          <Link to="/">{MALLA_TEXT.title}</Link>
        </h1>
      );
    }

    return (
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            {homeLink}
          </div>

          <div style={styles.actionItems}>
            {actionItemElements}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  // state
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // actions
  showModal: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  navigateToScreen: PropTypes.func.isRequired,
  navigateToProject: PropTypes.func.isRequired,
};

export default Radium(Header);
