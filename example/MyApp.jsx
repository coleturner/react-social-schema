import React from 'react';
import PropTypes from 'prop-types';
import Share from '../lib/components/Share';

const MyApp = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <blockquote>{props.description}</blockquote>
      <a href={props.url}>{props.url}</a>

      <Share.Container schema={{
        '@type': 'NewsArticle',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': props.url
        },
        'headline': props.title,
        'image': {
          '@type': 'ImageObject',
          'url': props.image,
        },
        'author': {
          '@type': 'Person',
          'name': props.author
        }
      }}>
        <Share.TwitterButton />
        <Share.FacebookButton />
        <Share.TumblrButton />
        <Share.PinterestButton />
      </Share.Container>
    </div>

  );
};

MyApp.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

MyApp.defaultProps = {
  object: {
    author: 'Cole Turner',
    title: 'Cole Turner - Web Developer',
    description: 'I am a full-stack web developer and communications consultant from Miami, Florida. My passion is to design and build quality interactive websites that improve online communications with a seamless user experience.',
    url: 'cole.codes/',
    image: 'https://pbs.twimg.com/profile_images/808713964557365248/PiNmtuA7_400x400.jpg'
  }
};


export default MyApp;
