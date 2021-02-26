---
title:  "Algorithm Notes: KMP"
date:   "2019-09-26T20:00:00+08:00"
categories: Algorithm
---



### Background

String searching is one of the most common interview problems. Of course, it can be solved by using the simple way that every body can work out, which is: 

* Compare the template string to the target one by one character.
* When meet the difference, come back to the start of the template string and the next character of the last start of the target string". 

The time complexity is $O(m \times n)$, that is obviously not good. If we can solve it using KMP(Knuth–Morris–Pratt string-searching algorithm), maybe we can stand out in the interviews.



### How To

The key point of KMP is to avoid the repeated comparisons. We'll take an example to illustrate how.

Consider to find the first occurance of string `w` = "ABCDABD" in string `s` = "ABCDABCDABDE".

| s |  A   |  B   |  C   |  D   |  A   |  B   | <span style="color:red">C</span> |  D   |  A   |  B   |  D   |  E   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :------------------------------: | :--: | :--: | :--: | :--: | :--: |
| i |  0   |  1   |  2   |  3   |  4   |  5   | <span style="color:red">6</span> |  |  |  |  |  |
|  w   |  A   |  B   |  C   |  D   |  A   |  B   | <span style="color:red">D</span> |      |      |      |      |      |
| j |  0   |  1   |  2   |  3   |  4   |  5   | <span style="color:red">6</span> |      |      |      |      |      |

When compared to the sixth character, we meet the difference. Now `i = 6`, `j = 6`.

We'll introduce a **Partial Match Table**, **PMT** in short. It will be explained later in this article.

| w | A    | B    | C    | D    | A    | <span style="color:red">B</span> | D |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| PMT | 0    | 0    | 0    | 0    | 1    | <span style="color:red">2</span> | 0 |

According to the PMT, we move j to 2, keep i unchanged, and we get:

|  s   |  A   |  B   |  C   |  D   |  A   |  B   | <span style="color:red">C</span> |  D   |  A   |  B   |  D   |  E   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :------------------------------: | :--: | :--: | :--: | :--: | :--: |
|  i   |  0   |  1   |  2   |  3   |  4   |  5   | <span style="color:red">6</span> |      |      |      |      |      |
|  w   |      |      |      |      |  A   |  B   | <span style="color:red">C</span> |  D   |  A   |  B   |  D   |      |
|  j   |      |      |      |      |  0   |  1   | <span style="color:red">2</span> |  3   |  4   |  5   |  6   |      |

Then continue to compare, and we'll find the match.

So the process of KMP is:

1. Cursor `i` of target string `s` and `j` of template string `w` both start from 0, and compare characters of `s` and `w` one by one;
2. When difference appears, move `j` to the value of `PMT[j-1]`. If `j==0`, just keep `j=0`;
3. Continue to compare. Once reach the end of string `w`, the match is found and return `i-j`. Otherwise, return -1.

Code is as follows:

```javascript
function KMP(s, w) {
  let i = 0, j = 0;
  while (i < s.length && j < w.length) {
    if (s[i] === w[j]) {
      i++;
      j++;
      if (j === w.length) {
        return i - j;
      }
    } else if (j > 0) {
      j = pmt[j-1];
    } else {
      i++;
    }
  }
  return -1;
}
```

### Partial Match Table

Now let's explain the PMT. First we'll introduce **prefix** and **suffix**. Also take the `w = 'ABCDABD'` as example.

**Prefix**: all substrings from 0 to second last character. `'A', 'AB', 'ABC', 'ABCD', 'ABCDA', 'ABCDAB'`.

**Suffix**: all substrings from 1 to last character. `'D', 'BD', 'ABD', 'DABD', 'CDABD', 'BCDABD'`.

The PMT value is the length of the longest same string between prefix and suffix. So we get:

|  w   |  A   |  B   |  C   |  D   |  A   |  B   |  D   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| PMT  |  0   |  0   |  0   |  0   |  1   |  2   |  0   |

