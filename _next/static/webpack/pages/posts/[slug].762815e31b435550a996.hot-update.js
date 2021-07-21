webpackHotUpdate_N_E("pages/posts/[slug]",{

/***/ "./components/post-footer.js":
/*!***********************************!*\
  !*** ./components/post-footer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PostFooter; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var disqus_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! disqus-react */ \"./node_modules/disqus-react/lib/index.js\");\n/* harmony import */ var disqus_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(disqus_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _post_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./post-card */ \"./components/post-card.js\");\n/* harmony import */ var _segment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./segment */ \"./components/segment.js\");\n/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./share */ \"./components/share.js\");\n\nvar _jsxFileName = \"/Users/ling/Desktop/MSpace/WEB/imagicbell-website/components/post-footer.js\";\n\n\n\n\n\n\n\nfunction PostNav(_ref) {\n  var postNav = _ref.postNav;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    className: \"flex leading-6 font-medium text-lg\",\n    children: [postNav.previous && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {\n      href: postNav.previous,\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"a\", {\n        className: \"flex mr-8 transition-colors duration-200 text-theme-link hover:text-theme-link-highlight\",\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"span\", {\n          \"aria-hidden\": true,\n          className: \"mr-2\",\n          children: \"\\u2190\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 15,\n          columnNumber: 8\n        }, this), \"Previous Post\"]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 14,\n        columnNumber: 7\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 6\n    }, this), postNav.next && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {\n      href: postNav.next,\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"a\", {\n        className: \"flex text-right ml-auto transition-colors duration-200 text-theme-link hover:text-theme-link-highlight\",\n        children: [\"Next Post\", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"span\", {\n          \"aria-hidden\": true,\n          className: \"ml-2\",\n          children: \"\\u2192\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 25,\n          columnNumber: 8\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 23,\n        columnNumber: 7\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 22,\n      columnNumber: 6\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 10,\n    columnNumber: 3\n  }, this);\n}\n\n_c = PostNav;\n\nfunction PostShare(_ref2) {\n  var post = _ref2.post;\n  var meta = {\n    path: \"/posts/\".concat(post.slug),\n    title: post.title,\n    image: post.ogImage\n  };\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    className: \"flex leading-6 justify-center\",\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_share__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n      size: 40,\n      meta: meta\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 4\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 41,\n    columnNumber: 3\n  }, this);\n}\n\n_c2 = PostShare;\n\nfunction PostDisqus(_ref3) {\n  var post = _ref3.post;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(disqus_react__WEBPACK_IMPORTED_MODULE_3__[\"DiscussionEmbed\"], {\n    shortname: \"https-imagicbell-github-io\",\n    config: {\n      url: \"\".concat(\"http://localhost:3000\").concat(\"\", \"/posts/\").concat(post.slug),\n      identifier: post.slug,\n      title: post.title,\n      language: 'en'\n    }\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 49,\n    columnNumber: 3\n  }, this);\n}\n\n_c3 = PostDisqus;\n\nfunction PostMore(_ref4) {\n  var _this = this;\n\n  var morePosts = _ref4.morePosts;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    className: \"pt-4 pb-6\",\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      className: \"text-xl font-medium leading-tight md:leading-none mb-6 text-center\",\n      children: \"MORE FROM THE BLOG\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 66,\n      columnNumber: 4\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"grid grid-flow-row grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-4\",\n      children: morePosts.map(function (post) {\n        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_post_card__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n          post: post\n        }, post.slug, false, {\n          fileName: _jsxFileName,\n          lineNumber: 70,\n          columnNumber: 7\n        }, _this);\n      })\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 67,\n      columnNumber: 4\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 65,\n    columnNumber: 3\n  }, this);\n}\n\n_c4 = PostMore;\n\nfunction Section(_ref5) {\n  var children = _ref5.children;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_segment__WEBPACK_IMPORTED_MODULE_5__[\"Hr\"], {\n      className: \"mt-6 mb-6\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 81,\n      columnNumber: 4\n    }, this), children]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 80,\n    columnNumber: 3\n  }, this);\n}\n\n_c5 = Section;\nfunction PostFooter(_ref6) {\n  var post = _ref6.post,\n      postNav = _ref6.postNav,\n      morePosts = _ref6.morePosts;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"max-w-3xl mx-auto\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Section, {\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(PostShare, {\n          post: post\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 91,\n          columnNumber: 14\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 91,\n        columnNumber: 5\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Section, {\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(PostNav, {\n          postNav: postNav\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 92,\n          columnNumber: 14\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 92,\n        columnNumber: 5\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Section, {\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(PostDisqus, {\n          post: post\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 93,\n          columnNumber: 14\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 93,\n        columnNumber: 5\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 90,\n      columnNumber: 4\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"max-w-5xl mx-auto\",\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Section, {\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(PostMore, {\n          morePosts: morePosts\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 96,\n          columnNumber: 14\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 96,\n        columnNumber: 5\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 4\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 89,\n    columnNumber: 3\n  }, this);\n}\n_c6 = PostFooter;\n\nvar _c, _c2, _c3, _c4, _c5, _c6;\n\n$RefreshReg$(_c, \"PostNav\");\n$RefreshReg$(_c2, \"PostShare\");\n$RefreshReg$(_c3, \"PostDisqus\");\n$RefreshReg$(_c4, \"PostMore\");\n$RefreshReg$(_c5, \"Section\");\n$RefreshReg$(_c6, \"PostFooter\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9wb3N0LWZvb3Rlci5qcz83ZjBhIl0sIm5hbWVzIjpbIlBvc3ROYXYiLCJwb3N0TmF2IiwicHJldmlvdXMiLCJuZXh0IiwiUG9zdFNoYXJlIiwicG9zdCIsIm1ldGEiLCJwYXRoIiwic2x1ZyIsInRpdGxlIiwiaW1hZ2UiLCJvZ0ltYWdlIiwiUG9zdERpc3F1cyIsInVybCIsInByb2Nlc3MiLCJpZGVudGlmaWVyIiwibGFuZ3VhZ2UiLCJQb3N0TW9yZSIsIm1vcmVQb3N0cyIsIm1hcCIsIlNlY3Rpb24iLCJjaGlsZHJlbiIsIlBvc3RGb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxPQUFULE9BQThCO0FBQUEsTUFBWEMsT0FBVyxRQUFYQSxPQUFXO0FBQzdCLHNCQUNDO0FBQUssYUFBUyxFQUFDLG9DQUFmO0FBQUEsZUFFRUEsT0FBTyxDQUFDQyxRQUFSLGlCQUNDLHFFQUFDLGdEQUFEO0FBQU0sVUFBSSxFQUFFRCxPQUFPLENBQUNDLFFBQXBCO0FBQUEsNkJBQ0M7QUFBRyxpQkFBUyxFQUFDLDBGQUFiO0FBQUEsZ0NBQ0M7QUFBTSw2QkFBTjtBQUFrQixtQkFBUyxFQUFDLE1BQTVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUREO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFISCxFQVdFRCxPQUFPLENBQUNFLElBQVIsaUJBQ0MscUVBQUMsZ0RBQUQ7QUFBTSxVQUFJLEVBQUVGLE9BQU8sQ0FBQ0UsSUFBcEI7QUFBQSw2QkFDQztBQUFHLGlCQUFTLEVBQUMsd0dBQWI7QUFBQSw2Q0FFQztBQUFNLDZCQUFOO0FBQWtCLG1CQUFTLEVBQUMsTUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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QTtBQUFBO0FBQUE7QUFBQSxjQUhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURELGVBTUM7QUFBSyxlQUFTLEVBQUMsbUJBQWY7QUFBQSw2QkFDQyxxRUFBQyxPQUFEO0FBQUEsK0JBQVMscUVBQUMsUUFBRDtBQUFVLG1CQUFTLEVBQUVhO0FBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU5EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUREO0FBYUE7TUFkdUJJLFUiLCJmaWxlIjoiLi9jb21wb25lbnRzL3Bvc3QtZm9vdGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB7IERpc2N1c3Npb25FbWJlZCB9IGZyb20gJ2Rpc3F1cy1yZWFjdCc7XG5pbXBvcnQgUG9zdENhcmQgZnJvbSAnLi9wb3N0LWNhcmQnO1xuaW1wb3J0IHsgSHIgfSBmcm9tICcuL3NlZ21lbnQnO1xuaW1wb3J0IFNoYXJlIGZyb20gJy4vc2hhcmUnO1xuXG5mdW5jdGlvbiBQb3N0TmF2KHsgcG9zdE5hdiB9KSB7XG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGxlYWRpbmctNiBmb250LW1lZGl1bSB0ZXh0LWxnXCI+XG5cdFx0XHR7XG5cdFx0XHRcdHBvc3ROYXYucHJldmlvdXMgJiYgXG5cdFx0XHRcdFx0PExpbmsgaHJlZj17cG9zdE5hdi5wcmV2aW91c30+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbGV4IG1yLTggdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIHRleHQtdGhlbWUtbGluayBob3Zlcjp0ZXh0LXRoZW1lLWxpbmstaGlnaGxpZ2h0XCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuIGNsYXNzTmFtZT1cIm1yLTJcIj7ihpA8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFByZXZpb3VzIFBvc3Rcblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L0xpbms+XG5cdFx0XHR9XG5cdFx0XHR7XG5cdFx0XHRcdHBvc3ROYXYubmV4dCAmJlxuXHRcdFx0XHRcdDxMaW5rIGhyZWY9e3Bvc3ROYXYubmV4dH0+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbGV4IHRleHQtcmlnaHQgbWwtYXV0byB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDAgdGV4dC10aGVtZS1saW5rIGhvdmVyOnRleHQtdGhlbWUtbGluay1oaWdobGlnaHRcIj5cblx0XHRcdFx0XHRcdFx0TmV4dCBQb3N0XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuIGNsYXNzTmFtZT1cIm1sLTJcIj7ihpI8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0fVxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmZ1bmN0aW9uIFBvc3RTaGFyZSh7IHBvc3QgfSkge1xuXHRjb25zdCBtZXRhID0ge1xuXHRcdHBhdGg6IGAvcG9zdHMvJHtwb3N0LnNsdWd9YCxcblx0XHR0aXRsZTogcG9zdC50aXRsZSxcblx0XHRpbWFnZTogcG9zdC5vZ0ltYWdlXG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggbGVhZGluZy02IGp1c3RpZnktY2VudGVyXCI+XG5cdFx0XHQ8U2hhcmUgc2l6ZT17NDB9IG1ldGE9e21ldGF9IC8+XG5cdFx0PC9kaXY+XG5cdClcbn1cdFxuXG5mdW5jdGlvbiBQb3N0RGlzcXVzKHsgcG9zdCB9KSB7XG5cdHJldHVybiAoXG5cdFx0PERpc2N1c3Npb25FbWJlZFxuXHRcdFx0c2hvcnRuYW1lPSdodHRwcy1pbWFnaWNiZWxsLWdpdGh1Yi1pbydcblx0XHRcdGNvbmZpZz17XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcdHVybDogYCR7cHJvY2Vzcy5lbnYuZG9tYWlufSR7cHJvY2Vzcy5lbnYuYmFzZVBhdGh9L3Bvc3RzLyR7cG9zdC5zbHVnfWAsXG5cdFx0XHRcdFx0XHRpZGVudGlmaWVyOiBwb3N0LnNsdWcsXG5cdFx0XHRcdFx0XHR0aXRsZTogcG9zdC50aXRsZSxcblx0XHRcdFx0XHRcdGxhbmd1YWdlOiAnZW4nIFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0Lz5cblx0KVxufVxuXG5mdW5jdGlvbiBQb3N0TW9yZSh7IG1vcmVQb3N0cyB9KSB7XG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJwdC00IHBiLTZcIj5cblx0XHRcdDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtbWVkaXVtIGxlYWRpbmctdGlnaHQgbWQ6bGVhZGluZy1ub25lIG1iLTYgdGV4dC1jZW50ZXJcIj5NT1JFIEZST00gVEhFIEJMT0c8L2gyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtZmxvdy1yb3cgZ3JpZC1jb2xzLTIgZ3JpZC1yb3dzLTIgbGc6Z3JpZC1jb2xzLTQgbGc6Z3JpZC1yb3dzLTEgZ2FwLTRcIj5cblx0XHRcdFx0eyBcblx0XHRcdFx0XHRtb3JlUG9zdHMubWFwKHBvc3QgPT4gKFxuXHRcdFx0XHRcdFx0PFBvc3RDYXJkIGtleT17cG9zdC5zbHVnfSBwb3N0PXtwb3N0fSAvPlxuXHRcdFx0XHRcdCkpIFxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5mdW5jdGlvbiBTZWN0aW9uKHsgY2hpbGRyZW4gfSkge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8SHIgY2xhc3NOYW1lPVwibXQtNiBtYi02XCIvPlxuXHRcdFx0eyBjaGlsZHJlbiB9XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUG9zdEZvb3Rlcih7IHBvc3QsIHBvc3ROYXYsIG1vcmVQb3N0cyB9KSB7XG5cdHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsIG14LWF1dG9cIj5cblx0XHRcdFx0PFNlY3Rpb24+PFBvc3RTaGFyZSBwb3N0PXtwb3N0fSAvPjwvU2VjdGlvbj5cblx0XHRcdFx0PFNlY3Rpb24+PFBvc3ROYXYgcG9zdE5hdj17cG9zdE5hdn0gLz48L1NlY3Rpb24+XG5cdFx0XHRcdDxTZWN0aW9uPjxQb3N0RGlzcXVzIHBvc3Q9e3Bvc3R9IC8+PC9TZWN0aW9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTV4bCBteC1hdXRvXCI+XG5cdFx0XHRcdDxTZWN0aW9uPjxQb3N0TW9yZSBtb3JlUG9zdHM9e21vcmVQb3N0c30gLz48L1NlY3Rpb24+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHRcblx0KVxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/post-footer.js\n");

/***/ })

})