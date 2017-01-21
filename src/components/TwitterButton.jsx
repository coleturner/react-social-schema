import React from 'react';
import BaseButton from './BaseButton';
import TwitterIcon from './Icons/Twitter';

export default class TwitterButton extends BaseButton {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    count: React.PropTypes.number
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<TwitterIcon />),
    className: 'twitter',
    count: null,
    tweetID: null
  }

  getTwitterHandle() {
    if ('twitterHandle' in this.props && this.props.twitterHandle) {
      return this.props.twitterHandle;
    }

    const schema = this.getSchema();
    const twitterProfile = this.constructor.resolveSocial(schema, (a) => a.indexOf('twitter.com') !== -1);

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
      url.searchParams.set('text', this.constructor.getTitleAttribute(this.getSchema()));
      url.searchParams.set('url', this.constructor.getURLAttribute(this.getSchema()));

      if (twitterHandle) {
        url.searchParams.set('via', twitterHandle);
      }
    }

    this.constructor.popup(url.toString());
  }

  getCount() {
    return this.props.count;
  }

  updateCount() {
    // Thanks Twitter...
    return null;
  }
}
