webpackHotUpdate_N_E("pages/posts/[slug]",{

/***/ "./pages/posts/[slug].js":
/*!*******************************!*\
  !*** ./pages/posts/[slug].js ***!
  \*******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/error */ \"./node_modules/next/error.js\");\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_post_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/post-header */ \"./components/post-header.js\");\n/* harmony import */ var _components_post_body__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/post-body */ \"./components/post-body.js\");\n/* harmony import */ var _components_post_footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/post-footer */ \"./components/post-footer.js\");\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/layout */ \"./components/layout.js\");\n/* harmony import */ var _components_post_title__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/post-title */ \"./components/post-title.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\nvar _jsxFileName = \"/Users/ling/Desktop/MSpace/WEB/imagicbell-website/pages/posts/[slug].js\",\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nfunction HeadMeta(_ref) {\n  var post = _ref.post;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_head__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"title\", {\n      children: post.title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 16,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      name: \"description\",\n      content: post.description || ''\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      property: \"og:type\",\n      content: \"website\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 18,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      property: \"og:title\",\n      content: post.title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 19,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      property: \"og:url\",\n      content: \"/posts/\".concat(post.slug)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 20,\n      columnNumber: 7\n    }, this), post.description && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      property: \"og:description\",\n      content: post.description\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 29\n    }, this), post.ogImage && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      property: \"og:image\",\n      content: post.ogImage\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 22,\n      columnNumber: 25\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      name: \"twitter:card\",\n      content: \"summary\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 23,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      name: \"twitter:title\",\n      content: post.title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 24,\n      columnNumber: 7\n    }, this), post.description && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      name: \"twitter:description\",\n      content: post.description\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 25,\n      columnNumber: 29\n    }, this), post.ogImage && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meta\", {\n      name: \"twitter:image\",\n      content: post.ogImage\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 26,\n      columnNumber: 25\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"link\", {\n      rel: \"stylesheet\",\n      href: \"https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css\",\n      integrity: \"sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X\",\n      crossOrigin: \"anonymous\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"script\", {\n      defer: true,\n      src: \"https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js\",\n      integrity: \"sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4\",\n      crossOrigin: \"anonymous\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 15,\n    columnNumber: 5\n  }, this);\n}\n\n_c = HeadMeta;\nvar __N_SSG = true;\nfunction Post(_ref2) {\n  _s();\n\n  var post = _ref2.post,\n      postNav = _ref2.postNav,\n      morePosts = _ref2.morePosts;\n  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__[\"useRouter\"])();\n\n  if (!router.isFallback && !(post !== null && post !== void 0 && post.slug)) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_error__WEBPACK_IMPORTED_MODULE_2___default.a, {\n      statusCode: 404\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 12\n    }, this);\n  }\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    children: router.isFallback ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_post_title__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      children: \"Loading\\u2026\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 9\n    }, this) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(HeadMeta, {\n        post: post\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 45,\n        columnNumber: 11\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"mx-auto\",\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"article\", {\n          className: \"mb-20\",\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_post_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n            post: post\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 48,\n            columnNumber: 15\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_post_body__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n            content: post.content\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 49,\n            columnNumber: 15\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 47,\n          columnNumber: 13\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_post_footer__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          post: post,\n          postNav: postNav,\n          morePosts: morePosts\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 51,\n          columnNumber: 13\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 46,\n        columnNumber: 11\n      }, this)]\n    }, void 0, true)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 40,\n    columnNumber: 5\n  }, this);\n}\n\n_s(Post, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function () {\n  return [next_router__WEBPACK_IMPORTED_MODULE_1__[\"useRouter\"]];\n});\n\n_c2 = Post;\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"HeadMeta\");\n$RefreshReg$(_c2, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcG9zdHMvW3NsdWddLmpzP2RlYzkiXSwibmFtZXMiOlsiSGVhZE1ldGEiLCJwb3N0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInNsdWciLCJvZ0ltYWdlIiwiUG9zdCIsInBvc3ROYXYiLCJtb3JlUG9zdHMiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJpc0ZhbGxiYWNrIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBSUEsU0FBU0EsUUFBVCxPQUE0QjtBQUFBLE1BQVJDLElBQVEsUUFBUkEsSUFBUTtBQUMxQixzQkFDRSxxRUFBQyxnREFBRDtBQUFBLDRCQUNFO0FBQUEsZ0JBQVFBLElBQUksQ0FBQ0M7QUFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUFNLFVBQUksRUFBQyxhQUFYO0FBQXlCLGFBQU8sRUFBRUQsSUFBSSxDQUFDRSxXQUFMLElBQW9CO0FBQXREO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGRixlQUdFO0FBQU0sY0FBUSxFQUFDLFNBQWY7QUFBeUIsYUFBTyxFQUFDO0FBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFIRixlQUlFO0FBQU0sY0FBUSxFQUFDLFVBQWY7QUFBMEIsYUFBTyxFQUFFRixJQUFJLENBQUNDO0FBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFKRixlQUtFO0FBQU0sY0FBUSxFQUFDLFFBQWY7QUFBd0IsYUFBTyxtQkFBWUQsSUFBSSxDQUFDRyxJQUFqQjtBQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTEYsRUFNSUgsSUFBSSxDQUFDRSxXQUFMLGlCQUFvQjtBQUFNLGNBQVEsRUFBQyxnQkFBZjtBQUFnQyxhQUFPLEVBQUVGLElBQUksQ0FBQ0U7QUFBOUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU54QixFQU9JRixJQUFJLENBQUNJLE9BQUwsaUJBQWdCO0FBQU0sY0FBUSxFQUFDLFVBQWY7QUFBMEIsYUFBTyxFQUFFSixJQUFJLENBQUNJO0FBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFQcEIsZUFRRTtBQUFNLFVBQUksRUFBQyxjQUFYO0FBQTBCLGFBQU8sRUFBQztBQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsZUFTRTtBQUFNLFVBQUksRUFBQyxlQUFYO0FBQTJCLGFBQU8sRUFBRUosSUFBSSxDQUFDQztBQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBVEYsRUFVSUQsSUFBSSxDQUFDRSxXQUFMLGlCQUFvQjtBQUFNLFVBQUksRUFBQyxxQkFBWDtBQUFpQyxhQUFPLEVBQUVGLElBQUksQ0FBQ0U7QUFBL0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVZ4QixFQVdJRixJQUFJLENBQUNJLE9BQUwsaUJBQWdCO0FBQU0sVUFBSSxFQUFDLGVBQVg7QUFBMkIsYUFBTyxFQUFFSixJQUFJLENBQUNJO0FBQXpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFYcEIsZUFhRTtBQUFNLFNBQUcsRUFBQyxZQUFWO0FBQXVCLFVBQUksRUFBQyw4REFBNUI7QUFBMkYsZUFBUyxFQUFDLHlFQUFyRztBQUErSyxpQkFBVyxFQUFDO0FBQTNMO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFiRixlQWNFO0FBQVEsV0FBSyxNQUFiO0FBQWMsU0FBRyxFQUFDLDZEQUFsQjtBQUFnRixlQUFTLEVBQUMseUVBQTFGO0FBQW9LLGlCQUFXLEVBQUM7QUFBaEw7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBa0JEOztLQW5CUUwsUTs7QUFxQk0sU0FBU00sSUFBVCxRQUE0QztBQUFBOztBQUFBLE1BQTVCTCxJQUE0QixTQUE1QkEsSUFBNEI7QUFBQSxNQUF0Qk0sT0FBc0IsU0FBdEJBLE9BQXNCO0FBQUEsTUFBYkMsU0FBYSxTQUFiQSxTQUFhO0FBQ3pELE1BQU1DLE1BQU0sR0FBR0MsNkRBQVMsRUFBeEI7O0FBQ0EsTUFBSSxDQUFDRCxNQUFNLENBQUNFLFVBQVIsSUFBc0IsRUFBQ1YsSUFBRCxhQUFDQSxJQUFELGVBQUNBLElBQUksQ0FBRUcsSUFBUCxDQUExQixFQUF1QztBQUNyQyx3QkFBTyxxRUFBQyxpREFBRDtBQUFXLGdCQUFVLEVBQUU7QUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUFQO0FBQ0Q7O0FBQ0Qsc0JBQ0UscUVBQUMsMERBQUQ7QUFBQSxjQUNHSyxNQUFNLENBQUNFLFVBQVAsZ0JBQ0MscUVBQUMsOERBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERCxnQkFHQztBQUFBLDhCQUNFLHFFQUFDLFFBQUQ7QUFBVSxZQUFJLEVBQUVWO0FBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixlQUVFO0FBQUssaUJBQVMsRUFBQyxTQUFmO0FBQUEsZ0NBQ0U7QUFBUyxtQkFBUyxFQUFDLE9BQW5CO0FBQUEsa0NBQ0UscUVBQUMsK0RBQUQ7QUFBWSxnQkFBSSxFQUFFQTtBQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQURGLGVBRUUscUVBQUMsNkRBQUQ7QUFBVSxtQkFBTyxFQUFFQSxJQUFJLENBQUNXO0FBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLGVBS0UscUVBQUMsK0RBQUQ7QUFBWSxjQUFJLEVBQUVYLElBQWxCO0FBQXdCLGlCQUFPLEVBQUVNLE9BQWpDO0FBQTBDLG1CQUFTLEVBQUVDO0FBQXJEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBRkY7QUFBQTtBQUpKO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQWtCRDs7R0F2QnVCRixJO1VBQ1BJLHFEOzs7TUFET0osSSIsImZpbGUiOiIuL3BhZ2VzL3Bvc3RzL1tzbHVnXS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICduZXh0L2Vycm9yJ1xuaW1wb3J0IFBvc3RIZWFkZXIgZnJvbSAnQC9jb21wb25lbnRzL3Bvc3QtaGVhZGVyJ1xuaW1wb3J0IFBvc3RCb2R5IGZyb20gJ0AvY29tcG9uZW50cy9wb3N0LWJvZHknXG5pbXBvcnQgUG9zdEZvb3RlciBmcm9tICdAL2NvbXBvbmVudHMvcG9zdC1mb290ZXInXG5pbXBvcnQgTGF5b3V0IGZyb20gJ0AvY29tcG9uZW50cy9sYXlvdXQnXG5pbXBvcnQgeyBnZXRQb3N0QnlTbHVnLCBnZXRBbGxQb3N0cywgZXh0cmFjdFBvc3RFeGNlcnB0IH0gZnJvbSAnQC9saWIvYXBpJ1xuaW1wb3J0IFBvc3RUaXRsZSBmcm9tICdAL2NvbXBvbmVudHMvcG9zdC10aXRsZSdcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBtYXJrZG93blRvSHRtbCBmcm9tICdAL2xpYi9tYXJrZG93blRvSHRtbCdcbmltcG9ydCB7IE1PUkVfUE9TVF9OVU0sIEVYQ0VSUFRfTEVOR1RIX0NBUkQsIEVYQ0VSUFRfTEVOR1RIX0NOX0NBUkQgfSBmcm9tICdAL2xpYi9jb25zdGFudHMnXG5cbmZ1bmN0aW9uIEhlYWRNZXRhKHsgcG9zdCB9KSB7XG4gIHJldHVybiAoXG4gICAgPEhlYWQ+XG4gICAgICA8dGl0bGU+e3Bvc3QudGl0bGV9PC90aXRsZT5cbiAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9e3Bvc3QuZGVzY3JpcHRpb24gfHwgJyd9IC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnR5cGVcIiBjb250ZW50PVwid2Vic2l0ZVwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD17cG9zdC50aXRsZX0gLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dXJsXCIgY29udGVudD17YC9wb3N0cy8ke3Bvc3Quc2x1Z31gfSAvPlxuICAgICAgeyBwb3N0LmRlc2NyaXB0aW9uICYmIDxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PXtwb3N0LmRlc2NyaXB0aW9ufS8+IH1cbiAgICAgIHsgcG9zdC5vZ0ltYWdlICYmIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PXtwb3N0Lm9nSW1hZ2V9IC8+IH1cbiAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeVwiIC8+XG4gICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjp0aXRsZVwiIGNvbnRlbnQ9e3Bvc3QudGl0bGV9IC8+XG4gICAgICB7IHBvc3QuZGVzY3JpcHRpb24gJiYgPG1ldGEgbmFtZT1cInR3aXR0ZXI6ZGVzY3JpcHRpb25cIiBjb250ZW50PXtwb3N0LmRlc2NyaXB0aW9ufSAvPiB9XG4gICAgICB7IHBvc3Qub2dJbWFnZSAmJiA8bWV0YSBuYW1lPVwidHdpdHRlcjppbWFnZVwiIGNvbnRlbnQ9e3Bvc3Qub2dJbWFnZX0gLz4gfVxuXG4gICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0va2F0ZXhAMC4xMi4wL2Rpc3Qva2F0ZXgubWluLmNzc1wiIGludGVncml0eT1cInNoYTM4NC1BZkVqMHI0L09Gck9vNXQ3Tm5OZTQ2elcvdEZnVzZ4L2JDSkc4RnFRQ0VvMytBcm82RVlVRzQrY1UrS0pXdS9YXCIgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIj48L2xpbms+XG4gICAgICA8c2NyaXB0IGRlZmVyIHNyYz1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0va2F0ZXhAMC4xMi4wL2Rpc3Qva2F0ZXgubWluLmpzXCIgaW50ZWdyaXR5PVwic2hhMzg0LWc3YytKcjlaaXZ4S0xuWlREVWhua09uc2gzMEI0SDBycExVcEo0akFJS3M0Zm5KSStzRW5rdnJNV3BoMkVEZzRcIiBjcm9zc09yaWdpbj1cImFub255bW91c1wiPjwvc2NyaXB0PlxuICAgIDwvSGVhZD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb3N0KHsgcG9zdCwgcG9zdE5hdiwgbW9yZVBvc3RzIH0pIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcbiAgaWYgKCFyb3V0ZXIuaXNGYWxsYmFjayAmJiAhcG9zdD8uc2x1Zykge1xuICAgIHJldHVybiA8RXJyb3JQYWdlIHN0YXR1c0NvZGU9ezQwNH0gLz5cbiAgfVxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQ+XG4gICAgICB7cm91dGVyLmlzRmFsbGJhY2sgPyAoXG4gICAgICAgIDxQb3N0VGl0bGU+TG9hZGluZ+KApjwvUG9zdFRpdGxlPlxuICAgICAgKSA6IChcbiAgICAgICAgPD4gXG4gICAgICAgICAgPEhlYWRNZXRhIHBvc3Q9e3Bvc3R9IC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteC1hdXRvXCI+XG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJtYi0yMFwiPlxuICAgICAgICAgICAgICA8UG9zdEhlYWRlciBwb3N0PXtwb3N0fS8+XG4gICAgICAgICAgICAgIDxQb3N0Qm9keSBjb250ZW50PXtwb3N0LmNvbnRlbnR9IC8+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICA8UG9zdEZvb3RlciBwb3N0PXtwb3N0fSBwb3N0TmF2PXtwb3N0TmF2fSBtb3JlUG9zdHM9e21vcmVQb3N0c30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgIDwvTGF5b3V0PlxuICApXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyh7IHBhcmFtcyB9KSB7XG4gIGNvbnN0IHBvc3QgPSBnZXRQb3N0QnlTbHVnKHBhcmFtcy5zbHVnLCBbXG4gICAgJ3RpdGxlJyxcbiAgICAnZGF0ZScsXG4gICAgJ3NsdWcnLFxuICAgICdkZXNjcmlwdGlvbicsXG4gICAgJ29nSW1hZ2UnLFxuICAgICdjYXRlZ29yaWVzJyxcbiAgICAncmVhZFRpbWUnLFxuICAgICdjb250ZW50JyxcbiAgXSk7XG4gIGNvbnN0IHBvc3RDb250ZW50ID0gYXdhaXQgbWFya2Rvd25Ub0h0bWwocG9zdC5jb250ZW50IHx8ICcnKVxuXG4gIGNvbnN0IGFsbFBvc3RzID0gZ2V0QWxsUG9zdHMoWydzbHVnJywgJ2RhdGUnLCAnY2F0ZWdvcmllcyddKTtcbiAgbGV0IGluZGV4ID0gYWxsUG9zdHMuZmluZEluZGV4KHAgPT4gcC5zbHVnID09PSBwb3N0LnNsdWcpO1xuXHRsZXQgcHJldmlvdXMgPSBpbmRleCA9PT0gYWxsUG9zdHMubGVuZ3RoLTEgPyBudWxsIDogYWxsUG9zdHNbaW5kZXgrMV07IFxuXHRsZXQgbmV4dCA9IGluZGV4ID09PSAwID8gbnVsbCA6IGFsbFBvc3RzW2luZGV4LTFdO1xuICBcbiAgbGV0IG1vcmVQb3N0cyA9IGFsbFBvc3RzLmZpbHRlcihwID0+IHAuc2x1ZyAhPT0gcG9zdC5zbHVnICYmIHAuY2F0ZWdvcmllcy5maW5kKGNhdCA9PiBwb3N0LmNhdGVnb3JpZXMuaW5jbHVkZXMoY2F0KSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBNT1JFX1BPU1RfTlVNKTtcbiAgaW5kZXggPSAwO1xuICB3aGlsZSAoaW5kZXggPCBhbGxQb3N0cy5sZW5ndGggJiYgbW9yZVBvc3RzLmxlbmd0aCA8IE1PUkVfUE9TVF9OVU0pIHtcbiAgICB3aGlsZShpbmRleCA8IGFsbFBvc3RzLmxlbmd0aCAmJiAoYWxsUG9zdHNbaW5kZXhdLnNsdWcgPT09IHBvc3Quc2x1ZyB8fCBtb3JlUG9zdHMuZmluZChwID0+IHAuc2x1ZyA9PT0gYWxsUG9zdHNbaW5kZXhdLnNsdWcpKSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgaWYgKGluZGV4ID49IGFsbFBvc3RzLmxlbmd0aCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG1vcmVQb3N0cy5wdXNoKGFsbFBvc3RzW2luZGV4XSk7XG4gIH1cbiAgbW9yZVBvc3RzID0gbW9yZVBvc3RzLm1hcChwID0+IHtcbiAgICBsZXQgZGV0YWlsUG9zdCA9IGdldFBvc3RCeVNsdWcocC5zbHVnLCBbXG4gICAgICAnc2x1ZycsXG4gICAgICAndGl0bGUnLFxuICAgICAgJ2RhdGUnLFxuICAgICAgJ2xvY2FsZScsXG4gICAgICAnb2dJbWFnZScsXG4gICAgICAnZXhjZXJwdCcsXG4gICAgICAncmVhZFRpbWUnLFxuICAgICAgJ2NvbnRlbnQnLFxuICAgIF0pO1xuICAgIGlmIChkZXRhaWxQb3N0LmV4Y2VycHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGV0YWlsUG9zdC5leGNlcnB0ID0gZXh0cmFjdFBvc3RFeGNlcnB0KGRldGFpbFBvc3QsIHsgZW46IEVYQ0VSUFRfTEVOR1RIX0NBUkQsIGNuOiBFWENFUlBUX0xFTkdUSF9DTl9DQVJEIH0pO1xuICAgIH1cbiAgICBkZWxldGUgZGV0YWlsUG9zdC5jb250ZW50O1xuICAgIHJldHVybiBkZXRhaWxQb3N0O1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBwb3N0OiB7XG4gICAgICAgIC4uLnBvc3QsXG4gICAgICAgIGNvbnRlbnQ6IHBvc3RDb250ZW50LFxuICAgICAgfSxcbiAgICAgIHBvc3ROYXY6IHtcbiAgICAgICAgcHJldmlvdXM6IHByZXZpb3VzICYmIGAvcG9zdHMvJHtlbmNvZGVVUklDb21wb25lbnQocHJldmlvdXMuc2x1Zyl9YCxcbiAgICAgICAgbmV4dDogbmV4dCAmJiBgL3Bvc3RzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5leHQuc2x1Zyl9YFxuICAgICAgfSxcbiAgICAgIG1vcmVQb3N0cyxcbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQYXRocygpIHtcbiAgY29uc3QgcG9zdHMgPSBnZXRBbGxQb3N0cyhbJ3NsdWcnXSlcblxuICByZXR1cm4ge1xuICAgIHBhdGhzOiBwb3N0cy5tYXAoKHBvc3QpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHNsdWc6IHBvc3Quc2x1ZyxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KSxcbiAgICBmYWxsYmFjazogZmFsc2UsXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/posts/[slug].js\n");

/***/ })

})