---
title:  "Algorithm Notes: Understanding of Binary Search"
date:   2020-7-10 20:00:00 +0800
categories: Algorithm
---



### Background

Recently, I have recovered my algorithm praticing. It's like something is messing in my mind, maybe due to the shallow understanding before. When I tried to implement a binary search to find the first number that is not less than $X$, I failed several times. Then I realized that I had to make it clear.

Binary Search is an extremely efficient algorithm for searching a particular number in a sorted array, as it reduces the time complexity from $O(n)$ to $O(logn)$. 

I watched two videos which gives through explanation about binary search, but with slightly difference. 

Implementation from [花花酱](https://www.youtube.com/watch?v=v57lNF2mb_s&t=564s).

```javascript
L = 0; R = N;
while (L < R) {
  mid = L + (R-L)/2;
  if (nums[mid] >= X)
    R = mid;
  else 
    L = mid + 1;
}
return L;
```

Implementation from [Errichto](https://www.youtube.com/channel/UCBr_Fu6q9iHYQCh13jmpbrg)

```javascript
L = 0; R = N - 1;
ans = -1;
while (L <= R) {
  mid = L + (R-L)/2;
  if (nums[mid] >= X) {
    ans = mid;
    R = mid - 1;
  } else {
    L = mid + 1;
  }
}
return ans;
```



### Questions

I was confused by 3 questions.

1. Why it is `mid = L + (R-L)/2`, not `mid = (L+R)/2`. 
2. Why in *花花酱*‘'s version it's `R = N, while(L<R), R = mid`, while in *Errichto*'s version it's `R = N - 1, while(L<=R), R=mid-1`.
3. why in *花花酱*‘'s version $L$ is returned as the answer.

### Explanation

**The first question** is easy to explain. It is to avoid the overflow of the sum of $L$ and $R$.

**The second question** seemed a little bit silly after I got it clear. It's just about the current range for searching the target, and the terminaion condition shouldn't miss the very last element to be tested. For example, in *花花酱*‘'s version, the search range is $[L, R)$. So:

1. $R$ starts from $N$, which is the length of the array, not being reached by index. 
2. $L$ is always less than $R$, or the while loop should be terminated.
3. When updating $R$, it means we update the search range into $[L, mid)$. $mid$ is not included, as it is already been examined. The same with updating $L$, so it should be `L=mid+1`, as $mid$ shouldn't be included.

In *Errichto*'s version, the range is $[L, R]$. I will save the explanation here.

**The third question** is really where the tricky is. First I tried to understand *Errichto*'s version, which is quite straight forward. It narrows the search range gradually and updates the answer value with the $mid$  each time it is not less than $X$, utils there is no more value to search. While the right boundary reduces, the answer approaches to the smallest value that is not less than $X$. Let's take an example:

```
nums: 2, 3, 5, 6, 8, 10, 12
X: 4

first loop:  L = 0, R = 6, mid = 3, ans = 6
second loop: L = 0, R = 2, mid = 1, ans = 6
third loop:  L = 2, R = 2, mid = 2, ans = 5
out of loop, so ans = 5
```

When it comes to *花花酱*‘'s version, it reduces one variable and simply returns $L$. Actually, this is what binary search commonly does. So we can also reduce the variable of $ans$ in *Errichto*'s version and return $L$. But why $L$ is the answer? Let me explain. I'll take the search range as $[L, R]$.

Suppose we are in the last loop. 

Then $L == R$ or $L == R - 1$, or there will be another loop.

Then $mid == L$.

There are obviously 2 situations: $nums[mid] >= X$ or $nums[mid] < X$.

If $nums[mid] >= X$, then $nums[L] >= X$. Next we can prove $nums[L-1] < X$.

  *   if $L$ never changed(equals 0), then it means all the numbers in the array are $>=X$. The first element in the array is obviously the smallest one satisfying $>=X$.

  *   if $L$ changed, no matter how many times it changed, the last time it changed must be in some loop that went this way:

      ```javascript
      		...
      		else 			// means nums[mid] < x
      			L = mid + 1		// means mid == L - 1
      		...
      ```

      Are we seeing something here? 

      Yes, $nums[L-1] == nums[mid] < X$. 

      So $nums[L-1] < X <= nums[L]$,  the $L$th element is the smallest one satisfying $>= X$.

If the search range is $[L, R)$, we could also deduce the result.



### Usage

The above is a very common usage of binary search, which is to find the **lower bound** of a value in a sorted array. There are some variant usages:

1. find the **upper bound**, which is the smallest value satisfying $nums[i] > X$. With a slight modification:

   ```javascript
   		...
   		if (nums[mid] > X)
   			R = mid			// or R = mid - 1 if search range [L, R]
   		...
   ```

2. find the first occurance of the target. With adding some code after the while loop:

   ```js
   ...
   return (L < nums.length && nums[L] === X) ? L : -1;
   ```

3. find the last occurance of the target. This can be solved by searching the first occurance of $X+1$ and then returning the previous one.

   ```js
   while (L <= R) {
     mid = L + (R-L)/2;
     if (nums[mid] >= X + 1) 
       R = mid - 1;
     else 
       L = mid + 1;
   }
   return (L > 0 && nums[L-1] === X) ? L-1 : -1;
   ```

   

