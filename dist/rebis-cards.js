/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = globalThis, Pt = Qe.ShadowRoot && (Qe.ShadyCSS === void 0 || Qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bt = Symbol(), gs = /* @__PURE__ */ new WeakMap();
let Us = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Pt && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = gs.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && gs.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Un = (n) => new Us(typeof n == "string" ? n : n + "", void 0, Bt), Kn = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Us(t, n, Bt);
}, Rn = (n, e) => {
  if (Pt) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = Qe.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, n.appendChild(s);
  }
}, ys = Pt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Un(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qn, defineProperty: Fn, getOwnPropertyDescriptor: Hn, getOwnPropertyNames: Vn, getOwnPropertySymbols: Jn, getPrototypeOf: Yn } = Object, G = globalThis, bs = G.trustedTypes, Gn = bs ? bs.emptyScript : "", dt = G.reactiveElementPolyfillSupport, Ae = (n, e) => n, Nt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Gn : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ks = (n, e) => !qn(n, e), ws = { attribute: !0, type: String, converter: Nt, reflect: !1, useDefault: !1, hasChanged: Ks };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), G.litPropertyMetadata ?? (G.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ae = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ws) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && Fn(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: r } = Hn(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, o), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ws;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ae("elementProperties"))) return;
    const e = Yn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ae("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ae("properties"))) {
      const t = this.properties, s = [...Vn(t), ...Jn(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(ys(i));
    } else e !== void 0 && t.push(ys(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rn(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var r;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : Nt).toAttribute(t, s.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, o;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Nt;
      this._$Em = i;
      const c = l.fromAttribute(t, a.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, s) {
    var i;
    if (e !== void 0) {
      const r = this.constructor, o = this[e];
      if (s ?? (s = r.getPropertyOptions(e)), !((s.hasChanged ?? Ks)(o, t) || s.useDefault && s.reflect && o === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: r }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: a } = o, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ae.elementStyles = [], ae.shadowRootOptions = { mode: "open" }, ae[Ae("elementProperties")] = /* @__PURE__ */ new Map(), ae[Ae("finalized")] = /* @__PURE__ */ new Map(), dt == null || dt({ ReactiveElement: ae }), (G.reactiveElementVersions ?? (G.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = globalThis, xe = Ne.trustedTypes, Ss = xe ? xe.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Rs = "$lit$", Y = `lit$${Math.random().toFixed(9).slice(2)}$`, qs = "?" + Y, Wn = `<${qs}>`, te = document, ve = () => te.createComment(""), Ie = (n) => n === null || typeof n != "object" && typeof n != "function", Dt = Array.isArray, Qn = (n) => Dt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, Se = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $s = /-->/g, ks = />/g, Q = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _s = /'/g, As = /"/g, Fs = /^(?:script|style|textarea|title)$/i, zn = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), mt = zn(1), se = Symbol.for("lit-noChange"), L = Symbol.for("lit-nothing"), Ns = /* @__PURE__ */ new WeakMap(), X = te.createTreeWalker(te, 129);
function Hs(n, e) {
  if (!Dt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ss !== void 0 ? Ss.createHTML(e) : e;
}
const Xn = (n, e) => {
  const t = n.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Se;
  for (let a = 0; a < t; a++) {
    const l = n[a];
    let c, u, f = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, u = o.exec(l), u !== null); ) p = o.lastIndex, o === Se ? u[1] === "!--" ? o = $s : u[1] !== void 0 ? o = ks : u[2] !== void 0 ? (Fs.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = Q) : u[3] !== void 0 && (o = Q) : o === Q ? u[0] === ">" ? (o = i ?? Se, f = -1) : u[1] === void 0 ? f = -2 : (f = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? Q : u[3] === '"' ? As : _s) : o === As || o === _s ? o = Q : o === $s || o === ks ? o = Se : (o = Q, i = void 0);
    const h = o === Q && n[a + 1].startsWith("/>") ? " " : "";
    r += o === Se ? l + Wn : f >= 0 ? (s.push(c), l.slice(0, f) + Rs + l.slice(f) + Y + h) : l + Y + (f === -2 ? a : h);
  }
  return [Hs(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Ce {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, l = this.parts, [c, u] = Xn(e, t);
    if (this.el = Ce.createElement(c, s), X.currentNode = this.el.content, t === 2 || t === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (i = X.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const f of i.getAttributeNames()) if (f.endsWith(Rs)) {
          const p = u[o++], h = i.getAttribute(f).split(Y), g = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: g[2], strings: h, ctor: g[1] === "." ? xn : g[1] === "?" ? ei : g[1] === "@" ? ti : nt }), i.removeAttribute(f);
        } else f.startsWith(Y) && (l.push({ type: 6, index: r }), i.removeAttribute(f));
        if (Fs.test(i.tagName)) {
          const f = i.textContent.split(Y), p = f.length - 1;
          if (p > 0) {
            i.textContent = xe ? xe.emptyScript : "";
            for (let h = 0; h < p; h++) i.append(f[h], ve()), X.nextNode(), l.push({ type: 2, index: ++r });
            i.append(f[p], ve());
          }
        }
      } else if (i.nodeType === 8) if (i.data === qs) l.push({ type: 2, index: r });
      else {
        let f = -1;
        for (; (f = i.data.indexOf(Y, f + 1)) !== -1; ) l.push({ type: 7, index: r }), f += Y.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const s = te.createElement("template");
    return s.innerHTML = e, s;
  }
}
function de(n, e, t = n, s) {
  var o, a;
  if (e === se) return e;
  let i = s !== void 0 ? (o = t._$Co) == null ? void 0 : o[s] : t._$Cl;
  const r = Ie(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = de(n, i._$AS(n, e.values), i, s)), e;
}
class Zn {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? te).importNode(t, !0);
    X.currentNode = i;
    let r = X.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Pe(r, r.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (c = new si(r, this, e)), this._$AV.push(c), l = s[++a];
      }
      o !== (l == null ? void 0 : l.index) && (r = X.nextNode(), o++);
    }
    return X.currentNode = te, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class Pe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = de(this, e, t), Ie(e) ? e === L || e == null || e === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : e !== this._$AH && e !== se && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Qn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== L && Ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(te.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Ce.createElement(Hs(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const o = new Zn(i, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ns.get(e.strings);
    return t === void 0 && Ns.set(e.strings, t = new Ce(e)), t;
  }
  k(e) {
    Dt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const r of e) i === t.length ? t.push(s = new Pe(this.O(ve()), this.O(ve()), this, this.options)) : s = t[i], s._$AI(r), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, r) {
    this.type = 1, this._$AH = L, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = L;
  }
  _$AI(e, t = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = de(this, e, t, 0), o = !Ie(e) || e !== this._$AH && e !== se, o && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = r[0], l = 0; l < r.length - 1; l++) c = de(this, a[s + l], t, l), c === se && (c = this._$AH[l]), o || (o = !Ie(c) || c !== this._$AH[l]), c === L ? e = L : e !== L && (e += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class xn extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === L ? void 0 : e;
  }
}
class ei extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== L);
  }
}
class ti extends nt {
  constructor(e, t, s, i, r) {
    super(e, t, s, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = de(this, e, t, 0) ?? L) === se) return;
    const s = this._$AH, i = e === L && s !== L || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== L && (s === L || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class si {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    de(this, e);
  }
}
const gt = Ne.litHtmlPolyfillSupport;
gt == null || gt(Ce, Pe), (Ne.litHtmlVersions ?? (Ne.litHtmlVersions = [])).push("3.3.1");
const ni = (n, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = i = new Pe(e.insertBefore(ve(), r), r, void 0, t ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = globalThis;
let Ee = class extends ae {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ni(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return se;
  }
};
var js;
Ee._$litElement$ = !0, Ee.finalized = !0, (js = ee.litElementHydrateSupport) == null || js.call(ee, { LitElement: Ee });
const yt = ee.litElementPolyfillSupport;
yt == null || yt({ LitElement: Ee });
(ee.litElementVersions ?? (ee.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = { CHILD: 2 }, ri = (n) => (...e) => ({ _$litDirective$: n, values: e });
class oi {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, s) {
    this._$Ct = e, this._$AM = t, this._$Ci = s;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Et extends oi {
  constructor(e) {
    if (super(e), this.it = L, e.type !== ii.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === L || e == null) return this._t = void 0, this.it = e;
    if (e === se) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
Et.directiveName = "unsafeHTML", Et.resultType = 1;
const bt = ri(Et), jt = Symbol.for("yaml.alias"), Ot = Symbol.for("yaml.document"), W = Symbol.for("yaml.map"), Vs = Symbol.for("yaml.pair"), q = Symbol.for("yaml.scalar"), ge = Symbol.for("yaml.seq"), j = Symbol.for("yaml.node.type"), ie = (n) => !!n && typeof n == "object" && n[j] === jt, it = (n) => !!n && typeof n == "object" && n[j] === Ot, Be = (n) => !!n && typeof n == "object" && n[j] === W, C = (n) => !!n && typeof n == "object" && n[j] === Vs, E = (n) => !!n && typeof n == "object" && n[j] === q, De = (n) => !!n && typeof n == "object" && n[j] === ge;
function v(n) {
  if (n && typeof n == "object")
    switch (n[j]) {
      case W:
      case ge:
        return !0;
    }
  return !1;
}
function I(n) {
  if (n && typeof n == "object")
    switch (n[j]) {
      case jt:
      case W:
      case q:
      case ge:
        return !0;
    }
  return !1;
}
const Js = (n) => (E(n) || v(n)) && !!n.anchor, z = Symbol("break visit"), ai = Symbol("skip children"), Oe = Symbol("remove node");
function ye(n, e) {
  const t = li(e);
  it(n) ? le(null, n.contents, t, Object.freeze([n])) === Oe && (n.contents = null) : le(null, n, t, Object.freeze([]));
}
ye.BREAK = z;
ye.SKIP = ai;
ye.REMOVE = Oe;
function le(n, e, t, s) {
  const i = ci(n, e, t, s);
  if (I(i) || C(i))
    return fi(n, s, i), le(n, i, t, s);
  if (typeof i != "symbol") {
    if (v(e)) {
      s = Object.freeze(s.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = le(r, e.items[r], t, s);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === z)
            return z;
          o === Oe && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (C(e)) {
      s = Object.freeze(s.concat(e));
      const r = le("key", e.key, t, s);
      if (r === z)
        return z;
      r === Oe && (e.key = null);
      const o = le("value", e.value, t, s);
      if (o === z)
        return z;
      o === Oe && (e.value = null);
    }
  }
  return i;
}
function li(n) {
  return typeof n == "object" && (n.Collection || n.Node || n.Value) ? Object.assign({
    Alias: n.Node,
    Map: n.Node,
    Scalar: n.Node,
    Seq: n.Node
  }, n.Value && {
    Map: n.Value,
    Scalar: n.Value,
    Seq: n.Value
  }, n.Collection && {
    Map: n.Collection,
    Seq: n.Collection
  }, n) : n;
}
function ci(n, e, t, s) {
  var i, r, o, a, l;
  if (typeof t == "function")
    return t(n, e, s);
  if (Be(e))
    return (i = t.Map) == null ? void 0 : i.call(t, n, e, s);
  if (De(e))
    return (r = t.Seq) == null ? void 0 : r.call(t, n, e, s);
  if (C(e))
    return (o = t.Pair) == null ? void 0 : o.call(t, n, e, s);
  if (E(e))
    return (a = t.Scalar) == null ? void 0 : a.call(t, n, e, s);
  if (ie(e))
    return (l = t.Alias) == null ? void 0 : l.call(t, n, e, s);
}
function fi(n, e, t) {
  const s = e[e.length - 1];
  if (v(s))
    s.items[n] = t;
  else if (C(s))
    n === "key" ? s.key = t : s.value = t;
  else if (it(s))
    s.contents = t;
  else {
    const i = ie(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const ui = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, hi = (n) => n.replace(/[!,[\]{}]/g, (e) => ui[e]);
class M {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, M.defaultYaml, e), this.tags = Object.assign({}, M.defaultTags, t);
  }
  clone() {
    const e = new M(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new M(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: M.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, M.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: M.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, M.defaultTags), this.atNextDocument = !1);
    const s = e.trim().split(/[ \t]+/), i = s.shift();
    switch (i) {
      case "%TAG": {
        if (s.length !== 2 && (t(0, "%TAG directive should contain exactly two parts"), s.length < 2))
          return !1;
        const [r, o] = s;
        return this.tags[r] = o, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, s.length !== 1)
          return t(0, "%YAML directive should contain exactly one part"), !1;
        const [r] = s;
        if (r === "1.1" || r === "1.2")
          return this.yaml.version = r, !0;
        {
          const o = /^\d+\.\d+$/.test(r);
          return t(6, `Unsupported YAML version ${r}`, o), !1;
        }
      }
      default:
        return t(0, `Unknown directive ${i}`, !0), !1;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(e, t) {
    if (e === "!")
      return "!";
    if (e[0] !== "!")
      return t(`Not a valid tag: ${e}`), null;
    if (e[1] === "<") {
      const o = e.slice(2, -1);
      return o === "!" || o === "!!" ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null) : (e[e.length - 1] !== ">" && t("Verbatim tags must end with a >"), o);
    }
    const [, s, i] = e.match(/^(.*!)([^!]*)$/s);
    i || t(`The ${e} tag has no suffix`);
    const r = this.tags[s];
    if (r)
      try {
        return r + decodeURIComponent(i);
      } catch (o) {
        return t(String(o)), null;
      }
    return s === "!" ? e : (t(`Could not resolve tag: ${e}`), null);
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(e) {
    for (const [t, s] of Object.entries(this.tags))
      if (e.startsWith(s))
        return t + hi(e.substring(s.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let i;
    if (e && s.length > 0 && I(e.contents)) {
      const r = {};
      ye(e.contents, (o, a) => {
        I(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of s)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
M.defaultYaml = { explicit: !1, version: "1.2" };
M.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Ys(n) {
  if (/[\x00-\x19\s,[\]{}]/.test(n)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;
    throw new Error(t);
  }
  return !0;
}
function Gs(n) {
  const e = /* @__PURE__ */ new Set();
  return ye(n, {
    Value(t, s) {
      s.anchor && e.add(s.anchor);
    }
  }), e;
}
function Ws(n, e) {
  for (let t = 1; ; ++t) {
    const s = `${n}${t}`;
    if (!e.has(s))
      return s;
  }
}
function di(n, e) {
  const t = [], s = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = Gs(n));
      const o = Ws(e, i);
      return i.add(o), o;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const r of t) {
        const o = s.get(r);
        if (typeof o == "object" && o.anchor && (E(o.node) || v(o.node)))
          o.node.anchor = o.anchor;
        else {
          const a = new Error("Failed to resolve repeated object (this should not happen)");
          throw a.source = r, a;
        }
      }
    },
    sourceObjects: s
  };
}
function ce(n, e, t, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let i = 0, r = s.length; i < r; ++i) {
        const o = s[i], a = ce(n, s, String(i), o);
        a === void 0 ? delete s[i] : a !== o && (s[i] = a);
      }
    else if (s instanceof Map)
      for (const i of Array.from(s.keys())) {
        const r = s.get(i), o = ce(n, s, i, r);
        o === void 0 ? s.delete(i) : o !== r && s.set(i, o);
      }
    else if (s instanceof Set)
      for (const i of Array.from(s)) {
        const r = ce(n, s, i, i);
        r === void 0 ? s.delete(i) : r !== i && (s.delete(i), s.add(r));
      }
    else
      for (const [i, r] of Object.entries(s)) {
        const o = ce(n, s, i, r);
        o === void 0 ? delete s[i] : o !== r && (s[i] = o);
      }
  return n.call(e, t, s);
}
function D(n, e, t) {
  if (Array.isArray(n))
    return n.map((s, i) => D(s, String(i), t));
  if (n && typeof n.toJSON == "function") {
    if (!t || !Js(n))
      return n.toJSON(e, t);
    const s = { aliasCount: 0, count: 1, res: void 0 };
    t.anchors.set(n, s), t.onCreate = (r) => {
      s.res = r, delete t.onCreate;
    };
    const i = n.toJSON(e, t);
    return t.onCreate && t.onCreate(i), i;
  }
  return typeof n == "bigint" && !(t != null && t.keep) ? Number(n) : n;
}
class Ut {
  constructor(e) {
    Object.defineProperty(this, j, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: s, onAnchor: i, reviver: r } = {}) {
    if (!it(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, a = D(this, "", o);
    if (typeof i == "function")
      for (const { count: l, res: c } of o.anchors.values())
        i(c, l);
    return typeof r == "function" ? ce(r, { "": a }, "", a) : a;
  }
}
class Kt extends Ut {
  constructor(e) {
    super(jt), this.source = e, Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(e, t) {
    let s;
    t != null && t.aliasResolveCache ? s = t.aliasResolveCache : (s = [], ye(e, {
      Node: (r, o) => {
        (ie(o) || Js(o)) && s.push(o);
      }
    }), t && (t.aliasResolveCache = s));
    let i;
    for (const r of s) {
      if (r === this)
        break;
      r.anchor === this.source && (i = r);
    }
    return i;
  }
  toJSON(e, t) {
    if (!t)
      return { source: this.source };
    const { anchors: s, doc: i, maxAliasCount: r } = t, o = this.resolve(i, t);
    if (!o) {
      const l = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(l);
    }
    let a = s.get(o);
    if (a || (D(o, null, t), a = s.get(o)), !a || a.res === void 0) {
      const l = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(l);
    }
    if (r >= 0 && (a.count += 1, a.aliasCount === 0 && (a.aliasCount = ze(i, o, s)), a.count * a.aliasCount > r)) {
      const l = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(l);
    }
    return a.res;
  }
  toString(e, t, s) {
    const i = `*${this.source}`;
    if (e) {
      if (Ys(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function ze(n, e, t) {
  if (ie(e)) {
    const s = e.resolve(n), i = t && s && t.get(s);
    return i ? i.count * i.aliasCount : 0;
  } else if (v(e)) {
    let s = 0;
    for (const i of e.items) {
      const r = ze(n, i, t);
      r > s && (s = r);
    }
    return s;
  } else if (C(e)) {
    const s = ze(n, e.key, t), i = ze(n, e.value, t);
    return Math.max(s, i);
  }
  return 1;
}
const Qs = (n) => !n || typeof n != "function" && typeof n != "object";
class N extends Ut {
  constructor(e) {
    super(q), this.value = e;
  }
  toJSON(e, t) {
    return t != null && t.keep ? this.value : D(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
N.BLOCK_FOLDED = "BLOCK_FOLDED";
N.BLOCK_LITERAL = "BLOCK_LITERAL";
N.PLAIN = "PLAIN";
N.QUOTE_DOUBLE = "QUOTE_DOUBLE";
N.QUOTE_SINGLE = "QUOTE_SINGLE";
const pi = "tag:yaml.org,2002:";
function mi(n, e, t) {
  if (e) {
    const s = t.filter((r) => r.tag === e), i = s.find((r) => !r.format) ?? s[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((s) => {
    var i;
    return ((i = s.identify) == null ? void 0 : i.call(s, n)) && !s.format;
  });
}
function Le(n, e, t) {
  var f, p, h;
  if (it(n) && (n = n.contents), I(n))
    return n;
  if (C(n)) {
    const g = (p = (f = t.schema[W]).createNode) == null ? void 0 : p.call(f, t.schema, null, t);
    return g.items.push(n), g;
  }
  (n instanceof String || n instanceof Number || n instanceof Boolean || typeof BigInt < "u" && n instanceof BigInt) && (n = n.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let l;
  if (s && n && typeof n == "object") {
    if (l = a.get(n), l)
      return l.anchor ?? (l.anchor = i(n)), new Kt(l.anchor);
    l = { anchor: null, node: null }, a.set(n, l);
  }
  e != null && e.startsWith("!!") && (e = pi + e.slice(2));
  let c = mi(n, e, o.tags);
  if (!c) {
    if (n && typeof n.toJSON == "function" && (n = n.toJSON()), !n || typeof n != "object") {
      const g = new N(n);
      return l && (l.node = g), g;
    }
    c = n instanceof Map ? o[W] : Symbol.iterator in Object(n) ? o[ge] : o[W];
  }
  r && (r(c), delete t.onTagObj);
  const u = c != null && c.createNode ? c.createNode(t.schema, n, t) : typeof ((h = c == null ? void 0 : c.nodeClass) == null ? void 0 : h.from) == "function" ? c.nodeClass.from(t.schema, n, t) : new N(n);
  return e ? u.tag = e : c.default || (u.tag = c.tag), l && (l.node = u), u;
}
function et(n, e, t) {
  let s = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = s, s = o;
    } else
      s = /* @__PURE__ */ new Map([[r, s]]);
  }
  return Le(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: n,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const ke = (n) => n == null || typeof n == "object" && !!n[Symbol.iterator]().next().done;
class zs extends Ut {
  constructor(e, t) {
    super(e), Object.defineProperty(this, "schema", {
      value: t,
      configurable: !0,
      enumerable: !1,
      writable: !0
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(e) {
    const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return e && (t.schema = e), t.items = t.items.map((s) => I(s) || C(s) ? s.clone(e) : s), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (ke(e))
      this.add(t);
    else {
      const [s, ...i] = e, r = this.get(s, !0);
      if (v(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, et(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    const [t, ...s] = e;
    if (s.length === 0)
      return this.delete(t);
    const i = this.get(t, !0);
    if (v(i))
      return i.deleteIn(s);
    throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    const [s, ...i] = e, r = this.get(s, !0);
    return i.length === 0 ? !t && E(r) ? r.value : r : v(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!C(t))
        return !1;
      const s = t.value;
      return s == null || e && E(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(e) {
    const [t, ...s] = e;
    if (s.length === 0)
      return this.has(t);
    const i = this.get(t, !0);
    return v(i) ? i.hasIn(s) : !1;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    const [s, ...i] = e;
    if (i.length === 0)
      this.set(s, t);
    else {
      const r = this.get(s, !0);
      if (v(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, et(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
}
const gi = (n) => n.replace(/^(?!$)(?: $)?/gm, "#");
function F(n, e) {
  return /^\n+$/.test(n) ? n.substring(1) : e ? n.replace(/^(?! *$)/gm, e) : n;
}
const Z = (n, e, t) => n.endsWith(`
`) ? F(t, e) : t.includes(`
`) ? `
` + F(t, e) : (n.endsWith(" ") ? "" : " ") + t, Xs = "flow", Tt = "block", Xe = "quoted";
function rt(n, e, t = "flow", { indentAtStart: s, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return n;
  i < r && (r = 0);
  const l = Math.max(1 + r, 1 + i - e.length);
  if (n.length <= l)
    return n;
  const c = [], u = {};
  let f = i - e.length;
  typeof s == "number" && (s > i - Math.max(2, r) ? c.push(0) : f = i - s);
  let p, h, g = !1, d = -1, m = -1, b = -1;
  t === Tt && (d = Es(n, d, e.length), d !== -1 && (f = d + l));
  for (let _; _ = n[d += 1]; ) {
    if (t === Xe && _ === "\\") {
      switch (m = d, n[d + 1]) {
        case "x":
          d += 3;
          break;
        case "u":
          d += 5;
          break;
        case "U":
          d += 9;
          break;
        default:
          d += 1;
      }
      b = d;
    }
    if (_ === `
`)
      t === Tt && (d = Es(n, d, e.length)), f = d + e.length + l, p = void 0;
    else {
      if (_ === " " && h && h !== " " && h !== `
` && h !== "	") {
        const S = n[d + 1];
        S && S !== " " && S !== `
` && S !== "	" && (p = d);
      }
      if (d >= f)
        if (p)
          c.push(p), f = p + l, p = void 0;
        else if (t === Xe) {
          for (; h === " " || h === "	"; )
            h = _, _ = n[d += 1], g = !0;
          const S = d > b + 1 ? d - 2 : m - 1;
          if (u[S])
            return n;
          c.push(S), u[S] = !0, f = S + l, p = void 0;
        } else
          g = !0;
    }
    h = _;
  }
  if (g && a && a(), c.length === 0)
    return n;
  o && o();
  let k = n.slice(0, c[0]);
  for (let _ = 0; _ < c.length; ++_) {
    const S = c[_], w = c[_ + 1] || n.length;
    S === 0 ? k = `
${e}${n.slice(0, w)}` : (t === Xe && u[S] && (k += `${n[S]}\\`), k += `
${e}${n.slice(S + 1, w)}`);
  }
  return k;
}
function Es(n, e, t) {
  let s = e, i = e + 1, r = n[i];
  for (; r === " " || r === "	"; )
    if (e < i + t)
      r = n[++e];
    else {
      do
        r = n[++e];
      while (r && r !== `
`);
      s = e, i = e + 1, r = n[i];
    }
  return s;
}
const ot = (n, e) => ({
  indentAtStart: e ? n.indent.length : n.indentAtStart,
  lineWidth: n.options.lineWidth,
  minContentWidth: n.options.minContentWidth
}), at = (n) => /^(%|---|\.\.\.)/m.test(n);
function yi(n, e, t) {
  if (!e || e < 0)
    return !1;
  const s = e - t, i = n.length;
  if (i <= s)
    return !1;
  for (let r = 0, o = 0; r < i; ++r)
    if (n[r] === `
`) {
      if (r - o > s)
        return !0;
      if (o = r + 1, i - o <= s)
        return !1;
    }
  return !0;
}
function Te(n, e) {
  const t = JSON.stringify(n);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: s } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (at(n) ? "  " : "");
  let o = "", a = 0;
  for (let l = 0, c = t[l]; c; c = t[++l])
    if (c === " " && t[l + 1] === "\\" && t[l + 2] === "n" && (o += t.slice(a, l) + "\\ ", l += 1, a = l, c = "\\"), c === "\\")
      switch (t[l + 1]) {
        case "u":
          {
            o += t.slice(a, l);
            const u = t.substr(l + 2, 4);
            switch (u) {
              case "0000":
                o += "\\0";
                break;
              case "0007":
                o += "\\a";
                break;
              case "000b":
                o += "\\v";
                break;
              case "001b":
                o += "\\e";
                break;
              case "0085":
                o += "\\N";
                break;
              case "00a0":
                o += "\\_";
                break;
              case "2028":
                o += "\\L";
                break;
              case "2029":
                o += "\\P";
                break;
              default:
                u.substr(0, 2) === "00" ? o += "\\x" + u.substr(2) : o += t.substr(l, 6);
            }
            l += 5, a = l + 1;
          }
          break;
        case "n":
          if (s || t[l + 2] === '"' || t.length < i)
            l += 1;
          else {
            for (o += t.slice(a, l) + `

`; t[l + 2] === "\\" && t[l + 3] === "n" && t[l + 4] !== '"'; )
              o += `
`, l += 2;
            o += r, t[l + 2] === " " && (o += "\\"), l += 1, a = l + 1;
          }
          break;
        default:
          l += 1;
      }
  return o = a ? o + t.slice(a) : t, s ? o : rt(o, r, Xe, ot(e, !1));
}
function vt(n, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && n.includes(`
`) || /[ \t]\n|\n[ \t]/.test(n))
    return Te(n, e);
  const t = e.indent || (at(n) ? "  " : ""), s = "'" + n.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? s : rt(s, t, Xs, ot(e, !1));
}
function fe(n, e) {
  const { singleQuote: t } = e.options;
  let s;
  if (t === !1)
    s = Te;
  else {
    const i = n.includes('"'), r = n.includes("'");
    i && !r ? s = vt : r && !i ? s = Te : s = t ? vt : Te;
  }
  return s(n, e);
}
let It;
try {
  It = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  It = /\n+(?!\n|$)/g;
}
function Ze({ comment: n, type: e, value: t }, s, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: l } = s.options;
  if (!o || /\n[\t ]+$/.test(t))
    return fe(t, s);
  const c = s.indent || (s.forceBlockIndent || at(t) ? "  " : ""), u = o === "literal" ? !0 : o === "folded" || e === N.BLOCK_FOLDED ? !1 : e === N.BLOCK_LITERAL ? !0 : !yi(t, l, c.length);
  if (!t)
    return u ? `|
` : `>
`;
  let f, p;
  for (p = t.length; p > 0; --p) {
    const w = t[p - 1];
    if (w !== `
` && w !== "	" && w !== " ")
      break;
  }
  let h = t.substring(p);
  const g = h.indexOf(`
`);
  g === -1 ? f = "-" : t === h || g !== h.length - 1 ? (f = "+", r && r()) : f = "", h && (t = t.slice(0, -h.length), h[h.length - 1] === `
` && (h = h.slice(0, -1)), h = h.replace(It, `$&${c}`));
  let d = !1, m, b = -1;
  for (m = 0; m < t.length; ++m) {
    const w = t[m];
    if (w === " ")
      d = !0;
    else if (w === `
`)
      b = m;
    else
      break;
  }
  let k = t.substring(0, b < m ? b + 1 : m);
  k && (t = t.substring(k.length), k = k.replace(/\n+/g, `$&${c}`));
  let S = (d ? c ? "2" : "1" : "") + f;
  if (n && (S += " " + a(n.replace(/ ?[\r\n]+/g, " ")), i && i()), !u) {
    const w = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let $ = !1;
    const A = ot(s, !0);
    o !== "folded" && e !== N.BLOCK_FOLDED && (A.onOverflow = () => {
      $ = !0;
    });
    const y = rt(`${k}${w}${h}`, c, Tt, A);
    if (!$)
      return `>${S}
${c}${y}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${S}
${c}${k}${t}${h}`;
}
function bi(n, e, t, s) {
  const { type: i, value: r } = n, { actualString: o, implicitKey: a, indent: l, indentStep: c, inFlow: u } = e;
  if (a && r.includes(`
`) || u && /[[\]{},]/.test(r))
    return fe(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || u || !r.includes(`
`) ? fe(r, e) : Ze(n, e, t, s);
  if (!a && !u && i !== N.PLAIN && r.includes(`
`))
    return Ze(n, e, t, s);
  if (at(r)) {
    if (l === "")
      return e.forceBlockIndent = !0, Ze(n, e, t, s);
    if (a && l === c)
      return fe(r, e);
  }
  const f = r.replace(/\n+/g, `$&
${l}`);
  if (o) {
    const p = (d) => {
      var m;
      return d.default && d.tag !== "tag:yaml.org,2002:str" && ((m = d.test) == null ? void 0 : m.test(f));
    }, { compat: h, tags: g } = e.doc.schema;
    if (g.some(p) || h != null && h.some(p))
      return fe(r, e);
  }
  return a ? f : rt(f, l, Xs, ot(e, !1));
}
function Rt(n, e, t, s) {
  const { implicitKey: i, inFlow: r } = e, o = typeof n.value == "string" ? n : Object.assign({}, n, { value: String(n.value) });
  let { type: a } = n;
  a !== N.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = N.QUOTE_DOUBLE);
  const l = (u) => {
    switch (u) {
      case N.BLOCK_FOLDED:
      case N.BLOCK_LITERAL:
        return i || r ? fe(o.value, e) : Ze(o, e, t, s);
      case N.QUOTE_DOUBLE:
        return Te(o.value, e);
      case N.QUOTE_SINGLE:
        return vt(o.value, e);
      case N.PLAIN:
        return bi(o, e, t, s);
      default:
        return null;
    }
  };
  let c = l(a);
  if (c === null) {
    const { defaultKeyType: u, defaultStringType: f } = e.options, p = i && u || f;
    if (c = l(p), c === null)
      throw new Error(`Unsupported default string type ${p}`);
  }
  return c;
}
function Zs(n, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: gi,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: !1,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: !0,
    indentSeq: !0,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: !1,
    singleQuote: null,
    trueStr: "true",
    verifyAliasOrder: !0
  }, n.schema.toStringOptions, e);
  let s;
  switch (t.collectionStyle) {
    case "block":
      s = !1;
      break;
    case "flow":
      s = !0;
      break;
    default:
      s = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc: n,
    flowCollectionPadding: t.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof t.indent == "number" ? " ".repeat(t.indent) : "  ",
    inFlow: s,
    options: t
  };
}
function wi(n, e) {
  var i;
  if (e.tag) {
    const r = n.filter((o) => o.tag === e.tag);
    if (r.length > 0)
      return r.find((o) => o.format === e.format) ?? r[0];
  }
  let t, s;
  if (E(e)) {
    s = e.value;
    let r = n.filter((o) => {
      var a;
      return (a = o.identify) == null ? void 0 : a.call(o, s);
    });
    if (r.length > 1) {
      const o = r.filter((a) => a.test);
      o.length > 0 && (r = o);
    }
    t = r.find((o) => o.format === e.format) ?? r.find((o) => !o.format);
  } else
    s = e, t = n.find((r) => r.nodeClass && s instanceof r.nodeClass);
  if (!t) {
    const r = ((i = s == null ? void 0 : s.constructor) == null ? void 0 : i.name) ?? (s === null ? "null" : typeof s);
    throw new Error(`Tag not resolved for ${r} value`);
  }
  return t;
}
function Si(n, e, { anchors: t, doc: s }) {
  if (!s.directives)
    return "";
  const i = [], r = (E(n) || v(n)) && n.anchor;
  r && Ys(r) && (t.add(r), i.push(`&${r}`));
  const o = n.tag ?? (e.default ? null : e.tag);
  return o && i.push(s.directives.tagString(o)), i.join(" ");
}
function pe(n, e, t, s) {
  var l;
  if (C(n))
    return n.toString(e, t, s);
  if (ie(n)) {
    if (e.doc.directives)
      return n.toString(e);
    if ((l = e.resolvedAliases) != null && l.has(n))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(n) : e.resolvedAliases = /* @__PURE__ */ new Set([n]), n = n.resolve(e.doc);
  }
  let i;
  const r = I(n) ? n : e.doc.createNode(n, { onTagObj: (c) => i = c });
  i ?? (i = wi(e.doc.schema.tags, r));
  const o = Si(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, s) : E(r) ? Rt(r, e, t, s) : r.toString(e, t, s);
  return o ? E(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function $i({ key: n, value: e }, t, s, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: l, options: { commentString: c, indentSeq: u, simpleKeys: f } } = t;
  let p = I(n) && n.comment || null;
  if (f) {
    if (p)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (v(n) || !I(n) && typeof n == "object") {
      const A = "With simple keys, collection cannot be used as a key value";
      throw new Error(A);
    }
  }
  let h = !f && (!n || p && e == null && !t.inFlow || v(n) || (E(n) ? n.type === N.BLOCK_FOLDED || n.type === N.BLOCK_LITERAL : typeof n == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !h && (f || !r),
    indent: a + l
  });
  let g = !1, d = !1, m = pe(n, t, () => g = !0, () => d = !0);
  if (!h && !t.inFlow && m.length > 1024) {
    if (f)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    h = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return g && s && s(), m === "" ? "?" : h ? `? ${m}` : m;
  } else if (r && !f || e == null && h)
    return m = `? ${m}`, p && !g ? m += Z(m, t.indent, c(p)) : d && i && i(), m;
  g && (p = null), h ? (p && (m += Z(m, t.indent, c(p))), m = `? ${m}
${a}:`) : (m = `${m}:`, p && (m += Z(m, t.indent, c(p))));
  let b, k, _;
  I(e) ? (b = !!e.spaceBefore, k = e.commentBefore, _ = e.comment) : (b = !1, k = null, _ = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !h && !p && E(e) && (t.indentAtStart = m.length + 1), d = !1, !u && l.length >= 2 && !t.inFlow && !h && De(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let S = !1;
  const w = pe(e, t, () => S = !0, () => d = !0);
  let $ = " ";
  if (p || b || k) {
    if ($ = b ? `
` : "", k) {
      const A = c(k);
      $ += `
${F(A, t.indent)}`;
    }
    w === "" && !t.inFlow ? $ === `
` && ($ = `

`) : $ += `
${t.indent}`;
  } else if (!h && v(e)) {
    const A = w[0], y = w.indexOf(`
`), O = y !== -1, R = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (O || !R) {
      let V = !1;
      if (O && (A === "&" || A === "!")) {
        let T = w.indexOf(" ");
        A === "&" && T !== -1 && T < y && w[T + 1] === "!" && (T = w.indexOf(" ", T + 1)), (T === -1 || y < T) && (V = !0);
      }
      V || ($ = `
${t.indent}`);
    }
  } else (w === "" || w[0] === `
`) && ($ = "");
  return m += $ + w, t.inFlow ? S && s && s() : _ && !S ? m += Z(m, t.indent, c(_)) : d && i && i(), m;
}
function xs(n, e) {
  (n === "debug" || n === "warn") && console.warn(e);
}
const Ve = "<<", H = {
  identify: (n) => n === Ve || typeof n == "symbol" && n.description === Ve,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new N(Symbol(Ve)), {
    addToJSMap: en
  }),
  stringify: () => Ve
}, ki = (n, e) => (H.identify(e) || E(e) && (!e.type || e.type === N.PLAIN) && H.identify(e.value)) && (n == null ? void 0 : n.doc.schema.tags.some((t) => t.tag === H.tag && t.default));
function en(n, e, t) {
  if (t = n && ie(t) ? t.resolve(n.doc) : t, De(t))
    for (const s of t.items)
      wt(n, e, s);
  else if (Array.isArray(t))
    for (const s of t)
      wt(n, e, s);
  else
    wt(n, e, t);
}
function wt(n, e, t) {
  const s = n && ie(t) ? t.resolve(n.doc) : t;
  if (!Be(s))
    throw new Error("Merge sources must be maps or map aliases");
  const i = s.toJSON(null, n, Map);
  for (const [r, o] of i)
    e instanceof Map ? e.has(r) || e.set(r, o) : e instanceof Set ? e.add(r) : Object.prototype.hasOwnProperty.call(e, r) || Object.defineProperty(e, r, {
      value: o,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return e;
}
function tn(n, e, { key: t, value: s }) {
  if (I(t) && t.addToJSMap)
    t.addToJSMap(n, e, s);
  else if (ki(n, t))
    en(n, e, s);
  else {
    const i = D(t, "", n);
    if (e instanceof Map)
      e.set(i, D(s, i, n));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = _i(t, i, n), o = D(s, r, n);
      r in e ? Object.defineProperty(e, r, {
        value: o,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : e[r] = o;
    }
  }
  return e;
}
function _i(n, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (I(n) && (t != null && t.doc)) {
    const s = Zs(t.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      s.anchors.add(r.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const i = n.toString(s);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), xs(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function qt(n, e, t) {
  const s = Le(n, void 0, t), i = Le(e, void 0, t);
  return new P(s, i);
}
class P {
  constructor(e, t = null) {
    Object.defineProperty(this, j, { value: Vs }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: s } = this;
    return I(t) && (t = t.clone(e)), I(s) && (s = s.clone(e)), new P(t, s);
  }
  toJSON(e, t) {
    const s = t != null && t.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return tn(t, s, this);
  }
  toString(e, t, s) {
    return e != null && e.doc ? $i(this, e, t, s) : JSON.stringify(this);
  }
}
function sn(n, e, t) {
  return (e.inFlow ?? n.flow ? Ni : Ai)(n, e, t);
}
function Ai({ comment: n, items: e }, t, { blockItemPrefix: s, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: l, options: { commentString: c } } = t, u = Object.assign({}, t, { indent: r, type: null });
  let f = !1;
  const p = [];
  for (let g = 0; g < e.length; ++g) {
    const d = e[g];
    let m = null;
    if (I(d))
      !f && d.spaceBefore && p.push(""), tt(t, p, d.commentBefore, f), d.comment && (m = d.comment);
    else if (C(d)) {
      const k = I(d.key) ? d.key : null;
      k && (!f && k.spaceBefore && p.push(""), tt(t, p, k.commentBefore, f));
    }
    f = !1;
    let b = pe(d, u, () => m = null, () => f = !0);
    m && (b += Z(b, r, c(m))), f && m && (f = !1), p.push(s + b);
  }
  let h;
  if (p.length === 0)
    h = i.start + i.end;
  else {
    h = p[0];
    for (let g = 1; g < p.length; ++g) {
      const d = p[g];
      h += d ? `
${l}${d}` : `
`;
    }
  }
  return n ? (h += `
` + F(c(n), l), a && a()) : f && o && o(), h;
}
function Ni({ items: n }, e, { flowChars: t, itemIndent: s }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  s += r;
  const l = Object.assign({}, e, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let c = !1, u = 0;
  const f = [];
  for (let g = 0; g < n.length; ++g) {
    const d = n[g];
    let m = null;
    if (I(d))
      d.spaceBefore && f.push(""), tt(e, f, d.commentBefore, !1), d.comment && (m = d.comment);
    else if (C(d)) {
      const k = I(d.key) ? d.key : null;
      k && (k.spaceBefore && f.push(""), tt(e, f, k.commentBefore, !1), k.comment && (c = !0));
      const _ = I(d.value) ? d.value : null;
      _ ? (_.comment && (m = _.comment), _.commentBefore && (c = !0)) : d.value == null && (k != null && k.comment) && (m = k.comment);
    }
    m && (c = !0);
    let b = pe(d, l, () => m = null);
    g < n.length - 1 && (b += ","), m && (b += Z(b, s, a(m))), !c && (f.length > u || b.includes(`
`)) && (c = !0), f.push(b), u = f.length;
  }
  const { start: p, end: h } = t;
  if (f.length === 0)
    return p + h;
  if (!c) {
    const g = f.reduce((d, m) => d + m.length + 2, 2);
    c = e.options.lineWidth > 0 && g > e.options.lineWidth;
  }
  if (c) {
    let g = p;
    for (const d of f)
      g += d ? `
${r}${i}${d}` : `
`;
    return `${g}
${i}${h}`;
  } else
    return `${p}${o}${f.join(" ")}${o}${h}`;
}
function tt({ indent: n, options: { commentString: e } }, t, s, i) {
  if (s && i && (s = s.replace(/^\n+/, "")), s) {
    const r = F(e(s), n);
    t.push(r.trimStart());
  }
}
function x(n, e) {
  const t = E(e) ? e.value : e;
  for (const s of n)
    if (C(s) && (s.key === e || s.key === t || E(s.key) && s.key.value === t))
      return s;
}
class B extends zs {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(W, e), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(e, t, s) {
    const { keepUndefined: i, replacer: r } = s, o = new this(e), a = (l, c) => {
      if (typeof r == "function")
        c = r.call(t, l, c);
      else if (Array.isArray(r) && !r.includes(l))
        return;
      (c !== void 0 || i) && o.items.push(qt(l, c, s));
    };
    if (t instanceof Map)
      for (const [l, c] of t)
        a(l, c);
    else if (t && typeof t == "object")
      for (const l of Object.keys(t))
        a(l, t[l]);
    return typeof e.sortMapEntries == "function" && o.items.sort(e.sortMapEntries), o;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(e, t) {
    var o;
    let s;
    C(e) ? s = e : !e || typeof e != "object" || !("key" in e) ? s = new P(e, e == null ? void 0 : e.value) : s = new P(e.key, e.value);
    const i = x(this.items, s.key), r = (o = this.schema) == null ? void 0 : o.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${s.key} already set`);
      E(i.value) && Qs(s.value) ? i.value.value = s.value : i.value = s.value;
    } else if (r) {
      const a = this.items.findIndex((l) => r(s, l) < 0);
      a === -1 ? this.items.push(s) : this.items.splice(a, 0, s);
    } else
      this.items.push(s);
  }
  delete(e) {
    const t = x(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const s = x(this.items, e), i = s == null ? void 0 : s.value;
    return (!t && E(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!x(this.items, e);
  }
  set(e, t) {
    this.add(new P(e, t), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(e, t, s) {
    const i = s ? new s() : t != null && t.mapAsMap ? /* @__PURE__ */ new Map() : {};
    t != null && t.onCreate && t.onCreate(i);
    for (const r of this.items)
      tn(t, i, r);
    return i;
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!C(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), sn(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: s,
      onComment: t
    });
  }
}
const be = {
  collection: "map",
  default: !0,
  nodeClass: B,
  tag: "tag:yaml.org,2002:map",
  resolve(n, e) {
    return Be(n) || e("Expected a mapping for this tag"), n;
  },
  createNode: (n, e, t) => B.from(n, e, t)
};
class ne extends zs {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(ge, e), this.items = [];
  }
  add(e) {
    this.items.push(e);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    const t = Je(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const s = Je(e);
    if (typeof s != "number")
      return;
    const i = this.items[s];
    return !t && E(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = Je(e);
    return typeof t == "number" && t < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(e, t) {
    const s = Je(e);
    if (typeof s != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[s];
    E(i) && Qs(t) ? i.value = t : this.items[s] = t;
  }
  toJSON(e, t) {
    const s = [];
    t != null && t.onCreate && t.onCreate(s);
    let i = 0;
    for (const r of this.items)
      s.push(D(r, String(i++), t));
    return s;
  }
  toString(e, t, s) {
    return e ? sn(this, e, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (e.indent || "") + "  ",
      onChompKeep: s,
      onComment: t
    }) : JSON.stringify(this);
  }
  static from(e, t, s) {
    const { replacer: i } = s, r = new this(e);
    if (t && Symbol.iterator in Object(t)) {
      let o = 0;
      for (let a of t) {
        if (typeof i == "function") {
          const l = t instanceof Set ? a : String(o++);
          a = i.call(t, l, a);
        }
        r.items.push(Le(a, void 0, s));
      }
    }
    return r;
  }
}
function Je(n) {
  let e = E(n) ? n.value : n;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const we = {
  collection: "seq",
  default: !0,
  nodeClass: ne,
  tag: "tag:yaml.org,2002:seq",
  resolve(n, e) {
    return De(n) || e("Expected a sequence for this tag"), n;
  },
  createNode: (n, e, t) => ne.from(n, e, t)
}, lt = {
  identify: (n) => typeof n == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (n) => n,
  stringify(n, e, t, s) {
    return e = Object.assign({ actualString: !0 }, e), Rt(n, e, t, s);
  }
}, ct = {
  identify: (n) => n == null,
  createNode: () => new N(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new N(null),
  stringify: ({ source: n }, e) => typeof n == "string" && ct.test.test(n) ? n : e.options.nullStr
}, Ft = {
  identify: (n) => typeof n == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (n) => new N(n[0] === "t" || n[0] === "T"),
  stringify({ source: n, value: e }, t) {
    if (n && Ft.test.test(n)) {
      const s = n[0] === "t" || n[0] === "T";
      if (e === s)
        return n;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function K({ format: n, minFractionDigits: e, tag: t, value: s }) {
  if (typeof s == "bigint")
    return String(s);
  const i = typeof s == "number" ? s : Number(s);
  if (!isFinite(i))
    return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
  let r = JSON.stringify(s);
  if (!n && e && (!t || t === "tag:yaml.org,2002:float") && /^\d/.test(r)) {
    let o = r.indexOf(".");
    o < 0 && (o = r.length, r += ".");
    let a = e - (r.length - o - 1);
    for (; a-- > 0; )
      r += "0";
  }
  return r;
}
const nn = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: K
}, rn = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : K(n);
  }
}, on = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(n) {
    const e = new N(parseFloat(n)), t = n.indexOf(".");
    return t !== -1 && n[n.length - 1] === "0" && (e.minFractionDigits = n.length - t - 1), e;
  },
  stringify: K
}, ft = (n) => typeof n == "bigint" || Number.isInteger(n), Ht = (n, e, t, { intAsBigInt: s }) => s ? BigInt(n) : parseInt(n.substring(e), t);
function an(n, e, t) {
  const { value: s } = n;
  return ft(s) && s >= 0 ? t + s.toString(e) : K(n);
}
const ln = {
  identify: (n) => ft(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (n, e, t) => Ht(n, 2, 8, t),
  stringify: (n) => an(n, 8, "0o")
}, cn = {
  identify: ft,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (n, e, t) => Ht(n, 0, 10, t),
  stringify: K
}, fn = {
  identify: (n) => ft(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (n, e, t) => Ht(n, 2, 16, t),
  stringify: (n) => an(n, 16, "0x")
}, Ei = [
  be,
  we,
  lt,
  ct,
  Ft,
  ln,
  cn,
  fn,
  nn,
  rn,
  on
];
function Os(n) {
  return typeof n == "bigint" || Number.isInteger(n);
}
const Ye = ({ value: n }) => JSON.stringify(n), Oi = [
  {
    identify: (n) => typeof n == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (n) => n,
    stringify: Ye
  },
  {
    identify: (n) => n == null,
    createNode: () => new N(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Ye
  },
  {
    identify: (n) => typeof n == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (n) => n === "true",
    stringify: Ye
  },
  {
    identify: Os,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (n, e, { intAsBigInt: t }) => t ? BigInt(n) : parseInt(n, 10),
    stringify: ({ value: n }) => Os(n) ? n.toString() : JSON.stringify(n)
  },
  {
    identify: (n) => typeof n == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (n) => parseFloat(n),
    stringify: Ye
  }
], Ti = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(n, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(n)}`), n;
  }
}, vi = [be, we].concat(Oi, Ti), Vt = {
  identify: (n) => n instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: !1,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(n, e) {
    if (typeof atob == "function") {
      const t = atob(n.replace(/[\n\r]/g, "")), s = new Uint8Array(t.length);
      for (let i = 0; i < t.length; ++i)
        s[i] = t.charCodeAt(i);
      return s;
    } else
      return e("This environment does not support reading binary tags; either Buffer or atob is required"), n;
  },
  stringify({ comment: n, type: e, value: t }, s, i, r) {
    if (!t)
      return "";
    const o = t;
    let a;
    if (typeof btoa == "function") {
      let l = "";
      for (let c = 0; c < o.length; ++c)
        l += String.fromCharCode(o[c]);
      a = btoa(l);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = N.BLOCK_LITERAL), e !== N.QUOTE_DOUBLE) {
      const l = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), c = Math.ceil(a.length / l), u = new Array(c);
      for (let f = 0, p = 0; f < c; ++f, p += l)
        u[f] = a.substr(p, l);
      a = u.join(e === N.BLOCK_LITERAL ? `
` : " ");
    }
    return Rt({ comment: n, type: e, value: a }, s, i, r);
  }
};
function un(n, e) {
  if (De(n))
    for (let t = 0; t < n.items.length; ++t) {
      let s = n.items[t];
      if (!C(s)) {
        if (Be(s)) {
          s.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = s.items[0] || new P(new N(null));
          if (s.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${s.commentBefore}
${i.key.commentBefore}` : s.commentBefore), s.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${s.comment}
${r.comment}` : s.comment;
          }
          s = i;
        }
        n.items[t] = C(s) ? s : new P(s);
      }
    }
  else
    e("Expected a sequence for this tag");
  return n;
}
function hn(n, e, t) {
  const { replacer: s } = t, i = new ne(n);
  i.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (e && Symbol.iterator in Object(e))
    for (let o of e) {
      typeof s == "function" && (o = s.call(e, String(r++), o));
      let a, l;
      if (Array.isArray(o))
        if (o.length === 2)
          a = o[0], l = o[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${o}`);
      else if (o && o instanceof Object) {
        const c = Object.keys(o);
        if (c.length === 1)
          a = c[0], l = o[a];
        else
          throw new TypeError(`Expected tuple with one key, not ${c.length} keys`);
      } else
        a = o;
      i.items.push(qt(a, l, t));
    }
  return i;
}
const Jt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: un,
  createNode: hn
};
class ue extends ne {
  constructor() {
    super(), this.add = B.prototype.add.bind(this), this.delete = B.prototype.delete.bind(this), this.get = B.prototype.get.bind(this), this.has = B.prototype.has.bind(this), this.set = B.prototype.set.bind(this), this.tag = ue.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(e, t) {
    if (!t)
      return super.toJSON(e);
    const s = /* @__PURE__ */ new Map();
    t != null && t.onCreate && t.onCreate(s);
    for (const i of this.items) {
      let r, o;
      if (C(i) ? (r = D(i.key, "", t), o = D(i.value, r, t)) : r = D(i, "", t), s.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(r, o);
    }
    return s;
  }
  static from(e, t, s) {
    const i = hn(e, t, s), r = new this();
    return r.items = i.items, r;
  }
}
ue.tag = "tag:yaml.org,2002:omap";
const Yt = {
  collection: "seq",
  identify: (n) => n instanceof Map,
  nodeClass: ue,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(n, e) {
    const t = un(n, e), s = [];
    for (const { key: i } of t.items)
      E(i) && (s.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : s.push(i.value));
    return Object.assign(new ue(), t);
  },
  createNode: (n, e, t) => ue.from(n, e, t)
};
function dn({ value: n, source: e }, t) {
  return e && (n ? pn : mn).test.test(e) ? e : n ? t.options.trueStr : t.options.falseStr;
}
const pn = {
  identify: (n) => n === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new N(!0),
  stringify: dn
}, mn = {
  identify: (n) => n === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new N(!1),
  stringify: dn
}, Ii = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: K
}, Ci = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n.replace(/_/g, "")),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : K(n);
  }
}, Li = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(n) {
    const e = new N(parseFloat(n.replace(/_/g, ""))), t = n.indexOf(".");
    if (t !== -1) {
      const s = n.substring(t + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (e.minFractionDigits = s.length);
    }
    return e;
  },
  stringify: K
}, je = (n) => typeof n == "bigint" || Number.isInteger(n);
function ut(n, e, t, { intAsBigInt: s }) {
  const i = n[0];
  if ((i === "-" || i === "+") && (e += 1), n = n.substring(e).replace(/_/g, ""), s) {
    switch (t) {
      case 2:
        n = `0b${n}`;
        break;
      case 8:
        n = `0o${n}`;
        break;
      case 16:
        n = `0x${n}`;
        break;
    }
    const o = BigInt(n);
    return i === "-" ? BigInt(-1) * o : o;
  }
  const r = parseInt(n, t);
  return i === "-" ? -1 * r : r;
}
function Gt(n, e, t) {
  const { value: s } = n;
  if (je(s)) {
    const i = s.toString(e);
    return s < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return K(n);
}
const Mi = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (n, e, t) => ut(n, 2, 2, t),
  stringify: (n) => Gt(n, 2, "0b")
}, Pi = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (n, e, t) => ut(n, 1, 8, t),
  stringify: (n) => Gt(n, 8, "0")
}, Bi = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (n, e, t) => ut(n, 0, 10, t),
  stringify: K
}, Di = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (n, e, t) => ut(n, 2, 16, t),
  stringify: (n) => Gt(n, 16, "0x")
};
class he extends B {
  constructor(e) {
    super(e), this.tag = he.tag;
  }
  add(e) {
    let t;
    C(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new P(e.key, null) : t = new P(e, null), x(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const s = x(this.items, e);
    return !t && C(s) ? E(s.key) ? s.key.value : s.key : s;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const s = x(this.items, e);
    s && !t ? this.items.splice(this.items.indexOf(s), 1) : !s && t && this.items.push(new P(e));
  }
  toJSON(e, t) {
    return super.toJSON(e, t, Set);
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, s);
    throw new Error("Set items must all have null values");
  }
  static from(e, t, s) {
    const { replacer: i } = s, r = new this(e);
    if (t && Symbol.iterator in Object(t))
      for (let o of t)
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(qt(o, null, s));
    return r;
  }
}
he.tag = "tag:yaml.org,2002:set";
const Wt = {
  collection: "map",
  identify: (n) => n instanceof Set,
  nodeClass: he,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (n, e, t) => he.from(n, e, t),
  resolve(n, e) {
    if (Be(n)) {
      if (n.hasAllNullValues(!0))
        return Object.assign(new he(), n);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return n;
  }
};
function Qt(n, e) {
  const t = n[0], s = t === "-" || t === "+" ? n.substring(1) : n, i = (o) => e ? BigInt(o) : Number(o), r = s.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function gn(n) {
  let { value: e } = n, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return K(n);
  let s = "";
  e < 0 && (s = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), s + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const yn = {
  identify: (n) => typeof n == "bigint" || Number.isInteger(n),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (n, e, { intAsBigInt: t }) => Qt(n, t),
  stringify: gn
}, bn = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (n) => Qt(n, !1),
  stringify: gn
}, ht = {
  identify: (n) => n instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(n) {
    const e = n.match(ht.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, s, i, r, o, a] = e.map(Number), l = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, s - 1, i, r || 0, o || 0, a || 0, l);
    const u = e[8];
    if (u && u !== "Z") {
      let f = Qt(u, !1);
      Math.abs(f) < 30 && (f *= 60), c -= 6e4 * f;
    }
    return new Date(c);
  },
  stringify: ({ value: n }) => (n == null ? void 0 : n.toISOString().replace(/(T00:00:00)?\.000Z$/, "")) ?? ""
}, Ts = [
  be,
  we,
  lt,
  ct,
  pn,
  mn,
  Mi,
  Pi,
  Bi,
  Di,
  Ii,
  Ci,
  Li,
  Vt,
  H,
  Yt,
  Jt,
  Wt,
  yn,
  bn,
  ht
], vs = /* @__PURE__ */ new Map([
  ["core", Ei],
  ["failsafe", [be, we, lt]],
  ["json", vi],
  ["yaml11", Ts],
  ["yaml-1.1", Ts]
]), Is = {
  binary: Vt,
  bool: Ft,
  float: on,
  floatExp: rn,
  floatNaN: nn,
  floatTime: bn,
  int: cn,
  intHex: fn,
  intOct: ln,
  intTime: yn,
  map: be,
  merge: H,
  null: ct,
  omap: Yt,
  pairs: Jt,
  seq: we,
  set: Wt,
  timestamp: ht
}, ji = {
  "tag:yaml.org,2002:binary": Vt,
  "tag:yaml.org,2002:merge": H,
  "tag:yaml.org,2002:omap": Yt,
  "tag:yaml.org,2002:pairs": Jt,
  "tag:yaml.org,2002:set": Wt,
  "tag:yaml.org,2002:timestamp": ht
};
function St(n, e, t) {
  const s = vs.get(e);
  if (s && !n)
    return t && !s.includes(H) ? s.concat(H) : s.slice();
  let i = s;
  if (!i)
    if (Array.isArray(n))
      i = [];
    else {
      const r = Array.from(vs.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(n))
    for (const r of n)
      i = i.concat(r);
  else typeof n == "function" && (i = n(i.slice()));
  return t && (i = i.concat(H)), i.reduce((r, o) => {
    const a = typeof o == "string" ? Is[o] : o;
    if (!a) {
      const l = JSON.stringify(o), c = Object.keys(Is).map((u) => JSON.stringify(u)).join(", ");
      throw new Error(`Unknown custom tag ${l}; use one of ${c}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const Ui = (n, e) => n.key < e.key ? -1 : n.key > e.key ? 1 : 0;
class zt {
  constructor({ compat: e, customTags: t, merge: s, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? St(e, "compat") : e ? St(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? ji : {}, this.tags = St(t, this.name, s), this.toStringOptions = a ?? null, Object.defineProperty(this, W, { value: be }), Object.defineProperty(this, q, { value: lt }), Object.defineProperty(this, ge, { value: we }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? Ui : null;
  }
  clone() {
    const e = Object.create(zt.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function Ki(n, e) {
  var l;
  const t = [];
  let s = e.directives === !0;
  if (e.directives !== !1 && n.directives) {
    const c = n.directives.toString(n);
    c ? (t.push(c), s = !0) : n.directives.docStart && (s = !0);
  }
  s && t.push("---");
  const i = Zs(n, e), { commentString: r } = i.options;
  if (n.commentBefore) {
    t.length !== 1 && t.unshift("");
    const c = r(n.commentBefore);
    t.unshift(F(c, ""));
  }
  let o = !1, a = null;
  if (n.contents) {
    if (I(n.contents)) {
      if (n.contents.spaceBefore && s && t.push(""), n.contents.commentBefore) {
        const f = r(n.contents.commentBefore);
        t.push(F(f, ""));
      }
      i.forceBlockIndent = !!n.comment, a = n.contents.comment;
    }
    const c = a ? void 0 : () => o = !0;
    let u = pe(n.contents, i, () => a = null, c);
    a && (u += Z(u, "", r(a))), (u[0] === "|" || u[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${u}` : t.push(u);
  } else
    t.push(pe(n.contents, i));
  if ((l = n.directives) != null && l.docEnd)
    if (n.comment) {
      const c = r(n.comment);
      c.includes(`
`) ? (t.push("..."), t.push(F(c, ""))) : t.push(`... ${c}`);
    } else
      t.push("...");
  else {
    let c = n.comment;
    c && o && (c = c.replace(/^\n+/, "")), c && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(F(r(c), "")));
  }
  return t.join(`
`) + `
`;
}
let wn = class Sn {
  constructor(e, t, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, j, { value: Ot });
    let i = null;
    typeof t == "function" || Array.isArray(t) ? i = t : s === void 0 && t && (s = t, t = void 0);
    const r = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      stringKeys: !1,
      uniqueKeys: !0,
      version: "1.2"
    }, s);
    this.options = r;
    let { version: o } = r;
    s != null && s._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new M({ version: o }), this.setSchema(o, s), this.contents = e === void 0 ? null : this.createNode(e, i, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(Sn.prototype, {
      [j]: { value: Ot }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = I(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    re(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    re(this.contents) && this.contents.addIn(e, t);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(e, t) {
    if (!e.anchor) {
      const s = Gs(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || s.has(t) ? Ws(t || "a", s) : t;
    }
    return new Kt(e.anchor);
  }
  createNode(e, t, s) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const m = (k) => typeof k == "number" || k instanceof String || k instanceof Number, b = t.filter(m).map(String);
      b.length > 0 && (t = t.concat(b)), i = t;
    } else s === void 0 && t && (s = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: l, onTagObj: c, tag: u } = s ?? {}, { onAnchor: f, setAnchors: p, sourceObjects: h } = di(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), g = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: l ?? !1,
      onAnchor: f,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: h
    }, d = Le(e, u, g);
    return a && v(d) && (d.flow = !0), p(), d;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, s = {}) {
    const i = this.createNode(e, null, s), r = this.createNode(t, null, s);
    return new P(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return re(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return ke(e) ? this.contents == null ? !1 : (this.contents = null, !0) : re(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return v(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return ke(e) ? !t && E(this.contents) ? this.contents.value : this.contents : v(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return v(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return ke(e) ? this.contents !== void 0 : v(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = et(this.schema, [e], t) : re(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    ke(e) ? this.contents = t : this.contents == null ? this.contents = et(this.schema, Array.from(e), t) : re(this.contents) && this.contents.setIn(e, t);
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(e, t = {}) {
    typeof e == "number" && (e = String(e));
    let s;
    switch (e) {
      case "1.1":
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new M({ version: "1.1" }), s = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new M({ version: e }), s = { resolveKnownTags: !0, schema: "core" };
        break;
      case null:
        this.directives && delete this.directives, s = null;
        break;
      default: {
        const i = JSON.stringify(e);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`);
      }
    }
    if (t.schema instanceof Object)
      this.schema = t.schema;
    else if (s)
      this.schema = new zt(Object.assign(s, t));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: e, jsonArg: t, mapAsMap: s, maxAliasCount: i, onAnchor: r, reviver: o } = {}) {
    const a = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !e,
      mapAsMap: s === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof i == "number" ? i : 100
    }, l = D(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: c, res: u } of a.anchors.values())
        r(u, c);
    return typeof o == "function" ? ce(o, { "": l }, "", l) : l;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(e, t) {
    return this.toJS({ json: !0, jsonArg: e, mapAsMap: !1, onAnchor: t });
  }
  /** A YAML representation of the document. */
  toString(e = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
      const t = JSON.stringify(e.indent);
      throw new Error(`"indent" option must be a positive integer, not ${t}`);
    }
    return Ki(this, e);
  }
};
function re(n) {
  if (v(n))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class $n extends Error {
  constructor(e, t, s, i) {
    super(), this.name = e, this.code = s, this.message = i, this.pos = t;
  }
}
class _e extends $n {
  constructor(e, t, s) {
    super("YAMLParseError", e, t, s);
  }
}
class Ri extends $n {
  constructor(e, t, s) {
    super("YAMLWarning", e, t, s);
  }
}
const Cs = (n, e) => (t) => {
  if (t.pos[0] === -1)
    return;
  t.linePos = t.pos.map((a) => e.linePos(a));
  const { line: s, col: i } = t.linePos[0];
  t.message += ` at line ${s}, column ${i}`;
  let r = i - 1, o = n.substring(e.lineStarts[s - 1], e.lineStarts[s]).replace(/[\n\r]+$/, "");
  if (r >= 60 && o.length > 80) {
    const a = Math.min(r - 39, o.length - 79);
    o = "…" + o.substring(a), r -= a - 1;
  }
  if (o.length > 80 && (o = o.substring(0, 79) + "…"), s > 1 && /^ *$/.test(o.substring(0, r))) {
    let a = n.substring(e.lineStarts[s - 2], e.lineStarts[s - 1]);
    a.length > 80 && (a = a.substring(0, 79) + `…
`), o = a + o;
  }
  if (/[^ ]/.test(o)) {
    let a = 1;
    const l = t.linePos[1];
    l && l.line === s && l.col > i && (a = Math.max(1, Math.min(l.col - i, 80 - r)));
    const c = " ".repeat(r) + "^".repeat(a);
    t.message += `:

${o}
${c}
`;
  }
};
function me(n, { flow: e, indicator: t, next: s, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let l = !1, c = a, u = a, f = "", p = "", h = !1, g = !1, d = null, m = null, b = null, k = null, _ = null, S = null, w = null;
  for (const y of n)
    switch (g && (y.type !== "space" && y.type !== "newline" && y.type !== "comma" && r(y.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), g = !1), d && (c && y.type !== "comment" && y.type !== "newline" && r(d, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), d = null), y.type) {
      case "space":
        !e && (t !== "doc-start" || (s == null ? void 0 : s.type) !== "flow-collection") && y.source.includes("	") && (d = y), u = !0;
        break;
      case "comment": {
        u || r(y, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const O = y.source.substring(1) || " ";
        f ? f += p + O : f = O, p = "", c = !1;
        break;
      }
      case "newline":
        c ? f ? f += y.source : (!S || t !== "seq-item-ind") && (l = !0) : p += y.source, c = !0, h = !0, (m || b) && (k = y), u = !0;
        break;
      case "anchor":
        m && r(y, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), y.source.endsWith(":") && r(y.offset + y.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), m = y, w ?? (w = y.offset), c = !1, u = !1, g = !0;
        break;
      case "tag": {
        b && r(y, "MULTIPLE_TAGS", "A node can have at most one tag"), b = y, w ?? (w = y.offset), c = !1, u = !1, g = !0;
        break;
      }
      case t:
        (m || b) && r(y, "BAD_PROP_ORDER", `Anchors and tags must be after the ${y.source} indicator`), S && r(y, "UNEXPECTED_TOKEN", `Unexpected ${y.source} in ${e ?? "collection"}`), S = y, c = t === "seq-item-ind" || t === "explicit-key-ind", u = !1;
        break;
      case "comma":
        if (e) {
          _ && r(y, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), _ = y, c = !1, u = !1;
          break;
        }
      default:
        r(y, "UNEXPECTED_TOKEN", `Unexpected ${y.type} token`), c = !1, u = !1;
    }
  const $ = n[n.length - 1], A = $ ? $.offset + $.source.length : i;
  return g && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && r(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), d && (c && d.indent <= o || (s == null ? void 0 : s.type) === "block-map" || (s == null ? void 0 : s.type) === "block-seq") && r(d, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: _,
    found: S,
    spaceBefore: l,
    comment: f,
    hasNewline: h,
    anchor: m,
    tag: b,
    newlineAfterProp: k,
    end: A,
    start: w ?? A
  };
}
function Me(n) {
  if (!n)
    return null;
  switch (n.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (n.source.includes(`
`))
        return !0;
      if (n.end) {
        for (const e of n.end)
          if (e.type === "newline")
            return !0;
      }
      return !1;
    case "flow-collection":
      for (const e of n.items) {
        for (const t of e.start)
          if (t.type === "newline")
            return !0;
        if (e.sep) {
          for (const t of e.sep)
            if (t.type === "newline")
              return !0;
        }
        if (Me(e.key) || Me(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Ct(n, e, t) {
  if ((e == null ? void 0 : e.type) === "flow-collection") {
    const s = e.end[0];
    s.indent === n && (s.source === "]" || s.source === "}") && Me(e) && t(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function kn(n, e, t) {
  const { uniqueKeys: s } = n.options;
  if (s === !1)
    return !1;
  const i = typeof s == "function" ? s : (r, o) => r === o || E(r) && E(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const Ls = "All mapping items must start at the same column";
function qi({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  var u;
  const o = (r == null ? void 0 : r.nodeClass) ?? B, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let l = s.offset, c = null;
  for (const f of s.items) {
    const { start: p, key: h, sep: g, value: d } = f, m = me(p, {
      indicator: "explicit-key-ind",
      next: h ?? (g == null ? void 0 : g[0]),
      offset: l,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    }), b = !m.found;
    if (b) {
      if (h && (h.type === "block-seq" ? i(l, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in h && h.indent !== s.indent && i(l, "BAD_INDENT", Ls)), !m.anchor && !m.tag && !g) {
        c = m.end, m.comment && (a.comment ? a.comment += `
` + m.comment : a.comment = m.comment);
        continue;
      }
      (m.newlineAfterProp || Me(h)) && i(h ?? p[p.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else ((u = m.found) == null ? void 0 : u.indent) !== s.indent && i(l, "BAD_INDENT", Ls);
    t.atKey = !0;
    const k = m.end, _ = h ? n(t, h, m, i) : e(t, k, p, null, m, i);
    t.schema.compat && Ct(s.indent, h, i), t.atKey = !1, kn(t, a.items, _) && i(k, "DUPLICATE_KEY", "Map keys must be unique");
    const S = me(g ?? [], {
      indicator: "map-value-ind",
      next: d,
      offset: _.range[2],
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !h || h.type === "block-scalar"
    });
    if (l = S.end, S.found) {
      b && ((d == null ? void 0 : d.type) === "block-map" && !S.hasNewline && i(l, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && m.start < S.found.offset - 1024 && i(_.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const w = d ? n(t, d, S, i) : e(t, l, g, null, S, i);
      t.schema.compat && Ct(s.indent, d, i), l = w.range[2];
      const $ = new P(_, w);
      t.options.keepSourceTokens && ($.srcToken = f), a.items.push($);
    } else {
      b && i(_.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), S.comment && (_.comment ? _.comment += `
` + S.comment : _.comment = S.comment);
      const w = new P(_);
      t.options.keepSourceTokens && (w.srcToken = f), a.items.push(w);
    }
  }
  return c && c < l && i(c, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [s.offset, l, c ?? l], a;
}
function Fi({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = (r == null ? void 0 : r.nodeClass) ?? ne, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let l = s.offset, c = null;
  for (const { start: u, value: f } of s.items) {
    const p = me(u, {
      indicator: "seq-item-ind",
      next: f,
      offset: l,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    });
    if (!p.found)
      if (p.anchor || p.tag || f)
        f && f.type === "block-seq" ? i(p.end, "BAD_INDENT", "All sequence items must start at the same column") : i(l, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = p.end, p.comment && (a.comment = p.comment);
        continue;
      }
    const h = f ? n(t, f, p, i) : e(t, p.end, u, null, p, i);
    t.schema.compat && Ct(s.indent, f, i), l = h.range[2], a.items.push(h);
  }
  return a.range = [s.offset, l, c ?? l], a;
}
function Ue(n, e, t, s) {
  let i = "";
  if (n) {
    let r = !1, o = "";
    for (const a of n) {
      const { source: l, type: c } = a;
      switch (c) {
        case "space":
          r = !0;
          break;
        case "comment": {
          t && !r && s(a, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const u = l.substring(1) || " ";
          i ? i += o + u : i = u, o = "";
          break;
        }
        case "newline":
          i && (o += l), r = !0;
          break;
        default:
          s(a, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      e += l.length;
    }
  }
  return { comment: i, offset: e };
}
const $t = "Block collections are not allowed within flow collections", kt = (n) => n && (n.type === "block-map" || n.type === "block-seq");
function Hi({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = s.start.source === "{", a = o ? "flow map" : "flow sequence", l = (r == null ? void 0 : r.nodeClass) ?? (o ? B : ne), c = new l(t.schema);
  c.flow = !0;
  const u = t.atRoot;
  u && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let f = s.offset + s.start.source.length;
  for (let m = 0; m < s.items.length; ++m) {
    const b = s.items[m], { start: k, key: _, sep: S, value: w } = b, $ = me(k, {
      flow: a,
      indicator: "explicit-key-ind",
      next: _ ?? (S == null ? void 0 : S[0]),
      offset: f,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !1
    });
    if (!$.found) {
      if (!$.anchor && !$.tag && !S && !w) {
        m === 0 && $.comma ? i($.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : m < s.items.length - 1 && i($.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), $.comment && (c.comment ? c.comment += `
` + $.comment : c.comment = $.comment), f = $.end;
        continue;
      }
      !o && t.options.strict && Me(_) && i(
        _,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (m === 0)
      $.comma && i($.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if ($.comma || i($.start, "MISSING_CHAR", `Missing , between ${a} items`), $.comment) {
      let A = "";
      e: for (const y of k)
        switch (y.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            A = y.source.substring(1);
            break e;
          default:
            break e;
        }
      if (A) {
        let y = c.items[c.items.length - 1];
        C(y) && (y = y.value ?? y.key), y.comment ? y.comment += `
` + A : y.comment = A, $.comment = $.comment.substring(A.length + 1);
      }
    }
    if (!o && !S && !$.found) {
      const A = w ? n(t, w, $, i) : e(t, $.end, S, null, $, i);
      c.items.push(A), f = A.range[2], kt(w) && i(A.range, "BLOCK_IN_FLOW", $t);
    } else {
      t.atKey = !0;
      const A = $.end, y = _ ? n(t, _, $, i) : e(t, A, k, null, $, i);
      kt(_) && i(y.range, "BLOCK_IN_FLOW", $t), t.atKey = !1;
      const O = me(S ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: w,
        offset: y.range[2],
        onError: i,
        parentIndent: s.indent,
        startOnNewline: !1
      });
      if (O.found) {
        if (!o && !$.found && t.options.strict) {
          if (S)
            for (const T of S) {
              if (T === O.found)
                break;
              if (T.type === "newline") {
                i(T, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          $.start < O.found.offset - 1024 && i(O.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else w && ("source" in w && w.source && w.source[0] === ":" ? i(w, "MISSING_CHAR", `Missing space after : in ${a}`) : i(O.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const R = w ? n(t, w, O, i) : O.found ? e(t, O.end, S, null, O, i) : null;
      R ? kt(w) && i(R.range, "BLOCK_IN_FLOW", $t) : O.comment && (y.comment ? y.comment += `
` + O.comment : y.comment = O.comment);
      const V = new P(y, R);
      if (t.options.keepSourceTokens && (V.srcToken = b), o) {
        const T = c;
        kn(t, T.items, y) && i(A, "DUPLICATE_KEY", "Map keys must be unique"), T.items.push(V);
      } else {
        const T = new B(t.schema);
        T.flow = !0, T.items.push(V);
        const Ke = (R ?? y).range;
        T.range = [y.range[0], Ke[1], Ke[2]], c.items.push(T);
      }
      f = R ? R.range[2] : O.end;
    }
  }
  const p = o ? "}" : "]", [h, ...g] = s.end;
  let d = f;
  if (h && h.source === p)
    d = h.offset + h.source.length;
  else {
    const m = a[0].toUpperCase() + a.substring(1), b = u ? `${m} must end with a ${p}` : `${m} in block collection must be sufficiently indented and end with a ${p}`;
    i(f, u ? "MISSING_CHAR" : "BAD_INDENT", b), h && h.source.length !== 1 && g.unshift(h);
  }
  if (g.length > 0) {
    const m = Ue(g, d, t.options.strict, i);
    m.comment && (c.comment ? c.comment += `
` + m.comment : c.comment = m.comment), c.range = [s.offset, d, m.offset];
  } else
    c.range = [s.offset, d, d];
  return c;
}
function _t(n, e, t, s, i, r) {
  const o = t.type === "block-map" ? qi(n, e, t, s, r) : t.type === "block-seq" ? Fi(n, e, t, s, r) : Hi(n, e, t, s, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function Vi(n, e, t, s, i) {
  var p;
  const r = s.tag, o = r ? e.directives.tagName(r.source, (h) => i(r, "TAG_RESOLVE_FAILED", h)) : null;
  if (t.type === "block-seq") {
    const { anchor: h, newlineAfterProp: g } = s, d = h && r ? h.offset > r.offset ? h : r : h ?? r;
    d && (!g || g.offset < d.offset) && i(d, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === B.tagName && a === "map" || o === ne.tagName && a === "seq")
    return _t(n, e, t, i, o);
  let l = e.schema.tags.find((h) => h.tag === o && h.collection === a);
  if (!l) {
    const h = e.schema.knownTags[o];
    if (h && h.collection === a)
      e.schema.tags.push(Object.assign({}, h, { default: !1 })), l = h;
    else
      return h ? i(r, "BAD_COLLECTION_TYPE", `${h.tag} used for ${a} collection, but expects ${h.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), _t(n, e, t, i, o);
  }
  const c = _t(n, e, t, i, o, l), u = ((p = l.resolve) == null ? void 0 : p.call(l, c, (h) => i(r, "TAG_RESOLVE_FAILED", h), e.options)) ?? c, f = I(u) ? u : new N(u);
  return f.range = c.range, f.tag = o, l != null && l.format && (f.format = l.format), f;
}
function Ji(n, e, t) {
  const s = e.offset, i = Yi(e, n.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const r = i.mode === ">" ? N.BLOCK_FOLDED : N.BLOCK_LITERAL, o = e.source ? Gi(e.source) : [];
  let a = o.length;
  for (let d = o.length - 1; d >= 0; --d) {
    const m = o[d][1];
    if (m === "" || m === "\r")
      a = d;
    else
      break;
  }
  if (a === 0) {
    const d = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let m = s + i.length;
    return e.source && (m += e.source.length), { value: d, type: r, comment: i.comment, range: [s, m, m] };
  }
  let l = e.indent + i.indent, c = e.offset + i.length, u = 0;
  for (let d = 0; d < a; ++d) {
    const [m, b] = o[d];
    if (b === "" || b === "\r")
      i.indent === 0 && m.length > l && (l = m.length);
    else {
      m.length < l && t(c + m.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (l = m.length), u = d, l === 0 && !n.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += m.length + b.length + 1;
  }
  for (let d = o.length - 1; d >= a; --d)
    o[d][0].length > l && (a = d + 1);
  let f = "", p = "", h = !1;
  for (let d = 0; d < u; ++d)
    f += o[d][0].slice(l) + `
`;
  for (let d = u; d < a; ++d) {
    let [m, b] = o[d];
    c += m.length + b.length + 1;
    const k = b[b.length - 1] === "\r";
    if (k && (b = b.slice(0, -1)), b && m.length < l) {
      const S = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - b.length - (k ? 2 : 1), "BAD_INDENT", S), m = "";
    }
    r === N.BLOCK_LITERAL ? (f += p + m.slice(l) + b, p = `
`) : m.length > l || b[0] === "	" ? (p === " " ? p = `
` : !h && p === `
` && (p = `

`), f += p + m.slice(l) + b, p = `
`, h = !0) : b === "" ? p === `
` ? f += `
` : p = `
` : (f += p + b, p = " ", h = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let d = a; d < o.length; ++d)
        f += `
` + o[d][0].slice(l);
      f[f.length - 1] !== `
` && (f += `
`);
      break;
    default:
      f += `
`;
  }
  const g = s + i.length + e.source.length;
  return { value: f, type: r, comment: i.comment, range: [s, g, g] };
}
function Yi({ offset: n, props: e }, t, s) {
  if (e[0].type !== "block-scalar-header")
    return s(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", l = -1;
  for (let p = 1; p < i.length; ++p) {
    const h = i[p];
    if (!a && (h === "-" || h === "+"))
      a = h;
    else {
      const g = Number(h);
      !o && g ? o = g : l === -1 && (l = n + p);
    }
  }
  l !== -1 && s(l, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, u = "", f = i.length;
  for (let p = 1; p < e.length; ++p) {
    const h = e[p];
    switch (h.type) {
      case "space":
        c = !0;
      case "newline":
        f += h.source.length;
        break;
      case "comment":
        t && !c && s(h, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), f += h.source.length, u = h.source.substring(1);
        break;
      case "error":
        s(h, "UNEXPECTED_TOKEN", h.message), f += h.source.length;
        break;
      default: {
        const g = `Unexpected token in block scalar header: ${h.type}`;
        s(h, "UNEXPECTED_TOKEN", g);
        const d = h.source;
        d && typeof d == "string" && (f += d.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: u, length: f };
}
function Gi(n) {
  const e = n.split(/\n( *)/), t = e[0], s = t.match(/^( *)/), r = [s != null && s[1] ? [s[1], t.slice(s[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function Wi(n, e, t) {
  const { offset: s, type: i, source: r, end: o } = n;
  let a, l;
  const c = (p, h, g) => t(s + p, h, g);
  switch (i) {
    case "scalar":
      a = N.PLAIN, l = Qi(r, c);
      break;
    case "single-quoted-scalar":
      a = N.QUOTE_SINGLE, l = zi(r, c);
      break;
    case "double-quoted-scalar":
      a = N.QUOTE_DOUBLE, l = Xi(r, c);
      break;
    default:
      return t(n, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${i}`), {
        value: "",
        type: null,
        comment: "",
        range: [s, s + r.length, s + r.length]
      };
  }
  const u = s + r.length, f = Ue(o, u, e, t);
  return {
    value: l,
    type: a,
    comment: f.comment,
    range: [s, u, f.offset]
  };
}
function Qi(n, e) {
  let t = "";
  switch (n[0]) {
    case "	":
      t = "a tab character";
      break;
    case ",":
      t = "flow indicator character ,";
      break;
    case "%":
      t = "directive indicator character %";
      break;
    case "|":
    case ">": {
      t = `block scalar indicator ${n[0]}`;
      break;
    }
    case "@":
    case "`": {
      t = `reserved character ${n[0]}`;
      break;
    }
  }
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), _n(n);
}
function zi(n, e) {
  return (n[n.length - 1] !== "'" || n.length === 1) && e(n.length, "MISSING_CHAR", "Missing closing 'quote"), _n(n.slice(1, -1)).replace(/''/g, "'");
}
function _n(n) {
  let e, t;
  try {
    e = new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`, "sy"), t = new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`, "sy");
  } catch {
    e = /(.*?)[ \t]*\r?\n/sy, t = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let s = e.exec(n);
  if (!s)
    return n;
  let i = s[1], r = " ", o = e.lastIndex;
  for (t.lastIndex = o; s = t.exec(n); )
    s[1] === "" ? r === `
` ? i += r : r = `
` : (i += r + s[1], r = " "), o = t.lastIndex;
  const a = /[ \t]*(.*)/sy;
  return a.lastIndex = o, s = a.exec(n), i + r + ((s == null ? void 0 : s[1]) ?? "");
}
function Xi(n, e) {
  let t = "";
  for (let s = 1; s < n.length - 1; ++s) {
    const i = n[s];
    if (!(i === "\r" && n[s + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = Zi(n, s);
        t += r, s = o;
      } else if (i === "\\") {
        let r = n[++s];
        const o = xi[r];
        if (o)
          t += o;
        else if (r === `
`)
          for (r = n[s + 1]; r === " " || r === "	"; )
            r = n[++s + 1];
        else if (r === "\r" && n[s + 1] === `
`)
          for (r = n[++s + 1]; r === " " || r === "	"; )
            r = n[++s + 1];
        else if (r === "x" || r === "u" || r === "U") {
          const a = { x: 2, u: 4, U: 8 }[r];
          t += er(n, s + 1, a, e), s += a;
        } else {
          const a = n.substr(s - 1, 2);
          e(s - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), t += a;
        }
      } else if (i === " " || i === "	") {
        const r = s;
        let o = n[s + 1];
        for (; o === " " || o === "	"; )
          o = n[++s + 1];
        o !== `
` && !(o === "\r" && n[s + 2] === `
`) && (t += s > r ? n.slice(r, s + 1) : i);
      } else
        t += i;
  }
  return (n[n.length - 1] !== '"' || n.length === 1) && e(n.length, "MISSING_CHAR", 'Missing closing "quote'), t;
}
function Zi(n, e) {
  let t = "", s = n[e + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && n[e + 2] !== `
`); )
    s === `
` && (t += `
`), e += 1, s = n[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const xi = {
  0: "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: `
`,
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "",
  // Unicode next line
  _: " ",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function er(n, e, t, s) {
  const i = n.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  if (isNaN(o)) {
    const a = n.substr(e - 2, t + 2);
    return s(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
  return String.fromCodePoint(o);
}
function An(n, e, t, s) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? Ji(n, e, s) : Wi(e, n.options.strict, s), l = t ? n.directives.tagName(t.source, (f) => s(t, "TAG_RESOLVE_FAILED", f)) : null;
  let c;
  n.options.stringKeys && n.atKey ? c = n.schema[q] : l ? c = tr(n.schema, i, l, t, s) : e.type === "scalar" ? c = sr(n, i, e, s) : c = n.schema[q];
  let u;
  try {
    const f = c.resolve(i, (p) => s(t ?? e, "TAG_RESOLVE_FAILED", p), n.options);
    u = E(f) ? f : new N(f);
  } catch (f) {
    const p = f instanceof Error ? f.message : String(f);
    s(t ?? e, "TAG_RESOLVE_FAILED", p), u = new N(i);
  }
  return u.range = a, u.source = i, r && (u.type = r), l && (u.tag = l), c.format && (u.format = c.format), o && (u.comment = o), u;
}
function tr(n, e, t, s, i) {
  var a;
  if (t === "!")
    return n[q];
  const r = [];
  for (const l of n.tags)
    if (!l.collection && l.tag === t)
      if (l.default && l.test)
        r.push(l);
      else
        return l;
  for (const l of r)
    if ((a = l.test) != null && a.test(e))
      return l;
  const o = n.knownTags[t];
  return o && !o.collection ? (n.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), n[q]);
}
function sr({ atKey: n, directives: e, schema: t }, s, i, r) {
  const o = t.tags.find((a) => {
    var l;
    return (a.default === !0 || n && a.default === "key") && ((l = a.test) == null ? void 0 : l.test(s));
  }) || t[q];
  if (t.compat) {
    const a = t.compat.find((l) => {
      var c;
      return l.default && ((c = l.test) == null ? void 0 : c.test(s));
    }) ?? t[q];
    if (o.tag !== a.tag) {
      const l = e.tagString(o.tag), c = e.tagString(a.tag), u = `Value may be parsed as either ${l} or ${c}`;
      r(i, "TAG_RESOLVE_FAILED", u, !0);
    }
  }
  return o;
}
function nr(n, e, t) {
  if (e) {
    t ?? (t = e.length);
    for (let s = t - 1; s >= 0; --s) {
      let i = e[s];
      switch (i.type) {
        case "space":
        case "comment":
        case "newline":
          n -= i.source.length;
          continue;
      }
      for (i = e[++s]; (i == null ? void 0 : i.type) === "space"; )
        n += i.source.length, i = e[++s];
      break;
    }
  }
  return n;
}
const ir = { composeNode: Nn, composeEmptyNode: Xt };
function Nn(n, e, t, s) {
  const i = n.atKey, { spaceBefore: r, comment: o, anchor: a, tag: l } = t;
  let c, u = !0;
  switch (e.type) {
    case "alias":
      c = rr(n, e, s), (a || l) && s(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = An(n, e, l, s), a && (c.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      c = Vi(ir, n, e, t, s), a && (c.anchor = a.source.substring(1));
      break;
    default: {
      const f = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      s(e, "UNEXPECTED_TOKEN", f), c = Xt(n, e.offset, void 0, null, t, s), u = !1;
    }
  }
  return a && c.anchor === "" && s(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && n.options.stringKeys && (!E(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && s(l ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (c.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? c.comment = o : c.commentBefore = o), n.options.keepSourceTokens && u && (c.srcToken = e), c;
}
function Xt(n, e, t, s, { spaceBefore: i, comment: r, anchor: o, tag: a, end: l }, c) {
  const u = {
    type: "scalar",
    offset: nr(e, t, s),
    indent: -1,
    source: ""
  }, f = An(n, u, a, c);
  return o && (f.anchor = o.source.substring(1), f.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (f.spaceBefore = !0), r && (f.comment = r, f.range[2] = l), f;
}
function rr({ options: n }, { offset: e, source: t, end: s }, i) {
  const r = new Kt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = Ue(s, o, n.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function or(n, e, { offset: t, start: s, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, n), l = new wn(void 0, a), c = {
    atKey: !1,
    atRoot: !0,
    directives: l.directives,
    options: l.options,
    schema: l.schema
  }, u = me(s, {
    indicator: "doc-start",
    next: i ?? (r == null ? void 0 : r[0]),
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  u.found && (l.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !u.hasNewline && o(u.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), l.contents = i ? Nn(c, i, u, o) : Xt(c, u.end, s, null, u, o);
  const f = l.contents.range[2], p = Ue(r, f, !1, o);
  return p.comment && (l.comment = p.comment), l.range = [t, f, p.offset], l;
}
function $e(n) {
  if (typeof n == "number")
    return [n, n + 1];
  if (Array.isArray(n))
    return n.length === 2 ? n : [n[0], n[1]];
  const { offset: e, source: t } = n;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function Ms(n) {
  var i;
  let e = "", t = !1, s = !1;
  for (let r = 0; r < n.length; ++r) {
    const o = n[r];
    switch (o[0]) {
      case "#":
        e += (e === "" ? "" : s ? `

` : `
`) + (o.substring(1) || " "), t = !0, s = !1;
        break;
      case "%":
        ((i = n[r + 1]) == null ? void 0 : i[0]) !== "#" && (r += 1), t = !1;
        break;
      default:
        t || (s = !0), t = !1;
    }
  }
  return { comment: e, afterEmptyLine: s };
}
class ar {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, s, i, r) => {
      const o = $e(t);
      r ? this.warnings.push(new Ri(o, s, i)) : this.errors.push(new _e(o, s, i));
    }, this.directives = new M({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: s, afterEmptyLine: i } = Ms(this.prelude);
    if (s) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${s}` : s;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = s;
      else if (v(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        C(o) && (o = o.key);
        const a = o.commentBefore;
        o.commentBefore = a ? `${s}
${a}` : s;
      } else {
        const o = r.commentBefore;
        r.commentBefore = o ? `${s}
${o}` : s;
      }
    }
    t ? (Array.prototype.push.apply(e.errors, this.errors), Array.prototype.push.apply(e.warnings, this.warnings)) : (e.errors = this.errors, e.warnings = this.warnings), this.prelude = [], this.errors = [], this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: Ms(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(e, t = !1, s = -1) {
    for (const i of e)
      yield* this.next(i);
    yield* this.end(t, s);
  }
  /** Advance the composer by one CST token. */
  *next(e) {
    switch (e.type) {
      case "directive":
        this.directives.add(e.source, (t, s, i) => {
          const r = $e(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", s, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = or(this.options, this.directives, e, this.onError);
        this.atDirectives && !t.directives.docStart && this.onError(e, "MISSING_CHAR", "Missing directives-end/doc-start indicator line"), this.decorate(t, !1), this.doc && (yield this.doc), this.doc = t, this.atDirectives = !1;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(e.source);
        break;
      case "error": {
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, s = new _e($e(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new _e($e(e), "UNEXPECTED_TOKEN", s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Ue(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const s = this.doc.comment;
          this.doc.comment = s ? `${s}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new _e($e(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(e = !1, t = -1) {
    if (this.doc)
      this.decorate(this.doc, !0), yield this.doc, this.doc = null;
    else if (e) {
      const s = Object.assign({ _directives: this.directives }, this.options), i = new wn(void 0, s);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const En = "\uFEFF", On = "", Tn = "", Lt = "";
function lr(n) {
  switch (n) {
    case En:
      return "byte-order-mark";
    case On:
      return "doc-mode";
    case Tn:
      return "flow-error-end";
    case Lt:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case `
`:
    case `\r
`:
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (n[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
function U(n) {
  switch (n) {
    case void 0:
    case " ":
    case `
`:
    case "\r":
    case "	":
      return !0;
    default:
      return !1;
  }
}
const Ps = new Set("0123456789ABCDEFabcdef"), cr = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Ge = new Set(",[]{}"), fr = new Set(` ,[]{}
\r	`), At = (n) => !n || fr.has(n);
class ur {
  constructor() {
    this.atEnd = !1, this.blockScalarIndent = -1, this.blockScalarKeep = !1, this.buffer = "", this.flowKey = !1, this.flowLevel = 0, this.indentNext = 0, this.indentValue = 0, this.lineEndPos = null, this.next = null, this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(e, t = !1) {
    if (e) {
      if (typeof e != "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + e : e, this.lineEndPos = null;
    }
    this.atEnd = !t;
    let s = this.next ?? "stream";
    for (; s && (t || this.hasChars(1)); )
      s = yield* this.parseNext(s);
  }
  atLineEnd() {
    let e = this.pos, t = this.buffer[e];
    for (; t === " " || t === "	"; )
      t = this.buffer[++e];
    return !t || t === "#" || t === `
` ? !0 : t === "\r" ? this.buffer[e + 1] === `
` : !1;
  }
  charAt(e) {
    return this.buffer[this.pos + e];
  }
  continueScalar(e) {
    let t = this.buffer[e];
    if (this.indentNext > 0) {
      let s = 0;
      for (; t === " "; )
        t = this.buffer[++s + e];
      if (t === "\r") {
        const i = this.buffer[s + e + 1];
        if (i === `
` || !i && !this.atEnd)
          return e + s + 1;
      }
      return t === `
` || s >= this.indentNext || !t && !this.atEnd ? e + s : -1;
    }
    if (t === "-" || t === ".") {
      const s = this.buffer.substr(e, 3);
      if ((s === "---" || s === "...") && U(this.buffer[e + 3]))
        return -1;
    }
    return e;
  }
  getLine() {
    let e = this.lineEndPos;
    return (typeof e != "number" || e !== -1 && e < this.pos) && (e = this.buffer.indexOf(`
`, this.pos), this.lineEndPos = e), e === -1 ? this.atEnd ? this.buffer.substring(this.pos) : null : (this.buffer[e - 1] === "\r" && (e -= 1), this.buffer.substring(this.pos, e));
  }
  hasChars(e) {
    return this.pos + e <= this.buffer.length;
  }
  setNext(e) {
    return this.buffer = this.buffer.substring(this.pos), this.pos = 0, this.lineEndPos = null, this.next = e, null;
  }
  peek(e) {
    return this.buffer.substr(this.pos, e);
  }
  *parseNext(e) {
    switch (e) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let e = this.getLine();
    if (e === null)
      return this.setNext("stream");
    if (e[0] === En && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
      let t = e.length, s = e.indexOf("#");
      for (; s !== -1; ) {
        const r = e[s - 1];
        if (r === " " || r === "	") {
          t = s - 1;
          break;
        } else
          s = e.indexOf("#", s + 1);
      }
      for (; ; ) {
        const r = e[t - 1];
        if (r === " " || r === "	")
          t -= 1;
        else
          break;
      }
      const i = (yield* this.pushCount(t)) + (yield* this.pushSpaces(!0));
      return yield* this.pushCount(e.length - i), this.pushNewline(), "stream";
    }
    if (this.atLineEnd()) {
      const t = yield* this.pushSpaces(!0);
      return yield* this.pushCount(e.length - t), yield* this.pushNewline(), "stream";
    }
    return yield On, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && U(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !U(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && U(t)) {
      const s = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return this.indentNext = this.indentValue + 1, this.indentValue += s, yield* this.parseBlockStart();
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(!0);
    const e = this.getLine();
    if (e === null)
      return this.setNext("doc");
    let t = yield* this.pushIndicators();
    switch (e[t]) {
      case "#":
        yield* this.pushCount(e.length - t);
      case void 0:
        return yield* this.pushNewline(), yield* this.parseLineStart();
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel = 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), "doc";
      case "*":
        return yield* this.pushUntil(At), "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        return t += yield* this.parseBlockScalarHeader(), t += yield* this.pushSpaces(!0), yield* this.pushCount(e.length - t), yield* this.pushNewline(), yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let e, t, s = -1;
    do
      e = yield* this.pushNewline(), e > 0 ? (t = yield* this.pushSpaces(!1), this.indentValue = s = t) : t = 0, t += yield* this.pushSpaces(!0);
    while (e + t > 0);
    const i = this.getLine();
    if (i === null)
      return this.setNext("flow");
    if ((s !== -1 && s < this.indentNext && i[0] !== "#" || s === 0 && (i.startsWith("---") || i.startsWith("...")) && U(i[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield Tn, yield* this.parseLineStart();
    let r = 0;
    for (; i[r] === ","; )
      r += yield* this.pushCount(1), r += yield* this.pushSpaces(!0), this.flowKey = !1;
    switch (r += yield* this.pushIndicators(), i[r]) {
      case void 0:
        return "flow";
      case "#":
        return yield* this.pushCount(i.length - r), "flow";
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), this.flowKey = !0, this.flowLevel -= 1, this.flowLevel ? "flow" : "doc";
      case "*":
        return yield* this.pushUntil(At), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || U(o) || o === ",")
          return this.flowKey = !1, yield* this.pushCount(1), yield* this.pushSpaces(!0), "flow";
      }
      default:
        return this.flowKey = !1, yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const e = this.charAt(0);
    let t = this.buffer.indexOf(e, this.pos + 1);
    if (e === "'")
      for (; t !== -1 && this.buffer[t + 1] === "'"; )
        t = this.buffer.indexOf("'", t + 2);
    else
      for (; t !== -1; ) {
        let r = 0;
        for (; this.buffer[t - 1 - r] === "\\"; )
          r += 1;
        if (r % 2 === 0)
          break;
        t = this.buffer.indexOf('"', t + 1);
      }
    const s = this.buffer.substring(0, t);
    let i = s.indexOf(`
`, this.pos);
    if (i !== -1) {
      for (; i !== -1; ) {
        const r = this.continueScalar(i + 1);
        if (r === -1)
          break;
        i = s.indexOf(`
`, r);
      }
      i !== -1 && (t = i - (s[i - 1] === "\r" ? 2 : 1));
    }
    if (t === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      t = this.buffer.length;
    }
    return yield* this.pushToIndex(t + 1, !1), this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1, this.blockScalarKeep = !1;
    let e = this.pos;
    for (; ; ) {
      const t = this.buffer[++e];
      if (t === "+")
        this.blockScalarKeep = !0;
      else if (t > "0" && t <= "9")
        this.blockScalarIndent = Number(t) - 1;
      else if (t !== "-")
        break;
    }
    return yield* this.pushUntil((t) => U(t) || t === "#");
  }
  *parseBlockScalar() {
    let e = this.pos - 1, t = 0, s;
    e: for (let r = this.pos; s = this.buffer[r]; ++r)
      switch (s) {
        case " ":
          t += 1;
          break;
        case `
`:
          e = r, t = 0;
          break;
        case "\r": {
          const o = this.buffer[r + 1];
          if (!o && !this.atEnd)
            return this.setNext("block-scalar");
          if (o === `
`)
            break;
        }
        default:
          break e;
      }
    if (!s && !this.atEnd)
      return this.setNext("block-scalar");
    if (t >= this.indentNext) {
      this.blockScalarIndent === -1 ? this.indentNext = t : this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      do {
        const r = this.continueScalar(e + 1);
        if (r === -1)
          break;
        e = this.buffer.indexOf(`
`, r);
      } while (e !== -1);
      if (e === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        e = this.buffer.length;
      }
    }
    let i = e + 1;
    for (s = this.buffer[i]; s === " "; )
      s = this.buffer[++i];
    if (s === "	") {
      for (; s === "	" || s === " " || s === "\r" || s === `
`; )
        s = this.buffer[++i];
      e = i - 1;
    } else if (!this.blockScalarKeep)
      do {
        let r = e - 1, o = this.buffer[r];
        o === "\r" && (o = this.buffer[--r]);
        const a = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + t > a)
          e = r;
        else
          break;
      } while (!0);
    return yield Lt, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, s = this.pos - 1, i;
    for (; i = this.buffer[++s]; )
      if (i === ":") {
        const r = this.buffer[s + 1];
        if (U(r) || e && Ge.has(r))
          break;
        t = s;
      } else if (U(i)) {
        let r = this.buffer[s + 1];
        if (i === "\r" && (r === `
` ? (s += 1, i = `
`, r = this.buffer[s + 1]) : t = s), r === "#" || e && Ge.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(s + 1);
          if (o === -1)
            break;
          s = Math.max(s, o - 2);
        }
      } else {
        if (e && Ge.has(i))
          break;
        t = s;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield Lt, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
  }
  *pushCount(e) {
    return e > 0 ? (yield this.buffer.substr(this.pos, e), this.pos += e, e) : 0;
  }
  *pushToIndex(e, t) {
    const s = this.buffer.slice(this.pos, e);
    return s ? (yield s, this.pos += s.length, s.length) : (t && (yield ""), 0);
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case "!":
        return (yield* this.pushTag()) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      case "&":
        return (yield* this.pushUntil(At)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      case "-":
      case "?":
      case ":": {
        const e = this.flowLevel > 0, t = this.charAt(1);
        if (U(t) || e && Ge.has(t))
          return e ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let e = this.pos + 2, t = this.buffer[e];
      for (; !U(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (cr.has(t))
          t = this.buffer[++e];
        else if (t === "%" && Ps.has(this.buffer[e + 1]) && Ps.has(this.buffer[e + 2]))
          t = this.buffer[e += 3];
        else
          break;
      return yield* this.pushToIndex(e, !1);
    }
  }
  *pushNewline() {
    const e = this.buffer[this.pos];
    return e === `
` ? yield* this.pushCount(1) : e === "\r" && this.charAt(1) === `
` ? yield* this.pushCount(2) : 0;
  }
  *pushSpaces(e) {
    let t = this.pos - 1, s;
    do
      s = this.buffer[++t];
    while (s === " " || e && s === "	");
    const i = t - this.pos;
    return i > 0 && (yield this.buffer.substr(this.pos, i), this.pos = t), i;
  }
  *pushUntil(e) {
    let t = this.pos, s = this.buffer[t];
    for (; !e(s); )
      s = this.buffer[++t];
    return yield* this.pushToIndex(t, !1);
  }
}
class hr {
  constructor() {
    this.lineStarts = [], this.addNewLine = (e) => this.lineStarts.push(e), this.linePos = (e) => {
      let t = 0, s = this.lineStarts.length;
      for (; t < s; ) {
        const r = t + s >> 1;
        this.lineStarts[r] < e ? t = r + 1 : s = r;
      }
      if (this.lineStarts[t] === e)
        return { line: t + 1, col: 1 };
      if (t === 0)
        return { line: 0, col: e };
      const i = this.lineStarts[t - 1];
      return { line: t, col: e - i + 1 };
    };
  }
}
function J(n, e) {
  for (let t = 0; t < n.length; ++t)
    if (n[t].type === e)
      return !0;
  return !1;
}
function Bs(n) {
  for (let e = 0; e < n.length; ++e)
    switch (n[e].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return e;
    }
  return -1;
}
function vn(n) {
  switch (n == null ? void 0 : n.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return !0;
    default:
      return !1;
  }
}
function We(n) {
  switch (n.type) {
    case "document":
      return n.start;
    case "block-map": {
      const e = n.items[n.items.length - 1];
      return e.sep ?? e.start;
    }
    case "block-seq":
      return n.items[n.items.length - 1].start;
    default:
      return [];
  }
}
function oe(n) {
  var t;
  if (n.length === 0)
    return [];
  let e = n.length;
  e: for (; --e >= 0; )
    switch (n[e].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break e;
    }
  for (; ((t = n[++e]) == null ? void 0 : t.type) === "space"; )
    ;
  return n.splice(e, n.length);
}
function Ds(n) {
  if (n.start.type === "flow-seq-start")
    for (const e of n.items)
      e.sep && !e.value && !J(e.start, "explicit-key-ind") && !J(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, vn(e.value) ? e.value.end ? Array.prototype.push.apply(e.value.end, e.sep) : e.value.end = e.sep : Array.prototype.push.apply(e.start, e.sep), delete e.sep);
}
class dr {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new ur(), this.onNewLine = e;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(e, t = !1) {
    this.onNewLine && this.offset === 0 && this.onNewLine(0);
    for (const s of this.lexer.lex(e, t))
      yield* this.next(s);
    t || (yield* this.end());
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(e) {
    if (this.source = e, this.atScalar) {
      this.atScalar = !1, yield* this.step(), this.offset += e.length;
      return;
    }
    const t = lr(e);
    if (t)
      if (t === "scalar")
        this.atNewLine = !1, this.atScalar = !0, this.type = "scalar";
      else {
        switch (this.type = t, yield* this.step(), t) {
          case "newline":
            this.atNewLine = !0, this.indent = 0, this.onNewLine && this.onNewLine(this.offset + e.length);
            break;
          case "space":
            this.atNewLine && e[0] === " " && (this.indent += e.length);
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            this.atNewLine && (this.indent += e.length);
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = !1;
        }
        this.offset += e.length;
      }
    else {
      const s = `Not a YAML token: ${e}`;
      yield* this.pop({ type: "error", offset: this.offset, message: s, source: e }), this.offset += e.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    for (; this.stack.length > 0; )
      yield* this.pop();
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  *step() {
    const e = this.peek(1);
    if (this.type === "doc-end" && (!e || e.type !== "doc-end")) {
      for (; this.stack.length > 0; )
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!e)
      return yield* this.stream();
    switch (e.type) {
      case "document":
        return yield* this.document(e);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(e);
      case "block-scalar":
        return yield* this.blockScalar(e);
      case "block-map":
        return yield* this.blockMap(e);
      case "block-seq":
        return yield* this.blockSequence(e);
      case "flow-collection":
        return yield* this.flowCollection(e);
      case "doc-end":
        return yield* this.documentEnd(e);
    }
    yield* this.pop();
  }
  peek(e) {
    return this.stack[this.stack.length - e];
  }
  *pop(e) {
    const t = e ?? this.stack.pop();
    if (!t)
      yield { type: "error", offset: this.offset, source: "", message: "Tried to pop an empty stack" };
    else if (this.stack.length === 0)
      yield t;
    else {
      const s = this.peek(1);
      switch (t.type === "block-scalar" ? t.indent = "indent" in s ? s.indent : 0 : t.type === "flow-collection" && s.type === "document" && (t.indent = 0), t.type === "flow-collection" && Ds(t), s.type) {
        case "document":
          s.value = t;
          break;
        case "block-scalar":
          s.props.push(t);
          break;
        case "block-map": {
          const i = s.items[s.items.length - 1];
          if (i.value) {
            s.items.push({ start: [], key: t, sep: [] }), this.onKeyLine = !0;
            return;
          } else if (i.sep)
            i.value = t;
          else {
            Object.assign(i, { key: t, sep: [] }), this.onKeyLine = !i.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const i = s.items[s.items.length - 1];
          i.value ? s.items.push({ start: [], value: t }) : i.value = t;
          break;
        }
        case "flow-collection": {
          const i = s.items[s.items.length - 1];
          !i || i.value ? s.items.push({ start: [], key: t, sep: [] }) : i.sep ? i.value = t : Object.assign(i, { key: t, sep: [] });
          return;
        }
        default:
          yield* this.pop(), yield* this.pop(t);
      }
      if ((s.type === "document" || s.type === "block-map" || s.type === "block-seq") && (t.type === "block-map" || t.type === "block-seq")) {
        const i = t.items[t.items.length - 1];
        i && !i.sep && !i.value && i.start.length > 0 && Bs(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (s.type === "document" ? s.end = i.start : s.items.push({ start: i.start }), t.items.splice(-1, 1));
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const e = {
          type: "document",
          offset: this.offset,
          start: []
        };
        this.type === "doc-start" && e.start.push(this.sourceToken), this.stack.push(e);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(e) {
    if (e.value)
      return yield* this.lineEnd(e);
    switch (this.type) {
      case "doc-start": {
        Bs(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        e.start.push(this.sourceToken);
        return;
    }
    const t = this.startBlockValue(e);
    t ? this.stack.push(t) : yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML document`,
      source: this.source
    };
  }
  *scalar(e) {
    if (this.type === "map-value-ind") {
      const t = We(this.peek(2)), s = oe(t);
      let i;
      e.end ? (i = e.end, i.push(this.sourceToken), delete e.end) : i = [this.sourceToken];
      const r = {
        type: "block-map",
        offset: e.offset,
        indent: e.indent,
        items: [{ start: s, key: e, sep: i }]
      };
      this.onKeyLine = !0, this.stack[this.stack.length - 1] = r;
    } else
      yield* this.lineEnd(e);
  }
  *blockScalar(e) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        e.props.push(this.sourceToken);
        return;
      case "scalar":
        if (e.source = this.source, this.atNewLine = !0, this.indent = 0, this.onNewLine) {
          let t = this.source.indexOf(`
`) + 1;
          for (; t !== 0; )
            this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
        }
        yield* this.pop();
        break;
      default:
        yield* this.pop(), yield* this.step();
    }
  }
  *blockMap(e) {
    var s;
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (this.onKeyLine = !1, t.value) {
          const i = "end" in t.value ? t.value.end : void 0, r = Array.isArray(i) ? i[i.length - 1] : void 0;
          (r == null ? void 0 : r.type) === "comment" ? i == null || i.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else if (t.sep)
          t.sep.push(this.sourceToken);
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const i = e.items[e.items.length - 2], r = (s = i == null ? void 0 : i.value) == null ? void 0 : s.end;
            if (Array.isArray(r)) {
              Array.prototype.push.apply(r, t.start), r.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= e.indent) {
      const i = !this.onKeyLine && this.indent === e.indent, r = i && (t.sep || t.explicitKey) && this.type !== "seq-item-ind";
      let o = [];
      if (r && t.sep && !t.value) {
        const a = [];
        for (let l = 0; l < t.sep.length; ++l) {
          const c = t.sep[l];
          switch (c.type) {
            case "newline":
              a.push(l);
              break;
            case "space":
              break;
            case "comment":
              c.indent > e.indent && (a.length = 0);
              break;
            default:
              a.length = 0;
          }
        }
        a.length >= 2 && (o = t.sep.splice(a[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          r || t.value ? (o.push(this.sourceToken), e.items.push({ start: o }), this.onKeyLine = !0) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !t.sep && !t.explicitKey ? (t.start.push(this.sourceToken), t.explicitKey = !0) : r || t.value ? (o.push(this.sourceToken), e.items.push({ start: o, explicitKey: !0 })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken], explicitKey: !0 }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (t.explicitKey)
            if (t.sep)
              if (t.value)
                e.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (J(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: null, sep: [this.sourceToken] }]
                });
              else if (vn(t.key) && !J(t.sep, "newline")) {
                const a = oe(t.start), l = t.key, c = t.sep;
                c.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: a, key: l, sep: c }]
                });
              } else o.length > 0 ? t.sep = t.sep.concat(o, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (J(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const a = oe(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: a, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || r ? e.items.push({ start: o, key: null, sep: [this.sourceToken] }) : J(t.sep, "map-value-ind") ? this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [], key: null, sep: [this.sourceToken] }]
            }) : t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          this.onKeyLine = !0;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const a = this.flowScalar(this.type);
          r || t.value ? (e.items.push({ start: o, key: a, sep: [] }), this.onKeyLine = !0) : t.sep ? this.stack.push(a) : (Object.assign(t, { key: a, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const a = this.startBlockValue(e);
          if (a) {
            if (a.type === "block-seq") {
              if (!t.explicitKey && t.sep && !J(t.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else i && e.items.push({ start: o });
            this.stack.push(a);
            return;
          }
        }
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *blockSequence(e) {
    var s;
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (t.value) {
          const i = "end" in t.value ? t.value.end : void 0, r = Array.isArray(i) ? i[i.length - 1] : void 0;
          (r == null ? void 0 : r.type) === "comment" ? i == null || i.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else
          t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const i = e.items[e.items.length - 2], r = (s = i == null ? void 0 : i.value) == null ? void 0 : s.end;
            if (Array.isArray(r)) {
              Array.prototype.push.apply(r, t.start), r.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (t.value || this.indent <= e.indent)
          break;
        t.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== e.indent)
          break;
        t.value || J(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
        return;
    }
    if (this.indent > e.indent) {
      const i = this.startBlockValue(e);
      if (i) {
        this.stack.push(i);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(e) {
    const t = e.items[e.items.length - 1];
    if (this.type === "flow-error-end") {
      let s;
      do
        yield* this.pop(), s = this.peek(1);
      while (s && s.type === "flow-collection");
    } else if (e.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          !t || t.sep ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          !t || t.value ? e.items.push({ start: [], key: null, sep: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          !t || t.value ? e.items.push({ start: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const i = this.flowScalar(this.type);
          !t || t.value ? e.items.push({ start: [], key: i, sep: [] }) : t.sep ? this.stack.push(i) : Object.assign(t, { key: i, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          e.end.push(this.sourceToken);
          return;
      }
      const s = this.startBlockValue(e);
      s ? this.stack.push(s) : (yield* this.pop(), yield* this.step());
    } else {
      const s = this.peek(2);
      if (s.type === "block-map" && (this.type === "map-value-ind" && s.indent === e.indent || this.type === "newline" && !s.items[s.items.length - 1].sep))
        yield* this.pop(), yield* this.step();
      else if (this.type === "map-value-ind" && s.type !== "flow-collection") {
        const i = We(s), r = oe(i);
        Ds(e);
        const o = e.end.splice(1, e.end.length);
        o.push(this.sourceToken);
        const a = {
          type: "block-map",
          offset: e.offset,
          indent: e.indent,
          items: [{ start: r, key: e, sep: o }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = a;
      } else
        yield* this.lineEnd(e);
    }
  }
  flowScalar(e) {
    if (this.onNewLine) {
      let t = this.source.indexOf(`
`) + 1;
      for (; t !== 0; )
        this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
    }
    return {
      type: e,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(e) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = !0;
        const t = We(e), s = oe(t);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = We(e), s = oe(t);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(e, t) {
    return this.type !== "comment" || this.indent <= t ? !1 : e.every((s) => s.type === "newline" || s.type === "space");
  }
  *documentEnd(e) {
    this.type !== "doc-mode" && (e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop()));
  }
  *lineEnd(e) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop(), yield* this.step();
        break;
      case "newline":
        this.onKeyLine = !1;
      case "space":
      case "comment":
      default:
        e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop());
    }
  }
}
function pr(n) {
  const e = n.prettyErrors !== !1;
  return { lineCounter: n.lineCounter || e && new hr() || null, prettyErrors: e };
}
function mr(n, e = {}) {
  const { lineCounter: t, prettyErrors: s } = pr(e), i = new dr(t == null ? void 0 : t.addNewLine), r = new ar(e);
  let o = null;
  for (const a of r.compose(i.parse(n), !0, n.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new _e(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && t && (o.errors.forEach(Cs(n, t)), o.warnings.forEach(Cs(n, t))), o;
}
function gr(n, e, t) {
  let s;
  const i = mr(n, t);
  if (!i)
    return null;
  if (i.warnings.forEach((r) => xs(i.options.logLevel, r)), i.errors.length > 0) {
    if (i.options.logLevel !== "silent")
      throw i.errors[0];
    i.errors = [];
  }
  return i.toJS(Object.assign({ reviver: s }, t));
}
const st = class st extends Ee {
  async firstUpdated() {
    await this._maybeLoadData();
  }
  async updated(e) {
    e.has("_config") && await this._maybeLoadData();
  }
  async _maybeLoadData() {
    const e = this._config;
    if (!e) return;
    if (Object.prototype.hasOwnProperty.call(e, "data") && e.data != null) {
      const s = e.data;
      typeof s == "string" ? await this._fetchAndSet(s) : (this._data = s, this.requestUpdate());
      return;
    }
    const t = e.data_url || "/config/rebis-cards/greetings.yaml";
    await this._fetchAndSet(t);
  }
  async _fetchAndSet(e) {
    const t = this._resolve(e), s = [t];
    t.startsWith("/local/") ? s.push(t.replace("/local/", "/hacsfiles/")) : t.startsWith("/hacsfiles/") && s.push(t.replace("/hacsfiles/", "/local/"));
    for (const i of s)
      try {
        const r = await fetch(i, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const o = await r.text();
        this._data = i.match(/\.(yml|yaml)(\?|$)/i) ? gr(o) : JSON.parse(o), console.info("[rebis-header-card] data loaded:", i), this.requestUpdate();
        return;
      } catch (r) {
        console.warn("[rebis-header-card] data try failed:", i, r);
      }
    console.warn("[rebis-header-card] data load failed on all candidates – using built-ins"), this._data = void 0;
  }
  _resolve(e) {
    let t = (e || "").trim();
    return t.startsWith("@config/") && (t = "/local/" + t.slice(8)), t.startsWith("@hacs/") && (t = "/hacsfiles/" + t.slice(6)), t.startsWith("/config/") && (t = "/local/" + t.slice(8)), t.includes("?") || (t += `?v=${Date.now()}`), t;
  }
  setConfig(e) {
    if (!(e != null && e.owner))
      throw new Error("rebis-header-card: 'owner' ist Pflicht.");
    this._config = e, this._data = void 0;
  }
  getCardSize() {
    return 3;
  }
  // ---- Utils ----
  dayOfYear(e) {
    const t = new Date(e.getFullYear(), 0, 0);
    return Math.floor((e.getTime() - t.getTime() + (t.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 864e5);
  }
  weekdays() {
    var t, s;
    const e = (s = (t = this._data) == null ? void 0 : t.settings) == null ? void 0 : s.weekdays;
    return Array.isArray(e) && e.length === 7 ? e : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  }
  bucket(e) {
    return e < 5 ? "night" : e < 12 ? "morning" : e < 18 ? "day" : "evening";
  }
  addrShort(e) {
    if (!e || e === "unknown" || e === "unavailable") return "";
    const t = String(e).split(`
`);
    let s = "", i = "";
    if (e.includes(",") && t.length === 1) {
      const r = e.split(",").map((o) => o.trim());
      s = (r.at(-2) || "").replace(/^\d+\s*/, "").trim(), i = (r.at(-1) || "").replace(/\.$/, "").trim();
    } else
      s = (t.at(-2) || "").trim().replace(/^\d+\s*/, "").trim(), i = (t.at(-1) || "").replace(/\.$/, "").trim();
    return s && i ? `${s}, ${i}` : "";
  }
  resolvePersonal(e) {
    var p, h, g, d;
    const t = (this._config.owner_key || e).toLowerCase(), s = (h = (p = this._data) == null ? void 0 : p.personal) == null ? void 0 : h[t], i = (s == null ? void 0 : s.name) || e, r = ((s == null ? void 0 : s.nicknames) || []).filter(Boolean), o = [
      ...((d = (g = this._data) == null ? void 0 : g.common) == null ? void 0 : d.emojis) || [],
      ...(s == null ? void 0 : s.emojis) || [],
      "✨",
      "🌟",
      "💜",
      "🚀",
      "🦔",
      "🎮",
      "☕",
      "🌈",
      "🧃",
      "🍇",
      "🍀"
      // Fallbacks
    ], a = this._config.home_title ?? (s == null ? void 0 : s.home_title) ?? "Home", l = this._config.location_entity ?? (s == null ? void 0 : s.location_entity), c = this._config.address_entity ?? (s == null ? void 0 : s.geolocation_entity);
    let u = this._config.weather;
    !u && (s != null && s.weather_entity) && typeof s.weather_entity == "string" ? u = {} : !u && typeof (s == null ? void 0 : s.weather_entity) == "object" && (u = s.weather_entity);
    const f = s == null ? void 0 : s.weather_alarm_entity;
    return { key: t, ownerName: i, nicknames: r, emojis: o, homeTitle: a, locationEntity: l, addressEntity: c, weather: u, weatherAlarm: f, rawWeatherEntity: s == null ? void 0 : s.weather_entity };
  }
  applyOneOf(e, t, s) {
    return e.replace(/\{\{\s*oneOf:([^}]+)\}\}/gi, (i, r) => {
      const o = String(r).split("|").map((l) => l.trim()).filter(Boolean).map((l) => ["name", "nick", "user", "city", "country", "emoji"].includes(l) ? s[l] ?? "" : l);
      if (!o.length) return "";
      const a = (t % o.length + o.length) % o.length;
      return o[a];
    });
  }
  parseAddress(e) {
    let t = "", s = "";
    if (!e || e === "unknown" || e === "unavailable") return { city: t, country: s };
    const i = String(e), r = i.split(`
`);
    if (i.includes(",") && r.length === 1) {
      const o = i.split(",").map((a) => a.trim());
      t = (o.at(-2) || "").replace(/^\d+\s*/, "").trim(), s = (o.at(-1) || "").replace(/\.$/, "").trim();
    } else
      t = (r.at(-2) || "").trim().replace(/^\d+\s*/, "").trim(), s = (r.at(-1) || "").replace(/\.$/, "").trim();
    return { city: t, country: s };
  }
  applyPlaceholders(e, t) {
    return e.replace(/\{\{\s*(name|nick|user|city|country|emoji)\s*\}\}/g, (s, i) => t[i] ?? "");
  }
  pick(e, t) {
    if (!e || !e.length) return "";
    const s = (t % e.length + e.length) % e.length;
    return e[s];
  }
  listsFor(e) {
    var g, d, m, b, k, _, S;
    const t = {
      greets: {
        morning: ["Guten Morgen", "Sali zäme", "Hello Sunshine", "Hejho", "Rise & Shine", "Moin Moin"],
        day: ["Hallo", "Hey", "Hoi", "Servus", "Yo", "Hallöchen", "Grüezi"],
        evening: ["Guten Abend", "N’Abend", "Hiya", "Yo", "Bonsoir", "Abend zusammen"],
        night: ["Noch wach?", "Spätschicht!", "Night Owl Mode", "Nachtgruss", "Moonlight mode", "Bett ruft"]
      },
      mottos: {
        morning: ["Neuer Tag, neues Quest!", "Deep Work an – Störer aus.", "Stretch & breathe 🧘", "Hydrate first 💧"],
        day: ["You got this!", "Commit, push, deploy 🚀", "5-Minuten-Tidy lohnt sich", "Snack & Fokus – nice"],
        evening: ["Cool down & Review?", "Save & Commit – dann chillen.", "Golden Hour ✨", "Plan für morgen (2 Bullets)"],
        night: ["Backup läuft? Dann Bett 😴", "Tomorrow-You dankt dir.", "Schlaf = Upgrade", "Wasser ans Bett 💧"]
      }
    }, s = ["morning", "day", "evening", "night"];
    if (!this._data) return t;
    const i = ((g = this._data.settings) == null ? void 0 : g.useBuiltIns) !== !1, r = (this._config.owner_key || e).toLowerCase(), o = ((d = this._data.common) == null ? void 0 : d.greets) ?? {}, a = ((m = this._data.common) == null ? void 0 : m.mottos) ?? {}, l = ((k = (b = this._data.personal) == null ? void 0 : b[r]) == null ? void 0 : k.greets) ?? {}, c = ((S = (_ = this._data.personal) == null ? void 0 : _[r]) == null ? void 0 : S.mottos) ?? {}, u = (w, $) => Object.fromEntries(s.map((A) => [A, [...w[A] ?? [], ...$[A] ?? []]])), f = u(o, l), p = u(a, c), h = (w, $) => Object.fromEntries(s.map((A) => {
      var y;
      return [A, (y = w[A]) != null && y.length ? w[A] : $[A]];
    }));
    if (i) {
      const w = Object.fromEntries(
        s.map((A) => [A, [...t.greets[A], ...f[A]]])
      ), $ = Object.fromEntries(
        s.map((A) => [A, [...t.mottos[A], ...p[A]]])
      );
      return { greets: w, mottos: $ };
    } else {
      const w = h(f, t.greets), $ = h(p, t.mottos);
      return { greets: w, mottos: $ };
    }
  }
  render() {
    var Zt, xt, es, ts, ss, ns, is, rs, os, as, ls, cs, fs, us, hs, ds, ps, ms;
    const e = this._config, t = this.hass, s = /* @__PURE__ */ new Date(), i = this.dayOfYear(s), r = s.getHours(), o = this.bucket(r), a = ((xt = (Zt = t.states) == null ? void 0 : Zt["sensor.time"]) == null ? void 0 : xt.state) || "00:00", l = parseInt(a.split(":")[1] || "0", 10), c = i * 31 + r * 17 + l * 7, u = ((es = t.user) == null ? void 0 : es.name) || "User", f = this.resolvePersonal(e.owner), p = f.locationEntity, h = f.addressEntity || e.address_entity, g = f.homeTitle, d = p ? (ss = (ts = t.states) == null ? void 0 : ts[p]) == null ? void 0 : ss.state : void 0, m = h ? (is = (ns = t.states) == null ? void 0 : ns[h]) == null ? void 0 : is.state : void 0, b = this.addrShort(m), { city: k, country: _ } = this.parseAddress(m);
    let S = "", w = 0, $ = "";
    if ((rs = e.weather) != null && rs.temp)
      S = ((as = (os = t.states) == null ? void 0 : os[e.weather.temp]) == null ? void 0 : as.state) || "", e.weather.alerts_count && (w = parseInt(((cs = (ls = t.states) == null ? void 0 : ls[e.weather.alerts_count]) == null ? void 0 : cs.state) || "0", 10)), e.weather.alerts_info && ($ = ((us = (fs = t.states) == null ? void 0 : fs[e.weather.alerts_info]) == null ? void 0 : us.state) || "");
    else if (typeof f.rawWeatherEntity == "string") {
      const Fe = (hs = t.states) == null ? void 0 : hs[f.rawWeatherEntity];
      if (((ds = Fe == null ? void 0 : Fe.attributes) == null ? void 0 : ds.temperature) != null && (S = String(Fe.attributes.temperature)), f.weatherAlarm) {
        const He = (ps = t.states) == null ? void 0 : ps[f.weatherAlarm];
        (He == null ? void 0 : He.state) === "on" && (w = 1, $ = ((ms = He.attributes) == null ? void 0 : ms.friendly_name) || "Wetterwarnung");
      }
    }
    const { greets: A, mottos: y } = this.listsFor(e.owner), O = this.pick(A[o], c), R = this.pick(y[o], (i + r) * 3 + l), V = f.nicknames.length ? this.pick(f.nicknames, c * 11 + 3) : f.ownerName, T = this.pick(f.emojis, c * 9 + 2), Ke = this.pick(f.emojis, c * 5 + 1), In = this.pick(f.emojis, c * 7 + 3), Re = { name: f.ownerName, nick: V, user: u, city: k, country: _, emoji: T }, Cn = this.applyPlaceholders(this.applyOneOf(O, c, Re), Re), Ln = this.applyPlaceholders(this.applyOneOf(R, (i + r) * 13 + l, Re), Re);
    let qe = "";
    d === "home" ? qe = "Willkommen <b>Zuhause</b>" : d === "not_home" ? qe = "Gerade <b>Unterwegs</b>?" : typeof d == "string" && d && (qe = `Aktuell in <b>${k}, ${_}</b>`);
    const Mn = u.toLowerCase() === e.owner.toLowerCase() ? `Dein Zuhause: ${g}` : `Zu Gast bei <b>${f.ownerName}</b> – ${g}`, Pn = `Eingeloggt als: <b>${u}</b>`, Bn = this.weekdays()[s.getDay()], Dn = s.toLocaleDateString("de-CH"), jn = s.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" });
    return mt`
    <ha-card>
      <h1>${Cn} ${Ke}</h1>
      <h2>${bt(Mn)}</h2>
      <div class="login">${bt(Pn)}</div>

      <p>${bt(qe)}${b ? mt` · 📍 ${b}` : ""} ${In}</p>
      <p><em>${Ln}</em></p>
      <p><strong>Heute:</strong> ${Bn}, ${Dn} – ${jn}.
      ${S || w ? mt`<br><strong>Wetter:</strong> ${S ? `${S}°C` : ""}${w > 0 && $ ? ` · ⚠️ ${$}` : ""}` : ""}</p>
    </ha-card>
  `;
  }
};
st.properties = {
  hass: { attribute: !1 },
  _config: { attribute: !1 }
}, st.styles = Kn`
    ha-card { padding: 12px 16px; border-radius: 14px; }
    h1 { margin: 0; line-height: 1.15; font-weight: 800; }
    h2 { margin: .2rem 0 0; line-height: 1.2; font-weight: 800; font-style: italic; }
    .login { margin: .05rem 0 .35rem; opacity: .9; }
    p { margin: .18rem 0; }
    em { opacity: .95; }
  `;
let Mt = st;
customElements.get("rebis-header-card") || (customElements.define("rebis-header-card", Mt), window.customCards = window.customCards || [], window.customCards.push({
  type: "rebis-header-card",
  name: "Rebis Header Card",
  description: "Header mit Gruss, Standort & Wetter",
  preview: !0
}));
const yr = "0.1.0";
console.info(
  "%c Rebis Cards %c v" + yr + " ",
  "color:#fff;background:#7c3aed;padding:2px 6px;border-radius:4px 0 0 4px",
  "color:#fff;background:#111827;padding:2px 6px;border-radius:0 4px 4px 0"
);
