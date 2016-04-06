micro-debounce
==============

Debounce a function using microtasks.

Install
-------

`npm install micro-debounce`

Useage
------

Queue a function to execute at the end of an execution loop.

```javascript
import debounce from 'micro-debounce';

function resize(a) {
  console.log('resize!!!', a);
}

const debouncedResize = debounce(resize);

debouncedResize(1);
debouncedResize(2);
debouncedResize(3);
debouncedResize(4);
debouncedResize(5);

console.log('beforeResize');
```

Our log looks like this:

- "beforeResize"
- "resize!!!" 5

If we didn't debounce we would end up with this:

- "resize!!!" 1
- "resize!!!" 2
- "resize!!!" 3
- "resize!!!" 4
- "resize!!!" 5
- "beforeResize"

### Options

#### leading=false (boolean)

Whether the arguments are passed to the function from the leading function vs the last function.

```javascript
import debounce from 'micro-debounce';

function resize(a) {
  console.log('resize!!!', a);
}

const debouncedResize = debounce(resize, { leading: true });

debouncedResize(1);
debouncedResize(2);
debouncedResize(3);
debouncedResize(4);
debouncedResize(5);

console.log('beforeResize');
```

Our log looks like this:

- "beforeResize"
- "resize!!!" 1

#### Promise=Promise (Object)

The promise implementation to use. Uses the global Promise by default.

Why?
----

Useful when the same function is called multiple times within the same execution context. Enjoy!
