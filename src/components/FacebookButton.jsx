import React from 'react';
import BaseButton from './BaseButton';
import FacebookIcon from './Icons/Facebook';
import jsonp from 'jsonp';

export default class FacebookButton extends BaseButton {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    count: React.PropTypes.number,
    fetchTimeoutMS: React.PropTypes.number
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<FacebookIcon />),
    className: 'facebook',
    count: null,
    fetchTimeoutMS: 3600 * 1000
  }

  onClick() {
    const url = new URL('https://www.facebook.com/sharer/sharer.php?s=100');
    url.searchParams.set('p[title]', this.constructor.getTitleAttribute(this.getSchema()));
    url.searchParams.set('p[summary]', this.constructor.getBodyAttribute(this.getSchema()));
    url.searchParams.set('p[url]', this.constructor.getURLAttribute(this.getSchema()));

    const image = this.constructor.getImageAttribute(this.getSchema());

    if (image) {
      url.searchParams.set('p[images][0]', image.url);
    }

    this.constructor.popup(url.toString());
  }

  updateCount() {
    const url = this.constructor.getURLAttribute(this.getSchema());
    const requestURL = new URL('https://graph.facebook.com');
    requestURL.searchParams.set('id', url);

    try {
      jsonp(url.toString(), (err, data) => {
        if (!err && !!data && 'share' in data && 'share_count' in data.share) {
          this.setCount(data.share.share_count);
        } else {
          throw new 'Failed to get Facebook count...';
        }
      });
    } catch (e) {
      this.setCount(this.state.count);
    }
  }
}