* `'A'` has no prefix or suffix, so PMT value is 0;
* `'AB'` has prefix of `'A'` and suffix of `'B'`, no same, so PMT value is 0;
* ...
* `'ABCDA'` has prefix of `'A','AB','ABC', 'ABCD'` and suffix of `'A', 'DA', 'CDA', 'BCDA'` , longest same `'A'`, so PMT value is 1;
* `'ABCDAB'` has prefix of `'A','AB','ABC', 'ABCD', 'ABCDA'` and suffix of `'B', 'AB', 'DAB', 'CDAB', 'BCDAB'`, longest same` 'AB'`, so PMT value is 2;
* ...

Code is as follows:

```javascript
function PMT(w) {
  let pmt = new Array(w.length).fill(0);
  let i = 1, j = 0;
  while (i < w.length) {
    if (w[i] === w[j]) {
      i++;
      j++;
      pmt[i] = j;
    } else if (j > 0) {
      j = pmt[j-1];
    } else {
      pmt[i] = 0;
      i++;
    }
  }
}
```

`PMT[0]` is 0 of course. So we start from the second character, that is `i = 1`. We consider string `w` as two strings and try to find the same substring. The second cursor `j` start from 0.

|      |  A   |  <span style="color:red">B</span>  |  C   |  D   |  A   |  B   | D |  |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| i |  0   | <span style="color:red">1</span> |  2   |  3   |  4   |  5   |  6   |  |
|  |      | <span style="color:red">A</span> |  B   |  C   |  D   |  A   |  B   | D |
| j |  | <span style="color:red">0</span> | 1 | 2 | 3 | 4 | 5 | 6 |

`A` and `B` is not same, so `PMT[1] = 0`. Move `i` to next, and keep `j = 0`.

|      |  A   |  B   | <span style="color:red">C</span> |  D   |  A   |  B   |  D   |      |      |
| :--: | :--: | :--: | :------------------------------: | :--: | :--: | :--: | :--: | :--: | ---- |
|  i   |  0   |  1   | <span style="color:red">2</span> |  3   |  4   |  5   |  6   |      |      |
|      |      |      | <span style="color:red">A</span> |  B   |  C   |  D   |  A   |  B   | D    |
|  j   |      |      | <span style="color:red">0</span> |  1   |  2   |  3   |  4   |  5   | 6    |

`A` and `C` is not same, so `PMT[2] = 0`. Move `i` to next, and keep `j = 0`.

|      |  A   |  B   |  C   | <span style="color:red">D</span> |  A   |  B   |  D   |      |      |      |
| :--: | :--: | :--: | :--: | :------------------------------: | :--: | :--: | :--: | :--: | ---- | ---- |
|  i   |  0   |  1   |  2   | <span style="color:red">3</span> |  4   |  5   |  6   |      |      |      |
|      |      |      |      | <span style="color:red">A</span> |  B   |  C   |  D   |  A   | B    | D    |
|  j   |      |      |      | <span style="color:red">0</span> |  1   |  2   |  3   |  4   | 5    | 6    |

We get `PMT[3] = 0`.

|      |  A   |  B   |  C   |  D   | <span style="color:red">A</span> |  B   |  D   |      |      |      |      |
| :--: | :--: | :--: | :--: | :--: | :------------------------------: | :--: | :--: | :--: | ---- | ---- | ---- |
|  i   |  0   |  1   |  2   |  3   | <span style="color:red">4</span> |  5   |  6   |      |      |      |      |
|      |      |      |      |      | <span style="color:red">A</span> |  B   |  C   |  D   | A    | B    | D    |
|  j   |      |      |      |      | <span style="color:red">0</span> |  1   |  2   |  3   | 4    | 5    | 6    |

We get one same character `A`, so `PMT[4] = 1`. Now let's move both `i` and `j` to next and keep comparing.

