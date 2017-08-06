import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class BaseButton extends React.PureComponent {
  static propTypes = {
    buttonComponent: PropTypes.string,
    className: PropTypes.any,
    children: PropTypes.node,
    countComponent: PropTypes.string,
    count: PropTypes.number,
    getCount: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    fetchTimeoutMS: PropTypes.number,
    schema: PropTypes.object,
    twitterID: PropTypes.number
  }

  static contextTypes = {
    attachToContainer: PropTypes.func,
    schema: PropTypes.object
  }

  state = { lastFetch: null, count: null }
  updateInterval = null;

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

    this.props.getCount().then(this.setCount).catch(e => {
      console.warn(`Error while fetching count: ${e}`);
    });

    return this.state.count;
  }


  countNode() {
    if (this.props.count === null) {
      return null;
    }

    const { countComponent: Component } = this.props;

    return (
      <Component className="count">{this.getCount()}</Component>
    );
  }

  render() {
    const {
      buttonComponent: Component,
      children,
      className,
      count,
      countComponent,
      fetchTimeoutMS,
      schema,
      twitterID,
      ...otherProps
    } = this.props;

    return (
      <Component
        onClick={this.props.onClick}
        className={classNames('share-button', className)}
        {...otherProps}
      >
        {children}
        {this.countNode()}
      </Component>
    );
  }
}
