---
title:  "Implement Undo/Redo With Mobx"
date:   "2018-10-07T19:00:00+08:00"
categories: Front-End
---



In one of my [React](https://reactjs.org/) project with [three.js](https://threejs.org/), I chose [MobX](https://mobx.js.org/index.html) as my state management over [Redux](https://redux.js.org/), mostly because I found it difficult to deal immutability with three.js. However, mutability brings difficulties in the history management. I spent much effort in solving this problem, as there is very few ready-to-use tools existed. Here is what I did. [Github project](https://github.com/imagicbell/json-mobx).

After some research, I learned that to enable time-travel, history states are needed to be recorded each time a change is made, and then re-apply the corresponding history state to current state. Here are 3 main problems:

1. trigger when a change is made.
2. record history state - serialization.
3. re-apply history state - deserialization.

### Trigger

Fortunately, MobX provides a function [autorun](https://mobx.js.org/refguide/autorun.html) that enables a trigger when a change is made. But there is limitation:

*`autorun` will only observe data that is used during the execution of the provided function.*

So in the function, I need to include all the data that needs to be recorded.

How? 

Serialization.



### Serialization/Deserialization

First I saw MobX has provided the [toJS](https://mobx.js.org/refguide/tojson.html) to recursively converts an (observable) object to a javascript *structure*. That's good. But it didn't work out in my application. Two reasons:

1. It saves everything in the object, including methods, which is not needed. Only the observable properties are needed. 
2. After `toJS`, we got a new js object, which is not the MobX store object. To "deserialization", we need to deep copy the object to the MobX store object, otherwise the React components will not response. 

So I need to find a way to recursively serialize the observable properties of store objects, and recursively deserialze them while not chaning the store objects themselves.

Thanks to the GitHub project [json-mobx](https://github.com/danielearwicker/json-mobx), we got the solution!

By decorating the `@json` to observable properties, it automatically gains a hidden `json` property. It is defined by a MobX `computed` so it only regenerates the JSON representation if anything changes.

Just call `json.save` in `autorun` function to snapshot the observable data of MobX stores, and `json.load` when undo/redo happens to re-apply the history data.

#### How to add `@json` to three.js defined properties?

MobX gives a way to add decoraters to properties of pre-defined structures. 

`decorate(object, decorators)`

```
decorate(THREE.Object3D, {
  name: [json, observable],
  parent: [json, observable],
  children: [json, observable],
  up: [json, observable],
  position: [json, observable],
  rotation: [json, observable],
  scale: [json, observable],
  visible: [json, observable],
})

decorate(THREE.Vector3, {
  x: [json, observable],
  y: [json, observable],
  z: [json, observable],
})
```



### Optimization

As MobX can have more than one stores. Each time a change happens, serializing all data of all stores seems to be a waste of storage. So I optimized the `json-mobx`'s undo/redo scheme. 

*Only one store's data is serialzied and push to the history states when a change happens. Of course we only have one history management object, however, each element in its history state stack is not the history state of the root store(containing all the store objects), but the history state of one exact store. We keep an `id` for connecting each store with its history states.*

This scheme results in a problem: the first history state.

Each time we add a store to the history management, we register an `autorun` on that store object to observe any changes. The `autorun` will trigger an initial call by MobX even though nothing is changed. Then we got an initial call for every store, which will results in separate history state in the undo stack, meaning that we will loose the initial state for some stores when undo is done. So we must have a history state for the initial state of all the stores. Here is what we did:

```javascript
 private observe = (state: any) => {
    const newState = new HistoryState(json.save(state), this.getStateId(state));

    // push first states for all stores
    let firstStates = this.firstState.state as HistoryState[];
    if (firstStates.length < this.stateList.length &&
        firstStates.findIndex(s => s.id === newState.id) < 0) {
      firstStates.push(newState);
      return;
    }
    
    if (this.isLoadingState) {
        this.isLoadingState = false;            
    } else {
        this.redoStack.length = 0;
        this.undoStack.push(this.undoStack.length > 0 ? this.currentState : this.firstState);
    }

    this.currentState = newState;
  }
```



### Conclusion

So we got an optimized solution for the undo/redo with MobX. Each time a change happens, we snapshot the observable data for the corresponding store and push it to the undo stack. When undo/redo happens, we just retrieve the saved data from undo/redo stack and re-apply it to the corresponding store.
