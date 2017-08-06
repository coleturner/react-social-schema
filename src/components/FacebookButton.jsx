import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from './BaseButton';
import FacebookIcon from './Icons/Facebook';
import jsonp from 'jsonp';

import {
  getBodyAttribute,
  getImageAttribute,
  getTitleAttribute,
  getURLAttribute
} from '../selectors';
import popup from '../popup';

export default class FacebookButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    count: PropTypes.number,
    fetchTimeoutMS: PropTypes.number,
    schema: PropTypes.object
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<FacebookIcon />),
    className: 'facebook',
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
    const url = new URL('https://www.facebook.com/sharer/sharer.php?s=100');
    url.searchParams.set('p[title]', getTitleAttribute(this.getSchema()));
    url.searchParams.set('p[summary]', getBodyAttribute(this.getSchema()));
    url.searchParams.set('p[url]', getURLAttribute(this.getSchema()));

    const image = getImageAttribute(this.getSchema());

    if (image) {
      url.searchParams.set('p[images][0]', image.url);
    }

    popup(url.toString());
  }

  getCount = () => {
    return new Promise((resolve, reject) => {
      const url = getURLAttribute(this.getSchema());
      const requestURL = new URL('https://graph.facebook.com');
      requestURL.searchParams.set('id', url);

      try {
        jsonp(url.toString(), (err, data) => {
          if (!err && !!data && 'share' in data && 'share_count' in data.share) {
            resolve(data.share.share_count);
          } else {
            throw new Error('Failed to get Facebook count...');
          }
        });
      } catch (e) {
        reject(e);
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
