---
title:  "Mock requestAnimationFrame in Jest"
date:   2021-2-19 10:00:00 +0800
categories: Front-End
---



When I wrote test for my tiny [rhythm game](https://imagicbell.github.io/front-end/2021/01/07/rythm-game.html), I realized that all the browser based actions needed to be mocked, including `window.requestAnimationFrame`. I created a custom hook `useCanvas` which takes a `draw` function and renders the content under canvas every frame using `requestAnimationFrame`. I decided to write a test to test this functionality.

```javascript
export default function useCanvas(draw) {
	const canvasRef = useRef(null);
	const loopId = useRef();
	const previousTime = useRef();

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		const loop = time => {
			if (previousTime.current) {
				context.clearRect(0, 0, canvas.width, canvas.height);
				draw(context, 0.001 * (time - previousTime.current));
			}
			previousTime.current = time;
			loopId.current = requestAnimationFrame(loop);
		}

		loopId.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(loopId.current);
	}, [draw]);

	return canvasRef;
}
```

I searched "mock requestAnimationFrame" directly on the Jest doc, but got no hint. Then googled it and got a [potential solution](https://github.com/facebook/jest/issues/5147#issuecomment-353274996):

```javascript
beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});
```

However, this solution produces infinite call loop, because it calls `cb` immediately, and then in `cb` the `requestAnimationFrame` calls `cb` again, and again... Hm, I realized that it was close. I only needed to fix this issue. How about delaying the call of `cb`?

Then `setTimeout` came to help. But also `setTimeout` needs to be mocked in Jest to make it move forward. Fortunately, Jest has already worked it out, see [Timer Mocks](https://jestjs.io/docs/en/timer-mocks). So my final solution is:

```javascript
beforeEach(() => {
  jest.useFakeTimers();

  let count = 0;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(() => cb(100*(++count)), 100));
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
  jest.clearAllTimers();
});
```

Then in test mock the timer:

```
act(() => {
  jest.advanceTimersByTime(200);
});
```

The $100$ in `setTimeout` acts like the `deltaTime` between frames, and can be custom defined. 