import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from './BaseButton';
import PinterestIcon from './Icons/Pinterest';
import jsonp from 'jsonp';

import {
  getImageAttribute,
  getTitleAttribute,
  getURLAttribute
} from '../selectors';
import popup from '../popup';

export default class PinterestButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    count: PropTypes.number,
    fetchTimeoutMS: PropTypes.number,
    schema: PropTypes.object
  }

  static defaultProps = {
    buttonComponent: 'button',
    countComponent: 'span',
    children: (<PinterestIcon />),
    className: 'pinterest',
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
    const url = new URL('https://pinterest.com/pin/create/button');
    url.searchParams.set('description', getTitleAttribute(this.getSchema()));
    url.searchParams.set('url', getURLAttribute(this.getSchema()));

    const image = getImageAttribute(this.getSchema());
    if (image) {
      url.searchParams.set('media', image.url);
    }

    popup(url.toString());
  }

  getCount() {
    return new Promise((resolve, reject) => {
      const url = getURLAttribute(this.getSchema());
      const requestURL = new URL('https://api.pinterest.com/v1/urls/count.json');
      requestURL.searchParams.set('url', url);

      try {
        jsonp(url.toString(), (err, data) => {
          if (!err && !!data && 'count' in data) {
            resolve(data.count);
          } else {
            throw new Error('Failed to get Pinterest count...');
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
