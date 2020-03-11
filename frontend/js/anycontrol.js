!function (n, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.anycontrol = t() : n.anycontrol = t() }(window, (function () { return function (n) { var t = {}; function o(e) { if (t[e]) return t[e].exports; var i = t[e] = { i: e, l: !1, exports: {} }; return n[e].call(i.exports, i, i.exports, o), i.l = !0, i.exports } return o.m = n, o.c = t, o.d = function (n, t, e) { o.o(n, t) || Object.defineProperty(n, t, { enumerable: !0, get: e }) }, o.r = function (n) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 }) }, o.t = function (n, t) { if (1 & t && (n = o(n)), 8 & t) return n; if (4 & t && "object" == typeof n && n && n.__esModule) return n; var e = Object.create(null); if (o.r(e), Object.defineProperty(e, "default", { enumerable: !0, value: n }), 2 & t && "string" != typeof n) for (var i in n) o.d(e, i, function (t) { return n[t] }.bind(null, i)); return e }, o.n = function (n) { var t = n && n.__esModule ? function () { return n.default } : function () { return n }; return o.d(t, "a", t), t }, o.o = function (n, t) { return Object.prototype.hasOwnProperty.call(n, t) }, o.p = "", o(o.s = 0) }([function (n, t, o) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }); var e = function () { var n = this, t = window.webkitSpeechRecognition || window.SpeechRecognition; return this.recognition = new t, this.finalTranscript = "", this.commands = {}, this.DEBUG = !1, this.recognizing = !1, this.recognition.onresult = function (t) { if (void 0 === t.results) return n.DEBUG && console.info("undefined result"), void n.recognition.stop(); for (var o = t.resultIndex; o < t.results.length; o += 1)t.results[o].isFinal && (n.finalTranscript += t.results[o][0].transcript); if ("" !== n.finalTranscript) { n.DEBUG && console.info("received command:", n.finalTranscript), n.finalTranscript = n.finalTranscript.toLowerCase().trim(); var e = n.commands; Object.keys(e).forEach((function (t) { if ("function" == typeof n.commands[t]) { if (n.finalTranscript.indexOf(t) > -1) if (void 0 === n.finalTranscript[t.length]) n.DEBUG && console.info("calling command", t), n.commands[t](); else if (" " === n.finalTranscript[t.length]) { var o = n.finalTranscript.substring(t.length, n.finalTranscript.length).trim(); n.commands[t](o), n.DEBUG && console.info("calling command", t, "with param:", o) } else n.commands[t]() } else if (n.commands[t].fragments && "function" == typeof n.commands[t].callback) { for (var e = JSON.parse(JSON.stringify(n.commands[t].snippets)), i = JSON.parse(JSON.stringify(n.commands[t].keywords)), r = n.commands[t].startsWidthKeyword, s = n.finalTranscript, c = !0, a = {}, f = 0; f < e.length; f += 1) { var l = e[f].toLowerCase().trim(); if (-1 === s.indexOf(l)) { c = !1; break } } var u = void 0; if (c) { if (r) { u = s.substring(s.indexOf(e[0].toLowerCase())); var m = i[0], d = s.substring(0, s.indexOf(e[0].toLowerCase())); m && d && (a[m.replace("${", "").replace("}", "").trim()] = d.trim()), i.splice(0, 1) } else u = s.substring(s.indexOf(e[0].toLowerCase())); for (var p = u, g = 0; g < e.length; g += 1) { var h = e[g].trim(), y = i[g]; p = (p = p.trim()).replace(new RegExp("^" + h.toLowerCase(), "gm"), ""); var v = void 0; v = g + 1 < e.length ? p.substring(0, p.indexOf(e[g + 1])) : p, p = (p = (p = p.trim()).substring(p.indexOf(e[g + 1]))).trim(), y && v && (a[y.replace("${", "").replace("}", "").trim()] = v.trim()), a.transcript = n.finalTranscript } n.commands[t].callback(a), n.DEBUG && console.info('calling command: "' + t + '" with params: ', a) } } })), n.finalTranscript = "" } else n.DEBUG && console.info("received empty command") }, this.recognition.onerror = function (t) { n.DEBUG && console.info("error occured", t) }, this.recognition.onstart = function (t) { n.DEBUG && console.info("start", t), n.recognizing = !0 }, this.recognition.onend = function (t) { n.DEBUG && console.info("end", t), n.recognizing = !1, n.recognition.continuous && (n.DEBUG && console.info("restarting", n.recognition.continuous), n.recognition.start()) }, this }; e.prototype.isSupported = function () { return !!this.recognition }, e.prototype.addCommand = function (n, t) { this.DEBUG && console.info("added command:", n); var o = n.match(/\${[a-zA-Z0-9_-]*}/gim); if (o) { for (var e = (n.split(/\${[a-zA-Z0-9_-]*}/gim) || []).filter((function (n) { return n })).map((function (n) { return n.trim() })), i = n.match(/^\${[a-zA-Z0-9_-]*}/gim) || !1, r = [], s = 0; s < o.length; s += 1)i ? (o[s] && r.push(o[s].trim()), e[s] && r.push(e[s].trim().toLowerCase())) : (e[s] && r.push(e[s].trim().toLowerCase()), o[s] && r.push(o[s].trim())); this.commands[n] = { startsWidthKeyword: i, snippets: e, keywords: o, fragments: r, callback: t } } else this.commands[n.toLowerCase()] = t }, e.prototype.removeCommand = function (n) { return this.DEBUG && console.info("removed command:", n), !!this.commands[n] && (delete this.commands[n], !0) }, e.prototype.start = function () { this.DEBUG && console.info("started listening"), this.recognition.continuous = !0, this.recognition.start() }, e.prototype.stop = function () { this.DEBUG && console.info("stopped listening"), this.recognition.continuous = !1, this.recognition.stop() }, e.prototype.getCommand = function () { var n = this, t = 1; this.isRecognizing() && (this.stop(), t = 1e3), setTimeout((function () { n.DEBUG && console.info("listening for single command"), n.recognition.continuous = !1, n.recognition.start() }), t) }, e.prototype.debug = function (n) { this.DEBUG = !!n }, e.prototype.isRecognizing = function () { return this.recognizing }; var i = e; t.default = i, n.exports = i }]) }));
//# sourceMappingURL=index.umd.min.js.map