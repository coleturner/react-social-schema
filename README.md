# react-social-schema
A hybrid implementation of Social Share Buttons and Structured Data.

## Why?
Structured data is valuable for search engines to discover information in your web application. This approach uses the structured data provided as props to create the stories used in social sharing buttons so you only have to worry about one set of data.


## Features
* Share buttons for Facebook, Twitter, Tumblr, and Pinterest
  * Live refreshing for all except Twitter.
  * Intent opens in a popup window


* Structured Data
  * Provides data for share intents - two birds with one stone!

## Install
`yarn add react-social-schema`

Because it's 2017. Yarn rocks.

# Compatibility
Built with React v15 and Chrome 55, not yet tested elsewhere.

## How to use
See `./example/MyApp.jsx`

---

# API
## Container
| Props | Default Value | Description |
| --- | --- | --- |
| schema | not set | The `schema` object that will be passed down via context. |
| className | `"share-actions"` | The class name that will be given to the container component. |
| thisComponent | `"div"` | The HTML element or React Component that will be used as the container. |

## render()
Returns the wrapper component, a `<script>` tag containing the JSON schema, and whatever `children` are passed to this component.

---

## BaseButton
| Props | Default Value | Description |
| --- | --- | --- |
| buttonComponent | `'button'` | Component or HTML element to use for the button. |
| countComponent | `'span'` | Component or HTML element to use for the count display. |
| children | `<FacebookIcon />` | Inner HTML for the button component. |
| className | `'facebook'` | For the button. |
| count | `null` | If set, live refreshing will be disabled. |
| fetchTimeoutMS | `3600 * 1000` | Interval in milliseconds to live refresh the count. |

| State | Description |
| --- | --- |
| count | Contains the value of the last fetched count. |
| lastFetch | The timestamp (in milliseconds) of the last fetch |

### static popup(url, inputOptions, callback)
Spawns a new popup window. If specified a `callback` function will be called when the popup window is closed.

### static getTitleAttribute(schema)
Returns the schema attribute designated as a story's title.

### static getBodyAttribute(schema)
Returns the schema attribute designated as a story's content body.


### static getImageAttribute(schema)
Returns the schema attribute for the most likely image, in the following order of first available:
- schema.image
- schema.author.image
- schema.publisher.logo

If none of these are available, a deep search will occur for an object where `@type = "ImageObject"` and return the first match.

### static resolveSocial(schema, test)
Returns the first object in the following list where a value matches `test`
- schema.author.sameAs
- schema.publisher.sameAs
- schema.provider.sameAs
- schema.sameAs

#### Example:
`resolveSocial(schema, (a) => a.indexOf('twitter.com') !== -1);`

### this.getSchema()
Returns the `schema` property specified either in `this.props` or `this.context`

### this.setCount(count)
Updates `this.state.count` and `this.state.lastFetch`

### this.getCount()
Returns the last known count. If `this.props.count` is specified (live refreshing disabled), it will return that value. If not set (live refreshing enabled) then `this.state.count` will be returned if the value is fresh.

Otherwise, `this.updateCount` will be called and `this.state.count` will be returned immediately.

### this.updateCount()
This method will error out unless it is defined in classes extending from `BaseButton`.

### this.countNode()
Returns the count component or HTML element with the latest fetched value.

### render()
Provides default markup that can be overridden. Provides hooks to `onClick`

---

## FacebookButton < BaseButton
### this.onClick()
Spawns a popup for the Facebook Sharer.

### this.updateCount()
Retrieves the latest count from Facebook and updates the state (does not override props).

---

## PinterestButton < BaseButton
### this.onClick()
Spawns a popup for the Pinterest Sharer.

### this.updateCount()
Retrieves the latest count from Pinterest and updates the state (does not override props).

---

## TwitterButton < BaseButton
### this.getTwitterHandle()
If specified, this will always return `this.props.twitterHandle`

Else, it will try to detect the handle from the schema using `resolveSocial(schema, test)`

### this.onClick()
Spawns a popup for the Tweet and/or Retweet Intents.
If specified, `this.props.tweetID` will prompt a Retweet instead of a Tweet intent.

### this.updateCount()
Does nothing, Twitter does not provide counts (thanks Twitter!)

---

## TumblrButton < BaseButton
### this.onClick()
Spawns a popup for the Tumblr Sharer.

### this.updateCount()
Retrieves the latest count from Tumblr and updates the state (does not override props).

---

# Need Help
Any pull request is warmly welcomed towards making this module better - adding additional networks, tests, or providing better compatibility.

# Related
- [Structured Data via Google](https://developers.google.com/search/docs/guides/intro-structured-data)
- [Schema Types](http://schema.org/docs/full.html)
- [Yarn](https://github.com/yarnpkg/yarn)
