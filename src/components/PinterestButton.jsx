import React from 'react';
import BaseButton from './BaseButton';
import PinterestIcon from './Icons/Pinterest';
import jsonp from 'jsonp';

export default class PinterestButton extends BaseButton {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    count: React.PropTypes.number,
    fetchTimeoutMS: React.PropTypes.number
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<PinterestIcon />),
    className: 'pinterest',
    count: null,
    fetchTimeoutMS: 3600 * 1000
  }

  onClick() {
    const url = new URL('https://pinterest.com/pin/create/button');
    url.searchParams.set('description', this.constructor.getTitleAttribute(this.getSchema()));
    url.searchParams.set('url', this.constructor.getURLAttribute(this.getSchema()));

    const image = this.constructor.getImageAttribute(this.getSchema());
    if (image) {
      url.searchParams.set('media', image.url);
    }

    this.constructor.popup(url.toString());
  }

  updateCount() {
    const url = this.constructor.getURLAttribute(this.getSchema());
    const requestURL = new URL('https://api.pinterest.com/v1/urls/count.json');
    requestURL.searchParams.set('url', url);

    try {
      jsonp(url.toString(), (err, data) => {
        if (!err && !!data && 'count' in data) {
          this.setCount(data.count);
        } else {
          throw new 'Failed to get Pinterest count...';
        }
      });
    } catch (e) {
      this.setCount(this.state.count);
    }
  }
}
