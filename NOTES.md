# Notes

## What about Redux?

- [Dan Abramov: You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [Dan Abramov: "Don’t use Redux until you have problems with vanilla React"](https://twitter.com/dan_abramov/status/699241546248536064?s=20)
- ["You’ll know when you need Flux. If you aren’t sure if you need it, you don’t need it."](https://github.com/petehunt/react-howto#learning-flux)

## What about Effects?

Effects are difficult to grasp when starting out with React. The React docs are a good place to learn:

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

> Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.

> Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system like a non-React widget, network, or the browser DOM. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.

## What about TypeScript?

I highly recommend learning TypeScript from the wizards:

- [Beginner's TypeScript](https://www.totaltypescript.com/tutorials/beginners-typescript) - Free interactive video tutorial that will help you get started with TypeScript.
https://react.dev/learn/you-might-not-need-an-effect#fetching-data)
- [Syncronizing with Effects](https://react.dev/learn/synchronizing-with-effects#fetching-data)