|      |  A   |  B   |  C   |  D   | <span style="color:red">A</span> | <span style="color:red">B</span> |  D   |      |      |      |      |
| :--: | :--: | :--: | :--: | :--: | :------------------------------: | :------------------------------: | :--: | :--: | ---- | ---- | ---- |
|  i   |  0   |  1   |  2   |  3   | <span style="color:red">4</span> | <span style="color:red">5</span> |  6   |      |      |      |      |
|      |      |      |      |      | <span style="color:red">A</span> | <span style="color:red">B</span> |  C   |  D   | A    | B    | D    |
|  j   |      |      |      |      | <span style="color:red">0</span> | <span style="color:red">1</span> |  2   |  3   | 4    | 5    | 6    |

Two same characters `AB`, so `PMT[5] = 2`. Continue to move `i` and `j` to next.

|      |  A   |  B   |  C   |  D   | <span style="color:red">A</span> | <span style="color:red">B</span> | <span style="color:red">D</span> |      |      |      |      |
| :--: | :--: | :--: | :--: | :--: | :------------------------------: | :------------------------------: | :------------------------------: | :--: | ---- | ---- | ---- |
|  i   |  0   |  1   |  2   |  3   | <span style="color:red">4</span> | <span style="color:red">5</span> | <span style="color:red">6</span> |      |      |      |      |
|      |      |      |      |      | <span style="color:red">A</span> | <span style="color:red">B</span> | <span style="color:red">C</span> |  D   | A    | B    | D    |
|  j   |      |      |      |      | <span style="color:red">0</span> | <span style="color:red">1</span> | <span style="color:red">2</span> |  3   | 4    | 5    | 6    |

`C` and `D` are not same. Like KMP, we keep `i` unchanged, and move `j` to `PMT[j-1]`, which is `0`.

|      |  A   |  B   |  C   |  D   |  A   |  B   | <span style="color:red">D</span> |      |      |      |      |      |      |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :------------------------------: | :--: | ---- | ---- | ---- | ---- | ---- |
|  i   |  0   |  1   |  2   |  3   |  4   |  5   | <span style="color:red">6</span> |      |      |      |      |      |      |
|      |      |      |      |      |      |      | <span style="color:red">A</span> |  B   | C    | D    | A    | B    | D    |
|  j   |      |      |      |      |      |      | <span style="color:red">0</span> |  1   | 2    | 3    | 4    | 5    | 6    |

At last we get `PMT[6] = 0`. But why `j = PMT[j - 1]`?

When we meet difference, we will move the string below to the right, which means to move `j` back. There are `j-1, j-2, …, 0`. How to decide which is the best move? Remember that the target of **PMT** is to find the longest same prefix and suffix. `PMT[j - 1]` is the longest length of the same prefix and suffix of `'w[0...j-1]'`. Let's say
$$
w_{[0...PMT[j-1]-1]} = w_{[j-PMT[j-1]...j-1]}		
$$
Moreover, through previous comparison we get
$$
w_{[i-j...i-1]} = w_{[0...j-1]}
$$
Combine this two equations, and we get
$$
w_{[0...PMT[j-1]-1]} = w_{[i-PMT[j-1]...i-1]}
$$
If we make `j = PMT[j-1]`, the above equation will turn into
$$
 w_{[0...j-1]} = w_{[i-j...i-1]}
$$
which is the same as the second equation above! It means by making the shortest move of `j` back, we will continue to find the longest prefix and suffix with least comparison.

### Next Table

Next table is the permutation of PMT.

|  w   |  A   |  B   |  C   |  D   |  A   |  B   |  D   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| PMT  |  0   |  0   |  0   |  0   |  1   |  2   |  0   |
| Next |  -1  |  0   |  0   |  0   |  0   |  1   |  2   |

It sets `Next[0] = -1`, and moves PMT right in one step. The purpose of Next table is to make the KMP code more concisely. I will not illustrate it here, as understanding PMT first is the key.











