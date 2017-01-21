import React from 'react';
import classNames from 'classnames';

export default class Container extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.any,
    schema: React.PropTypes.shape({
      '@context': React.PropTypes.string.isRequired,
      '@type': React.PropTypes.string.isRequired,
      'name': React.PropTypes.string,
      'sameAs': React.PropTypes.array
    }),
    thisComponent: React.PropTypes.string
  }

  static defaultProps = {
    classNames: 'share-actions',
    thisComponent: 'div'
  }

  static childContextTypes = {
    schema: React.PropTypes.object
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
