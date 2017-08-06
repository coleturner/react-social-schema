import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from './BaseButton';
import TumblrIcon from './Icons/Tumblr';
import jsonp from 'jsonp';

import {
  getBodyAttribute,
  getImageAttribute,
  getTitleAttribute,
  getURLAttribute
} from '../selectors';
import popup from '../popup';

export default class TumblrButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    count: PropTypes.number,
    fetchTimeoutMS: PropTypes.number,
    schema: PropTypes.object
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<TumblrIcon />),
    className: 'tumblr',
    count: null,
    fetchTimeoutMS: 3600 * 1000
  }

  static contextTypes = {
    schema: PropTypes.object
  }

  getSchema() {
    return 'schema' in this.props ? this.props.schema : this.context.schema;
  }


  onClick() {
    const url = new URL('https://www.tumblr.com/widgets/share/tool?posttype=photo');
    url.searchParams.set('title', getTitleAttribute(this.getSchema()));
    url.searchParams.set('caption', getBodyAttribute(this.getSchema()));
    url.searchParams.set('canonicalUrl', getURLAttribute(this.getSchema()));

    const image = getImageAttribute(this.getSchema());
    if (image) {
      url.searchParams.set('content', image.url);
    }

    popup(url.toString());
  }

  getCount = () => {
    return new Promise((resolve, reject) => {
      const url = getURLAttribute(this.getSchema());
      const requestURL = new URL('http://api.tumblr.com/v2/share/stats');
      requestURL.searchParams.set('url', url);

      try {
        jsonp(url.toString(), (err, data) => {
          if (!err && !!data && 'response' in data && 'note_count' in data.response) {
            this.setCount(data.response.note_count);
          } else {
            throw new Error('Failed to get Tumblr count...');
          }
        });
      } catch (e) {
        reject(this.state.count);
      }
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
