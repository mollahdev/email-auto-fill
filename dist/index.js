var m = Object.defineProperty;
var h = (s, t, e) => t in s ? m(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var n = (s, t, e) => (h(s, typeof t != "symbol" ? t + "" : t, e), e);
class c {
  extractDomain() {
    const [t, e] = this.value.split("@");
    return {
      username: t,
      domain: e
    };
  }
  isEmailComplete() {
    return this.config.domains.filter((e) => this.value.toLowerCase().includes(e.name)).length > 0;
  }
  getDomain() {
    const { domain: t } = this.extractDomain();
    return t && this.config.domains.filter((e) => e.name.startsWith(t.toLowerCase()))[0] || !1;
  }
  hasUppercaseCharacter(t) {
    for (let e = 0; e < t.length; e++)
      if (t[e] !== t[e].toLowerCase())
        return !0;
    return !1;
  }
}
const r = "auto-fill", l = "suggesation";
class d extends c {
  constructor(e) {
    super();
    n(this, "config");
    n(this, "value", "");
    this.config = e;
  }
  dispatch(e, a) {
    this.value = a;
    const { domain: i, username: o } = this.extractDomain();
    i && o && (e === r && this.autoCompleteHandler(), e === l && this.checkSuggesation());
  }
  checkSuggesation() {
    const { domain: e } = this.extractDomain();
    if (!e || this.isEmailComplete())
      return;
    const a = this.config.domains.filter((i) => {
      if (i.name !== e.toLowerCase().trim() && Array.isArray(i.misspelledVariations))
        return i.misspelledVariations.includes(e.toLowerCase());
    })[0] || !1;
    a && this.config.subscribe({
      type: l,
      inValue: this.value,
      outValue: `${this.extractDomain().username}@${a.name}`
    });
  }
  autoCompleteHandler() {
    if (this.isEmailComplete())
      return;
    const { shouldShow: e, email: a } = this.getAutoCompleteEmail();
    e && this.config.subscribe({
      type: r,
      inValue: this.value,
      outValue: a
    });
  }
  getAutoCompleteEmail() {
    const { domain: e, username: a } = this.extractDomain();
    if (!e || !a)
      return {
        shouldShow: !1,
        email: this.value
      };
    const i = this.getDomain();
    if (i && e.length >= i.autoCompleteAfter && e.length <= i.name.length) {
      let o = "";
      if (this.hasUppercaseCharacter(e)) {
        const [, u] = i.name.split(e.toLowerCase());
        o = `${a}@${e}${u}`;
      } else
        o = `${a}@${i.name}`;
      return {
        shouldShow: !0,
        email: o
      };
    }
    return {
      shouldShow: !1,
      email: this.value
    };
  }
}
export {
  d as default
};
