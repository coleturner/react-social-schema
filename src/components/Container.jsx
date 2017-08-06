import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Container extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.any,
    schema: PropTypes.shape({
      '@context': PropTypes.string.isRequired,
      '@type': PropTypes.string.isRequired,
      'name': PropTypes.string,
      'sameAs': PropTypes.array
    }),
    thisComponent: PropTypes.string
  }

  static defaultProps = {
    classNames: 'share-actions',
    thisComponent: 'div'
  }

  static childContextTypes = {
    schema: PropTypes.object
  }

  getChildContext() {
    return {
      schema: this.props.schema
    };
  }

  render() {
    const { children, className, thisComponent: Component, schema, ...otherProps } = this.props;

    const obj = { __html: JSON.stringify(schema) };
    return (
      <Component className={classNames(className)} {...otherProps}>
        <script type="application/ld+json" dangerouslySetInnerHTML={obj} />
        {children}
      </Component>
    );
  }
}
