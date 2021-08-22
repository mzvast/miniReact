function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = key => key !== "children";

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });

  // element.props.children.forEach(child => {
  //   render(child, dom);
  // });



  container.appendChild(dom);
}

  let nextUnitOfWork = null;

  function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop);
  }

  requestIdleCallback(workLoop);

  function performUnitOfWork() {
    // todo:
  }

const miniReact = {
  createElement,
  render
};

/** @jsx Didact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )

const element = miniReact.createElement(
  "div",
  { id: "foo" },
  miniReact.createElement("a", null, "bar"),
  miniReact.createElement("b")
);
// console.log(JSON.stringify(element));

const container = document.getElementById("root");
miniReact.render(element, container);
