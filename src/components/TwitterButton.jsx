import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from './BaseButton';
import TwitterIcon from './Icons/Twitter';

import {
  getTitleAttribute,
  getURLAttribute,
  resolveSocial
} from '../selectors';
import popup from '../popup';
export default class TwitterButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    count: PropTypes.number,
    twitterHandle: PropTypes.string,
    tweetID: PropTypes.string,
    schema: PropTypes.object
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<TwitterIcon />),
    className: 'twitter',
    count: null,
    tweetID: null
  }

  static contextTypes = {
    schema: PropTypes.object
  }

  getSchema() {
    return 'schema' in this.props ? this.props.schema : this.context.schema;
  }

  getTwitterHandle() {
    if (this.props.twitterHandle) {
      return this.props.twitterHandle;
    }

    const schema = this.getSchema();
    const twitterProfile = resolveSocial(schema, (a) => a.indexOf('twitter.com') !== -1);

    if (twitterProfile) {
      try {
        const urlObject = new URL(twitterProfile);
        return urlObject.pathname.splice(1);
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  onClick() {
    const url = new URL(this.props.tweetID ? 'https://twitter.com/intent/retweet' : 'https://twitter.com/intent/tweet');
    const twitterHandle = this.getTwitterHandle();

    if (this.props.tweetID) {
      url.searchParams.set('tweet_id', this.props.tweetID);

      if (twitterHandle) {
        url.searchParams.set('related', twitterHandle);
      }
    } else {
      url.searchParams.set('text', getTitleAttribute(this.getSchema()));
      url.searchParams.set('url', getURLAttribute(this.getSchema()));

      if (twitterHandle) {
        url.searchParams.set('via', twitterHandle);
      }
    }

    popup(url.toString());
  }

  getCount = () => {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <BaseButton
        onClick={this.onClick}
        getCount={this.getCount}
        {...otherProps}>
        {children}
      </BaseButton>
    );
  }
}
