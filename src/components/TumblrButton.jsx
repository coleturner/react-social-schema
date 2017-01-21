import React from 'react';
import BaseButton from './BaseButton';
import TumblrIcon from './Icons/Tumblr';
import jsonp from 'jsonp';

export default class TumblrButton extends BaseButton {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    count: React.PropTypes.number,
    fetchTimeoutMS: React.PropTypes.number
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<TumblrIcon />),
    className: 'tumblr',
    count: null,
    fetchTimeoutMS: 3600 * 1000
  }

  onClick() {
    const url = new URL('https://www.tumblr.com/widgets/share/tool?posttype=photo');
    url.searchParams.set('title', this.constructor.getTitleAttribute(this.getSchema()));
    url.searchParams.set('caption', this.constructor.getBodyAttribute(this.getSchema()));
    url.searchParams.set('canonicalUrl', this.constructor.getURLAttribute(this.getSchema()));

    const image = this.constructor.getImageAttribute(this.getSchema());
    if (image) {
      url.searchParams.set('content', image.url);
    }

    this.constructor.popup(url.toString());
  }

  updateCount() {
    const url = this.constructor.getURLAttribute(this.getSchema());
    const requestURL = new URL('http://api.tumblr.com/v2/share/stats');
    requestURL.searchParams.set('url', url);

    try {
      jsonp(url.toString(), (err, data) => {
        if (!err && !!data && 'response' in data && 'note_count' in data.response) {
          this.setCount(data.response.note_count);
        } else {
          throw new 'Failed to get Tumblr count...';
        }
      });
    } catch (e) {
      this.setCount(this.state.count);
    }
  }
}
