import React from 'react';
import classNames from 'classnames';
import Schema from './Schema';

export default class BaseButton extends React.PureComponent {
  static propTypes = {
    buttonComponent: React.PropTypes.string,
    className: React.PropTypes.any,
    children: React.PropTypes.node,
    countComponent: React.PropTypes.string,
    count: React.PropTypes.number,
    fetchTimeoutMS: React.PropTypes.number,
    schema: React.PropTypes.object,
    twitterID: React.PropTypes.number
  }

  static contextTypes = {
    attachToContainer: React.PropTypes.func,
    unattachFromContainer: React.PropTypes.func,
    schema: React.PropTypes.object
  }

  static popup(url, inputOptions, callback) {
    const defaults = { width: '850', height: '650', toolbar: 0, scrollbars: 1, location: 0, statusbar: 0, menubar: 0, resizable: 1 };
    const options = Object.assign({}, defaults, inputOptions);
    const name = options.name;

    const data = [];
    for (let [key, value] of Object.entries(options)) {
      data.push(key + '=' + encodeURIComponent(value));
    }

    const x = window.open(url, name, data.join(','));
    if (typeof callback === 'function') {
      const popUpInt = setInterval(() => {
        if (!x || x.closed) {
          callback();
          clearInterval(popUpInt);
        }
      }, 300);

    }

    return x;
  }

  static getTitleAttribute(schema) {
    return schema.headline;
  }

  static getBodyAttribute(schema) {
    return schema.description || null;
  }

  static getURLAttribute(schema) {
    if ('mainEntityOfPage' in schema && '@id' in schema.mainEntityOfPage) {
      return schema.mainEntityOfPage['@id'];
    } else if ('publisher' in schema) {
      return schema.publisher.url;
    } else if (typeof location !== 'undefined') {
      return location.href;
    }

    return null;
  }

  static getImageAttribute(schema) {
    if ('image' in schema) {
      return schema.image;
    } else if ('image' in schema.author) {
      return schema.author.image;
    } else if ('logo' in schema.publisher) {
      return schema.publisher.logo;
    }

    const foundImage = Schema.findObjectByType(schema, 'ImageObject');

    if (foundImage) {
      return foundImage;
    }

    return null;
  }

  static resolveSocial(schema, test) {
    if (typeof 'sameAs' in schema) {
      let testValue = schema.sameAs.find(test);
      if (testValue) {
        return testValue;
      }
    }

    for (let key of ['author', 'publisher', 'provider']) {
      if (key in schema && 'sameAs' in schema[key]) {
        let testValue = schema[key].sameAs.find(test);
        if (testValue) {
          return testValue;
        }
      }
    }

    return null;
  }

  constructor(...args) {
    super(...args);

    this.bindOnClick = () => this.onClick();
  }

  componentWillMount() {
    if ('attachToContainer' in this.context && typeof this.context.attachToContainer === 'function') {
      this.context.attachToContainer(this);
    }
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => {
      this.updateCount();
    }, this.props.fetchTimeoutMS || (3600 * 1000));
  }

  componentWillUnmount() {
    if ('unattachFromContainer' in this.context && typeof this.context.unattachFromContainer === 'function') {
      this.context.unattachFromContainer(this);
    }
  }

  state = { lastFetch: null, count: null }
  updateInterval = null;

  getSchema() {
    return 'schema' in this.props ? this.props.schema : this.context.schema;
  }

  setCount(count) {
    if ('count' in this.props && this.props.count !== null) {
      return null;
    }

    return this.setState({ count, lastFetch: new Date().getTime() });
  }

  getCount() {
    if ('count' in this.props && this.props.count !== null) {
      return this.props.count;
    }

    if (this.state.count !== null && this.state.lastFetch + this.props.fetchTimeoutMS > (new Date()).getTime()) {
      return this.state.count;
    }

    this.updateCount();
    return this.state.count;
  }

  updateCount() {
    throw new 'Objects extending BaseButton must implement updateCount()';
  }

  countNode() {
    if (this.props.count === null) {
      return null;
    }

    const { countComponent: Component } = this.props;

    return (
      <Component className="count">{this.props.count}</Component>
    );
  }

  render() {
    const { buttonComponent: Component, children, className, count, countComponent, fetchTimeoutMS, schema, twitterID, ...otherProps } = this.props;
    return (
      <Component onClick={this.bindOnClick} className={classNames('share-button', className)} {...otherProps}>
        {children}
        {this.countNode()}
      </Component>
    );
  }
}
