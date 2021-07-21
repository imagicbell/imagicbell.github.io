---
title:  "Use React Context + useReducer to Implement A Simple State Management Like Redux"
date:   "2021-07-07T20:00:00+08:00"
categories: Front-End
---



React Hooks have brought us much convenience in writing concise readable code. Recently, I have been enjoying the usage of React Context and useReducer to implement a simple state management architecture, as a replacement of Redux. There are at least two advantages here:

1. The store code is much shorter.
2. We could have more than one stores. Benefit from this, we can seperate unrelated data into different stores, avoiding unexpected re-renders of Components.

### Recap of Redux

Redux has introduced a simple data flow for React. 

![](/blog/assets/img-react-redux/redux.jpg)

From this chart we could see that the only two exploded data are `state` and `dispatch`. The components who use the state data for rendering need to `connect` the store for extracting the data. To update the state, `dispatch` an action with a pre-defined type and update data. Then the reducers in the store catch the action and update the state. Those components then get update as well.

### The Power of Context

After I got familar with the usage of Context, I found that Redux might have used Context to pass the store data to those child components. With context, we don't need to pass the data by props all the way down to the children. It works like a global singleton. A child component only needs to register as a **Consumer** to get the context data. There are several ways to be a consumer, see the [doc](https://reactjs.org/docs/context.html).

So in my design, I create a context as a store. Then `export` a context `Provider` for children components.

```jsx
const Store = createContext();
Store.displayName = 'Store';

export function StoreProvider({children}) {
	/* get the data */
	return <Store.Provider value={data}>{children}</Store.Provider>
}
```

Attach the provider in the outmost component.

```jsx
function App() {
  return (
    <StoreProvider>
    	<Home />
    </StoreProvider>
  );
}

```

A child functional component can use `useContext` to catch the data.

```jsx
function ChildComponent({props}) {
  const data = useContext(Store);
  /* then render with the data */
}
```

However, importing `Store` in every component and calling `useContext` seem like duplicate code. We can define a `connect` HOC that takes in a component and returns a new component with the store data that is wanted.

```jsx
// connect HOC defined in the store.js
export function connect(Component, selector) {
	return props => {
		const ctx = selector(useContext(Store));
		return <Component {...{...props, ...ctx}} />;
	}
}

// use connect in ChildComponentjs
function ChildComponent({totalRestaurants}) {
  /* general render code here */
}
export default connect(ChildComponent, ({restaurants}) => ({totalRestaurants: restaurants}));
```

The `selector` is a function that selects what data the ChildComponent needs. The store value can be a big object. Child components may not need the whole object value.

OK, this is the Context part. If we only have a static store, which doesn't update its state, it's sufficient. You can stop reading now. But if the store needs to update its state by actions, we prefer reducers. Keep reading please.

### `useReducer` to Update Store

In our context store, we can use `useState` to update our store data, and then pass update function as callbacks to our child components for updating the store. But `useReducer` provides an alternative way. It is more useful when we have complex state logic, and more performant because it passes `dispatch` to child components rather than callbacks. 

```jsx
const initialValue = [];

export const addItem = (id) => ({
	type: 'ADD',
	id,
})

const reducer = (state, action) => {
	switch(action.type) {
		case 'ADD':
			//do add logic, and return new state.
		default:
			return state;
	}
}

export function StoreProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialValue, init);
	return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

//then we use connect HOC as above to allow child components access the state and dispatch.

//this is how child component connect to the store
// use connect in ChildComponentjs
function ChildComponent({favorites, onAdd}) {
  /* general render code here */
}

export default connect(ChildComponent, ({state, dispatch}) => ({
	favorites: state,
	onAdd: id => dispatch(addItem(id)),
}));

```

Doesn't this `connect` syntatic sugar look familiar? I guess I am getting closer to Redux:smile:.

### Performance

When reaching here, do you have a doubt regarding to the performance of this architecture. Any update in context's value will cause re-render to those context consumers. For example, a store context has an object value which has two properties:

```jsx
//context value
{
  a: 0,
  b: 1
}
```

Child component A only consumes `a`, while child componnet B only consumes `b`. If `a` is updated, not only componnet `A` will re-render, but also component `B`, because any update in context value will update all context consumers. So how to resolve this issue?

I guess it is an classical React performance problem. React has provided several ways to prevent unexpected re-render. Regarding to this situation, we can use:

1. `React.memo` to only re-render functional component when its props changes.
2. `shouldComponentUpdate` to set condition on whether the component needs re-render.
3. Pure component to implicitly execute `shouldComponentUpdate` to listen to the changes in state or props.



### Conclusion

This architecture might be very flexible and light in small projects. But in big projects, Redux still has its position as it enables sub-stores which seperate state logic. Also the community has tons of middlewares which makes coding easier.
