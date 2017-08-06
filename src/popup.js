

  export default function popup(url, inputOptions, callback) {
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
