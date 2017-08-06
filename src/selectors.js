

export function findObjectByType(schema, type) {
  if (typeof schema === 'object' && '@type' in schema && schema['@type'] === type) {
    return schema;
  } else if (typeof schema === 'object') {
    return Object.values(schema).find(a => findObjectByType(a, type));
  } else if (Array.isArray(schema)) {
    return schema.find(a => findObjectByType(a, type));
  }

  return null;
}

export function getTitleAttribute(schema) {
  return schema.headline;
}

export function getBodyAttribute(schema) {
  return schema.description || null;
}

export function getURLAttribute(schema) {
  if ('mainEntityOfPage' in schema && '@id' in schema.mainEntityOfPage) {
    return schema.mainEntityOfPage['@id'];
  } else if ('publisher' in schema) {
    return schema.publisher.url;
  } else if (typeof location !== 'undefined') {
    return location.href;
  }

  return null;
}

export function getImageAttribute(schema) {
  if ('image' in schema) {
    return schema.image;
  } else if ('image' in schema.author) {
    return schema.author.image;
  } else if ('logo' in schema.publisher) {
    return schema.publisher.logo;
  }

  const foundImage = findObjectByType(schema, 'ImageObject');

  if (foundImage) {
    return foundImage;
  }

  return null;
}

export function resolveSocial(schema, test) {
  if (typeof 'sameAs' in schema) {
    const testValue = schema.sameAs.find(test);
    if (testValue) {
      return testValue;
    }
  }

  for (let key of ['author', 'publisher', 'provider']) {
    if (key in schema && 'sameAs' in schema[key]) {
      const testValue = schema[key].sameAs.find(test);
      if (testValue) {
        return testValue;
      }
    }
  }

  return null;
}
