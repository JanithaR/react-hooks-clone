const React = (function() {
  let hooks = [];
  let index = 0;

  function useState(initialValue) {
    const _idx = index;
    const state = hooks[_idx] || initialValue;

    const setState = newValue => {
      hooks[_idx] = newValue;
    };

    index++;

    return [state, setState];
  }

  function render(component) {
    index = 0;

    const C = component();
    
    C.render();

    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState('hello');

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: value => setText(value)
  };
}

let App = React.render(Component);
App.click();
App = React.render(Component);
App.type('world');
App = React.render(Component);
App.click();
App = React.render(Component);
