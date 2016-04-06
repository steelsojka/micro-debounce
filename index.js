(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.microDebounce = factory();
  }
}(this, function() {
  /**
   * Takes a functions and debounces it into a micro task. Multiple calls
   * in the same execution context will be reduced to one. The last calls
   * arguments are used, unless configured differently.
   * @param {Function} fn - The function to debounce.
   * @param {Object} [options] - Options object.
   * @param {boolean} [options.leading=false] - Whether the first calls arguments are passed
   *   to the function of the last calls arguments.
   * @param {Object} [options.Promise=Promise] - The promise implementation to use. Defaults to the global implementation.
   */
  return function microDebounce(fn, options) {
    options = options || {}

    var leading = options.leading == null ? false : options.leading;
    var Promise = options.Promise || Promise;
    var queued = false;
    var args = null;
    var promise = null;

    function reset() {
      queued = false;
    }

    return function microDebounced() {
      var context = this;

      if (!args || !leading) {
        args = Array.prototype.slice.call(arguments);
      }

      if (queued) {
        return promise;
      }

      queued = true;
      promise = Promise.resolve()
        .then(function() {
          return fn.apply(context, args);
        })
        .then(reset, reset);

      return promise;
    };
  }
}));
