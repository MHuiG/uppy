"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/marked/lib/marked.js
  var require_marked = __commonJS({
    "node_modules/marked/lib/marked.js"(exports, module) {
      (function(root) {
        "use strict";
        var block = {
          newline: /^\n+/,
          code: /^( {4}[^\n]+\n*)+/,
          fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
          hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
          heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
          blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
          list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
          html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
          def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
          nptable: noop,
          table: noop,
          lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
          _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
          text: /^[^\n]+/
        };
        block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
        block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
        block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
        block.bullet = /(?:[*+-]|\d{1,9}\.)/;
        block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
        block.item = edit(block.item, "gm").replace(/bull/g, block.bullet).getRegex();
        block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
        block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
        block._comment = /<!--(?!-?>)[\s\S]*?-->/;
        block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
        block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} +").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", block._tag).getRegex();
        block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
        block.normal = merge({}, block);
        block.gfm = merge({}, block.normal, {
          nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
          table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
        });
        block.pedantic = merge({}, block.normal, {
          html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
          def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
          heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
          fences: noop,
          paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
        });
        function Lexer(options) {
          this.tokens = [];
          this.tokens.links = /* @__PURE__ */ Object.create(null);
          this.options = options || marked2.defaults;
          this.rules = block.normal;
          if (this.options.pedantic) {
            this.rules = block.pedantic;
          } else if (this.options.gfm) {
            this.rules = block.gfm;
          }
        }
        Lexer.rules = block;
        Lexer.lex = function(src, options) {
          var lexer = new Lexer(options);
          return lexer.lex(src);
        };
        Lexer.prototype.lex = function(src) {
          src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n");
          return this.token(src, true);
        };
        Lexer.prototype.token = function(src, top) {
          src = src.replace(/^ +$/gm, "");
          var next, loose, cap, bull, b3, item, listStart, listItems, t3, space, i4, tag, l3, isordered, istask, ischecked;
          while (src) {
            if (cap = this.rules.newline.exec(src)) {
              src = src.substring(cap[0].length);
              if (cap[0].length > 1) {
                this.tokens.push({
                  type: "space"
                });
              }
            }
            if (cap = this.rules.code.exec(src)) {
              var lastToken = this.tokens[this.tokens.length - 1];
              src = src.substring(cap[0].length);
              if (lastToken && lastToken.type === "paragraph") {
                lastToken.text += "\n" + cap[0].trimRight();
              } else {
                cap = cap[0].replace(/^ {4}/gm, "");
                this.tokens.push({
                  type: "code",
                  codeBlockStyle: "indented",
                  text: !this.options.pedantic ? rtrim(cap, "\n") : cap
                });
              }
              continue;
            }
            if (cap = this.rules.fences.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "code",
                lang: cap[2] ? cap[2].trim() : cap[2],
                text: cap[3] || ""
              });
              continue;
            }
            if (cap = this.rules.heading.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "heading",
                depth: cap[1].length,
                text: cap[2]
              });
              continue;
            }
            if (cap = this.rules.nptable.exec(src)) {
              item = {
                type: "table",
                header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
                align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
              };
              if (item.header.length === item.align.length) {
                src = src.substring(cap[0].length);
                for (i4 = 0; i4 < item.align.length; i4++) {
                  if (/^ *-+: *$/.test(item.align[i4])) {
                    item.align[i4] = "right";
                  } else if (/^ *:-+: *$/.test(item.align[i4])) {
                    item.align[i4] = "center";
                  } else if (/^ *:-+ *$/.test(item.align[i4])) {
                    item.align[i4] = "left";
                  } else {
                    item.align[i4] = null;
                  }
                }
                for (i4 = 0; i4 < item.cells.length; i4++) {
                  item.cells[i4] = splitCells(item.cells[i4], item.header.length);
                }
                this.tokens.push(item);
                continue;
              }
            }
            if (cap = this.rules.hr.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "hr"
              });
              continue;
            }
            if (cap = this.rules.blockquote.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "blockquote_start"
              });
              cap = cap[0].replace(/^ *> ?/gm, "");
              this.token(cap, top);
              this.tokens.push({
                type: "blockquote_end"
              });
              continue;
            }
            if (cap = this.rules.list.exec(src)) {
              src = src.substring(cap[0].length);
              bull = cap[2];
              isordered = bull.length > 1;
              listStart = {
                type: "list_start",
                ordered: isordered,
                start: isordered ? +bull : "",
                loose: false
              };
              this.tokens.push(listStart);
              cap = cap[0].match(this.rules.item);
              listItems = [];
              next = false;
              l3 = cap.length;
              i4 = 0;
              for (; i4 < l3; i4++) {
                item = cap[i4];
                space = item.length;
                item = item.replace(/^ *([*+-]|\d+\.) */, "");
                if (~item.indexOf("\n ")) {
                  space -= item.length;
                  item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
                }
                if (i4 !== l3 - 1) {
                  b3 = block.bullet.exec(cap[i4 + 1])[0];
                  if (bull.length > 1 ? b3.length === 1 : b3.length > 1 || this.options.smartLists && b3 !== bull) {
                    src = cap.slice(i4 + 1).join("\n") + src;
                    i4 = l3 - 1;
                  }
                }
                loose = next || /\n\n(?!\s*$)/.test(item);
                if (i4 !== l3 - 1) {
                  next = item.charAt(item.length - 1) === "\n";
                  if (!loose)
                    loose = next;
                }
                if (loose) {
                  listStart.loose = true;
                }
                istask = /^\[[ xX]\] /.test(item);
                ischecked = void 0;
                if (istask) {
                  ischecked = item[1] !== " ";
                  item = item.replace(/^\[[ xX]\] +/, "");
                }
                t3 = {
                  type: "list_item_start",
                  task: istask,
                  checked: ischecked,
                  loose
                };
                listItems.push(t3);
                this.tokens.push(t3);
                this.token(item, false);
                this.tokens.push({
                  type: "list_item_end"
                });
              }
              if (listStart.loose) {
                l3 = listItems.length;
                i4 = 0;
                for (; i4 < l3; i4++) {
                  listItems[i4].loose = true;
                }
              }
              this.tokens.push({
                type: "list_end"
              });
              continue;
            }
            if (cap = this.rules.html.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: this.options.sanitize ? "paragraph" : "html",
                pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
                text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]) : cap[0]
              });
              continue;
            }
            if (top && (cap = this.rules.def.exec(src))) {
              src = src.substring(cap[0].length);
              if (cap[3])
                cap[3] = cap[3].substring(1, cap[3].length - 1);
              tag = cap[1].toLowerCase().replace(/\s+/g, " ");
              if (!this.tokens.links[tag]) {
                this.tokens.links[tag] = {
                  href: cap[2],
                  title: cap[3]
                };
              }
              continue;
            }
            if (cap = this.rules.table.exec(src)) {
              item = {
                type: "table",
                header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
                align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
              };
              if (item.header.length === item.align.length) {
                src = src.substring(cap[0].length);
                for (i4 = 0; i4 < item.align.length; i4++) {
                  if (/^ *-+: *$/.test(item.align[i4])) {
                    item.align[i4] = "right";
                  } else if (/^ *:-+: *$/.test(item.align[i4])) {
                    item.align[i4] = "center";
                  } else if (/^ *:-+ *$/.test(item.align[i4])) {
                    item.align[i4] = "left";
                  } else {
                    item.align[i4] = null;
                  }
                }
                for (i4 = 0; i4 < item.cells.length; i4++) {
                  item.cells[i4] = splitCells(item.cells[i4].replace(/^ *\| *| *\| *$/g, ""), item.header.length);
                }
                this.tokens.push(item);
                continue;
              }
            }
            if (cap = this.rules.lheading.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "heading",
                depth: cap[2].charAt(0) === "=" ? 1 : 2,
                text: cap[1]
              });
              continue;
            }
            if (top && (cap = this.rules.paragraph.exec(src))) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "paragraph",
                text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
              });
              continue;
            }
            if (cap = this.rules.text.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "text",
                text: cap[0]
              });
              continue;
            }
            if (src) {
              throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
            }
          }
          return this.tokens;
        };
        var inline = {
          escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
          autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
          url: noop,
          tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
          link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
          reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
          nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
          strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
          em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
          code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
          br: /^( {2,}|\\)\n(?!\s*$)/,
          del: noop,
          text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
        };
        inline._punctuation = `!"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~`;
        inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
        inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
        inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
        inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
        inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
        inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
        inline.tag = edit(inline.tag).replace("comment", block._comment).replace("attribute", inline._attribute).getRegex();
        inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
        inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
        inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
        inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
        inline.reflink = edit(inline.reflink).replace("label", inline._label).getRegex();
        inline.normal = merge({}, inline);
        inline.pedantic = merge({}, inline.normal, {
          strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
          link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
          reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
        });
        inline.gfm = merge({}, inline.normal, {
          escape: edit(inline.escape).replace("])", "~|])").getRegex(),
          _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
          url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
          _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
          del: /^~+(?=\S)([\s\S]*?\S)~+/,
          text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
        });
        inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
        inline.breaks = merge({}, inline.gfm, {
          br: edit(inline.br).replace("{2,}", "*").getRegex(),
          text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
        });
        function InlineLexer(links, options) {
          this.options = options || marked2.defaults;
          this.links = links;
          this.rules = inline.normal;
          this.renderer = this.options.renderer || new Renderer();
          this.renderer.options = this.options;
          if (!this.links) {
            throw new Error("Tokens array requires a `links` property.");
          }
          if (this.options.pedantic) {
            this.rules = inline.pedantic;
          } else if (this.options.gfm) {
            if (this.options.breaks) {
              this.rules = inline.breaks;
            } else {
              this.rules = inline.gfm;
            }
          }
        }
        InlineLexer.rules = inline;
        InlineLexer.output = function(src, links, options) {
          var inline2 = new InlineLexer(links, options);
          return inline2.output(src);
        };
        InlineLexer.prototype.output = function(src) {
          var out = "", link, text, href, title, cap, prevCapZero;
          while (src) {
            if (cap = this.rules.escape.exec(src)) {
              src = src.substring(cap[0].length);
              out += escape2(cap[1]);
              continue;
            }
            if (cap = this.rules.tag.exec(src)) {
              if (!this.inLink && /^<a /i.test(cap[0])) {
                this.inLink = true;
              } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
                this.inLink = false;
              }
              if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.inRawBlock = true;
              } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.inRawBlock = false;
              }
              src = src.substring(cap[0].length);
              out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]) : cap[0];
              continue;
            }
            if (cap = this.rules.link.exec(src)) {
              var lastParenIndex = findClosingBracket(cap[2], "()");
              if (lastParenIndex > -1) {
                var linkLen = 4 + cap[1].length + lastParenIndex;
                cap[2] = cap[2].substring(0, lastParenIndex);
                cap[0] = cap[0].substring(0, linkLen).trim();
                cap[3] = "";
              }
              src = src.substring(cap[0].length);
              this.inLink = true;
              href = cap[2];
              if (this.options.pedantic) {
                link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
                if (link) {
                  href = link[1];
                  title = link[3];
                } else {
                  title = "";
                }
              } else {
                title = cap[3] ? cap[3].slice(1, -1) : "";
              }
              href = href.trim().replace(/^<([\s\S]*)>$/, "$1");
              out += this.outputLink(cap, {
                href: InlineLexer.escapes(href),
                title: InlineLexer.escapes(title)
              });
              this.inLink = false;
              continue;
            }
            if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
              src = src.substring(cap[0].length);
              link = (cap[2] || cap[1]).replace(/\s+/g, " ");
              link = this.links[link.toLowerCase()];
              if (!link || !link.href) {
                out += cap[0].charAt(0);
                src = cap[0].substring(1) + src;
                continue;
              }
              this.inLink = true;
              out += this.outputLink(cap, link);
              this.inLink = false;
              continue;
            }
            if (cap = this.rules.strong.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
              continue;
            }
            if (cap = this.rules.em.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
              continue;
            }
            if (cap = this.rules.code.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.codespan(escape2(cap[2].trim(), true));
              continue;
            }
            if (cap = this.rules.br.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.br();
              continue;
            }
            if (cap = this.rules.del.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.del(this.output(cap[1]));
              continue;
            }
            if (cap = this.rules.autolink.exec(src)) {
              src = src.substring(cap[0].length);
              if (cap[2] === "@") {
                text = escape2(this.mangle(cap[1]));
                href = "mailto:" + text;
              } else {
                text = escape2(cap[1]);
                href = text;
              }
              out += this.renderer.link(href, null, text);
              continue;
            }
            if (!this.inLink && (cap = this.rules.url.exec(src))) {
              if (cap[2] === "@") {
                text = escape2(cap[0]);
                href = "mailto:" + text;
              } else {
                do {
                  prevCapZero = cap[0];
                  cap[0] = this.rules._backpedal.exec(cap[0])[0];
                } while (prevCapZero !== cap[0]);
                text = escape2(cap[0]);
                if (cap[1] === "www.") {
                  href = "http://" + text;
                } else {
                  href = text;
                }
              }
              src = src.substring(cap[0].length);
              out += this.renderer.link(href, null, text);
              continue;
            }
            if (cap = this.rules.text.exec(src)) {
              src = src.substring(cap[0].length);
              if (this.inRawBlock) {
                out += this.renderer.text(this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]) : cap[0]);
              } else {
                out += this.renderer.text(escape2(this.smartypants(cap[0])));
              }
              continue;
            }
            if (src) {
              throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
            }
          }
          return out;
        };
        InlineLexer.escapes = function(text) {
          return text ? text.replace(InlineLexer.rules._escapes, "$1") : text;
        };
        InlineLexer.prototype.outputLink = function(cap, link) {
          var href = link.href, title = link.title ? escape2(link.title) : null;
          return cap[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape2(cap[1]));
        };
        InlineLexer.prototype.smartypants = function(text) {
          if (!this.options.smartypants)
            return text;
          return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
        };
        InlineLexer.prototype.mangle = function(text) {
          if (!this.options.mangle)
            return text;
          var out = "", l3 = text.length, i4 = 0, ch;
          for (; i4 < l3; i4++) {
            ch = text.charCodeAt(i4);
            if (Math.random() > 0.5) {
              ch = "x" + ch.toString(16);
            }
            out += "&#" + ch + ";";
          }
          return out;
        };
        function Renderer(options) {
          this.options = options || marked2.defaults;
        }
        Renderer.prototype.code = function(code, infostring, escaped) {
          var lang = (infostring || "").match(/\S*/)[0];
          if (this.options.highlight) {
            var out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
              escaped = true;
              code = out;
            }
          }
          if (!lang) {
            return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>";
          }
          return '<pre><code class="' + this.options.langPrefix + escape2(lang, true) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
        };
        Renderer.prototype.blockquote = function(quote) {
          return "<blockquote>\n" + quote + "</blockquote>\n";
        };
        Renderer.prototype.html = function(html) {
          return html;
        };
        Renderer.prototype.heading = function(text, level, raw, slugger) {
          if (this.options.headerIds) {
            return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
          }
          return "<h" + level + ">" + text + "</h" + level + ">\n";
        };
        Renderer.prototype.hr = function() {
          return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
        };
        Renderer.prototype.list = function(body, ordered, start) {
          var type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
          return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
        };
        Renderer.prototype.listitem = function(text) {
          return "<li>" + text + "</li>\n";
        };
        Renderer.prototype.checkbox = function(checked) {
          return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
        };
        Renderer.prototype.paragraph = function(text) {
          return "<p>" + text + "</p>\n";
        };
        Renderer.prototype.table = function(header, body) {
          if (body)
            body = "<tbody>" + body + "</tbody>";
          return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
        };
        Renderer.prototype.tablerow = function(content) {
          return "<tr>\n" + content + "</tr>\n";
        };
        Renderer.prototype.tablecell = function(content, flags) {
          var type = flags.header ? "th" : "td";
          var tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
          return tag + content + "</" + type + ">\n";
        };
        Renderer.prototype.strong = function(text) {
          return "<strong>" + text + "</strong>";
        };
        Renderer.prototype.em = function(text) {
          return "<em>" + text + "</em>";
        };
        Renderer.prototype.codespan = function(text) {
          return "<code>" + text + "</code>";
        };
        Renderer.prototype.br = function() {
          return this.options.xhtml ? "<br/>" : "<br>";
        };
        Renderer.prototype.del = function(text) {
          return "<del>" + text + "</del>";
        };
        Renderer.prototype.link = function(href, title, text) {
          href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
          if (href === null) {
            return text;
          }
          var out = '<a href="' + escape2(href) + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += ">" + text + "</a>";
          return out;
        };
        Renderer.prototype.image = function(href, title, text) {
          href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
          if (href === null) {
            return text;
          }
          var out = '<img src="' + href + '" alt="' + text + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += this.options.xhtml ? "/>" : ">";
          return out;
        };
        Renderer.prototype.text = function(text) {
          return text;
        };
        function TextRenderer() {
        }
        TextRenderer.prototype.strong = TextRenderer.prototype.em = TextRenderer.prototype.codespan = TextRenderer.prototype.del = TextRenderer.prototype.text = function(text) {
          return text;
        };
        TextRenderer.prototype.link = TextRenderer.prototype.image = function(href, title, text) {
          return "" + text;
        };
        TextRenderer.prototype.br = function() {
          return "";
        };
        function Parser(options) {
          this.tokens = [];
          this.token = null;
          this.options = options || marked2.defaults;
          this.options.renderer = this.options.renderer || new Renderer();
          this.renderer = this.options.renderer;
          this.renderer.options = this.options;
          this.slugger = new Slugger();
        }
        Parser.parse = function(src, options) {
          var parser = new Parser(options);
          return parser.parse(src);
        };
        Parser.prototype.parse = function(src) {
          this.inline = new InlineLexer(src.links, this.options);
          this.inlineText = new InlineLexer(src.links, merge({}, this.options, {
            renderer: new TextRenderer()
          }));
          this.tokens = src.reverse();
          var out = "";
          while (this.next()) {
            out += this.tok();
          }
          return out;
        };
        Parser.prototype.next = function() {
          this.token = this.tokens.pop();
          return this.token;
        };
        Parser.prototype.peek = function() {
          return this.tokens[this.tokens.length - 1] || 0;
        };
        Parser.prototype.parseText = function() {
          var body = this.token.text;
          while (this.peek().type === "text") {
            body += "\n" + this.next().text;
          }
          return this.inline.output(body);
        };
        Parser.prototype.tok = function() {
          switch (this.token.type) {
            case "space": {
              return "";
            }
            case "hr": {
              return this.renderer.hr();
            }
            case "heading": {
              return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, unescape2(this.inlineText.output(this.token.text)), this.slugger);
            }
            case "code": {
              return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
            }
            case "table": {
              var header = "", body = "", i4, row, cell, j3;
              cell = "";
              for (i4 = 0; i4 < this.token.header.length; i4++) {
                cell += this.renderer.tablecell(this.inline.output(this.token.header[i4]), {
                  header: true,
                  align: this.token.align[i4]
                });
              }
              header += this.renderer.tablerow(cell);
              for (i4 = 0; i4 < this.token.cells.length; i4++) {
                row = this.token.cells[i4];
                cell = "";
                for (j3 = 0; j3 < row.length; j3++) {
                  cell += this.renderer.tablecell(this.inline.output(row[j3]), {
                    header: false,
                    align: this.token.align[j3]
                  });
                }
                body += this.renderer.tablerow(cell);
              }
              return this.renderer.table(header, body);
            }
            case "blockquote_start": {
              body = "";
              while (this.next().type !== "blockquote_end") {
                body += this.tok();
              }
              return this.renderer.blockquote(body);
            }
            case "list_start": {
              body = "";
              var ordered = this.token.ordered, start = this.token.start;
              while (this.next().type !== "list_end") {
                body += this.tok();
              }
              return this.renderer.list(body, ordered, start);
            }
            case "list_item_start": {
              body = "";
              var loose = this.token.loose;
              var checked = this.token.checked;
              var task = this.token.task;
              if (this.token.task) {
                body += this.renderer.checkbox(checked);
              }
              while (this.next().type !== "list_item_end") {
                body += !loose && this.token.type === "text" ? this.parseText() : this.tok();
              }
              return this.renderer.listitem(body, task, checked);
            }
            case "html": {
              return this.renderer.html(this.token.text);
            }
            case "paragraph": {
              return this.renderer.paragraph(this.inline.output(this.token.text));
            }
            case "text": {
              return this.renderer.paragraph(this.parseText());
            }
            default: {
              var errMsg = 'Token with "' + this.token.type + '" type was not found.';
              if (this.options.silent) {
                console.log(errMsg);
              } else {
                throw new Error(errMsg);
              }
            }
          }
        };
        function Slugger() {
          this.seen = {};
        }
        Slugger.prototype.slug = function(value2) {
          var slug = value2.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
          if (this.seen.hasOwnProperty(slug)) {
            var originalSlug = slug;
            do {
              this.seen[originalSlug]++;
              slug = originalSlug + "-" + this.seen[originalSlug];
            } while (this.seen.hasOwnProperty(slug));
          }
          this.seen[slug] = 0;
          return slug;
        };
        function escape2(html, encode4) {
          if (encode4) {
            if (escape2.escapeTest.test(html)) {
              return html.replace(escape2.escapeReplace, function(ch) {
                return escape2.replacements[ch];
              });
            }
          } else {
            if (escape2.escapeTestNoEncode.test(html)) {
              return html.replace(escape2.escapeReplaceNoEncode, function(ch) {
                return escape2.replacements[ch];
              });
            }
          }
          return html;
        }
        escape2.escapeTest = /[&<>"']/;
        escape2.escapeReplace = /[&<>"']/g;
        escape2.replacements = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        escape2.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
        escape2.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
        function unescape2(html) {
          return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_3, n2) {
            n2 = n2.toLowerCase();
            if (n2 === "colon")
              return ":";
            if (n2.charAt(0) === "#") {
              return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
            }
            return "";
          });
        }
        function edit(regex, opt) {
          regex = regex.source || regex;
          opt = opt || "";
          return {
            replace: function(name, val) {
              val = val.source || val;
              val = val.replace(/(^|[^\[])\^/g, "$1");
              regex = regex.replace(name, val);
              return this;
            },
            getRegex: function() {
              return new RegExp(regex, opt);
            }
          };
        }
        function cleanUrl(sanitize, base, href) {
          if (sanitize) {
            try {
              var prot = decodeURIComponent(unescape2(href)).replace(/[^\w:]/g, "").toLowerCase();
            } catch (e3) {
              return null;
            }
            if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
              return null;
            }
          }
          if (base && !originIndependentUrl.test(href)) {
            href = resolveUrl2(base, href);
          }
          try {
            href = encodeURI(href).replace(/%25/g, "%");
          } catch (e3) {
            return null;
          }
          return href;
        }
        function resolveUrl2(base, href) {
          if (!baseUrls[" " + base]) {
            if (/^[^:]+:\/*[^/]*$/.test(base)) {
              baseUrls[" " + base] = base + "/";
            } else {
              baseUrls[" " + base] = rtrim(base, "/", true);
            }
          }
          base = baseUrls[" " + base];
          if (href.slice(0, 2) === "//") {
            return base.replace(/:[\s\S]*/, ":") + href;
          } else if (href.charAt(0) === "/") {
            return base.replace(/(:\/*[^/]*)[\s\S]*/, "$1") + href;
          } else {
            return base + href;
          }
        }
        var baseUrls = {};
        var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
        function noop() {
        }
        noop.exec = noop;
        function merge(obj) {
          var i4 = 1, target, key;
          for (; i4 < arguments.length; i4++) {
            target = arguments[i4];
            for (key in target) {
              if (Object.prototype.hasOwnProperty.call(target, key)) {
                obj[key] = target[key];
              }
            }
          }
          return obj;
        }
        function splitCells(tableRow, count) {
          var row = tableRow.replace(/\|/g, function(match2, offset, str) {
            var escaped = false, curr = offset;
            while (--curr >= 0 && str[curr] === "\\")
              escaped = !escaped;
            if (escaped) {
              return "|";
            } else {
              return " |";
            }
          }), cells = row.split(/ \|/), i4 = 0;
          if (cells.length > count) {
            cells.splice(count);
          } else {
            while (cells.length < count)
              cells.push("");
          }
          for (; i4 < cells.length; i4++) {
            cells[i4] = cells[i4].trim().replace(/\\\|/g, "|");
          }
          return cells;
        }
        function rtrim(str, c3, invert) {
          if (str.length === 0) {
            return "";
          }
          var suffLen = 0;
          while (suffLen < str.length) {
            var currChar = str.charAt(str.length - suffLen - 1);
            if (currChar === c3 && !invert) {
              suffLen++;
            } else if (currChar !== c3 && invert) {
              suffLen++;
            } else {
              break;
            }
          }
          return str.substr(0, str.length - suffLen);
        }
        function findClosingBracket(str, b3) {
          if (str.indexOf(b3[1]) === -1) {
            return -1;
          }
          var level = 0;
          for (var i4 = 0; i4 < str.length; i4++) {
            if (str[i4] === "\\") {
              i4++;
            } else if (str[i4] === b3[0]) {
              level++;
            } else if (str[i4] === b3[1]) {
              level--;
              if (level < 0) {
                return i4;
              }
            }
          }
          return -1;
        }
        function checkSanitizeDeprecation(opt) {
          if (opt && opt.sanitize && !opt.silent) {
            console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
          }
        }
        function marked2(src, opt, callback) {
          if (typeof src === "undefined" || src === null) {
            throw new Error("marked(): input parameter is undefined or null");
          }
          if (typeof src !== "string") {
            throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
          }
          if (callback || typeof opt === "function") {
            if (!callback) {
              callback = opt;
              opt = null;
            }
            opt = merge({}, marked2.defaults, opt || {});
            checkSanitizeDeprecation(opt);
            var highlight = opt.highlight, tokens, pending, i4 = 0;
            try {
              tokens = Lexer.lex(src, opt);
            } catch (e3) {
              return callback(e3);
            }
            pending = tokens.length;
            var done = function(err) {
              if (err) {
                opt.highlight = highlight;
                return callback(err);
              }
              var out;
              try {
                out = Parser.parse(tokens, opt);
              } catch (e3) {
                err = e3;
              }
              opt.highlight = highlight;
              return err ? callback(err) : callback(null, out);
            };
            if (!highlight || highlight.length < 3) {
              return done();
            }
            delete opt.highlight;
            if (!pending)
              return done();
            for (; i4 < tokens.length; i4++) {
              (function(token) {
                if (token.type !== "code") {
                  return --pending || done();
                }
                return highlight(token.text, token.lang, function(err, code) {
                  if (err)
                    return done(err);
                  if (code == null || code === token.text) {
                    return --pending || done();
                  }
                  token.text = code;
                  token.escaped = true;
                  --pending || done();
                });
              })(tokens[i4]);
            }
            return;
          }
          try {
            if (opt)
              opt = merge({}, marked2.defaults, opt);
            checkSanitizeDeprecation(opt);
            return Parser.parse(Lexer.lex(src, opt), opt);
          } catch (e3) {
            e3.message += "\nPlease report this to https://github.com/markedjs/marked.";
            if ((opt || marked2.defaults).silent) {
              return "<p>An error occurred:</p><pre>" + escape2(e3.message + "", true) + "</pre>";
            }
            throw e3;
          }
        }
        marked2.options = marked2.setOptions = function(opt) {
          merge(marked2.defaults, opt);
          return marked2;
        };
        marked2.getDefaults = function() {
          return {
            baseUrl: null,
            breaks: false,
            gfm: true,
            headerIds: true,
            headerPrefix: "",
            highlight: null,
            langPrefix: "language-",
            mangle: true,
            pedantic: false,
            renderer: new Renderer(),
            sanitize: false,
            sanitizer: null,
            silent: false,
            smartLists: false,
            smartypants: false,
            xhtml: false
          };
        };
        marked2.defaults = marked2.getDefaults();
        marked2.Parser = Parser;
        marked2.parser = Parser.parse;
        marked2.Renderer = Renderer;
        marked2.TextRenderer = TextRenderer;
        marked2.Lexer = Lexer;
        marked2.lexer = Lexer.lex;
        marked2.InlineLexer = InlineLexer;
        marked2.inlineLexer = InlineLexer.output;
        marked2.Slugger = Slugger;
        marked2.parse = marked2;
        if (typeof module !== "undefined" && typeof exports === "object") {
          module.exports = marked2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return marked2;
          });
        } else {
          root.marked = marked2;
        }
      })(exports || (typeof window !== "undefined" ? window : global));
    }
  });

  // ../node_modules/flatten/index.js
  var require_flatten = __commonJS({
    "../node_modules/flatten/index.js"(exports, module) {
      module.exports = function flatten(list, depth) {
        depth = typeof depth == "number" ? depth : Infinity;
        if (!depth) {
          if (Array.isArray(list)) {
            return list.map(function(i4) {
              return i4;
            });
          }
          return list;
        }
        return _flatten(list, 1);
        function _flatten(list2, d2) {
          return list2.reduce(function(acc, item) {
            if (Array.isArray(item) && d2 < depth) {
              return acc.concat(_flatten(item, d2 + 1));
            } else {
              return acc.concat(item);
            }
          }, []);
        }
      };
    }
  });

  // ../node_modules/queue-microtask/index.js
  var require_queue_microtask = __commonJS({
    "../node_modules/queue-microtask/index.js"(exports, module) {
      var promise;
      module.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
        throw err;
      }, 0));
    }
  });

  // ../node_modules/run-parallel/index.js
  var require_run_parallel = __commonJS({
    "../node_modules/run-parallel/index.js"(exports, module) {
      module.exports = runParallel;
      var queueMicrotask2 = require_queue_microtask();
      function runParallel(tasks, cb) {
        let results, pending, keys;
        let isSync = true;
        if (Array.isArray(tasks)) {
          results = [];
          pending = tasks.length;
        } else {
          keys = Object.keys(tasks);
          results = {};
          pending = keys.length;
        }
        function done(err) {
          function end() {
            if (cb)
              cb(err, results);
            cb = null;
          }
          if (isSync)
            queueMicrotask2(end);
          else
            end();
        }
        function each(i4, err, result2) {
          results[i4] = result2;
          if (--pending === 0 || err) {
            done(err);
          }
        }
        if (!pending) {
          done(null);
        } else if (keys) {
          keys.forEach(function(key) {
            tasks[key](function(err, result2) {
              each(key, err, result2);
            });
          });
        } else {
          tasks.forEach(function(task, i4) {
            task(function(err, result2) {
              each(i4, err, result2);
            });
          });
        }
        isSync = false;
      }
    }
  });

  // ../node_modules/drag-drop/index.js
  var require_drag_drop = __commonJS({
    "../node_modules/drag-drop/index.js"(exports, module) {
      module.exports = dragDrop;
      var flatten = require_flatten();
      var parallel = require_run_parallel();
      function dragDrop(elem, listeners) {
        if (typeof elem === "string") {
          var selector = elem;
          elem = window.document.querySelector(elem);
          if (!elem) {
            throw new Error('"' + selector + '" does not match any HTML elements');
          }
        }
        if (!elem) {
          throw new Error('"' + elem + '" is not a valid HTML element');
        }
        if (typeof listeners === "function") {
          listeners = {
            onDrop: listeners
          };
        }
        var timeout;
        elem.addEventListener("dragenter", onDragEnter, false);
        elem.addEventListener("dragover", onDragOver, false);
        elem.addEventListener("dragleave", onDragLeave, false);
        elem.addEventListener("drop", onDrop, false);
        return function remove() {
          removeDragClass();
          elem.removeEventListener("dragenter", onDragEnter, false);
          elem.removeEventListener("dragover", onDragOver, false);
          elem.removeEventListener("dragleave", onDragLeave, false);
          elem.removeEventListener("drop", onDrop, false);
        };
        function onDragEnter(e3) {
          if (listeners.onDragEnter) {
            listeners.onDragEnter(e3);
          }
          e3.stopPropagation();
          e3.preventDefault();
          return false;
        }
        function onDragOver(e3) {
          e3.stopPropagation();
          e3.preventDefault();
          if (listeners.onDragOver) {
            listeners.onDragOver(e3);
          }
          if (e3.dataTransfer.items) {
            var items = Array.from(e3.dataTransfer.items);
            var fileItems = items.filter(function(item) {
              return item.kind === "file";
            });
            var textItems = items.filter(function(item) {
              return item.kind === "string";
            });
            if (fileItems.length === 0 && !listeners.onDropText)
              return;
            if (textItems.length === 0 && !listeners.onDrop)
              return;
            if (fileItems.length === 0 && textItems.length === 0)
              return;
          }
          elem.classList.add("drag");
          clearTimeout(timeout);
          e3.dataTransfer.dropEffect = "copy";
          return false;
        }
        function onDragLeave(e3) {
          e3.stopPropagation();
          e3.preventDefault();
          if (listeners.onDragLeave) {
            listeners.onDragLeave(e3);
          }
          clearTimeout(timeout);
          timeout = setTimeout(removeDragClass, 50);
          return false;
        }
        function onDrop(e3) {
          e3.stopPropagation();
          e3.preventDefault();
          if (listeners.onDragLeave) {
            listeners.onDragLeave(e3);
          }
          clearTimeout(timeout);
          removeDragClass();
          var pos = {
            x: e3.clientX,
            y: e3.clientY
          };
          var text = e3.dataTransfer.getData("text");
          if (text && listeners.onDropText) {
            listeners.onDropText(text, pos);
          }
          if (listeners.onDrop && e3.dataTransfer.items) {
            var fileList = e3.dataTransfer.files;
            var items = Array.from(e3.dataTransfer.items).filter(function(item) {
              return item.kind === "file";
            });
            if (items.length === 0)
              return;
            parallel(items.map(function(item) {
              return function(cb) {
                processEntry(item.webkitGetAsEntry(), cb);
              };
            }), function(err, results) {
              if (err)
                throw err;
              var entries = flatten(results);
              var files = entries.filter(function(item) {
                return item.isFile;
              });
              var directories = entries.filter(function(item) {
                return item.isDirectory;
              });
              listeners.onDrop(files, pos, fileList, directories);
            });
          }
          return false;
        }
        function removeDragClass() {
          elem.classList.remove("drag");
        }
      }
      function processEntry(entry, cb) {
        var entries = [];
        if (entry.isFile) {
          entry.file(function(file) {
            file.fullPath = entry.fullPath;
            file.isFile = true;
            file.isDirectory = false;
            cb(null, file);
          }, function(err) {
            cb(err);
          });
        } else if (entry.isDirectory) {
          var reader = entry.createReader();
          readEntries();
        }
        function readEntries() {
          reader.readEntries(function(entries_) {
            if (entries_.length > 0) {
              entries = entries.concat(Array.from(entries_));
              readEntries();
            } else {
              doneEntries();
            }
          });
        }
        function doneEntries() {
          parallel(entries.map(function(entry2) {
            return function(cb2) {
              processEntry(entry2, cb2);
            };
          }), function(err, results) {
            if (err) {
              cb(err);
            } else {
              results.push({
                fullPath: entry.fullPath,
                name: entry.name,
                isFile: false,
                isDirectory: true
              });
              cb(null, results);
            }
          });
        }
      }
    }
  });

  // ../packages/@uppy/utils/lib/hasProperty.js
  var hasProperty_exports = {};
  __export(hasProperty_exports, {
    default: () => has
  });
  function has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }
  var init_hasProperty = __esm({
    "../packages/@uppy/utils/lib/hasProperty.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/Translator.js
  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }
  function insertReplacement(source, rx, replacement) {
    const newParts = [];
    source.forEach((chunk) => {
      if (typeof chunk !== "string") {
        return newParts.push(chunk);
      }
      return rx[Symbol.split](chunk).forEach((raw, i4, list) => {
        if (raw !== "") {
          newParts.push(raw);
        }
        if (i4 < list.length - 1) {
          newParts.push(replacement);
        }
      });
    });
    return newParts;
  }
  function interpolate(phrase, options) {
    const dollarRegex = /\$/g;
    const dollarBillsYall = "$$$$";
    let interpolated = [phrase];
    if (options == null)
      return interpolated;
    for (const arg of Object.keys(options)) {
      if (arg !== "_") {
        let replacement = options[arg];
        if (typeof replacement === "string") {
          replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
        }
        interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, "g"), replacement);
      }
    }
    return interpolated;
  }
  function _apply2(locale) {
    if (!(locale != null && locale.strings)) {
      return;
    }
    const prevLocale = this.locale;
    this.locale = {
      ...prevLocale,
      strings: {
        ...prevLocale.strings,
        ...locale.strings
      }
    };
    this.locale.pluralize = locale.pluralize || prevLocale.pluralize;
  }
  var id, _apply, Translator;
  var init_Translator = __esm({
    "../packages/@uppy/utils/lib/Translator.js"() {
      init_hasProperty();
      id = 0;
      _apply = /* @__PURE__ */ _classPrivateFieldLooseKey("apply");
      Translator = class {
        constructor(locales) {
          Object.defineProperty(this, _apply, {
            value: _apply2
          });
          this.locale = {
            strings: {},
            pluralize(n2) {
              if (n2 === 1) {
                return 0;
              }
              return 1;
            }
          };
          if (Array.isArray(locales)) {
            locales.forEach(_classPrivateFieldLooseBase(this, _apply)[_apply], this);
          } else {
            _classPrivateFieldLooseBase(this, _apply)[_apply](locales);
          }
        }
        translate(key, options) {
          return this.translateArray(key, options).join("");
        }
        translateArray(key, options) {
          if (!has(this.locale.strings, key)) {
            throw new Error(`missing string: ${key}`);
          }
          const string = this.locale.strings[key];
          const hasPluralForms = typeof string === "object";
          if (hasPluralForms) {
            if (options && typeof options.smart_count !== "undefined") {
              const plural = this.locale.pluralize(options.smart_count);
              return interpolate(string[plural], options);
            }
            throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
          }
          return interpolate(string, options);
        }
      };
    }
  });

  // ../node_modules/namespace-emitter/index.js
  var require_namespace_emitter = __commonJS({
    "../node_modules/namespace-emitter/index.js"(exports, module) {
      module.exports = function createNamespaceEmitter() {
        var emitter = {};
        var _fns = emitter._fns = {};
        emitter.emit = function emit(event, arg1, arg2, arg3, arg4, arg5, arg6) {
          var toEmit = getListeners(event);
          if (toEmit.length) {
            emitAll(event, toEmit, [arg1, arg2, arg3, arg4, arg5, arg6]);
          }
        };
        emitter.on = function on2(event, fn) {
          if (!_fns[event]) {
            _fns[event] = [];
          }
          _fns[event].push(fn);
        };
        emitter.once = function once(event, fn) {
          function one() {
            fn.apply(this, arguments);
            emitter.off(event, one);
          }
          this.on(event, one);
        };
        emitter.off = function off(event, fn) {
          var keep = [];
          if (event && fn) {
            var fns = this._fns[event];
            var i4 = 0;
            var l3 = fns ? fns.length : 0;
            for (i4; i4 < l3; i4++) {
              if (fns[i4] !== fn) {
                keep.push(fns[i4]);
              }
            }
          }
          keep.length ? this._fns[event] = keep : delete this._fns[event];
        };
        function getListeners(e3) {
          var out = _fns[e3] ? _fns[e3] : [];
          var idx = e3.indexOf(":");
          var args = idx === -1 ? [e3] : [e3.substring(0, idx), e3.substring(idx + 1)];
          var keys = Object.keys(_fns);
          var i4 = 0;
          var l3 = keys.length;
          for (i4; i4 < l3; i4++) {
            var key = keys[i4];
            if (key === "*") {
              out = out.concat(_fns[key]);
            }
            if (args.length === 2 && args[0] === key) {
              out = out.concat(_fns[key]);
              break;
            }
          }
          return out;
        }
        function emitAll(e3, fns, args) {
          var i4 = 0;
          var l3 = fns.length;
          for (i4; i4 < l3; i4++) {
            if (!fns[i4])
              break;
            fns[i4].event = e3;
            fns[i4].apply(fns[i4], args);
          }
        }
        return emitter;
      };
    }
  });

  // ../node_modules/nanoid/non-secure/index.js
  var urlAlphabet, nanoid;
  var init_non_secure = __esm({
    "../node_modules/nanoid/non-secure/index.js"() {
      urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
      nanoid = function(size) {
        if (size === void 0) {
          size = 21;
        }
        let id21 = "";
        let i4 = size;
        while (i4--) {
          id21 += urlAlphabet[Math.random() * 64 | 0];
        }
        return id21;
      };
    }
  });

  // ../node_modules/lodash.throttle/index.js
  var require_lodash = __commonJS({
    "../node_modules/lodash.throttle/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce3(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result3 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result3, maxWait - timeSinceLastInvoke) : result3;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result2;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function throttle4(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce3(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function isObject(value2) {
        var type = typeof value2;
        return !!value2 && (type == "object" || type == "function");
      }
      function isObjectLike(value2) {
        return !!value2 && typeof value2 == "object";
      }
      function isSymbol(value2) {
        return typeof value2 == "symbol" || isObjectLike(value2) && objectToString.call(value2) == symbolTag;
      }
      function toNumber(value2) {
        if (typeof value2 == "number") {
          return value2;
        }
        if (isSymbol(value2)) {
          return NAN;
        }
        if (isObject(value2)) {
          var other = typeof value2.valueOf == "function" ? value2.valueOf() : value2;
          value2 = isObject(other) ? other + "" : other;
        }
        if (typeof value2 != "string") {
          return value2 === 0 ? value2 : +value2;
        }
        value2 = value2.replace(reTrim, "");
        var isBinary2 = reIsBinary.test(value2);
        return isBinary2 || reIsOctal.test(value2) ? freeParseInt(value2.slice(2), isBinary2 ? 2 : 8) : reIsBadHex.test(value2) ? NAN : +value2;
      }
      module.exports = throttle4;
    }
  });

  // ../packages/@uppy/store-default/lib/index.js
  function _classPrivateFieldLooseBase2(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey2(name) {
    return "__private_" + id2++ + "_" + name;
  }
  function _publish2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].forEach((listener) => {
      listener(...args);
    });
  }
  var id2, packageJson, _callbacks, _publish, DefaultStore, lib_default;
  var init_lib = __esm({
    "../packages/@uppy/store-default/lib/index.js"() {
      id2 = 0;
      packageJson = {
        "version": "3.0.0-beta.3"
      };
      _callbacks = /* @__PURE__ */ _classPrivateFieldLooseKey2("callbacks");
      _publish = /* @__PURE__ */ _classPrivateFieldLooseKey2("publish");
      DefaultStore = class {
        constructor() {
          Object.defineProperty(this, _publish, {
            value: _publish2
          });
          Object.defineProperty(this, _callbacks, {
            writable: true,
            value: /* @__PURE__ */ new Set()
          });
          this.state = {};
        }
        getState() {
          return this.state;
        }
        setState(patch) {
          const prevState = {
            ...this.state
          };
          const nextState = {
            ...this.state,
            ...patch
          };
          this.state = nextState;
          _classPrivateFieldLooseBase2(this, _publish)[_publish](prevState, nextState, patch);
        }
        subscribe(listener) {
          _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].add(listener);
          return () => {
            _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].delete(listener);
          };
        }
      };
      DefaultStore.VERSION = packageJson.version;
      lib_default = DefaultStore;
    }
  });

  // ../packages/@uppy/utils/lib/getFileNameAndExtension.js
  function getFileNameAndExtension(fullFileName) {
    const lastDot = fullFileName.lastIndexOf(".");
    if (lastDot === -1 || lastDot === fullFileName.length - 1) {
      return {
        name: fullFileName,
        extension: void 0
      };
    }
    return {
      name: fullFileName.slice(0, lastDot),
      extension: fullFileName.slice(lastDot + 1)
    };
  }
  var init_getFileNameAndExtension = __esm({
    "../packages/@uppy/utils/lib/getFileNameAndExtension.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/mimeTypes.js
  var mimeTypes_default;
  var init_mimeTypes = __esm({
    "../packages/@uppy/utils/lib/mimeTypes.js"() {
      mimeTypes_default = {
        md: "text/markdown",
        markdown: "text/markdown",
        mp4: "video/mp4",
        mp3: "audio/mp3",
        svg: "image/svg+xml",
        jpg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        gif: "image/gif",
        heic: "image/heic",
        heif: "image/heif",
        yaml: "text/yaml",
        yml: "text/yaml",
        csv: "text/csv",
        tsv: "text/tab-separated-values",
        tab: "text/tab-separated-values",
        avi: "video/x-msvideo",
        mks: "video/x-matroska",
        mkv: "video/x-matroska",
        mov: "video/quicktime",
        dicom: "application/dicom",
        doc: "application/msword",
        docm: "application/vnd.ms-word.document.macroenabled.12",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        dot: "application/msword",
        dotm: "application/vnd.ms-word.template.macroenabled.12",
        dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        xla: "application/vnd.ms-excel",
        xlam: "application/vnd.ms-excel.addin.macroenabled.12",
        xlc: "application/vnd.ms-excel",
        xlf: "application/x-xliff+xml",
        xlm: "application/vnd.ms-excel",
        xls: "application/vnd.ms-excel",
        xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
        xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        xlt: "application/vnd.ms-excel",
        xltm: "application/vnd.ms-excel.template.macroenabled.12",
        xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        xlw: "application/vnd.ms-excel",
        txt: "text/plain",
        text: "text/plain",
        conf: "text/plain",
        log: "text/plain",
        pdf: "application/pdf",
        zip: "application/zip",
        "7z": "application/x-7z-compressed",
        rar: "application/x-rar-compressed",
        tar: "application/x-tar",
        gz: "application/gzip",
        dmg: "application/x-apple-diskimage"
      };
    }
  });

  // ../packages/@uppy/utils/lib/getFileType.js
  function getFileType(file) {
    var _getFileNameAndExtens;
    if (file.type)
      return file.type;
    const fileExtension = file.name ? (_getFileNameAndExtens = getFileNameAndExtension(file.name).extension) == null ? void 0 : _getFileNameAndExtens.toLowerCase() : null;
    if (fileExtension && fileExtension in mimeTypes_default) {
      return mimeTypes_default[fileExtension];
    }
    return "application/octet-stream";
  }
  var init_getFileType = __esm({
    "../packages/@uppy/utils/lib/getFileType.js"() {
      init_getFileNameAndExtension();
      init_mimeTypes();
    }
  });

  // ../packages/@uppy/utils/lib/generateFileID.js
  function encodeCharacter(character) {
    return character.charCodeAt(0).toString(32);
  }
  function encodeFilename(name) {
    let suffix = "";
    return name.replace(/[^A-Z0-9]/ig, (character) => {
      suffix += `-${encodeCharacter(character)}`;
      return "/";
    }) + suffix;
  }
  function generateFileID(file) {
    let id21 = "uppy";
    if (typeof file.name === "string") {
      id21 += `-${encodeFilename(file.name.toLowerCase())}`;
    }
    if (file.type !== void 0) {
      id21 += `-${file.type}`;
    }
    if (file.meta && typeof file.meta.relativePath === "string") {
      id21 += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
    }
    if (file.data.size !== void 0) {
      id21 += `-${file.data.size}`;
    }
    if (file.data.lastModified !== void 0) {
      id21 += `-${file.data.lastModified}`;
    }
    return id21;
  }
  var init_generateFileID = __esm({
    "../packages/@uppy/utils/lib/generateFileID.js"() {
    }
  });

  // ../packages/@uppy/core/lib/supportsUploadProgress.js
  function supportsUploadProgress(userAgent) {
    if (userAgent == null && typeof navigator !== "undefined") {
      userAgent = navigator.userAgent;
    }
    if (!userAgent)
      return true;
    const m3 = /Edge\/(\d+\.\d+)/.exec(userAgent);
    if (!m3)
      return true;
    const edgeVersion = m3[1];
    let [major, minor] = edgeVersion.split(".");
    major = parseInt(major, 10);
    minor = parseInt(minor, 10);
    if (major < 15 || major === 15 && minor < 15063) {
      return true;
    }
    if (major > 18 || major === 18 && minor >= 18218) {
      return true;
    }
    return false;
  }
  var init_supportsUploadProgress = __esm({
    "../packages/@uppy/core/lib/supportsUploadProgress.js"() {
    }
  });

  // ../packages/@uppy/core/lib/getFileName.js
  function getFileName(fileType, fileDescriptor) {
    if (fileDescriptor.name) {
      return fileDescriptor.name;
    }
    if (fileType.split("/")[0] === "image") {
      return `${fileType.split("/")[0]}.${fileType.split("/")[1]}`;
    }
    return "noname";
  }
  var init_getFileName = __esm({
    "../packages/@uppy/core/lib/getFileName.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/getTimeStamp.js
  function pad(number) {
    return number < 10 ? `0${number}` : number.toString();
  }
  function getTimeStamp() {
    const date = new Date();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
  var init_getTimeStamp = __esm({
    "../packages/@uppy/utils/lib/getTimeStamp.js"() {
    }
  });

  // ../packages/@uppy/core/lib/loggers.js
  var justErrorsLogger, debugLogger;
  var init_loggers = __esm({
    "../packages/@uppy/core/lib/loggers.js"() {
      init_getTimeStamp();
      justErrorsLogger = {
        debug: () => {
        },
        warn: () => {
        },
        error: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
        }
      };
      debugLogger = {
        debug: function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        warn: function() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          return console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        error: function() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
        }
      };
    }
  });

  // ../node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes = __commonJS({
    "../node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes4(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError(`Expected a number, got ${typeof num}`);
        }
        const neg = num < 0;
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return `${(neg ? "-" : "") + num} B`;
        }
        const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        const unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
        }
        return `${(neg ? "-" : "") + num.toFixed(1)} ${unit}`;
      };
    }
  });

  // ../node_modules/wildcard/index.js
  var require_wildcard = __commonJS({
    "../node_modules/wildcard/index.js"(exports, module) {
      "use strict";
      function WildcardMatcher(text, separator2) {
        this.text = text = text || "";
        this.hasWild = ~text.indexOf("*");
        this.separator = separator2;
        this.parts = text.split(separator2);
      }
      WildcardMatcher.prototype.match = function(input) {
        var matches = true;
        var parts2 = this.parts;
        var ii;
        var partsCount = parts2.length;
        var testParts;
        if (typeof input == "string" || input instanceof String) {
          if (!this.hasWild && this.text != input) {
            matches = false;
          } else {
            testParts = (input || "").split(this.separator);
            for (ii = 0; matches && ii < partsCount; ii++) {
              if (parts2[ii] === "*") {
                continue;
              } else if (ii < testParts.length) {
                matches = parts2[ii] === testParts[ii];
              } else {
                matches = false;
              }
            }
            matches = matches && testParts;
          }
        } else if (typeof input.splice == "function") {
          matches = [];
          for (ii = input.length; ii--; ) {
            if (this.match(input[ii])) {
              matches[matches.length] = input[ii];
            }
          }
        } else if (typeof input == "object") {
          matches = {};
          for (var key in input) {
            if (this.match(key)) {
              matches[key] = input[key];
            }
          }
        }
        return matches;
      };
      module.exports = function(text, test, separator2) {
        var matcher = new WildcardMatcher(text, separator2 || /[\/\.]/);
        if (typeof test != "undefined") {
          return matcher.match(test);
        }
        return matcher;
      };
    }
  });

  // ../node_modules/mime-match/index.js
  var require_mime_match = __commonJS({
    "../node_modules/mime-match/index.js"(exports, module) {
      var wildcard = require_wildcard();
      var reMimePartSplit = /[\/\+\.]/;
      module.exports = function(target, pattern) {
        function test(pattern2) {
          var result2 = wildcard(pattern2, target, reMimePartSplit);
          return result2 && result2.length >= 2;
        }
        return pattern ? test(pattern.split(";")[0]) : test;
      };
    }
  });

  // ../packages/@uppy/core/lib/Restricter.js
  var import_prettier_bytes, import_mime_match, defaultOptions, RestrictionError, Restricter;
  var init_Restricter = __esm({
    "../packages/@uppy/core/lib/Restricter.js"() {
      import_prettier_bytes = __toESM(require_prettierBytes(), 1);
      import_mime_match = __toESM(require_mime_match(), 1);
      defaultOptions = {
        maxFileSize: null,
        minFileSize: null,
        maxTotalFileSize: null,
        maxNumberOfFiles: null,
        minNumberOfFiles: null,
        allowedFileTypes: null,
        requiredMetaFields: []
      };
      RestrictionError = class extends Error {
        constructor() {
          super(...arguments);
          this.isRestriction = true;
        }
      };
      Restricter = class {
        constructor(getOpts, i18n) {
          this.i18n = i18n;
          this.getOpts = () => {
            const opts = getOpts();
            if (opts.restrictions.allowedFileTypes != null && !Array.isArray(opts.restrictions.allowedFileTypes)) {
              throw new TypeError("`restrictions.allowedFileTypes` must be an array");
            }
            return opts;
          };
        }
        validate(file, files) {
          const {
            maxFileSize,
            minFileSize,
            maxTotalFileSize,
            maxNumberOfFiles,
            allowedFileTypes
          } = this.getOpts().restrictions;
          if (maxNumberOfFiles && files.length + 1 > maxNumberOfFiles) {
            throw new RestrictionError(`${this.i18n("youCanOnlyUploadX", {
              smart_count: maxNumberOfFiles
            })}`);
          }
          if (allowedFileTypes) {
            const isCorrectFileType = allowedFileTypes.some((type) => {
              if (type.includes("/")) {
                if (!file.type)
                  return false;
                return (0, import_mime_match.default)(file.type.replace(/;.*?$/, ""), type);
              }
              if (type[0] === "." && file.extension) {
                return file.extension.toLowerCase() === type.slice(1).toLowerCase();
              }
              return false;
            });
            if (!isCorrectFileType) {
              const allowedFileTypesString = allowedFileTypes.join(", ");
              throw new RestrictionError(this.i18n("youCanOnlyUploadFileTypes", {
                types: allowedFileTypesString
              }));
            }
          }
          if (maxTotalFileSize && file.size != null) {
            const totalFilesSize = files.reduce((total, f3) => total + f3.size, file.size);
            if (totalFilesSize > maxTotalFileSize) {
              throw new RestrictionError(this.i18n("exceedsSize", {
                size: (0, import_prettier_bytes.default)(maxTotalFileSize),
                file: file.name
              }));
            }
          }
          if (maxFileSize && file.size != null && file.size > maxFileSize) {
            throw new RestrictionError(this.i18n("exceedsSize", {
              size: (0, import_prettier_bytes.default)(maxFileSize),
              file: file.name
            }));
          }
          if (minFileSize && file.size != null && file.size < minFileSize) {
            throw new RestrictionError(this.i18n("inferiorSize", {
              size: (0, import_prettier_bytes.default)(minFileSize)
            }));
          }
        }
        validateMinNumberOfFiles(files) {
          const {
            minNumberOfFiles
          } = this.getOpts().restrictions;
          if (Object.keys(files).length < minNumberOfFiles) {
            throw new RestrictionError(this.i18n("youHaveToAtLeastSelectX", {
              smart_count: minNumberOfFiles
            }));
          }
        }
        getMissingRequiredMetaFields(file) {
          const error = new RestrictionError(this.i18n("missingRequiredMetaFieldOnFile", {
            fileName: file.name
          }));
          const {
            requiredMetaFields
          } = this.getOpts().restrictions;
          const missingFields = [];
          for (const field of requiredMetaFields) {
            if (!Object.hasOwn(file.meta, field) || file.meta[field] === "") {
              missingFields.push(field);
            }
          }
          return {
            missingFields,
            error
          };
        }
      };
    }
  });

  // ../packages/@uppy/core/lib/locale.js
  var locale_default;
  var init_locale = __esm({
    "../packages/@uppy/core/lib/locale.js"() {
      locale_default = {
        strings: {
          addBulkFilesFailed: {
            0: "Failed to add %{smart_count} file due to an internal error",
            1: "Failed to add %{smart_count} files due to internal errors"
          },
          youCanOnlyUploadX: {
            0: "You can only upload %{smart_count} file",
            1: "You can only upload %{smart_count} files"
          },
          youHaveToAtLeastSelectX: {
            0: "You have to select at least %{smart_count} file",
            1: "You have to select at least %{smart_count} files"
          },
          exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
          missingRequiredMetaField: "Missing required meta fields",
          missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
          inferiorSize: "This file is smaller than the allowed size of %{size}",
          youCanOnlyUploadFileTypes: "You can only upload: %{types}",
          noMoreFilesAllowed: "Cannot add more files",
          noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
          companionError: "Connection with Companion failed",
          authAborted: "Authentication aborted",
          companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
          failedToUpload: "Failed to upload %{file}",
          noInternetConnection: "No Internet connection",
          connectedToInternet: "Connected to the Internet",
          noFilesFound: "You have no files or folders here",
          selectX: {
            0: "Select %{smart_count}",
            1: "Select %{smart_count}"
          },
          allFilesFromFolderNamed: "All files from folder %{name}",
          openFolderNamed: "Open folder %{name}",
          cancel: "Cancel",
          logOut: "Log out",
          filter: "Filter",
          resetFilter: "Reset filter",
          loading: "Loading...",
          authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
          authenticateWith: "Connect to %{pluginName}",
          signInWithGoogle: "Sign in with Google",
          searchImages: "Search for images",
          enterTextToSearch: "Enter text to search for images",
          search: "Search",
          emptyFolderAdded: "No files were added from empty folder",
          folderAlreadyAdded: 'The folder "%{folder}" was already added',
          folderAdded: {
            0: "Added %{smart_count} file from %{folder}",
            1: "Added %{smart_count} files from %{folder}"
          }
        }
      };
    }
  });

  // ../packages/@uppy/core/lib/Uppy.js
  function _classPrivateFieldLooseBase3(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey3(name) {
    return "__private_" + id3++ + "_" + name;
  }
  function _informAndEmit2(error, file) {
    const {
      message,
      details = ""
    } = error;
    if (error.isRestriction) {
      this.emit("restriction-failed", file, error);
    } else {
      this.emit("error", error);
    }
    this.info({
      message,
      details
    }, "error", this.opts.infoTimeout);
    this.log(`${message} ${details}`.trim(), "error");
  }
  function _checkRequiredMetaFieldsOnFile2(file) {
    const {
      missingFields,
      error
    } = _classPrivateFieldLooseBase3(this, _restricter)[_restricter].getMissingRequiredMetaFields(file);
    if (missingFields.length > 0) {
      this.setFileState(file.id, {
        missingRequiredMetaFields: missingFields
      });
      this.log(error.message);
      this.emit("restriction-failed", file, error);
      return false;
    }
    return true;
  }
  function _checkRequiredMetaFields2(files) {
    let success = true;
    for (const file of Object.values(files)) {
      if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file)) {
        success = false;
      }
    }
    return success;
  }
  function _assertNewUploadAllowed2(file) {
    const {
      allowNewUpload
    } = this.getState();
    if (allowNewUpload === false) {
      const error = new RestrictionError(this.i18n("noMoreFilesAllowed"));
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, file);
      throw error;
    }
  }
  function _checkAndCreateFileStateObject2(files, fileDescriptor) {
    const fileType = getFileType(fileDescriptor);
    const fileName = getFileName(fileType, fileDescriptor);
    const fileExtension = getFileNameAndExtension(fileName).extension;
    const isRemote = Boolean(fileDescriptor.isRemote);
    const fileID = generateFileID({
      ...fileDescriptor,
      type: fileType
    });
    if (this.checkIfFileAlreadyExists(fileID)) {
      const error = new RestrictionError(this.i18n("noDuplicates", {
        fileName
      }));
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, fileDescriptor);
      throw error;
    }
    const meta = fileDescriptor.meta || {};
    meta.name = fileName;
    meta.type = fileType;
    const size = Number.isFinite(fileDescriptor.data.size) ? fileDescriptor.data.size : null;
    let newFile = {
      source: fileDescriptor.source || "",
      id: fileID,
      name: fileName,
      extension: fileExtension || "",
      meta: {
        ...this.getState().meta,
        ...meta
      },
      type: fileType,
      data: fileDescriptor.data,
      progress: {
        percentage: 0,
        bytesUploaded: 0,
        bytesTotal: size,
        uploadComplete: false,
        uploadStarted: null
      },
      size,
      isRemote,
      remote: fileDescriptor.remote || "",
      preview: fileDescriptor.preview
    };
    const onBeforeFileAddedResult = this.opts.onBeforeFileAdded(newFile, files);
    if (onBeforeFileAddedResult === false) {
      const error = new RestrictionError("Cannot add the file because onBeforeFileAdded returned false.");
      this.emit("restriction-failed", fileDescriptor, error);
      throw error;
    } else if (typeof onBeforeFileAddedResult === "object" && onBeforeFileAddedResult !== null) {
      newFile = onBeforeFileAddedResult;
    }
    try {
      const filesArray = Object.keys(files).map((i4) => files[i4]);
      _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(newFile, filesArray);
    } catch (err) {
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err, newFile);
      throw err;
    }
    return newFile;
  }
  function _startIfAutoProceed2() {
    if (this.opts.autoProceed && !this.scheduledAutoProceed) {
      this.scheduledAutoProceed = setTimeout(() => {
        this.scheduledAutoProceed = null;
        this.upload().catch((err) => {
          if (!err.isRestriction) {
            this.log(err.stack || err.message || err);
          }
        });
      }, 4);
    }
  }
  function _addListeners2() {
    const errorHandler = (error, file, response) => {
      let errorMsg = error.message || "Unknown error";
      if (error.details) {
        errorMsg += ` ${error.details}`;
      }
      this.setState({
        error: errorMsg
      });
      if (file != null && file.id in this.getState().files) {
        this.setFileState(file.id, {
          error: errorMsg,
          response
        });
      }
    };
    this.on("error", errorHandler);
    this.on("upload-error", (file, error, response) => {
      errorHandler(error, file, response);
      if (typeof error === "object" && error.message) {
        const newError = new Error(error.message);
        newError.details = error.message;
        if (error.details) {
          newError.details += ` ${error.details}`;
        }
        newError.message = this.i18n("failedToUpload", {
          file: file == null ? void 0 : file.name
        });
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](newError);
      } else {
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error);
      }
    });
    this.on("upload", () => {
      this.setState({
        error: null
      });
    });
    this.on("upload-started", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          uploadStarted: Date.now(),
          uploadComplete: false,
          percentage: 0,
          bytesUploaded: 0,
          bytesTotal: file.size
        }
      });
    });
    this.on("upload-progress", this.calculateProgress);
    this.on("upload-success", (file, uploadResp) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const currentProgress = this.getFile(file.id).progress;
      this.setFileState(file.id, {
        progress: {
          ...currentProgress,
          postprocess: _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].size > 0 ? {
            mode: "indeterminate"
          } : null,
          uploadComplete: true,
          percentage: 100,
          bytesUploaded: currentProgress.bytesTotal
        },
        response: uploadResp,
        uploadURL: uploadResp.uploadURL,
        isPaused: false
      });
      if (file.size == null) {
        this.setFileState(file.id, {
          size: uploadResp.bytesUploaded || currentProgress.bytesTotal
        });
      }
      this.calculateTotalProgress();
    });
    this.on("preprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          ...this.getFile(file.id).progress,
          preprocess: progress
        }
      });
    });
    this.on("preprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const files = {
        ...this.getState().files
      };
      files[file.id] = {
        ...files[file.id],
        progress: {
          ...files[file.id].progress
        }
      };
      delete files[file.id].progress.preprocess;
      this.setState({
        files
      });
    });
    this.on("postprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          ...this.getState().files[file.id].progress,
          postprocess: progress
        }
      });
    });
    this.on("postprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const files = {
        ...this.getState().files
      };
      files[file.id] = {
        ...files[file.id],
        progress: {
          ...files[file.id].progress
        }
      };
      delete files[file.id].progress.postprocess;
      this.setState({
        files
      });
    });
    this.on("restored", () => {
      this.calculateTotalProgress();
    });
    this.on("dashboard:file-edit-complete", (file) => {
      if (file) {
        _classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file);
      }
    });
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      window.addEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      setTimeout(_classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus], 3e3);
    }
  }
  function _createUpload2(fileIDs, opts) {
    if (opts === void 0) {
      opts = {};
    }
    const {
      forceAllowNewUpload = false
    } = opts;
    const {
      allowNewUpload,
      currentUploads
    } = this.getState();
    if (!allowNewUpload && !forceAllowNewUpload) {
      throw new Error("Cannot create a new upload: already uploading.");
    }
    const uploadID = nanoid();
    this.emit("upload", {
      id: uploadID,
      fileIDs
    });
    this.setState({
      allowNewUpload: this.opts.allowMultipleUploadBatches !== false && this.opts.allowMultipleUploads !== false,
      currentUploads: {
        ...currentUploads,
        [uploadID]: {
          fileIDs,
          step: 0,
          result: {}
        }
      }
    });
    return uploadID;
  }
  function _getUpload2(uploadID) {
    const {
      currentUploads
    } = this.getState();
    return currentUploads[uploadID];
  }
  function _removeUpload2(uploadID) {
    const currentUploads = {
      ...this.getState().currentUploads
    };
    delete currentUploads[uploadID];
    this.setState({
      currentUploads
    });
  }
  async function _runUpload2(uploadID) {
    let {
      currentUploads
    } = this.getState();
    let currentUpload = currentUploads[uploadID];
    const restoreStep = currentUpload.step || 0;
    const steps = [..._classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors], ..._classPrivateFieldLooseBase3(this, _uploaders)[_uploaders], ..._classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors]];
    try {
      for (let step = restoreStep; step < steps.length; step++) {
        if (!currentUpload) {
          break;
        }
        const fn = steps[step];
        const updatedUpload = {
          ...currentUpload,
          step
        };
        this.setState({
          currentUploads: {
            ...currentUploads,
            [uploadID]: updatedUpload
          }
        });
        await fn(updatedUpload.fileIDs, uploadID);
        currentUploads = this.getState().currentUploads;
        currentUpload = currentUploads[uploadID];
      }
    } catch (err) {
      _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
      throw err;
    }
    if (currentUpload) {
      currentUpload.fileIDs.forEach((fileID) => {
        const file = this.getFile(fileID);
        if (file && file.progress.postprocess) {
          this.emit("postprocess-complete", file);
        }
      });
      const files = currentUpload.fileIDs.map((fileID) => this.getFile(fileID));
      const successful = files.filter((file) => !file.error);
      const failed = files.filter((file) => file.error);
      await this.addResultData(uploadID, {
        successful,
        failed,
        uploadID
      });
      currentUploads = this.getState().currentUploads;
      currentUpload = currentUploads[uploadID];
    }
    let result2;
    if (currentUpload) {
      result2 = currentUpload.result;
      this.emit("complete", result2);
      _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
    }
    if (result2 == null) {
      this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
    }
    return result2;
  }
  var import_namespace_emitter, import_lodash, _Symbol$for, _Symbol$for2, id3, packageJson2, _plugins, _restricter, _storeUnsubscribe, _emitter, _preProcessors, _uploaders, _postProcessors, _informAndEmit, _checkRequiredMetaFieldsOnFile, _checkRequiredMetaFields, _assertNewUploadAllowed, _checkAndCreateFileStateObject, _startIfAutoProceed, _addListeners, _updateOnlineStatus, _createUpload, _getUpload, _removeUpload, _runUpload, Uppy, Uppy_default;
  var init_Uppy = __esm({
    "../packages/@uppy/core/lib/Uppy.js"() {
      init_Translator();
      import_namespace_emitter = __toESM(require_namespace_emitter(), 1);
      init_non_secure();
      import_lodash = __toESM(require_lodash(), 1);
      init_lib();
      init_getFileType();
      init_getFileNameAndExtension();
      init_generateFileID();
      init_supportsUploadProgress();
      init_getFileName();
      init_loggers();
      init_Restricter();
      init_locale();
      id3 = 0;
      packageJson2 = {
        "version": "3.0.0-beta.4"
      };
      _plugins = /* @__PURE__ */ _classPrivateFieldLooseKey3("plugins");
      _restricter = /* @__PURE__ */ _classPrivateFieldLooseKey3("restricter");
      _storeUnsubscribe = /* @__PURE__ */ _classPrivateFieldLooseKey3("storeUnsubscribe");
      _emitter = /* @__PURE__ */ _classPrivateFieldLooseKey3("emitter");
      _preProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("preProcessors");
      _uploaders = /* @__PURE__ */ _classPrivateFieldLooseKey3("uploaders");
      _postProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("postProcessors");
      _informAndEmit = /* @__PURE__ */ _classPrivateFieldLooseKey3("informAndEmit");
      _checkRequiredMetaFieldsOnFile = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFieldsOnFile");
      _checkRequiredMetaFields = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFields");
      _assertNewUploadAllowed = /* @__PURE__ */ _classPrivateFieldLooseKey3("assertNewUploadAllowed");
      _checkAndCreateFileStateObject = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkAndCreateFileStateObject");
      _startIfAutoProceed = /* @__PURE__ */ _classPrivateFieldLooseKey3("startIfAutoProceed");
      _addListeners = /* @__PURE__ */ _classPrivateFieldLooseKey3("addListeners");
      _updateOnlineStatus = /* @__PURE__ */ _classPrivateFieldLooseKey3("updateOnlineStatus");
      _createUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("createUpload");
      _getUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("getUpload");
      _removeUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("removeUpload");
      _runUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("runUpload");
      _Symbol$for = Symbol.for("uppy test: getPlugins");
      _Symbol$for2 = Symbol.for("uppy test: createUpload");
      Uppy = class {
        constructor(_opts) {
          Object.defineProperty(this, _runUpload, {
            value: _runUpload2
          });
          Object.defineProperty(this, _removeUpload, {
            value: _removeUpload2
          });
          Object.defineProperty(this, _getUpload, {
            value: _getUpload2
          });
          Object.defineProperty(this, _createUpload, {
            value: _createUpload2
          });
          Object.defineProperty(this, _addListeners, {
            value: _addListeners2
          });
          Object.defineProperty(this, _startIfAutoProceed, {
            value: _startIfAutoProceed2
          });
          Object.defineProperty(this, _checkAndCreateFileStateObject, {
            value: _checkAndCreateFileStateObject2
          });
          Object.defineProperty(this, _assertNewUploadAllowed, {
            value: _assertNewUploadAllowed2
          });
          Object.defineProperty(this, _checkRequiredMetaFields, {
            value: _checkRequiredMetaFields2
          });
          Object.defineProperty(this, _checkRequiredMetaFieldsOnFile, {
            value: _checkRequiredMetaFieldsOnFile2
          });
          Object.defineProperty(this, _informAndEmit, {
            value: _informAndEmit2
          });
          Object.defineProperty(this, _plugins, {
            writable: true,
            value: /* @__PURE__ */ Object.create(null)
          });
          Object.defineProperty(this, _restricter, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _storeUnsubscribe, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _emitter, {
            writable: true,
            value: (0, import_namespace_emitter.default)()
          });
          Object.defineProperty(this, _preProcessors, {
            writable: true,
            value: /* @__PURE__ */ new Set()
          });
          Object.defineProperty(this, _uploaders, {
            writable: true,
            value: /* @__PURE__ */ new Set()
          });
          Object.defineProperty(this, _postProcessors, {
            writable: true,
            value: /* @__PURE__ */ new Set()
          });
          Object.defineProperty(this, _updateOnlineStatus, {
            writable: true,
            value: this.updateOnlineStatus.bind(this)
          });
          this.defaultLocale = locale_default;
          const defaultOptions4 = {
            id: "uppy",
            autoProceed: false,
            allowMultipleUploadBatches: true,
            debug: false,
            restrictions: defaultOptions,
            meta: {},
            onBeforeFileAdded: (currentFile) => currentFile,
            onBeforeUpload: (files) => files,
            store: new lib_default(),
            logger: justErrorsLogger,
            infoTimeout: 5e3
          };
          this.opts = {
            ...defaultOptions4,
            ..._opts,
            restrictions: {
              ...defaultOptions4.restrictions,
              ..._opts && _opts.restrictions
            }
          };
          if (_opts && _opts.logger && _opts.debug) {
            this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning");
          } else if (_opts && _opts.debug) {
            this.opts.logger = debugLogger;
          }
          this.log(`Using Core v${this.constructor.VERSION}`);
          this.i18nInit();
          this.calculateProgress = (0, import_lodash.default)(this.calculateProgress.bind(this), 500, {
            leading: true,
            trailing: true
          });
          this.store = this.opts.store;
          this.setState({
            plugins: {},
            files: {},
            currentUploads: {},
            allowNewUpload: true,
            capabilities: {
              uploadProgress: supportsUploadProgress(),
              individualCancellation: true,
              resumableUploads: false
            },
            totalProgress: 0,
            meta: {
              ...this.opts.meta
            },
            info: [],
            recoveredState: null
          });
          _classPrivateFieldLooseBase3(this, _restricter)[_restricter] = new Restricter(() => this.opts, this.i18n);
          _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe] = this.store.subscribe((prevState, nextState, patch) => {
            this.emit("state-update", prevState, nextState, patch);
            this.updateAll(nextState);
          });
          if (this.opts.debug && typeof window !== "undefined") {
            window[this.opts.id] = this;
          }
          _classPrivateFieldLooseBase3(this, _addListeners)[_addListeners]();
        }
        emit(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _classPrivateFieldLooseBase3(this, _emitter)[_emitter].emit(event, ...args);
        }
        on(event, callback) {
          _classPrivateFieldLooseBase3(this, _emitter)[_emitter].on(event, callback);
          return this;
        }
        once(event, callback) {
          _classPrivateFieldLooseBase3(this, _emitter)[_emitter].once(event, callback);
          return this;
        }
        off(event, callback) {
          _classPrivateFieldLooseBase3(this, _emitter)[_emitter].off(event, callback);
          return this;
        }
        updateAll(state) {
          this.iteratePlugins((plugin) => {
            plugin.update(state);
          });
        }
        setState(patch) {
          this.store.setState(patch);
        }
        getState() {
          return this.store.getState();
        }
        setFileState(fileID, state) {
          if (!this.getState().files[fileID]) {
            throw new Error(`Can\u2019t set state for ${fileID} (the file could have been removed)`);
          }
          this.setState({
            files: {
              ...this.getState().files,
              [fileID]: {
                ...this.getState().files[fileID],
                ...state
              }
            }
          });
        }
        i18nInit() {
          const translator = new Translator([this.defaultLocale, this.opts.locale]);
          this.i18n = translator.translate.bind(translator);
          this.i18nArray = translator.translateArray.bind(translator);
          this.locale = translator.locale;
        }
        setOptions(newOpts) {
          this.opts = {
            ...this.opts,
            ...newOpts,
            restrictions: {
              ...this.opts.restrictions,
              ...newOpts && newOpts.restrictions
            }
          };
          if (newOpts.meta) {
            this.setMeta(newOpts.meta);
          }
          this.i18nInit();
          if (newOpts.locale) {
            this.iteratePlugins((plugin) => {
              plugin.setOptions();
            });
          }
          this.setState();
        }
        resetProgress() {
          const defaultProgress = {
            percentage: 0,
            bytesUploaded: 0,
            uploadComplete: false,
            uploadStarted: null
          };
          const files = {
            ...this.getState().files
          };
          const updatedFiles = {};
          Object.keys(files).forEach((fileID) => {
            const updatedFile = {
              ...files[fileID]
            };
            updatedFile.progress = {
              ...updatedFile.progress,
              ...defaultProgress
            };
            updatedFiles[fileID] = updatedFile;
          });
          this.setState({
            files: updatedFiles,
            totalProgress: 0
          });
          this.emit("reset-progress");
        }
        addPreProcessor(fn) {
          _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].add(fn);
        }
        removePreProcessor(fn) {
          return _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].delete(fn);
        }
        addPostProcessor(fn) {
          _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].add(fn);
        }
        removePostProcessor(fn) {
          return _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].delete(fn);
        }
        addUploader(fn) {
          _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].add(fn);
        }
        removeUploader(fn) {
          return _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].delete(fn);
        }
        setMeta(data) {
          const updatedMeta = {
            ...this.getState().meta,
            ...data
          };
          const updatedFiles = {
            ...this.getState().files
          };
          Object.keys(updatedFiles).forEach((fileID) => {
            updatedFiles[fileID] = {
              ...updatedFiles[fileID],
              meta: {
                ...updatedFiles[fileID].meta,
                ...data
              }
            };
          });
          this.log("Adding metadata:");
          this.log(data);
          this.setState({
            meta: updatedMeta,
            files: updatedFiles
          });
        }
        setFileMeta(fileID, data) {
          const updatedFiles = {
            ...this.getState().files
          };
          if (!updatedFiles[fileID]) {
            this.log("Was trying to set metadata for a file that has been removed: ", fileID);
            return;
          }
          const newMeta = {
            ...updatedFiles[fileID].meta,
            ...data
          };
          updatedFiles[fileID] = {
            ...updatedFiles[fileID],
            meta: newMeta
          };
          this.setState({
            files: updatedFiles
          });
        }
        getFile(fileID) {
          return this.getState().files[fileID];
        }
        getFiles() {
          const {
            files
          } = this.getState();
          return Object.values(files);
        }
        getObjectOfFilesPerState() {
          const {
            files: filesObject,
            totalProgress,
            error
          } = this.getState();
          const files = Object.values(filesObject);
          const inProgressFiles = files.filter((_ref) => {
            let {
              progress
            } = _ref;
            return !progress.uploadComplete && progress.uploadStarted;
          });
          const newFiles = files.filter((file) => !file.progress.uploadStarted);
          const startedFiles = files.filter((file) => file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess);
          const uploadStartedFiles = files.filter((file) => file.progress.uploadStarted);
          const pausedFiles = files.filter((file) => file.isPaused);
          const completeFiles = files.filter((file) => file.progress.uploadComplete);
          const erroredFiles = files.filter((file) => file.error);
          const inProgressNotPausedFiles = inProgressFiles.filter((file) => !file.isPaused);
          const processingFiles = files.filter((file) => file.progress.preprocess || file.progress.postprocess);
          return {
            newFiles,
            startedFiles,
            uploadStartedFiles,
            pausedFiles,
            completeFiles,
            erroredFiles,
            inProgressFiles,
            inProgressNotPausedFiles,
            processingFiles,
            isUploadStarted: uploadStartedFiles.length > 0,
            isAllComplete: totalProgress === 100 && completeFiles.length === files.length && processingFiles.length === 0,
            isAllErrored: !!error && erroredFiles.length === files.length,
            isAllPaused: inProgressFiles.length !== 0 && pausedFiles.length === inProgressFiles.length,
            isUploadInProgress: inProgressFiles.length > 0,
            isSomeGhost: files.some((file) => file.isGhost)
          };
        }
        validateRestrictions(file, files) {
          if (files === void 0) {
            files = this.getFiles();
          }
          try {
            _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(file, files);
          } catch (err) {
            return err;
          }
          return null;
        }
        checkIfFileAlreadyExists(fileID) {
          const {
            files
          } = this.getState();
          if (files[fileID] && !files[fileID].isGhost) {
            return true;
          }
          return false;
        }
        addFile(file) {
          _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed](file);
          const {
            files
          } = this.getState();
          let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, file);
          if (files[newFile.id] && files[newFile.id].isGhost) {
            newFile = {
              ...files[newFile.id],
              data: file.data,
              isGhost: false
            };
            this.log(`Replaced the blob in the restored ghost file: ${newFile.name}, ${newFile.id}`);
          }
          this.setState({
            files: {
              ...files,
              [newFile.id]: newFile
            }
          });
          this.emit("file-added", newFile);
          this.emit("files-added", [newFile]);
          this.log(`Added file: ${newFile.name}, ${newFile.id}, mime type: ${newFile.type}`);
          _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
          return newFile.id;
        }
        addFiles(fileDescriptors) {
          _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed]();
          const files = {
            ...this.getState().files
          };
          const newFiles = [];
          const errors = [];
          for (let i4 = 0; i4 < fileDescriptors.length; i4++) {
            try {
              let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, fileDescriptors[i4]);
              if (files[newFile.id] && files[newFile.id].isGhost) {
                newFile = {
                  ...files[newFile.id],
                  data: fileDescriptors[i4].data,
                  isGhost: false
                };
                this.log(`Replaced blob in a ghost file: ${newFile.name}, ${newFile.id}`);
              }
              files[newFile.id] = newFile;
              newFiles.push(newFile);
            } catch (err) {
              if (!err.isRestriction) {
                errors.push(err);
              }
            }
          }
          this.setState({
            files
          });
          newFiles.forEach((newFile) => {
            this.emit("file-added", newFile);
          });
          this.emit("files-added", newFiles);
          if (newFiles.length > 5) {
            this.log(`Added batch of ${newFiles.length} files`);
          } else {
            Object.keys(newFiles).forEach((fileID) => {
              this.log(`Added file: ${newFiles[fileID].name}
 id: ${newFiles[fileID].id}
 type: ${newFiles[fileID].type}`);
            });
          }
          if (newFiles.length > 0) {
            _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
          }
          if (errors.length > 0) {
            let message = "Multiple errors occurred while adding files:\n";
            errors.forEach((subError) => {
              message += `
 * ${subError.message}`;
            });
            this.info({
              message: this.i18n("addBulkFilesFailed", {
                smart_count: errors.length
              }),
              details: message
            }, "error", this.opts.infoTimeout);
            if (typeof AggregateError === "function") {
              throw new AggregateError(errors, message);
            } else {
              const err = new Error(message);
              err.errors = errors;
              throw err;
            }
          }
        }
        removeFiles(fileIDs, reason) {
          const {
            files,
            currentUploads
          } = this.getState();
          const updatedFiles = {
            ...files
          };
          const updatedUploads = {
            ...currentUploads
          };
          const removedFiles = /* @__PURE__ */ Object.create(null);
          fileIDs.forEach((fileID) => {
            if (files[fileID]) {
              removedFiles[fileID] = files[fileID];
              delete updatedFiles[fileID];
            }
          });
          function fileIsNotRemoved(uploadFileID) {
            return removedFiles[uploadFileID] === void 0;
          }
          Object.keys(updatedUploads).forEach((uploadID) => {
            const newFileIDs = currentUploads[uploadID].fileIDs.filter(fileIsNotRemoved);
            if (newFileIDs.length === 0) {
              delete updatedUploads[uploadID];
              return;
            }
            const {
              capabilities
            } = this.getState();
            if (newFileIDs.length !== currentUploads[uploadID].fileIDs.length && !capabilities.individualCancellation) {
              throw new Error("individualCancellation is disabled");
            }
            updatedUploads[uploadID] = {
              ...currentUploads[uploadID],
              fileIDs: newFileIDs
            };
          });
          const stateUpdate = {
            currentUploads: updatedUploads,
            files: updatedFiles
          };
          if (Object.keys(updatedFiles).length === 0) {
            stateUpdate.allowNewUpload = true;
            stateUpdate.error = null;
            stateUpdate.recoveredState = null;
          }
          this.setState(stateUpdate);
          this.calculateTotalProgress();
          const removedFileIDs = Object.keys(removedFiles);
          removedFileIDs.forEach((fileID) => {
            this.emit("file-removed", removedFiles[fileID], reason);
          });
          if (removedFileIDs.length > 5) {
            this.log(`Removed ${removedFileIDs.length} files`);
          } else {
            this.log(`Removed files: ${removedFileIDs.join(", ")}`);
          }
        }
        removeFile(fileID, reason) {
          if (reason === void 0) {
            reason = null;
          }
          this.removeFiles([fileID], reason);
        }
        pauseResume(fileID) {
          if (!this.getState().capabilities.resumableUploads || this.getFile(fileID).uploadComplete) {
            return void 0;
          }
          const wasPaused = this.getFile(fileID).isPaused || false;
          const isPaused = !wasPaused;
          this.setFileState(fileID, {
            isPaused
          });
          this.emit("upload-pause", fileID, isPaused);
          return isPaused;
        }
        pauseAll() {
          const updatedFiles = {
            ...this.getState().files
          };
          const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
            return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
          });
          inProgressUpdatedFiles.forEach((file) => {
            const updatedFile = {
              ...updatedFiles[file],
              isPaused: true
            };
            updatedFiles[file] = updatedFile;
          });
          this.setState({
            files: updatedFiles
          });
          this.emit("pause-all");
        }
        resumeAll() {
          const updatedFiles = {
            ...this.getState().files
          };
          const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
            return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
          });
          inProgressUpdatedFiles.forEach((file) => {
            const updatedFile = {
              ...updatedFiles[file],
              isPaused: false,
              error: null
            };
            updatedFiles[file] = updatedFile;
          });
          this.setState({
            files: updatedFiles
          });
          this.emit("resume-all");
        }
        retryAll() {
          const updatedFiles = {
            ...this.getState().files
          };
          const filesToRetry = Object.keys(updatedFiles).filter((file) => {
            return updatedFiles[file].error;
          });
          filesToRetry.forEach((file) => {
            const updatedFile = {
              ...updatedFiles[file],
              isPaused: false,
              error: null
            };
            updatedFiles[file] = updatedFile;
          });
          this.setState({
            files: updatedFiles,
            error: null
          });
          this.emit("retry-all", filesToRetry);
          if (filesToRetry.length === 0) {
            return Promise.resolve({
              successful: [],
              failed: []
            });
          }
          const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](filesToRetry, {
            forceAllowNewUpload: true
          });
          return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
        }
        cancelAll(_temp) {
          let {
            reason = "user"
          } = _temp === void 0 ? {} : _temp;
          this.emit("cancel-all", {
            reason
          });
          if (reason === "user") {
            const {
              files
            } = this.getState();
            const fileIDs = Object.keys(files);
            if (fileIDs.length) {
              this.removeFiles(fileIDs, "cancel-all");
            }
            this.setState({
              totalProgress: 0,
              error: null,
              recoveredState: null
            });
          }
        }
        retryUpload(fileID) {
          this.setFileState(fileID, {
            error: null,
            isPaused: false
          });
          this.emit("upload-retry", fileID);
          const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload]([fileID], {
            forceAllowNewUpload: true
          });
          return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
        }
        logout() {
          this.iteratePlugins((plugin) => {
            if (plugin.provider && plugin.provider.logout) {
              plugin.provider.logout();
            }
          });
        }
        calculateProgress(file, data) {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          const canHavePercentage = Number.isFinite(data.bytesTotal) && data.bytesTotal > 0;
          this.setFileState(file.id, {
            progress: {
              ...this.getFile(file.id).progress,
              bytesUploaded: data.bytesUploaded,
              bytesTotal: data.bytesTotal,
              percentage: canHavePercentage ? Math.round(data.bytesUploaded / data.bytesTotal * 100) : 0
            }
          });
          this.calculateTotalProgress();
        }
        calculateTotalProgress() {
          const files = this.getFiles();
          const inProgress = files.filter((file) => {
            return file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess;
          });
          if (inProgress.length === 0) {
            this.emit("progress", 0);
            this.setState({
              totalProgress: 0
            });
            return;
          }
          const sizedFiles = inProgress.filter((file) => file.progress.bytesTotal != null);
          const unsizedFiles = inProgress.filter((file) => file.progress.bytesTotal == null);
          if (sizedFiles.length === 0) {
            const progressMax = inProgress.length * 100;
            const currentProgress = unsizedFiles.reduce((acc, file) => {
              return acc + file.progress.percentage;
            }, 0);
            const totalProgress2 = Math.round(currentProgress / progressMax * 100);
            this.setState({
              totalProgress: totalProgress2
            });
            return;
          }
          let totalSize = sizedFiles.reduce((acc, file) => {
            return acc + file.progress.bytesTotal;
          }, 0);
          const averageSize = totalSize / sizedFiles.length;
          totalSize += averageSize * unsizedFiles.length;
          let uploadedSize = 0;
          sizedFiles.forEach((file) => {
            uploadedSize += file.progress.bytesUploaded;
          });
          unsizedFiles.forEach((file) => {
            uploadedSize += averageSize * (file.progress.percentage || 0) / 100;
          });
          let totalProgress = totalSize === 0 ? 0 : Math.round(uploadedSize / totalSize * 100);
          if (totalProgress > 100) {
            totalProgress = 100;
          }
          this.setState({
            totalProgress
          });
          this.emit("progress", totalProgress);
        }
        updateOnlineStatus() {
          const online = typeof window.navigator.onLine !== "undefined" ? window.navigator.onLine : true;
          if (!online) {
            this.emit("is-offline");
            this.info(this.i18n("noInternetConnection"), "error", 0);
            this.wasOffline = true;
          } else {
            this.emit("is-online");
            if (this.wasOffline) {
              this.emit("back-online");
              this.info(this.i18n("connectedToInternet"), "success", 3e3);
              this.wasOffline = false;
            }
          }
        }
        getID() {
          return this.opts.id;
        }
        use(Plugin, opts) {
          if (typeof Plugin !== "function") {
            const msg = `Expected a plugin class, but got ${Plugin === null ? "null" : typeof Plugin}. Please verify that the plugin was imported and spelled correctly.`;
            throw new TypeError(msg);
          }
          const plugin = new Plugin(this, opts);
          const pluginId = plugin.id;
          if (!pluginId) {
            throw new Error("Your plugin must have an id");
          }
          if (!plugin.type) {
            throw new Error("Your plugin must have a type");
          }
          const existsPluginAlready = this.getPlugin(pluginId);
          if (existsPluginAlready) {
            const msg = `Already found a plugin named '${existsPluginAlready.id}'. Tried to use: '${pluginId}'.
Uppy plugins must have unique \`id\` options. See https://uppy.io/docs/plugins/#id.`;
            throw new Error(msg);
          }
          if (Plugin.VERSION) {
            this.log(`Using ${pluginId} v${Plugin.VERSION}`);
          }
          if (plugin.type in _classPrivateFieldLooseBase3(this, _plugins)[_plugins]) {
            _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type].push(plugin);
          } else {
            _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type] = [plugin];
          }
          plugin.install();
          return this;
        }
        getPlugin(id21) {
          for (const plugins of Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins])) {
            const foundPlugin = plugins.find((plugin) => plugin.id === id21);
            if (foundPlugin != null)
              return foundPlugin;
          }
          return void 0;
        }
        [_Symbol$for](type) {
          return _classPrivateFieldLooseBase3(this, _plugins)[_plugins][type];
        }
        iteratePlugins(method) {
          Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins]).flat(1).forEach(method);
        }
        removePlugin(instance) {
          this.log(`Removing plugin ${instance.id}`);
          this.emit("plugin-remove", instance);
          if (instance.uninstall) {
            instance.uninstall();
          }
          const list = _classPrivateFieldLooseBase3(this, _plugins)[_plugins][instance.type];
          const index = list.findIndex((item) => item.id === instance.id);
          if (index !== -1) {
            list.splice(index, 1);
          }
          const state = this.getState();
          const updatedState = {
            plugins: {
              ...state.plugins,
              [instance.id]: void 0
            }
          };
          this.setState(updatedState);
        }
        close(_temp2) {
          let {
            reason
          } = _temp2 === void 0 ? {} : _temp2;
          this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`);
          this.cancelAll({
            reason
          });
          _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe]();
          this.iteratePlugins((plugin) => {
            this.removePlugin(plugin);
          });
          if (typeof window !== "undefined" && window.removeEventListener) {
            window.removeEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
            window.removeEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
          }
        }
        hideInfo() {
          const {
            info
          } = this.getState();
          this.setState({
            info: info.slice(1)
          });
          this.emit("info-hidden");
        }
        info(message, type, duration2) {
          if (type === void 0) {
            type = "info";
          }
          if (duration2 === void 0) {
            duration2 = 3e3;
          }
          const isComplexMessage = typeof message === "object";
          this.setState({
            info: [...this.getState().info, {
              type,
              message: isComplexMessage ? message.message : message,
              details: isComplexMessage ? message.details : null
            }]
          });
          setTimeout(() => this.hideInfo(), duration2);
          this.emit("info-visible");
        }
        log(message, type) {
          const {
            logger
          } = this.opts;
          switch (type) {
            case "error":
              logger.error(message);
              break;
            case "warning":
              logger.warn(message);
              break;
            default:
              logger.debug(message);
              break;
          }
        }
        restore(uploadID) {
          this.log(`Core: attempting to restore upload "${uploadID}"`);
          if (!this.getState().currentUploads[uploadID]) {
            _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
            return Promise.reject(new Error("Nonexistent upload"));
          }
          return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
        }
        [_Symbol$for2]() {
          return _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](...arguments);
        }
        addResultData(uploadID, data) {
          if (!_classPrivateFieldLooseBase3(this, _getUpload)[_getUpload](uploadID)) {
            this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
            return;
          }
          const {
            currentUploads
          } = this.getState();
          const currentUpload = {
            ...currentUploads[uploadID],
            result: {
              ...currentUploads[uploadID].result,
              ...data
            }
          };
          this.setState({
            currentUploads: {
              ...currentUploads,
              [uploadID]: currentUpload
            }
          });
        }
        upload() {
          var _classPrivateFieldLoo;
          if (!((_classPrivateFieldLoo = _classPrivateFieldLooseBase3(this, _plugins)[_plugins].uploader) != null && _classPrivateFieldLoo.length)) {
            this.log("No uploader type plugins are used", "warning");
          }
          let {
            files
          } = this.getState();
          const onBeforeUploadResult = this.opts.onBeforeUpload(files);
          if (onBeforeUploadResult === false) {
            return Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false"));
          }
          if (onBeforeUploadResult && typeof onBeforeUploadResult === "object") {
            files = onBeforeUploadResult;
            this.setState({
              files
            });
          }
          return Promise.resolve().then(() => _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validateMinNumberOfFiles(files)).catch((err) => {
            _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err);
            throw err;
          }).then(() => {
            if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFields)[_checkRequiredMetaFields](files)) {
              throw new RestrictionError(this.i18n("missingRequiredMetaField"));
            }
          }).catch((err) => {
            throw err;
          }).then(() => {
            const {
              currentUploads
            } = this.getState();
            const currentlyUploadingFiles = Object.values(currentUploads).flatMap((curr) => curr.fileIDs);
            const waitingFileIDs = [];
            Object.keys(files).forEach((fileID) => {
              const file = this.getFile(fileID);
              if (!file.progress.uploadStarted && currentlyUploadingFiles.indexOf(fileID) === -1) {
                waitingFileIDs.push(file.id);
              }
            });
            const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](waitingFileIDs);
            return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
          }).catch((err) => {
            this.emit("error", err);
            this.log(err, "error");
            throw err;
          });
        }
      };
      Uppy.VERSION = packageJson2.version;
      Uppy_default = Uppy;
    }
  });

  // ../node_modules/preact/dist/preact.module.js
  function s(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function a(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function h(l3, u3, i4) {
    var t3, o3, r3, f3 = {};
    for (r3 in u3)
      "key" == r3 ? t3 = u3[r3] : "ref" == r3 ? o3 = u3[r3] : f3[r3] = u3[r3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l3 && null != l3.defaultProps)
      for (r3 in l3.defaultProps)
        void 0 === f3[r3] && (f3[r3] = l3.defaultProps[r3]);
    return v(l3, f3, t3, o3, null);
  }
  function v(n2, i4, t3, o3, r3) {
    var f3 = {
      type: n2,
      props: i4,
      key: t3,
      ref: o3,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: null == r3 ? ++u : r3
    };
    return null == r3 && null != l.vnode && l.vnode(f3), f3;
  }
  function y() {
    return {
      current: null
    };
  }
  function p(n2) {
    return n2.children;
  }
  function d(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function _(n2, l3) {
    if (null == l3)
      return n2.__ ? _(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if (null != (u3 = n2.__k[l3]) && null != u3.__e)
        return u3.__e;
    return "function" == typeof n2.type ? _(n2) : null;
  }
  function k(n2) {
    var l3, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if (null != (u3 = n2.__k[l3]) && null != u3.__e) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return k(n2);
    }
  }
  function b(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
  }
  function g() {
    for (var n2; g.__r = t.length; )
      n2 = t.sort(function(n3, l3) {
        return n3.__v.__b - l3.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l3, u3, i4, t3, o3, r3;
        n3.__d && (o3 = (t3 = (l3 = n3).__v).__e, (r3 = l3.__P) && (u3 = [], (i4 = s({}, t3)).__v = t3.__v + 1, j(r3, t3, i4, l3.__n, void 0 !== r3.ownerSVGElement, null != t3.__h ? [o3] : null, u3, null == o3 ? _(t3) : o3, t3.__h), z(u3, t3), t3.__e != o3 && k(t3)));
      });
  }
  function w(n2, l3, u3, i4, t3, o3, r3, c3, s3, a3) {
    var h2, y2, d2, k3, b3, g3, w3, x2 = i4 && i4.__k || e, C2 = x2.length;
    for (u3.__k = [], h2 = 0; h2 < l3.length; h2++)
      if (null != (k3 = u3.__k[h2] = null == (k3 = l3[h2]) || "boolean" == typeof k3 ? null : "string" == typeof k3 || "number" == typeof k3 || "bigint" == typeof k3 ? v(null, k3, null, null, k3) : Array.isArray(k3) ? v(p, {
        children: k3
      }, null, null, null) : k3.__b > 0 ? v(k3.type, k3.props, k3.key, null, k3.__v) : k3)) {
        if (k3.__ = u3, k3.__b = u3.__b + 1, null === (d2 = x2[h2]) || d2 && k3.key == d2.key && k3.type === d2.type)
          x2[h2] = void 0;
        else
          for (y2 = 0; y2 < C2; y2++) {
            if ((d2 = x2[y2]) && k3.key == d2.key && k3.type === d2.type) {
              x2[y2] = void 0;
              break;
            }
            d2 = null;
          }
        j(n2, k3, d2 = d2 || f, t3, o3, r3, c3, s3, a3), b3 = k3.__e, (y2 = k3.ref) && d2.ref != y2 && (w3 || (w3 = []), d2.ref && w3.push(d2.ref, null, k3), w3.push(y2, k3.__c || b3, k3)), null != b3 ? (null == g3 && (g3 = b3), "function" == typeof k3.type && k3.__k === d2.__k ? k3.__d = s3 = m(k3, s3, n2) : s3 = A(n2, k3, d2, x2, b3, s3), "function" == typeof u3.type && (u3.__d = s3)) : s3 && d2.__e == s3 && s3.parentNode != n2 && (s3 = _(d2));
      }
    for (u3.__e = g3, h2 = C2; h2--; )
      null != x2[h2] && ("function" == typeof u3.type && null != x2[h2].__e && x2[h2].__e == u3.__d && (u3.__d = _(i4, h2 + 1)), N(x2[h2], x2[h2]));
    if (w3)
      for (h2 = 0; h2 < w3.length; h2++)
        M(w3[h2], w3[++h2], w3[++h2]);
  }
  function m(n2, l3, u3) {
    for (var i4, t3 = n2.__k, o3 = 0; t3 && o3 < t3.length; o3++)
      (i4 = t3[o3]) && (i4.__ = n2, l3 = "function" == typeof i4.type ? m(i4, l3, u3) : A(u3, i4, i4, t3, i4.__e, l3));
    return l3;
  }
  function x(n2, l3) {
    return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (Array.isArray(n2) ? n2.some(function(n3) {
      x(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function A(n2, l3, u3, i4, t3, o3) {
    var r3, f3, e3;
    if (void 0 !== l3.__d)
      r3 = l3.__d, l3.__d = void 0;
    else if (null == u3 || t3 != o3 || null == t3.parentNode)
      n:
        if (null == o3 || o3.parentNode !== n2)
          n2.appendChild(t3), r3 = null;
        else {
          for (f3 = o3, e3 = 0; (f3 = f3.nextSibling) && e3 < i4.length; e3 += 2)
            if (f3 == t3)
              break n;
          n2.insertBefore(t3, o3), r3 = o3;
        }
    return void 0 !== r3 ? r3 : t3.nextSibling;
  }
  function C(n2, l3, u3, i4, t3) {
    var o3;
    for (o3 in u3)
      "children" === o3 || "key" === o3 || o3 in l3 || H(n2, o3, null, u3[o3], i4);
    for (o3 in l3)
      t3 && "function" != typeof l3[o3] || "children" === o3 || "key" === o3 || "value" === o3 || "checked" === o3 || u3[o3] === l3[o3] || H(n2, o3, l3[o3], u3[o3], i4);
  }
  function $(n2, l3, u3) {
    "-" === l3[0] ? n2.setProperty(l3, u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || c.test(l3) ? u3 : u3 + "px";
  }
  function H(n2, l3, u3, i4, t3) {
    var o3;
    n:
      if ("style" === l3) {
        if ("string" == typeof u3)
          n2.style.cssText = u3;
        else {
          if ("string" == typeof i4 && (n2.style.cssText = i4 = ""), i4)
            for (l3 in i4)
              u3 && l3 in u3 || $(n2.style, l3, "");
          if (u3)
            for (l3 in u3)
              i4 && u3[l3] === i4[l3] || $(n2.style, l3, u3[l3]);
        }
      } else if ("o" === l3[0] && "n" === l3[1])
        o3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u3, u3 ? i4 || n2.addEventListener(l3, o3 ? T : I, o3) : n2.removeEventListener(l3, o3 ? T : I, o3);
      else if ("dangerouslySetInnerHTML" !== l3) {
        if (t3)
          l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== l3 && "list" !== l3 && "form" !== l3 && "tabIndex" !== l3 && "download" !== l3 && l3 in n2)
          try {
            n2[l3] = null == u3 ? "" : u3;
            break n;
          } catch (n3) {
          }
        "function" == typeof u3 || (null != u3 && (false !== u3 || "a" === l3[0] && "r" === l3[1]) ? n2.setAttribute(l3, u3) : n2.removeAttribute(l3));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u3, i4, t3, o3, r3, f3, e3, c3) {
    var a3, h2, v3, y2, _3, k3, b3, g3, m3, x2, A2, C2, $2, H2 = u3.type;
    if (void 0 !== u3.constructor)
      return null;
    null != i4.__h && (c3 = i4.__h, e3 = u3.__e = i4.__e, u3.__h = null, r3 = [e3]), (a3 = l.__b) && a3(u3);
    try {
      n:
        if ("function" == typeof H2) {
          if (g3 = u3.props, m3 = (a3 = H2.contextType) && t3[a3.__c], x2 = a3 ? m3 ? m3.props.value : a3.__ : t3, i4.__c ? b3 = (h2 = u3.__c = i4.__c).__ = h2.__E : ("prototype" in H2 && H2.prototype.render ? u3.__c = h2 = new H2(g3, x2) : (u3.__c = h2 = new d(g3, x2), h2.constructor = H2, h2.render = O), m3 && m3.sub(h2), h2.props = g3, h2.state || (h2.state = {}), h2.context = x2, h2.__n = t3, v3 = h2.__d = true, h2.__h = []), null == h2.__s && (h2.__s = h2.state), null != H2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = s({}, h2.__s)), s(h2.__s, H2.getDerivedStateFromProps(g3, h2.__s))), y2 = h2.props, _3 = h2.state, v3)
            null == H2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
          else {
            if (null == H2.getDerivedStateFromProps && g3 !== y2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(g3, x2), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(g3, h2.__s, x2) || u3.__v === i4.__v) {
              h2.props = g3, h2.state = h2.__s, u3.__v !== i4.__v && (h2.__d = false), h2.__v = u3, u3.__e = i4.__e, u3.__k = i4.__k, u3.__k.forEach(function(n3) {
                n3 && (n3.__ = u3);
              }), h2.__h.length && f3.push(h2);
              break n;
            }
            null != h2.componentWillUpdate && h2.componentWillUpdate(g3, h2.__s, x2), null != h2.componentDidUpdate && h2.__h.push(function() {
              h2.componentDidUpdate(y2, _3, k3);
            });
          }
          if (h2.context = x2, h2.props = g3, h2.__v = u3, h2.__P = n2, A2 = l.__r, C2 = 0, "prototype" in H2 && H2.prototype.render)
            h2.state = h2.__s, h2.__d = false, A2 && A2(u3), a3 = h2.render(h2.props, h2.state, h2.context);
          else
            do {
              h2.__d = false, A2 && A2(u3), a3 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
            } while (h2.__d && ++C2 < 25);
          h2.state = h2.__s, null != h2.getChildContext && (t3 = s(s({}, t3), h2.getChildContext())), v3 || null == h2.getSnapshotBeforeUpdate || (k3 = h2.getSnapshotBeforeUpdate(y2, _3)), $2 = null != a3 && a3.type === p && null == a3.key ? a3.props.children : a3, w(n2, Array.isArray($2) ? $2 : [$2], u3, i4, t3, o3, r3, f3, e3, c3), h2.base = u3.__e, u3.__h = null, h2.__h.length && f3.push(h2), b3 && (h2.__E = h2.__ = null), h2.__e = false;
        } else
          null == r3 && u3.__v === i4.__v ? (u3.__k = i4.__k, u3.__e = i4.__e) : u3.__e = L(i4.__e, u3, i4, t3, o3, r3, f3, c3);
      (a3 = l.diffed) && a3(u3);
    } catch (n3) {
      u3.__v = null, (c3 || null != r3) && (u3.__e = e3, u3.__h = !!c3, r3[r3.indexOf(e3)] = null), l.__e(n3, u3, i4);
    }
  }
  function z(n2, u3) {
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function L(l3, u3, i4, t3, o3, r3, e3, c3) {
    var s3, h2, v3, y2 = i4.props, p3 = u3.props, d2 = u3.type, k3 = 0;
    if ("svg" === d2 && (o3 = true), null != r3) {
      for (; k3 < r3.length; k3++)
        if ((s3 = r3[k3]) && "setAttribute" in s3 == !!d2 && (d2 ? s3.localName === d2 : 3 === s3.nodeType)) {
          l3 = s3, r3[k3] = null;
          break;
        }
    }
    if (null == l3) {
      if (null === d2)
        return document.createTextNode(p3);
      l3 = o3 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p3.is && p3), r3 = null, c3 = false;
    }
    if (null === d2)
      y2 === p3 || c3 && l3.data === p3 || (l3.data = p3);
    else {
      if (r3 = r3 && n.call(l3.childNodes), h2 = (y2 = i4.props || f).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !c3) {
        if (null != r3)
          for (y2 = {}, k3 = 0; k3 < l3.attributes.length; k3++)
            y2[l3.attributes[k3].name] = l3.attributes[k3].value;
        (v3 || h2) && (v3 && (h2 && v3.__html == h2.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3 && v3.__html || ""));
      }
      if (C(l3, p3, y2, o3, c3), v3)
        u3.__k = [];
      else if (k3 = u3.props.children, w(l3, Array.isArray(k3) ? k3 : [k3], u3, i4, t3, o3 && "foreignObject" !== d2, r3, e3, r3 ? r3[0] : i4.__k && _(i4, 0), c3), null != r3)
        for (k3 = r3.length; k3--; )
          null != r3[k3] && a(r3[k3]);
      c3 || ("value" in p3 && void 0 !== (k3 = p3.value) && (k3 !== l3.value || "progress" === d2 && !k3 || "option" === d2 && k3 !== y2.value) && H(l3, "value", k3, y2.value, false), "checked" in p3 && void 0 !== (k3 = p3.checked) && k3 !== l3.checked && H(l3, "checked", k3, y2.checked, false));
    }
    return l3;
  }
  function M(n2, u3, i4) {
    try {
      "function" == typeof n2 ? n2(u3) : n2.current = u3;
    } catch (n3) {
      l.__e(n3, i4);
    }
  }
  function N(n2, u3, i4) {
    var t3, o3;
    if (l.unmount && l.unmount(n2), (t3 = n2.ref) && (t3.current && t3.current !== n2.__e || M(t3, null, u3)), null != (t3 = n2.__c)) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u3);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = n2.__k)
      for (o3 = 0; o3 < t3.length; o3++)
        t3[o3] && N(t3[o3], u3, "function" != typeof n2.type);
    i4 || null == n2.__e || a(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function P(u3, i4, t3) {
    var o3, r3, e3;
    l.__ && l.__(u3, i4), r3 = (o3 = "function" == typeof t3) ? null : t3 && t3.__k || i4.__k, e3 = [], j(i4, u3 = (!o3 && t3 || i4).__k = h(p, null, [u3]), r3 || f, f, void 0 !== i4.ownerSVGElement, !o3 && t3 ? [t3] : r3 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e3, !o3 && t3 ? t3 : r3 ? r3.__e : i4.firstChild, o3), z(e3, u3);
  }
  function q(l3, u3, i4) {
    var t3, o3, r3, f3 = s({}, l3.props);
    for (r3 in u3)
      "key" == r3 ? t3 = u3[r3] : "ref" == r3 ? o3 = u3[r3] : f3[r3] = u3[r3];
    return arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i4), v(l3.type, f3, t3 || l3.key, o3 || l3.ref, null);
  }
  var n, l, u, i, t, o, r, f, e, c;
  var init_preact_module = __esm({
    "../node_modules/preact/dist/preact.module.js"() {
      f = {};
      e = [];
      c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      n = e.slice, l = {
        __e: function(n2, l3, u3, i4) {
          for (var t3, o3, r3; l3 = l3.__; )
            if ((t3 = l3.__c) && !t3.__)
              try {
                if ((o3 = t3.constructor) && null != o3.getDerivedStateFromError && (t3.setState(o3.getDerivedStateFromError(n2)), r3 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n2, i4 || {}), r3 = t3.__d), r3)
                  return t3.__E = t3;
              } catch (l4) {
                n2 = l4;
              }
          throw n2;
        }
      }, u = 0, i = function(n2) {
        return null != n2 && void 0 === n2.constructor;
      }, d.prototype.setState = function(n2, l3) {
        var u3;
        u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n2 && (n2 = n2(s({}, u3), this.props)), n2 && s(u3, n2), null != n2 && this.__v && (l3 && this.__h.push(l3), b(this));
      }, d.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), b(this));
      }, d.prototype.render = p, t = [], g.__r = 0, r = 0;
    }
  });

  // ../packages/@uppy/utils/lib/isDOMElement.js
  function isDOMElement(obj) {
    return (obj == null ? void 0 : obj.nodeType) === Node.ELEMENT_NODE;
  }
  var init_isDOMElement = __esm({
    "../packages/@uppy/utils/lib/isDOMElement.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/findDOMElement.js
  var findDOMElement_exports = {};
  __export(findDOMElement_exports, {
    default: () => findDOMElement
  });
  function findDOMElement(element, context) {
    if (context === void 0) {
      context = document;
    }
    if (typeof element === "string") {
      return context.querySelector(element);
    }
    if (isDOMElement(element)) {
      return element;
    }
    return null;
  }
  var init_findDOMElement = __esm({
    "../packages/@uppy/utils/lib/findDOMElement.js"() {
      init_isDOMElement();
    }
  });

  // ../packages/@uppy/utils/lib/getTextDirection.js
  function getTextDirection(element) {
    var _element;
    while (element && !element.dir) {
      element = element.parentNode;
    }
    return (_element = element) == null ? void 0 : _element.dir;
  }
  var getTextDirection_default;
  var init_getTextDirection = __esm({
    "../packages/@uppy/utils/lib/getTextDirection.js"() {
      getTextDirection_default = getTextDirection;
    }
  });

  // ../packages/@uppy/core/lib/BasePlugin.js
  var BasePlugin_exports = {};
  __export(BasePlugin_exports, {
    default: () => BasePlugin
  });
  var BasePlugin;
  var init_BasePlugin = __esm({
    "../packages/@uppy/core/lib/BasePlugin.js"() {
      init_Translator();
      BasePlugin = class {
        constructor(uppy, opts) {
          if (opts === void 0) {
            opts = {};
          }
          this.uppy = uppy;
          this.opts = opts;
        }
        getPluginState() {
          const {
            plugins
          } = this.uppy.getState();
          return plugins[this.id] || {};
        }
        setPluginState(update) {
          const {
            plugins
          } = this.uppy.getState();
          this.uppy.setState({
            plugins: {
              ...plugins,
              [this.id]: {
                ...plugins[this.id],
                ...update
              }
            }
          });
        }
        setOptions(newOpts) {
          this.opts = {
            ...this.opts,
            ...newOpts
          };
          this.setPluginState();
          this.i18nInit();
        }
        i18nInit() {
          const translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
          this.i18n = translator.translate.bind(translator);
          this.i18nArray = translator.translateArray.bind(translator);
          this.setPluginState();
        }
        addTarget() {
          throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
        }
        install() {
        }
        uninstall() {
        }
        render() {
          throw new Error("Extend the render method to add your plugin to a DOM element");
        }
        update() {
        }
        afterUpdate() {
        }
      };
    }
  });

  // ../packages/@uppy/core/lib/UIPlugin.js
  function _classPrivateFieldLooseBase4(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey4(name) {
    return "__private_" + id4++ + "_" + name;
  }
  function debounce(fn) {
    let calling = null;
    let latestArgs = null;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      latestArgs = args;
      if (!calling) {
        calling = Promise.resolve().then(() => {
          calling = null;
          return fn(...latestArgs);
        });
      }
      return calling;
    };
  }
  var id4, _updateUI, UIPlugin, UIPlugin_default;
  var init_UIPlugin = __esm({
    "../packages/@uppy/core/lib/UIPlugin.js"() {
      init_preact_module();
      init_findDOMElement();
      init_getTextDirection();
      init_BasePlugin();
      id4 = 0;
      _updateUI = /* @__PURE__ */ _classPrivateFieldLooseKey4("updateUI");
      UIPlugin = class extends BasePlugin {
        constructor() {
          super(...arguments);
          Object.defineProperty(this, _updateUI, {
            writable: true,
            value: void 0
          });
        }
        mount(target, plugin) {
          const callerPluginName = plugin.id;
          const targetElement = findDOMElement(target);
          if (targetElement) {
            this.isTargetDOMEl = true;
            const uppyRootElement = document.createElement("div");
            uppyRootElement.classList.add("uppy-Root");
            _classPrivateFieldLooseBase4(this, _updateUI)[_updateUI] = debounce((state) => {
              if (!this.uppy.getPlugin(this.id))
                return;
              P(this.render(state), uppyRootElement);
              this.afterUpdate();
            });
            this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
            if (this.opts.replaceTargetContent) {
              targetElement.innerHTML = "";
            }
            P(this.render(this.uppy.getState()), uppyRootElement);
            this.el = uppyRootElement;
            targetElement.appendChild(uppyRootElement);
            uppyRootElement.dir = this.opts.direction || getTextDirection_default(uppyRootElement) || "ltr";
            this.onMount();
            return this.el;
          }
          let targetPlugin;
          if (typeof target === "object" && target instanceof UIPlugin) {
            targetPlugin = target;
          } else if (typeof target === "function") {
            const Target = target;
            this.uppy.iteratePlugins((p3) => {
              if (p3 instanceof Target) {
                targetPlugin = p3;
              }
            });
          }
          if (targetPlugin) {
            this.uppy.log(`Installing ${callerPluginName} to ${targetPlugin.id}`);
            this.parent = targetPlugin;
            this.el = targetPlugin.addTarget(plugin);
            this.onMount();
            return this.el;
          }
          this.uppy.log(`Not installing ${callerPluginName}`);
          let message = `Invalid target option given to ${callerPluginName}.`;
          if (typeof target === "function") {
            message += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.";
          } else {
            message += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.";
          }
          throw new Error(message);
        }
        update(state) {
          if (this.el != null) {
            var _classPrivateFieldLoo, _classPrivateFieldLoo2;
            (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase4(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
          }
        }
        unmount() {
          if (this.isTargetDOMEl) {
            var _this$el;
            (_this$el = this.el) == null ? void 0 : _this$el.remove();
          }
          this.onUnmount();
        }
        onMount() {
        }
        onUnmount() {
        }
      };
      UIPlugin_default = UIPlugin;
    }
  });

  // ../packages/@uppy/core/lib/index.js
  var lib_exports = {};
  __export(lib_exports, {
    BasePlugin: () => BasePlugin,
    UIPlugin: () => UIPlugin_default,
    Uppy: () => Uppy_default,
    debugLogger: () => debugLogger,
    default: () => Uppy_default
  });
  var init_lib2 = __esm({
    "../packages/@uppy/core/lib/index.js"() {
      init_Uppy();
      init_Uppy();
      init_UIPlugin();
      init_BasePlugin();
      init_loggers();
    }
  });

  // ../packages/@uppy/utils/lib/toArray.js
  var toArray_exports = {};
  __export(toArray_exports, {
    default: () => toArray_default
  });
  var toArray_default;
  var init_toArray = __esm({
    "../packages/@uppy/utils/lib/toArray.js"() {
      toArray_default = Array.from;
    }
  });

  // ../node_modules/get-form-data/es/index.js
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function getFormData(form, options) {
    if (!form) {
      throw new Error("A form is required by getFormData, was given form=" + form);
    }
    options = _extends({
      includeDisabled: false,
      trim: false
    }, options);
    var data = {};
    var elementName;
    var elementNames = [];
    var elementNameLookup = {};
    for (var i4 = 0, l3 = form.elements.length; i4 < l3; i4++) {
      var element = form.elements[i4];
      if (IGNORED_ELEMENT_TYPES[element.type] || element.disabled && !options.includeDisabled) {
        continue;
      }
      elementName = element.name || element.id;
      if (elementName && !elementNameLookup[elementName]) {
        elementNames.push(elementName);
        elementNameLookup[elementName] = true;
      }
    }
    for (var _i = 0, _l = elementNames.length; _i < _l; _i++) {
      elementName = elementNames[_i];
      var value2 = getFieldData(form, elementName, options);
      if (value2 != null) {
        data[elementName] = value2;
      }
    }
    return data;
  }
  function getFieldData(form, fieldName, options) {
    if (!form) {
      throw new Error("A form is required by getFieldData, was given form=" + form);
    }
    if (!fieldName && toString.call(fieldName) !== "[object String]") {
      throw new Error("A field name is required by getFieldData, was given fieldName=" + fieldName);
    }
    options = _extends({
      includeDisabled: false,
      trim: false
    }, options);
    var element = form.elements[fieldName];
    if (!element || element.disabled && !options.includeDisabled) {
      return null;
    }
    if (!NODE_LIST_CLASSES[toString.call(element)]) {
      return getFormElementValue(element, options.trim);
    }
    var data = [];
    var allRadios = true;
    for (var i4 = 0, l3 = element.length; i4 < l3; i4++) {
      if (element[i4].disabled && !options.includeDisabled) {
        continue;
      }
      if (allRadios && element[i4].type !== "radio") {
        allRadios = false;
      }
      var value2 = getFormElementValue(element[i4], options.trim);
      if (value2 != null) {
        data = data.concat(value2);
      }
    }
    if (allRadios && data.length === 1) {
      return data[0];
    }
    return data.length > 0 ? data : null;
  }
  function getFormElementValue(element, trim) {
    var value2 = null;
    var type = element.type;
    if (type === "select-one") {
      if (element.options.length) {
        value2 = element.options[element.selectedIndex].value;
      }
      return value2;
    }
    if (type === "select-multiple") {
      value2 = [];
      for (var i4 = 0, l3 = element.options.length; i4 < l3; i4++) {
        if (element.options[i4].selected) {
          value2.push(element.options[i4].value);
        }
      }
      if (value2.length === 0) {
        value2 = null;
      }
      return value2;
    }
    if (type === "file" && "files" in element) {
      if (element.multiple) {
        value2 = slice.call(element.files);
        if (value2.length === 0) {
          value2 = null;
        }
      } else {
        value2 = element.files[0];
      }
      return value2;
    }
    if (!CHECKED_INPUT_TYPES[type]) {
      value2 = trim ? element.value.replace(TRIM_RE, "") : element.value;
    } else if (element.checked) {
      if (type === "checkbox" && !element.hasAttribute("value")) {
        value2 = true;
      } else {
        value2 = element.value;
      }
    }
    return value2;
  }
  var NODE_LIST_CLASSES, IGNORED_ELEMENT_TYPES, CHECKED_INPUT_TYPES, TRIM_RE, slice, toString;
  var init_es = __esm({
    "../node_modules/get-form-data/es/index.js"() {
      NODE_LIST_CLASSES = {
        "[object HTMLCollection]": true,
        "[object NodeList]": true,
        "[object RadioNodeList]": true
      };
      IGNORED_ELEMENT_TYPES = {
        "button": true,
        "fieldset": true,
        "reset": true,
        "submit": true
      };
      CHECKED_INPUT_TYPES = {
        "checkbox": true,
        "radio": true
      };
      TRIM_RE = /^\s+|\s+$/g;
      slice = Array.prototype.slice;
      toString = Object.prototype.toString;
      getFormData.getFieldData = getFieldData;
    }
  });

  // ../packages/@uppy/form/lib/index.js
  var lib_exports2 = {};
  __export(lib_exports2, {
    default: () => Form
  });
  var packageJson3, Form;
  var init_lib3 = __esm({
    "../packages/@uppy/form/lib/index.js"() {
      init_BasePlugin();
      init_findDOMElement();
      init_toArray();
      init_es();
      packageJson3 = {
        "version": "3.0.0-beta.2"
      };
      Form = class extends BasePlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.type = "acquirer";
          this.id = this.opts.id || "Form";
          this.title = "Form";
          const defaultOptions4 = {
            target: null,
            resultName: "uppyResult",
            getMetaFromForm: true,
            addResultToForm: true,
            submitOnSuccess: false,
            triggerUploadOnSubmit: false
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.handleFormSubmit = this.handleFormSubmit.bind(this);
          this.handleUploadStart = this.handleUploadStart.bind(this);
          this.handleSuccess = this.handleSuccess.bind(this);
          this.addResultToForm = this.addResultToForm.bind(this);
          this.getMetaFromForm = this.getMetaFromForm.bind(this);
        }
        handleUploadStart() {
          if (this.opts.getMetaFromForm) {
            this.getMetaFromForm();
          }
        }
        handleSuccess(result2) {
          if (this.opts.addResultToForm) {
            this.addResultToForm(result2);
          }
          if (this.opts.submitOnSuccess) {
            this.form.submit();
          }
        }
        handleFormSubmit(ev) {
          if (this.opts.triggerUploadOnSubmit) {
            ev.preventDefault();
            const elements = toArray_default(ev.target.elements);
            const disabledByUppy = [];
            elements.forEach((el) => {
              const isButton = el.tagName === "BUTTON" || el.tagName === "INPUT" && el.type === "submit";
              if (isButton && !el.disabled) {
                el.disabled = true;
                disabledByUppy.push(el);
              }
            });
            this.uppy.upload().then(() => {
              disabledByUppy.forEach((button) => {
                button.disabled = false;
              });
            }, (err) => {
              disabledByUppy.forEach((button) => {
                button.disabled = false;
              });
              return Promise.reject(err);
            }).catch((err) => {
              this.uppy.log(err.stack || err.message || err);
            });
          }
        }
        addResultToForm(result2) {
          this.uppy.log("[Form] Adding result to the original form:");
          this.uppy.log(result2);
          let resultInput = this.form.querySelector(`[name="${this.opts.resultName}"]`);
          if (resultInput) {
            let updatedResult;
            try {
              updatedResult = JSON.parse(resultInput.value);
            } catch (err) {
            }
            if (!Array.isArray(updatedResult)) {
              updatedResult = [];
            }
            updatedResult.push(result2);
            resultInput.value = JSON.stringify(updatedResult);
            return;
          }
          resultInput = document.createElement("input");
          resultInput.name = this.opts.resultName;
          resultInput.type = "hidden";
          resultInput.value = JSON.stringify([result2]);
          this.form.appendChild(resultInput);
        }
        getMetaFromForm() {
          const formMeta = getFormData(this.form);
          delete formMeta[this.opts.resultName];
          this.uppy.setMeta(formMeta);
        }
        install() {
          this.form = findDOMElement(this.opts.target);
          if (!this.form || this.form.nodeName !== "FORM") {
            this.uppy.log("Form plugin requires a <form> target element passed in options to operate, none was found", "error");
            return;
          }
          this.form.addEventListener("submit", this.handleFormSubmit);
          this.uppy.on("upload", this.handleUploadStart);
          this.uppy.on("complete", this.handleSuccess);
        }
        uninstall() {
          this.form.removeEventListener("submit", this.handleFormSubmit);
          this.uppy.off("upload", this.handleUploadStart);
          this.uppy.off("complete", this.handleSuccess);
        }
      };
      Form.VERSION = packageJson3.version;
    }
  });

  // ../packages/@uppy/utils/lib/getSpeed.js
  function getSpeed(fileProgress) {
    if (!fileProgress.bytesUploaded)
      return 0;
    const timeElapsed = Date.now() - fileProgress.uploadStarted;
    const uploadSpeed = fileProgress.bytesUploaded / (timeElapsed / 1e3);
    return uploadSpeed;
  }
  var init_getSpeed = __esm({
    "../packages/@uppy/utils/lib/getSpeed.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/getBytesRemaining.js
  function getBytesRemaining(fileProgress) {
    return fileProgress.bytesTotal - fileProgress.bytesUploaded;
  }
  var init_getBytesRemaining = __esm({
    "../packages/@uppy/utils/lib/getBytesRemaining.js"() {
    }
  });

  // ../packages/@uppy/status-bar/lib/StatusBarStates.js
  var StatusBarStates_default;
  var init_StatusBarStates = __esm({
    "../packages/@uppy/status-bar/lib/StatusBarStates.js"() {
      StatusBarStates_default = {
        STATE_ERROR: "error",
        STATE_WAITING: "waiting",
        STATE_PREPROCESSING: "preprocessing",
        STATE_UPLOADING: "uploading",
        STATE_POSTPROCESSING: "postprocessing",
        STATE_COMPLETE: "complete"
      };
    }
  });

  // ../node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "../node_modules/classnames/index.js"(exports, module) {
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames13() {
          var classes = [];
          for (var i4 = 0; i4 < arguments.length; i4++) {
            var arg = arguments[i4];
            if (!arg)
              continue;
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames13.apply(null, arg);
                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === "object") {
              if (arg.toString === Object.prototype.toString) {
                for (var key in arg) {
                  if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                  }
                }
              } else {
                classes.push(arg.toString());
              }
            }
          }
          return classes.join(" ");
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames13.default = classNames13;
          module.exports = classNames13;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames13;
          });
        } else {
          window.classNames = classNames13;
        }
      })();
    }
  });

  // ../packages/@uppy/status-bar/lib/calculateProcessingProgress.js
  function calculateProcessingProgress(files) {
    const values = [];
    let mode;
    let message;
    for (const {
      progress
    } of Object.values(files)) {
      const {
        preprocess,
        postprocess
      } = progress;
      if (message == null && (preprocess || postprocess)) {
        ({
          mode,
          message
        } = preprocess || postprocess);
      }
      if ((preprocess == null ? void 0 : preprocess.mode) === "determinate")
        values.push(preprocess.value);
      if ((postprocess == null ? void 0 : postprocess.mode) === "determinate")
        values.push(postprocess.value);
    }
    const value2 = values.reduce((total, progressValue) => {
      return total + progressValue / values.length;
    }, 0);
    return {
      mode,
      message,
      value: value2
    };
  }
  var init_calculateProcessingProgress = __esm({
    "../packages/@uppy/status-bar/lib/calculateProcessingProgress.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/secondsToTime.js
  function secondsToTime(rawSeconds) {
    const hours = Math.floor(rawSeconds / 3600) % 24;
    const minutes = Math.floor(rawSeconds / 60) % 60;
    const seconds = Math.floor(rawSeconds % 60);
    return {
      hours,
      minutes,
      seconds
    };
  }
  var init_secondsToTime = __esm({
    "../packages/@uppy/utils/lib/secondsToTime.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/prettyETA.js
  function prettyETA(seconds) {
    const time = secondsToTime(seconds);
    const hoursStr = time.hours === 0 ? "" : `${time.hours}h`;
    const minutesStr = time.minutes === 0 ? "" : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, "0")}`}m`;
    const secondsStr = time.hours !== 0 ? "" : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, "0")}`}s`;
    return `${hoursStr}${minutesStr}${secondsStr}`;
  }
  var init_prettyETA = __esm({
    "../packages/@uppy/utils/lib/prettyETA.js"() {
      init_secondsToTime();
    }
  });

  // ../packages/@uppy/status-bar/lib/Components.js
  function UploadBtn(props) {
    const {
      newFiles,
      isUploadStarted,
      recoveredState,
      i18n,
      uploadState,
      isSomeGhost,
      startUpload
    } = props;
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
      "uppy-c-btn-primary": uploadState === StatusBarStates_default.STATE_WAITING
    }, {
      "uppy-StatusBar-actionBtn--disabled": isSomeGhost
    });
    const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n("uploadXNewFiles", {
      smart_count: newFiles
    }) : i18n("uploadXFiles", {
      smart_count: newFiles
    });
    return h("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
        smart_count: newFiles
      }),
      onClick: startUpload,
      disabled: isSomeGhost,
      "data-uppy-super-focusable": true
    }, uploadBtnText);
  }
  function RetryBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
      "aria-label": i18n("retryUpload"),
      onClick: () => uppy.retryAll(),
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "8",
      height: "10",
      viewBox: "0 0 8 10"
    }, h("path", {
      d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
    })), i18n("retry"));
  }
  function CancelBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      title: i18n("cancel"),
      "aria-label": i18n("cancel"),
      onClick: () => uppy.cancelAll(),
      "data-cy": "cancel",
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, h("g", {
      fill: "none",
      fillRule: "evenodd"
    }, h("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), h("path", {
      fill: "#FFF",
      d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
    }))));
  }
  function PauseResumeButton(props) {
    const {
      isAllPaused,
      i18n,
      isAllComplete,
      resumableUploads,
      uppy
    } = props;
    const title = isAllPaused ? i18n("resume") : i18n("pause");
    function togglePauseResume() {
      if (isAllComplete)
        return null;
      if (!resumableUploads) {
        return uppy.cancelAll();
      }
      if (isAllPaused) {
        return uppy.resumeAll();
      }
      return uppy.pauseAll();
    }
    return h("button", {
      title,
      "aria-label": title,
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      type: "button",
      onClick: togglePauseResume,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, h("g", {
      fill: "none",
      fillRule: "evenodd"
    }, h("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), h("path", {
      fill: "#FFF",
      d: isAllPaused ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
    }))));
  }
  function DoneBtn(props) {
    const {
      i18n,
      doneButtonHandler
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
      onClick: doneButtonHandler,
      "data-uppy-super-focusable": true
    }, i18n("done"));
  }
  function LoadingSpinner() {
    return h("svg", {
      className: "uppy-StatusBar-spinner",
      "aria-hidden": "true",
      focusable: "false",
      width: "14",
      height: "14"
    }, h("path", {
      d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
      fillRule: "evenodd"
    }));
  }
  function ProgressBarProcessing(props) {
    const {
      progress
    } = props;
    const {
      value: value2,
      mode,
      message
    } = progress;
    const roundedValue = Math.round(value2 * 100);
    const dot = `\xB7`;
    return h("div", {
      className: "uppy-StatusBar-content"
    }, h(LoadingSpinner, null), mode === "determinate" ? `${roundedValue}% ${dot} ` : "", message);
  }
  function ProgressDetails(props) {
    const {
      numUploads,
      complete,
      totalUploadedSize,
      totalSize,
      totalETA,
      i18n
    } = props;
    const ifShowFilesUploadedOfTotal = numUploads > 1;
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, ifShowFilesUploadedOfTotal && i18n("filesUploadedOfTotal", {
      complete,
      smart_count: numUploads
    }), h("span", {
      className: "uppy-StatusBar-additionalInfo"
    }, ifShowFilesUploadedOfTotal && renderDot(), i18n("dataUploadedOfTotal", {
      complete: (0, import_prettier_bytes2.default)(totalUploadedSize),
      total: (0, import_prettier_bytes2.default)(totalSize)
    }), renderDot(), i18n("xTimeLeft", {
      time: prettyETA(totalETA)
    })));
  }
  function FileUploadCount(props) {
    const {
      i18n,
      complete,
      numUploads
    } = props;
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, i18n("filesUploadedOfTotal", {
      complete,
      smart_count: numUploads
    }));
  }
  function UploadNewlyAddedFiles(props) {
    const {
      i18n,
      newFiles,
      startUpload
    } = props;
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, h("div", {
      className: "uppy-StatusBar-statusSecondaryHint"
    }, i18n("xMoreFilesAdded", {
      smart_count: newFiles
    })), h("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
        smart_count: newFiles
      }),
      onClick: startUpload
    }, i18n("upload")));
  }
  function ProgressBarUploading(props) {
    const {
      i18n,
      supportsUploadProgress: supportsUploadProgress2,
      totalProgress,
      showProgressDetails,
      isUploadStarted,
      isAllComplete,
      isAllPaused,
      newFiles,
      numUploads,
      complete,
      totalUploadedSize,
      totalSize,
      totalETA,
      startUpload
    } = props;
    const showUploadNewlyAddedFiles = newFiles && isUploadStarted;
    if (!isUploadStarted || isAllComplete) {
      return null;
    }
    const title = isAllPaused ? i18n("paused") : i18n("uploading");
    function renderProgressDetails() {
      if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
        if (supportsUploadProgress2) {
          return h(ThrottledProgressDetails, {
            numUploads,
            complete,
            totalUploadedSize,
            totalSize,
            totalETA,
            i18n
          });
        }
        return h(FileUploadCount, {
          i18n,
          complete,
          numUploads
        });
      }
      return null;
    }
    return h("div", {
      className: "uppy-StatusBar-content",
      "aria-label": title,
      title
    }, !isAllPaused ? h(LoadingSpinner, null) : null, h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, supportsUploadProgress2 ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? h(UploadNewlyAddedFiles, {
      i18n,
      newFiles,
      startUpload
    }) : null));
  }
  function ProgressBarComplete(props) {
    const {
      i18n
    } = props;
    return h("div", {
      className: "uppy-StatusBar-content",
      role: "status",
      title: i18n("complete")
    }, h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "15",
      height: "11",
      viewBox: "0 0 15 11"
    }, h("path", {
      d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
    })), i18n("complete"))));
  }
  function ProgressBarError(props) {
    const {
      error,
      i18n,
      complete,
      numUploads
    } = props;
    function displayErrorAlert() {
      const errorMessage = `${i18n("uploadFailed")} 

 ${error}`;
      alert(errorMessage);
    }
    return h("div", {
      className: "uppy-StatusBar-content",
      title: i18n("uploadFailed")
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "11",
      height: "11",
      viewBox: "0 0 11 11"
    }, h("path", {
      d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
    })), h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, i18n("uploadFailed"), h("button", {
      className: "uppy-u-reset uppy-StatusBar-details",
      "aria-label": i18n("showErrorDetails"),
      "data-microtip-position": "top-right",
      "data-microtip-size": "medium",
      onClick: displayErrorAlert,
      type: "button"
    }, "?")), h(FileUploadCount, {
      i18n,
      complete,
      numUploads
    })));
  }
  var import_classnames, import_lodash2, import_prettier_bytes2, DOT, renderDot, ThrottledProgressDetails;
  var init_Components = __esm({
    "../packages/@uppy/status-bar/lib/Components.js"() {
      init_preact_module();
      import_classnames = __toESM(require_classnames(), 1);
      import_lodash2 = __toESM(require_lodash(), 1);
      import_prettier_bytes2 = __toESM(require_prettierBytes(), 1);
      init_prettyETA();
      init_StatusBarStates();
      DOT = `\xB7`;
      renderDot = () => ` ${DOT} `;
      ThrottledProgressDetails = (0, import_lodash2.default)(ProgressDetails, 500, {
        leading: true,
        trailing: true
      });
    }
  });

  // ../packages/@uppy/status-bar/lib/StatusBarUI.js
  function StatusBar(props) {
    const {
      newFiles,
      allowNewUpload,
      isUploadInProgress,
      isAllPaused,
      resumableUploads,
      error,
      hideUploadButton,
      hidePauseResumeButton,
      hideCancelButton,
      hideRetryButton,
      recoveredState,
      uploadState,
      totalProgress,
      files,
      supportsUploadProgress: supportsUploadProgress2,
      hideAfterFinish,
      isSomeGhost,
      doneButtonHandler,
      isUploadStarted,
      i18n,
      startUpload,
      uppy,
      isAllComplete,
      showProgressDetails,
      numUploads,
      complete,
      totalSize,
      totalETA,
      totalUploadedSize
    } = props;
    function getProgressValue() {
      switch (uploadState) {
        case STATE_POSTPROCESSING:
        case STATE_PREPROCESSING: {
          const progress = calculateProcessingProgress(files);
          if (progress.mode === "determinate") {
            return progress.value * 100;
          }
          return totalProgress;
        }
        case STATE_ERROR: {
          return null;
        }
        case STATE_UPLOADING: {
          if (!supportsUploadProgress2) {
            return null;
          }
          return totalProgress;
        }
        default:
          return totalProgress;
      }
    }
    function getIsIndeterminate() {
      switch (uploadState) {
        case STATE_POSTPROCESSING:
        case STATE_PREPROCESSING: {
          const {
            mode
          } = calculateProcessingProgress(files);
          return mode === "indeterminate";
        }
        case STATE_UPLOADING: {
          if (!supportsUploadProgress2) {
            return true;
          }
          return false;
        }
        default:
          return false;
      }
    }
    function getIsHidden() {
      if (recoveredState) {
        return false;
      }
      switch (uploadState) {
        case STATE_WAITING:
          return hideUploadButton || newFiles === 0;
        case STATE_COMPLETE:
          return hideAfterFinish;
        default:
          return false;
      }
    }
    const progressValue = getProgressValue();
    const isHidden = getIsHidden();
    const width = progressValue != null ? progressValue : 100;
    const showUploadBtn = !error && newFiles && !isUploadInProgress && !isAllPaused && allowNewUpload && !hideUploadButton;
    const showCancelBtn = !hideCancelButton && uploadState !== STATE_WAITING && uploadState !== STATE_COMPLETE;
    const showPauseResumeBtn = resumableUploads && !hidePauseResumeButton && uploadState === STATE_UPLOADING;
    const showRetryBtn = error && !isAllComplete && !hideRetryButton;
    const showDoneBtn = doneButtonHandler && uploadState === STATE_COMPLETE;
    const progressClassNames = (0, import_classnames2.default)("uppy-StatusBar-progress", {
      "is-indeterminate": getIsIndeterminate()
    });
    const statusBarClassNames = (0, import_classnames2.default)("uppy-StatusBar", `is-${uploadState}`, {
      "has-ghosts": isSomeGhost
    });
    return h("div", {
      className: statusBarClassNames,
      "aria-hidden": isHidden
    }, h("div", {
      className: progressClassNames,
      style: {
        width: `${width}%`
      },
      role: "progressbar",
      "aria-label": `${width}%`,
      "aria-valuetext": `${width}%`,
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": progressValue
    }), (() => {
      switch (uploadState) {
        case STATE_PREPROCESSING:
        case STATE_POSTPROCESSING:
          return h(ProgressBarProcessing, {
            progress: calculateProcessingProgress(files)
          });
        case STATE_COMPLETE:
          return h(ProgressBarComplete, {
            i18n
          });
        case STATE_ERROR:
          return h(ProgressBarError, {
            error,
            i18n,
            numUploads,
            complete
          });
        case STATE_UPLOADING:
          return h(ProgressBarUploading, {
            i18n,
            supportsUploadProgress: supportsUploadProgress2,
            totalProgress,
            showProgressDetails,
            isUploadStarted,
            isAllComplete,
            isAllPaused,
            newFiles,
            numUploads,
            complete,
            totalUploadedSize,
            totalSize,
            totalETA,
            startUpload
          });
        default:
          return null;
      }
    })(), h("div", {
      className: "uppy-StatusBar-actions"
    }, recoveredState || showUploadBtn ? h(UploadBtn, {
      newFiles,
      isUploadStarted,
      recoveredState,
      i18n,
      isSomeGhost,
      startUpload,
      uploadState
    }) : null, showRetryBtn ? h(RetryBtn, {
      i18n,
      uppy
    }) : null, showPauseResumeBtn ? h(PauseResumeButton, {
      isAllPaused,
      i18n,
      isAllComplete,
      resumableUploads,
      uppy
    }) : null, showCancelBtn ? h(CancelBtn, {
      i18n,
      uppy
    }) : null, showDoneBtn ? h(DoneBtn, {
      i18n,
      doneButtonHandler
    }) : null));
  }
  var import_classnames2, STATE_ERROR, STATE_WAITING, STATE_PREPROCESSING, STATE_UPLOADING, STATE_POSTPROCESSING, STATE_COMPLETE;
  var init_StatusBarUI = __esm({
    "../packages/@uppy/status-bar/lib/StatusBarUI.js"() {
      init_preact_module();
      import_classnames2 = __toESM(require_classnames(), 1);
      init_StatusBarStates();
      init_calculateProcessingProgress();
      init_Components();
      ({
        STATE_ERROR,
        STATE_WAITING,
        STATE_PREPROCESSING,
        STATE_UPLOADING,
        STATE_POSTPROCESSING,
        STATE_COMPLETE
      } = StatusBarStates_default);
    }
  });

  // ../packages/@uppy/status-bar/lib/locale.js
  var locale_default2;
  var init_locale2 = __esm({
    "../packages/@uppy/status-bar/lib/locale.js"() {
      locale_default2 = {
        strings: {
          uploading: "Uploading",
          complete: "Complete",
          uploadFailed: "Upload failed",
          paused: "Paused",
          retry: "Retry",
          cancel: "Cancel",
          pause: "Pause",
          resume: "Resume",
          done: "Done",
          filesUploadedOfTotal: {
            0: "%{complete} of %{smart_count} file uploaded",
            1: "%{complete} of %{smart_count} files uploaded"
          },
          dataUploadedOfTotal: "%{complete} of %{total}",
          xTimeLeft: "%{time} left",
          uploadXFiles: {
            0: "Upload %{smart_count} file",
            1: "Upload %{smart_count} files"
          },
          uploadXNewFiles: {
            0: "Upload +%{smart_count} file",
            1: "Upload +%{smart_count} files"
          },
          upload: "Upload",
          retryUpload: "Retry upload",
          xMoreFilesAdded: {
            0: "%{smart_count} more file added",
            1: "%{smart_count} more files added"
          },
          showErrorDetails: "Show error details"
        }
      };
    }
  });

  // ../packages/@uppy/status-bar/lib/StatusBar.js
  function getTotalSpeed(files) {
    let totalSpeed = 0;
    files.forEach((file) => {
      totalSpeed += getSpeed(file.progress);
    });
    return totalSpeed;
  }
  function getTotalETA(files) {
    const totalSpeed = getTotalSpeed(files);
    if (totalSpeed === 0) {
      return 0;
    }
    const totalBytesRemaining = files.reduce((total, file) => {
      return total + getBytesRemaining(file.progress);
    }, 0);
    return Math.round(totalBytesRemaining / totalSpeed * 10) / 10;
  }
  function getUploadingState(error, isAllComplete, recoveredState, files) {
    if (error && !isAllComplete) {
      return StatusBarStates_default.STATE_ERROR;
    }
    if (isAllComplete) {
      return StatusBarStates_default.STATE_COMPLETE;
    }
    if (recoveredState) {
      return StatusBarStates_default.STATE_WAITING;
    }
    let state = StatusBarStates_default.STATE_WAITING;
    const fileIDs = Object.keys(files);
    for (let i4 = 0; i4 < fileIDs.length; i4++) {
      const {
        progress
      } = files[fileIDs[i4]];
      if (progress.uploadStarted && !progress.uploadComplete) {
        return StatusBarStates_default.STATE_UPLOADING;
      }
      if (progress.preprocess && state !== StatusBarStates_default.STATE_UPLOADING) {
        state = StatusBarStates_default.STATE_PREPROCESSING;
      }
      if (progress.postprocess && state !== StatusBarStates_default.STATE_UPLOADING && state !== StatusBarStates_default.STATE_PREPROCESSING) {
        state = StatusBarStates_default.STATE_POSTPROCESSING;
      }
    }
    return state;
  }
  var packageJson4, StatusBar2;
  var init_StatusBar = __esm({
    "../packages/@uppy/status-bar/lib/StatusBar.js"() {
      init_lib2();
      init_getSpeed();
      init_getBytesRemaining();
      init_getTextDirection();
      init_StatusBarStates();
      init_StatusBarUI();
      init_locale2();
      packageJson4 = {
        "version": "3.0.0-beta.3"
      };
      StatusBar2 = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.startUpload = () => {
            const {
              recoveredState
            } = this.uppy.getState();
            if (recoveredState) {
              this.uppy.emit("restore-confirmed");
              return void 0;
            }
            return this.uppy.upload().catch(() => {
            });
          };
          this.id = this.opts.id || "StatusBar";
          this.title = "StatusBar";
          this.type = "progressindicator";
          this.defaultLocale = locale_default2;
          const defaultOptions4 = {
            target: "body",
            hideUploadButton: false,
            hideRetryButton: false,
            hidePauseResumeButton: false,
            hideCancelButton: false,
            showProgressDetails: false,
            hideAfterFinish: true,
            doneButtonHandler: null
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.i18nInit();
          this.render = this.render.bind(this);
          this.install = this.install.bind(this);
        }
        render(state) {
          const {
            capabilities,
            files,
            allowNewUpload,
            totalProgress,
            error,
            recoveredState
          } = state;
          const {
            newFiles,
            startedFiles,
            completeFiles,
            inProgressNotPausedFiles,
            isUploadStarted,
            isAllComplete,
            isAllErrored,
            isAllPaused,
            isUploadInProgress,
            isSomeGhost
          } = this.uppy.getObjectOfFilesPerState();
          const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
          const totalETA = getTotalETA(inProgressNotPausedFiles);
          const resumableUploads = !!capabilities.resumableUploads;
          const supportsUploadProgress2 = capabilities.uploadProgress !== false;
          let totalSize = 0;
          let totalUploadedSize = 0;
          startedFiles.forEach((file) => {
            totalSize += file.progress.bytesTotal || 0;
            totalUploadedSize += file.progress.bytesUploaded || 0;
          });
          return StatusBar({
            error,
            uploadState: getUploadingState(error, isAllComplete, recoveredState, state.files || {}),
            allowNewUpload,
            totalProgress,
            totalSize,
            totalUploadedSize,
            isAllComplete: false,
            isAllPaused,
            isAllErrored,
            isUploadStarted,
            isUploadInProgress,
            isSomeGhost,
            recoveredState,
            complete: completeFiles.length,
            newFiles: newFilesOrRecovered.length,
            numUploads: startedFiles.length,
            totalETA,
            files,
            i18n: this.i18n,
            uppy: this.uppy,
            startUpload: this.startUpload,
            doneButtonHandler: this.opts.doneButtonHandler,
            resumableUploads,
            supportsUploadProgress: supportsUploadProgress2,
            showProgressDetails: this.opts.showProgressDetails,
            hideUploadButton: this.opts.hideUploadButton,
            hideRetryButton: this.opts.hideRetryButton,
            hidePauseResumeButton: this.opts.hidePauseResumeButton,
            hideCancelButton: this.opts.hideCancelButton,
            hideAfterFinish: this.opts.hideAfterFinish,
            isTargetDOMEl: this.isTargetDOMEl
          });
        }
        onMount() {
          const element = this.el;
          const direction = getTextDirection_default(element);
          if (!direction) {
            element.dir = "ltr";
          }
        }
        install() {
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.unmount();
        }
      };
      StatusBar2.VERSION = packageJson4.version;
    }
  });

  // ../packages/@uppy/status-bar/lib/index.js
  var lib_exports3 = {};
  __export(lib_exports3, {
    default: () => StatusBar2
  });
  var init_lib4 = __esm({
    "../packages/@uppy/status-bar/lib/index.js"() {
      init_StatusBar();
    }
  });

  // ../packages/@uppy/robodog/lib/AttachFileInputs.js
  var require_AttachFileInputs = __commonJS({
    "../packages/@uppy/robodog/lib/AttachFileInputs.js"(exports, module) {
      var BasePlugin2 = (init_BasePlugin(), __toCommonJS(BasePlugin_exports));
      var toArray = (init_toArray(), __toCommonJS(toArray_exports));
      var findDOMElement2 = (init_findDOMElement(), __toCommonJS(findDOMElement_exports));
      var AttachFileInputs = class extends BasePlugin2 {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "AttachFileInputs";
          this.type = "acquirer";
          this.handleChange = this.handleChange.bind(this);
          this.inputs = null;
        }
        handleChange(event) {
          this.addFiles(event.target);
        }
        addFiles(input) {
          const files = toArray(input.files);
          files.forEach((file) => {
            try {
              this.uppy.addFile({
                source: this.id,
                name: file.name,
                type: file.type,
                data: file
              });
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
            }
          });
        }
        install() {
          this.el = findDOMElement2(this.opts.target);
          if (!this.el) {
            throw new Error("[AttachFileInputs] Target form does not exist");
          }
          const {
            restrictions
          } = this.uppy.opts;
          this.inputs = this.el.querySelectorAll('input[type="file"]');
          this.inputs.forEach((input) => {
            input.addEventListener("change", this.handleChange);
            if (!input.hasAttribute("multiple")) {
              if (restrictions.maxNumberOfFiles !== 1) {
                input.setAttribute("multiple", "multiple");
              } else {
                input.removeAttribute("multiple");
              }
            }
            if (!input.hasAttribute("accept") && restrictions.allowedFileTypes) {
              input.setAttribute("accept", restrictions.allowedFileTypes.join(","));
            }
            this.addFiles(input);
          });
        }
        uninstall() {
          this.inputs.forEach((input) => {
            input.removeEventListener("change", this.handleChange);
          });
          this.inputs = null;
        }
      };
      module.exports = AttachFileInputs;
    }
  });

  // ../packages/@uppy/robodog/lib/TransloaditFormResult.js
  var require_TransloaditFormResult = __commonJS({
    "../packages/@uppy/robodog/lib/TransloaditFormResult.js"(exports, module) {
      var BasePlugin2 = (init_BasePlugin(), __toCommonJS(BasePlugin_exports));
      var findDOMElement2 = (init_findDOMElement(), __toCommonJS(findDOMElement_exports));
      var TransloaditFormResult = class extends BasePlugin2 {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "TransloaditFormResult";
          this.type = "modifier";
          this.handleUpload = this.handleUpload.bind(this);
        }
        getAssemblyStatuses(fileIDs) {
          const assemblyIds = new Set(fileIDs.map((fileID) => {
            var _this$uppy$getFile, _this$uppy$getFile$tr;
            return (_this$uppy$getFile = this.uppy.getFile(fileID)) == null ? void 0 : (_this$uppy$getFile$tr = _this$uppy$getFile.transloadit) == null ? void 0 : _this$uppy$getFile$tr.assembly;
          }).filter(Boolean));
          const tl = this.uppy.getPlugin(this.opts.transloaditPluginId || "Transloadit");
          return Array.from(assemblyIds, (id21) => tl.getAssembly(id21));
        }
        handleUpload(fileIDs) {
          const assemblies = this.getAssemblyStatuses(fileIDs);
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = this.opts.name;
          input.value = JSON.stringify(assemblies);
          const target = findDOMElement2(this.opts.target);
          target.appendChild(input);
        }
        install() {
          this.uppy.addPostProcessor(this.handleUpload);
        }
        uninstall() {
          this.uppy.removePostProcessor(this.handleUpload);
        }
      };
      module.exports = TransloaditFormResult;
    }
  });

  // ../packages/@uppy/informer/lib/FadeIn.js
  var TRANSITION_MS, FadeIn;
  var init_FadeIn = __esm({
    "../packages/@uppy/informer/lib/FadeIn.js"() {
      init_preact_module();
      TRANSITION_MS = 300;
      FadeIn = class extends d {
        constructor() {
          super(...arguments);
          this.ref = y();
        }
        componentWillEnter(callback) {
          this.ref.current.style.opacity = "1";
          this.ref.current.style.transform = "none";
          setTimeout(callback, TRANSITION_MS);
        }
        componentWillLeave(callback) {
          this.ref.current.style.opacity = "0";
          this.ref.current.style.transform = "translateY(350%)";
          setTimeout(callback, TRANSITION_MS);
        }
        render() {
          const {
            children
          } = this.props;
          return h("div", {
            className: "uppy-Informer-animated",
            ref: this.ref
          }, children);
        }
      };
    }
  });

  // ../packages/@uppy/informer/lib/TransitionGroup.js
  function assign(obj, props) {
    return Object.assign(obj, props);
  }
  function getKey(vnode, fallback) {
    var _vnode$key;
    return (_vnode$key = vnode == null ? void 0 : vnode.key) != null ? _vnode$key : fallback;
  }
  function linkRef(component, name) {
    const cache2 = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
    return cache2[name] || (cache2[name] = (c3) => {
      component.refs[name] = c3;
    });
  }
  function getChildMapping(children) {
    const out = {};
    for (let i4 = 0; i4 < children.length; i4++) {
      if (children[i4] != null) {
        const key = getKey(children[i4], i4.toString(36));
        out[key] = children[i4];
      }
    }
    return out;
  }
  function mergeChildMappings(prev2, next) {
    prev2 = prev2 || {};
    next = next || {};
    const getValueForKey = (key) => next.hasOwnProperty(key) ? next[key] : prev2[key];
    const nextKeysPending = {};
    let pendingKeys = [];
    for (const prevKey in prev2) {
      if (next.hasOwnProperty(prevKey)) {
        if (pendingKeys.length) {
          nextKeysPending[prevKey] = pendingKeys;
          pendingKeys = [];
        }
      } else {
        pendingKeys.push(prevKey);
      }
    }
    const childMapping = {};
    for (const nextKey in next) {
      if (nextKeysPending.hasOwnProperty(nextKey)) {
        for (let i4 = 0; i4 < nextKeysPending[nextKey].length; i4++) {
          const pendingNextKey = nextKeysPending[nextKey][i4];
          childMapping[nextKeysPending[nextKey][i4]] = getValueForKey(pendingNextKey);
        }
      }
      childMapping[nextKey] = getValueForKey(nextKey);
    }
    for (let i4 = 0; i4 < pendingKeys.length; i4++) {
      childMapping[pendingKeys[i4]] = getValueForKey(pendingKeys[i4]);
    }
    return childMapping;
  }
  var identity, TransitionGroup, TransitionGroup_default;
  var init_TransitionGroup = __esm({
    "../packages/@uppy/informer/lib/TransitionGroup.js"() {
      init_preact_module();
      identity = (i4) => i4;
      TransitionGroup = class extends d {
        constructor(props, context) {
          super(props, context);
          this.refs = {};
          this.state = {
            children: getChildMapping(x(x(this.props.children)) || [])
          };
          this.performAppear = this.performAppear.bind(this);
          this.performEnter = this.performEnter.bind(this);
          this.performLeave = this.performLeave.bind(this);
        }
        componentWillMount() {
          this.currentlyTransitioningKeys = {};
          this.keysToAbortLeave = [];
          this.keysToEnter = [];
          this.keysToLeave = [];
        }
        componentDidMount() {
          const initialChildMapping = this.state.children;
          for (const key in initialChildMapping) {
            if (initialChildMapping[key]) {
              this.performAppear(key);
            }
          }
        }
        componentWillReceiveProps(nextProps) {
          const nextChildMapping = getChildMapping(x(nextProps.children) || []);
          const prevChildMapping = this.state.children;
          this.setState((prevState) => ({
            children: mergeChildMappings(prevState.children, nextChildMapping)
          }));
          let key;
          for (key in nextChildMapping) {
            if (nextChildMapping.hasOwnProperty(key)) {
              const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
              if (nextChildMapping[key] && hasPrev && this.currentlyTransitioningKeys[key]) {
                this.keysToEnter.push(key);
                this.keysToAbortLeave.push(key);
              } else if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
                this.keysToEnter.push(key);
              }
            }
          }
          for (key in prevChildMapping) {
            if (prevChildMapping.hasOwnProperty(key)) {
              const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
              if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
                this.keysToLeave.push(key);
              }
            }
          }
        }
        componentDidUpdate() {
          const {
            keysToEnter
          } = this;
          this.keysToEnter = [];
          keysToEnter.forEach(this.performEnter);
          const {
            keysToLeave
          } = this;
          this.keysToLeave = [];
          keysToLeave.forEach(this.performLeave);
        }
        _finishAbort(key) {
          const idx = this.keysToAbortLeave.indexOf(key);
          if (idx !== -1) {
            this.keysToAbortLeave.splice(idx, 1);
          }
        }
        performAppear(key) {
          this.currentlyTransitioningKeys[key] = true;
          const component = this.refs[key];
          if (component.componentWillAppear) {
            component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
          } else {
            this._handleDoneAppearing(key);
          }
        }
        _handleDoneAppearing(key) {
          const component = this.refs[key];
          if (component.componentDidAppear) {
            component.componentDidAppear();
          }
          delete this.currentlyTransitioningKeys[key];
          this._finishAbort(key);
          const currentChildMapping = getChildMapping(x(this.props.children) || []);
          if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
            this.performLeave(key);
          }
        }
        performEnter(key) {
          this.currentlyTransitioningKeys[key] = true;
          const component = this.refs[key];
          if (component.componentWillEnter) {
            component.componentWillEnter(this._handleDoneEntering.bind(this, key));
          } else {
            this._handleDoneEntering(key);
          }
        }
        _handleDoneEntering(key) {
          const component = this.refs[key];
          if (component.componentDidEnter) {
            component.componentDidEnter();
          }
          delete this.currentlyTransitioningKeys[key];
          this._finishAbort(key);
          const currentChildMapping = getChildMapping(x(this.props.children) || []);
          if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
            this.performLeave(key);
          }
        }
        performLeave(key) {
          const idx = this.keysToAbortLeave.indexOf(key);
          if (idx !== -1) {
            return;
          }
          this.currentlyTransitioningKeys[key] = true;
          const component = this.refs[key];
          if (component.componentWillLeave) {
            component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
          } else {
            this._handleDoneLeaving(key);
          }
        }
        _handleDoneLeaving(key) {
          const idx = this.keysToAbortLeave.indexOf(key);
          if (idx !== -1) {
            return;
          }
          const component = this.refs[key];
          if (component.componentDidLeave) {
            component.componentDidLeave();
          }
          delete this.currentlyTransitioningKeys[key];
          const currentChildMapping = getChildMapping(x(this.props.children) || []);
          if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
            this.performEnter(key);
          } else {
            const children = assign({}, this.state.children);
            delete children[key];
            this.setState({
              children
            });
          }
        }
        render(_ref, _ref2) {
          let {
            childFactory,
            transitionLeave,
            transitionName: transitionName2,
            transitionAppear,
            transitionEnter,
            transitionLeaveTimeout,
            transitionEnterTimeout,
            transitionAppearTimeout,
            component,
            ...props
          } = _ref;
          let {
            children
          } = _ref2;
          const childrenToRender = Object.entries(children).map((_ref3) => {
            let [key, child] = _ref3;
            if (!child)
              return void 0;
            const ref = linkRef(this, key);
            return q(childFactory(child), {
              ref,
              key
            });
          }).filter(Boolean);
          return h(component, props, childrenToRender);
        }
      };
      TransitionGroup.defaultProps = {
        component: "span",
        childFactory: identity
      };
      TransitionGroup_default = TransitionGroup;
    }
  });

  // ../packages/@uppy/informer/lib/Informer.js
  var packageJson5, Informer;
  var init_Informer = __esm({
    "../packages/@uppy/informer/lib/Informer.js"() {
      init_preact_module();
      init_lib2();
      init_FadeIn();
      init_TransitionGroup();
      packageJson5 = {
        "version": "3.0.0-beta.3"
      };
      Informer = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.render = (state) => {
            return h("div", {
              className: "uppy uppy-Informer"
            }, h(TransitionGroup_default, null, state.info.map((info) => h(FadeIn, {
              key: info.message
            }, h("p", {
              role: "alert"
            }, info.message, " ", info.details && h("span", {
              "aria-label": info.details,
              "data-microtip-position": "top-left",
              "data-microtip-size": "medium",
              role: "tooltip",
              onClick: () => alert(`${info.message} 

 ${info.details}`)
            }, "?"))))));
          };
          this.type = "progressindicator";
          this.id = this.opts.id || "Informer";
          this.title = "Informer";
          const defaultOptions4 = {};
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
        }
        install() {
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
      };
      Informer.VERSION = packageJson5.version;
    }
  });

  // ../packages/@uppy/informer/lib/index.js
  var init_lib5 = __esm({
    "../packages/@uppy/informer/lib/index.js"() {
      init_Informer();
    }
  });

  // ../packages/@uppy/utils/lib/dataURItoBlob.js
  function dataURItoBlob(dataURI, opts, toFile) {
    var _ref, _opts$mimeType;
    const dataURIData = DATA_URL_PATTERN.exec(dataURI);
    const mimeType = (_ref = (_opts$mimeType = opts.mimeType) != null ? _opts$mimeType : dataURIData == null ? void 0 : dataURIData[1]) != null ? _ref : "plain/text";
    let data;
    if (dataURIData[2] != null) {
      const binary = atob(decodeURIComponent(dataURIData[3]));
      const bytes = new Uint8Array(binary.length);
      for (let i4 = 0; i4 < binary.length; i4++) {
        bytes[i4] = binary.charCodeAt(i4);
      }
      data = [bytes];
    } else {
      data = [decodeURIComponent(dataURIData[3])];
    }
    if (toFile) {
      return new File(data, opts.name || "", {
        type: mimeType
      });
    }
    return new Blob(data, {
      type: mimeType
    });
  }
  var DATA_URL_PATTERN;
  var init_dataURItoBlob = __esm({
    "../packages/@uppy/utils/lib/dataURItoBlob.js"() {
      DATA_URL_PATTERN = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
    }
  });

  // ../packages/@uppy/utils/lib/isObjectURL.js
  function isObjectURL(url2) {
    return url2.startsWith("blob:");
  }
  var init_isObjectURL = __esm({
    "../packages/@uppy/utils/lib/isObjectURL.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/isPreviewSupported.js
  function isPreviewSupported(fileType) {
    if (!fileType)
      return false;
    return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
  }
  var init_isPreviewSupported = __esm({
    "../packages/@uppy/utils/lib/isPreviewSupported.js"() {
    }
  });

  // ../node_modules/exifr/dist/mini.umd.js
  var require_mini_umd = __commonJS({
    "../node_modules/exifr/dist/mini.umd.js"(exports) {
      "use strict";
      function e3(e4, t4, i5) {
        return t4 in e4 ? Object.defineProperty(e4, t4, {
          value: i5,
          enumerable: true,
          configurable: true,
          writable: true
        }) : e4[t4] = i5, e4;
      }
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var t3 = "undefined" != typeof self ? self : global;
      var i4 = "undefined" != typeof navigator;
      var s3 = i4 && "undefined" == typeof HTMLImageElement;
      var n2 = !("undefined" == typeof global || "undefined" == typeof process || !process.versions || !process.versions.node);
      var r3 = !!t3.Buffer;
      var a3 = (e4) => void 0 !== e4;
      function h2(e4) {
        return void 0 === e4 || (e4 instanceof Map ? 0 === e4.size : 0 === Object.values(e4).filter(a3).length);
      }
      function f3(e4) {
        let t4 = new Error(e4);
        throw delete t4.stack, t4;
      }
      function o3(e4) {
        let t4 = function(e5) {
          let t5 = 0;
          return e5.ifd0.enabled && (t5 += 1024), e5.exif.enabled && (t5 += 2048), e5.makerNote && (t5 += 2048), e5.userComment && (t5 += 1024), e5.gps.enabled && (t5 += 512), e5.interop.enabled && (t5 += 100), e5.ifd1.enabled && (t5 += 1024), t5 + 2048;
        }(e4);
        return e4.jfif.enabled && (t4 += 50), e4.xmp.enabled && (t4 += 2e4), e4.iptc.enabled && (t4 += 14e3), e4.icc.enabled && (t4 += 6e3), t4;
      }
      var l3 = (e4) => String.fromCharCode.apply(null, e4);
      var d2 = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;
      var u3 = class {
        static from(e4, t4) {
          return e4 instanceof this && e4.le === t4 ? e4 : new u3(e4, void 0, void 0, t4);
        }
        constructor(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i5 = arguments.length > 2 ? arguments[2] : void 0, s4 = arguments.length > 3 ? arguments[3] : void 0;
          if ("boolean" == typeof s4 && (this.le = s4), Array.isArray(e4) && (e4 = new Uint8Array(e4)), 0 === e4)
            this.byteOffset = 0, this.byteLength = 0;
          else if (e4 instanceof ArrayBuffer) {
            void 0 === i5 && (i5 = e4.byteLength - t4);
            let s5 = new DataView(e4, t4, i5);
            this._swapDataView(s5);
          } else if (e4 instanceof Uint8Array || e4 instanceof DataView || e4 instanceof u3) {
            void 0 === i5 && (i5 = e4.byteLength - t4), t4 += e4.byteOffset, t4 + i5 > e4.byteOffset + e4.byteLength && f3("Creating view outside of available memory in ArrayBuffer");
            let s5 = new DataView(e4.buffer, t4, i5);
            this._swapDataView(s5);
          } else if ("number" == typeof e4) {
            let t5 = new DataView(new ArrayBuffer(e4));
            this._swapDataView(t5);
          } else
            f3("Invalid input argument for BufferView: " + e4);
        }
        _swapArrayBuffer(e4) {
          this._swapDataView(new DataView(e4));
        }
        _swapBuffer(e4) {
          this._swapDataView(new DataView(e4.buffer, e4.byteOffset, e4.byteLength));
        }
        _swapDataView(e4) {
          this.dataView = e4, this.buffer = e4.buffer, this.byteOffset = e4.byteOffset, this.byteLength = e4.byteLength;
        }
        _lengthToEnd(e4) {
          return this.byteLength - e4;
        }
        set(e4, t4) {
          let i5 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : u3;
          return e4 instanceof DataView || e4 instanceof u3 ? e4 = new Uint8Array(e4.buffer, e4.byteOffset, e4.byteLength) : e4 instanceof ArrayBuffer && (e4 = new Uint8Array(e4)), e4 instanceof Uint8Array || f3("BufferView.set(): Invalid data argument."), this.toUint8().set(e4, t4), new i5(this, t4, e4.byteLength);
        }
        subarray(e4, t4) {
          return t4 = t4 || this._lengthToEnd(e4), new u3(this, e4, t4);
        }
        toUint8() {
          return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
        }
        getUint8Array(e4, t4) {
          return new Uint8Array(this.buffer, this.byteOffset + e4, t4);
        }
        getString() {
          let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength, i5 = this.getUint8Array(e4, t4);
          return s4 = i5, d2 ? d2.decode(s4) : r3 ? Buffer.from(s4).toString("utf8") : decodeURIComponent(escape(l3(s4)));
          var s4;
        }
        getLatin1String() {
          let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength, i5 = this.getUint8Array(e4, t4);
          return l3(i5);
        }
        getUnicodeString() {
          let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength;
          const i5 = [];
          for (let s4 = 0; s4 < t4 && e4 + s4 < this.byteLength; s4 += 2)
            i5.push(this.getUint16(e4 + s4));
          return l3(i5);
        }
        getInt8(e4) {
          return this.dataView.getInt8(e4);
        }
        getUint8(e4) {
          return this.dataView.getUint8(e4);
        }
        getInt16(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getInt16(e4, t4);
        }
        getInt32(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getInt32(e4, t4);
        }
        getUint16(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getUint16(e4, t4);
        }
        getUint32(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getUint32(e4, t4);
        }
        getFloat32(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getFloat32(e4, t4);
        }
        getFloat64(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getFloat64(e4, t4);
        }
        getFloat(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getFloat32(e4, t4);
        }
        getDouble(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
          return this.dataView.getFloat64(e4, t4);
        }
        getUintBytes(e4, t4, i5) {
          switch (t4) {
            case 1:
              return this.getUint8(e4, i5);
            case 2:
              return this.getUint16(e4, i5);
            case 4:
              return this.getUint32(e4, i5);
            case 8:
              return this.getUint64 && this.getUint64(e4, i5);
          }
        }
        getUint(e4, t4, i5) {
          switch (t4) {
            case 8:
              return this.getUint8(e4, i5);
            case 16:
              return this.getUint16(e4, i5);
            case 32:
              return this.getUint32(e4, i5);
            case 64:
              return this.getUint64 && this.getUint64(e4, i5);
          }
        }
        toString(e4) {
          return this.dataView.toString(e4, this.constructor.name);
        }
        ensureChunk() {
        }
      };
      function p3(e4, t4) {
        f3(`${e4} '${t4}' was not loaded, try using full build of exifr.`);
      }
      var c3 = class extends Map {
        constructor(e4) {
          super(), this.kind = e4;
        }
        get(e4, t4) {
          return this.has(e4) || p3(this.kind, e4), t4 && (e4 in t4 || function(e5, t5) {
            f3(`Unknown ${e5} '${t5}'.`);
          }(this.kind, e4), t4[e4].enabled || p3(this.kind, e4)), super.get(e4);
        }
        keyList() {
          return Array.from(this.keys());
        }
      };
      var g3 = new c3("file parser");
      var m3 = new c3("segment parser");
      var b3 = new c3("file reader");
      var y2 = t3.fetch;
      function w3(e4, t4) {
        return (s4 = e4).startsWith("data:") || s4.length > 1e4 ? v3(e4, t4, "base64") : n2 && e4.includes("://") ? k3(e4, t4, "url", S) : n2 ? v3(e4, t4, "fs") : i4 ? k3(e4, t4, "url", S) : void f3("Invalid input argument");
        var s4;
      }
      async function k3(e4, t4, i5, s4) {
        return b3.has(i5) ? v3(e4, t4, i5) : s4 ? async function(e5, t5) {
          let i6 = await t5(e5);
          return new u3(i6);
        }(e4, s4) : void f3(`Parser ${i5} is not loaded`);
      }
      async function v3(e4, t4, i5) {
        let s4 = new (b3.get(i5))(e4, t4);
        return await s4.read(), s4;
      }
      var S = (e4) => y2(e4).then((e5) => e5.arrayBuffer());
      var O2 = (e4) => new Promise((t4, i5) => {
        let s4 = new FileReader();
        s4.onloadend = () => t4(s4.result || new ArrayBuffer()), s4.onerror = i5, s4.readAsArrayBuffer(e4);
      });
      var U = /* @__PURE__ */ new Map();
      var A2 = /* @__PURE__ */ new Map();
      var I2 = /* @__PURE__ */ new Map();
      var x2 = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"];
      var B = ["jfif", "xmp", "icc", "iptc", "ihdr"];
      var T2 = ["tiff", ...B];
      var V = ["ifd0", "ifd1", "exif", "gps", "interop"];
      var C2 = [...T2, ...V];
      var F2 = ["makerNote", "userComment"];
      var P2 = ["translateKeys", "translateValues", "reviveValues", "multiSegment"];
      var L2 = [...P2, "sanitize", "mergeOutput", "silentErrors"];
      var z2 = class {
        get translate() {
          return this.translateKeys || this.translateValues || this.reviveValues;
        }
      };
      var j3 = class extends z2 {
        get needed() {
          return this.enabled || this.deps.size > 0;
        }
        constructor(t4, i5, s4, n3) {
          if (super(), e3(this, "enabled", false), e3(this, "skip", /* @__PURE__ */ new Set()), e3(this, "pick", /* @__PURE__ */ new Set()), e3(this, "deps", /* @__PURE__ */ new Set()), e3(this, "translateKeys", false), e3(this, "translateValues", false), e3(this, "reviveValues", false), this.key = t4, this.enabled = i5, this.parse = this.enabled, this.applyInheritables(n3), this.canBeFiltered = V.includes(t4), this.canBeFiltered && (this.dict = U.get(t4)), void 0 !== s4)
            if (Array.isArray(s4))
              this.parse = this.enabled = true, this.canBeFiltered && s4.length > 0 && this.translateTagSet(s4, this.pick);
            else if ("object" == typeof s4) {
              if (this.enabled = true, this.parse = false !== s4.parse, this.canBeFiltered) {
                let {
                  pick: e4,
                  skip: t5
                } = s4;
                e4 && e4.length > 0 && this.translateTagSet(e4, this.pick), t5 && t5.length > 0 && this.translateTagSet(t5, this.skip);
              }
              this.applyInheritables(s4);
            } else
              true === s4 || false === s4 ? this.parse = this.enabled = s4 : f3(`Invalid options argument: ${s4}`);
        }
        applyInheritables(e4) {
          let t4, i5;
          for (t4 of P2)
            i5 = e4[t4], void 0 !== i5 && (this[t4] = i5);
        }
        translateTagSet(e4, t4) {
          if (this.dict) {
            let i5, s4, {
              tagKeys: n3,
              tagValues: r4
            } = this.dict;
            for (i5 of e4)
              "string" == typeof i5 ? (s4 = r4.indexOf(i5), -1 === s4 && (s4 = n3.indexOf(Number(i5))), -1 !== s4 && t4.add(Number(n3[s4]))) : t4.add(i5);
          } else
            for (let i5 of e4)
              t4.add(i5);
        }
        finalizeFilters() {
          !this.enabled && this.deps.size > 0 ? (this.enabled = true, _3(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && _3(this.pick, this.deps);
        }
      };
      var M2 = {
        jfif: false,
        tiff: true,
        xmp: false,
        icc: false,
        iptc: false,
        ifd0: true,
        ifd1: false,
        exif: true,
        gps: true,
        interop: false,
        ihdr: void 0,
        makerNote: false,
        userComment: false,
        multiSegment: false,
        skip: [],
        pick: [],
        translateKeys: true,
        translateValues: true,
        reviveValues: true,
        sanitize: true,
        mergeOutput: true,
        silentErrors: true,
        chunked: true,
        firstChunkSize: void 0,
        firstChunkSizeNode: 512,
        firstChunkSizeBrowser: 65536,
        chunkSize: 65536,
        chunkLimit: 5
      };
      var E = /* @__PURE__ */ new Map();
      var N2 = class extends z2 {
        static useCached(e4) {
          let t4 = E.get(e4);
          return void 0 !== t4 || (t4 = new this(e4), E.set(e4, t4)), t4;
        }
        constructor(e4) {
          super(), true === e4 ? this.setupFromTrue() : void 0 === e4 ? this.setupFromUndefined() : Array.isArray(e4) ? this.setupFromArray(e4) : "object" == typeof e4 ? this.setupFromObject(e4) : f3(`Invalid options argument ${e4}`), void 0 === this.firstChunkSize && (this.firstChunkSize = i4 ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
        }
        setupFromUndefined() {
          let e4;
          for (e4 of x2)
            this[e4] = M2[e4];
          for (e4 of L2)
            this[e4] = M2[e4];
          for (e4 of F2)
            this[e4] = M2[e4];
          for (e4 of C2)
            this[e4] = new j3(e4, M2[e4], void 0, this);
        }
        setupFromTrue() {
          let e4;
          for (e4 of x2)
            this[e4] = M2[e4];
          for (e4 of L2)
            this[e4] = M2[e4];
          for (e4 of F2)
            this[e4] = true;
          for (e4 of C2)
            this[e4] = new j3(e4, true, void 0, this);
        }
        setupFromArray(e4) {
          let t4;
          for (t4 of x2)
            this[t4] = M2[t4];
          for (t4 of L2)
            this[t4] = M2[t4];
          for (t4 of F2)
            this[t4] = M2[t4];
          for (t4 of C2)
            this[t4] = new j3(t4, false, void 0, this);
          this.setupGlobalFilters(e4, void 0, V);
        }
        setupFromObject(e4) {
          let t4;
          for (t4 of (V.ifd0 = V.ifd0 || V.image, V.ifd1 = V.ifd1 || V.thumbnail, Object.assign(this, e4), x2))
            this[t4] = $2(e4[t4], M2[t4]);
          for (t4 of L2)
            this[t4] = $2(e4[t4], M2[t4]);
          for (t4 of F2)
            this[t4] = $2(e4[t4], M2[t4]);
          for (t4 of T2)
            this[t4] = new j3(t4, M2[t4], e4[t4], this);
          for (t4 of V)
            this[t4] = new j3(t4, M2[t4], e4[t4], this.tiff);
          this.setupGlobalFilters(e4.pick, e4.skip, V, C2), true === e4.tiff ? this.batchEnableWithBool(V, true) : false === e4.tiff ? this.batchEnableWithUserValue(V, e4) : Array.isArray(e4.tiff) ? this.setupGlobalFilters(e4.tiff, void 0, V) : "object" == typeof e4.tiff && this.setupGlobalFilters(e4.tiff.pick, e4.tiff.skip, V);
        }
        batchEnableWithBool(e4, t4) {
          for (let i5 of e4)
            this[i5].enabled = t4;
        }
        batchEnableWithUserValue(e4, t4) {
          for (let i5 of e4) {
            let e5 = t4[i5];
            this[i5].enabled = false !== e5 && void 0 !== e5;
          }
        }
        setupGlobalFilters(e4, t4, i5) {
          let s4 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : i5;
          if (e4 && e4.length) {
            for (let e5 of s4)
              this[e5].enabled = false;
            let t5 = D(e4, i5);
            for (let [e5, i6] of t5)
              _3(this[e5].pick, i6), this[e5].enabled = true;
          } else if (t4 && t4.length) {
            let e5 = D(t4, i5);
            for (let [t5, i6] of e5)
              _3(this[t5].skip, i6);
          }
        }
        filterNestedSegmentTags() {
          let {
            ifd0: e4,
            exif: t4,
            xmp: i5,
            iptc: s4,
            icc: n3
          } = this;
          this.makerNote ? t4.deps.add(37500) : t4.skip.add(37500), this.userComment ? t4.deps.add(37510) : t4.skip.add(37510), i5.enabled || e4.skip.add(700), s4.enabled || e4.skip.add(33723), n3.enabled || e4.skip.add(34675);
        }
        traverseTiffDependencyTree() {
          let {
            ifd0: e4,
            exif: t4,
            gps: i5,
            interop: s4
          } = this;
          s4.needed && (t4.deps.add(40965), e4.deps.add(40965)), t4.needed && e4.deps.add(34665), i5.needed && e4.deps.add(34853), this.tiff.enabled = V.some((e5) => true === this[e5].enabled) || this.makerNote || this.userComment;
          for (let e5 of V)
            this[e5].finalizeFilters();
        }
        get onlyTiff() {
          return !B.map((e4) => this[e4].enabled).some((e4) => true === e4) && this.tiff.enabled;
        }
        checkLoadedPlugins() {
          for (let e4 of T2)
            this[e4].enabled && !m3.has(e4) && p3("segment parser", e4);
        }
      };
      function D(e4, t4) {
        let i5, s4, n3, r4, a4 = [];
        for (n3 of t4) {
          for (r4 of (i5 = U.get(n3), s4 = [], i5))
            (e4.includes(r4[0]) || e4.includes(r4[1])) && s4.push(r4[0]);
          s4.length && a4.push([n3, s4]);
        }
        return a4;
      }
      function $2(e4, t4) {
        return void 0 !== e4 ? e4 : void 0 !== t4 ? t4 : void 0;
      }
      function _3(e4, t4) {
        for (let i5 of t4)
          e4.add(i5);
      }
      e3(N2, "default", M2);
      var X = class {
        constructor(t4) {
          e3(this, "parsers", {}), e3(this, "output", {}), e3(this, "errors", []), e3(this, "pushToErrors", (e4) => this.errors.push(e4)), this.options = N2.useCached(t4);
        }
        async read(e4) {
          this.file = await function(e5, t4) {
            return "string" == typeof e5 ? w3(e5, t4) : i4 && !s3 && e5 instanceof HTMLImageElement ? w3(e5.src, t4) : e5 instanceof Uint8Array || e5 instanceof ArrayBuffer || e5 instanceof DataView ? new u3(e5) : i4 && e5 instanceof Blob ? k3(e5, t4, "blob", O2) : void f3("Invalid input argument");
          }(e4, this.options);
        }
        setup() {
          if (this.fileParser)
            return;
          let {
            file: e4
          } = this, t4 = e4.getUint16(0);
          for (let [i5, s4] of g3)
            if (s4.canHandle(e4, t4))
              return this.fileParser = new s4(this.options, this.file, this.parsers), e4[i5] = true;
          this.file.close && this.file.close(), f3("Unknown file format");
        }
        async parse() {
          let {
            output: e4,
            errors: t4
          } = this;
          return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t4.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t4.length > 0 && (e4.errors = t4), h2(i5 = e4) ? void 0 : i5;
          var i5;
        }
        async executeParsers() {
          let {
            output: e4
          } = this;
          await this.fileParser.parse();
          let t4 = Object.values(this.parsers).map(async (t5) => {
            let i5 = await t5.parse();
            t5.assignToOutput(e4, i5);
          });
          this.options.silentErrors && (t4 = t4.map((e5) => e5.catch(this.pushToErrors))), await Promise.all(t4);
        }
        async extractThumbnail() {
          this.setup();
          let {
            options: e4,
            file: t4
          } = this, i5 = m3.get("tiff", e4);
          var s4;
          if (t4.tiff ? s4 = {
            start: 0,
            type: "tiff"
          } : t4.jpeg && (s4 = await this.fileParser.getOrFindSegment("tiff")), void 0 === s4)
            return;
          let n3 = await this.fileParser.ensureSegmentChunk(s4), r4 = this.parsers.tiff = new i5(n3, e4, t4), a4 = await r4.extractThumbnail();
          return t4.close && t4.close(), a4;
        }
      };
      var H2 = class {
        static findPosition(e4, t4) {
          let i5 = e4.getUint16(t4 + 2) + 2, s4 = "function" == typeof this.headerLength ? this.headerLength(e4, t4, i5) : this.headerLength, n3 = t4 + s4, r4 = i5 - s4;
          return {
            offset: t4,
            length: i5,
            headerLength: s4,
            start: n3,
            size: r4,
            end: n3 + r4
          };
        }
        static parse(e4) {
          let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return new this(e4, new N2({
            [this.type]: t4
          }), e4).parse();
        }
        normalizeInput(e4) {
          return e4 instanceof u3 ? e4 : new u3(e4);
        }
        constructor(t4) {
          let i5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s4 = arguments.length > 2 ? arguments[2] : void 0;
          e3(this, "errors", []), e3(this, "raw", /* @__PURE__ */ new Map()), e3(this, "handleError", (e4) => {
            if (!this.options.silentErrors)
              throw e4;
            this.errors.push(e4.message);
          }), this.chunk = this.normalizeInput(t4), this.file = s4, this.type = this.constructor.type, this.globalOptions = this.options = i5, this.localOptions = i5[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
        }
        translate() {
          this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
        }
        get output() {
          return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
        }
        translateBlock(e4, t4) {
          let i5 = I2.get(t4), s4 = A2.get(t4), n3 = U.get(t4), r4 = this.options[t4], a4 = r4.reviveValues && !!i5, h3 = r4.translateValues && !!s4, f4 = r4.translateKeys && !!n3, o4 = {};
          for (let [t5, r5] of e4)
            a4 && i5.has(t5) ? r5 = i5.get(t5)(r5) : h3 && s4.has(t5) && (r5 = this.translateValue(r5, s4.get(t5))), f4 && n3.has(t5) && (t5 = n3.get(t5) || t5), o4[t5] = r5;
          return o4;
        }
        translateValue(e4, t4) {
          return t4[e4] || t4.DEFAULT || e4;
        }
        assignToOutput(e4, t4) {
          this.assignObjectToOutput(e4, this.constructor.type, t4);
        }
        assignObjectToOutput(e4, t4, i5) {
          if (this.globalOptions.mergeOutput)
            return Object.assign(e4, i5);
          e4[t4] ? Object.assign(e4[t4], i5) : e4[t4] = i5;
        }
      };
      e3(H2, "headerLength", 4), e3(H2, "type", void 0), e3(H2, "multiSegment", false), e3(H2, "canHandle", () => false);
      function W(e4) {
        return 192 === e4 || 194 === e4 || 196 === e4 || 219 === e4 || 221 === e4 || 218 === e4 || 254 === e4;
      }
      function Y(e4) {
        return e4 >= 224 && e4 <= 239;
      }
      function G(e4, t4, i5) {
        for (let [s4, n3] of m3)
          if (n3.canHandle(e4, t4, i5))
            return s4;
      }
      var K = class extends class {
        constructor(t4, i5, s4) {
          e3(this, "errors", []), e3(this, "ensureSegmentChunk", async (e4) => {
            let t5 = e4.start, i6 = e4.size || 65536;
            if (this.file.chunked) {
              if (this.file.available(t5, i6))
                e4.chunk = this.file.subarray(t5, i6);
              else
                try {
                  e4.chunk = await this.file.readChunk(t5, i6);
                } catch (t6) {
                  f3(`Couldn't read segment: ${JSON.stringify(e4)}. ${t6.message}`);
                }
            } else
              this.file.byteLength > t5 + i6 ? e4.chunk = this.file.subarray(t5, i6) : void 0 === e4.size ? e4.chunk = this.file.subarray(t5) : f3("Segment unreachable: " + JSON.stringify(e4));
            return e4.chunk;
          }), this.extendOptions && this.extendOptions(t4), this.options = t4, this.file = i5, this.parsers = s4;
        }
        injectSegment(e4, t4) {
          this.options[e4].enabled && this.createParser(e4, t4);
        }
        createParser(e4, t4) {
          let i5 = new (m3.get(e4))(t4, this.options, this.file);
          return this.parsers[e4] = i5;
        }
        createParsers(e4) {
          for (let t4 of e4) {
            let {
              type: e5,
              chunk: i5
            } = t4, s4 = this.options[e5];
            if (s4 && s4.enabled) {
              let t5 = this.parsers[e5];
              t5 && t5.append || t5 || this.createParser(e5, i5);
            }
          }
        }
        async readSegments(e4) {
          let t4 = e4.map(this.ensureSegmentChunk);
          await Promise.all(t4);
        }
      } {
        constructor() {
          super(...arguments), e3(this, "appSegments", []), e3(this, "jpegSegments", []), e3(this, "unknownSegments", []);
        }
        static canHandle(e4, t4) {
          return 65496 === t4;
        }
        async parse() {
          await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
        }
        setupSegmentFinderArgs(e4) {
          true === e4 ? (this.findAll = true, this.wanted = new Set(m3.keyList())) : (e4 = void 0 === e4 ? m3.keyList().filter((e5) => this.options[e5].enabled) : e4.filter((e5) => this.options[e5].enabled && m3.has(e5)), this.findAll = false, this.remaining = new Set(e4), this.wanted = new Set(e4)), this.unfinishedMultiSegment = false;
        }
        async findAppSegments() {
          let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t4 = arguments.length > 1 ? arguments[1] : void 0;
          this.setupSegmentFinderArgs(t4);
          let {
            file: i5,
            findAll: s4,
            wanted: n3,
            remaining: r4
          } = this;
          if (!s4 && this.file.chunked && (s4 = Array.from(n3).some((e5) => {
            let t5 = m3.get(e5), i6 = this.options[e5];
            return t5.multiSegment && i6.multiSegment;
          }), s4 && await this.file.readWhole()), e4 = this.findAppSegmentsInRange(e4, i5.byteLength), !this.options.onlyTiff && i5.chunked) {
            let t5 = false;
            for (; r4.size > 0 && !t5 && (i5.canReadNextChunk || this.unfinishedMultiSegment); ) {
              let {
                nextChunkOffset: s5
              } = i5, n4 = this.appSegments.some((e5) => !this.file.available(e5.offset || e5.start, e5.length || e5.size));
              if (t5 = e4 > s5 && !n4 ? !await i5.readNextChunk(e4) : !await i5.readNextChunk(s5), e4 = this.findAppSegmentsInRange(e4, i5.byteLength), void 0 === e4)
                return;
            }
          }
        }
        findAppSegmentsInRange(e4, t4) {
          t4 -= 2;
          let i5, s4, n3, r4, a4, h3, {
            file: f4,
            findAll: o4,
            wanted: l4,
            remaining: d3,
            options: u4
          } = this;
          for (; e4 < t4; e4++)
            if (255 === f4.getUint8(e4)) {
              if (i5 = f4.getUint8(e4 + 1), Y(i5)) {
                if (s4 = f4.getUint16(e4 + 2), n3 = G(f4, e4, s4), n3 && l4.has(n3) && (r4 = m3.get(n3), a4 = r4.findPosition(f4, e4), h3 = u4[n3], a4.type = n3, this.appSegments.push(a4), !o4 && (r4.multiSegment && h3.multiSegment ? (this.unfinishedMultiSegment = a4.chunkNumber < a4.chunkCount, this.unfinishedMultiSegment || d3.delete(n3)) : d3.delete(n3), 0 === d3.size)))
                  break;
                u4.recordUnknownSegments && (a4 = H2.findPosition(f4, e4), a4.marker = i5, this.unknownSegments.push(a4)), e4 += s4 + 1;
              } else if (W(i5)) {
                if (s4 = f4.getUint16(e4 + 2), 218 === i5 && false !== u4.stopAfterSos)
                  return;
                u4.recordJpegSegments && this.jpegSegments.push({
                  offset: e4,
                  length: s4,
                  marker: i5
                }), e4 += s4 + 1;
              }
            }
          return e4;
        }
        mergeMultiSegments() {
          if (!this.appSegments.some((e5) => e5.multiSegment))
            return;
          let e4 = function(e5, t4) {
            let i5, s4, n3, r4 = /* @__PURE__ */ new Map();
            for (let a4 = 0; a4 < e5.length; a4++)
              i5 = e5[a4], s4 = i5[t4], r4.has(s4) ? n3 = r4.get(s4) : r4.set(s4, n3 = []), n3.push(i5);
            return Array.from(r4);
          }(this.appSegments, "type");
          this.mergedAppSegments = e4.map((e5) => {
            let [t4, i5] = e5, s4 = m3.get(t4, this.options);
            if (s4.handleMultiSegments) {
              return {
                type: t4,
                chunk: s4.handleMultiSegments(i5)
              };
            }
            return i5[0];
          });
        }
        getSegment(e4) {
          return this.appSegments.find((t4) => t4.type === e4);
        }
        async getOrFindSegment(e4) {
          let t4 = this.getSegment(e4);
          return void 0 === t4 && (await this.findAppSegments(0, [e4]), t4 = this.getSegment(e4)), t4;
        }
      };
      e3(K, "type", "jpeg"), g3.set("jpeg", K);
      var R = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
      var J = class extends H2 {
        parseHeader() {
          var e4 = this.chunk.getUint16();
          18761 === e4 ? this.le = true : 19789 === e4 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
        }
        parseTags(e4, t4) {
          let i5 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : /* @__PURE__ */ new Map(), {
            pick: s4,
            skip: n3
          } = this.options[t4];
          s4 = new Set(s4);
          let r4 = s4.size > 0, a4 = 0 === n3.size, h3 = this.chunk.getUint16(e4);
          e4 += 2;
          for (let f4 = 0; f4 < h3; f4++) {
            let h4 = this.chunk.getUint16(e4);
            if (r4) {
              if (s4.has(h4) && (i5.set(h4, this.parseTag(e4, h4, t4)), s4.delete(h4), 0 === s4.size))
                break;
            } else
              !a4 && n3.has(h4) || i5.set(h4, this.parseTag(e4, h4, t4));
            e4 += 12;
          }
          return i5;
        }
        parseTag(e4, t4, i5) {
          let {
            chunk: s4
          } = this, n3 = s4.getUint16(e4 + 2), r4 = s4.getUint32(e4 + 4), a4 = R[n3];
          if (a4 * r4 <= 4 ? e4 += 8 : e4 = s4.getUint32(e4 + 8), (n3 < 1 || n3 > 13) && f3(`Invalid TIFF value type. block: ${i5.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4}`), e4 > s4.byteLength && f3(`Invalid TIFF value offset. block: ${i5.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4} is outside of chunk size ${s4.byteLength}`), 1 === n3)
            return s4.getUint8Array(e4, r4);
          if (2 === n3)
            return "" === (h3 = function(e5) {
              for (; e5.endsWith("\0"); )
                e5 = e5.slice(0, -1);
              return e5;
            }(h3 = s4.getString(e4, r4)).trim()) ? void 0 : h3;
          var h3;
          if (7 === n3)
            return s4.getUint8Array(e4, r4);
          if (1 === r4)
            return this.parseTagValue(n3, e4);
          {
            let t5 = function(e5) {
              switch (e5) {
                case 1:
                  return Uint8Array;
                case 3:
                  return Uint16Array;
                case 4:
                  return Uint32Array;
                case 5:
                case 10:
                default:
                  return Array;
                case 6:
                  return Int8Array;
                case 8:
                  return Int16Array;
                case 9:
                  return Int32Array;
                case 11:
                  return Float32Array;
                case 12:
                  return Float64Array;
              }
            }(n3), i6 = new t5(r4), s5 = a4;
            for (let t6 = 0; t6 < r4; t6++)
              i6[t6] = this.parseTagValue(n3, e4), e4 += s5;
            return i6;
          }
        }
        parseTagValue(e4, t4) {
          let {
            chunk: i5
          } = this;
          switch (e4) {
            case 1:
              return i5.getUint8(t4);
            case 3:
              return i5.getUint16(t4);
            case 4:
            case 13:
              return i5.getUint32(t4);
            case 5:
              return i5.getUint32(t4) / i5.getUint32(t4 + 4);
            case 6:
              return i5.getInt8(t4);
            case 8:
              return i5.getInt16(t4);
            case 9:
              return i5.getInt32(t4);
            case 10:
              return i5.getInt32(t4) / i5.getInt32(t4 + 4);
            case 11:
              return i5.getFloat(t4);
            case 12:
              return i5.getDouble(t4);
            default:
              f3(`Invalid tiff type ${e4}`);
          }
        }
      };
      var q2 = class extends J {
        static canHandle(e4, t4) {
          return 225 === e4.getUint8(t4 + 1) && 1165519206 === e4.getUint32(t4 + 4) && 0 === e4.getUint16(t4 + 8);
        }
        async parse() {
          this.parseHeader();
          let {
            options: e4
          } = this;
          return e4.ifd0.enabled && await this.parseIfd0Block(), e4.exif.enabled && await this.safeParse("parseExifBlock"), e4.gps.enabled && await this.safeParse("parseGpsBlock"), e4.interop.enabled && await this.safeParse("parseInteropBlock"), e4.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
        }
        safeParse(e4) {
          let t4 = this[e4]();
          return void 0 !== t4.catch && (t4 = t4.catch(this.handleError)), t4;
        }
        findIfd0Offset() {
          void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4));
        }
        findIfd1Offset() {
          if (void 0 === this.ifd1Offset) {
            this.findIfd0Offset();
            let e4 = this.chunk.getUint16(this.ifd0Offset), t4 = this.ifd0Offset + 2 + 12 * e4;
            this.ifd1Offset = this.chunk.getUint32(t4);
          }
        }
        parseBlock(e4, t4) {
          let i5 = /* @__PURE__ */ new Map();
          return this[t4] = i5, this.parseTags(e4, t4, i5), i5;
        }
        async parseIfd0Block() {
          if (this.ifd0)
            return;
          let {
            file: e4
          } = this;
          this.findIfd0Offset(), this.ifd0Offset < 8 && f3("Malformed EXIF data"), !e4.chunked && this.ifd0Offset > e4.byteLength && f3(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e4.byteLength}`), e4.tiff && await e4.ensureChunk(this.ifd0Offset, o3(this.options));
          let t4 = this.parseBlock(this.ifd0Offset, "ifd0");
          return 0 !== t4.size ? (this.exifOffset = t4.get(34665), this.interopOffset = t4.get(40965), this.gpsOffset = t4.get(34853), this.xmp = t4.get(700), this.iptc = t4.get(33723), this.icc = t4.get(34675), this.options.sanitize && (t4.delete(34665), t4.delete(40965), t4.delete(34853), t4.delete(700), t4.delete(33723), t4.delete(34675)), t4) : void 0;
        }
        async parseExifBlock() {
          if (this.exif)
            return;
          if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.exifOffset)
            return;
          this.file.tiff && await this.file.ensureChunk(this.exifOffset, o3(this.options));
          let e4 = this.parseBlock(this.exifOffset, "exif");
          return this.interopOffset || (this.interopOffset = e4.get(40965)), this.makerNote = e4.get(37500), this.userComment = e4.get(37510), this.options.sanitize && (e4.delete(40965), e4.delete(37500), e4.delete(37510)), this.unpack(e4, 41728), this.unpack(e4, 41729), e4;
        }
        unpack(e4, t4) {
          let i5 = e4.get(t4);
          i5 && 1 === i5.length && e4.set(t4, i5[0]);
        }
        async parseGpsBlock() {
          if (this.gps)
            return;
          if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.gpsOffset)
            return;
          let e4 = this.parseBlock(this.gpsOffset, "gps");
          return e4 && e4.has(2) && e4.has(4) && (e4.set("latitude", Q(...e4.get(2), e4.get(1))), e4.set("longitude", Q(...e4.get(4), e4.get(3)))), e4;
        }
        async parseInteropBlock() {
          if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), void 0 !== this.interopOffset || this.exif || await this.parseExifBlock(), void 0 !== this.interopOffset))
            return this.parseBlock(this.interopOffset, "interop");
        }
        async parseThumbnailBlock() {
          let e4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e4))
            return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
        }
        async extractThumbnail() {
          if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), void 0 === this.ifd1)
            return;
          let e4 = this.ifd1.get(513), t4 = this.ifd1.get(514);
          return this.chunk.getUint8Array(e4, t4);
        }
        get image() {
          return this.ifd0;
        }
        get thumbnail() {
          return this.ifd1;
        }
        createOutput() {
          let e4, t4, i5, s4 = {};
          for (t4 of V)
            if (e4 = this[t4], !h2(e4))
              if (i5 = this.canTranslate ? this.translateBlock(e4, t4) : Object.fromEntries(e4), this.options.mergeOutput) {
                if ("ifd1" === t4)
                  continue;
                Object.assign(s4, i5);
              } else
                s4[t4] = i5;
          return this.makerNote && (s4.makerNote = this.makerNote), this.userComment && (s4.userComment = this.userComment), s4;
        }
        assignToOutput(e4, t4) {
          if (this.globalOptions.mergeOutput)
            Object.assign(e4, t4);
          else
            for (let [i5, s4] of Object.entries(t4))
              this.assignObjectToOutput(e4, i5, s4);
        }
      };
      function Q(e4, t4, i5, s4) {
        var n3 = e4 + t4 / 60 + i5 / 3600;
        return "S" !== s4 && "W" !== s4 || (n3 *= -1), n3;
      }
      e3(q2, "type", "tiff"), e3(q2, "headerLength", 10), m3.set("tiff", q2);
      var Z = Object.assign({}, {
        ifd0: false,
        ifd1: false,
        exif: false,
        gps: false,
        interop: false,
        sanitize: false,
        reviveValues: true,
        translateKeys: false,
        translateValues: false,
        mergeOutput: false
      }, {
        firstChunkSize: 4e4,
        ifd0: [274]
      });
      var ee3 = Object.freeze({
        1: {
          dimensionSwapped: false,
          scaleX: 1,
          scaleY: 1,
          deg: 0,
          rad: 0
        },
        2: {
          dimensionSwapped: false,
          scaleX: -1,
          scaleY: 1,
          deg: 0,
          rad: 0
        },
        3: {
          dimensionSwapped: false,
          scaleX: 1,
          scaleY: 1,
          deg: 180,
          rad: 180 * Math.PI / 180
        },
        4: {
          dimensionSwapped: false,
          scaleX: -1,
          scaleY: 1,
          deg: 180,
          rad: 180 * Math.PI / 180
        },
        5: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: -1,
          deg: 90,
          rad: 90 * Math.PI / 180
        },
        6: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: 1,
          deg: 90,
          rad: 90 * Math.PI / 180
        },
        7: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: -1,
          deg: 270,
          rad: 270 * Math.PI / 180
        },
        8: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: 1,
          deg: 270,
          rad: 270 * Math.PI / 180
        }
      });
      var te = true;
      var ie = true;
      if ("object" == typeof navigator) {
        let e4 = navigator.userAgent;
        if (e4.includes("iPad") || e4.includes("iPhone")) {
          let t4 = e4.match(/OS (\d+)_(\d+)/);
          if (t4) {
            let [, e5, i5] = t4, s4 = Number(e5) + 0.1 * Number(i5);
            te = s4 < 13.4, ie = false;
          }
        } else if (e4.includes("OS X 10")) {
          let [, t4] = e4.match(/OS X 10[_.](\d+)/);
          te = ie = Number(t4) < 15;
        }
        if (e4.includes("Chrome/")) {
          let [, t4] = e4.match(/Chrome\/(\d+)/);
          te = ie = Number(t4) < 81;
        } else if (e4.includes("Firefox/")) {
          let [, t4] = e4.match(/Firefox\/(\d+)/);
          te = ie = Number(t4) < 77;
        }
      }
      exports.rotation = async function(e4) {
        let t4 = await async function(e5) {
          let t5 = new X(Z);
          await t5.read(e5);
          let i5 = await t5.parse();
          if (i5 && i5.ifd0)
            return i5.ifd0[274];
        }(e4);
        return Object.assign({
          canvas: te,
          css: ie
        }, ee3[t4]);
      };
    }
  });

  // ../packages/@uppy/thumbnail-generator/lib/locale.js
  var locale_default3;
  var init_locale3 = __esm({
    "../packages/@uppy/thumbnail-generator/lib/locale.js"() {
      locale_default3 = {
        strings: {
          generatingThumbnails: "Generating thumbnails..."
        }
      };
    }
  });

  // ../packages/@uppy/thumbnail-generator/lib/index.js
  function canvasToBlob(canvas, type, quality) {
    try {
      canvas.getContext("2d").getImageData(0, 0, 1, 1);
    } catch (err) {
      if (err.code === 18) {
        return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
      }
    }
    if (canvas.toBlob) {
      return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
      }).then((blob) => {
        if (blob === null) {
          throw new Error("cannot read image, probably an svg with external resources");
        }
        return blob;
      });
    }
    return Promise.resolve().then(() => {
      return dataURItoBlob(canvas.toDataURL(type, quality), {});
    }).then((blob) => {
      if (blob === null) {
        throw new Error("could not extract blob, probably an old browser");
      }
      return blob;
    });
  }
  function rotateImage(image, translate) {
    let w3 = image.width;
    let h2 = image.height;
    if (translate.deg === 90 || translate.deg === 270) {
      w3 = image.height;
      h2 = image.width;
    }
    const canvas = document.createElement("canvas");
    canvas.width = w3;
    canvas.height = h2;
    const context = canvas.getContext("2d");
    context.translate(w3 / 2, h2 / 2);
    if (translate.canvas) {
      context.rotate(translate.rad);
      context.scale(translate.scaleX, translate.scaleY);
    }
    context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
    return canvas;
  }
  function protect(image) {
    const ratio = image.width / image.height;
    const maxSquare = 5e6;
    const maxSize = 4096;
    let maxW = Math.floor(Math.sqrt(maxSquare * ratio));
    let maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio));
    if (maxW > maxSize) {
      maxW = maxSize;
      maxH = Math.round(maxW / ratio);
    }
    if (maxH > maxSize) {
      maxH = maxSize;
      maxW = Math.round(ratio * maxH);
    }
    if (image.width > maxW) {
      const canvas = document.createElement("canvas");
      canvas.width = maxW;
      canvas.height = maxH;
      canvas.getContext("2d").drawImage(image, 0, 0, maxW, maxH);
      return canvas;
    }
    return image;
  }
  var import_mini_umd, packageJson6, ThumbnailGenerator;
  var init_lib6 = __esm({
    "../packages/@uppy/thumbnail-generator/lib/index.js"() {
      init_lib2();
      init_dataURItoBlob();
      init_isObjectURL();
      init_isPreviewSupported();
      import_mini_umd = __toESM(require_mini_umd(), 1);
      init_locale3();
      packageJson6 = {
        "version": "3.0.0-beta.2"
      };
      ThumbnailGenerator = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.onFileAdded = (file) => {
            if (!file.preview && file.data && isPreviewSupported(file.type) && !file.isRemote) {
              this.addToQueue(file.id);
            }
          };
          this.onCancelRequest = (file) => {
            const index = this.queue.indexOf(file.id);
            if (index !== -1) {
              this.queue.splice(index, 1);
            }
          };
          this.onFileRemoved = (file) => {
            const index = this.queue.indexOf(file.id);
            if (index !== -1) {
              this.queue.splice(index, 1);
            }
            if (file.preview && isObjectURL(file.preview)) {
              URL.revokeObjectURL(file.preview);
            }
          };
          this.onRestored = () => {
            const restoredFiles = this.uppy.getFiles().filter((file) => file.isRestored);
            restoredFiles.forEach((file) => {
              if (!file.preview || isObjectURL(file.preview)) {
                this.addToQueue(file.id);
              }
            });
          };
          this.onAllFilesRemoved = () => {
            this.queue = [];
          };
          this.waitUntilAllProcessed = (fileIDs) => {
            fileIDs.forEach((fileID) => {
              const file = this.uppy.getFile(fileID);
              this.uppy.emit("preprocess-progress", file, {
                mode: "indeterminate",
                message: this.i18n("generatingThumbnails")
              });
            });
            const emitPreprocessCompleteForAll = () => {
              fileIDs.forEach((fileID) => {
                const file = this.uppy.getFile(fileID);
                this.uppy.emit("preprocess-complete", file);
              });
            };
            return new Promise((resolve) => {
              if (this.queueProcessing) {
                this.uppy.once("thumbnail:all-generated", () => {
                  emitPreprocessCompleteForAll();
                  resolve();
                });
              } else {
                emitPreprocessCompleteForAll();
                resolve();
              }
            });
          };
          this.type = "modifier";
          this.id = this.opts.id || "ThumbnailGenerator";
          this.title = "Thumbnail Generator";
          this.queue = [];
          this.queueProcessing = false;
          this.defaultThumbnailDimension = 200;
          this.thumbnailType = this.opts.thumbnailType || "image/jpeg";
          this.defaultLocale = locale_default3;
          const defaultOptions4 = {
            thumbnailWidth: null,
            thumbnailHeight: null,
            waitForThumbnailsBeforeUpload: false,
            lazy: false
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.i18nInit();
          if (this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) {
            throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
          }
        }
        createThumbnail(file, targetWidth, targetHeight) {
          const originalUrl = URL.createObjectURL(file.data);
          const onload = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = originalUrl;
            image.addEventListener("load", () => {
              URL.revokeObjectURL(originalUrl);
              resolve(image);
            });
            image.addEventListener("error", (event) => {
              URL.revokeObjectURL(originalUrl);
              reject(event.error || new Error("Could not create thumbnail"));
            });
          });
          const orientationPromise = (0, import_mini_umd.rotation)(file.data).catch(() => 1);
          return Promise.all([onload, orientationPromise]).then((_ref) => {
            let [image, orientation] = _ref;
            const dimensions = this.getProportionalDimensions(image, targetWidth, targetHeight, orientation.deg);
            const rotatedImage = rotateImage(image, orientation);
            const resizedImage = this.resizeImage(rotatedImage, dimensions.width, dimensions.height);
            return canvasToBlob(resizedImage, this.thumbnailType, 80);
          }).then((blob) => {
            return URL.createObjectURL(blob);
          });
        }
        getProportionalDimensions(img, width, height, rotation2) {
          let aspect = img.width / img.height;
          if (rotation2 === 90 || rotation2 === 270) {
            aspect = img.height / img.width;
          }
          if (width != null) {
            return {
              width,
              height: Math.round(width / aspect)
            };
          }
          if (height != null) {
            return {
              width: Math.round(height * aspect),
              height
            };
          }
          return {
            width: this.defaultThumbnailDimension,
            height: Math.round(this.defaultThumbnailDimension / aspect)
          };
        }
        resizeImage(image, targetWidth, targetHeight) {
          let img = protect(image);
          let steps = Math.ceil(Math.log2(img.width / targetWidth));
          if (steps < 1) {
            steps = 1;
          }
          let sW = targetWidth * 2 ** (steps - 1);
          let sH = targetHeight * 2 ** (steps - 1);
          const x2 = 2;
          while (steps--) {
            const canvas = document.createElement("canvas");
            canvas.width = sW;
            canvas.height = sH;
            canvas.getContext("2d").drawImage(img, 0, 0, sW, sH);
            img = canvas;
            sW = Math.round(sW / x2);
            sH = Math.round(sH / x2);
          }
          return img;
        }
        setPreviewURL(fileID, preview) {
          this.uppy.setFileState(fileID, {
            preview
          });
        }
        addToQueue(item) {
          this.queue.push(item);
          if (this.queueProcessing === false) {
            this.processQueue();
          }
        }
        processQueue() {
          this.queueProcessing = true;
          if (this.queue.length > 0) {
            const current = this.uppy.getFile(this.queue.shift());
            if (!current) {
              this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error");
              return Promise.resolve();
            }
            return this.requestThumbnail(current).catch(() => {
            }).then(() => this.processQueue());
          }
          this.queueProcessing = false;
          this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue");
          this.uppy.emit("thumbnail:all-generated");
          return Promise.resolve();
        }
        requestThumbnail(file) {
          if (isPreviewSupported(file.type) && !file.isRemote) {
            return this.createThumbnail(file, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((preview) => {
              this.setPreviewURL(file.id, preview);
              this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${file.id}`);
              this.uppy.emit("thumbnail:generated", this.uppy.getFile(file.id), preview);
            }).catch((err) => {
              this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${file.id}:`, "warning");
              this.uppy.log(err, "warning");
              this.uppy.emit("thumbnail:error", this.uppy.getFile(file.id), err);
            });
          }
          return Promise.resolve();
        }
        install() {
          this.uppy.on("file-removed", this.onFileRemoved);
          this.uppy.on("cancel-all", this.onAllFilesRemoved);
          if (this.opts.lazy) {
            this.uppy.on("thumbnail:request", this.onFileAdded);
            this.uppy.on("thumbnail:cancel", this.onCancelRequest);
          } else {
            this.uppy.on("file-added", this.onFileAdded);
            this.uppy.on("restored", this.onRestored);
          }
          if (this.opts.waitForThumbnailsBeforeUpload) {
            this.uppy.addPreProcessor(this.waitUntilAllProcessed);
          }
        }
        uninstall() {
          this.uppy.off("file-removed", this.onFileRemoved);
          this.uppy.off("cancel-all", this.onAllFilesRemoved);
          if (this.opts.lazy) {
            this.uppy.off("thumbnail:request", this.onFileAdded);
            this.uppy.off("thumbnail:cancel", this.onCancelRequest);
          } else {
            this.uppy.off("file-added", this.onFileAdded);
            this.uppy.off("restored", this.onRestored);
          }
          if (this.opts.waitForThumbnailsBeforeUpload) {
            this.uppy.removePreProcessor(this.waitUntilAllProcessed);
          }
        }
      };
      ThumbnailGenerator.VERSION = packageJson6.version;
    }
  });

  // ../packages/@uppy/utils/lib/findAllDOMElements.js
  function findAllDOMElements(element) {
    if (typeof element === "string") {
      const elements = document.querySelectorAll(element);
      return elements.length === 0 ? null : Array.from(elements);
    }
    if (typeof element === "object" && isDOMElement(element)) {
      return [element];
    }
    return null;
  }
  var init_findAllDOMElements = __esm({
    "../packages/@uppy/utils/lib/findAllDOMElements.js"() {
      init_isDOMElement();
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getRelativePath.js
  function getRelativePath(fileEntry) {
    if (!fileEntry.fullPath || fileEntry.fullPath === `/${fileEntry.name}`) {
      return null;
    }
    return fileEntry.fullPath;
  }
  var init_getRelativePath = __esm({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getRelativePath.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
  function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, _ref) {
    let {
      onSuccess
    } = _ref;
    directoryReader.readEntries(
      (entries) => {
        const newEntries = [...oldEntries, ...entries];
        if (entries.length) {
          queueMicrotask(() => {
            getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, {
              onSuccess
            });
          });
        } else {
          onSuccess(newEntries);
        }
      },
      (error) => {
        logDropError(error);
        onSuccess(oldEntries);
      }
    );
  }
  var init_getFilesAndDirectoriesFromDirectory = __esm({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
  function getAsFileSystemHandleFromEntry(entry, logDropError) {
    if (entry == null)
      return entry;
    return {
      kind: entry.isFile ? "file" : entry.isDirectory ? "directory" : void 0,
      getFile() {
        return new Promise((resolve, reject) => entry.file(resolve, reject));
      },
      async *values() {
        const directoryReader = entry.createReader();
        const entries = await new Promise((resolve) => {
          getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
            onSuccess: (dirEntries) => resolve(dirEntries.map((file) => getAsFileSystemHandleFromEntry(file, logDropError)))
          });
        });
        yield* entries;
      }
    };
  }
  async function* createPromiseToAddFileOrParseDirectory(entry) {
    if (entry.kind === "file") {
      const file = await entry.getFile();
      if (file !== null) {
        file.relativePath = getRelativePath(entry);
        yield file;
      }
    } else if (entry.kind === "directory") {
      for await (const handle of entry.values()) {
        yield* createPromiseToAddFileOrParseDirectory(handle);
      }
    }
  }
  async function* getFilesFromDataTransfer(dataTransfer, logDropError) {
    const entries = await Promise.all(Array.from(dataTransfer.items, async (item) => {
      var _await$item$getAsFile;
      const lastResortFile = item.getAsFile();
      const entry = (_await$item$getAsFile = await (item.getAsFileSystemHandle == null ? void 0 : item.getAsFileSystemHandle())) != null ? _await$item$getAsFile : getAsFileSystemHandleFromEntry(item.webkitGetAsEntry(), logDropError);
      return {
        lastResortFile,
        entry
      };
    }));
    for (const {
      lastResortFile,
      entry
    } of entries) {
      if (entry != null) {
        try {
          yield* createPromiseToAddFileOrParseDirectory(entry, logDropError);
        } catch (err) {
          if (lastResortFile) {
            yield lastResortFile;
          } else {
            logDropError(err);
          }
        }
      }
    }
  }
  var init_webkitGetAsEntryApi = __esm({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js"() {
      init_getRelativePath();
      init_getFilesAndDirectoriesFromDirectory();
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js
  function fallbackApi(dataTransfer) {
    const files = toArray_default(dataTransfer.files);
    return Promise.resolve(files);
  }
  var init_fallbackApi = __esm({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js"() {
      init_toArray();
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/index.js
  async function getDroppedFiles(dataTransfer, _temp) {
    let {
      logDropError = () => {
      }
    } = _temp === void 0 ? {} : _temp;
    try {
      const accumulator = [];
      for await (const file of getFilesFromDataTransfer(dataTransfer, logDropError)) {
        accumulator.push(file);
      }
      return accumulator;
    } catch {
      return fallbackApi(dataTransfer);
    }
  }
  var init_getDroppedFiles = __esm({
    "../packages/@uppy/utils/lib/getDroppedFiles/index.js"() {
      init_webkitGetAsEntryApi();
      init_fallbackApi();
    }
  });

  // ../node_modules/memoize-one/dist/memoize-one.esm.js
  function isEqual(first, second) {
    if (first === second) {
      return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
      return true;
    }
    return false;
  }
  function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
      return false;
    }
    for (var i4 = 0; i4 < newInputs.length; i4++) {
      if (!isEqual(newInputs[i4], lastInputs[i4])) {
        return false;
      }
    }
    return true;
  }
  function memoizeOne(resultFn, isEqual2) {
    if (isEqual2 === void 0) {
      isEqual2 = areInputsEqual;
    }
    var cache2 = null;
    function memoized() {
      var newArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        newArgs[_i] = arguments[_i];
      }
      if (cache2 && cache2.lastThis === this && isEqual2(newArgs, cache2.lastArgs)) {
        return cache2.lastResult;
      }
      var lastResult = resultFn.apply(this, newArgs);
      cache2 = {
        lastResult,
        lastArgs: newArgs,
        lastThis: this
      };
      return lastResult;
    }
    memoized.clear = function clear() {
      cache2 = null;
    };
    return memoized;
  }
  var safeIsNaN;
  var init_memoize_one_esm = __esm({
    "../node_modules/memoize-one/dist/memoize-one.esm.js"() {
      safeIsNaN = Number.isNaN || function ponyfill(value2) {
        return typeof value2 === "number" && value2 !== value2;
      };
    }
  });

  // ../packages/@uppy/utils/lib/FOCUSABLE_ELEMENTS.js
  var FOCUSABLE_ELEMENTS_default;
  var init_FOCUSABLE_ELEMENTS = __esm({
    "../packages/@uppy/utils/lib/FOCUSABLE_ELEMENTS.js"() {
      FOCUSABLE_ELEMENTS_default = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/getActiveOverlayEl.js
  function getActiveOverlayEl(dashboardEl, activeOverlayType) {
    if (activeOverlayType) {
      const overlayEl = dashboardEl.querySelector(`[data-uppy-paneltype="${activeOverlayType}"]`);
      if (overlayEl)
        return overlayEl;
    }
    return dashboardEl;
  }
  var init_getActiveOverlayEl = __esm({
    "../packages/@uppy/dashboard/lib/utils/getActiveOverlayEl.js"() {
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/trapFocus.js
  function focusOnFirstNode(event, nodes) {
    const node = nodes[0];
    if (node) {
      node.focus();
      event.preventDefault();
    }
  }
  function focusOnLastNode(event, nodes) {
    const node = nodes[nodes.length - 1];
    if (node) {
      node.focus();
      event.preventDefault();
    }
  }
  function isFocusInOverlay(activeOverlayEl) {
    return activeOverlayEl.contains(document.activeElement);
  }
  function trapFocus(event, activeOverlayType, dashboardEl) {
    const activeOverlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
    const focusableNodes = toArray_default(activeOverlayEl.querySelectorAll(FOCUSABLE_ELEMENTS_default));
    const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
    if (!isFocusInOverlay(activeOverlayEl)) {
      focusOnFirstNode(event, focusableNodes);
    } else if (event.shiftKey && focusedItemIndex === 0) {
      focusOnLastNode(event, focusableNodes);
    } else if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
      focusOnFirstNode(event, focusableNodes);
    }
  }
  function forInline(event, activeOverlayType, dashboardEl) {
    if (activeOverlayType === null) {
    } else {
      trapFocus(event, activeOverlayType, dashboardEl);
    }
  }
  var init_trapFocus = __esm({
    "../packages/@uppy/dashboard/lib/utils/trapFocus.js"() {
      init_toArray();
      init_FOCUSABLE_ELEMENTS();
      init_getActiveOverlayEl();
    }
  });

  // ../node_modules/lodash.debounce/index.js
  var require_lodash2 = __commonJS({
    "../node_modules/lodash.debounce/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce3(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result3 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result3, maxWait - timeSinceLastInvoke) : result3;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result2;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function isObject(value2) {
        var type = typeof value2;
        return !!value2 && (type == "object" || type == "function");
      }
      function isObjectLike(value2) {
        return !!value2 && typeof value2 == "object";
      }
      function isSymbol(value2) {
        return typeof value2 == "symbol" || isObjectLike(value2) && objectToString.call(value2) == symbolTag;
      }
      function toNumber(value2) {
        if (typeof value2 == "number") {
          return value2;
        }
        if (isSymbol(value2)) {
          return NAN;
        }
        if (isObject(value2)) {
          var other = typeof value2.valueOf == "function" ? value2.valueOf() : value2;
          value2 = isObject(other) ? other + "" : other;
        }
        if (typeof value2 != "string") {
          return value2 === 0 ? value2 : +value2;
        }
        value2 = value2.replace(reTrim, "");
        var isBinary2 = reIsBinary.test(value2);
        return isBinary2 || reIsOctal.test(value2) ? freeParseInt(value2.slice(2), isBinary2 ? 2 : 8) : reIsBadHex.test(value2) ? NAN : +value2;
      }
      module.exports = debounce3;
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/createSuperFocus.js
  function createSuperFocus() {
    let lastFocusWasOnSuperFocusableEl = false;
    const superFocus = (dashboardEl, activeOverlayType) => {
      const overlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
      const isFocusInOverlay2 = overlayEl.contains(document.activeElement);
      if (isFocusInOverlay2 && lastFocusWasOnSuperFocusableEl)
        return;
      const superFocusableEl = overlayEl.querySelector("[data-uppy-super-focusable]");
      if (isFocusInOverlay2 && !superFocusableEl)
        return;
      if (superFocusableEl) {
        superFocusableEl.focus({
          preventScroll: true
        });
        lastFocusWasOnSuperFocusableEl = true;
      } else {
        const firstEl = overlayEl.querySelector(FOCUSABLE_ELEMENTS_default);
        firstEl == null ? void 0 : firstEl.focus({
          preventScroll: true
        });
        lastFocusWasOnSuperFocusableEl = false;
      }
    };
    return (0, import_lodash3.default)(superFocus, 260);
  }
  var import_lodash3;
  var init_createSuperFocus = __esm({
    "../packages/@uppy/dashboard/lib/utils/createSuperFocus.js"() {
      import_lodash3 = __toESM(require_lodash2(), 1);
      init_FOCUSABLE_ELEMENTS();
      init_getActiveOverlayEl();
    }
  });

  // ../packages/@uppy/utils/lib/isDragDropSupported.js
  function isDragDropSupported() {
    const div = document.body;
    if (!("draggable" in div) || !("ondragstart" in div && "ondrop" in div)) {
      return false;
    }
    if (!("FormData" in window)) {
      return false;
    }
    if (!("FileReader" in window)) {
      return false;
    }
    return true;
  }
  var init_isDragDropSupported = __esm({
    "../packages/@uppy/utils/lib/isDragDropSupported.js"() {
    }
  });

  // ../node_modules/is-shallow-equal/index.js
  var require_is_shallow_equal = __commonJS({
    "../node_modules/is-shallow-equal/index.js"(exports, module) {
      module.exports = function isShallowEqual(a3, b3) {
        if (a3 === b3)
          return true;
        for (var i4 in a3)
          if (!(i4 in b3))
            return false;
        for (var i4 in b3)
          if (a3[i4] !== b3[i4])
            return false;
        return true;
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/getFileTypeIcon.js
  function iconImage() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("g", {
      fill: "#686DE0",
      fillRule: "evenodd"
    }, h("path", {
      d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
      fillRule: "nonzero"
    }), h("path", {
      d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
      fillRule: "nonzero"
    }), h("circle", {
      cx: "7.5",
      cy: "9.5",
      r: "1.5"
    })));
  }
  function iconAudio() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
      fill: "#049BCF",
      fillRule: "nonzero"
    }));
  }
  function iconVideo() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
      fill: "#19AF67",
      fillRule: "nonzero"
    }));
  }
  function iconPDF() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
      fill: "#E2514A",
      fillRule: "nonzero"
    }));
  }
  function iconArchive() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
      fill: "#00C469",
      fillRule: "nonzero"
    }));
  }
  function iconFile() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("g", {
      fill: "#A7AFB7",
      fillRule: "nonzero"
    }, h("path", {
      d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
    }), h("path", {
      d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
    })));
  }
  function iconText() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
      fill: "#5A5E69",
      fillRule: "nonzero"
    }));
  }
  function getIconByMime(fileType) {
    const defaultChoice = {
      color: "#838999",
      icon: iconFile()
    };
    if (!fileType)
      return defaultChoice;
    const fileTypeGeneral = fileType.split("/")[0];
    const fileTypeSpecific = fileType.split("/")[1];
    if (fileTypeGeneral === "text") {
      return {
        color: "#5a5e69",
        icon: iconText()
      };
    }
    if (fileTypeGeneral === "image") {
      return {
        color: "#686de0",
        icon: iconImage()
      };
    }
    if (fileTypeGeneral === "audio") {
      return {
        color: "#068dbb",
        icon: iconAudio()
      };
    }
    if (fileTypeGeneral === "video") {
      return {
        color: "#19af67",
        icon: iconVideo()
      };
    }
    if (fileTypeGeneral === "application" && fileTypeSpecific === "pdf") {
      return {
        color: "#e25149",
        icon: iconPDF()
      };
    }
    const archiveTypes = ["zip", "x-7z-compressed", "x-rar-compressed", "x-tar", "x-gzip", "x-apple-diskimage"];
    if (fileTypeGeneral === "application" && archiveTypes.indexOf(fileTypeSpecific) !== -1) {
      return {
        color: "#00C469",
        icon: iconArchive()
      };
    }
    return defaultChoice;
  }
  var init_getFileTypeIcon = __esm({
    "../packages/@uppy/dashboard/lib/utils/getFileTypeIcon.js"() {
      init_preact_module();
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FilePreview.js
  function FilePreview(props) {
    const {
      file
    } = props;
    if (file.preview) {
      return h("img", {
        className: "uppy-Dashboard-Item-previewImg",
        alt: file.name,
        src: file.preview
      });
    }
    const {
      color,
      icon
    } = getIconByMime(file.type);
    return h("div", {
      className: "uppy-Dashboard-Item-previewIconWrap"
    }, h("span", {
      className: "uppy-Dashboard-Item-previewIcon",
      style: {
        color
      }
    }, icon), h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-Dashboard-Item-previewIconBg",
      width: "58",
      height: "76",
      viewBox: "0 0 58 76"
    }, h("rect", {
      fill: "#FFF",
      width: "58",
      height: "76",
      rx: "3",
      fillRule: "evenodd"
    })));
  }
  var init_FilePreview = __esm({
    "../packages/@uppy/dashboard/lib/components/FilePreview.js"() {
      init_preact_module();
      init_getFileTypeIcon();
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
  function renderMissingMetaFieldsError(props) {
    const {
      file,
      toggleFileCard,
      i18n,
      metaFields
    } = props;
    const {
      missingRequiredMetaFields
    } = file;
    if (!(missingRequiredMetaFields != null && missingRequiredMetaFields.length)) {
      return null;
    }
    const metaFieldsString = missingRequiredMetaFields.map((missingMetaField) => metaFieldIdToName(missingMetaField, metaFields)).join(", ");
    return h("div", {
      className: "uppy-Dashboard-Item-errorMessage"
    }, i18n("missingRequiredMetaFields", {
      smart_count: missingRequiredMetaFields.length,
      fields: metaFieldsString
    }), " ", h("button", {
      type: "button",
      class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
      onClick: () => toggleFileCard(true, file.id)
    }, i18n("editFile")));
  }
  var metaFieldIdToName;
  var init_MetaErrorMessage = __esm({
    "../packages/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js"() {
      init_preact_module();
      metaFieldIdToName = (metaFieldId, metaFields) => {
        const field = metaFields.filter((f3) => f3.id === metaFieldId);
        return field[0].name;
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js
  function FilePreviewAndLink(props) {
    return h("div", {
      className: "uppy-Dashboard-Item-previewInnerWrap",
      style: {
        backgroundColor: getIconByMime(props.file.type).color
      }
    }, props.showLinkToFileUploadResult && props.file.uploadURL && h("a", {
      className: "uppy-Dashboard-Item-previewLink",
      href: props.file.uploadURL,
      rel: "noreferrer noopener",
      target: "_blank",
      "aria-label": props.file.meta.name
    }, h("span", {
      hidden: true
    }, props.file.meta.name)), h(FilePreview, {
      file: props.file
    }), h(renderMissingMetaFieldsError, {
      file: props.file,
      i18n: props.i18n,
      toggleFileCard: props.toggleFileCard,
      metaFields: props.metaFields
    }));
  }
  var init_FilePreviewAndLink = __esm({
    "../packages/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js"() {
      init_preact_module();
      init_FilePreview();
      init_MetaErrorMessage();
      init_getFileTypeIcon();
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js
  function onPauseResumeCancelRetry(props) {
    if (props.isUploaded)
      return;
    if (props.error && !props.hideRetryButton) {
      props.uppy.retryUpload(props.file.id);
      return;
    }
    if (props.resumableUploads && !props.hidePauseResumeButton) {
      props.uppy.pauseResume(props.file.id);
    } else if (props.individualCancellation && !props.hideCancelButton) {
      props.uppy.removeFile(props.file.id);
    }
  }
  function progressIndicatorTitle(props) {
    if (props.isUploaded) {
      return props.i18n("uploadComplete");
    }
    if (props.error) {
      return props.i18n("retryUpload");
    }
    if (props.resumableUploads) {
      if (props.file.isPaused) {
        return props.i18n("resumeUpload");
      }
      return props.i18n("pauseUpload");
    }
    if (props.individualCancellation) {
      return props.i18n("cancelUpload");
    }
    return "";
  }
  function ProgressIndicatorButton(props) {
    return h("div", {
      className: "uppy-Dashboard-Item-progress"
    }, h("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-progressIndicator",
      type: "button",
      "aria-label": progressIndicatorTitle(props),
      title: progressIndicatorTitle(props),
      onClick: () => onPauseResumeCancelRetry(props)
    }, props.children));
  }
  function ProgressCircleContainer(_ref) {
    let {
      children
    } = _ref;
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "70",
      height: "70",
      viewBox: "0 0 36 36",
      className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
    }, children);
  }
  function ProgressCircle(_ref2) {
    let {
      progress
    } = _ref2;
    const circleLength = 2 * Math.PI * 15;
    return h("g", null, h("circle", {
      className: "uppy-Dashboard-Item-progressIcon--bg",
      r: "15",
      cx: "18",
      cy: "18",
      "stroke-width": "2",
      fill: "none"
    }), h("circle", {
      className: "uppy-Dashboard-Item-progressIcon--progress",
      r: "15",
      cx: "18",
      cy: "18",
      transform: "rotate(-90, 18, 18)",
      fill: "none",
      "stroke-width": "2",
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength - circleLength / 100 * progress
    }));
  }
  function FileProgress(props) {
    if (!props.file.progress.uploadStarted) {
      return null;
    }
    if (props.isUploaded) {
      return h("div", {
        className: "uppy-Dashboard-Item-progress"
      }, h("div", {
        className: "uppy-Dashboard-Item-progressIndicator"
      }, h(ProgressCircleContainer, null, h("circle", {
        r: "15",
        cx: "18",
        cy: "18",
        fill: "#1bb240"
      }), h("polygon", {
        className: "uppy-Dashboard-Item-progressIcon--check",
        transform: "translate(2, 3)",
        points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
      }))));
    }
    if (props.recoveredState) {
      return void 0;
    }
    if (props.error && !props.hideRetryButton) {
      return h(ProgressIndicatorButton, props, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
        width: "28",
        height: "31",
        viewBox: "0 0 16 19"
      }, h("path", {
        d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
      }), h("path", {
        d: "M7.9 3H10v2H7.9z"
      }), h("path", {
        d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
      }), h("path", {
        d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
      })));
    }
    if (props.resumableUploads && !props.hidePauseResumeButton) {
      return h(ProgressIndicatorButton, props, h(ProgressCircleContainer, null, h(ProgressCircle, {
        progress: props.file.progress.percentage
      }), props.file.isPaused ? h("polygon", {
        className: "uppy-Dashboard-Item-progressIcon--play",
        transform: "translate(3, 3)",
        points: "12 20 12 10 20 15"
      }) : h("g", {
        className: "uppy-Dashboard-Item-progressIcon--pause",
        transform: "translate(14.5, 13)"
      }, h("rect", {
        x: "0",
        y: "0",
        width: "2",
        height: "10",
        rx: "0"
      }), h("rect", {
        x: "5",
        y: "0",
        width: "2",
        height: "10",
        rx: "0"
      }))));
    }
    if (!props.resumableUploads && props.individualCancellation && !props.hideCancelButton) {
      return h(ProgressIndicatorButton, props, h(ProgressCircleContainer, null, h(ProgressCircle, {
        progress: props.file.progress.percentage
      }), h("polygon", {
        className: "cancel",
        transform: "translate(2, 2)",
        points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
      })));
    }
    return h("div", {
      className: "uppy-Dashboard-Item-progress"
    }, h("div", {
      className: "uppy-Dashboard-Item-progressIndicator"
    }, h(ProgressCircleContainer, null, h(ProgressCircle, {
      progress: props.file.progress.percentage
    }))));
  }
  var init_FileProgress = __esm({
    "../packages/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js"() {
      init_preact_module();
    }
  });

  // ../packages/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes2 = __commonJS({
    "../packages/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes4(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError("Expected a number, got " + typeof num);
        }
        var neg = num < 0;
        var units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return (neg ? "-" : "") + num + " B";
        }
        var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        var unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return (neg ? "-" : "") + num.toFixed(0) + " " + unit;
        } else {
          return (neg ? "-" : "") + num.toFixed(1) + " " + unit;
        }
      };
    }
  });

  // ../packages/@uppy/utils/lib/truncateString.js
  function truncateString(string, maxLength) {
    if (maxLength === 0)
      return "";
    if (string.length <= maxLength)
      return string;
    if (maxLength <= separator.length + 1)
      return `${string.slice(0, maxLength - 1)}\u2026`;
    const charsToShow = maxLength - separator.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return string.slice(0, frontChars) + separator + string.slice(-backChars);
  }
  var separator;
  var init_truncateString = __esm({
    "../packages/@uppy/utils/lib/truncateString.js"() {
      separator = "...";
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
  function FileInfo(props) {
    const {
      file
    } = props;
    return h("div", {
      className: "uppy-Dashboard-Item-fileInfo",
      "data-uppy-file-source": file.source
    }, h("div", {
      className: "uppy-Dashboard-Item-fileName"
    }, renderFileName(props), h(ErrorButton, {
      file: props.file,
      onClick: () => alert(props.file.error)
    })), h("div", {
      className: "uppy-Dashboard-Item-status"
    }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), h(renderMissingMetaFieldsError, {
      file: props.file,
      i18n: props.i18n,
      toggleFileCard: props.toggleFileCard,
      metaFields: props.metaFields
    }));
  }
  var import_prettier_bytes3, renderFileName, renderAuthor, renderFileSize, ReSelectButton, ErrorButton;
  var init_FileInfo = __esm({
    "../packages/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js"() {
      init_preact_module();
      import_prettier_bytes3 = __toESM(require_prettierBytes2(), 1);
      init_truncateString();
      init_MetaErrorMessage();
      renderFileName = (props) => {
        const {
          author,
          name
        } = props.file.meta;
        function getMaxNameLength() {
          if (props.containerWidth <= 352) {
            return 35;
          }
          if (props.containerWidth <= 576) {
            return 60;
          }
          return author ? 20 : 30;
        }
        return h("div", {
          className: "uppy-Dashboard-Item-name",
          title: name
        }, truncateString(name, getMaxNameLength()));
      };
      renderAuthor = (props) => {
        const {
          author
        } = props.file.meta;
        const {
          providerName
        } = props.file.remote;
        const dot = `\xB7`;
        if (!author) {
          return null;
        }
        return h("div", {
          className: "uppy-Dashboard-Item-author"
        }, h("a", {
          href: `${author.url}?utm_source=Companion&utm_medium=referral`,
          target: "_blank",
          rel: "noopener noreferrer"
        }, truncateString(author.name, 13)), providerName ? h(p, null, ` ${dot} `, providerName, ` ${dot} `) : null);
      };
      renderFileSize = (props) => props.file.size && h("div", {
        className: "uppy-Dashboard-Item-statusSize"
      }, (0, import_prettier_bytes3.default)(props.file.size));
      ReSelectButton = (props) => props.file.isGhost && h("span", null, " \u2022 ", h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
        type: "button",
        onClick: props.toggleAddFilesPanel
      }, props.i18n("reSelect")));
      ErrorButton = (_ref) => {
        let {
          file,
          onClick
        } = _ref;
        if (file.error) {
          return h("button", {
            className: "uppy-u-reset uppy-Dashboard-Item-errorDetails",
            "aria-label": file.error,
            "data-microtip-position": "bottom",
            "data-microtip-size": "medium",
            onClick,
            type: "button"
          }, "?");
        }
        return null;
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/copyToClipboard.js
  function copyToClipboard(textToCopy, fallbackString) {
    if (fallbackString === void 0) {
      fallbackString = "Copy the URL below";
    }
    return new Promise((resolve) => {
      const textArea = document.createElement("textarea");
      textArea.setAttribute("style", {
        position: "fixed",
        top: 0,
        left: 0,
        width: "2em",
        height: "2em",
        padding: 0,
        border: "none",
        outline: "none",
        boxShadow: "none",
        background: "transparent"
      });
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      const magicCopyFailed = () => {
        document.body.removeChild(textArea);
        window.prompt(fallbackString, textToCopy);
        resolve();
      };
      try {
        const successful = document.execCommand("copy");
        if (!successful) {
          return magicCopyFailed("copy command unavailable");
        }
        document.body.removeChild(textArea);
        return resolve();
      } catch (err) {
        document.body.removeChild(textArea);
        return magicCopyFailed(err);
      }
    });
  }
  var init_copyToClipboard = __esm({
    "../packages/@uppy/dashboard/lib/utils/copyToClipboard.js"() {
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/Buttons/index.js
  function EditButton(_ref) {
    let {
      file,
      uploadInProgressOrComplete,
      metaFields,
      canEditFile,
      i18n,
      onClick
    } = _ref;
    if (!uploadInProgressOrComplete && metaFields && metaFields.length > 0 || !uploadInProgressOrComplete && canEditFile(file)) {
      return h("button", {
        className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
        type: "button",
        "aria-label": i18n("editFileWithFilename", {
          file: file.meta.name
        }),
        title: i18n("editFileWithFilename", {
          file: file.meta.name
        }),
        onClick: () => onClick()
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "14",
        height: "14",
        viewBox: "0 0 14 14"
      }, h("g", {
        fillRule: "evenodd"
      }, h("path", {
        d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
        fillRule: "nonzero"
      }), h("rect", {
        x: "1",
        y: "12.293",
        width: "11",
        height: "1",
        rx: ".5"
      }), h("path", {
        fillRule: "nonzero",
        d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
      }))));
    }
    return null;
  }
  function RemoveButton(_ref2) {
    let {
      i18n,
      onClick,
      file
    } = _ref2;
    return h("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
      type: "button",
      "aria-label": i18n("removeFile", {
        file: file.meta.name
      }),
      title: i18n("removeFile", {
        file: file.meta.name
      }),
      onClick: () => onClick()
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    }, h("path", {
      d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
    }), h("path", {
      fill: "#FFF",
      d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
    })));
  }
  function CopyLinkButton(props) {
    const {
      i18n
    } = props;
    return h("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
      type: "button",
      "aria-label": i18n("copyLink"),
      title: i18n("copyLink"),
      onClick: (event) => copyLinkToClipboard(event, props)
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "14",
      height: "14",
      viewBox: "0 0 14 12"
    }, h("path", {
      d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
    })));
  }
  function Buttons(props) {
    const {
      uppy,
      file,
      uploadInProgressOrComplete,
      canEditFile,
      metaFields,
      showLinkToFileUploadResult,
      showRemoveButton,
      i18n,
      toggleFileCard,
      openFileEditor
    } = props;
    const editAction = () => {
      if (metaFields && metaFields.length > 0) {
        toggleFileCard(true, file.id);
      } else {
        openFileEditor(file);
      }
    };
    return h("div", {
      className: "uppy-Dashboard-Item-actionWrapper"
    }, h(EditButton, {
      i18n,
      file,
      uploadInProgressOrComplete,
      canEditFile,
      metaFields,
      onClick: editAction
    }), showLinkToFileUploadResult && file.uploadURL ? h(CopyLinkButton, {
      file,
      uppy,
      i18n
    }) : null, showRemoveButton ? h(RemoveButton, {
      i18n,
      file,
      uppy,
      onClick: () => props.uppy.removeFile(file.id, "removed-by-user")
    }) : null);
  }
  var copyLinkToClipboard;
  var init_Buttons = __esm({
    "../packages/@uppy/dashboard/lib/components/FileItem/Buttons/index.js"() {
      init_preact_module();
      init_copyToClipboard();
      copyLinkToClipboard = (event, props) => {
        copyToClipboard(props.file.uploadURL, props.i18n("copyLinkToClipboardFallback")).then(() => {
          props.uppy.log("Link copied to clipboard.");
          props.uppy.info(props.i18n("copyLinkToClipboardSuccess"), "info", 3e3);
        }).catch(props.uppy.log).then(() => event.target.focus({
          preventScroll: true
        }));
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/index.js
  var import_classnames3, import_is_shallow_equal, FileItem;
  var init_FileItem = __esm({
    "../packages/@uppy/dashboard/lib/components/FileItem/index.js"() {
      init_preact_module();
      import_classnames3 = __toESM(require_classnames(), 1);
      import_is_shallow_equal = __toESM(require_is_shallow_equal(), 1);
      init_FilePreviewAndLink();
      init_FileProgress();
      init_FileInfo();
      init_Buttons();
      FileItem = class extends d {
        componentDidMount() {
          const {
            file
          } = this.props;
          if (!file.preview) {
            this.props.handleRequestThumbnail(file);
          }
        }
        shouldComponentUpdate(nextProps) {
          return !(0, import_is_shallow_equal.default)(this.props, nextProps);
        }
        componentDidUpdate() {
          const {
            file
          } = this.props;
          if (!file.preview) {
            this.props.handleRequestThumbnail(file);
          }
        }
        componentWillUnmount() {
          const {
            file
          } = this.props;
          if (!file.preview) {
            this.props.handleCancelThumbnail(file);
          }
        }
        render() {
          const {
            file
          } = this.props;
          const isProcessing = file.progress.preprocess || file.progress.postprocess;
          const isUploaded = file.progress.uploadComplete && !isProcessing && !file.error;
          const uploadInProgressOrComplete = file.progress.uploadStarted || isProcessing;
          const uploadInProgress = file.progress.uploadStarted && !file.progress.uploadComplete || isProcessing;
          const error = file.error || false;
          const {
            isGhost
          } = file;
          let showRemoveButton = this.props.individualCancellation ? !isUploaded : !uploadInProgress && !isUploaded;
          if (isUploaded && this.props.showRemoveButtonAfterComplete) {
            showRemoveButton = true;
          }
          const dashboardItemClass = (0, import_classnames3.default)({
            "uppy-Dashboard-Item": true,
            "is-inprogress": uploadInProgress && !this.props.recoveredState,
            "is-processing": isProcessing,
            "is-complete": isUploaded,
            "is-error": !!error,
            "is-resumable": this.props.resumableUploads,
            "is-noIndividualCancellation": !this.props.individualCancellation,
            "is-ghost": isGhost
          });
          return h("div", {
            className: dashboardItemClass,
            id: `uppy_${file.id}`,
            role: this.props.role
          }, h("div", {
            className: "uppy-Dashboard-Item-preview"
          }, h(FilePreviewAndLink, {
            file,
            showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
            i18n: this.props.i18n,
            toggleFileCard: this.props.toggleFileCard,
            metaFields: this.props.metaFields
          }), h(FileProgress, {
            uppy: this.props.uppy,
            file,
            error,
            isUploaded,
            hideRetryButton: this.props.hideRetryButton,
            hideCancelButton: this.props.hideCancelButton,
            hidePauseResumeButton: this.props.hidePauseResumeButton,
            recoveredState: this.props.recoveredState,
            showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
            resumableUploads: this.props.resumableUploads,
            individualCancellation: this.props.individualCancellation,
            i18n: this.props.i18n
          })), h("div", {
            className: "uppy-Dashboard-Item-fileInfoAndButtons"
          }, h(FileInfo, {
            file,
            id: this.props.id,
            acquirers: this.props.acquirers,
            containerWidth: this.props.containerWidth,
            i18n: this.props.i18n,
            toggleAddFilesPanel: this.props.toggleAddFilesPanel,
            toggleFileCard: this.props.toggleFileCard,
            metaFields: this.props.metaFields
          }), h(Buttons, {
            file,
            metaFields: this.props.metaFields,
            showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
            showRemoveButton,
            canEditFile: this.props.canEditFile,
            uploadInProgressOrComplete,
            toggleFileCard: this.props.toggleFileCard,
            openFileEditor: this.props.openFileEditor,
            uppy: this.props.uppy,
            i18n: this.props.i18n
          })));
        }
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/VirtualList.js
  function _extends2() {
    _extends2 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  var STYLE_INNER, STYLE_CONTENT, VirtualList, VirtualList_default;
  var init_VirtualList = __esm({
    "../packages/@uppy/dashboard/lib/components/VirtualList.js"() {
      init_preact_module();
      STYLE_INNER = {
        position: "relative",
        width: "100%",
        minHeight: "100%"
      };
      STYLE_CONTENT = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        overflow: "visible"
      };
      VirtualList = class extends d {
        constructor(props) {
          super(props);
          this.handleScroll = () => {
            this.setState({
              offset: this.base.scrollTop
            });
          };
          this.handleResize = () => {
            this.resize();
          };
          this.focusElement = null;
          this.state = {
            offset: 0,
            height: 0
          };
        }
        componentDidMount() {
          this.resize();
          window.addEventListener("resize", this.handleResize);
        }
        componentWillUpdate() {
          if (this.base.contains(document.activeElement)) {
            this.focusElement = document.activeElement;
          }
        }
        componentDidUpdate() {
          if (this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement) {
            this.focusElement.focus();
          }
          this.focusElement = null;
          this.resize();
        }
        componentWillUnmount() {
          window.removeEventListener("resize", this.handleResize);
        }
        resize() {
          const {
            height
          } = this.state;
          if (height !== this.base.offsetHeight) {
            this.setState({
              height: this.base.offsetHeight
            });
          }
        }
        render(_ref) {
          let {
            data,
            rowHeight,
            renderRow,
            overscanCount = 10,
            ...props
          } = _ref;
          const {
            offset,
            height
          } = this.state;
          let start = Math.floor(offset / rowHeight);
          let visibleRowCount = Math.floor(height / rowHeight);
          if (overscanCount) {
            start = Math.max(0, start - start % overscanCount);
            visibleRowCount += overscanCount;
          }
          const end = start + visibleRowCount + 4;
          const selection = data.slice(start, end);
          const styleInner = {
            ...STYLE_INNER,
            height: data.length * rowHeight
          };
          const styleContent = {
            ...STYLE_CONTENT,
            top: start * rowHeight
          };
          return h("div", _extends2({
            onScroll: this.handleScroll
          }, props), h("div", {
            role: "presentation",
            style: styleInner
          }, h("div", {
            role: "presentation",
            style: styleContent
          }, selection.map(renderRow))));
        }
      };
      VirtualList_default = VirtualList;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileList.js
  function _extends3() {
    _extends3 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends3.apply(this, arguments);
  }
  function chunks(list, size) {
    const chunked = [];
    let currentChunk = [];
    list.forEach((item) => {
      if (currentChunk.length < size) {
        currentChunk.push(item);
      } else {
        chunked.push(currentChunk);
        currentChunk = [item];
      }
    });
    if (currentChunk.length)
      chunked.push(currentChunk);
    return chunked;
  }
  var import_classnames4, FileList_default;
  var init_FileList = __esm({
    "../packages/@uppy/dashboard/lib/components/FileList.js"() {
      import_classnames4 = __toESM(require_classnames(), 1);
      init_preact_module();
      init_FileItem();
      init_VirtualList();
      FileList_default = (props) => {
        const noFiles = props.totalFileCount === 0;
        const dashboardFilesClass = (0, import_classnames4.default)("uppy-Dashboard-files", {
          "uppy-Dashboard-files--noFiles": noFiles
        });
        const rowHeight = props.itemsPerRow === 1 ? 71 : 200;
        const fileProps = {
          id: props.id,
          error: props.error,
          i18n: props.i18n,
          uppy: props.uppy,
          acquirers: props.acquirers,
          resumableUploads: props.resumableUploads,
          individualCancellation: props.individualCancellation,
          hideRetryButton: props.hideRetryButton,
          hidePauseResumeButton: props.hidePauseResumeButton,
          hideCancelButton: props.hideCancelButton,
          showLinkToFileUploadResult: props.showLinkToFileUploadResult,
          showRemoveButtonAfterComplete: props.showRemoveButtonAfterComplete,
          isWide: props.isWide,
          metaFields: props.metaFields,
          recoveredState: props.recoveredState,
          toggleFileCard: props.toggleFileCard,
          handleRequestThumbnail: props.handleRequestThumbnail,
          handleCancelThumbnail: props.handleCancelThumbnail
        };
        const sortByGhostComesFirst = (file1, file2) => {
          return props.files[file2].isGhost - props.files[file1].isGhost;
        };
        const files = Object.keys(props.files);
        if (props.recoveredState)
          files.sort(sortByGhostComesFirst);
        const rows = chunks(files, props.itemsPerRow);
        const renderRow = (row) => h("div", {
          role: "presentation",
          key: row[0]
        }, row.map((fileID) => h(FileItem, _extends3({
          key: fileID,
          uppy: props.uppy
        }, fileProps, {
          role: "listitem",
          openFileEditor: props.openFileEditor,
          canEditFile: props.canEditFile,
          toggleAddFilesPanel: props.toggleAddFilesPanel,
          file: props.files[fileID]
        }))));
        return h(VirtualList_default, {
          class: dashboardFilesClass,
          role: "list",
          data: rows,
          renderRow,
          rowHeight
        });
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/AddFiles.js
  var _Symbol$for3, AddFiles, AddFiles_default;
  var init_AddFiles = __esm({
    "../packages/@uppy/dashboard/lib/components/AddFiles.js"() {
      init_preact_module();
      _Symbol$for3 = Symbol.for("uppy test: disable unused locale key warning");
      AddFiles = class extends d {
        constructor() {
          super(...arguments);
          this.triggerFileInputClick = () => {
            this.fileInput.click();
          };
          this.triggerFolderInputClick = () => {
            this.folderInput.click();
          };
          this.triggerVideoCameraInputClick = () => {
            this.mobileVideoFileInput.click();
          };
          this.triggerPhotoCameraInputClick = () => {
            this.mobilePhotoFileInput.click();
          };
          this.onFileInputChange = (event) => {
            this.props.handleInputChange(event);
            event.target.value = null;
          };
          this.renderHiddenInput = (isFolder, refCallback) => {
            return h("input", {
              className: "uppy-Dashboard-input",
              hidden: true,
              "aria-hidden": "true",
              tabIndex: -1,
              webkitdirectory: isFolder,
              type: "file",
              name: "files[]",
              multiple: this.props.maxNumberOfFiles !== 1,
              onChange: this.onFileInputChange,
              accept: this.props.allowedFileTypes,
              ref: refCallback
            });
          };
          this.renderHiddenCameraInput = (type, refCallback) => {
            const typeToAccept = {
              photo: "image/*",
              video: "video/*"
            };
            const accept = typeToAccept[type];
            return h("input", {
              className: "uppy-Dashboard-input",
              hidden: true,
              "aria-hidden": "true",
              tabIndex: -1,
              type: "file",
              name: `camera-${type}`,
              onChange: this.onFileInputChange,
              capture: "user",
              accept,
              ref: refCallback
            });
          };
          this.renderMyDeviceAcquirer = () => {
            return h("div", {
              className: "uppy-DashboardTab",
              role: "presentation",
              "data-uppy-acquirer-id": "MyDevice"
            }, h("button", {
              type: "button",
              className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
              role: "tab",
              tabIndex: 0,
              "data-uppy-super-focusable": true,
              onClick: this.triggerFileInputClick
            }, h("svg", {
              "aria-hidden": "true",
              focusable: "false",
              width: "32",
              height: "32",
              viewBox: "0 0 32 32"
            }, h("g", {
              fill: "none",
              fillRule: "evenodd"
            }, h("rect", {
              className: "uppy-ProviderIconBg",
              width: "32",
              height: "32",
              rx: "16",
              fill: "#2275D7"
            }), h("path", {
              d: "M21.973 21.152H9.863l-1.108-5.087h14.464l-1.246 5.087zM9.935 11.37h3.958l.886 1.444a.673.673 0 0 0 .585.316h6.506v1.37H9.935v-3.13zm14.898 3.44a.793.793 0 0 0-.616-.31h-.978v-2.126c0-.379-.275-.613-.653-.613H15.75l-.886-1.445a.673.673 0 0 0-.585-.316H9.232c-.378 0-.667.209-.667.587V14.5h-.782a.793.793 0 0 0-.61.303.795.795 0 0 0-.155.663l1.45 6.633c.078.36.396.618.764.618h13.354c.36 0 .674-.246.76-.595l1.631-6.636a.795.795 0 0 0-.144-.675z",
              fill: "#FFF"
            }))), h("div", {
              className: "uppy-DashboardTab-name"
            }, this.props.i18n("myDevice"))));
          };
          this.renderPhotoCamera = () => {
            return h("div", {
              className: "uppy-DashboardTab",
              role: "presentation",
              "data-uppy-acquirer-id": "MobilePhotoCamera"
            }, h("button", {
              type: "button",
              className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
              role: "tab",
              tabIndex: 0,
              "data-uppy-super-focusable": true,
              onClick: this.triggerPhotoCameraInputClick
            }, h("svg", {
              "aria-hidden": "true",
              focusable: "false",
              width: "32",
              height: "32",
              viewBox: "0 0 32 32"
            }, h("g", {
              fill: "none",
              fillRule: "evenodd"
            }, h("rect", {
              className: "uppy-ProviderIconBg",
              fill: "#03BFEF",
              width: "32",
              height: "32",
              rx: "16"
            }), h("path", {
              d: "M22 11c1.133 0 2 .867 2 2v7.333c0 1.134-.867 2-2 2H10c-1.133 0-2-.866-2-2V13c0-1.133.867-2 2-2h2.333l1.134-1.733C13.6 9.133 13.8 9 14 9h4c.2 0 .4.133.533.267L19.667 11H22zm-6 1.533a3.764 3.764 0 0 0-3.8 3.8c0 2.129 1.672 3.801 3.8 3.801s3.8-1.672 3.8-3.8c0-2.13-1.672-3.801-3.8-3.801zm0 6.261c-1.395 0-2.46-1.066-2.46-2.46 0-1.395 1.065-2.461 2.46-2.461s2.46 1.066 2.46 2.46c0 1.395-1.065 2.461-2.46 2.461z",
              fill: "#FFF",
              fillRule: "nonzero"
            }))), h("div", {
              className: "uppy-DashboardTab-name"
            }, this.props.i18n("takePictureBtn"))));
          };
          this.renderVideoCamera = () => {
            return h("div", {
              className: "uppy-DashboardTab",
              role: "presentation",
              "data-uppy-acquirer-id": "MobileVideoCamera"
            }, h("button", {
              type: "button",
              className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
              role: "tab",
              tabIndex: 0,
              "data-uppy-super-focusable": true,
              onClick: this.triggerVideoCameraInputClick
            }, h("svg", {
              "aria-hidden": "true",
              width: "32",
              height: "32",
              viewBox: "0 0 32 32"
            }, h("rect", {
              fill: "#1abc9c",
              width: "32",
              height: "32",
              rx: "16"
            }), h("path", {
              fill: "#FFF",
              fillRule: "nonzero",
              d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
            })), h("div", {
              className: "uppy-DashboardTab-name"
            }, this.props.i18n("recordVideoBtn"))));
          };
          this.renderBrowseButton = (text, onClickFn) => {
            const numberOfAcquirers = this.props.acquirers.length;
            return h("button", {
              type: "button",
              className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
              onClick: onClickFn,
              "data-uppy-super-focusable": numberOfAcquirers === 0
            }, text);
          };
          this.renderDropPasteBrowseTagline = () => {
            const numberOfAcquirers = this.props.acquirers.length;
            const browseFiles = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick);
            const browseFolders = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick);
            const lowerFMSelectionType = this.props.fileManagerSelectionType;
            const camelFMSelectionType = lowerFMSelectionType.charAt(0).toUpperCase() + lowerFMSelectionType.slice(1);
            return h(
              "div",
              {
                class: "uppy-Dashboard-AddFiles-title"
              },
              this.props.disableLocalFiles ? this.props.i18n("importFiles") : numberOfAcquirers > 0 ? this.props.i18nArray(`dropPasteImport${camelFMSelectionType}`, {
                browseFiles,
                browseFolders,
                browse: browseFiles
              }) : this.props.i18nArray(`dropPaste${camelFMSelectionType}`, {
                browseFiles,
                browseFolders,
                browse: browseFiles
              })
            );
          };
          this.renderAcquirer = (acquirer) => {
            return h("div", {
              className: "uppy-DashboardTab",
              role: "presentation",
              "data-uppy-acquirer-id": acquirer.id
            }, h("button", {
              type: "button",
              className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
              role: "tab",
              tabIndex: 0,
              "data-cy": acquirer.id,
              "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`,
              "aria-selected": this.props.activePickerPanel.id === acquirer.id,
              "data-uppy-super-focusable": true,
              onClick: () => this.props.showPanel(acquirer.id)
            }, acquirer.icon(), h("div", {
              className: "uppy-DashboardTab-name"
            }, acquirer.name)));
          };
          this.renderAcquirers = (acquirers) => {
            const acquirersWithoutLastTwo = [...acquirers];
            const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
            return h(p, null, acquirersWithoutLastTwo.map((acquirer) => this.renderAcquirer(acquirer)), h("span", {
              role: "presentation",
              style: {
                "white-space": "nowrap"
              }
            }, lastTwoAcquirers.map((acquirer) => this.renderAcquirer(acquirer))));
          };
          this.renderSourcesList = (acquirers, disableLocalFiles) => {
            const {
              showNativePhotoCameraButton,
              showNativeVideoCameraButton
            } = this.props;
            return h("div", {
              className: "uppy-Dashboard-AddFiles-list",
              role: "tablist"
            }, !disableLocalFiles && this.renderMyDeviceAcquirer(), !disableLocalFiles && showNativePhotoCameraButton && this.renderPhotoCamera(), !disableLocalFiles && showNativeVideoCameraButton && this.renderVideoCamera(), acquirers.length > 0 && this.renderAcquirers(acquirers));
          };
        }
        [_Symbol$for3]() {
          this.props.i18nArray("dropPasteBoth");
          this.props.i18nArray("dropPasteFiles");
          this.props.i18nArray("dropPasteFolders");
          this.props.i18nArray("dropPasteImportBoth");
          this.props.i18nArray("dropPasteImportFiles");
          this.props.i18nArray("dropPasteImportFolders");
        }
        renderPoweredByUppy() {
          const {
            i18nArray
          } = this.props;
          const uppyBranding = h("span", null, h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
            width: "11",
            height: "11",
            viewBox: "0 0 11 11"
          }, h("path", {
            d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
            fillRule: "evenodd"
          })), h("span", {
            className: "uppy-Dashboard-poweredByUppy"
          }, "Uppy"));
          const linkText = i18nArray("poweredBy", {
            uppy: uppyBranding
          });
          return h("a", {
            tabIndex: "-1",
            href: "https://uppy.io",
            rel: "noreferrer noopener",
            target: "_blank",
            className: "uppy-Dashboard-poweredBy"
          }, linkText);
        }
        render() {
          const {
            showNativePhotoCameraButton,
            showNativeVideoCameraButton
          } = this.props;
          return h("div", {
            className: "uppy-Dashboard-AddFiles"
          }, this.renderHiddenInput(false, (ref) => {
            this.fileInput = ref;
          }), this.renderHiddenInput(true, (ref) => {
            this.folderInput = ref;
          }), showNativePhotoCameraButton && this.renderHiddenCameraInput("photo", (ref) => {
            this.mobilePhotoFileInput = ref;
          }), showNativeVideoCameraButton && this.renderHiddenCameraInput("video", (ref) => {
            this.mobileVideoFileInput = ref;
          }), this.renderDropPasteBrowseTagline(), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), h("div", {
            className: "uppy-Dashboard-AddFiles-info"
          }, this.props.note && h("div", {
            className: "uppy-Dashboard-note"
          }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)));
        }
      };
      AddFiles_default = AddFiles;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/AddFilesPanel.js
  var import_classnames5, AddFilesPanel, AddFilesPanel_default;
  var init_AddFilesPanel = __esm({
    "../packages/@uppy/dashboard/lib/components/AddFilesPanel.js"() {
      init_preact_module();
      import_classnames5 = __toESM(require_classnames(), 1);
      init_AddFiles();
      AddFilesPanel = (props) => {
        return h("div", {
          className: (0, import_classnames5.default)("uppy-Dashboard-AddFilesPanel", props.className),
          "data-uppy-panelType": "AddFiles",
          "aria-hidden": props.showAddFilesPanel
        }, h("div", {
          className: "uppy-DashboardContent-bar"
        }, h("div", {
          className: "uppy-DashboardContent-title",
          role: "heading",
          "aria-level": "1"
        }, props.i18n("addingMoreFiles")), h("button", {
          className: "uppy-DashboardContent-back",
          type: "button",
          onClick: () => props.toggleAddFilesPanel(false)
        }, props.i18n("back"))), h(AddFiles_default, props));
      };
      AddFilesPanel_default = AddFilesPanel;
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/ignoreEvent.js
  function ignoreEvent(ev) {
    const {
      tagName
    } = ev.target;
    if (tagName === "INPUT" || tagName === "TEXTAREA") {
      ev.stopPropagation();
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
  }
  var ignoreEvent_default;
  var init_ignoreEvent = __esm({
    "../packages/@uppy/dashboard/lib/utils/ignoreEvent.js"() {
      ignoreEvent_default = ignoreEvent;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/PickerPanelContent.js
  function PickerPanelContent(_ref) {
    let {
      activePickerPanel,
      className,
      hideAllPanels,
      i18n,
      state,
      uppy
    } = _ref;
    return h("div", {
      className: (0, import_classnames6.default)("uppy-DashboardContent-panel", className),
      role: "tabpanel",
      "data-uppy-panelType": "PickerPanel",
      id: `uppy-DashboardContent-panel--${activePickerPanel.id}`,
      onDragOver: ignoreEvent_default,
      onDragLeave: ignoreEvent_default,
      onDrop: ignoreEvent_default,
      onPaste: ignoreEvent_default
    }, h("div", {
      className: "uppy-DashboardContent-bar"
    }, h("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, i18n("importFrom", {
      name: activePickerPanel.name
    })), h("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: hideAllPanels
    }, i18n("cancel"))), h("div", {
      className: "uppy-DashboardContent-panelBody"
    }, uppy.getPlugin(activePickerPanel.id).render(state)));
  }
  var import_classnames6, PickerPanelContent_default;
  var init_PickerPanelContent = __esm({
    "../packages/@uppy/dashboard/lib/components/PickerPanelContent.js"() {
      init_preact_module();
      import_classnames6 = __toESM(require_classnames(), 1);
      init_ignoreEvent();
      PickerPanelContent_default = PickerPanelContent;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/EditorPanel.js
  function EditorPanel(props) {
    const file = props.files[props.fileCardFor];
    return h("div", {
      className: (0, import_classnames7.default)("uppy-DashboardContent-panel", props.className),
      role: "tabpanel",
      "data-uppy-panelType": "FileEditor",
      id: "uppy-DashboardContent-panel--editor"
    }, h("div", {
      className: "uppy-DashboardContent-bar"
    }, h("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, props.i18nArray("editing", {
      file: h("span", {
        className: "uppy-DashboardContent-titleFile"
      }, file.meta ? file.meta.name : file.name)
    })), h("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: props.hideAllPanels
    }, props.i18n("cancel")), h("button", {
      className: "uppy-DashboardContent-save",
      type: "button",
      onClick: props.saveFileEditor
    }, props.i18n("save"))), h("div", {
      className: "uppy-DashboardContent-panelBody"
    }, props.editors.map((target) => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })));
  }
  var import_classnames7, EditorPanel_default;
  var init_EditorPanel = __esm({
    "../packages/@uppy/dashboard/lib/components/EditorPanel.js"() {
      init_preact_module();
      import_classnames7 = __toESM(require_classnames(), 1);
      EditorPanel_default = EditorPanel;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/PickerPanelTopBar.js
  function getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files) {
    if (files === void 0) {
      files = {};
    }
    if (isAllErrored) {
      return uploadStates.STATE_ERROR;
    }
    if (isAllComplete) {
      return uploadStates.STATE_COMPLETE;
    }
    if (isAllPaused) {
      return uploadStates.STATE_PAUSED;
    }
    let state = uploadStates.STATE_WAITING;
    const fileIDs = Object.keys(files);
    for (let i4 = 0; i4 < fileIDs.length; i4++) {
      const {
        progress
      } = files[fileIDs[i4]];
      if (progress.uploadStarted && !progress.uploadComplete) {
        return uploadStates.STATE_UPLOADING;
      }
      if (progress.preprocess && state !== uploadStates.STATE_UPLOADING) {
        state = uploadStates.STATE_PREPROCESSING;
      }
      if (progress.postprocess && state !== uploadStates.STATE_UPLOADING && state !== uploadStates.STATE_PREPROCESSING) {
        state = uploadStates.STATE_POSTPROCESSING;
      }
    }
    return state;
  }
  function UploadStatus(_ref) {
    let {
      files,
      i18n,
      isAllComplete,
      isAllErrored,
      isAllPaused,
      inProgressNotPausedFiles,
      newFiles,
      processingFiles
    } = _ref;
    const uploadingState = getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files);
    switch (uploadingState) {
      case "uploading":
        return i18n("uploadingXFiles", {
          smart_count: inProgressNotPausedFiles.length
        });
      case "preprocessing":
      case "postprocessing":
        return i18n("processingXFiles", {
          smart_count: processingFiles.length
        });
      case "paused":
        return i18n("uploadPaused");
      case "waiting":
        return i18n("xFilesSelected", {
          smart_count: newFiles.length
        });
      case "complete":
        return i18n("uploadComplete");
      default:
    }
  }
  function PanelTopBar(props) {
    const {
      i18n,
      isAllComplete,
      hideCancelButton,
      maxNumberOfFiles,
      toggleAddFilesPanel,
      uppy
    } = props;
    let {
      allowNewUpload
    } = props;
    if (allowNewUpload && maxNumberOfFiles) {
      allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
    }
    return h("div", {
      className: "uppy-DashboardContent-bar"
    }, !isAllComplete && !hideCancelButton ? h("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: () => uppy.cancelAll()
    }, i18n("cancel")) : h("div", null), h("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, h(UploadStatus, props)), allowNewUpload ? h("button", {
      className: "uppy-DashboardContent-addMore",
      type: "button",
      "aria-label": i18n("addMoreFiles"),
      title: i18n("addMoreFiles"),
      onClick: () => toggleAddFilesPanel(true)
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "15",
      height: "15",
      viewBox: "0 0 15 15"
    }, h("path", {
      d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
    })), h("span", {
      className: "uppy-DashboardContent-addMoreCaption"
    }, i18n("addMore"))) : h("div", null));
  }
  var uploadStates, PickerPanelTopBar_default;
  var init_PickerPanelTopBar = __esm({
    "../packages/@uppy/dashboard/lib/components/PickerPanelTopBar.js"() {
      init_preact_module();
      uploadStates = {
        STATE_ERROR: "error",
        STATE_WAITING: "waiting",
        STATE_PREPROCESSING: "preprocessing",
        STATE_UPLOADING: "uploading",
        STATE_POSTPROCESSING: "postprocessing",
        STATE_COMPLETE: "complete",
        STATE_PAUSED: "paused"
      };
      PickerPanelTopBar_default = PanelTopBar;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileCard/index.js
  var import_classnames8, FileCard, FileCard_default;
  var init_FileCard = __esm({
    "../packages/@uppy/dashboard/lib/components/FileCard/index.js"() {
      init_preact_module();
      import_classnames8 = __toESM(require_classnames(), 1);
      init_non_secure();
      init_getFileTypeIcon();
      init_ignoreEvent();
      init_FilePreview();
      FileCard = class extends d {
        constructor(props) {
          super(props);
          this.form = document.createElement("form");
          this.updateMeta = (newVal, name) => {
            this.setState((_ref) => {
              let {
                formState
              } = _ref;
              return {
                formState: {
                  ...formState,
                  [name]: newVal
                }
              };
            });
          };
          this.handleSave = (e3) => {
            e3.preventDefault();
            const fileID = this.props.fileCardFor;
            this.props.saveFileCard(this.state.formState, fileID);
          };
          this.handleCancel = () => {
            const file = this.props.files[this.props.fileCardFor];
            this.props.uppy.emit("file-editor:cancel", file);
            this.props.toggleFileCard(false);
          };
          this.saveOnEnter = (ev) => {
            if (ev.keyCode === 13) {
              ev.stopPropagation();
              ev.preventDefault();
              const file = this.props.files[this.props.fileCardFor];
              this.props.saveFileCard(this.state.formState, file.id);
            }
          };
          this.renderMetaFields = () => {
            const metaFields = this.getMetaFields() || [];
            const fieldCSSClasses = {
              text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
            };
            return metaFields.map((field) => {
              const id21 = `uppy-Dashboard-FileCard-input-${field.id}`;
              const required = this.props.requiredMetaFields.includes(field.id);
              return h("fieldset", {
                key: field.id,
                className: "uppy-Dashboard-FileCard-fieldset"
              }, h("label", {
                className: "uppy-Dashboard-FileCard-label",
                htmlFor: id21
              }, field.name), field.render !== void 0 ? field.render({
                value: this.state.formState[field.id],
                onChange: (newVal) => this.updateMeta(newVal, field.id),
                fieldCSSClasses,
                required,
                form: this.form.id
              }, h) : h("input", {
                className: fieldCSSClasses.text,
                id: id21,
                form: this.form.id,
                type: field.type || "text",
                required,
                value: this.state.formState[field.id],
                placeholder: field.placeholder,
                onKeyUp: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
                onKeyDown: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
                onKeyPress: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
                onInput: (ev) => this.updateMeta(ev.target.value, field.id),
                "data-uppy-super-focusable": true
              }));
            });
          };
          const _file = this.props.files[this.props.fileCardFor];
          const _metaFields = this.getMetaFields() || [];
          const storedMetaData = {};
          _metaFields.forEach((field) => {
            storedMetaData[field.id] = _file.meta[field.id] || "";
          });
          this.state = {
            formState: storedMetaData
          };
          this.form.id = nanoid();
        }
        componentWillMount() {
          this.form.addEventListener("submit", this.handleSave);
          document.body.appendChild(this.form);
        }
        componentWillUnmount() {
          this.form.removeEventListener("submit", this.handleSave);
          document.body.removeChild(this.form);
        }
        getMetaFields() {
          return typeof this.props.metaFields === "function" ? this.props.metaFields(this.props.files[this.props.fileCardFor]) : this.props.metaFields;
        }
        render() {
          const file = this.props.files[this.props.fileCardFor];
          const showEditButton = this.props.canEditFile(file);
          return h("div", {
            className: (0, import_classnames8.default)("uppy-Dashboard-FileCard", this.props.className),
            "data-uppy-panelType": "FileCard",
            onDragOver: ignoreEvent_default,
            onDragLeave: ignoreEvent_default,
            onDrop: ignoreEvent_default,
            onPaste: ignoreEvent_default
          }, h("div", {
            className: "uppy-DashboardContent-bar"
          }, h("div", {
            className: "uppy-DashboardContent-title",
            role: "heading",
            "aria-level": "1"
          }, this.props.i18nArray("editing", {
            file: h("span", {
              className: "uppy-DashboardContent-titleFile"
            }, file.meta ? file.meta.name : file.name)
          })), h("button", {
            className: "uppy-DashboardContent-back",
            type: "button",
            form: this.form.id,
            title: this.props.i18n("finishEditingFile"),
            onClick: this.handleCancel
          }, this.props.i18n("cancel"))), h("div", {
            className: "uppy-Dashboard-FileCard-inner"
          }, h("div", {
            className: "uppy-Dashboard-FileCard-preview",
            style: {
              backgroundColor: getIconByMime(file.type).color
            }
          }, h(FilePreview, {
            file
          }), showEditButton && h("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
            onClick: (event) => {
              this.handleSave(event);
              this.props.openFileEditor(file);
            },
            form: this.form.id
          }, this.props.i18n("editFile"))), h("div", {
            className: "uppy-Dashboard-FileCard-info"
          }, this.renderMetaFields()), h("div", {
            className: "uppy-Dashboard-FileCard-actions"
          }, h("button", {
            className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
            type: "form" in HTMLButtonElement.prototype ? "submit" : "button",
            onClick: "form" in HTMLButtonElement.prototype ? void 0 : this.handleSave,
            form: this.form.id
          }, this.props.i18n("saveChanges")), h("button", {
            className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
            type: "button",
            onClick: this.handleCancel,
            form: this.form.id
          }, this.props.i18n("cancel")))));
        }
      };
      FileCard_default = FileCard;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/Slide.js
  var import_classnames9, transitionName, duration, Slide, Slide_default;
  var init_Slide = __esm({
    "../packages/@uppy/dashboard/lib/components/Slide.js"() {
      init_preact_module();
      import_classnames9 = __toESM(require_classnames(), 1);
      transitionName = "uppy-transition-slideDownUp";
      duration = 250;
      Slide = class extends d {
        constructor(props) {
          super(props);
          this.state = {
            cachedChildren: null,
            className: ""
          };
        }
        componentWillUpdate(nextProps) {
          const {
            cachedChildren
          } = this.state;
          const child = x(nextProps.children)[0];
          if (cachedChildren === child)
            return null;
          const patch = {
            cachedChildren: child
          };
          if (child && !cachedChildren) {
            patch.className = `${transitionName}-enter`;
            cancelAnimationFrame(this.animationFrame);
            clearTimeout(this.leaveTimeout);
            this.leaveTimeout = void 0;
            this.animationFrame = requestAnimationFrame(() => {
              this.setState({
                className: `${transitionName}-enter ${transitionName}-enter-active`
              });
              this.enterTimeout = setTimeout(() => {
                this.setState({
                  className: ""
                });
              }, duration);
            });
          }
          if (cachedChildren && !child && this.leaveTimeout === void 0) {
            patch.cachedChildren = cachedChildren;
            patch.className = `${transitionName}-leave`;
            cancelAnimationFrame(this.animationFrame);
            clearTimeout(this.enterTimeout);
            this.enterTimeout = void 0;
            this.animationFrame = requestAnimationFrame(() => {
              this.setState({
                className: `${transitionName}-leave ${transitionName}-leave-active`
              });
              this.leaveTimeout = setTimeout(() => {
                this.setState({
                  cachedChildren: null,
                  className: ""
                });
              }, duration);
            });
          }
          this.setState(patch);
        }
        render() {
          const {
            cachedChildren,
            className
          } = this.state;
          if (!cachedChildren) {
            return null;
          }
          return q(cachedChildren, {
            className: (0, import_classnames9.default)(className, cachedChildren.props.className)
          });
        }
      };
      Slide_default = Slide;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/Dashboard.js
  function _extends4() {
    _extends4 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends4.apply(this, arguments);
  }
  function Dashboard(props) {
    const noFiles = props.totalFileCount === 0;
    const isSizeMD = props.containerWidth > WIDTH_MD;
    const dashboardClassName = (0, import_classnames10.default)({
      "uppy-Dashboard": true,
      "uppy-Dashboard--isDisabled": props.disabled,
      "uppy-Dashboard--animateOpenClose": props.animateOpenClose,
      "uppy-Dashboard--isClosing": props.isClosing,
      "uppy-Dashboard--isDraggingOver": props.isDraggingOver,
      "uppy-Dashboard--modal": !props.inline,
      "uppy-size--md": props.containerWidth > WIDTH_MD,
      "uppy-size--lg": props.containerWidth > WIDTH_LG,
      "uppy-size--xl": props.containerWidth > WIDTH_XL,
      "uppy-size--height-md": props.containerHeight > HEIGHT_MD,
      "uppy-Dashboard--isAddFilesPanelVisible": props.showAddFilesPanel,
      "uppy-Dashboard--isInnerWrapVisible": props.areInsidesReadyToBeVisible
    });
    let itemsPerRow = 1;
    if (props.containerWidth > WIDTH_XL) {
      itemsPerRow = 5;
    } else if (props.containerWidth > WIDTH_LG) {
      itemsPerRow = 4;
    } else if (props.containerWidth > WIDTH_MD) {
      itemsPerRow = 3;
    }
    const showFileList = props.showSelectedFiles && !noFiles;
    const numberOfFilesForRecovery = props.recoveredState ? Object.keys(props.recoveredState.files).length : null;
    const numberOfGhosts = props.files ? Object.keys(props.files).filter((fileID) => props.files[fileID].isGhost).length : null;
    const renderRestoredText = () => {
      if (numberOfGhosts > 0) {
        return props.i18n("recoveredXFiles", {
          smart_count: numberOfGhosts
        });
      }
      return props.i18n("recoveredAllFiles");
    };
    const dashboard = h("div", {
      className: dashboardClassName,
      "data-uppy-theme": props.theme,
      "data-uppy-num-acquirers": props.acquirers.length,
      "data-uppy-drag-drop-supported": !props.disableLocalFiles && isDragDropSupported(),
      "aria-hidden": props.inline ? "false" : props.isHidden,
      "aria-disabled": props.disabled,
      "aria-label": !props.inline ? props.i18n("dashboardWindowTitle") : props.i18n("dashboardTitle"),
      onPaste: props.handlePaste,
      onDragOver: props.handleDragOver,
      onDragLeave: props.handleDragLeave,
      onDrop: props.handleDrop
    }, h("div", {
      "aria-hidden": "true",
      className: "uppy-Dashboard-overlay",
      tabIndex: -1,
      onClick: props.handleClickOutside
    }), h("div", {
      className: "uppy-Dashboard-inner",
      "aria-modal": !props.inline && "true",
      role: !props.inline && "dialog",
      style: {
        width: props.inline && props.width ? props.width : "",
        height: props.inline && props.height ? props.height : ""
      }
    }, !props.inline ? h("button", {
      className: "uppy-u-reset uppy-Dashboard-close",
      type: "button",
      "aria-label": props.i18n("closeModal"),
      title: props.i18n("closeModal"),
      onClick: props.closeModal
    }, h("span", {
      "aria-hidden": "true"
    }, "\xD7")) : null, h("div", {
      className: "uppy-Dashboard-innerWrap"
    }, h("div", {
      className: "uppy-Dashboard-dropFilesHereHint"
    }, props.i18n("dropHint")), showFileList && h(PickerPanelTopBar_default, props), numberOfFilesForRecovery && h("div", {
      className: "uppy-Dashboard-serviceMsg"
    }, h("svg", {
      className: "uppy-Dashboard-serviceMsg-icon",
      "aria-hidden": "true",
      focusable: "false",
      width: "21",
      height: "16",
      viewBox: "0 0 24 19"
    }, h("g", {
      transform: "translate(0 -1)",
      fill: "none",
      fillRule: "evenodd"
    }, h("path", {
      d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
      fill: "#FFD300"
    }), h("path", {
      fill: "#000",
      d: "M11 6h2l-.3 8h-1.4z"
    }), h("circle", {
      fill: "#000",
      cx: "12",
      cy: "17",
      r: "1"
    }))), h("strong", {
      className: "uppy-Dashboard-serviceMsg-title"
    }, props.i18n("sessionRestored")), h("div", {
      className: "uppy-Dashboard-serviceMsg-text"
    }, renderRestoredText())), showFileList ? h(
      FileList_default,
      _extends4({}, props, {
        itemsPerRow
      })
    ) : h(AddFiles_default, _extends4({}, props, {
      isSizeMD
    })), h(Slide_default, null, props.showAddFilesPanel ? h(AddFilesPanel_default, _extends4({
      key: "AddFiles"
    }, props, {
      isSizeMD
    })) : null), h(Slide_default, null, props.fileCardFor ? h(FileCard_default, _extends4({
      key: "FileCard"
    }, props)) : null), h(Slide_default, null, props.activePickerPanel ? h(PickerPanelContent_default, _extends4({
      key: "Picker"
    }, props)) : null), h(Slide_default, null, props.showFileEditor ? h(EditorPanel_default, _extends4({
      key: "Editor"
    }, props)) : null), h("div", {
      className: "uppy-Dashboard-progressindicators"
    }, props.progressindicators.map((target) => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })))));
    return dashboard;
  }
  var import_classnames10, WIDTH_XL, WIDTH_LG, WIDTH_MD, HEIGHT_MD;
  var init_Dashboard = __esm({
    "../packages/@uppy/dashboard/lib/components/Dashboard.js"() {
      init_preact_module();
      import_classnames10 = __toESM(require_classnames(), 1);
      init_isDragDropSupported();
      init_FileList();
      init_AddFiles();
      init_AddFilesPanel();
      init_PickerPanelContent();
      init_EditorPanel();
      init_PickerPanelTopBar();
      init_FileCard();
      init_Slide();
      WIDTH_XL = 900;
      WIDTH_LG = 700;
      WIDTH_MD = 576;
      HEIGHT_MD = 400;
    }
  });

  // ../packages/@uppy/dashboard/lib/locale.js
  var locale_default4;
  var init_locale4 = __esm({
    "../packages/@uppy/dashboard/lib/locale.js"() {
      locale_default4 = {
        strings: {
          closeModal: "Close Modal",
          addMoreFiles: "Add more files",
          addingMoreFiles: "Adding more files",
          importFrom: "Import from %{name}",
          dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
          dashboardTitle: "Uppy Dashboard",
          copyLinkToClipboardSuccess: "Link copied to clipboard.",
          copyLinkToClipboardFallback: "Copy the URL below",
          copyLink: "Copy link",
          back: "Back",
          removeFile: "Remove file",
          editFile: "Edit file",
          editing: "Editing %{file}",
          finishEditingFile: "Finish editing file",
          saveChanges: "Save changes",
          myDevice: "My Device",
          dropHint: "Drop your files here",
          uploadComplete: "Upload complete",
          uploadPaused: "Upload paused",
          resumeUpload: "Resume upload",
          pauseUpload: "Pause upload",
          retryUpload: "Retry upload",
          cancelUpload: "Cancel upload",
          xFilesSelected: {
            0: "%{smart_count} file selected",
            1: "%{smart_count} files selected"
          },
          uploadingXFiles: {
            0: "Uploading %{smart_count} file",
            1: "Uploading %{smart_count} files"
          },
          processingXFiles: {
            0: "Processing %{smart_count} file",
            1: "Processing %{smart_count} files"
          },
          poweredBy: "Powered by %{uppy}",
          addMore: "Add more",
          editFileWithFilename: "Edit file %{file}",
          save: "Save",
          cancel: "Cancel",
          dropPasteFiles: "Drop files here or %{browseFiles}",
          dropPasteFolders: "Drop files here or %{browseFolders}",
          dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
          dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
          dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
          dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
          importFiles: "Import files from:",
          browseFiles: "browse files",
          browseFolders: "browse folders",
          recoveredXFiles: {
            0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
            1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
          },
          recoveredAllFiles: "We restored all files. You can now resume the upload.",
          sessionRestored: "Session restored",
          reSelect: "Re-select",
          missingRequiredMetaFields: {
            0: "Missing required meta field: %{fields}.",
            1: "Missing required meta fields: %{fields}."
          },
          takePictureBtn: "Take Picture",
          recordVideoBtn: "Record Video"
        }
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/Dashboard.js
  function _classPrivateFieldLooseBase5(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey5(name) {
    return "__private_" + id5++ + "_" + name;
  }
  function createPromise() {
    const o3 = {};
    o3.promise = new Promise((resolve, reject) => {
      o3.resolve = resolve;
      o3.reject = reject;
    });
    return o3;
  }
  function defaultPickerIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "30",
      height: "30",
      viewBox: "0 0 30 30"
    }, h("path", {
      d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
    }));
  }
  var id5, packageJson7, memoize, TAB_KEY, ESC_KEY, _openFileEditorWhenFilesAdded, _attachRenderFunctionToTarget, _isTargetSupported, _getAcquirers, _getProgressIndicators, _getEditors, Dashboard2;
  var init_Dashboard2 = __esm({
    "../packages/@uppy/dashboard/lib/Dashboard.js"() {
      init_preact_module();
      init_lib2();
      init_lib4();
      init_lib5();
      init_lib6();
      init_findAllDOMElements();
      init_toArray();
      init_getDroppedFiles();
      init_non_secure();
      init_memoize_one_esm();
      init_FOCUSABLE_ELEMENTS();
      init_trapFocus();
      init_createSuperFocus();
      init_Dashboard();
      init_locale4();
      id5 = 0;
      packageJson7 = {
        "version": "3.0.0-beta.4"
      };
      memoize = memoizeOne.default || memoizeOne;
      TAB_KEY = 9;
      ESC_KEY = 27;
      _openFileEditorWhenFilesAdded = /* @__PURE__ */ _classPrivateFieldLooseKey5("openFileEditorWhenFilesAdded");
      _attachRenderFunctionToTarget = /* @__PURE__ */ _classPrivateFieldLooseKey5("attachRenderFunctionToTarget");
      _isTargetSupported = /* @__PURE__ */ _classPrivateFieldLooseKey5("isTargetSupported");
      _getAcquirers = /* @__PURE__ */ _classPrivateFieldLooseKey5("getAcquirers");
      _getProgressIndicators = /* @__PURE__ */ _classPrivateFieldLooseKey5("getProgressIndicators");
      _getEditors = /* @__PURE__ */ _classPrivateFieldLooseKey5("getEditors");
      Dashboard2 = class extends UIPlugin_default {
        constructor(uppy, _opts) {
          var _this;
          super(uppy, _opts);
          _this = this;
          this.removeTarget = (plugin) => {
            const pluginState = this.getPluginState();
            const newTargets = pluginState.targets.filter((target) => target.id !== plugin.id);
            this.setPluginState({
              targets: newTargets
            });
          };
          this.addTarget = (plugin) => {
            const callerPluginId = plugin.id || plugin.constructor.name;
            const callerPluginName = plugin.title || callerPluginId;
            const callerPluginType = plugin.type;
            if (callerPluginType !== "acquirer" && callerPluginType !== "progressindicator" && callerPluginType !== "editor") {
              const msg = "Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor";
              this.uppy.log(msg, "error");
              return void 0;
            }
            const target = {
              id: callerPluginId,
              name: callerPluginName,
              type: callerPluginType
            };
            const state = this.getPluginState();
            const newTargets = state.targets.slice();
            newTargets.push(target);
            this.setPluginState({
              targets: newTargets
            });
            return this.el;
          };
          this.hideAllPanels = () => {
            const state = this.getPluginState();
            const update = {
              activePickerPanel: false,
              showAddFilesPanel: false,
              activeOverlayType: null,
              fileCardFor: null,
              showFileEditor: false
            };
            if (state.activePickerPanel === update.activePickerPanel && state.showAddFilesPanel === update.showAddFilesPanel && state.showFileEditor === update.showFileEditor && state.activeOverlayType === update.activeOverlayType) {
              return;
            }
            this.setPluginState(update);
          };
          this.showPanel = (id21) => {
            const {
              targets
            } = this.getPluginState();
            const activePickerPanel = targets.filter((target) => {
              return target.type === "acquirer" && target.id === id21;
            })[0];
            this.setPluginState({
              activePickerPanel,
              activeOverlayType: "PickerPanel"
            });
          };
          this.canEditFile = (file) => {
            const {
              targets
            } = this.getPluginState();
            const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
            return editors.some((target) => this.uppy.getPlugin(target.id).canEditFile(file));
          };
          this.openFileEditor = (file) => {
            const {
              targets
            } = this.getPluginState();
            const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
            this.setPluginState({
              showFileEditor: true,
              fileCardFor: file.id || null,
              activeOverlayType: "FileEditor"
            });
            editors.forEach((editor) => {
              this.uppy.getPlugin(editor.id).selectFile(file);
            });
          };
          this.saveFileEditor = () => {
            const {
              targets
            } = this.getPluginState();
            const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
            editors.forEach((editor) => {
              this.uppy.getPlugin(editor.id).save();
            });
            this.hideAllPanels();
          };
          this.openModal = () => {
            const {
              promise,
              resolve
            } = createPromise();
            this.savedScrollPosition = window.pageYOffset;
            this.savedActiveElement = document.activeElement;
            if (this.opts.disablePageScrollWhenModalOpen) {
              document.body.classList.add("uppy-Dashboard-isFixed");
            }
            if (this.opts.animateOpenClose && this.getPluginState().isClosing) {
              const handler = () => {
                this.setPluginState({
                  isHidden: false
                });
                this.el.removeEventListener("animationend", handler, false);
                resolve();
              };
              this.el.addEventListener("animationend", handler, false);
            } else {
              this.setPluginState({
                isHidden: false
              });
              resolve();
            }
            if (this.opts.browserBackButtonClose) {
              this.updateBrowserHistory();
            }
            document.addEventListener("keydown", this.handleKeyDownInModal);
            this.uppy.emit("dashboard:modal-open");
            return promise;
          };
          this.closeModal = function(opts) {
            if (opts === void 0) {
              opts = {};
            }
            const {
              manualClose = true
            } = opts;
            const {
              isHidden,
              isClosing
            } = _this.getPluginState();
            if (isHidden || isClosing) {
              return void 0;
            }
            const {
              promise,
              resolve
            } = createPromise();
            if (_this.opts.disablePageScrollWhenModalOpen) {
              document.body.classList.remove("uppy-Dashboard-isFixed");
            }
            if (_this.opts.animateOpenClose) {
              _this.setPluginState({
                isClosing: true
              });
              const handler = () => {
                _this.setPluginState({
                  isHidden: true,
                  isClosing: false
                });
                _this.superFocus.cancel();
                _this.savedActiveElement.focus();
                _this.el.removeEventListener("animationend", handler, false);
                resolve();
              };
              _this.el.addEventListener("animationend", handler, false);
            } else {
              _this.setPluginState({
                isHidden: true
              });
              _this.superFocus.cancel();
              _this.savedActiveElement.focus();
              resolve();
            }
            document.removeEventListener("keydown", _this.handleKeyDownInModal);
            if (manualClose) {
              if (_this.opts.browserBackButtonClose) {
                var _history$state;
                if ((_history$state = history.state) != null && _history$state[_this.modalName]) {
                  history.back();
                }
              }
            }
            _this.uppy.emit("dashboard:modal-closed");
            return promise;
          };
          this.isModalOpen = () => {
            return !this.getPluginState().isHidden || false;
          };
          this.requestCloseModal = () => {
            if (this.opts.onRequestCloseModal) {
              return this.opts.onRequestCloseModal();
            }
            return this.closeModal();
          };
          this.setDarkModeCapability = (isDarkModeOn) => {
            const {
              capabilities
            } = this.uppy.getState();
            this.uppy.setState({
              capabilities: {
                ...capabilities,
                darkMode: isDarkModeOn
              }
            });
          };
          this.handleSystemDarkModeChange = (event) => {
            const isDarkModeOnNow = event.matches;
            this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnNow ? "on" : "off"}`);
            this.setDarkModeCapability(isDarkModeOnNow);
          };
          this.toggleFileCard = (show, fileID) => {
            const file = this.uppy.getFile(fileID);
            if (show) {
              this.uppy.emit("dashboard:file-edit-start", file);
            } else {
              this.uppy.emit("dashboard:file-edit-complete", file);
            }
            this.setPluginState({
              fileCardFor: show ? fileID : null,
              activeOverlayType: show ? "FileCard" : null
            });
          };
          this.toggleAddFilesPanel = (show) => {
            this.setPluginState({
              showAddFilesPanel: show,
              activeOverlayType: show ? "AddFiles" : null
            });
          };
          this.addFiles = (files) => {
            const descriptors = files.map((file) => ({
              source: this.id,
              name: file.name,
              type: file.type,
              data: file,
              meta: {
                relativePath: file.relativePath || file.webkitRelativePath || null
              }
            }));
            try {
              this.uppy.addFiles(descriptors);
            } catch (err) {
              this.uppy.log(err);
            }
          };
          this.startListeningToResize = () => {
            this.resizeObserver = new ResizeObserver((entries) => {
              const uppyDashboardInnerEl = entries[0];
              const {
                width,
                height
              } = uppyDashboardInnerEl.contentRect;
              this.uppy.log(`[Dashboard] resized: ${width} / ${height}`, "debug");
              this.setPluginState({
                containerWidth: width,
                containerHeight: height,
                areInsidesReadyToBeVisible: true
              });
            });
            this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner"));
            this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
              const pluginState = this.getPluginState();
              const isModalAndClosed = !this.opts.inline && pluginState.isHidden;
              if (!pluginState.areInsidesReadyToBeVisible && !isModalAndClosed) {
                this.uppy.log("[Dashboard] resize event didn't fire on time: defaulted to mobile layout", "debug");
                this.setPluginState({
                  areInsidesReadyToBeVisible: true
                });
              }
            }, 1e3);
          };
          this.stopListeningToResize = () => {
            this.resizeObserver.disconnect();
            clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
          };
          this.recordIfFocusedOnUppyRecently = (event) => {
            if (this.el.contains(event.target)) {
              this.ifFocusedOnUppyRecently = true;
            } else {
              this.ifFocusedOnUppyRecently = false;
              this.superFocus.cancel();
            }
          };
          this.disableAllFocusableElements = (disable) => {
            const focusableNodes = toArray_default(this.el.querySelectorAll(FOCUSABLE_ELEMENTS_default));
            if (disable) {
              focusableNodes.forEach((node) => {
                const currentTabIndex = node.getAttribute("tabindex");
                if (currentTabIndex) {
                  node.dataset.inertTabindex = currentTabIndex;
                }
                node.setAttribute("tabindex", "-1");
              });
            } else {
              focusableNodes.forEach((node) => {
                if ("inertTabindex" in node.dataset) {
                  node.setAttribute("tabindex", node.dataset.inertTabindex);
                } else {
                  node.removeAttribute("tabindex");
                }
              });
            }
            this.dashboardIsDisabled = disable;
          };
          this.updateBrowserHistory = () => {
            var _history$state2;
            if (!((_history$state2 = history.state) != null && _history$state2[this.modalName])) {
              history.pushState({
                ...history.state,
                [this.modalName]: true
              }, "");
            }
            window.addEventListener("popstate", this.handlePopState, false);
          };
          this.handlePopState = (event) => {
            var _event$state;
            if (this.isModalOpen() && (!event.state || !event.state[this.modalName])) {
              this.closeModal({
                manualClose: false
              });
            }
            if (!this.isModalOpen() && (_event$state = event.state) != null && _event$state[this.modalName]) {
              history.back();
            }
          };
          this.handleKeyDownInModal = (event) => {
            if (event.keyCode === ESC_KEY)
              this.requestCloseModal(event);
            if (event.keyCode === TAB_KEY)
              trapFocus(event, this.getPluginState().activeOverlayType, this.el);
          };
          this.handleClickOutside = () => {
            if (this.opts.closeModalOnClickOutside)
              this.requestCloseModal();
          };
          this.handlePaste = (event) => {
            this.uppy.iteratePlugins((plugin) => {
              if (plugin.type === "acquirer") {
                plugin.handleRootPaste == null ? void 0 : plugin.handleRootPaste(event);
              }
            });
            const files = toArray_default(event.clipboardData.files);
            if (files.length > 0) {
              this.uppy.log("[Dashboard] Files pasted");
              this.addFiles(files);
            }
          };
          this.handleInputChange = (event) => {
            event.preventDefault();
            const files = toArray_default(event.target.files);
            if (files.length > 0) {
              this.uppy.log("[Dashboard] Files selected through input");
              this.addFiles(files);
            }
          };
          this.handleDragOver = (event) => {
            var _this$opts$onDragOver, _this$opts;
            event.preventDefault();
            event.stopPropagation();
            const canSomePluginHandleRootDrop = () => {
              let somePluginCanHandleRootDrop2 = true;
              this.uppy.iteratePlugins((plugin) => {
                if (plugin.canHandleRootDrop != null && plugin.canHandleRootDrop(event)) {
                  somePluginCanHandleRootDrop2 = true;
                }
              });
              return somePluginCanHandleRootDrop2;
            };
            const doesEventHaveFiles = () => {
              const {
                types
              } = event.dataTransfer;
              return types.some((type) => type === "Files");
            };
            const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop(event);
            const hasFiles = doesEventHaveFiles(event);
            if (!somePluginCanHandleRootDrop && !hasFiles || this.opts.disabled || this.opts.disableLocalFiles && (hasFiles || !somePluginCanHandleRootDrop) || !this.uppy.getState().allowNewUpload) {
              event.dataTransfer.dropEffect = "none";
              clearTimeout(this.removeDragOverClassTimeout);
              return;
            }
            event.dataTransfer.dropEffect = "copy";
            clearTimeout(this.removeDragOverClassTimeout);
            this.setPluginState({
              isDraggingOver: true
            });
            (_this$opts$onDragOver = (_this$opts = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts, event);
          };
          this.handleDragLeave = (event) => {
            var _this$opts$onDragLeav, _this$opts2;
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this.removeDragOverClassTimeout);
            this.removeDragOverClassTimeout = setTimeout(() => {
              this.setPluginState({
                isDraggingOver: false
              });
            }, 50);
            (_this$opts$onDragLeav = (_this$opts2 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts2, event);
          };
          this.handleDrop = async (event) => {
            var _this$opts$onDrop, _this$opts3;
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this.removeDragOverClassTimeout);
            this.setPluginState({
              isDraggingOver: false
            });
            this.uppy.iteratePlugins((plugin) => {
              if (plugin.type === "acquirer") {
                plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
              }
            });
            let executedDropErrorOnce = false;
            const logDropError = (error) => {
              this.uppy.log(error, "error");
              if (!executedDropErrorOnce) {
                this.uppy.info(error.message, "error");
                executedDropErrorOnce = true;
              }
            };
            const files = await getDroppedFiles(event.dataTransfer, {
              logDropError
            });
            if (files.length > 0) {
              this.uppy.log("[Dashboard] Files dropped");
              this.addFiles(files);
            }
            (_this$opts$onDrop = (_this$opts3 = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts3, event);
          };
          this.handleRequestThumbnail = (file) => {
            if (!this.opts.waitForThumbnailsBeforeUpload) {
              this.uppy.emit("thumbnail:request", file);
            }
          };
          this.handleCancelThumbnail = (file) => {
            if (!this.opts.waitForThumbnailsBeforeUpload) {
              this.uppy.emit("thumbnail:cancel", file);
            }
          };
          this.handleKeyDownInInline = (event) => {
            if (event.keyCode === TAB_KEY)
              forInline(event, this.getPluginState().activeOverlayType, this.el);
          };
          this.handlePasteOnBody = (event) => {
            const isFocusInOverlay2 = this.el.contains(document.activeElement);
            if (isFocusInOverlay2) {
              this.handlePaste(event);
            }
          };
          this.handleComplete = (_ref) => {
            let {
              failed
            } = _ref;
            if (this.opts.closeAfterFinish && failed.length === 0) {
              this.requestCloseModal();
            }
          };
          this.handleCancelRestore = () => {
            this.uppy.emit("restore-canceled");
          };
          Object.defineProperty(this, _openFileEditorWhenFilesAdded, {
            writable: true,
            value: (files) => {
              const firstFile = files[0];
              if (this.canEditFile(firstFile)) {
                this.openFileEditor(firstFile);
              }
            }
          });
          this.initEvents = () => {
            if (this.opts.trigger && !this.opts.inline) {
              const showModalTrigger = findAllDOMElements(this.opts.trigger);
              if (showModalTrigger) {
                showModalTrigger.forEach((trigger) => trigger.addEventListener("click", this.openModal));
              } else {
                this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
              }
            }
            this.startListeningToResize();
            document.addEventListener("paste", this.handlePasteOnBody);
            this.uppy.on("plugin-remove", this.removeTarget);
            this.uppy.on("file-added", this.hideAllPanels);
            this.uppy.on("dashboard:modal-closed", this.hideAllPanels);
            this.uppy.on("file-editor:complete", this.hideAllPanels);
            this.uppy.on("complete", this.handleComplete);
            document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, true);
            document.addEventListener("click", this.recordIfFocusedOnUppyRecently, true);
            if (this.opts.inline) {
              this.el.addEventListener("keydown", this.handleKeyDownInInline);
            }
            if (this.opts.autoOpenFileEditor) {
              this.uppy.on("files-added", _classPrivateFieldLooseBase5(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
            }
          };
          this.removeEvents = () => {
            const showModalTrigger = findAllDOMElements(this.opts.trigger);
            if (!this.opts.inline && showModalTrigger) {
              showModalTrigger.forEach((trigger) => trigger.removeEventListener("click", this.openModal));
            }
            this.stopListeningToResize();
            document.removeEventListener("paste", this.handlePasteOnBody);
            window.removeEventListener("popstate", this.handlePopState, false);
            this.uppy.off("plugin-remove", this.removeTarget);
            this.uppy.off("file-added", this.hideAllPanels);
            this.uppy.off("dashboard:modal-closed", this.hideAllPanels);
            this.uppy.off("file-editor:complete", this.hideAllPanels);
            this.uppy.off("complete", this.handleComplete);
            document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently);
            document.removeEventListener("click", this.recordIfFocusedOnUppyRecently);
            if (this.opts.inline) {
              this.el.removeEventListener("keydown", this.handleKeyDownInInline);
            }
            if (this.opts.autoOpenFileEditor) {
              this.uppy.off("files-added", _classPrivateFieldLooseBase5(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
            }
          };
          this.superFocusOnEachUpdate = () => {
            const isFocusInUppy = this.el.contains(document.activeElement);
            const isFocusNowhere = document.activeElement === document.body || document.activeElement === null;
            const isInformerHidden = this.uppy.getState().info.length === 0;
            const isModal = !this.opts.inline;
            if (isInformerHidden && (isModal || isFocusInUppy || isFocusNowhere && this.ifFocusedOnUppyRecently)) {
              this.superFocus(this.el, this.getPluginState().activeOverlayType);
            } else {
              this.superFocus.cancel();
            }
          };
          this.afterUpdate = () => {
            if (this.opts.disabled && !this.dashboardIsDisabled) {
              this.disableAllFocusableElements(true);
              return;
            }
            if (!this.opts.disabled && this.dashboardIsDisabled) {
              this.disableAllFocusableElements(false);
            }
            this.superFocusOnEachUpdate();
          };
          this.saveFileCard = (meta, fileID) => {
            this.uppy.setFileMeta(fileID, meta);
            this.toggleFileCard(false, fileID);
          };
          Object.defineProperty(this, _attachRenderFunctionToTarget, {
            writable: true,
            value: (target) => {
              const plugin = this.uppy.getPlugin(target.id);
              return {
                ...target,
                icon: plugin.icon || this.opts.defaultPickerIcon,
                render: plugin.render
              };
            }
          });
          Object.defineProperty(this, _isTargetSupported, {
            writable: true,
            value: (target) => {
              const plugin = this.uppy.getPlugin(target.id);
              if (typeof plugin.isSupported !== "function") {
                return true;
              }
              return plugin.isSupported();
            }
          });
          Object.defineProperty(this, _getAcquirers, {
            writable: true,
            value: memoize((targets) => {
              return targets.filter((target) => target.type === "acquirer" && _classPrivateFieldLooseBase5(this, _isTargetSupported)[_isTargetSupported](target)).map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
            })
          });
          Object.defineProperty(this, _getProgressIndicators, {
            writable: true,
            value: memoize((targets) => {
              return targets.filter((target) => target.type === "progressindicator").map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
            })
          });
          Object.defineProperty(this, _getEditors, {
            writable: true,
            value: memoize((targets) => {
              return targets.filter((target) => target.type === "editor").map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
            })
          });
          this.render = (state) => {
            const pluginState = this.getPluginState();
            const {
              files,
              capabilities,
              allowNewUpload
            } = state;
            const {
              newFiles,
              uploadStartedFiles,
              completeFiles,
              erroredFiles,
              inProgressFiles,
              inProgressNotPausedFiles,
              processingFiles,
              isUploadStarted,
              isAllComplete,
              isAllErrored,
              isAllPaused
            } = this.uppy.getObjectOfFilesPerState();
            const acquirers = _classPrivateFieldLooseBase5(this, _getAcquirers)[_getAcquirers](pluginState.targets);
            const progressindicators = _classPrivateFieldLooseBase5(this, _getProgressIndicators)[_getProgressIndicators](pluginState.targets);
            const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](pluginState.targets);
            let theme;
            if (this.opts.theme === "auto") {
              theme = capabilities.darkMode ? "dark" : "light";
            } else {
              theme = this.opts.theme;
            }
            if (["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0) {
              this.opts.fileManagerSelectionType = "files";
              console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`);
            }
            return Dashboard({
              state,
              isHidden: pluginState.isHidden,
              files,
              newFiles,
              uploadStartedFiles,
              completeFiles,
              erroredFiles,
              inProgressFiles,
              inProgressNotPausedFiles,
              processingFiles,
              isUploadStarted,
              isAllComplete,
              isAllErrored,
              isAllPaused,
              totalFileCount: Object.keys(files).length,
              totalProgress: state.totalProgress,
              allowNewUpload,
              acquirers,
              theme,
              disabled: this.opts.disabled,
              disableLocalFiles: this.opts.disableLocalFiles,
              direction: this.opts.direction,
              activePickerPanel: pluginState.activePickerPanel,
              showFileEditor: pluginState.showFileEditor,
              saveFileEditor: this.saveFileEditor,
              disableAllFocusableElements: this.disableAllFocusableElements,
              animateOpenClose: this.opts.animateOpenClose,
              isClosing: pluginState.isClosing,
              progressindicators,
              editors,
              autoProceed: this.uppy.opts.autoProceed,
              id: this.id,
              closeModal: this.requestCloseModal,
              handleClickOutside: this.handleClickOutside,
              handleInputChange: this.handleInputChange,
              handlePaste: this.handlePaste,
              inline: this.opts.inline,
              showPanel: this.showPanel,
              hideAllPanels: this.hideAllPanels,
              i18n: this.i18n,
              i18nArray: this.i18nArray,
              uppy: this.uppy,
              note: this.opts.note,
              recoveredState: state.recoveredState,
              metaFields: pluginState.metaFields,
              resumableUploads: capabilities.resumableUploads || false,
              individualCancellation: capabilities.individualCancellation,
              isMobileDevice: capabilities.isMobileDevice,
              fileCardFor: pluginState.fileCardFor,
              toggleFileCard: this.toggleFileCard,
              toggleAddFilesPanel: this.toggleAddFilesPanel,
              showAddFilesPanel: pluginState.showAddFilesPanel,
              saveFileCard: this.saveFileCard,
              openFileEditor: this.openFileEditor,
              canEditFile: this.canEditFile,
              width: this.opts.width,
              height: this.opts.height,
              showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
              fileManagerSelectionType: this.opts.fileManagerSelectionType,
              proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
              hideCancelButton: this.opts.hideCancelButton,
              hideRetryButton: this.opts.hideRetryButton,
              hidePauseResumeButton: this.opts.hidePauseResumeButton,
              showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
              containerWidth: pluginState.containerWidth,
              containerHeight: pluginState.containerHeight,
              areInsidesReadyToBeVisible: pluginState.areInsidesReadyToBeVisible,
              isTargetDOMEl: this.isTargetDOMEl,
              parentElement: this.el,
              allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
              maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
              requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
              showSelectedFiles: this.opts.showSelectedFiles,
              showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
              showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
              handleCancelRestore: this.handleCancelRestore,
              handleRequestThumbnail: this.handleRequestThumbnail,
              handleCancelThumbnail: this.handleCancelThumbnail,
              isDraggingOver: pluginState.isDraggingOver,
              handleDragOver: this.handleDragOver,
              handleDragLeave: this.handleDragLeave,
              handleDrop: this.handleDrop
            });
          };
          this.discoverProviderPlugins = () => {
            this.uppy.iteratePlugins((plugin) => {
              if (plugin && !plugin.target && plugin.opts && plugin.opts.target === this.constructor) {
                this.addTarget(plugin);
              }
            });
          };
          this.install = () => {
            this.setPluginState({
              isHidden: true,
              fileCardFor: null,
              activeOverlayType: null,
              showAddFilesPanel: false,
              activePickerPanel: false,
              showFileEditor: false,
              metaFields: this.opts.metaFields,
              targets: [],
              areInsidesReadyToBeVisible: false,
              isDraggingOver: false
            });
            const {
              inline,
              closeAfterFinish
            } = this.opts;
            if (inline && closeAfterFinish) {
              throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
            }
            const {
              allowMultipleUploads,
              allowMultipleUploadBatches
            } = this.uppy.opts;
            if ((allowMultipleUploads || allowMultipleUploadBatches) && closeAfterFinish) {
              this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
            }
            const {
              target
            } = this.opts;
            if (target) {
              this.mount(target, this);
            }
            const plugins = this.opts.plugins || [];
            plugins.forEach((pluginID) => {
              const plugin = this.uppy.getPlugin(pluginID);
              if (plugin) {
                plugin.mount(this, plugin);
              }
            });
            if (!this.opts.disableStatusBar) {
              this.uppy.use(StatusBar2, {
                id: `${this.id}:StatusBar`,
                target: this,
                hideUploadButton: this.opts.hideUploadButton,
                hideRetryButton: this.opts.hideRetryButton,
                hidePauseResumeButton: this.opts.hidePauseResumeButton,
                hideCancelButton: this.opts.hideCancelButton,
                showProgressDetails: this.opts.showProgressDetails,
                hideAfterFinish: this.opts.hideProgressAfterFinish,
                locale: this.opts.locale,
                doneButtonHandler: this.opts.doneButtonHandler
              });
            }
            if (!this.opts.disableInformer) {
              this.uppy.use(Informer, {
                id: `${this.id}:Informer`,
                target: this
              });
            }
            if (!this.opts.disableThumbnailGenerator) {
              this.uppy.use(ThumbnailGenerator, {
                id: `${this.id}:ThumbnailGenerator`,
                thumbnailWidth: this.opts.thumbnailWidth,
                thumbnailHeight: this.opts.thumbnailHeight,
                thumbnailType: this.opts.thumbnailType,
                waitForThumbnailsBeforeUpload: this.opts.waitForThumbnailsBeforeUpload,
                lazy: !this.opts.waitForThumbnailsBeforeUpload
              });
            }
            this.darkModeMediaQuery = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
            const isDarkModeOnFromTheStart = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : false;
            this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnFromTheStart ? "on" : "off"}`);
            this.setDarkModeCapability(isDarkModeOnFromTheStart);
            if (this.opts.theme === "auto") {
              this.darkModeMediaQuery.addListener(this.handleSystemDarkModeChange);
            }
            this.discoverProviderPlugins();
            this.initEvents();
          };
          this.uninstall = () => {
            if (!this.opts.disableInformer) {
              const informer = this.uppy.getPlugin(`${this.id}:Informer`);
              if (informer)
                this.uppy.removePlugin(informer);
            }
            if (!this.opts.disableStatusBar) {
              const statusBar = this.uppy.getPlugin(`${this.id}:StatusBar`);
              if (statusBar)
                this.uppy.removePlugin(statusBar);
            }
            if (!this.opts.disableThumbnailGenerator) {
              const thumbnail = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
              if (thumbnail)
                this.uppy.removePlugin(thumbnail);
            }
            const plugins = this.opts.plugins || [];
            plugins.forEach((pluginID) => {
              const plugin = this.uppy.getPlugin(pluginID);
              if (plugin)
                plugin.unmount();
            });
            if (this.opts.theme === "auto") {
              this.darkModeMediaQuery.removeListener(this.handleSystemDarkModeChange);
            }
            this.unmount();
            this.removeEvents();
          };
          this.id = this.opts.id || "Dashboard";
          this.title = "Dashboard";
          this.type = "orchestrator";
          this.modalName = `uppy-Dashboard-${nanoid()}`;
          this.defaultLocale = locale_default4;
          const defaultOptions4 = {
            target: "body",
            metaFields: [],
            trigger: null,
            inline: false,
            width: 750,
            height: 550,
            thumbnailWidth: 280,
            thumbnailType: "image/jpeg",
            waitForThumbnailsBeforeUpload: false,
            defaultPickerIcon,
            showLinkToFileUploadResult: false,
            showProgressDetails: false,
            hideUploadButton: false,
            hideCancelButton: false,
            hideRetryButton: false,
            hidePauseResumeButton: false,
            hideProgressAfterFinish: false,
            doneButtonHandler: () => {
              this.uppy.cancelAll();
              this.requestCloseModal();
            },
            note: null,
            closeModalOnClickOutside: false,
            closeAfterFinish: false,
            disableStatusBar: false,
            disableInformer: false,
            disableThumbnailGenerator: false,
            disablePageScrollWhenModalOpen: true,
            animateOpenClose: true,
            fileManagerSelectionType: "files",
            proudlyDisplayPoweredByUppy: true,
            onRequestCloseModal: () => this.closeModal(),
            showSelectedFiles: true,
            showRemoveButtonAfterComplete: false,
            browserBackButtonClose: false,
            showNativePhotoCameraButton: false,
            showNativeVideoCameraButton: false,
            theme: "light",
            autoOpenFileEditor: false,
            disabled: false,
            disableLocalFiles: false
          };
          this.opts = {
            ...defaultOptions4,
            ..._opts
          };
          this.i18nInit();
          this.superFocus = createSuperFocus();
          this.ifFocusedOnUppyRecently = false;
          this.makeDashboardInsidesVisibleAnywayTimeout = null;
          this.removeDragOverClassTimeout = null;
        }
      };
      Dashboard2.VERSION = packageJson7.version;
    }
  });

  // ../packages/@uppy/dashboard/lib/index.js
  var lib_exports4 = {};
  __export(lib_exports4, {
    default: () => Dashboard2
  });
  var init_lib7 = __esm({
    "../packages/@uppy/dashboard/lib/index.js"() {
      init_Dashboard2();
    }
  });

  // ../packages/@uppy/robodog/lib/addDashboardPlugin.js
  var require_addDashboardPlugin = __commonJS({
    "../packages/@uppy/robodog/lib/addDashboardPlugin.js"(exports, module) {
      var Dashboard3 = (init_lib7(), __toCommonJS(lib_exports4));
      var has2 = (init_hasProperty(), __toCommonJS(hasProperty_exports));
      var dashboardOptionNames = ["metaFields", "width", "height", "thumbnailWidth", "showLinkToFileUploadResult", "showProgressDetails", "hideRetryButton", "hideCancelButton", "hideUploadButton", "hideProgressAfterFinish", "note", "disableStatusBar", "disableInformer", "disableThumbnailGenerator", "showSelectedFiles", "proudlyDisplayPoweredByUppy", "theme"];
      var modalDashboardOptionNames = ["trigger", "closeModalOnClickOutside", "closeAfterFinish", "disablePageScrollWhenModalOpen", "animateOpenClose", "onRequestCloseModal", "browserBackButtonClose"];
      function addDashboardPlugin(uppy, opts, overrideOpts) {
        const dashboardOpts = {};
        dashboardOptionNames.forEach((key) => {
          if (has2(opts, key)) {
            dashboardOpts[key] = opts[key];
          }
        });
        const inline = overrideOpts.inline == null ? dashboardOpts.inline : overrideOpts.inline;
        if (!inline) {
          modalDashboardOptionNames.forEach((key) => {
            if (has2(opts, key)) {
              dashboardOpts[key] = opts[key];
            }
          });
        }
        uppy.use(Dashboard3, {
          ...dashboardOpts,
          ...overrideOpts
        });
      }
      module.exports = addDashboardPlugin;
    }
  });

  // ../packages/@uppy/utils/lib/ErrorWithCause.js
  var ErrorWithCause, ErrorWithCause_default;
  var init_ErrorWithCause = __esm({
    "../packages/@uppy/utils/lib/ErrorWithCause.js"() {
      init_hasProperty();
      ErrorWithCause = class extends Error {
        constructor(message, options) {
          if (options === void 0) {
            options = {};
          }
          super(message);
          this.cause = options.cause;
          if (this.cause && has(this.cause, "isNetworkError")) {
            this.isNetworkError = this.cause.isNetworkError;
          }
        }
      };
      ErrorWithCause_default = ErrorWithCause;
    }
  });

  // ../packages/@uppy/utils/lib/RateLimitedQueue.js
  function _classPrivateFieldLooseBase6(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey6(name) {
    return "__private_" + id6++ + "_" + name;
  }
  function createCancelError() {
    return new Error("Cancelled");
  }
  function _call2(fn) {
    _classPrivateFieldLooseBase6(this, _activeRequests)[_activeRequests] += 1;
    let done = false;
    let cancelActive;
    try {
      cancelActive = fn();
    } catch (err) {
      _classPrivateFieldLooseBase6(this, _activeRequests)[_activeRequests] -= 1;
      throw err;
    }
    return {
      abort: () => {
        if (done)
          return;
        done = true;
        _classPrivateFieldLooseBase6(this, _activeRequests)[_activeRequests] -= 1;
        cancelActive();
        _classPrivateFieldLooseBase6(this, _queueNext)[_queueNext]();
      },
      done: () => {
        if (done)
          return;
        done = true;
        _classPrivateFieldLooseBase6(this, _activeRequests)[_activeRequests] -= 1;
        _classPrivateFieldLooseBase6(this, _queueNext)[_queueNext]();
      }
    };
  }
  function _queueNext2() {
    queueMicrotask(() => _classPrivateFieldLooseBase6(this, _next)[_next]());
  }
  function _next2() {
    if (_classPrivateFieldLooseBase6(this, _paused)[_paused] || _classPrivateFieldLooseBase6(this, _activeRequests)[_activeRequests] >= this.limit) {
      return;
    }
    if (_classPrivateFieldLooseBase6(this, _queuedHandlers)[_queuedHandlers].length === 0) {
      return;
    }
    const next = _classPrivateFieldLooseBase6(this, _queuedHandlers)[_queuedHandlers].shift();
    const handler = _classPrivateFieldLooseBase6(this, _call)[_call](next.fn);
    next.abort = handler.abort;
    next.done = handler.done;
  }
  function _queue2(fn, options) {
    if (options === void 0) {
      options = {};
    }
    const handler = {
      fn,
      priority: options.priority || 0,
      abort: () => {
        _classPrivateFieldLooseBase6(this, _dequeue)[_dequeue](handler);
      },
      done: () => {
        throw new Error("Cannot mark a queued request as done: this indicates a bug");
      }
    };
    const index = _classPrivateFieldLooseBase6(this, _queuedHandlers)[_queuedHandlers].findIndex((other) => {
      return handler.priority > other.priority;
    });
    if (index === -1) {
      _classPrivateFieldLooseBase6(this, _queuedHandlers)[_queuedHandlers].push(handler);
    } else {
      _classPrivateFieldLooseBase6(this, _queuedHandlers)[_queuedHandlers].splice(index, 0, handler);
    }
    return handler;
  }
  function _dequeue2(handler) {
    const index = _classPrivateFieldLooseBase6(this, _queuedHandlers)[_queuedHandlers].indexOf(handler);
    if (index !== -1) {
      _classPrivateFieldLooseBase6(this, _queuedHandlers)[_queuedHandlers].splice(index, 1);
    }
  }
  var id6, _activeRequests, _queuedHandlers, _paused, _pauseTimer, _downLimit, _upperLimit, _rateLimitingTimer, _call, _queueNext, _next, _queue, _dequeue, _resume, _increaseLimit, RateLimitedQueue, internalRateLimitedQueue;
  var init_RateLimitedQueue = __esm({
    "../packages/@uppy/utils/lib/RateLimitedQueue.js"() {
      id6 = 0;
      _activeRequests = /* @__PURE__ */ _classPrivateFieldLooseKey6("activeRequests");
      _queuedHandlers = /* @__PURE__ */ _classPrivateFieldLooseKey6("queuedHandlers");
      _paused = /* @__PURE__ */ _classPrivateFieldLooseKey6("paused");
      _pauseTimer = /* @__PURE__ */ _classPrivateFieldLooseKey6("pauseTimer");
      _downLimit = /* @__PURE__ */ _classPrivateFieldLooseKey6("downLimit");
      _upperLimit = /* @__PURE__ */ _classPrivateFieldLooseKey6("upperLimit");
      _rateLimitingTimer = /* @__PURE__ */ _classPrivateFieldLooseKey6("rateLimitingTimer");
      _call = /* @__PURE__ */ _classPrivateFieldLooseKey6("call");
      _queueNext = /* @__PURE__ */ _classPrivateFieldLooseKey6("queueNext");
      _next = /* @__PURE__ */ _classPrivateFieldLooseKey6("next");
      _queue = /* @__PURE__ */ _classPrivateFieldLooseKey6("queue");
      _dequeue = /* @__PURE__ */ _classPrivateFieldLooseKey6("dequeue");
      _resume = /* @__PURE__ */ _classPrivateFieldLooseKey6("resume");
      _increaseLimit = /* @__PURE__ */ _classPrivateFieldLooseKey6("increaseLimit");
      RateLimitedQueue = class {
        constructor(limit) {
          Object.defineProperty(this, _dequeue, {
            value: _dequeue2
          });
          Object.defineProperty(this, _queue, {
            value: _queue2
          });
          Object.defineProperty(this, _next, {
            value: _next2
          });
          Object.defineProperty(this, _queueNext, {
            value: _queueNext2
          });
          Object.defineProperty(this, _call, {
            value: _call2
          });
          Object.defineProperty(this, _activeRequests, {
            writable: true,
            value: 0
          });
          Object.defineProperty(this, _queuedHandlers, {
            writable: true,
            value: []
          });
          Object.defineProperty(this, _paused, {
            writable: true,
            value: false
          });
          Object.defineProperty(this, _pauseTimer, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _downLimit, {
            writable: true,
            value: 1
          });
          Object.defineProperty(this, _upperLimit, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _rateLimitingTimer, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _resume, {
            writable: true,
            value: () => this.resume()
          });
          Object.defineProperty(this, _increaseLimit, {
            writable: true,
            value: () => {
              if (_classPrivateFieldLooseBase6(this, _paused)[_paused]) {
                _classPrivateFieldLooseBase6(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase6(this, _increaseLimit)[_increaseLimit], 0);
                return;
              }
              _classPrivateFieldLooseBase6(this, _downLimit)[_downLimit] = this.limit;
              this.limit = Math.ceil((_classPrivateFieldLooseBase6(this, _upperLimit)[_upperLimit] + _classPrivateFieldLooseBase6(this, _downLimit)[_downLimit]) / 2);
              for (let i4 = _classPrivateFieldLooseBase6(this, _downLimit)[_downLimit]; i4 <= this.limit; i4++) {
                _classPrivateFieldLooseBase6(this, _queueNext)[_queueNext]();
              }
              if (_classPrivateFieldLooseBase6(this, _upperLimit)[_upperLimit] - _classPrivateFieldLooseBase6(this, _downLimit)[_downLimit] > 3) {
                _classPrivateFieldLooseBase6(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase6(this, _increaseLimit)[_increaseLimit], 2e3);
              } else {
                _classPrivateFieldLooseBase6(this, _downLimit)[_downLimit] = Math.floor(_classPrivateFieldLooseBase6(this, _downLimit)[_downLimit] / 2);
              }
            }
          });
          if (typeof limit !== "number" || limit === 0) {
            this.limit = Infinity;
          } else {
            this.limit = limit;
          }
        }
        run(fn, queueOptions) {
          if (!_classPrivateFieldLooseBase6(this, _paused)[_paused] && _classPrivateFieldLooseBase6(this, _activeRequests)[_activeRequests] < this.limit) {
            return _classPrivateFieldLooseBase6(this, _call)[_call](fn);
          }
          return _classPrivateFieldLooseBase6(this, _queue)[_queue](fn, queueOptions);
        }
        wrapPromiseFunction(fn, queueOptions) {
          var _this = this;
          return function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            let queuedRequest;
            const outerPromise = new Promise((resolve, reject) => {
              queuedRequest = _this.run(() => {
                let cancelError;
                let innerPromise;
                try {
                  innerPromise = Promise.resolve(fn(...args));
                } catch (err) {
                  innerPromise = Promise.reject(err);
                }
                innerPromise.then((result2) => {
                  if (cancelError) {
                    reject(cancelError);
                  } else {
                    queuedRequest.done();
                    resolve(result2);
                  }
                }, (err) => {
                  if (cancelError) {
                    reject(cancelError);
                  } else {
                    queuedRequest.done();
                    reject(err);
                  }
                });
                return () => {
                  cancelError = createCancelError();
                };
              }, queueOptions);
            });
            outerPromise.abort = () => {
              queuedRequest.abort();
            };
            return outerPromise;
          };
        }
        resume() {
          _classPrivateFieldLooseBase6(this, _paused)[_paused] = false;
          clearTimeout(_classPrivateFieldLooseBase6(this, _pauseTimer)[_pauseTimer]);
          for (let i4 = 0; i4 < this.limit; i4++) {
            _classPrivateFieldLooseBase6(this, _queueNext)[_queueNext]();
          }
        }
        pause(duration2) {
          if (duration2 === void 0) {
            duration2 = null;
          }
          _classPrivateFieldLooseBase6(this, _paused)[_paused] = true;
          clearTimeout(_classPrivateFieldLooseBase6(this, _pauseTimer)[_pauseTimer]);
          if (duration2 != null) {
            _classPrivateFieldLooseBase6(this, _pauseTimer)[_pauseTimer] = setTimeout(_classPrivateFieldLooseBase6(this, _resume)[_resume], duration2);
          }
        }
        rateLimit(duration2) {
          clearTimeout(_classPrivateFieldLooseBase6(this, _rateLimitingTimer)[_rateLimitingTimer]);
          this.pause(duration2);
          if (this.limit > 1 && Number.isFinite(this.limit)) {
            _classPrivateFieldLooseBase6(this, _upperLimit)[_upperLimit] = this.limit - 1;
            this.limit = _classPrivateFieldLooseBase6(this, _downLimit)[_downLimit];
            _classPrivateFieldLooseBase6(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase6(this, _increaseLimit)[_increaseLimit], duration2);
          }
        }
        get isPaused() {
          return _classPrivateFieldLooseBase6(this, _paused)[_paused];
        }
      };
      internalRateLimitedQueue = Symbol("__queue");
    }
  });

  // ../node_modules/js-base64/base64.mjs
  var version, VERSION, _hasatob, _hasbtoa, _hasBuffer, _TD, _TE, b64ch, b64chs, b64tab, b64re, _fromCC, _U8Afrom, _mkUriSafe, _tidyB64, btoaPolyfill, _btoa, _fromUint8Array, fromUint8Array, cb_utob, re_utob, utob, _encode, encode, encodeURI2, re_btou, cb_btou, btou, atobPolyfill, _atob, _toUint8Array, toUint8Array, _decode, _unURI, decode, isValid, _noEnum, extendString, extendUint8Array, extendBuiltins, gBase64;
  var init_base64 = __esm({
    "../node_modules/js-base64/base64.mjs"() {
      version = "3.7.2";
      VERSION = version;
      _hasatob = typeof atob === "function";
      _hasbtoa = typeof btoa === "function";
      _hasBuffer = typeof Buffer === "function";
      _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
      _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
      b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      b64chs = Array.prototype.slice.call(b64ch);
      b64tab = ((a3) => {
        let tab = {};
        a3.forEach((c3, i4) => tab[c3] = i4);
        return tab;
      })(b64chs);
      b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
      _fromCC = String.fromCharCode.bind(String);
      _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x2) => x2) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
      _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
      _tidyB64 = (s3) => s3.replace(/[^A-Za-z0-9\+\/]/g, "");
      btoaPolyfill = (bin) => {
        let u32, c0, c1, c22, asc = "";
        const pad2 = bin.length % 3;
        for (let i4 = 0; i4 < bin.length; ) {
          if ((c0 = bin.charCodeAt(i4++)) > 255 || (c1 = bin.charCodeAt(i4++)) > 255 || (c22 = bin.charCodeAt(i4++)) > 255)
            throw new TypeError("invalid character found");
          u32 = c0 << 16 | c1 << 8 | c22;
          asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
        }
        return pad2 ? asc.slice(0, pad2 - 3) + "===".substring(pad2) : asc;
      };
      _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
      _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
        const maxargs = 4096;
        let strs = [];
        for (let i4 = 0, l3 = u8a.length; i4 < l3; i4 += maxargs) {
          strs.push(_fromCC.apply(null, u8a.subarray(i4, i4 + maxargs)));
        }
        return _btoa(strs.join(""));
      };
      fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
      cb_utob = (c3) => {
        if (c3.length < 2) {
          var cc = c3.charCodeAt(0);
          return cc < 128 ? c3 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        } else {
          var cc = 65536 + (c3.charCodeAt(0) - 55296) * 1024 + (c3.charCodeAt(1) - 56320);
          return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        }
      };
      re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
      utob = (u3) => u3.replace(re_utob, cb_utob);
      _encode = _hasBuffer ? (s3) => Buffer.from(s3, "utf8").toString("base64") : _TE ? (s3) => _fromUint8Array(_TE.encode(s3)) : (s3) => _btoa(utob(s3));
      encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
      encodeURI2 = (src) => encode(src, true);
      re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
      cb_btou = (cccc) => {
        switch (cccc.length) {
          case 4:
            var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
            return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
          case 3:
            return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
          default:
            return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
        }
      };
      btou = (b3) => b3.replace(re_btou, cb_btou);
      atobPolyfill = (asc) => {
        asc = asc.replace(/\s+/g, "");
        if (!b64re.test(asc))
          throw new TypeError("malformed base64.");
        asc += "==".slice(2 - (asc.length & 3));
        let u24, bin = "", r1, r22;
        for (let i4 = 0; i4 < asc.length; ) {
          u24 = b64tab[asc.charAt(i4++)] << 18 | b64tab[asc.charAt(i4++)] << 12 | (r1 = b64tab[asc.charAt(i4++)]) << 6 | (r22 = b64tab[asc.charAt(i4++)]);
          bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r22 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
        }
        return bin;
      };
      _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
      _toUint8Array = _hasBuffer ? (a3) => _U8Afrom(Buffer.from(a3, "base64")) : (a3) => _U8Afrom(_atob(a3), (c3) => c3.charCodeAt(0));
      toUint8Array = (a3) => _toUint8Array(_unURI(a3));
      _decode = _hasBuffer ? (a3) => Buffer.from(a3, "base64").toString("utf8") : _TD ? (a3) => _TD.decode(_toUint8Array(a3)) : (a3) => btou(_atob(a3));
      _unURI = (a3) => _tidyB64(a3.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
      decode = (src) => _decode(_unURI(src));
      isValid = (src) => {
        if (typeof src !== "string")
          return false;
        const s3 = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
        return !/[^\s0-9a-zA-Z\+/]/.test(s3) || !/[^\s0-9a-zA-Z\-_]/.test(s3);
      };
      _noEnum = (v3) => {
        return {
          value: v3,
          enumerable: false,
          writable: true,
          configurable: true
        };
      };
      extendString = function() {
        const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
        _add("fromBase64", function() {
          return decode(this);
        });
        _add("toBase64", function(urlsafe) {
          return encode(this, urlsafe);
        });
        _add("toBase64URI", function() {
          return encode(this, true);
        });
        _add("toBase64URL", function() {
          return encode(this, true);
        });
        _add("toUint8Array", function() {
          return toUint8Array(this);
        });
      };
      extendUint8Array = function() {
        const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
        _add("toBase64", function(urlsafe) {
          return fromUint8Array(this, urlsafe);
        });
        _add("toBase64URI", function() {
          return fromUint8Array(this, true);
        });
        _add("toBase64URL", function() {
          return fromUint8Array(this, true);
        });
      };
      extendBuiltins = () => {
        extendString();
        extendUint8Array();
      };
      gBase64 = {
        version,
        VERSION,
        atob: _atob,
        atobPolyfill,
        btoa: _btoa,
        btoaPolyfill,
        fromBase64: decode,
        toBase64: encode,
        encode,
        encodeURI: encodeURI2,
        encodeURL: encodeURI2,
        utob,
        btou,
        decode,
        isValid,
        fromUint8Array,
        toUint8Array,
        extendString,
        extendUint8Array,
        extendBuiltins
      };
    }
  });

  // ../node_modules/requires-port/index.js
  var require_requires_port = __commonJS({
    "../node_modules/requires-port/index.js"(exports, module) {
      "use strict";
      module.exports = function required(port, protocol4) {
        protocol4 = protocol4.split(":")[0];
        port = +port;
        if (!port)
          return false;
        switch (protocol4) {
          case "http":
          case "ws":
            return port !== 80;
          case "https":
          case "wss":
            return port !== 443;
          case "ftp":
            return port !== 21;
          case "gopher":
            return port !== 70;
          case "file":
            return false;
        }
        return port !== 0;
      };
    }
  });

  // ../node_modules/querystringify/index.js
  var require_querystringify = __commonJS({
    "../node_modules/querystringify/index.js"(exports) {
      "use strict";
      var has2 = Object.prototype.hasOwnProperty;
      var undef;
      function decode4(input) {
        try {
          return decodeURIComponent(input.replace(/\+/g, " "));
        } catch (e3) {
          return null;
        }
      }
      function encode4(input) {
        try {
          return encodeURIComponent(input);
        } catch (e3) {
          return null;
        }
      }
      function querystring(query) {
        var parser = /([^=?#&]+)=?([^&]*)/g, result2 = {}, part;
        while (part = parser.exec(query)) {
          var key = decode4(part[1]), value2 = decode4(part[2]);
          if (key === null || value2 === null || key in result2)
            continue;
          result2[key] = value2;
        }
        return result2;
      }
      function querystringify(obj, prefix) {
        prefix = prefix || "";
        var pairs = [], value2, key;
        if ("string" !== typeof prefix)
          prefix = "?";
        for (key in obj) {
          if (has2.call(obj, key)) {
            value2 = obj[key];
            if (!value2 && (value2 === null || value2 === undef || isNaN(value2))) {
              value2 = "";
            }
            key = encode4(key);
            value2 = encode4(value2);
            if (key === null || value2 === null)
              continue;
            pairs.push(key + "=" + value2);
          }
        }
        return pairs.length ? prefix + pairs.join("&") : "";
      }
      exports.stringify = querystringify;
      exports.parse = querystring;
    }
  });

  // ../node_modules/url-parse/index.js
  var require_url_parse = __commonJS({
    "../node_modules/url-parse/index.js"(exports, module) {
      "use strict";
      var required = require_requires_port();
      var qs = require_querystringify();
      var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
      var CRHTLF = /[\n\r\t]/g;
      var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
      var port = /:\d+$/;
      var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
      var windowsDriveLetter = /^[a-zA-Z]:/;
      function trimLeft(str) {
        return (str ? str : "").toString().replace(controlOrWhitespace, "");
      }
      var rules = [
        ["#", "hash"],
        ["?", "query"],
        function sanitize(address, url2) {
          return isSpecial(url2.protocol) ? address.replace(/\\/g, "/") : address;
        },
        ["/", "pathname"],
        ["@", "auth", 1],
        [NaN, "host", void 0, 1, 1],
        [/:(\d*)$/, "port", void 0, 1],
        [NaN, "hostname", void 0, 1, 1]
      ];
      var ignore = {
        hash: 1,
        query: 1
      };
      function lolcation(loc) {
        var globalVar;
        if (typeof window !== "undefined")
          globalVar = window;
        else if (typeof global !== "undefined")
          globalVar = global;
        else if (typeof self !== "undefined")
          globalVar = self;
        else
          globalVar = {};
        var location2 = globalVar.location || {};
        loc = loc || location2;
        var finaldestination = {}, type = typeof loc, key;
        if ("blob:" === loc.protocol) {
          finaldestination = new Url2(unescape(loc.pathname), {});
        } else if ("string" === type) {
          finaldestination = new Url2(loc, {});
          for (key in ignore)
            delete finaldestination[key];
        } else if ("object" === type) {
          for (key in loc) {
            if (key in ignore)
              continue;
            finaldestination[key] = loc[key];
          }
          if (finaldestination.slashes === void 0) {
            finaldestination.slashes = slashes.test(loc.href);
          }
        }
        return finaldestination;
      }
      function isSpecial(scheme) {
        return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
      }
      function extractProtocol(address, location2) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        location2 = location2 || {};
        var match2 = protocolre.exec(address);
        var protocol4 = match2[1] ? match2[1].toLowerCase() : "";
        var forwardSlashes = !!match2[2];
        var otherSlashes = !!match2[3];
        var slashesCount = 0;
        var rest;
        if (forwardSlashes) {
          if (otherSlashes) {
            rest = match2[2] + match2[3] + match2[4];
            slashesCount = match2[2].length + match2[3].length;
          } else {
            rest = match2[2] + match2[4];
            slashesCount = match2[2].length;
          }
        } else {
          if (otherSlashes) {
            rest = match2[3] + match2[4];
            slashesCount = match2[3].length;
          } else {
            rest = match2[4];
          }
        }
        if (protocol4 === "file:") {
          if (slashesCount >= 2) {
            rest = rest.slice(2);
          }
        } else if (isSpecial(protocol4)) {
          rest = match2[4];
        } else if (protocol4) {
          if (forwardSlashes) {
            rest = rest.slice(2);
          }
        } else if (slashesCount >= 2 && isSpecial(location2.protocol)) {
          rest = match2[4];
        }
        return {
          protocol: protocol4,
          slashes: forwardSlashes || isSpecial(protocol4),
          slashesCount,
          rest
        };
      }
      function resolve(relative, base) {
        if (relative === "")
          return base;
        var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i4 = path.length, last = path[i4 - 1], unshift = false, up = 0;
        while (i4--) {
          if (path[i4] === ".") {
            path.splice(i4, 1);
          } else if (path[i4] === "..") {
            path.splice(i4, 1);
            up++;
          } else if (up) {
            if (i4 === 0)
              unshift = true;
            path.splice(i4, 1);
            up--;
          }
        }
        if (unshift)
          path.unshift("");
        if (last === "." || last === "..")
          path.push("");
        return path.join("/");
      }
      function Url2(address, location2, parser) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        if (!(this instanceof Url2)) {
          return new Url2(address, location2, parser);
        }
        var relative, extracted, parse2, instruction, index, key, instructions = rules.slice(), type = typeof location2, url2 = this, i4 = 0;
        if ("object" !== type && "string" !== type) {
          parser = location2;
          location2 = null;
        }
        if (parser && "function" !== typeof parser)
          parser = qs.parse;
        location2 = lolcation(location2);
        extracted = extractProtocol(address || "", location2);
        relative = !extracted.protocol && !extracted.slashes;
        url2.slashes = extracted.slashes || relative && location2.slashes;
        url2.protocol = extracted.protocol || location2.protocol || "";
        address = extracted.rest;
        if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url2.protocol))) {
          instructions[3] = [/(.*)/, "pathname"];
        }
        for (; i4 < instructions.length; i4++) {
          instruction = instructions[i4];
          if (typeof instruction === "function") {
            address = instruction(address, url2);
            continue;
          }
          parse2 = instruction[0];
          key = instruction[1];
          if (parse2 !== parse2) {
            url2[key] = address;
          } else if ("string" === typeof parse2) {
            index = parse2 === "@" ? address.lastIndexOf(parse2) : address.indexOf(parse2);
            if (~index) {
              if ("number" === typeof instruction[2]) {
                url2[key] = address.slice(0, index);
                address = address.slice(index + instruction[2]);
              } else {
                url2[key] = address.slice(index);
                address = address.slice(0, index);
              }
            }
          } else if (index = parse2.exec(address)) {
            url2[key] = index[1];
            address = address.slice(0, index.index);
          }
          url2[key] = url2[key] || (relative && instruction[3] ? location2[key] || "" : "");
          if (instruction[4])
            url2[key] = url2[key].toLowerCase();
        }
        if (parser)
          url2.query = parser(url2.query);
        if (relative && location2.slashes && url2.pathname.charAt(0) !== "/" && (url2.pathname !== "" || location2.pathname !== "")) {
          url2.pathname = resolve(url2.pathname, location2.pathname);
        }
        if (url2.pathname.charAt(0) !== "/" && isSpecial(url2.protocol)) {
          url2.pathname = "/" + url2.pathname;
        }
        if (!required(url2.port, url2.protocol)) {
          url2.host = url2.hostname;
          url2.port = "";
        }
        url2.username = url2.password = "";
        if (url2.auth) {
          index = url2.auth.indexOf(":");
          if (~index) {
            url2.username = url2.auth.slice(0, index);
            url2.username = encodeURIComponent(decodeURIComponent(url2.username));
            url2.password = url2.auth.slice(index + 1);
            url2.password = encodeURIComponent(decodeURIComponent(url2.password));
          } else {
            url2.username = encodeURIComponent(decodeURIComponent(url2.auth));
          }
          url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
        }
        url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
        url2.href = url2.toString();
      }
      function set(part, value2, fn) {
        var url2 = this;
        switch (part) {
          case "query":
            if ("string" === typeof value2 && value2.length) {
              value2 = (fn || qs.parse)(value2);
            }
            url2[part] = value2;
            break;
          case "port":
            url2[part] = value2;
            if (!required(value2, url2.protocol)) {
              url2.host = url2.hostname;
              url2[part] = "";
            } else if (value2) {
              url2.host = url2.hostname + ":" + value2;
            }
            break;
          case "hostname":
            url2[part] = value2;
            if (url2.port)
              value2 += ":" + url2.port;
            url2.host = value2;
            break;
          case "host":
            url2[part] = value2;
            if (port.test(value2)) {
              value2 = value2.split(":");
              url2.port = value2.pop();
              url2.hostname = value2.join(":");
            } else {
              url2.hostname = value2;
              url2.port = "";
            }
            break;
          case "protocol":
            url2.protocol = value2.toLowerCase();
            url2.slashes = !fn;
            break;
          case "pathname":
          case "hash":
            if (value2) {
              var char = part === "pathname" ? "/" : "#";
              url2[part] = value2.charAt(0) !== char ? char + value2 : value2;
            } else {
              url2[part] = value2;
            }
            break;
          case "username":
          case "password":
            url2[part] = encodeURIComponent(value2);
            break;
          case "auth":
            var index = value2.indexOf(":");
            if (~index) {
              url2.username = value2.slice(0, index);
              url2.username = encodeURIComponent(decodeURIComponent(url2.username));
              url2.password = value2.slice(index + 1);
              url2.password = encodeURIComponent(decodeURIComponent(url2.password));
            } else {
              url2.username = encodeURIComponent(decodeURIComponent(value2));
            }
        }
        for (var i4 = 0; i4 < rules.length; i4++) {
          var ins = rules[i4];
          if (ins[4])
            url2[ins[1]] = url2[ins[1]].toLowerCase();
        }
        url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
        url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
        url2.href = url2.toString();
        return url2;
      }
      function toString3(stringify) {
        if (!stringify || "function" !== typeof stringify)
          stringify = qs.stringify;
        var query, url2 = this, host = url2.host, protocol4 = url2.protocol;
        if (protocol4 && protocol4.charAt(protocol4.length - 1) !== ":")
          protocol4 += ":";
        var result2 = protocol4 + (url2.protocol && url2.slashes || isSpecial(url2.protocol) ? "//" : "");
        if (url2.username) {
          result2 += url2.username;
          if (url2.password)
            result2 += ":" + url2.password;
          result2 += "@";
        } else if (url2.password) {
          result2 += ":" + url2.password;
          result2 += "@";
        } else if (url2.protocol !== "file:" && isSpecial(url2.protocol) && !host && url2.pathname !== "/") {
          result2 += "@";
        }
        if (host[host.length - 1] === ":" || port.test(url2.hostname) && !url2.port) {
          host += ":";
        }
        result2 += host + url2.pathname;
        query = "object" === typeof url2.query ? stringify(url2.query) : url2.query;
        if (query)
          result2 += "?" !== query.charAt(0) ? "?" + query : query;
        if (url2.hash)
          result2 += url2.hash;
        return result2;
      }
      Url2.prototype = {
        set,
        toString: toString3
      };
      Url2.extractProtocol = extractProtocol;
      Url2.location = lolcation;
      Url2.trimLeft = trimLeft;
      Url2.qs = qs;
      module.exports = Url2;
    }
  });

  // ../node_modules/tus-js-client/lib.esm/error.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _defineProperties(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived), result2;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result2 = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result2 = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result2);
    };
  }
  function _possibleConstructorReturn(self2, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self2);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a3 = [null];
        a3.push.apply(a3, args2);
        var Constructor = Function.bind.apply(Parent2, a3);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e3) {
      return false;
    }
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf(o3, p3) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o4, p4) {
      o4.__proto__ = p4;
      return o4;
    };
    return _setPrototypeOf(o3, p3);
  }
  function _getPrototypeOf(o3) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o4) {
      return o4.__proto__ || Object.getPrototypeOf(o4);
    };
    return _getPrototypeOf(o3);
  }
  var DetailedError, error_default;
  var init_error = __esm({
    "../node_modules/tus-js-client/lib.esm/error.js"() {
      DetailedError = /* @__PURE__ */ function(_Error) {
        _inherits(DetailedError2, _Error);
        var _super = _createSuper(DetailedError2);
        function DetailedError2(message) {
          var _this;
          var causingErr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          var req = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          var res = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          _classCallCheck(this, DetailedError2);
          _this = _super.call(this, message);
          _this.originalRequest = req;
          _this.originalResponse = res;
          _this.causingError = causingErr;
          if (causingErr != null) {
            message += ", caused by ".concat(causingErr.toString());
          }
          if (req != null) {
            var requestId = req.getHeader("X-Request-ID") || "n/a";
            var method = req.getMethod();
            var url2 = req.getURL();
            var status = res ? res.getStatus() : "n/a";
            var body = res ? res.getBody() || "" : "n/a";
            message += ", originated from request (method: ".concat(method, ", url: ").concat(url2, ", response code: ").concat(status, ", response text: ").concat(body, ", request id: ").concat(requestId, ")");
          }
          _this.message = message;
          return _this;
        }
        return _createClass(DetailedError2);
      }(/* @__PURE__ */ _wrapNativeSuper(Error));
      error_default = DetailedError;
    }
  });

  // ../node_modules/tus-js-client/lib.esm/logger.js
  function log(msg) {
    if (!isEnabled)
      return;
    console.log(msg);
  }
  var isEnabled;
  var init_logger = __esm({
    "../node_modules/tus-js-client/lib.esm/logger.js"() {
      isEnabled = false;
    }
  });

  // ../node_modules/tus-js-client/lib.esm/uuid.js
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c3) {
      var r3 = Math.random() * 16 | 0;
      var v3 = c3 === "x" ? r3 : r3 & 3 | 8;
      return v3.toString(16);
    });
  }
  var init_uuid = __esm({
    "../node_modules/tus-js-client/lib.esm/uuid.js"() {
    }
  });

  // ../node_modules/tus-js-client/lib.esm/upload.js
  function _slicedToArray(arr, i4) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i4) || _unsupportedIterableToArray(arr, i4) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o3, minLen) {
    if (!o3)
      return;
    if (typeof o3 === "string")
      return _arrayLikeToArray(o3, minLen);
    var n2 = Object.prototype.toString.call(o3).slice(8, -1);
    if (n2 === "Object" && o3.constructor)
      n2 = o3.constructor.name;
    if (n2 === "Map" || n2 === "Set")
      return Array.from(o3);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return _arrayLikeToArray(o3, minLen);
  }
  function _arrayLikeToArray(arr, len2) {
    if (len2 == null || len2 > arr.length)
      len2 = arr.length;
    for (var i4 = 0, arr2 = new Array(len2); i4 < len2; i4++) {
      arr2[i4] = arr[i4];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i4) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i4 && _arr.length === i4)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i4 = 1; i4 < arguments.length; i4++) {
      var source = null != arguments[i4] ? arguments[i4] : {};
      i4 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value2) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value2,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value2;
    }
    return obj;
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function encodeMetadata(metadata) {
    return Object.entries(metadata).map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], value2 = _ref4[1];
      return "".concat(key, " ").concat(gBase64.encode(String(value2)));
    }).join(",");
  }
  function inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }
  function openRequest(method, url2, options) {
    var req = options.httpStack.createRequest(method, url2);
    req.setHeader("Tus-Resumable", "1.0.0");
    var headers = options.headers || {};
    Object.entries(headers).forEach(function(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2), name = _ref6[0], value2 = _ref6[1];
      req.setHeader(name, value2);
    });
    if (options.addRequestId) {
      var requestId = uuid();
      req.setHeader("X-Request-ID", requestId);
    }
    return req;
  }
  function sendRequest(req, body, options) {
    var onBeforeRequestPromise = typeof options.onBeforeRequest === "function" ? Promise.resolve(options.onBeforeRequest(req)) : Promise.resolve();
    return onBeforeRequestPromise.then(function() {
      return req.send(body).then(function(res) {
        var onAfterResponsePromise = typeof options.onAfterResponse === "function" ? Promise.resolve(options.onAfterResponse(req, res)) : Promise.resolve();
        return onAfterResponsePromise.then(function() {
          return res;
        });
      });
    });
  }
  function isOnline() {
    var online = true;
    if (typeof window !== "undefined" && "navigator" in window && window.navigator.onLine === false) {
      online = false;
    }
    return online;
  }
  function shouldRetry(err, retryAttempt, options) {
    if (options.retryDelays == null || retryAttempt >= options.retryDelays.length || err.originalRequest == null) {
      return false;
    }
    if (options && typeof options.onShouldRetry === "function") {
      return options.onShouldRetry(err, retryAttempt, options);
    }
    var status = err.originalResponse ? err.originalResponse.getStatus() : 0;
    return (!inStatusCategory(status, 400) || status === 409 || status === 423) && isOnline();
  }
  function resolveUrl(origin, link) {
    return new import_url_parse.default(link, origin).toString();
  }
  function splitSizeIntoParts(totalSize, partCount) {
    var partSize = Math.floor(totalSize / partCount);
    var parts2 = [];
    for (var i4 = 0; i4 < partCount; i4++) {
      parts2.push({
        start: partSize * i4,
        end: partSize * (i4 + 1)
      });
    }
    parts2[partCount - 1].end = totalSize;
    return parts2;
  }
  var import_url_parse, defaultOptions2, BaseUpload, upload_default;
  var init_upload = __esm({
    "../node_modules/tus-js-client/lib.esm/upload.js"() {
      init_base64();
      import_url_parse = __toESM(require_url_parse());
      init_error();
      init_logger();
      init_uuid();
      defaultOptions2 = {
        endpoint: null,
        uploadUrl: null,
        metadata: {},
        fingerprint: null,
        uploadSize: null,
        onProgress: null,
        onChunkComplete: null,
        onSuccess: null,
        onError: null,
        _onUploadUrlAvailable: null,
        overridePatchMethod: false,
        headers: {},
        addRequestId: false,
        onBeforeRequest: null,
        onAfterResponse: null,
        onShouldRetry: null,
        chunkSize: Infinity,
        retryDelays: [0, 1e3, 3e3, 5e3],
        parallelUploads: 1,
        parallelUploadBoundaries: null,
        storeFingerprintForResuming: true,
        removeFingerprintOnSuccess: false,
        uploadLengthDeferred: false,
        uploadDataDuringCreation: false,
        urlStorage: null,
        fileReader: null,
        httpStack: null
      };
      BaseUpload = /* @__PURE__ */ function() {
        function BaseUpload2(file, options) {
          _classCallCheck2(this, BaseUpload2);
          if ("resume" in options) {
            console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead.");
          }
          this.options = options;
          this.options.chunkSize = Number(this.options.chunkSize);
          this._urlStorage = this.options.urlStorage;
          this.file = file;
          this.url = null;
          this._req = null;
          this._fingerprint = null;
          this._urlStorageKey = null;
          this._offset = null;
          this._aborted = false;
          this._size = null;
          this._source = null;
          this._retryAttempt = 0;
          this._retryTimeout = null;
          this._offsetBeforeRetry = 0;
          this._parallelUploads = null;
          this._parallelUploadUrls = null;
        }
        _createClass2(BaseUpload2, [{
          key: "findPreviousUploads",
          value: function findPreviousUploads() {
            var _this = this;
            return this.options.fingerprint(this.file, this.options).then(function(fingerprint2) {
              return _this._urlStorage.findUploadsByFingerprint(fingerprint2);
            });
          }
        }, {
          key: "resumeFromPreviousUpload",
          value: function resumeFromPreviousUpload(previousUpload) {
            this.url = previousUpload.uploadUrl || null;
            this._parallelUploadUrls = previousUpload.parallelUploadUrls || null;
            this._urlStorageKey = previousUpload.urlStorageKey;
          }
        }, {
          key: "start",
          value: function start() {
            var _this2 = this;
            var file = this.file;
            if (!file) {
              this._emitError(new Error("tus: no file or stream to upload provided"));
              return;
            }
            if (!this.options.endpoint && !this.options.uploadUrl && !this.url) {
              this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
              return;
            }
            var retryDelays = this.options.retryDelays;
            if (retryDelays != null && Object.prototype.toString.call(retryDelays) !== "[object Array]") {
              this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
              return;
            }
            if (this.options.parallelUploads > 1) {
              for (var _i = 0, _arr = ["uploadUrl", "uploadSize", "uploadLengthDeferred"]; _i < _arr.length; _i++) {
                var optionName = _arr[_i];
                if (this.options[optionName]) {
                  this._emitError(new Error("tus: cannot use the ".concat(optionName, " option when parallelUploads is enabled")));
                  return;
                }
              }
            }
            if (this.options.parallelUploadBoundaries) {
              if (this.options.parallelUploads <= 1) {
                this._emitError(new Error("tus: cannot use the `parallelUploadBoundaries` option when `parallelUploads` is disabled"));
                return;
              }
              if (this.options.parallelUploads !== this.options.parallelUploadBoundaries.length) {
                this._emitError(new Error("tus: the `parallelUploadBoundaries` must have the same length as the value of `parallelUploads`"));
                return;
              }
            }
            this.options.fingerprint(file, this.options).then(function(fingerprint2) {
              if (fingerprint2 == null) {
                log("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.");
              } else {
                log("Calculated fingerprint: ".concat(fingerprint2));
              }
              _this2._fingerprint = fingerprint2;
              if (_this2._source) {
                return _this2._source;
              }
              return _this2.options.fileReader.openFile(file, _this2.options.chunkSize);
            }).then(function(source) {
              _this2._source = source;
              if (_this2.options.uploadLengthDeferred) {
                _this2._size = null;
              } else if (_this2.options.uploadSize != null) {
                _this2._size = Number(_this2.options.uploadSize);
                if (Number.isNaN(_this2._size)) {
                  _this2._emitError(new Error("tus: cannot convert `uploadSize` option into a number"));
                  return;
                }
              } else {
                _this2._size = _this2._source.size;
                if (_this2._size == null) {
                  _this2._emitError(new Error("tus: cannot automatically derive upload's size from input. Specify it manually using the `uploadSize` option or use the `uploadLengthDeferred` option"));
                  return;
                }
              }
              if (_this2.options.parallelUploads > 1 || _this2._parallelUploadUrls != null) {
                _this2._startParallelUpload();
              } else {
                _this2._startSingleUpload();
              }
            })["catch"](function(err) {
              _this2._emitError(err);
            });
          }
        }, {
          key: "_startParallelUpload",
          value: function _startParallelUpload() {
            var _this$options$paralle, _this3 = this;
            var totalSize = this._size;
            var totalProgress = 0;
            this._parallelUploads = [];
            var partCount = this._parallelUploadUrls != null ? this._parallelUploadUrls.length : this.options.parallelUploads;
            var parts2 = (_this$options$paralle = this.options.parallelUploadBoundaries) !== null && _this$options$paralle !== void 0 ? _this$options$paralle : splitSizeIntoParts(this._source.size, partCount);
            if (this._parallelUploadUrls) {
              parts2.forEach(function(part, index) {
                part.uploadUrl = _this3._parallelUploadUrls[index] || null;
              });
            }
            this._parallelUploadUrls = new Array(parts2.length);
            var uploads = parts2.map(function(part, index) {
              var lastPartProgress = 0;
              return _this3._source.slice(part.start, part.end).then(function(_ref) {
                var value2 = _ref.value;
                return new Promise(function(resolve, reject) {
                  var options = _objectSpread(_objectSpread({}, _this3.options), {}, {
                    uploadUrl: part.uploadUrl || null,
                    storeFingerprintForResuming: false,
                    removeFingerprintOnSuccess: false,
                    parallelUploads: 1,
                    parallelUploadBoundaries: null,
                    metadata: {},
                    headers: _objectSpread(_objectSpread({}, _this3.options.headers), {}, {
                      "Upload-Concat": "partial"
                    }),
                    onSuccess: resolve,
                    onError: reject,
                    onProgress: function onProgress(newPartProgress) {
                      totalProgress = totalProgress - lastPartProgress + newPartProgress;
                      lastPartProgress = newPartProgress;
                      _this3._emitProgress(totalProgress, totalSize);
                    },
                    _onUploadUrlAvailable: function _onUploadUrlAvailable() {
                      _this3._parallelUploadUrls[index] = upload.url;
                      if (_this3._parallelUploadUrls.filter(function(u3) {
                        return Boolean(u3);
                      }).length === parts2.length) {
                        _this3._saveUploadInUrlStorage();
                      }
                    }
                  });
                  var upload = new BaseUpload2(value2, options);
                  upload.start();
                  _this3._parallelUploads.push(upload);
                });
              });
            });
            var req;
            Promise.all(uploads).then(function() {
              req = _this3._openRequest("POST", _this3.options.endpoint);
              req.setHeader("Upload-Concat", "final;".concat(_this3._parallelUploadUrls.join(" ")));
              var metadata = encodeMetadata(_this3.options.metadata);
              if (metadata !== "") {
                req.setHeader("Upload-Metadata", metadata);
              }
              return _this3._sendRequest(req, null);
            }).then(function(res) {
              if (!inStatusCategory(res.getStatus(), 200)) {
                _this3._emitHttpError(req, res, "tus: unexpected response while creating upload");
                return;
              }
              var location2 = res.getHeader("Location");
              if (location2 == null) {
                _this3._emitHttpError(req, res, "tus: invalid or missing Location header");
                return;
              }
              _this3.url = resolveUrl(_this3.options.endpoint, location2);
              log("Created upload at ".concat(_this3.url));
              _this3._emitSuccess();
            })["catch"](function(err) {
              _this3._emitError(err);
            });
          }
        }, {
          key: "_startSingleUpload",
          value: function _startSingleUpload() {
            this._aborted = false;
            if (this.url != null) {
              log("Resuming upload from previous URL: ".concat(this.url));
              this._resumeUpload();
              return;
            }
            if (this.options.uploadUrl != null) {
              log("Resuming upload from provided URL: ".concat(this.options.uploadUrl));
              this.url = this.options.uploadUrl;
              this._resumeUpload();
              return;
            }
            log("Creating a new upload");
            this._createUpload();
          }
        }, {
          key: "abort",
          value: function abort(shouldTerminate) {
            var _this4 = this;
            if (this._parallelUploads != null) {
              this._parallelUploads.forEach(function(upload) {
                upload.abort(shouldTerminate);
              });
            }
            if (this._req !== null) {
              this._req.abort();
            }
            this._aborted = true;
            if (this._retryTimeout != null) {
              clearTimeout(this._retryTimeout);
              this._retryTimeout = null;
            }
            if (!shouldTerminate || this.url == null) {
              return Promise.resolve();
            }
            return BaseUpload2.terminate(this.url, this.options).then(function() {
              return _this4._removeFromUrlStorage();
            });
          }
        }, {
          key: "_emitHttpError",
          value: function _emitHttpError(req, res, message, causingErr) {
            this._emitError(new error_default(message, causingErr, req, res));
          }
        }, {
          key: "_emitError",
          value: function _emitError(err) {
            var _this5 = this;
            if (this._aborted)
              return;
            if (this.options.retryDelays != null) {
              var shouldResetDelays = this._offset != null && this._offset > this._offsetBeforeRetry;
              if (shouldResetDelays) {
                this._retryAttempt = 0;
              }
              if (shouldRetry(err, this._retryAttempt, this.options)) {
                var delay = this.options.retryDelays[this._retryAttempt++];
                this._offsetBeforeRetry = this._offset;
                this._retryTimeout = setTimeout(function() {
                  _this5.start();
                }, delay);
                return;
              }
            }
            if (typeof this.options.onError === "function") {
              this.options.onError(err);
            } else {
              throw err;
            }
          }
        }, {
          key: "_emitSuccess",
          value: function _emitSuccess() {
            if (this.options.removeFingerprintOnSuccess) {
              this._removeFromUrlStorage();
            }
            if (typeof this.options.onSuccess === "function") {
              this.options.onSuccess();
            }
          }
        }, {
          key: "_emitProgress",
          value: function _emitProgress(bytesSent, bytesTotal) {
            if (typeof this.options.onProgress === "function") {
              this.options.onProgress(bytesSent, bytesTotal);
            }
          }
        }, {
          key: "_emitChunkComplete",
          value: function _emitChunkComplete(chunkSize, bytesAccepted, bytesTotal) {
            if (typeof this.options.onChunkComplete === "function") {
              this.options.onChunkComplete(chunkSize, bytesAccepted, bytesTotal);
            }
          }
        }, {
          key: "_createUpload",
          value: function _createUpload3() {
            var _this6 = this;
            if (!this.options.endpoint) {
              this._emitError(new Error("tus: unable to create upload because no endpoint is provided"));
              return;
            }
            var req = this._openRequest("POST", this.options.endpoint);
            if (this.options.uploadLengthDeferred) {
              req.setHeader("Upload-Defer-Length", 1);
            } else {
              req.setHeader("Upload-Length", this._size);
            }
            var metadata = encodeMetadata(this.options.metadata);
            if (metadata !== "") {
              req.setHeader("Upload-Metadata", metadata);
            }
            var promise;
            if (this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred) {
              this._offset = 0;
              promise = this._addChunkToRequest(req);
            } else {
              promise = this._sendRequest(req, null);
            }
            promise.then(function(res) {
              if (!inStatusCategory(res.getStatus(), 200)) {
                _this6._emitHttpError(req, res, "tus: unexpected response while creating upload");
                return;
              }
              var location2 = res.getHeader("Location");
              if (location2 == null) {
                _this6._emitHttpError(req, res, "tus: invalid or missing Location header");
                return;
              }
              _this6.url = resolveUrl(_this6.options.endpoint, location2);
              log("Created upload at ".concat(_this6.url));
              if (typeof _this6.options._onUploadUrlAvailable === "function") {
                _this6.options._onUploadUrlAvailable();
              }
              if (_this6._size === 0) {
                _this6._emitSuccess();
                _this6._source.close();
                return;
              }
              _this6._saveUploadInUrlStorage().then(function() {
                if (_this6.options.uploadDataDuringCreation) {
                  _this6._handleUploadResponse(req, res);
                } else {
                  _this6._offset = 0;
                  _this6._performUpload();
                }
              });
            })["catch"](function(err) {
              _this6._emitHttpError(req, null, "tus: failed to create upload", err);
            });
          }
        }, {
          key: "_resumeUpload",
          value: function _resumeUpload() {
            var _this7 = this;
            var req = this._openRequest("HEAD", this.url);
            var promise = this._sendRequest(req, null);
            promise.then(function(res) {
              var status = res.getStatus();
              if (!inStatusCategory(status, 200)) {
                if (status === 423) {
                  _this7._emitHttpError(req, res, "tus: upload is currently locked; retry later");
                  return;
                }
                if (inStatusCategory(status, 400)) {
                  _this7._removeFromUrlStorage();
                }
                if (!_this7.options.endpoint) {
                  _this7._emitHttpError(req, res, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
                  return;
                }
                _this7.url = null;
                _this7._createUpload();
                return;
              }
              var offset = parseInt(res.getHeader("Upload-Offset"), 10);
              if (Number.isNaN(offset)) {
                _this7._emitHttpError(req, res, "tus: invalid or missing offset value");
                return;
              }
              var length2 = parseInt(res.getHeader("Upload-Length"), 10);
              if (Number.isNaN(length2) && !_this7.options.uploadLengthDeferred) {
                _this7._emitHttpError(req, res, "tus: invalid or missing length value");
                return;
              }
              if (typeof _this7.options._onUploadUrlAvailable === "function") {
                _this7.options._onUploadUrlAvailable();
              }
              _this7._saveUploadInUrlStorage().then(function() {
                if (offset === length2) {
                  _this7._emitProgress(length2, length2);
                  _this7._emitSuccess();
                  return;
                }
                _this7._offset = offset;
                _this7._performUpload();
              });
            })["catch"](function(err) {
              _this7._emitHttpError(req, null, "tus: failed to resume upload", err);
            });
          }
        }, {
          key: "_performUpload",
          value: function _performUpload() {
            var _this8 = this;
            if (this._aborted) {
              return;
            }
            var req;
            if (this.options.overridePatchMethod) {
              req = this._openRequest("POST", this.url);
              req.setHeader("X-HTTP-Method-Override", "PATCH");
            } else {
              req = this._openRequest("PATCH", this.url);
            }
            req.setHeader("Upload-Offset", this._offset);
            var promise = this._addChunkToRequest(req);
            promise.then(function(res) {
              if (!inStatusCategory(res.getStatus(), 200)) {
                _this8._emitHttpError(req, res, "tus: unexpected response while uploading chunk");
                return;
              }
              _this8._handleUploadResponse(req, res);
            })["catch"](function(err) {
              if (_this8._aborted) {
                return;
              }
              _this8._emitHttpError(req, null, "tus: failed to upload chunk at offset ".concat(_this8._offset), err);
            });
          }
        }, {
          key: "_addChunkToRequest",
          value: function _addChunkToRequest(req) {
            var _this9 = this;
            var start = this._offset;
            var end = this._offset + this.options.chunkSize;
            req.setProgressHandler(function(bytesSent) {
              _this9._emitProgress(start + bytesSent, _this9._size);
            });
            req.setHeader("Content-Type", "application/offset+octet-stream");
            if ((end === Infinity || end > this._size) && !this.options.uploadLengthDeferred) {
              end = this._size;
            }
            return this._source.slice(start, end).then(function(_ref2) {
              var value2 = _ref2.value, done = _ref2.done;
              if (_this9.options.uploadLengthDeferred && done) {
                _this9._size = _this9._offset + (value2 && value2.size ? value2.size : 0);
                req.setHeader("Upload-Length", _this9._size);
              }
              if (value2 === null) {
                return _this9._sendRequest(req);
              }
              _this9._emitProgress(_this9._offset, _this9._size);
              return _this9._sendRequest(req, value2);
            });
          }
        }, {
          key: "_handleUploadResponse",
          value: function _handleUploadResponse(req, res) {
            var offset = parseInt(res.getHeader("Upload-Offset"), 10);
            if (Number.isNaN(offset)) {
              this._emitHttpError(req, res, "tus: invalid or missing offset value");
              return;
            }
            this._emitProgress(offset, this._size);
            this._emitChunkComplete(offset - this._offset, offset, this._size);
            this._offset = offset;
            if (offset === this._size) {
              this._emitSuccess();
              this._source.close();
              return;
            }
            this._performUpload();
          }
        }, {
          key: "_openRequest",
          value: function _openRequest(method, url2) {
            var req = openRequest(method, url2, this.options);
            this._req = req;
            return req;
          }
        }, {
          key: "_removeFromUrlStorage",
          value: function _removeFromUrlStorage() {
            var _this10 = this;
            if (!this._urlStorageKey)
              return;
            this._urlStorage.removeUpload(this._urlStorageKey)["catch"](function(err) {
              _this10._emitError(err);
            });
            this._urlStorageKey = null;
          }
        }, {
          key: "_saveUploadInUrlStorage",
          value: function _saveUploadInUrlStorage() {
            var _this11 = this;
            if (!this.options.storeFingerprintForResuming || !this._fingerprint || this._urlStorageKey !== null) {
              return Promise.resolve();
            }
            var storedUpload = {
              size: this._size,
              metadata: this.options.metadata,
              creationTime: new Date().toString()
            };
            if (this._parallelUploads) {
              storedUpload.parallelUploadUrls = this._parallelUploadUrls;
            } else {
              storedUpload.uploadUrl = this.url;
            }
            return this._urlStorage.addUpload(this._fingerprint, storedUpload).then(function(urlStorageKey) {
              _this11._urlStorageKey = urlStorageKey;
            });
          }
        }, {
          key: "_sendRequest",
          value: function _sendRequest(req) {
            var body = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            return sendRequest(req, body, this.options);
          }
        }], [{
          key: "terminate",
          value: function terminate(url2) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var req = openRequest("DELETE", url2, options);
            return sendRequest(req, null, options).then(function(res) {
              if (res.getStatus() === 204) {
                return;
              }
              throw new error_default("tus: unexpected response while terminating upload", null, req, res);
            })["catch"](function(err) {
              if (!(err instanceof error_default)) {
                err = new error_default("tus: failed to terminate upload", err, req, null);
              }
              if (!shouldRetry(err, 0, options)) {
                throw err;
              }
              var delay = options.retryDelays[0];
              var remainingDelays = options.retryDelays.slice(1);
              var newOptions = _objectSpread(_objectSpread({}, options), {}, {
                retryDelays: remainingDelays
              });
              return new Promise(function(resolve) {
                return setTimeout(resolve, delay);
              }).then(function() {
                return BaseUpload2.terminate(url2, newOptions);
              });
            });
          }
        }]);
        return BaseUpload2;
      }();
      BaseUpload.defaultOptions = defaultOptions2;
      upload_default = BaseUpload;
    }
  });

  // ../node_modules/tus-js-client/lib.esm/noopUrlStorage.js
  function _classCallCheck3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties3(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass3(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties3(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties3(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var NoopUrlStorage;
  var init_noopUrlStorage = __esm({
    "../node_modules/tus-js-client/lib.esm/noopUrlStorage.js"() {
      NoopUrlStorage = /* @__PURE__ */ function() {
        function NoopUrlStorage2() {
          _classCallCheck3(this, NoopUrlStorage2);
        }
        _createClass3(NoopUrlStorage2, [{
          key: "listAllUploads",
          value: function listAllUploads() {
            return Promise.resolve([]);
          }
        }, {
          key: "findUploadsByFingerprint",
          value: function findUploadsByFingerprint(fingerprint2) {
            return Promise.resolve([]);
          }
        }, {
          key: "removeUpload",
          value: function removeUpload(urlStorageKey) {
            return Promise.resolve();
          }
        }, {
          key: "addUpload",
          value: function addUpload(fingerprint2, upload) {
            return Promise.resolve(null);
          }
        }]);
        return NoopUrlStorage2;
      }();
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/urlStorage.js
  function _classCallCheck4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties4(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass4(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties4(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties4(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var hasStorage, key, canStoreURLs, WebStorageUrlStorage;
  var init_urlStorage = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/urlStorage.js"() {
      hasStorage = false;
      try {
        hasStorage = "localStorage" in window;
        key = "tusSupport";
        localStorage.setItem(key, localStorage.getItem(key));
      } catch (e3) {
        if (e3.code === e3.SECURITY_ERR || e3.code === e3.QUOTA_EXCEEDED_ERR) {
          hasStorage = false;
        } else {
          throw e3;
        }
      }
      canStoreURLs = hasStorage;
      WebStorageUrlStorage = /* @__PURE__ */ function() {
        function WebStorageUrlStorage2() {
          _classCallCheck4(this, WebStorageUrlStorage2);
        }
        _createClass4(WebStorageUrlStorage2, [{
          key: "findAllUploads",
          value: function findAllUploads() {
            var results = this._findEntries("tus::");
            return Promise.resolve(results);
          }
        }, {
          key: "findUploadsByFingerprint",
          value: function findUploadsByFingerprint(fingerprint2) {
            var results = this._findEntries("tus::".concat(fingerprint2, "::"));
            return Promise.resolve(results);
          }
        }, {
          key: "removeUpload",
          value: function removeUpload(urlStorageKey) {
            localStorage.removeItem(urlStorageKey);
            return Promise.resolve();
          }
        }, {
          key: "addUpload",
          value: function addUpload(fingerprint2, upload) {
            var id21 = Math.round(Math.random() * 1e12);
            var key = "tus::".concat(fingerprint2, "::").concat(id21);
            localStorage.setItem(key, JSON.stringify(upload));
            return Promise.resolve(key);
          }
        }, {
          key: "_findEntries",
          value: function _findEntries(prefix) {
            var results = [];
            for (var i4 = 0; i4 < localStorage.length; i4++) {
              var _key = localStorage.key(i4);
              if (_key.indexOf(prefix) !== 0)
                continue;
              try {
                var upload = JSON.parse(localStorage.getItem(_key));
                upload.urlStorageKey = _key;
                results.push(upload);
              } catch (e3) {
              }
            }
            return results;
          }
        }]);
        return WebStorageUrlStorage2;
      }();
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/httpStack.js
  function _classCallCheck5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties5(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass5(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties5(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties5(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var XHRHttpStack, Request, Response;
  var init_httpStack = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/httpStack.js"() {
      XHRHttpStack = /* @__PURE__ */ function() {
        function XHRHttpStack2() {
          _classCallCheck5(this, XHRHttpStack2);
        }
        _createClass5(XHRHttpStack2, [{
          key: "createRequest",
          value: function createRequest(method, url2) {
            return new Request(method, url2);
          }
        }, {
          key: "getName",
          value: function getName3() {
            return "XHRHttpStack";
          }
        }]);
        return XHRHttpStack2;
      }();
      Request = /* @__PURE__ */ function() {
        function Request3(method, url2) {
          _classCallCheck5(this, Request3);
          this._xhr = new XMLHttpRequest();
          this._xhr.open(method, url2, true);
          this._method = method;
          this._url = url2;
          this._headers = {};
        }
        _createClass5(Request3, [{
          key: "getMethod",
          value: function getMethod() {
            return this._method;
          }
        }, {
          key: "getURL",
          value: function getURL() {
            return this._url;
          }
        }, {
          key: "setHeader",
          value: function setHeader(header, value2) {
            this._xhr.setRequestHeader(header, value2);
            this._headers[header] = value2;
          }
        }, {
          key: "getHeader",
          value: function getHeader(header) {
            return this._headers[header];
          }
        }, {
          key: "setProgressHandler",
          value: function setProgressHandler(progressHandler) {
            if (!("upload" in this._xhr)) {
              return;
            }
            this._xhr.upload.onprogress = function(e3) {
              if (!e3.lengthComputable) {
                return;
              }
              progressHandler(e3.loaded);
            };
          }
        }, {
          key: "send",
          value: function send() {
            var _this = this;
            var body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            return new Promise(function(resolve, reject) {
              _this._xhr.onload = function() {
                resolve(new Response(_this._xhr));
              };
              _this._xhr.onerror = function(err) {
                reject(err);
              };
              _this._xhr.send(body);
            });
          }
        }, {
          key: "abort",
          value: function abort() {
            this._xhr.abort();
            return Promise.resolve();
          }
        }, {
          key: "getUnderlyingObject",
          value: function getUnderlyingObject() {
            return this._xhr;
          }
        }]);
        return Request3;
      }();
      Response = /* @__PURE__ */ function() {
        function Response2(xhr) {
          _classCallCheck5(this, Response2);
          this._xhr = xhr;
        }
        _createClass5(Response2, [{
          key: "getStatus",
          value: function getStatus() {
            return this._xhr.status;
          }
        }, {
          key: "getHeader",
          value: function getHeader(header) {
            return this._xhr.getResponseHeader(header);
          }
        }, {
          key: "getBody",
          value: function getBody() {
            return this._xhr.responseText;
          }
        }, {
          key: "getUnderlyingObject",
          value: function getUnderlyingObject() {
            return this._xhr;
          }
        }]);
        return Response2;
      }();
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/isReactNative.js
  var isReactNative, isReactNative_default;
  var init_isReactNative = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/isReactNative.js"() {
      isReactNative = function isReactNative2() {
        return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
      };
      isReactNative_default = isReactNative;
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/uriToBlob.js
  function uriToBlob(uri) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function() {
        var blob = xhr.response;
        resolve(blob);
      };
      xhr.onerror = function(err) {
        reject(err);
      };
      xhr.open("GET", uri);
      xhr.send();
    });
  }
  var init_uriToBlob = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/uriToBlob.js"() {
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/sources/isCordova.js
  var isCordova, isCordova_default;
  var init_isCordova = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/sources/isCordova.js"() {
      isCordova = function isCordova2() {
        return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
      };
      isCordova_default = isCordova;
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js
  function readAsByteArray(chunk) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() {
        var value2 = new Uint8Array(reader.result);
        resolve({
          value: value2
        });
      };
      reader.onerror = function(err) {
        reject(err);
      };
      reader.readAsArrayBuffer(chunk);
    });
  }
  var init_readAsByteArray = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js"() {
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js
  function _classCallCheck6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties6(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass6(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties6(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties6(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var FileSource;
  var init_FileSource = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js"() {
      init_isCordova();
      init_readAsByteArray();
      FileSource = /* @__PURE__ */ function() {
        function FileSource2(file) {
          _classCallCheck6(this, FileSource2);
          this._file = file;
          this.size = file.size;
        }
        _createClass6(FileSource2, [{
          key: "slice",
          value: function slice2(start, end) {
            if (isCordova_default()) {
              return readAsByteArray(this._file.slice(start, end));
            }
            var value2 = this._file.slice(start, end);
            return Promise.resolve({
              value: value2
            });
          }
        }, {
          key: "close",
          value: function close() {
          }
        }]);
        return FileSource2;
      }();
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js
  function _classCallCheck7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties7(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass7(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties7(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties7(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function len(blobOrArray) {
    if (blobOrArray === void 0)
      return 0;
    if (blobOrArray.size !== void 0)
      return blobOrArray.size;
    return blobOrArray.length;
  }
  function concat(a3, b3) {
    if (a3.concat) {
      return a3.concat(b3);
    }
    if (a3 instanceof Blob) {
      return new Blob([a3, b3], {
        type: a3.type
      });
    }
    if (a3.set) {
      var c3 = new a3.constructor(a3.length + b3.length);
      c3.set(a3);
      c3.set(b3, a3.length);
      return c3;
    }
    throw new Error("Unknown data type");
  }
  var StreamSource;
  var init_StreamSource = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js"() {
      StreamSource = /* @__PURE__ */ function() {
        function StreamSource2(reader) {
          _classCallCheck7(this, StreamSource2);
          this._buffer = void 0;
          this._bufferOffset = 0;
          this._reader = reader;
          this._done = false;
        }
        _createClass7(StreamSource2, [{
          key: "slice",
          value: function slice2(start, end) {
            if (start < this._bufferOffset) {
              return Promise.reject(new Error("Requested data is before the reader's current offset"));
            }
            return this._readUntilEnoughDataOrDone(start, end);
          }
        }, {
          key: "_readUntilEnoughDataOrDone",
          value: function _readUntilEnoughDataOrDone(start, end) {
            var _this = this;
            var hasEnoughData = end <= this._bufferOffset + len(this._buffer);
            if (this._done || hasEnoughData) {
              var value2 = this._getDataFromBuffer(start, end);
              var done = value2 == null ? this._done : false;
              return Promise.resolve({
                value: value2,
                done
              });
            }
            return this._reader.read().then(function(_ref) {
              var value3 = _ref.value, done2 = _ref.done;
              if (done2) {
                _this._done = true;
              } else if (_this._buffer === void 0) {
                _this._buffer = value3;
              } else {
                _this._buffer = concat(_this._buffer, value3);
              }
              return _this._readUntilEnoughDataOrDone(start, end);
            });
          }
        }, {
          key: "_getDataFromBuffer",
          value: function _getDataFromBuffer(start, end) {
            if (start > this._bufferOffset) {
              this._buffer = this._buffer.slice(start - this._bufferOffset);
              this._bufferOffset = start;
            }
            var hasAllDataBeenRead = len(this._buffer) === 0;
            if (this._done && hasAllDataBeenRead) {
              return null;
            }
            return this._buffer.slice(0, end - start);
          }
        }, {
          key: "close",
          value: function close() {
            if (this._reader.cancel) {
              this._reader.cancel();
            }
          }
        }]);
        return StreamSource2;
      }();
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/fileReader.js
  function _classCallCheck8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties8(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass8(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties8(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties8(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var FileReader2;
  var init_fileReader = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/fileReader.js"() {
      init_isReactNative();
      init_uriToBlob();
      init_FileSource();
      init_StreamSource();
      FileReader2 = /* @__PURE__ */ function() {
        function FileReader3() {
          _classCallCheck8(this, FileReader3);
        }
        _createClass8(FileReader3, [{
          key: "openFile",
          value: function openFile(input, chunkSize) {
            if (isReactNative_default() && input && typeof input.uri !== "undefined") {
              return uriToBlob(input.uri).then(function(blob) {
                return new FileSource(blob);
              })["catch"](function(err) {
                throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(err));
              });
            }
            if (typeof input.slice === "function" && typeof input.size !== "undefined") {
              return Promise.resolve(new FileSource(input));
            }
            if (typeof input.read === "function") {
              chunkSize = Number(chunkSize);
              if (!Number.isFinite(chunkSize)) {
                return Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option"));
              }
              return Promise.resolve(new StreamSource(input, chunkSize));
            }
            return Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment"));
          }
        }]);
        return FileReader3;
      }();
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/fileSignature.js
  function fingerprint(file, options) {
    if (isReactNative_default()) {
      return Promise.resolve(reactNativeFingerprint(file, options));
    }
    return Promise.resolve(["tus-br", file.name, file.type, file.size, file.lastModified, options.endpoint].join("-"));
  }
  function reactNativeFingerprint(file, options) {
    var exifHash = file.exif ? hashCode(JSON.stringify(file.exif)) : "noexif";
    return ["tus-rn", file.name || "noname", file.size || "nosize", exifHash, options.endpoint].join("/");
  }
  function hashCode(str) {
    var hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (var i4 = 0; i4 < str.length; i4++) {
      var _char = str.charCodeAt(i4);
      hash = (hash << 5) - hash + _char;
      hash &= hash;
    }
    return hash;
  }
  var init_fileSignature = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/fileSignature.js"() {
      init_isReactNative();
    }
  });

  // ../node_modules/tus-js-client/lib.esm/browser/index.js
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof2(obj);
  }
  function _classCallCheck9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties9(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass9(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties9(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties9(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf2(subClass, superClass);
  }
  function _setPrototypeOf2(o3, p3) {
    _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o4, p4) {
      o4.__proto__ = p4;
      return o4;
    };
    return _setPrototypeOf2(o3, p3);
  }
  function _createSuper2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct2();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf2(Derived), result2;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf2(this).constructor;
        result2 = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result2 = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn2(this, result2);
    };
  }
  function _possibleConstructorReturn2(self2, call) {
    if (call && (_typeof2(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized2(self2);
  }
  function _assertThisInitialized2(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _isNativeReflectConstruct2() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e3) {
      return false;
    }
  }
  function _getPrototypeOf2(o3) {
    _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o4) {
      return o4.__proto__ || Object.getPrototypeOf(o4);
    };
    return _getPrototypeOf2(o3);
  }
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i4 = 1; i4 < arguments.length; i4++) {
      var source = null != arguments[i4] ? arguments[i4] : {};
      i4 % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty2(obj, key, value2) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value2,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value2;
    }
    return obj;
  }
  var defaultOptions3, Upload, _window, XMLHttpRequest2, Blob2, isSupported;
  var init_browser = __esm({
    "../node_modules/tus-js-client/lib.esm/browser/index.js"() {
      init_upload();
      init_noopUrlStorage();
      init_logger();
      init_error();
      init_urlStorage();
      init_httpStack();
      init_fileReader();
      init_fileSignature();
      defaultOptions3 = _objectSpread2(_objectSpread2({}, upload_default.defaultOptions), {}, {
        httpStack: new XHRHttpStack(),
        fileReader: new FileReader2(),
        urlStorage: canStoreURLs ? new WebStorageUrlStorage() : new NoopUrlStorage(),
        fingerprint
      });
      Upload = /* @__PURE__ */ function(_BaseUpload) {
        _inherits2(Upload2, _BaseUpload);
        var _super = _createSuper2(Upload2);
        function Upload2() {
          var file = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          _classCallCheck9(this, Upload2);
          options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
          return _super.call(this, file, options);
        }
        _createClass9(Upload2, null, [{
          key: "terminate",
          value: function terminate(url2, options, cb) {
            options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
            return upload_default.terminate(url2, options, cb);
          }
        }]);
        return Upload2;
      }(upload_default);
      _window = window;
      XMLHttpRequest2 = _window.XMLHttpRequest;
      Blob2 = _window.Blob;
      isSupported = XMLHttpRequest2 && Blob2 && typeof Blob2.prototype.slice === "function";
    }
  });

  // ../packages/@uppy/utils/lib/NetworkError.js
  var NetworkError, NetworkError_default;
  var init_NetworkError = __esm({
    "../packages/@uppy/utils/lib/NetworkError.js"() {
      NetworkError = class extends Error {
        constructor(error, xhr) {
          if (xhr === void 0) {
            xhr = null;
          }
          super(`This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.`);
          this.cause = error;
          this.isNetworkError = true;
          this.request = xhr;
        }
      };
      NetworkError_default = NetworkError;
    }
  });

  // ../packages/@uppy/utils/lib/fetchWithNetworkError.js
  function fetchWithNetworkError() {
    return fetch(...arguments).catch((err) => {
      if (err.name === "AbortError") {
        throw err;
      } else {
        throw new NetworkError_default(err);
      }
    });
  }
  var init_fetchWithNetworkError = __esm({
    "../packages/@uppy/utils/lib/fetchWithNetworkError.js"() {
      init_NetworkError();
    }
  });

  // ../packages/@uppy/companion-client/lib/AuthError.js
  var AuthError, AuthError_default;
  var init_AuthError = __esm({
    "../packages/@uppy/companion-client/lib/AuthError.js"() {
      "use strict";
      AuthError = class extends Error {
        constructor() {
          super("Authorization required");
          this.name = "AuthError";
          this.isAuthError = true;
        }
      };
      AuthError_default = AuthError;
    }
  });

  // ../packages/@uppy/companion-client/lib/RequestClient.js
  function _classPrivateFieldLooseBase7(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey7(name) {
    return "__private_" + id7++ + "_" + name;
  }
  function stripSlash(url2) {
    return url2.replace(/\/$/, "");
  }
  async function handleJSONResponse(res) {
    if (res.status === 401) {
      throw new AuthError_default();
    }
    const jsonPromise = res.json();
    if (res.status < 200 || res.status > 300) {
      let errMsg = `Failed request with status: ${res.status}. ${res.statusText}`;
      try {
        const errData = await jsonPromise;
        errMsg = errData.message ? `${errMsg} message: ${errData.message}` : errMsg;
        errMsg = errData.requestId ? `${errMsg} request-Id: ${errData.requestId}` : errMsg;
      } finally {
        throw new Error(errMsg);
      }
    }
    return jsonPromise;
  }
  function _getUrl2(url2) {
    if (/^(https?:|)\/\//.test(url2)) {
      return url2;
    }
    return `${this.hostname}/${url2}`;
  }
  function _errorHandler2(method, path) {
    return (err) => {
      var _err;
      if (!((_err = err) != null && _err.isAuthError)) {
        err = new ErrorWithCause_default(`Could not ${method} ${_classPrivateFieldLooseBase7(this, _getUrl)[_getUrl](path)}`, {
          cause: err
        });
      }
      return Promise.reject(err);
    };
  }
  var _Symbol$for4, id7, packageJson8, _companionHeaders, _getPostResponseFunc, _getUrl, _errorHandler, RequestClient;
  var init_RequestClient = __esm({
    "../packages/@uppy/companion-client/lib/RequestClient.js"() {
      "use strict";
      init_fetchWithNetworkError();
      init_ErrorWithCause();
      init_AuthError();
      id7 = 0;
      packageJson8 = {
        "version": "3.0.0-beta.2"
      };
      _companionHeaders = /* @__PURE__ */ _classPrivateFieldLooseKey7("companionHeaders");
      _getPostResponseFunc = /* @__PURE__ */ _classPrivateFieldLooseKey7("getPostResponseFunc");
      _getUrl = /* @__PURE__ */ _classPrivateFieldLooseKey7("getUrl");
      _errorHandler = /* @__PURE__ */ _classPrivateFieldLooseKey7("errorHandler");
      _Symbol$for4 = Symbol.for("uppy test: getCompanionHeaders");
      RequestClient = class {
        constructor(uppy, opts) {
          Object.defineProperty(this, _errorHandler, {
            value: _errorHandler2
          });
          Object.defineProperty(this, _getUrl, {
            value: _getUrl2
          });
          Object.defineProperty(this, _companionHeaders, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _getPostResponseFunc, {
            writable: true,
            value: (skip) => (response) => skip ? response : this.onReceiveResponse(response)
          });
          this.uppy = uppy;
          this.opts = opts;
          this.onReceiveResponse = this.onReceiveResponse.bind(this);
          this.allowedHeaders = ["accept", "content-type", "uppy-auth-token"];
          this.preflightDone = false;
          _classPrivateFieldLooseBase7(this, _companionHeaders)[_companionHeaders] = opts == null ? void 0 : opts.companionHeaders;
        }
        setCompanionHeaders(headers) {
          _classPrivateFieldLooseBase7(this, _companionHeaders)[_companionHeaders] = headers;
        }
        [_Symbol$for4]() {
          return _classPrivateFieldLooseBase7(this, _companionHeaders)[_companionHeaders];
        }
        get hostname() {
          const {
            companion
          } = this.uppy.getState();
          const host = this.opts.companionUrl;
          return stripSlash(companion && companion[host] ? companion[host] : host);
        }
        headers() {
          return Promise.resolve({
            ...RequestClient.defaultHeaders,
            ..._classPrivateFieldLooseBase7(this, _companionHeaders)[_companionHeaders]
          });
        }
        onReceiveResponse(response) {
          const state = this.uppy.getState();
          const companion = state.companion || {};
          const host = this.opts.companionUrl;
          const {
            headers
          } = response;
          if (headers.has("i-am") && headers.get("i-am") !== companion[host]) {
            this.uppy.setState({
              companion: {
                ...companion,
                [host]: headers.get("i-am")
              }
            });
          }
          return response;
        }
        preflight(path) {
          if (this.preflightDone) {
            return Promise.resolve(this.allowedHeaders.slice());
          }
          return fetch(_classPrivateFieldLooseBase7(this, _getUrl)[_getUrl](path), {
            method: "OPTIONS"
          }).then((response) => {
            if (response.headers.has("access-control-allow-headers")) {
              this.allowedHeaders = response.headers.get("access-control-allow-headers").split(",").map((headerName) => headerName.trim().toLowerCase());
            }
            this.preflightDone = true;
            return this.allowedHeaders.slice();
          }).catch((err) => {
            this.uppy.log(`[CompanionClient] unable to make preflight request ${err}`, "warning");
            this.preflightDone = true;
            return this.allowedHeaders.slice();
          });
        }
        preflightAndHeaders(path) {
          return Promise.all([this.preflight(path), this.headers()]).then((_ref) => {
            let [allowedHeaders, headers] = _ref;
            Object.keys(headers).forEach((header) => {
              if (!allowedHeaders.includes(header.toLowerCase())) {
                this.uppy.log(`[CompanionClient] excluding disallowed header ${header}`);
                delete headers[header];
              }
            });
            return headers;
          });
        }
        get(path, skipPostResponse) {
          const method = "get";
          return this.preflightAndHeaders(path).then((headers) => fetchWithNetworkError(_classPrivateFieldLooseBase7(this, _getUrl)[_getUrl](path), {
            method,
            headers,
            credentials: this.opts.companionCookiesRule || "same-origin"
          })).then(_classPrivateFieldLooseBase7(this, _getPostResponseFunc)[_getPostResponseFunc](skipPostResponse)).then(handleJSONResponse).catch(_classPrivateFieldLooseBase7(this, _errorHandler)[_errorHandler](method, path));
        }
        post(path, data, skipPostResponse) {
          const method = "post";
          return this.preflightAndHeaders(path).then((headers) => fetchWithNetworkError(_classPrivateFieldLooseBase7(this, _getUrl)[_getUrl](path), {
            method,
            headers,
            credentials: this.opts.companionCookiesRule || "same-origin",
            body: JSON.stringify(data)
          })).then(_classPrivateFieldLooseBase7(this, _getPostResponseFunc)[_getPostResponseFunc](skipPostResponse)).then(handleJSONResponse).catch(_classPrivateFieldLooseBase7(this, _errorHandler)[_errorHandler](method, path));
        }
        delete(path, data, skipPostResponse) {
          const method = "delete";
          return this.preflightAndHeaders(path).then((headers) => fetchWithNetworkError(`${this.hostname}/${path}`, {
            method,
            headers,
            credentials: this.opts.companionCookiesRule || "same-origin",
            body: data ? JSON.stringify(data) : null
          })).then(_classPrivateFieldLooseBase7(this, _getPostResponseFunc)[_getPostResponseFunc](skipPostResponse)).then(handleJSONResponse).catch(_classPrivateFieldLooseBase7(this, _errorHandler)[_errorHandler](method, path));
        }
      };
      RequestClient.VERSION = packageJson8.version;
      RequestClient.defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Uppy-Versions": `@uppy/companion-client=${RequestClient.VERSION}`
      };
    }
  });

  // ../packages/@uppy/companion-client/lib/tokenStorage.js
  var tokenStorage_exports = {};
  __export(tokenStorage_exports, {
    getItem: () => getItem,
    removeItem: () => removeItem,
    setItem: () => setItem
  });
  function setItem(key, value2) {
    return new Promise((resolve) => {
      localStorage.setItem(key, value2);
      resolve();
    });
  }
  function getItem(key) {
    return Promise.resolve(localStorage.getItem(key));
  }
  function removeItem(key) {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve();
    });
  }
  var init_tokenStorage = __esm({
    "../packages/@uppy/companion-client/lib/tokenStorage.js"() {
      "use strict";
    }
  });

  // ../packages/@uppy/companion-client/lib/Provider.js
  var getName, Provider;
  var init_Provider = __esm({
    "../packages/@uppy/companion-client/lib/Provider.js"() {
      "use strict";
      init_RequestClient();
      init_tokenStorage();
      getName = (id21) => {
        return id21.split("-").map((s3) => s3.charAt(0).toUpperCase() + s3.slice(1)).join(" ");
      };
      Provider = class extends RequestClient {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.provider = opts.provider;
          this.id = this.provider;
          this.name = this.opts.name || getName(this.id);
          this.pluginId = this.opts.pluginId;
          this.tokenKey = `companion-${this.pluginId}-auth-token`;
          this.companionKeysParams = this.opts.companionKeysParams;
          this.preAuthToken = null;
        }
        headers() {
          return Promise.all([super.headers(), this.getAuthToken()]).then((_ref) => {
            let [headers, token] = _ref;
            const authHeaders = {};
            if (token) {
              authHeaders["uppy-auth-token"] = token;
            }
            if (this.companionKeysParams) {
              authHeaders["uppy-credentials-params"] = btoa(JSON.stringify({
                params: this.companionKeysParams
              }));
            }
            return {
              ...headers,
              ...authHeaders
            };
          });
        }
        onReceiveResponse(response) {
          response = super.onReceiveResponse(response);
          const plugin = this.uppy.getPlugin(this.pluginId);
          const oldAuthenticated = plugin.getPluginState().authenticated;
          const authenticated = oldAuthenticated ? response.status !== 401 : response.status < 400;
          plugin.setPluginState({
            authenticated
          });
          return response;
        }
        setAuthToken(token) {
          return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, token);
        }
        getAuthToken() {
          return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey);
        }
        async ensurePreAuth() {
          if (this.companionKeysParams && !this.preAuthToken) {
            await this.fetchPreAuthToken();
            if (!this.preAuthToken) {
              throw new Error("Could not load authentication data required for third-party login. Please try again later.");
            }
          }
        }
        authUrl(queries) {
          if (queries === void 0) {
            queries = {};
          }
          const params = new URLSearchParams(queries);
          if (this.preAuthToken) {
            params.set("uppyPreAuthToken", this.preAuthToken);
          }
          return `${this.hostname}/${this.id}/connect?${params}`;
        }
        fileUrl(id21) {
          return `${this.hostname}/${this.id}/get/${id21}`;
        }
        async fetchPreAuthToken() {
          if (!this.companionKeysParams) {
            return;
          }
          try {
            const res = await this.post(`${this.id}/preauth/`, {
              params: this.companionKeysParams
            });
            this.preAuthToken = res.token;
          } catch (err) {
            this.uppy.log(`[CompanionClient] unable to fetch preAuthToken ${err}`, "warning");
          }
        }
        list(directory) {
          return this.get(`${this.id}/list/${directory || ""}`);
        }
        logout() {
          return this.get(`${this.id}/logout`).then((response) => Promise.all([response, this.uppy.getPlugin(this.pluginId).storage.removeItem(this.tokenKey)])).then((_ref2) => {
            let [response] = _ref2;
            return response;
          });
        }
        static initPlugin(plugin, opts, defaultOpts) {
          plugin.type = "acquirer";
          plugin.files = [];
          if (defaultOpts) {
            plugin.opts = {
              ...defaultOpts,
              ...opts
            };
          }
          if (opts.serverUrl || opts.serverPattern) {
            throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
          }
          if (opts.companionAllowedHosts) {
            const pattern = opts.companionAllowedHosts;
            if (typeof pattern !== "string" && !Array.isArray(pattern) && !(pattern instanceof RegExp)) {
              throw new TypeError(`${plugin.id}: the option "companionAllowedHosts" must be one of string, Array, RegExp`);
            }
            plugin.opts.companionAllowedHosts = pattern;
          } else if (/^(?!https?:\/\/).*$/i.test(opts.companionUrl)) {
            plugin.opts.companionAllowedHosts = `https://${opts.companionUrl.replace(/^\/\//, "")}`;
          } else {
            plugin.opts.companionAllowedHosts = new URL(opts.companionUrl).origin;
          }
          plugin.storage = plugin.opts.storage || tokenStorage_exports;
        }
      };
    }
  });

  // ../packages/@uppy/companion-client/lib/SearchProvider.js
  var getName2, SearchProvider;
  var init_SearchProvider = __esm({
    "../packages/@uppy/companion-client/lib/SearchProvider.js"() {
      "use strict";
      init_RequestClient();
      getName2 = (id21) => {
        return id21.split("-").map((s3) => s3.charAt(0).toUpperCase() + s3.slice(1)).join(" ");
      };
      SearchProvider = class extends RequestClient {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.provider = opts.provider;
          this.id = this.provider;
          this.name = this.opts.name || getName2(this.id);
          this.pluginId = this.opts.pluginId;
        }
        fileUrl(id21) {
          return `${this.hostname}/search/${this.id}/get/${id21}`;
        }
        search(text, queries) {
          return this.get(`search/${this.id}/list?q=${encodeURIComponent(text)}${queries ? `&${queries}` : ""}`);
        }
      };
    }
  });

  // ../packages/@uppy/companion-client/lib/Socket.js
  function _classPrivateFieldLooseBase8(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey8(name) {
    return "__private_" + id8++ + "_" + name;
  }
  var import_namespace_emitter2, _Symbol$for5, _Symbol$for22, id8, _queued, _emitter2, _isOpen, _socket, _handleMessage, UppySocket;
  var init_Socket = __esm({
    "../packages/@uppy/companion-client/lib/Socket.js"() {
      import_namespace_emitter2 = __toESM(require_namespace_emitter(), 1);
      id8 = 0;
      _queued = /* @__PURE__ */ _classPrivateFieldLooseKey8("queued");
      _emitter2 = /* @__PURE__ */ _classPrivateFieldLooseKey8("emitter");
      _isOpen = /* @__PURE__ */ _classPrivateFieldLooseKey8("isOpen");
      _socket = /* @__PURE__ */ _classPrivateFieldLooseKey8("socket");
      _handleMessage = /* @__PURE__ */ _classPrivateFieldLooseKey8("handleMessage");
      _Symbol$for5 = Symbol.for("uppy test: getSocket");
      _Symbol$for22 = Symbol.for("uppy test: getQueued");
      UppySocket = class {
        constructor(opts) {
          Object.defineProperty(this, _queued, {
            writable: true,
            value: []
          });
          Object.defineProperty(this, _emitter2, {
            writable: true,
            value: (0, import_namespace_emitter2.default)()
          });
          Object.defineProperty(this, _isOpen, {
            writable: true,
            value: false
          });
          Object.defineProperty(this, _socket, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _handleMessage, {
            writable: true,
            value: (e3) => {
              try {
                const message = JSON.parse(e3.data);
                this.emit(message.action, message.payload);
              } catch (err) {
                console.log(err);
              }
            }
          });
          this.opts = opts;
          if (!opts || opts.autoOpen !== false) {
            this.open();
          }
        }
        get isOpen() {
          return _classPrivateFieldLooseBase8(this, _isOpen)[_isOpen];
        }
        [_Symbol$for5]() {
          return _classPrivateFieldLooseBase8(this, _socket)[_socket];
        }
        [_Symbol$for22]() {
          return _classPrivateFieldLooseBase8(this, _queued)[_queued];
        }
        open() {
          _classPrivateFieldLooseBase8(this, _socket)[_socket] = new WebSocket(this.opts.target);
          _classPrivateFieldLooseBase8(this, _socket)[_socket].onopen = () => {
            _classPrivateFieldLooseBase8(this, _isOpen)[_isOpen] = true;
            while (_classPrivateFieldLooseBase8(this, _queued)[_queued].length > 0 && _classPrivateFieldLooseBase8(this, _isOpen)[_isOpen]) {
              const first = _classPrivateFieldLooseBase8(this, _queued)[_queued].shift();
              this.send(first.action, first.payload);
            }
          };
          _classPrivateFieldLooseBase8(this, _socket)[_socket].onclose = () => {
            _classPrivateFieldLooseBase8(this, _isOpen)[_isOpen] = false;
          };
          _classPrivateFieldLooseBase8(this, _socket)[_socket].onmessage = _classPrivateFieldLooseBase8(this, _handleMessage)[_handleMessage];
        }
        close() {
          var _classPrivateFieldLoo;
          (_classPrivateFieldLoo = _classPrivateFieldLooseBase8(this, _socket)[_socket]) == null ? void 0 : _classPrivateFieldLoo.close();
        }
        send(action, payload) {
          if (!_classPrivateFieldLooseBase8(this, _isOpen)[_isOpen]) {
            _classPrivateFieldLooseBase8(this, _queued)[_queued].push({
              action,
              payload
            });
            return;
          }
          _classPrivateFieldLooseBase8(this, _socket)[_socket].send(JSON.stringify({
            action,
            payload
          }));
        }
        on(action, handler) {
          _classPrivateFieldLooseBase8(this, _emitter2)[_emitter2].on(action, handler);
        }
        emit(action, payload) {
          _classPrivateFieldLooseBase8(this, _emitter2)[_emitter2].emit(action, payload);
        }
        once(action, handler) {
          _classPrivateFieldLooseBase8(this, _emitter2)[_emitter2].once(action, handler);
        }
      };
    }
  });

  // ../packages/@uppy/companion-client/lib/index.js
  var init_lib8 = __esm({
    "../packages/@uppy/companion-client/lib/index.js"() {
      "use strict";
      init_RequestClient();
      init_Provider();
      init_SearchProvider();
      init_Socket();
    }
  });

  // ../packages/@uppy/utils/lib/emitSocketProgress.js
  function emitSocketProgress(uploader, progressData, file) {
    const {
      progress,
      bytesUploaded,
      bytesTotal
    } = progressData;
    if (progress) {
      uploader.uppy.log(`Upload progress: ${progress}`);
      uploader.uppy.emit("upload-progress", file, {
        uploader,
        bytesUploaded,
        bytesTotal
      });
    }
  }
  var import_lodash4, emitSocketProgress_default;
  var init_emitSocketProgress = __esm({
    "../packages/@uppy/utils/lib/emitSocketProgress.js"() {
      import_lodash4 = __toESM(require_lodash(), 1);
      emitSocketProgress_default = (0, import_lodash4.default)(emitSocketProgress, 300, {
        leading: true,
        trailing: true
      });
    }
  });

  // ../packages/@uppy/utils/lib/getSocketHost.js
  function getSocketHost(url2) {
    const regex = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i;
    const host = regex.exec(url2)[1];
    const socketProtocol = /^http:\/\//i.test(url2) ? "ws" : "wss";
    return `${socketProtocol}://${host}`;
  }
  var init_getSocketHost = __esm({
    "../packages/@uppy/utils/lib/getSocketHost.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/settle.js
  function settle(promises) {
    const resolutions = [];
    const rejections = [];
    function resolved(value2) {
      resolutions.push(value2);
    }
    function rejected(error) {
      rejections.push(error);
    }
    const wait = Promise.all(promises.map((promise) => promise.then(resolved, rejected)));
    return wait.then(() => {
      return {
        successful: resolutions,
        failed: rejections
      };
    });
  }
  var init_settle = __esm({
    "../packages/@uppy/utils/lib/settle.js"() {
    }
  });

  // ../packages/@uppy/utils/lib/EventTracker.js
  function _classPrivateFieldLooseBase9(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey9(name) {
    return "__private_" + id9++ + "_" + name;
  }
  var id9, _emitter3, _events, EventTracker;
  var init_EventTracker = __esm({
    "../packages/@uppy/utils/lib/EventTracker.js"() {
      id9 = 0;
      _emitter3 = /* @__PURE__ */ _classPrivateFieldLooseKey9("emitter");
      _events = /* @__PURE__ */ _classPrivateFieldLooseKey9("events");
      EventTracker = class {
        constructor(emitter) {
          Object.defineProperty(this, _emitter3, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _events, {
            writable: true,
            value: []
          });
          _classPrivateFieldLooseBase9(this, _emitter3)[_emitter3] = emitter;
        }
        on(event, fn) {
          _classPrivateFieldLooseBase9(this, _events)[_events].push([event, fn]);
          return _classPrivateFieldLooseBase9(this, _emitter3)[_emitter3].on(event, fn);
        }
        remove() {
          for (const [event, fn] of _classPrivateFieldLooseBase9(this, _events)[_events].splice(0)) {
            _classPrivateFieldLooseBase9(this, _emitter3)[_emitter3].off(event, fn);
          }
        }
      };
    }
  });

  // ../packages/@uppy/utils/lib/isNetworkError.js
  function isNetworkError(xhr) {
    if (!xhr) {
      return false;
    }
    return xhr.readyState !== 0 && xhr.readyState !== 4 || xhr.status === 0;
  }
  var isNetworkError_default;
  var init_isNetworkError = __esm({
    "../packages/@uppy/utils/lib/isNetworkError.js"() {
      isNetworkError_default = isNetworkError;
    }
  });

  // ../packages/@uppy/tus/lib/getFingerprint.js
  function isCordova3() {
    return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
  }
  function isReactNative3() {
    return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  }
  function getFingerprint(uppyFileObj) {
    return (file, options) => {
      if (isCordova3() || isReactNative3()) {
        return defaultOptions3.fingerprint(file, options);
      }
      const uppyFingerprint = ["tus", uppyFileObj.id, options.endpoint].join("-");
      return Promise.resolve(uppyFingerprint);
    };
  }
  var init_getFingerprint = __esm({
    "../packages/@uppy/tus/lib/getFingerprint.js"() {
      init_browser();
    }
  });

  // ../packages/@uppy/tus/lib/index.js
  function _classPrivateFieldLooseBase10(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey10(name) {
    return "__private_" + id10++ + "_" + name;
  }
  var id10, packageJson9, tusDefaultOptions, _retryDelayIterator, _queueRequestSocketToken, _requestSocketToken, Tus;
  var init_lib9 = __esm({
    "../packages/@uppy/tus/lib/index.js"() {
      init_BasePlugin();
      init_browser();
      init_lib8();
      init_emitSocketProgress();
      init_getSocketHost();
      init_settle();
      init_EventTracker();
      init_NetworkError();
      init_isNetworkError();
      init_RateLimitedQueue();
      init_hasProperty();
      init_getFingerprint();
      id10 = 0;
      packageJson9 = {
        "version": "3.0.0-beta.3"
      };
      tusDefaultOptions = {
        endpoint: "",
        uploadUrl: null,
        metadata: {},
        uploadSize: null,
        onProgress: null,
        onChunkComplete: null,
        onSuccess: null,
        onError: null,
        overridePatchMethod: false,
        headers: {},
        addRequestId: false,
        chunkSize: Infinity,
        retryDelays: [100, 1e3, 3e3, 5e3],
        parallelUploads: 1,
        removeFingerprintOnSuccess: false,
        uploadLengthDeferred: false,
        uploadDataDuringCreation: false
      };
      _retryDelayIterator = /* @__PURE__ */ _classPrivateFieldLooseKey10("retryDelayIterator");
      _queueRequestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey10("queueRequestSocketToken");
      _requestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey10("requestSocketToken");
      Tus = class extends BasePlugin {
        constructor(uppy, _opts) {
          var _this$opts$rateLimite, _this$opts$retryDelay;
          super(uppy, _opts);
          Object.defineProperty(this, _retryDelayIterator, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _queueRequestSocketToken, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _requestSocketToken, {
            writable: true,
            value: async (file) => {
              const Client2 = file.remote.providerOptions.provider ? Provider : RequestClient;
              const client = new Client2(this.uppy, file.remote.providerOptions);
              const opts = {
                ...this.opts
              };
              if (file.tus) {
                Object.assign(opts, file.tus);
              }
              const res = await client.post(file.remote.url, {
                ...file.remote.body,
                endpoint: opts.endpoint,
                uploadUrl: opts.uploadUrl,
                protocol: "tus",
                size: file.data.size,
                headers: opts.headers,
                metadata: file.meta
              });
              return res.token;
            }
          });
          this.type = "uploader";
          this.id = this.opts.id || "Tus";
          this.title = "Tus";
          const defaultOptions4 = {
            useFastRemoteRetry: true,
            limit: 20,
            retryDelays: tusDefaultOptions.retryDelays,
            withCredentials: false
          };
          this.opts = {
            ...defaultOptions4,
            ..._opts
          };
          if ("autoRetry" in _opts) {
            throw new Error("The `autoRetry` option was deprecated and has been removed.");
          }
          this.requests = (_this$opts$rateLimite = this.opts.rateLimitedQueue) != null ? _this$opts$rateLimite : new RateLimitedQueue(this.opts.limit);
          _classPrivateFieldLooseBase10(this, _retryDelayIterator)[_retryDelayIterator] = (_this$opts$retryDelay = this.opts.retryDelays) == null ? void 0 : _this$opts$retryDelay.values();
          this.uploaders = /* @__PURE__ */ Object.create(null);
          this.uploaderEvents = /* @__PURE__ */ Object.create(null);
          this.uploaderSockets = /* @__PURE__ */ Object.create(null);
          this.handleResetProgress = this.handleResetProgress.bind(this);
          this.handleUpload = this.handleUpload.bind(this);
          _classPrivateFieldLooseBase10(this, _queueRequestSocketToken)[_queueRequestSocketToken] = this.requests.wrapPromiseFunction(_classPrivateFieldLooseBase10(this, _requestSocketToken)[_requestSocketToken]);
        }
        handleResetProgress() {
          const files = {
            ...this.uppy.getState().files
          };
          Object.keys(files).forEach((fileID) => {
            if (files[fileID].tus && files[fileID].tus.uploadUrl) {
              const tusState = {
                ...files[fileID].tus
              };
              delete tusState.uploadUrl;
              files[fileID] = {
                ...files[fileID],
                tus: tusState
              };
            }
          });
          this.uppy.setState({
            files
          });
        }
        resetUploaderReferences(fileID, opts) {
          if (opts === void 0) {
            opts = {};
          }
          if (this.uploaders[fileID]) {
            const uploader = this.uploaders[fileID];
            uploader.abort();
            if (opts.abort) {
              uploader.abort(true);
            }
            this.uploaders[fileID] = null;
          }
          if (this.uploaderEvents[fileID]) {
            this.uploaderEvents[fileID].remove();
            this.uploaderEvents[fileID] = null;
          }
          if (this.uploaderSockets[fileID]) {
            this.uploaderSockets[fileID].close();
            this.uploaderSockets[fileID] = null;
          }
        }
        upload(file) {
          var _this = this;
          this.resetUploaderReferences(file.id);
          return new Promise((resolve, reject) => {
            let queuedRequest;
            let qRequest;
            let upload;
            this.uppy.emit("upload-started", file);
            const opts = {
              ...this.opts,
              ...file.tus || {}
            };
            if (typeof opts.headers === "function") {
              opts.headers = opts.headers(file);
            }
            const uploadOptions = {
              ...tusDefaultOptions,
              ...opts
            };
            uploadOptions.fingerprint = getFingerprint(file);
            uploadOptions.onBeforeRequest = (req) => {
              const xhr = req.getUnderlyingObject();
              xhr.withCredentials = !!opts.withCredentials;
              let userProvidedPromise;
              if (typeof opts.onBeforeRequest === "function") {
                userProvidedPromise = opts.onBeforeRequest(req, file);
              }
              if (has(queuedRequest, "shouldBeRequeued")) {
                if (!queuedRequest.shouldBeRequeued)
                  return Promise.reject();
                let done;
                const p3 = new Promise((res) => {
                  done = res;
                });
                queuedRequest = this.requests.run(() => {
                  if (file.isPaused) {
                    queuedRequest.abort();
                  }
                  done();
                  return () => {
                  };
                });
                return Promise.all([p3, userProvidedPromise]);
              }
              return userProvidedPromise;
            };
            uploadOptions.onError = (err) => {
              this.uppy.log(err);
              const xhr = err.originalRequest ? err.originalRequest.getUnderlyingObject() : null;
              if (isNetworkError_default(xhr)) {
                err = new NetworkError_default(err, xhr);
              }
              this.resetUploaderReferences(file.id);
              queuedRequest.abort();
              this.uppy.emit("upload-error", file, err);
              reject(err);
            };
            uploadOptions.onProgress = (bytesUploaded, bytesTotal) => {
              this.onReceiveUploadUrl(file, upload.url);
              this.uppy.emit("upload-progress", file, {
                uploader: this,
                bytesUploaded,
                bytesTotal
              });
            };
            uploadOptions.onSuccess = () => {
              const uploadResp = {
                uploadURL: upload.url
              };
              this.resetUploaderReferences(file.id);
              queuedRequest.done();
              this.uppy.emit("upload-success", file, uploadResp);
              if (upload.url) {
                this.uppy.log(`Download ${upload.file.name} from ${upload.url}`);
              }
              resolve(upload);
            };
            const defaultOnShouldRetry = (err) => {
              var _err$originalResponse;
              const status = err == null ? void 0 : (_err$originalResponse = err.originalResponse) == null ? void 0 : _err$originalResponse.getStatus();
              if (status === 429) {
                if (!this.requests.isPaused) {
                  var _classPrivateFieldLoo;
                  const next = (_classPrivateFieldLoo = _classPrivateFieldLooseBase10(this, _retryDelayIterator)[_retryDelayIterator]) == null ? void 0 : _classPrivateFieldLoo.next();
                  if (next == null || next.done) {
                    return false;
                  }
                  this.requests.rateLimit(next.value);
                }
              } else if (status > 400 && status < 500 && status !== 409) {
                return false;
              } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
                if (!this.requests.isPaused) {
                  this.requests.pause();
                  window.addEventListener("online", () => {
                    this.requests.resume();
                  }, {
                    once: true
                  });
                }
              }
              queuedRequest.abort();
              queuedRequest = {
                shouldBeRequeued: true,
                abort() {
                  this.shouldBeRequeued = false;
                },
                done() {
                  throw new Error("Cannot mark a queued request as done: this indicates a bug");
                },
                fn() {
                  throw new Error("Cannot run a queued request: this indicates a bug");
                }
              };
              return true;
            };
            if (opts.onShouldRetry != null) {
              uploadOptions.onShouldRetry = function() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                return opts.onShouldRetry(...args, defaultOnShouldRetry);
              };
            } else {
              uploadOptions.onShouldRetry = defaultOnShouldRetry;
            }
            const copyProp = (obj, srcProp, destProp) => {
              if (has(obj, srcProp) && !has(obj, destProp)) {
                obj[destProp] = obj[srcProp];
              }
            };
            const meta = {};
            const metaFields = Array.isArray(opts.metaFields) ? opts.metaFields : Object.keys(file.meta);
            metaFields.forEach((item) => {
              meta[item] = file.meta[item];
            });
            copyProp(meta, "type", "filetype");
            copyProp(meta, "name", "filename");
            uploadOptions.metadata = meta;
            upload = new Upload(file.data, uploadOptions);
            this.uploaders[file.id] = upload;
            this.uploaderEvents[file.id] = new EventTracker(this.uppy);
            qRequest = () => {
              if (!file.isPaused) {
                upload.start();
              }
              return () => {
              };
            };
            upload.findPreviousUploads().then((previousUploads) => {
              const previousUpload = previousUploads[0];
              if (previousUpload) {
                this.uppy.log(`[Tus] Resuming upload of ${file.id} started at ${previousUpload.creationTime}`);
                upload.resumeFromPreviousUpload(previousUpload);
              }
            });
            queuedRequest = this.requests.run(qRequest);
            this.onFileRemove(file.id, (targetFileID) => {
              queuedRequest.abort();
              this.resetUploaderReferences(file.id, {
                abort: !!upload.url
              });
              resolve(`upload ${targetFileID} was removed`);
            });
            this.onPause(file.id, (isPaused) => {
              queuedRequest.abort();
              if (isPaused) {
                upload.abort();
              } else {
                queuedRequest = this.requests.run(qRequest);
              }
            });
            this.onPauseAll(file.id, () => {
              queuedRequest.abort();
              upload.abort();
            });
            this.onCancelAll(file.id, function(_temp) {
              let {
                reason
              } = _temp === void 0 ? {} : _temp;
              if (reason === "user") {
                queuedRequest.abort();
                _this.resetUploaderReferences(file.id, {
                  abort: !!upload.url
                });
              }
              resolve(`upload ${file.id} was canceled`);
            });
            this.onResumeAll(file.id, () => {
              queuedRequest.abort();
              if (file.error) {
                upload.abort();
              }
              queuedRequest = this.requests.run(qRequest);
            });
          }).catch((err) => {
            this.uppy.emit("upload-error", file, err);
            throw err;
          });
        }
        async uploadRemote(file) {
          this.resetUploaderReferences(file.id);
          if (!file.progress.uploadStarted || !file.isRestored) {
            this.uppy.emit("upload-started", file);
          }
          try {
            if (file.serverToken) {
              return this.connectToServerSocket(file);
            }
            const serverToken = await _classPrivateFieldLooseBase10(this, _queueRequestSocketToken)[_queueRequestSocketToken](file);
            this.uppy.setFileState(file.id, {
              serverToken
            });
            return this.connectToServerSocket(this.uppy.getFile(file.id));
          } catch (err) {
            this.uppy.emit("upload-error", file, err);
            throw err;
          }
        }
        connectToServerSocket(file) {
          var _this2 = this;
          return new Promise((resolve, reject) => {
            const token = file.serverToken;
            const host = getSocketHost(file.remote.companionUrl);
            const socket = new UppySocket({
              target: `${host}/api/${token}`
            });
            this.uploaderSockets[file.id] = socket;
            this.uploaderEvents[file.id] = new EventTracker(this.uppy);
            let queuedRequest;
            this.onFileRemove(file.id, () => {
              queuedRequest.abort();
              socket.send("cancel", {});
              this.resetUploaderReferences(file.id);
              resolve(`upload ${file.id} was removed`);
            });
            this.onPause(file.id, (isPaused) => {
              if (isPaused) {
                queuedRequest.abort();
                socket.send("pause", {});
              } else {
                queuedRequest.abort();
                queuedRequest = this.requests.run(() => {
                  socket.send("resume", {});
                  return () => {
                  };
                });
              }
            });
            this.onPauseAll(file.id, () => {
              queuedRequest.abort();
              socket.send("pause", {});
            });
            this.onCancelAll(file.id, function(_temp2) {
              let {
                reason
              } = _temp2 === void 0 ? {} : _temp2;
              if (reason === "user") {
                queuedRequest.abort();
                socket.send("cancel", {});
                _this2.resetUploaderReferences(file.id);
              }
              resolve(`upload ${file.id} was canceled`);
            });
            this.onResumeAll(file.id, () => {
              queuedRequest.abort();
              if (file.error) {
                socket.send("pause", {});
              }
              queuedRequest = this.requests.run(() => {
                socket.send("resume", {});
                return () => {
                };
              });
            });
            this.onRetry(file.id, () => {
              if (socket.isOpen) {
                socket.send("pause", {});
                socket.send("resume", {});
              }
            });
            this.onRetryAll(file.id, () => {
              if (socket.isOpen) {
                socket.send("pause", {});
                socket.send("resume", {});
              }
            });
            socket.on("progress", (progressData) => emitSocketProgress_default(this, progressData, file));
            socket.on("error", (errData) => {
              const {
                message
              } = errData.error;
              const error = Object.assign(new Error(message), {
                cause: errData.error
              });
              if (!this.opts.useFastRemoteRetry) {
                this.resetUploaderReferences(file.id);
                this.uppy.setFileState(file.id, {
                  serverToken: null
                });
              } else {
                socket.close();
              }
              this.uppy.emit("upload-error", file, error);
              queuedRequest.done();
              reject(error);
            });
            socket.on("success", (data) => {
              const uploadResp = {
                uploadURL: data.url
              };
              this.uppy.emit("upload-success", file, uploadResp);
              this.resetUploaderReferences(file.id);
              queuedRequest.done();
              resolve();
            });
            queuedRequest = this.requests.run(() => {
              if (file.isPaused) {
                socket.send("pause", {});
              }
              return () => {
              };
            });
          });
        }
        onReceiveUploadUrl(file, uploadURL) {
          const currentFile = this.uppy.getFile(file.id);
          if (!currentFile)
            return;
          if (!currentFile.tus || currentFile.tus.uploadUrl !== uploadURL) {
            this.uppy.log("[Tus] Storing upload url");
            this.uppy.setFileState(currentFile.id, {
              tus: {
                ...currentFile.tus,
                uploadUrl: uploadURL
              }
            });
          }
        }
        onFileRemove(fileID, cb) {
          this.uploaderEvents[fileID].on("file-removed", (file) => {
            if (fileID === file.id)
              cb(file.id);
          });
        }
        onPause(fileID, cb) {
          this.uploaderEvents[fileID].on("upload-pause", (targetFileID, isPaused) => {
            if (fileID === targetFileID) {
              cb(isPaused);
            }
          });
        }
        onRetry(fileID, cb) {
          this.uploaderEvents[fileID].on("upload-retry", (targetFileID) => {
            if (fileID === targetFileID) {
              cb();
            }
          });
        }
        onRetryAll(fileID, cb) {
          this.uploaderEvents[fileID].on("retry-all", () => {
            if (!this.uppy.getFile(fileID))
              return;
            cb();
          });
        }
        onPauseAll(fileID, cb) {
          this.uploaderEvents[fileID].on("pause-all", () => {
            if (!this.uppy.getFile(fileID))
              return;
            cb();
          });
        }
        onCancelAll(fileID, eventHandler) {
          var _this3 = this;
          this.uploaderEvents[fileID].on("cancel-all", function() {
            if (!_this3.uppy.getFile(fileID))
              return;
            eventHandler(...arguments);
          });
        }
        onResumeAll(fileID, cb) {
          this.uploaderEvents[fileID].on("resume-all", () => {
            if (!this.uppy.getFile(fileID))
              return;
            cb();
          });
        }
        uploadFiles(files) {
          const promises = files.map((file, i4) => {
            const current = i4 + 1;
            const total = files.length;
            if ("error" in file && file.error) {
              return Promise.reject(new Error(file.error));
            }
            if (file.isRemote) {
              if (!file.progress.uploadStarted || !file.isRestored) {
                this.uppy.emit("upload-started", file);
              }
              return this.uploadRemote(file, current, total);
            }
            if (!file.progress.uploadStarted || !file.isRestored) {
              this.uppy.emit("upload-started", file);
            }
            return this.upload(file, current, total);
          });
          return settle(promises);
        }
        handleUpload(fileIDs) {
          if (fileIDs.length === 0) {
            this.uppy.log("[Tus] No files to upload");
            return Promise.resolve();
          }
          if (this.opts.limit === 0) {
            this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning");
          }
          this.uppy.log("[Tus] Uploading...");
          const filesToUpload = fileIDs.map((fileID) => this.uppy.getFile(fileID));
          return this.uploadFiles(filesToUpload).then(() => null);
        }
        install() {
          this.uppy.setState({
            capabilities: {
              ...this.uppy.getState().capabilities,
              resumableUploads: true
            }
          });
          this.uppy.addUploader(this.handleUpload);
          this.uppy.on("reset-progress", this.handleResetProgress);
        }
        uninstall() {
          this.uppy.setState({
            capabilities: {
              ...this.uppy.getState().capabilities,
              resumableUploads: false
            }
          });
          this.uppy.removeUploader(this.handleUpload);
        }
      };
      Tus.VERSION = packageJson9.version;
    }
  });

  // ../node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "../node_modules/component-emitter/index.js"(exports, module) {
      if (typeof module !== "undefined") {
        module.exports = Emitter4;
      }
      function Emitter4(obj) {
        if (obj)
          return mixin2(obj);
      }
      function mixin2(obj) {
        for (var key in Emitter4.prototype) {
          obj[key] = Emitter4.prototype[key];
        }
        return obj;
      }
      Emitter4.prototype.on = Emitter4.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };
      Emitter4.prototype.once = function(event, fn) {
        function on2() {
          this.off(event, on2);
          fn.apply(this, arguments);
        }
        on2.fn = fn;
        this.on(event, on2);
        return this;
      };
      Emitter4.prototype.off = Emitter4.prototype.removeListener = Emitter4.prototype.removeAllListeners = Emitter4.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (0 == arguments.length) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks)
          return this;
        if (1 == arguments.length) {
          delete this._callbacks["$" + event];
          return this;
        }
        var cb;
        for (var i4 = 0; i4 < callbacks.length; i4++) {
          cb = callbacks[i4];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i4, 1);
            break;
          }
        }
        if (callbacks.length === 0) {
          delete this._callbacks["$" + event];
        }
        return this;
      };
      Emitter4.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
        for (var i4 = 1; i4 < arguments.length; i4++) {
          args[i4 - 1] = arguments[i4];
        }
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i4 = 0, len2 = callbacks.length; i4 < len2; ++i4) {
            callbacks[i4].apply(this, args);
          }
        }
        return this;
      };
      Emitter4.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };
      Emitter4.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
    }
  });

  // ../node_modules/engine.io-parser/build/esm/commons.js
  var PACKET_TYPES, PACKET_TYPES_REVERSE, ERROR_PACKET;
  var init_commons = __esm({
    "../node_modules/engine.io-parser/build/esm/commons.js"() {
      PACKET_TYPES = /* @__PURE__ */ Object.create(null);
      PACKET_TYPES["open"] = "0";
      PACKET_TYPES["close"] = "1";
      PACKET_TYPES["ping"] = "2";
      PACKET_TYPES["pong"] = "3";
      PACKET_TYPES["message"] = "4";
      PACKET_TYPES["upgrade"] = "5";
      PACKET_TYPES["noop"] = "6";
      PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
      Object.keys(PACKET_TYPES).forEach((key) => {
        PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
      });
      ERROR_PACKET = {
        type: "error",
        data: "parser error"
      };
    }
  });

  // ../node_modules/engine.io-parser/build/esm/encodePacket.browser.js
  var withNativeBlob, withNativeArrayBuffer, isView, encodePacket, encodeBlobAsBase64, encodePacket_browser_default;
  var init_encodePacket_browser = __esm({
    "../node_modules/engine.io-parser/build/esm/encodePacket.browser.js"() {
      init_commons();
      withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
      withNativeArrayBuffer = typeof ArrayBuffer === "function";
      isView = (obj) => {
        return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
      };
      encodePacket = (_ref, supportsBinary, callback) => {
        let {
          type,
          data
        } = _ref;
        if (withNativeBlob && data instanceof Blob) {
          if (supportsBinary) {
            return callback(data);
          } else {
            return encodeBlobAsBase64(data, callback);
          }
        } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
          if (supportsBinary) {
            return callback(data);
          } else {
            return encodeBlobAsBase64(new Blob([data]), callback);
          }
        }
        return callback(PACKET_TYPES[type] + (data || ""));
      };
      encodeBlobAsBase64 = (data, callback) => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
          const content = fileReader.result.split(",")[1];
          callback("b" + content);
        };
        return fileReader.readAsDataURL(data);
      };
      encodePacket_browser_default = encodePacket;
    }
  });

  // ../node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
  var chars, lookup, decode2;
  var init_base64_arraybuffer = __esm({
    "../node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js"() {
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
      for (let i4 = 0; i4 < chars.length; i4++) {
        lookup[chars.charCodeAt(i4)] = i4;
      }
      decode2 = (base64) => {
        let bufferLength = base64.length * 0.75, len2 = base64.length, i4, p3 = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === "=") {
          bufferLength--;
          if (base64[base64.length - 2] === "=") {
            bufferLength--;
          }
        }
        const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
        for (i4 = 0; i4 < len2; i4 += 4) {
          encoded1 = lookup[base64.charCodeAt(i4)];
          encoded2 = lookup[base64.charCodeAt(i4 + 1)];
          encoded3 = lookup[base64.charCodeAt(i4 + 2)];
          encoded4 = lookup[base64.charCodeAt(i4 + 3)];
          bytes[p3++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p3++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p3++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return arraybuffer;
      };
    }
  });

  // ../node_modules/engine.io-parser/build/esm/decodePacket.browser.js
  var withNativeArrayBuffer2, decodePacket, decodeBase64Packet, mapBinary, decodePacket_browser_default;
  var init_decodePacket_browser = __esm({
    "../node_modules/engine.io-parser/build/esm/decodePacket.browser.js"() {
      init_commons();
      init_base64_arraybuffer();
      withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
      decodePacket = (encodedPacket, binaryType) => {
        if (typeof encodedPacket !== "string") {
          return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
          };
        }
        const type = encodedPacket.charAt(0);
        if (type === "b") {
          return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
          };
        }
        const packetType = PACKET_TYPES_REVERSE[type];
        if (!packetType) {
          return ERROR_PACKET;
        }
        return encodedPacket.length > 1 ? {
          type: PACKET_TYPES_REVERSE[type],
          data: encodedPacket.substring(1)
        } : {
          type: PACKET_TYPES_REVERSE[type]
        };
      };
      decodeBase64Packet = (data, binaryType) => {
        if (withNativeArrayBuffer2) {
          const decoded = decode2(data);
          return mapBinary(decoded, binaryType);
        } else {
          return {
            base64: true,
            data
          };
        }
      };
      mapBinary = (data, binaryType) => {
        switch (binaryType) {
          case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
          case "arraybuffer":
          default:
            return data;
        }
      };
      decodePacket_browser_default = decodePacket;
    }
  });

  // ../node_modules/engine.io-parser/build/esm/index.js
  var SEPARATOR, encodePayload, decodePayload, protocol;
  var init_esm = __esm({
    "../node_modules/engine.io-parser/build/esm/index.js"() {
      init_encodePacket_browser();
      init_decodePacket_browser();
      SEPARATOR = String.fromCharCode(30);
      encodePayload = (packets, callback) => {
        const length2 = packets.length;
        const encodedPackets = new Array(length2);
        let count = 0;
        packets.forEach((packet, i4) => {
          encodePacket_browser_default(packet, false, (encodedPacket) => {
            encodedPackets[i4] = encodedPacket;
            if (++count === length2) {
              callback(encodedPackets.join(SEPARATOR));
            }
          });
        });
      };
      decodePayload = (encodedPayload, binaryType) => {
        const encodedPackets = encodedPayload.split(SEPARATOR);
        const packets = [];
        for (let i4 = 0; i4 < encodedPackets.length; i4++) {
          const decodedPacket = decodePacket_browser_default(encodedPackets[i4], binaryType);
          packets.push(decodedPacket);
          if (decodedPacket.type === "error") {
            break;
          }
        }
        return packets;
      };
      protocol = 4;
    }
  });

  // ../node_modules/@socket.io/component-emitter/index.mjs
  function Emitter(obj) {
    if (obj)
      return mixin(obj);
  }
  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }
  var init_component_emitter = __esm({
    "../node_modules/@socket.io/component-emitter/index.mjs"() {
      Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };
      Emitter.prototype.once = function(event, fn) {
        function on2() {
          this.off(event, on2);
          fn.apply(this, arguments);
        }
        on2.fn = fn;
        this.on(event, on2);
        return this;
      };
      Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (0 == arguments.length) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks)
          return this;
        if (1 == arguments.length) {
          delete this._callbacks["$" + event];
          return this;
        }
        var cb;
        for (var i4 = 0; i4 < callbacks.length; i4++) {
          cb = callbacks[i4];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i4, 1);
            break;
          }
        }
        if (callbacks.length === 0) {
          delete this._callbacks["$" + event];
        }
        return this;
      };
      Emitter.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
        for (var i4 = 1; i4 < arguments.length; i4++) {
          args[i4 - 1] = arguments[i4];
        }
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i4 = 0, len2 = callbacks.length; i4 < len2; ++i4) {
            callbacks[i4].apply(this, args);
          }
        }
        return this;
      };
      Emitter.prototype.emitReserved = Emitter.prototype.emit;
      Emitter.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };
      Emitter.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
    }
  });

  // ../node_modules/engine.io-client/build/esm/globalThis.browser.js
  var globalThisShim;
  var init_globalThis_browser = __esm({
    "../node_modules/engine.io-client/build/esm/globalThis.browser.js"() {
      globalThisShim = (() => {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else {
          return Function("return this")();
        }
      })();
    }
  });

  // ../node_modules/engine.io-client/build/esm/util.js
  function pick(obj) {
    for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      attr[_key - 1] = arguments[_key];
    }
    return attr.reduce((acc, k3) => {
      if (obj.hasOwnProperty(k3)) {
        acc[k3] = obj[k3];
      }
      return acc;
    }, {});
  }
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    } else {
      obj.setTimeoutFn = setTimeout.bind(globalThisShim);
      obj.clearTimeoutFn = clearTimeout.bind(globalThisShim);
    }
  }
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    }
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }
  function utf8Length(str) {
    let c3 = 0, length2 = 0;
    for (let i4 = 0, l3 = str.length; i4 < l3; i4++) {
      c3 = str.charCodeAt(i4);
      if (c3 < 128) {
        length2 += 1;
      } else if (c3 < 2048) {
        length2 += 2;
      } else if (c3 < 55296 || c3 >= 57344) {
        length2 += 3;
      } else {
        i4++;
        length2 += 4;
      }
    }
    return length2;
  }
  var NATIVE_SET_TIMEOUT, NATIVE_CLEAR_TIMEOUT, BASE64_OVERHEAD;
  var init_util = __esm({
    "../node_modules/engine.io-client/build/esm/util.js"() {
      init_globalThis_browser();
      NATIVE_SET_TIMEOUT = setTimeout;
      NATIVE_CLEAR_TIMEOUT = clearTimeout;
      BASE64_OVERHEAD = 1.33;
    }
  });

  // ../node_modules/engine.io-client/build/esm/transport.js
  var TransportError, Transport;
  var init_transport = __esm({
    "../node_modules/engine.io-client/build/esm/transport.js"() {
      init_esm();
      init_component_emitter();
      init_util();
      TransportError = class extends Error {
        constructor(reason, description, context) {
          super(reason);
          this.description = description;
          this.context = context;
          this.type = "TransportError";
        }
      };
      Transport = class extends Emitter {
        constructor(opts) {
          super();
          this.writable = false;
          installTimerFunctions(this, opts);
          this.opts = opts;
          this.query = opts.query;
          this.readyState = "";
          this.socket = opts.socket;
        }
        onError(reason, description, context) {
          super.emitReserved("error", new TransportError(reason, description, context));
          return this;
        }
        open() {
          if ("closed" === this.readyState || "" === this.readyState) {
            this.readyState = "opening";
            this.doOpen();
          }
          return this;
        }
        close() {
          if ("opening" === this.readyState || "open" === this.readyState) {
            this.doClose();
            this.onClose();
          }
          return this;
        }
        send(packets) {
          if ("open" === this.readyState) {
            this.write(packets);
          } else {
          }
        }
        onOpen() {
          this.readyState = "open";
          this.writable = true;
          super.emitReserved("open");
        }
        onData(data) {
          const packet = decodePacket_browser_default(data, this.socket.binaryType);
          this.onPacket(packet);
        }
        onPacket(packet) {
          super.emitReserved("packet", packet);
        }
        onClose(details) {
          this.readyState = "closed";
          super.emitReserved("close", details);
        }
      };
    }
  });

  // ../node_modules/engine.io-client/build/esm/contrib/yeast.js
  function encode2(num) {
    let encoded = "";
    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
  }
  function yeast() {
    const now = encode2(+new Date());
    if (now !== prev)
      return seed = 0, prev = now;
    return now + "." + encode2(seed++);
  }
  var alphabet, length, map, seed, i2, prev;
  var init_yeast = __esm({
    "../node_modules/engine.io-client/build/esm/contrib/yeast.js"() {
      "use strict";
      alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
      length = 64;
      map = {};
      seed = 0;
      i2 = 0;
      for (; i2 < length; i2++)
        map[alphabet[i2]] = i2;
    }
  });

  // ../node_modules/engine.io-client/build/esm/contrib/parseqs.js
  function encode3(obj) {
    let str = "";
    for (let i4 in obj) {
      if (obj.hasOwnProperty(i4)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i4) + "=" + encodeURIComponent(obj[i4]);
      }
    }
    return str;
  }
  function decode3(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for (let i4 = 0, l3 = pairs.length; i4 < l3; i4++) {
      let pair = pairs[i4].split("=");
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  }
  var init_parseqs = __esm({
    "../node_modules/engine.io-client/build/esm/contrib/parseqs.js"() {
    }
  });

  // ../node_modules/engine.io-client/build/esm/contrib/has-cors.js
  var value, hasCORS;
  var init_has_cors = __esm({
    "../node_modules/engine.io-client/build/esm/contrib/has-cors.js"() {
      value = false;
      try {
        value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
      } catch (err) {
      }
      hasCORS = value;
    }
  });

  // ../node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
  function XHR(opts) {
    const xdomain = opts.xdomain;
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e3) {
    }
    if (!xdomain) {
      try {
        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e3) {
      }
    }
  }
  var init_xmlhttprequest_browser = __esm({
    "../node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js"() {
      init_has_cors();
      init_globalThis_browser();
    }
  });

  // ../node_modules/engine.io-client/build/esm/transports/polling.js
  function empty() {
  }
  function unloadHandler() {
    for (let i4 in Request2.requests) {
      if (Request2.requests.hasOwnProperty(i4)) {
        Request2.requests[i4].abort();
      }
    }
  }
  var hasXHR2, Polling, Request2;
  var init_polling = __esm({
    "../node_modules/engine.io-client/build/esm/transports/polling.js"() {
      init_transport();
      init_yeast();
      init_parseqs();
      init_esm();
      init_xmlhttprequest_browser();
      init_component_emitter();
      init_util();
      init_globalThis_browser();
      hasXHR2 = function() {
        const xhr = new XHR({
          xdomain: false
        });
        return null != xhr.responseType;
      }();
      Polling = class extends Transport {
        constructor(opts) {
          super(opts);
          this.polling = false;
          if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            if (!port) {
              port = isSSL ? "443" : "80";
            }
            this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
            this.xs = opts.secure !== isSSL;
          }
          const forceBase64 = opts && opts.forceBase64;
          this.supportsBinary = hasXHR2 && !forceBase64;
        }
        get name() {
          return "polling";
        }
        doOpen() {
          this.poll();
        }
        pause(onPause) {
          this.readyState = "pausing";
          const pause = () => {
            this.readyState = "paused";
            onPause();
          };
          if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
              total++;
              this.once("pollComplete", function() {
                --total || pause();
              });
            }
            if (!this.writable) {
              total++;
              this.once("drain", function() {
                --total || pause();
              });
            }
          } else {
            pause();
          }
        }
        poll() {
          this.polling = true;
          this.doPoll();
          this.emitReserved("poll");
        }
        onData(data) {
          const callback = (packet) => {
            if ("opening" === this.readyState && packet.type === "open") {
              this.onOpen();
            }
            if ("close" === packet.type) {
              this.onClose({
                description: "transport closed by the server"
              });
              return false;
            }
            this.onPacket(packet);
          };
          decodePayload(data, this.socket.binaryType).forEach(callback);
          if ("closed" !== this.readyState) {
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
              this.poll();
            } else {
            }
          }
        }
        doClose() {
          const close = () => {
            this.write([{
              type: "close"
            }]);
          };
          if ("open" === this.readyState) {
            close();
          } else {
            this.once("open", close);
          }
        }
        write(packets) {
          this.writable = false;
          encodePayload(packets, (data) => {
            this.doWrite(data, () => {
              this.writable = true;
              this.emitReserved("drain");
            });
          });
        }
        uri() {
          let query = this.query || {};
          const schema = this.opts.secure ? "https" : "http";
          let port = "";
          if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast();
          }
          if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
          }
          if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
            port = ":" + this.opts.port;
          }
          const encodedQuery = encode3(query);
          const ipv6 = this.opts.hostname.indexOf(":") !== -1;
          return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
        }
        request(opts) {
          if (opts === void 0) {
            opts = {};
          }
          Object.assign(opts, {
            xd: this.xd,
            xs: this.xs
          }, this.opts);
          return new Request2(this.uri(), opts);
        }
        doWrite(data, fn) {
          const req = this.request({
            method: "POST",
            data
          });
          req.on("success", fn);
          req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
          });
        }
        doPoll() {
          const req = this.request();
          req.on("data", this.onData.bind(this));
          req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
          });
          this.pollXhr = req;
        }
      };
      Request2 = class extends Emitter {
        constructor(uri, opts) {
          super();
          installTimerFunctions(this, opts);
          this.opts = opts;
          this.method = opts.method || "GET";
          this.uri = uri;
          this.async = false !== opts.async;
          this.data = void 0 !== opts.data ? opts.data : null;
          this.create();
        }
        create() {
          const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
          opts.xdomain = !!this.opts.xd;
          opts.xscheme = !!this.opts.xs;
          const xhr = this.xhr = new XHR(opts);
          try {
            xhr.open(this.method, this.uri, this.async);
            try {
              if (this.opts.extraHeaders) {
                xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                for (let i4 in this.opts.extraHeaders) {
                  if (this.opts.extraHeaders.hasOwnProperty(i4)) {
                    xhr.setRequestHeader(i4, this.opts.extraHeaders[i4]);
                  }
                }
              }
            } catch (e3) {
            }
            if ("POST" === this.method) {
              try {
                xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              } catch (e3) {
              }
            }
            try {
              xhr.setRequestHeader("Accept", "*/*");
            } catch (e3) {
            }
            if ("withCredentials" in xhr) {
              xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
              xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
              if (4 !== xhr.readyState)
                return;
              if (200 === xhr.status || 1223 === xhr.status) {
                this.onLoad();
              } else {
                this.setTimeoutFn(() => {
                  this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                }, 0);
              }
            };
            xhr.send(this.data);
          } catch (e3) {
            this.setTimeoutFn(() => {
              this.onError(e3);
            }, 0);
            return;
          }
          if (typeof document !== "undefined") {
            this.index = Request2.requestsCount++;
            Request2.requests[this.index] = this;
          }
        }
        onError(err) {
          this.emitReserved("error", err, this.xhr);
          this.cleanup(true);
        }
        cleanup(fromError) {
          if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
          }
          this.xhr.onreadystatechange = empty;
          if (fromError) {
            try {
              this.xhr.abort();
            } catch (e3) {
            }
          }
          if (typeof document !== "undefined") {
            delete Request2.requests[this.index];
          }
          this.xhr = null;
        }
        onLoad() {
          const data = this.xhr.responseText;
          if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
          }
        }
        abort() {
          this.cleanup();
        }
      };
      Request2.requestsCount = 0;
      Request2.requests = {};
      if (typeof document !== "undefined") {
        if (typeof attachEvent === "function") {
          attachEvent("onunload", unloadHandler);
        } else if (typeof addEventListener === "function") {
          const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
          addEventListener(terminationEvent, unloadHandler, false);
        }
      }
    }
  });

  // ../node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js
  var nextTick, WebSocket2, usingBrowserWebSocket, defaultBinaryType;
  var init_websocket_constructor_browser = __esm({
    "../node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js"() {
      init_globalThis_browser();
      nextTick = (() => {
        const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
        if (isPromiseAvailable) {
          return (cb) => Promise.resolve().then(cb);
        } else {
          return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
        }
      })();
      WebSocket2 = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
      usingBrowserWebSocket = true;
      defaultBinaryType = "arraybuffer";
    }
  });

  // ../node_modules/engine.io-client/build/esm/transports/websocket.js
  var isReactNative4, WS;
  var init_websocket = __esm({
    "../node_modules/engine.io-client/build/esm/transports/websocket.js"() {
      init_transport();
      init_parseqs();
      init_yeast();
      init_util();
      init_websocket_constructor_browser();
      init_esm();
      isReactNative4 = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
      WS = class extends Transport {
        constructor(opts) {
          super(opts);
          this.supportsBinary = !opts.forceBase64;
        }
        get name() {
          return "websocket";
        }
        doOpen() {
          if (!this.check()) {
            return;
          }
          const uri = this.uri();
          const protocols = this.opts.protocols;
          const opts = isReactNative4 ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
          if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
          }
          try {
            this.ws = usingBrowserWebSocket && !isReactNative4 ? protocols ? new WebSocket2(uri, protocols) : new WebSocket2(uri) : new WebSocket2(uri, protocols, opts);
          } catch (err) {
            return this.emitReserved("error", err);
          }
          this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
          this.addEventListeners();
        }
        addEventListeners() {
          this.ws.onopen = () => {
            if (this.opts.autoUnref) {
              this.ws._socket.unref();
            }
            this.onOpen();
          };
          this.ws.onclose = (closeEvent) => this.onClose({
            description: "websocket connection closed",
            context: closeEvent
          });
          this.ws.onmessage = (ev) => this.onData(ev.data);
          this.ws.onerror = (e3) => this.onError("websocket error", e3);
        }
        write(packets) {
          this.writable = false;
          for (let i4 = 0; i4 < packets.length; i4++) {
            const packet = packets[i4];
            const lastPacket = i4 === packets.length - 1;
            encodePacket_browser_default(packet, this.supportsBinary, (data) => {
              const opts = {};
              if (!usingBrowserWebSocket) {
                if (packet.options) {
                  opts.compress = packet.options.compress;
                }
                if (this.opts.perMessageDeflate) {
                  const len2 = "string" === typeof data ? Buffer.byteLength(data) : data.length;
                  if (len2 < this.opts.perMessageDeflate.threshold) {
                    opts.compress = false;
                  }
                }
              }
              try {
                if (usingBrowserWebSocket) {
                  this.ws.send(data);
                } else {
                  this.ws.send(data, opts);
                }
              } catch (e3) {
              }
              if (lastPacket) {
                nextTick(() => {
                  this.writable = true;
                  this.emitReserved("drain");
                }, this.setTimeoutFn);
              }
            });
          }
        }
        doClose() {
          if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
          }
        }
        uri() {
          let query = this.query || {};
          const schema = this.opts.secure ? "wss" : "ws";
          let port = "";
          if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
            port = ":" + this.opts.port;
          }
          if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast();
          }
          if (!this.supportsBinary) {
            query.b64 = 1;
          }
          const encodedQuery = encode3(query);
          const ipv6 = this.opts.hostname.indexOf(":") !== -1;
          return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
        }
        check() {
          return !!WebSocket2;
        }
      };
    }
  });

  // ../node_modules/engine.io-client/build/esm/transports/index.js
  var transports;
  var init_transports = __esm({
    "../node_modules/engine.io-client/build/esm/transports/index.js"() {
      init_polling();
      init_websocket();
      transports = {
        websocket: WS,
        polling: Polling
      };
    }
  });

  // ../node_modules/engine.io-client/build/esm/contrib/parseuri.js
  function parse(str) {
    const src = str, b3 = str.indexOf("["), e3 = str.indexOf("]");
    if (b3 != -1 && e3 != -1) {
      str = str.substring(0, b3) + str.substring(b3, e3).replace(/:/g, ";") + str.substring(e3, str.length);
    }
    let m3 = re.exec(str || ""), uri = {}, i4 = 14;
    while (i4--) {
      uri[parts[i4]] = m3[i4] || "";
    }
    if (b3 != -1 && e3 != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
      uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
      uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri["path"]);
    uri.queryKey = queryKey(uri, uri["query"]);
    return uri;
  }
  function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.substr(0, 1) == "/" || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == "/") {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }
  var re, parts;
  var init_parseuri = __esm({
    "../node_modules/engine.io-client/build/esm/contrib/parseuri.js"() {
      re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    }
  });

  // ../node_modules/engine.io-client/build/esm/socket.js
  var Socket;
  var init_socket = __esm({
    "../node_modules/engine.io-client/build/esm/socket.js"() {
      init_transports();
      init_util();
      init_parseqs();
      init_parseuri();
      init_component_emitter();
      init_esm();
      Socket = class extends Emitter {
        constructor(uri, opts) {
          if (opts === void 0) {
            opts = {};
          }
          super();
          if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
          }
          if (uri) {
            uri = parse(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
              opts.query = uri.query;
          } else if (opts.host) {
            opts.hostname = parse(opts.host).host;
          }
          installTimerFunctions(this, opts);
          this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
          if (opts.hostname && !opts.port) {
            opts.port = this.secure ? "443" : "80";
          }
          this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
          this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
          this.transports = opts.transports || ["polling", "websocket"];
          this.readyState = "";
          this.writeBuffer = [];
          this.prevBufferLen = 0;
          this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
              threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
          }, opts);
          this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
          if (typeof this.opts.query === "string") {
            this.opts.query = decode3(this.opts.query);
          }
          this.id = null;
          this.upgrades = null;
          this.pingInterval = null;
          this.pingTimeout = null;
          this.pingTimeoutTimer = null;
          if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
              addEventListener("beforeunload", () => {
                if (this.transport) {
                  this.transport.removeAllListeners();
                  this.transport.close();
                }
              }, false);
            }
            if (this.hostname !== "localhost") {
              this.offlineEventListener = () => {
                this.onClose("transport close", {
                  description: "network connection lost"
                });
              };
              addEventListener("offline", this.offlineEventListener, false);
            }
          }
          this.open();
        }
        createTransport(name) {
          const query = Object.assign({}, this.opts.query);
          query.EIO = protocol;
          query.transport = name;
          if (this.id)
            query.sid = this.id;
          const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
          });
          return new transports[name](opts);
        }
        open() {
          let transport;
          if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
          } else if (0 === this.transports.length) {
            this.setTimeoutFn(() => {
              this.emitReserved("error", "No transports available");
            }, 0);
            return;
          } else {
            transport = this.transports[0];
          }
          this.readyState = "opening";
          try {
            transport = this.createTransport(transport);
          } catch (e3) {
            this.transports.shift();
            this.open();
            return;
          }
          transport.open();
          this.setTransport(transport);
        }
        setTransport(transport) {
          if (this.transport) {
            this.transport.removeAllListeners();
          }
          this.transport = transport;
          transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
        }
        probe(name) {
          let transport = this.createTransport(name);
          let failed = false;
          Socket.priorWebsocketSuccess = false;
          const onTransportOpen = () => {
            if (failed)
              return;
            transport.send([{
              type: "ping",
              data: "probe"
            }]);
            transport.once("packet", (msg) => {
              if (failed)
                return;
              if ("pong" === msg.type && "probe" === msg.data) {
                this.upgrading = true;
                this.emitReserved("upgrading", transport);
                if (!transport)
                  return;
                Socket.priorWebsocketSuccess = "websocket" === transport.name;
                this.transport.pause(() => {
                  if (failed)
                    return;
                  if ("closed" === this.readyState)
                    return;
                  cleanup();
                  this.setTransport(transport);
                  transport.send([{
                    type: "upgrade"
                  }]);
                  this.emitReserved("upgrade", transport);
                  transport = null;
                  this.upgrading = false;
                  this.flush();
                });
              } else {
                const err = new Error("probe error");
                err.transport = transport.name;
                this.emitReserved("upgradeError", err);
              }
            });
          };
          function freezeTransport() {
            if (failed)
              return;
            failed = true;
            cleanup();
            transport.close();
            transport = null;
          }
          const onerror = (err) => {
            const error = new Error("probe error: " + err);
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
          };
          function onTransportClose() {
            onerror("transport closed");
          }
          function onclose() {
            onerror("socket closed");
          }
          function onupgrade(to) {
            if (transport && to.name !== transport.name) {
              freezeTransport();
            }
          }
          const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
          };
          transport.once("open", onTransportOpen);
          transport.once("error", onerror);
          transport.once("close", onTransportClose);
          this.once("close", onclose);
          this.once("upgrading", onupgrade);
          transport.open();
        }
        onOpen() {
          this.readyState = "open";
          Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
          this.emitReserved("open");
          this.flush();
          if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
            let i4 = 0;
            const l3 = this.upgrades.length;
            for (; i4 < l3; i4++) {
              this.probe(this.upgrades[i4]);
            }
          }
        }
        onPacket(packet) {
          if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            this.emitReserved("heartbeat");
            switch (packet.type) {
              case "open":
                this.onHandshake(JSON.parse(packet.data));
                break;
              case "ping":
                this.resetPingTimeout();
                this.sendPacket("pong");
                this.emitReserved("ping");
                this.emitReserved("pong");
                break;
              case "error":
                const err = new Error("server error");
                err.code = packet.data;
                this.onError(err);
                break;
              case "message":
                this.emitReserved("data", packet.data);
                this.emitReserved("message", packet.data);
                break;
            }
          } else {
          }
        }
        onHandshake(data) {
          this.emitReserved("handshake", data);
          this.id = data.sid;
          this.transport.query.sid = data.sid;
          this.upgrades = this.filterUpgrades(data.upgrades);
          this.pingInterval = data.pingInterval;
          this.pingTimeout = data.pingTimeout;
          this.maxPayload = data.maxPayload;
          this.onOpen();
          if ("closed" === this.readyState)
            return;
          this.resetPingTimeout();
        }
        resetPingTimeout() {
          this.clearTimeoutFn(this.pingTimeoutTimer);
          this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
          }, this.pingInterval + this.pingTimeout);
          if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
          }
        }
        onDrain() {
          this.writeBuffer.splice(0, this.prevBufferLen);
          this.prevBufferLen = 0;
          if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
          } else {
            this.flush();
          }
        }
        flush() {
          if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            this.transport.send(packets);
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
          }
        }
        getWritablePackets() {
          const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
          if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
          }
          let payloadSize = 1;
          for (let i4 = 0; i4 < this.writeBuffer.length; i4++) {
            const data = this.writeBuffer[i4].data;
            if (data) {
              payloadSize += byteLength(data);
            }
            if (i4 > 0 && payloadSize > this.maxPayload) {
              return this.writeBuffer.slice(0, i4);
            }
            payloadSize += 2;
          }
          return this.writeBuffer;
        }
        write(msg, options, fn) {
          this.sendPacket("message", msg, options, fn);
          return this;
        }
        send(msg, options, fn) {
          this.sendPacket("message", msg, options, fn);
          return this;
        }
        sendPacket(type, data, options, fn) {
          if ("function" === typeof data) {
            fn = data;
            data = void 0;
          }
          if ("function" === typeof options) {
            fn = options;
            options = null;
          }
          if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
          }
          options = options || {};
          options.compress = false !== options.compress;
          const packet = {
            type,
            data,
            options
          };
          this.emitReserved("packetCreate", packet);
          this.writeBuffer.push(packet);
          if (fn)
            this.once("flush", fn);
          this.flush();
        }
        close() {
          const close = () => {
            this.onClose("forced close");
            this.transport.close();
          };
          const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
          };
          const waitForUpgrade = () => {
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
          };
          if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
              this.once("drain", () => {
                if (this.upgrading) {
                  waitForUpgrade();
                } else {
                  close();
                }
              });
            } else if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          }
          return this;
        }
        onError(err) {
          Socket.priorWebsocketSuccess = false;
          this.emitReserved("error", err);
          this.onClose("transport error", err);
        }
        onClose(reason, description) {
          if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            this.clearTimeoutFn(this.pingTimeoutTimer);
            this.transport.removeAllListeners("close");
            this.transport.close();
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
              removeEventListener("offline", this.offlineEventListener, false);
            }
            this.readyState = "closed";
            this.id = null;
            this.emitReserved("close", reason, description);
            this.writeBuffer = [];
            this.prevBufferLen = 0;
          }
        }
        filterUpgrades(upgrades) {
          const filteredUpgrades = [];
          let i4 = 0;
          const j3 = upgrades.length;
          for (; i4 < j3; i4++) {
            if (~this.transports.indexOf(upgrades[i4]))
              filteredUpgrades.push(upgrades[i4]);
          }
          return filteredUpgrades;
        }
      };
      Socket.protocol = protocol;
    }
  });

  // ../node_modules/engine.io-client/build/esm/index.js
  var protocol2;
  var init_esm2 = __esm({
    "../node_modules/engine.io-client/build/esm/index.js"() {
      init_socket();
      init_transport();
      init_transports();
      init_util();
      init_parseuri();
      protocol2 = Socket.protocol;
    }
  });

  // ../node_modules/socket.io-client/build/esm/url.js
  function url(uri, path, loc) {
    if (path === void 0) {
      path = "";
    }
    let obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri)
      uri = loc.protocol + "//" + loc.host;
    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      obj = parse(uri);
    }
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }
  var init_url = __esm({
    "../node_modules/socket.io-client/build/esm/url.js"() {
      init_esm2();
    }
  });

  // ../node_modules/socket.io-parser/build/esm/is-binary.js
  function isBinary(obj) {
    return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i4 = 0, l3 = obj.length; i4 < l3; i4++) {
        if (hasBinary(obj[i4])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }
  var withNativeArrayBuffer3, isView2, toString2, withNativeBlob2, withNativeFile;
  var init_is_binary = __esm({
    "../node_modules/socket.io-parser/build/esm/is-binary.js"() {
      withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
      isView2 = (obj) => {
        return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
      };
      toString2 = Object.prototype.toString;
      withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString2.call(Blob) === "[object BlobConstructor]";
      withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString2.call(File) === "[object FileConstructor]";
    }
  });

  // ../node_modules/socket.io-parser/build/esm/binary.js
  function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return {
      packet: pack,
      buffers
    };
  }
  function _deconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (isBinary(data)) {
      const placeholder = {
        _placeholder: true,
        num: buffers.length
      };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      const newData = new Array(data.length);
      for (let i4 = 0; i4 < data.length; i4++) {
        newData[i4] = _deconstructPacket(data[i4], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      const newData = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  }
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = void 0;
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (let i4 = 0; i4 < data.length; i4++) {
        data[i4] = _reconstructPacket(data[i4], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  }
  var init_binary = __esm({
    "../node_modules/socket.io-parser/build/esm/binary.js"() {
      init_is_binary();
    }
  });

  // ../node_modules/socket.io-parser/build/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    Decoder: () => Decoder,
    Encoder: () => Encoder,
    PacketType: () => PacketType,
    protocol: () => protocol3
  });
  var protocol3, PacketType, Encoder, Decoder, BinaryReconstructor;
  var init_esm3 = __esm({
    "../node_modules/socket.io-parser/build/esm/index.js"() {
      init_component_emitter();
      init_binary();
      init_is_binary();
      protocol3 = 5;
      (function(PacketType2) {
        PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
        PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
        PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
        PacketType2[PacketType2["ACK"] = 3] = "ACK";
        PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
        PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
        PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
      })(PacketType || (PacketType = {}));
      Encoder = class {
        constructor(replacer) {
          this.replacer = replacer;
        }
        encode(obj) {
          if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (hasBinary(obj)) {
              obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
              return this.encodeAsBinary(obj);
            }
          }
          return [this.encodeAsString(obj)];
        }
        encodeAsString(obj) {
          let str = "" + obj.type;
          if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
          }
          if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
          }
          if (null != obj.id) {
            str += obj.id;
          }
          if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
          }
          return str;
        }
        encodeAsBinary(obj) {
          const deconstruction = deconstructPacket(obj);
          const pack = this.encodeAsString(deconstruction.packet);
          const buffers = deconstruction.buffers;
          buffers.unshift(pack);
          return buffers;
        }
      };
      Decoder = class extends Emitter {
        constructor(reviver) {
          super();
          this.reviver = reviver;
        }
        add(obj) {
          let packet;
          if (typeof obj === "string") {
            if (this.reconstructor) {
              throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
              this.reconstructor = new BinaryReconstructor(packet);
              if (packet.attachments === 0) {
                super.emitReserved("decoded", packet);
              }
            } else {
              super.emitReserved("decoded", packet);
            }
          } else if (isBinary(obj) || obj.base64) {
            if (!this.reconstructor) {
              throw new Error("got binary data when not reconstructing a packet");
            } else {
              packet = this.reconstructor.takeBinaryData(obj);
              if (packet) {
                this.reconstructor = null;
                super.emitReserved("decoded", packet);
              }
            }
          } else {
            throw new Error("Unknown type: " + obj);
          }
        }
        decodeString(str) {
          let i4 = 0;
          const p3 = {
            type: Number(str.charAt(0))
          };
          if (PacketType[p3.type] === void 0) {
            throw new Error("unknown packet type " + p3.type);
          }
          if (p3.type === PacketType.BINARY_EVENT || p3.type === PacketType.BINARY_ACK) {
            const start = i4 + 1;
            while (str.charAt(++i4) !== "-" && i4 != str.length) {
            }
            const buf = str.substring(start, i4);
            if (buf != Number(buf) || str.charAt(i4) !== "-") {
              throw new Error("Illegal attachments");
            }
            p3.attachments = Number(buf);
          }
          if ("/" === str.charAt(i4 + 1)) {
            const start = i4 + 1;
            while (++i4) {
              const c3 = str.charAt(i4);
              if ("," === c3)
                break;
              if (i4 === str.length)
                break;
            }
            p3.nsp = str.substring(start, i4);
          } else {
            p3.nsp = "/";
          }
          const next = str.charAt(i4 + 1);
          if ("" !== next && Number(next) == next) {
            const start = i4 + 1;
            while (++i4) {
              const c3 = str.charAt(i4);
              if (null == c3 || Number(c3) != c3) {
                --i4;
                break;
              }
              if (i4 === str.length)
                break;
            }
            p3.id = Number(str.substring(start, i4 + 1));
          }
          if (str.charAt(++i4)) {
            const payload = this.tryParse(str.substr(i4));
            if (Decoder.isPayloadValid(p3.type, payload)) {
              p3.data = payload;
            } else {
              throw new Error("invalid payload");
            }
          }
          return p3;
        }
        tryParse(str) {
          try {
            return JSON.parse(str, this.reviver);
          } catch (e3) {
            return false;
          }
        }
        static isPayloadValid(type, payload) {
          switch (type) {
            case PacketType.CONNECT:
              return typeof payload === "object";
            case PacketType.DISCONNECT:
              return payload === void 0;
            case PacketType.CONNECT_ERROR:
              return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
              return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
              return Array.isArray(payload);
          }
        }
        destroy() {
          if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
          }
        }
      };
      BinaryReconstructor = class {
        constructor(packet) {
          this.packet = packet;
          this.buffers = [];
          this.reconPack = packet;
        }
        takeBinaryData(binData) {
          this.buffers.push(binData);
          if (this.buffers.length === this.reconPack.attachments) {
            const packet = reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
          }
          return null;
        }
        finishedReconstruction() {
          this.reconPack = null;
          this.buffers = [];
        }
      };
    }
  });

  // ../node_modules/socket.io-client/build/esm/on.js
  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }
  var init_on = __esm({
    "../node_modules/socket.io-client/build/esm/on.js"() {
    }
  });

  // ../node_modules/socket.io-client/build/esm/socket.js
  var RESERVED_EVENTS, Socket2;
  var init_socket2 = __esm({
    "../node_modules/socket.io-client/build/esm/socket.js"() {
      init_esm3();
      init_on();
      init_component_emitter();
      RESERVED_EVENTS = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        newListener: 1,
        removeListener: 1
      });
      Socket2 = class extends Emitter {
        constructor(io, nsp, opts) {
          super();
          this.connected = false;
          this.receiveBuffer = [];
          this.sendBuffer = [];
          this.ids = 0;
          this.acks = {};
          this.flags = {};
          this.io = io;
          this.nsp = nsp;
          if (opts && opts.auth) {
            this.auth = opts.auth;
          }
          if (this.io._autoConnect)
            this.open();
        }
        get disconnected() {
          return !this.connected;
        }
        subEvents() {
          if (this.subs)
            return;
          const io = this.io;
          this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
        }
        get active() {
          return !!this.subs;
        }
        connect() {
          if (this.connected)
            return this;
          this.subEvents();
          if (!this.io["_reconnecting"])
            this.io.open();
          if ("open" === this.io._readyState)
            this.onopen();
          return this;
        }
        open() {
          return this.connect();
        }
        send() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          args.unshift("message");
          this.emit.apply(this, args);
          return this;
        }
        emit(ev) {
          if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
          }
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          args.unshift(ev);
          const packet = {
            type: PacketType.EVENT,
            data: args
          };
          packet.options = {};
          packet.options.compress = this.flags.compress !== false;
          if ("function" === typeof args[args.length - 1]) {
            const id21 = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id21, ack);
            packet.id = id21;
          }
          const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
          const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
          if (discardPacket) {
          } else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
          } else {
            this.sendBuffer.push(packet);
          }
          this.flags = {};
          return this;
        }
        _registerAckCallback(id21, ack) {
          var _this = this;
          const timeout = this.flags.timeout;
          if (timeout === void 0) {
            this.acks[id21] = ack;
            return;
          }
          const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id21];
            for (let i4 = 0; i4 < this.sendBuffer.length; i4++) {
              if (this.sendBuffer[i4].id === id21) {
                this.sendBuffer.splice(i4, 1);
              }
            }
            ack.call(this, new Error("operation has timed out"));
          }, timeout);
          this.acks[id21] = function() {
            _this.io.clearTimeoutFn(timer);
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            ack.apply(_this, [null, ...args]);
          };
        }
        packet(packet) {
          packet.nsp = this.nsp;
          this.io._packet(packet);
        }
        onopen() {
          if (typeof this.auth == "function") {
            this.auth((data) => {
              this.packet({
                type: PacketType.CONNECT,
                data
              });
            });
          } else {
            this.packet({
              type: PacketType.CONNECT,
              data: this.auth
            });
          }
        }
        onerror(err) {
          if (!this.connected) {
            this.emitReserved("connect_error", err);
          }
        }
        onclose(reason, description) {
          this.connected = false;
          delete this.id;
          this.emitReserved("disconnect", reason, description);
        }
        onpacket(packet) {
          const sameNamespace = packet.nsp === this.nsp;
          if (!sameNamespace)
            return;
          switch (packet.type) {
            case PacketType.CONNECT:
              if (packet.data && packet.data.sid) {
                const id21 = packet.data.sid;
                this.onconnect(id21);
              } else {
                this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
              }
              break;
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
              this.onevent(packet);
              break;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
              this.onack(packet);
              break;
            case PacketType.DISCONNECT:
              this.ondisconnect();
              break;
            case PacketType.CONNECT_ERROR:
              this.destroy();
              const err = new Error(packet.data.message);
              err.data = packet.data.data;
              this.emitReserved("connect_error", err);
              break;
          }
        }
        onevent(packet) {
          const args = packet.data || [];
          if (null != packet.id) {
            args.push(this.ack(packet.id));
          }
          if (this.connected) {
            this.emitEvent(args);
          } else {
            this.receiveBuffer.push(Object.freeze(args));
          }
        }
        emitEvent(args) {
          if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
              listener.apply(this, args);
            }
          }
          super.emit.apply(this, args);
        }
        ack(id21) {
          const self2 = this;
          let sent = false;
          return function() {
            if (sent)
              return;
            sent = true;
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            self2.packet({
              type: PacketType.ACK,
              id: id21,
              data: args
            });
          };
        }
        onack(packet) {
          const ack = this.acks[packet.id];
          if ("function" === typeof ack) {
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
          } else {
          }
        }
        onconnect(id21) {
          this.id = id21;
          this.connected = true;
          this.emitBuffered();
          this.emitReserved("connect");
        }
        emitBuffered() {
          this.receiveBuffer.forEach((args) => this.emitEvent(args));
          this.receiveBuffer = [];
          this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
          });
          this.sendBuffer = [];
        }
        ondisconnect() {
          this.destroy();
          this.onclose("io server disconnect");
        }
        destroy() {
          if (this.subs) {
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = void 0;
          }
          this.io["_destroy"](this);
        }
        disconnect() {
          if (this.connected) {
            this.packet({
              type: PacketType.DISCONNECT
            });
          }
          this.destroy();
          if (this.connected) {
            this.onclose("io client disconnect");
          }
          return this;
        }
        close() {
          return this.disconnect();
        }
        compress(compress) {
          this.flags.compress = compress;
          return this;
        }
        get volatile() {
          this.flags.volatile = true;
          return this;
        }
        timeout(timeout) {
          this.flags.timeout = timeout;
          return this;
        }
        onAny(listener) {
          this._anyListeners = this._anyListeners || [];
          this._anyListeners.push(listener);
          return this;
        }
        prependAny(listener) {
          this._anyListeners = this._anyListeners || [];
          this._anyListeners.unshift(listener);
          return this;
        }
        offAny(listener) {
          if (!this._anyListeners) {
            return this;
          }
          if (listener) {
            const listeners = this._anyListeners;
            for (let i4 = 0; i4 < listeners.length; i4++) {
              if (listener === listeners[i4]) {
                listeners.splice(i4, 1);
                return this;
              }
            }
          } else {
            this._anyListeners = [];
          }
          return this;
        }
        listenersAny() {
          return this._anyListeners || [];
        }
        onAnyOutgoing(listener) {
          this._anyOutgoingListeners = this._anyOutgoingListeners || [];
          this._anyOutgoingListeners.push(listener);
          return this;
        }
        prependAnyOutgoing(listener) {
          this._anyOutgoingListeners = this._anyOutgoingListeners || [];
          this._anyOutgoingListeners.unshift(listener);
          return this;
        }
        offAnyOutgoing(listener) {
          if (!this._anyOutgoingListeners) {
            return this;
          }
          if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i4 = 0; i4 < listeners.length; i4++) {
              if (listener === listeners[i4]) {
                listeners.splice(i4, 1);
                return this;
              }
            }
          } else {
            this._anyOutgoingListeners = [];
          }
          return this;
        }
        listenersAnyOutgoing() {
          return this._anyOutgoingListeners || [];
        }
        notifyOutgoingListeners(packet) {
          if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
              listener.apply(this, packet.data);
            }
          }
        }
      };
    }
  });

  // ../node_modules/socket.io-client/build/esm/contrib/backo2.js
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 1e4;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  var init_backo2 = __esm({
    "../node_modules/socket.io-client/build/esm/contrib/backo2.js"() {
      Backoff.prototype.duration = function() {
        var ms = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var rand = Math.random();
          var deviation = Math.floor(rand * this.jitter * ms);
          ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
        }
        return Math.min(ms, this.max) | 0;
      };
      Backoff.prototype.reset = function() {
        this.attempts = 0;
      };
      Backoff.prototype.setMin = function(min) {
        this.ms = min;
      };
      Backoff.prototype.setMax = function(max) {
        this.max = max;
      };
      Backoff.prototype.setJitter = function(jitter) {
        this.jitter = jitter;
      };
    }
  });

  // ../node_modules/socket.io-client/build/esm/manager.js
  var Manager;
  var init_manager = __esm({
    "../node_modules/socket.io-client/build/esm/manager.js"() {
      init_esm2();
      init_socket2();
      init_esm3();
      init_on();
      init_backo2();
      init_component_emitter();
      Manager = class extends Emitter {
        constructor(uri, opts) {
          var _a;
          super();
          this.nsps = {};
          this.subs = [];
          if (uri && "object" === typeof uri) {
            opts = uri;
            uri = void 0;
          }
          opts = opts || {};
          opts.path = opts.path || "/socket.io";
          this.opts = opts;
          installTimerFunctions(this, opts);
          this.reconnection(opts.reconnection !== false);
          this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
          this.reconnectionDelay(opts.reconnectionDelay || 1e3);
          this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
          this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
          this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
          });
          this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
          this._readyState = "closed";
          this.uri = uri;
          const _parser = opts.parser || esm_exports;
          this.encoder = new _parser.Encoder();
          this.decoder = new _parser.Decoder();
          this._autoConnect = opts.autoConnect !== false;
          if (this._autoConnect)
            this.open();
        }
        reconnection(v3) {
          if (!arguments.length)
            return this._reconnection;
          this._reconnection = !!v3;
          return this;
        }
        reconnectionAttempts(v3) {
          if (v3 === void 0)
            return this._reconnectionAttempts;
          this._reconnectionAttempts = v3;
          return this;
        }
        reconnectionDelay(v3) {
          var _a;
          if (v3 === void 0)
            return this._reconnectionDelay;
          this._reconnectionDelay = v3;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v3);
          return this;
        }
        randomizationFactor(v3) {
          var _a;
          if (v3 === void 0)
            return this._randomizationFactor;
          this._randomizationFactor = v3;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v3);
          return this;
        }
        reconnectionDelayMax(v3) {
          var _a;
          if (v3 === void 0)
            return this._reconnectionDelayMax;
          this._reconnectionDelayMax = v3;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v3);
          return this;
        }
        timeout(v3) {
          if (!arguments.length)
            return this._timeout;
          this._timeout = v3;
          return this;
        }
        maybeReconnectOnOpen() {
          if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
            this.reconnect();
          }
        }
        open(fn) {
          if (~this._readyState.indexOf("open"))
            return this;
          this.engine = new Socket(this.uri, this.opts);
          const socket = this.engine;
          const self2 = this;
          this._readyState = "opening";
          this.skipReconnect = false;
          const openSubDestroy = on(socket, "open", function() {
            self2.onopen();
            fn && fn();
          });
          const errorSub = on(socket, "error", (err) => {
            self2.cleanup();
            self2._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
              fn(err);
            } else {
              self2.maybeReconnectOnOpen();
            }
          });
          if (false !== this._timeout) {
            const timeout = this._timeout;
            if (timeout === 0) {
              openSubDestroy();
            }
            const timer = this.setTimeoutFn(() => {
              openSubDestroy();
              socket.close();
              socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
              timer.unref();
            }
            this.subs.push(function subDestroy() {
              clearTimeout(timer);
            });
          }
          this.subs.push(openSubDestroy);
          this.subs.push(errorSub);
          return this;
        }
        connect(fn) {
          return this.open(fn);
        }
        onopen() {
          this.cleanup();
          this._readyState = "open";
          this.emitReserved("open");
          const socket = this.engine;
          this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
        }
        onping() {
          this.emitReserved("ping");
        }
        ondata(data) {
          this.decoder.add(data);
        }
        ondecoded(packet) {
          this.emitReserved("packet", packet);
        }
        onerror(err) {
          this.emitReserved("error", err);
        }
        socket(nsp, opts) {
          let socket = this.nsps[nsp];
          if (!socket) {
            socket = new Socket2(this, nsp, opts);
            this.nsps[nsp] = socket;
          }
          return socket;
        }
        _destroy(socket) {
          const nsps = Object.keys(this.nsps);
          for (const nsp of nsps) {
            const socket2 = this.nsps[nsp];
            if (socket2.active) {
              return;
            }
          }
          this._close();
        }
        _packet(packet) {
          const encodedPackets = this.encoder.encode(packet);
          for (let i4 = 0; i4 < encodedPackets.length; i4++) {
            this.engine.write(encodedPackets[i4], packet.options);
          }
        }
        cleanup() {
          this.subs.forEach((subDestroy) => subDestroy());
          this.subs.length = 0;
          this.decoder.destroy();
        }
        _close() {
          this.skipReconnect = true;
          this._reconnecting = false;
          this.onclose("forced close");
          if (this.engine)
            this.engine.close();
        }
        disconnect() {
          return this._close();
        }
        onclose(reason, description) {
          this.cleanup();
          this.backoff.reset();
          this._readyState = "closed";
          this.emitReserved("close", reason, description);
          if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
          }
        }
        reconnect() {
          if (this._reconnecting || this.skipReconnect)
            return this;
          const self2 = this;
          if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
          } else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
              if (self2.skipReconnect)
                return;
              this.emitReserved("reconnect_attempt", self2.backoff.attempts);
              if (self2.skipReconnect)
                return;
              self2.open((err) => {
                if (err) {
                  self2._reconnecting = false;
                  self2.reconnect();
                  this.emitReserved("reconnect_error", err);
                } else {
                  self2.onreconnect();
                }
              });
            }, delay);
            if (this.opts.autoUnref) {
              timer.unref();
            }
            this.subs.push(function subDestroy() {
              clearTimeout(timer);
            });
          }
        }
        onreconnect() {
          const attempt = this.backoff.attempts;
          this._reconnecting = false;
          this.backoff.reset();
          this.emitReserved("reconnect", attempt);
        }
      };
    }
  });

  // ../node_modules/socket.io-client/build/esm/index.js
  function lookup2(uri, opts) {
    if (typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id21 = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id21] && path in cache[id21]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id21]) {
        cache[id21] = new Manager(source, opts);
      }
      io = cache[id21];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
  }
  var cache;
  var init_esm4 = __esm({
    "../node_modules/socket.io-client/build/esm/index.js"() {
      init_url();
      init_manager();
      init_socket2();
      init_esm3();
      cache = {};
      Object.assign(lookup2, {
        Manager,
        Socket: Socket2,
        io: lookup2,
        connect: lookup2
      });
    }
  });

  // ../packages/@uppy/transloadit/lib/parseUrl.js
  function parseUrl(url2) {
    const scheme = /^\w+:\/\//.exec(url2);
    let i4 = 0;
    if (scheme) {
      i4 = scheme[0].length + 1;
    }
    const slashIndex = url2.indexOf("/", i4);
    if (slashIndex === -1) {
      return {
        origin: url2,
        pathname: "/"
      };
    }
    return {
      origin: url2.slice(0, slashIndex),
      pathname: url2.slice(slashIndex)
    };
  }
  var init_parseUrl = __esm({
    "../packages/@uppy/transloadit/lib/parseUrl.js"() {
    }
  });

  // ../packages/@uppy/transloadit/lib/Assembly.js
  function _classPrivateFieldLooseBase11(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey11(name) {
    return "__private_" + id11++ + "_" + name;
  }
  function isStatus(status, test) {
    return statusOrder.indexOf(status) >= statusOrder.indexOf(test);
  }
  function _onFinished2() {
    this.emit("finished");
    this.close();
  }
  function _connectSocket2() {
    const parsed = parseUrl(this.status.websocket_url);
    const socket = lookup2(parsed.origin, {
      transports: ["websocket"],
      path: parsed.pathname
    });
    socket.on("connect", () => {
      socket.emit("assembly_connect", {
        id: this.status.assembly_id
      });
      this.emit("connect");
    });
    socket.on("connect_error", () => {
      socket.disconnect();
      this.socket = null;
    });
    socket.on("assembly_finished", () => {
      _classPrivateFieldLooseBase11(this, _onFinished)[_onFinished]();
    });
    socket.on("assembly_upload_finished", (file) => {
      this.emit("upload", file);
      this.status.uploads.push(file);
    });
    socket.on("assembly_uploading_finished", () => {
      this.emit("executing");
    });
    socket.on("assembly_upload_meta_data_extracted", () => {
      this.emit("metadata");
      _classPrivateFieldLooseBase11(this, _fetchStatus)[_fetchStatus]({
        diff: false
      });
    });
    socket.on("assembly_result_finished", (stepName, result2) => {
      this.emit("result", stepName, result2);
      if (!this.status.results[stepName]) {
        this.status.results[stepName] = [];
      }
      this.status.results[stepName].push(result2);
    });
    socket.on("assembly_error", (err) => {
      _classPrivateFieldLooseBase11(this, _onError)[_onError](err);
      _classPrivateFieldLooseBase11(this, _fetchStatus)[_fetchStatus]({
        diff: false
      });
    });
    this.socket = socket;
  }
  function _onError2(err) {
    this.emit("error", Object.assign(new Error(err.message), err));
    this.close();
  }
  function _beginPolling2() {
    this.pollInterval = setInterval(() => {
      if (!this.socket || !this.socket.connected) {
        _classPrivateFieldLooseBase11(this, _fetchStatus)[_fetchStatus]();
      }
    }, 2e3);
  }
  async function _fetchStatus2(_temp) {
    let {
      diff = true
    } = _temp === void 0 ? {} : _temp;
    if (this.closed || _classPrivateFieldLooseBase11(this, _rateLimitedQueue)[_rateLimitedQueue].isPaused || _classPrivateFieldLooseBase11(this, _previousFetchStatusStillPending)[_previousFetchStatusStillPending])
      return;
    try {
      _classPrivateFieldLooseBase11(this, _previousFetchStatusStillPending)[_previousFetchStatusStillPending] = true;
      const response = await _classPrivateFieldLooseBase11(this, _fetchWithNetworkError)[_fetchWithNetworkError](this.status.assembly_ssl_url);
      _classPrivateFieldLooseBase11(this, _previousFetchStatusStillPending)[_previousFetchStatusStillPending] = false;
      if (this.closed)
        return;
      if (response.status === 429) {
        _classPrivateFieldLooseBase11(this, _rateLimitedQueue)[_rateLimitedQueue].rateLimit(2e3);
        return;
      }
      if (!response.ok) {
        _classPrivateFieldLooseBase11(this, _onError)[_onError](new NetworkError_default(response.statusText));
        return;
      }
      const status = await response.json();
      if (this.closed)
        return;
      this.emit("status", status);
      if (diff) {
        this.updateStatus(status);
      } else {
        this.status = status;
      }
    } catch (err) {
      _classPrivateFieldLooseBase11(this, _onError)[_onError](err);
    }
  }
  function _diffStatus2(prev2, next) {
    const prevStatus = prev2.ok;
    const nextStatus = next.ok;
    if (next.error && !prev2.error) {
      return _classPrivateFieldLooseBase11(this, _onError)[_onError](next);
    }
    const nowExecuting = isStatus(nextStatus, ASSEMBLY_EXECUTING) && !isStatus(prevStatus, ASSEMBLY_EXECUTING);
    if (nowExecuting) {
      this.emit("executing");
    }
    Object.keys(next.uploads).filter((upload) => !has(prev2.uploads, upload)).forEach((upload) => {
      this.emit("upload", next.uploads[upload]);
    });
    if (nowExecuting) {
      this.emit("metadata");
    }
    Object.keys(next.results).forEach((stepName) => {
      const nextResults = next.results[stepName];
      const prevResults = prev2.results[stepName];
      nextResults.filter((n2) => !prevResults || !prevResults.some((p3) => p3.id === n2.id)).forEach((result2) => {
        this.emit("result", stepName, result2);
      });
    });
    if (isStatus(nextStatus, ASSEMBLY_COMPLETED) && !isStatus(prevStatus, ASSEMBLY_COMPLETED)) {
      this.emit("finished");
    }
    return void 0;
  }
  var import_component_emitter7, id11, ASSEMBLY_UPLOADING, ASSEMBLY_EXECUTING, ASSEMBLY_COMPLETED, statusOrder, _rateLimitedQueue, _fetchWithNetworkError, _previousFetchStatusStillPending, _onFinished, _connectSocket, _onError, _beginPolling, _fetchStatus, _diffStatus, TransloaditAssembly, Assembly_default;
  var init_Assembly = __esm({
    "../packages/@uppy/transloadit/lib/Assembly.js"() {
      import_component_emitter7 = __toESM(require_component_emitter(), 1);
      init_esm4();
      init_hasProperty();
      init_NetworkError();
      init_fetchWithNetworkError();
      init_parseUrl();
      id11 = 0;
      ASSEMBLY_UPLOADING = "ASSEMBLY_UPLOADING";
      ASSEMBLY_EXECUTING = "ASSEMBLY_EXECUTING";
      ASSEMBLY_COMPLETED = "ASSEMBLY_COMPLETED";
      statusOrder = [ASSEMBLY_UPLOADING, ASSEMBLY_EXECUTING, ASSEMBLY_COMPLETED];
      _rateLimitedQueue = /* @__PURE__ */ _classPrivateFieldLooseKey11("rateLimitedQueue");
      _fetchWithNetworkError = /* @__PURE__ */ _classPrivateFieldLooseKey11("fetchWithNetworkError");
      _previousFetchStatusStillPending = /* @__PURE__ */ _classPrivateFieldLooseKey11("previousFetchStatusStillPending");
      _onFinished = /* @__PURE__ */ _classPrivateFieldLooseKey11("onFinished");
      _connectSocket = /* @__PURE__ */ _classPrivateFieldLooseKey11("connectSocket");
      _onError = /* @__PURE__ */ _classPrivateFieldLooseKey11("onError");
      _beginPolling = /* @__PURE__ */ _classPrivateFieldLooseKey11("beginPolling");
      _fetchStatus = /* @__PURE__ */ _classPrivateFieldLooseKey11("fetchStatus");
      _diffStatus = /* @__PURE__ */ _classPrivateFieldLooseKey11("diffStatus");
      TransloaditAssembly = class extends import_component_emitter7.default {
        constructor(assembly, rateLimitedQueue) {
          super();
          Object.defineProperty(this, _diffStatus, {
            value: _diffStatus2
          });
          Object.defineProperty(this, _fetchStatus, {
            value: _fetchStatus2
          });
          Object.defineProperty(this, _beginPolling, {
            value: _beginPolling2
          });
          Object.defineProperty(this, _onError, {
            value: _onError2
          });
          Object.defineProperty(this, _connectSocket, {
            value: _connectSocket2
          });
          Object.defineProperty(this, _onFinished, {
            value: _onFinished2
          });
          Object.defineProperty(this, _rateLimitedQueue, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _fetchWithNetworkError, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _previousFetchStatusStillPending, {
            writable: true,
            value: false
          });
          this.status = assembly;
          this.socket = null;
          this.pollInterval = null;
          this.closed = false;
          _classPrivateFieldLooseBase11(this, _rateLimitedQueue)[_rateLimitedQueue] = rateLimitedQueue;
          _classPrivateFieldLooseBase11(this, _fetchWithNetworkError)[_fetchWithNetworkError] = rateLimitedQueue.wrapPromiseFunction(fetchWithNetworkError);
        }
        connect() {
          _classPrivateFieldLooseBase11(this, _connectSocket)[_connectSocket]();
          _classPrivateFieldLooseBase11(this, _beginPolling)[_beginPolling]();
        }
        update() {
          return _classPrivateFieldLooseBase11(this, _fetchStatus)[_fetchStatus]({
            diff: true
          });
        }
        updateStatus(next) {
          _classPrivateFieldLooseBase11(this, _diffStatus)[_diffStatus](this.status, next);
          this.status = next;
        }
        close() {
          this.closed = true;
          if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
          }
          clearInterval(this.pollInterval);
          this.pollInterval = null;
        }
      };
      Assembly_default = TransloaditAssembly;
    }
  });

  // ../packages/@uppy/transloadit/lib/Client.js
  function _classPrivateFieldLooseBase12(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey12(name) {
    return "__private_" + id12++ + "_" + name;
  }
  function _fetchJSON2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _classPrivateFieldLooseBase12(this, _fetchWithNetworkError2)[_fetchWithNetworkError2](...args).then((response) => {
      if (response.status === 429) {
        this.opts.rateLimitedQueue.rateLimit(2e3);
        return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON](...args);
      }
      if (!response.ok) {
        const serverError = new Error(response.statusText);
        serverError.statusCode = response.status;
        if (!`${args[0]}`.endsWith(ASSEMBLIES_ENDPOINT))
          return Promise.reject(serverError);
        return response.json().then((assembly) => {
          if (!assembly.error)
            throw serverError;
          const error = new Error(assembly.error);
          error.details = assembly.message;
          error.assembly = assembly;
          if (assembly.assembly_id) {
            error.details += ` Assembly ID: ${assembly.assembly_id}`;
          }
          throw error;
        }, (err) => {
          err.cause = serverError;
          throw err;
        });
      }
      return response.json();
    });
  }
  var id12, ASSEMBLIES_ENDPOINT, _headers, _fetchWithNetworkError2, _fetchJSON, _reportError, Client;
  var init_Client = __esm({
    "../packages/@uppy/transloadit/lib/Client.js"() {
      init_fetchWithNetworkError();
      id12 = 0;
      ASSEMBLIES_ENDPOINT = "/assemblies";
      _headers = /* @__PURE__ */ _classPrivateFieldLooseKey12("headers");
      _fetchWithNetworkError2 = /* @__PURE__ */ _classPrivateFieldLooseKey12("fetchWithNetworkError");
      _fetchJSON = /* @__PURE__ */ _classPrivateFieldLooseKey12("fetchJSON");
      _reportError = /* @__PURE__ */ _classPrivateFieldLooseKey12("reportError");
      Client = class {
        constructor(_opts) {
          if (_opts === void 0) {
            _opts = {};
          }
          Object.defineProperty(this, _fetchJSON, {
            value: _fetchJSON2
          });
          Object.defineProperty(this, _headers, {
            writable: true,
            value: {}
          });
          Object.defineProperty(this, _fetchWithNetworkError2, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _reportError, {
            writable: true,
            value: (err, params) => {
              if (this.opts.errorReporting === false) {
                throw err;
              }
              const opts = {
                type: params.type
              };
              if (params.assembly) {
                opts.assembly = params.assembly.assembly_id;
                opts.instance = params.assembly.instance;
              }
              if (params.url) {
                opts.endpoint = params.url;
              }
              this.submitError(err, opts).catch(() => {
              });
              throw err;
            }
          });
          this.opts = _opts;
          if (this.opts.client != null) {
            _classPrivateFieldLooseBase12(this, _headers)[_headers]["Transloadit-Client"] = this.opts.client;
          }
          _classPrivateFieldLooseBase12(this, _fetchWithNetworkError2)[_fetchWithNetworkError2] = this.opts.rateLimitedQueue.wrapPromiseFunction(fetchWithNetworkError);
        }
        createAssembly(_ref) {
          let {
            params,
            fields,
            signature,
            expectedFiles
          } = _ref;
          const data = new FormData();
          data.append("params", typeof params === "string" ? params : JSON.stringify(params));
          if (signature) {
            data.append("signature", signature);
          }
          Object.keys(fields).forEach((key) => {
            data.append(key, fields[key]);
          });
          data.append("num_expected_upload_files", expectedFiles);
          const url2 = new URL(ASSEMBLIES_ENDPOINT, `${this.opts.service}`).href;
          return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON](url2, {
            method: "post",
            headers: _classPrivateFieldLooseBase12(this, _headers)[_headers],
            body: data
          }).catch((err) => _classPrivateFieldLooseBase12(this, _reportError)[_reportError](err, {
            url: url2,
            type: "API_ERROR"
          }));
        }
        reserveFile(assembly, file) {
          const size = encodeURIComponent(file.size);
          const url2 = `${assembly.assembly_ssl_url}/reserve_file?size=${size}`;
          return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON](url2, {
            method: "post",
            headers: _classPrivateFieldLooseBase12(this, _headers)[_headers]
          }).catch((err) => _classPrivateFieldLooseBase12(this, _reportError)[_reportError](err, {
            assembly,
            file,
            url: url2,
            type: "API_ERROR"
          }));
        }
        addFile(assembly, file) {
          if (!file.uploadURL) {
            return Promise.reject(new Error("File does not have an `uploadURL`."));
          }
          const size = encodeURIComponent(file.size);
          const uploadUrl = encodeURIComponent(file.uploadURL);
          const filename = encodeURIComponent(file.name);
          const fieldname = "file";
          const qs = `size=${size}&filename=${filename}&fieldname=${fieldname}&s3Url=${uploadUrl}`;
          const url2 = `${assembly.assembly_ssl_url}/add_file?${qs}`;
          return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON](url2, {
            method: "post",
            headers: _classPrivateFieldLooseBase12(this, _headers)[_headers]
          }).catch((err) => _classPrivateFieldLooseBase12(this, _reportError)[_reportError](err, {
            assembly,
            file,
            url: url2,
            type: "API_ERROR"
          }));
        }
        updateNumberOfFilesInAssembly(assembly, num_expected_upload_files) {
          const url2 = new URL(assembly.assembly_ssl_url);
          url2.pathname = "/update_assemblies";
          const body = JSON.stringify({
            assembly_updates: [{
              assembly_id: assembly.assembly_id,
              num_expected_upload_files
            }]
          });
          return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON](url2, {
            method: "post",
            headers: _classPrivateFieldLooseBase12(this, _headers)[_headers],
            body
          }).catch((err) => _classPrivateFieldLooseBase12(this, _reportError)[_reportError](err, {
            url: url2,
            type: "API_ERROR"
          }));
        }
        cancelAssembly(assembly) {
          const url2 = assembly.assembly_ssl_url;
          return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON](url2, {
            method: "delete",
            headers: _classPrivateFieldLooseBase12(this, _headers)[_headers]
          }).catch((err) => _classPrivateFieldLooseBase12(this, _reportError)[_reportError](err, {
            url: url2,
            type: "API_ERROR"
          }));
        }
        getAssemblyStatus(url2) {
          return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON](url2, {
            headers: _classPrivateFieldLooseBase12(this, _headers)[_headers]
          }).catch((err) => _classPrivateFieldLooseBase12(this, _reportError)[_reportError](err, {
            url: url2,
            type: "STATUS_ERROR"
          }));
        }
        submitError(err, _temp) {
          let {
            endpoint,
            instance,
            assembly
          } = _temp === void 0 ? {} : _temp;
          const message = err.details ? `${err.message} (${err.details})` : err.message;
          return _classPrivateFieldLooseBase12(this, _fetchJSON)[_fetchJSON]("https://transloaditstatus.com/client_error", {
            method: "post",
            body: JSON.stringify({
              endpoint,
              instance,
              assembly_id: assembly,
              agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
              client: this.opts.client,
              error: message
            })
          });
        }
      };
    }
  });

  // ../packages/@uppy/transloadit/lib/AssemblyOptions.js
  function _classPrivateFieldLooseBase13(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey13(name) {
    return "__private_" + id13++ + "_" + name;
  }
  function validateParams(params) {
    if (params == null) {
      throw new Error("Transloadit: The `params` option is required.");
    }
    if (typeof params === "string") {
      try {
        params = JSON.parse(params);
      } catch (err) {
        throw new ErrorWithCause_default("Transloadit: The `params` option is a malformed JSON string.", {
          cause: err
        });
      }
    }
    if (!params.auth || !params.auth.key) {
      throw new Error("Transloadit: The `params.auth.key` option is required. You can find your Transloadit API key at https://transloadit.com/c/template-credentials");
    }
  }
  function dedupe(list) {
    const dedupeMap = /* @__PURE__ */ Object.create(null);
    for (const {
      fileIDs,
      options
    } of list.filter(Boolean)) {
      const id21 = JSON.stringify(options);
      if (id21 in dedupeMap) {
        dedupeMap[id21].fileIDArrays.push(fileIDs);
      } else {
        dedupeMap[id21] = {
          options,
          fileIDArrays: [fileIDs]
        };
      }
    }
    return Object.values(dedupeMap).map((_ref) => {
      let {
        options,
        fileIDArrays
      } = _ref;
      return {
        options,
        fileIDs: fileIDArrays.flat(1)
      };
    });
  }
  async function _getAssemblyOptions2(file) {
    if (file == null)
      return void 0;
    const options = this.opts;
    const assemblyOptions = await options.getAssemblyOptions(file, options);
    if (file == null)
      return void 0;
    if (Array.isArray(assemblyOptions.fields)) {
      assemblyOptions.fields = Object.fromEntries(assemblyOptions.fields.map((fieldName) => [fieldName, file.meta[fieldName]]));
    } else if (assemblyOptions.fields == null) {
      assemblyOptions.fields = {};
    }
    validateParams(assemblyOptions.params);
    return {
      fileIDs: [file.id],
      options: assemblyOptions
    };
  }
  var id13, _getAssemblyOptions, AssemblyOptions, AssemblyOptions_default;
  var init_AssemblyOptions = __esm({
    "../packages/@uppy/transloadit/lib/AssemblyOptions.js"() {
      init_ErrorWithCause();
      id13 = 0;
      _getAssemblyOptions = /* @__PURE__ */ _classPrivateFieldLooseKey13("getAssemblyOptions");
      AssemblyOptions = class {
        constructor(files, opts) {
          Object.defineProperty(this, _getAssemblyOptions, {
            value: _getAssemblyOptions2
          });
          this.files = files;
          this.opts = opts;
        }
        async build() {
          const options = this.opts;
          if (this.files.length > 0) {
            return Promise.all(this.files.map((file) => _classPrivateFieldLooseBase13(this, _getAssemblyOptions)[_getAssemblyOptions](file))).then(dedupe);
          }
          if (options.alwaysRunAssembly) {
            const assemblyOptions = await options.getAssemblyOptions(null, options);
            validateParams(assemblyOptions.params);
            return [{
              fileIDs: this.files.map((file) => file.id),
              options: assemblyOptions
            }];
          }
          return [];
        }
      };
      AssemblyOptions_default = AssemblyOptions;
    }
  });

  // ../packages/@uppy/transloadit/lib/AssemblyWatcher.js
  function _classPrivateFieldLooseBase14(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey14(name) {
    return "__private_" + id14++ + "_" + name;
  }
  function _watching2(id21) {
    return _classPrivateFieldLooseBase14(this, _assemblyIDs)[_assemblyIDs].indexOf(id21) !== -1;
  }
  function _checkAllComplete2() {
    _classPrivateFieldLooseBase14(this, _remaining)[_remaining] -= 1;
    if (_classPrivateFieldLooseBase14(this, _remaining)[_remaining] === 0) {
      _classPrivateFieldLooseBase14(this, _removeListeners)[_removeListeners]();
      _classPrivateFieldLooseBase14(this, _resolve)[_resolve]();
    }
  }
  function _removeListeners2() {
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].off("transloadit:complete", _classPrivateFieldLooseBase14(this, _onAssemblyComplete)[_onAssemblyComplete]);
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].off("transloadit:assembly-cancel", _classPrivateFieldLooseBase14(this, _onAssemblyCancel)[_onAssemblyCancel]);
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].off("transloadit:assembly-error", _classPrivateFieldLooseBase14(this, _onAssemblyError)[_onAssemblyError]);
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].off("transloadit:import-error", _classPrivateFieldLooseBase14(this, _onImportError)[_onImportError]);
  }
  function _addListeners22() {
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].on("transloadit:complete", _classPrivateFieldLooseBase14(this, _onAssemblyComplete)[_onAssemblyComplete]);
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].on("transloadit:assembly-cancel", _classPrivateFieldLooseBase14(this, _onAssemblyCancel)[_onAssemblyCancel]);
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].on("transloadit:assembly-error", _classPrivateFieldLooseBase14(this, _onAssemblyError)[_onAssemblyError]);
    _classPrivateFieldLooseBase14(this, _uppy)[_uppy].on("transloadit:import-error", _classPrivateFieldLooseBase14(this, _onImportError)[_onImportError]);
  }
  var import_component_emitter8, id14, _assemblyIDs, _reject, _remaining, _resolve, _uppy, _watching, _onAssemblyComplete, _onAssemblyCancel, _onAssemblyError, _onImportError, _checkAllComplete, _removeListeners, _addListeners3, TransloaditAssemblyWatcher, AssemblyWatcher_default;
  var init_AssemblyWatcher = __esm({
    "../packages/@uppy/transloadit/lib/AssemblyWatcher.js"() {
      import_component_emitter8 = __toESM(require_component_emitter(), 1);
      id14 = 0;
      _assemblyIDs = /* @__PURE__ */ _classPrivateFieldLooseKey14("assemblyIDs");
      _reject = /* @__PURE__ */ _classPrivateFieldLooseKey14("reject");
      _remaining = /* @__PURE__ */ _classPrivateFieldLooseKey14("remaining");
      _resolve = /* @__PURE__ */ _classPrivateFieldLooseKey14("resolve");
      _uppy = /* @__PURE__ */ _classPrivateFieldLooseKey14("uppy");
      _watching = /* @__PURE__ */ _classPrivateFieldLooseKey14("watching");
      _onAssemblyComplete = /* @__PURE__ */ _classPrivateFieldLooseKey14("onAssemblyComplete");
      _onAssemblyCancel = /* @__PURE__ */ _classPrivateFieldLooseKey14("onAssemblyCancel");
      _onAssemblyError = /* @__PURE__ */ _classPrivateFieldLooseKey14("onAssemblyError");
      _onImportError = /* @__PURE__ */ _classPrivateFieldLooseKey14("onImportError");
      _checkAllComplete = /* @__PURE__ */ _classPrivateFieldLooseKey14("checkAllComplete");
      _removeListeners = /* @__PURE__ */ _classPrivateFieldLooseKey14("removeListeners");
      _addListeners3 = /* @__PURE__ */ _classPrivateFieldLooseKey14("addListeners");
      TransloaditAssemblyWatcher = class extends import_component_emitter8.default {
        constructor(uppy, assemblyIDs) {
          super();
          Object.defineProperty(this, _addListeners3, {
            value: _addListeners22
          });
          Object.defineProperty(this, _removeListeners, {
            value: _removeListeners2
          });
          Object.defineProperty(this, _checkAllComplete, {
            value: _checkAllComplete2
          });
          Object.defineProperty(this, _watching, {
            value: _watching2
          });
          Object.defineProperty(this, _assemblyIDs, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _reject, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _remaining, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _resolve, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _uppy, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _onAssemblyComplete, {
            writable: true,
            value: (assembly) => {
              if (!_classPrivateFieldLooseBase14(this, _watching)[_watching](assembly.assembly_id)) {
                return;
              }
              _classPrivateFieldLooseBase14(this, _uppy)[_uppy].log(`[Transloadit] AssemblyWatcher: Got Assembly finish ${assembly.assembly_id}`);
              this.emit("assembly-complete", assembly.assembly_id);
              _classPrivateFieldLooseBase14(this, _checkAllComplete)[_checkAllComplete]();
            }
          });
          Object.defineProperty(this, _onAssemblyCancel, {
            writable: true,
            value: (assembly) => {
              if (!_classPrivateFieldLooseBase14(this, _watching)[_watching](assembly.assembly_id)) {
                return;
              }
              _classPrivateFieldLooseBase14(this, _checkAllComplete)[_checkAllComplete]();
            }
          });
          Object.defineProperty(this, _onAssemblyError, {
            writable: true,
            value: (assembly, error) => {
              if (!_classPrivateFieldLooseBase14(this, _watching)[_watching](assembly.assembly_id)) {
                return;
              }
              _classPrivateFieldLooseBase14(this, _uppy)[_uppy].log(`[Transloadit] AssemblyWatcher: Got Assembly error ${assembly.assembly_id}`);
              _classPrivateFieldLooseBase14(this, _uppy)[_uppy].log(error);
              this.emit("assembly-error", assembly.assembly_id, error);
              _classPrivateFieldLooseBase14(this, _checkAllComplete)[_checkAllComplete]();
            }
          });
          Object.defineProperty(this, _onImportError, {
            writable: true,
            value: (assembly, fileID, error) => {
              if (!_classPrivateFieldLooseBase14(this, _watching)[_watching](assembly.assembly_id)) {
                return;
              }
              _classPrivateFieldLooseBase14(this, _onAssemblyError)[_onAssemblyError](assembly, error);
            }
          });
          _classPrivateFieldLooseBase14(this, _uppy)[_uppy] = uppy;
          _classPrivateFieldLooseBase14(this, _assemblyIDs)[_assemblyIDs] = assemblyIDs;
          _classPrivateFieldLooseBase14(this, _remaining)[_remaining] = assemblyIDs.length;
          this.promise = new Promise((resolve, reject) => {
            _classPrivateFieldLooseBase14(this, _resolve)[_resolve] = resolve;
            _classPrivateFieldLooseBase14(this, _reject)[_reject] = reject;
          });
          _classPrivateFieldLooseBase14(this, _addListeners3)[_addListeners3]();
        }
      };
      AssemblyWatcher_default = TransloaditAssemblyWatcher;
    }
  });

  // ../packages/@uppy/transloadit/lib/locale.js
  var locale_default5;
  var init_locale5 = __esm({
    "../packages/@uppy/transloadit/lib/locale.js"() {
      locale_default5 = {
        strings: {
          creatingAssembly: "Preparing upload...",
          creatingAssemblyFailed: "Transloadit: Could not create Assembly",
          encoding: "Encoding..."
        }
      };
    }
  });

  // ../packages/@uppy/transloadit/lib/index.js
  var lib_exports5 = {};
  __export(lib_exports5, {
    COMPANION_ALLOWED_HOSTS: () => COMPANION_ALLOWED_HOSTS,
    COMPANION_URL: () => COMPANION_URL,
    default: () => Transloadit
  });
  function _classPrivateFieldLooseBase15(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey15(name) {
    return "__private_" + id15++ + "_" + name;
  }
  function defaultGetAssemblyOptions(file, options) {
    return {
      params: options.params,
      signature: options.signature,
      fields: options.fields
    };
  }
  function _getClientVersion2() {
    const list = [`uppy-core:${this.uppy.constructor.VERSION}`, `uppy-transloadit:${this.constructor.VERSION}`, `uppy-tus:${Tus.VERSION}`];
    const addPluginVersion = (pluginName, versionName) => {
      const plugin = this.uppy.getPlugin(pluginName);
      if (plugin) {
        list.push(`${versionName}:${plugin.constructor.VERSION}`);
      }
    };
    if (this.opts.importFromUploadURLs) {
      addPluginVersion("XHRUpload", "uppy-xhr-upload");
      addPluginVersion("AwsS3", "uppy-aws-s3");
      addPluginVersion("AwsS3Multipart", "uppy-aws-s3-multipart");
    }
    addPluginVersion("Dropbox", "uppy-dropbox");
    addPluginVersion("Box", "uppy-box");
    addPluginVersion("Facebook", "uppy-facebook");
    addPluginVersion("GoogleDrive", "uppy-google-drive");
    addPluginVersion("Instagram", "uppy-instagram");
    addPluginVersion("OneDrive", "uppy-onedrive");
    addPluginVersion("Zoom", "uppy-zoom");
    addPluginVersion("Url", "uppy-url");
    return list.join(",");
  }
  function _attachAssemblyMetadata2(file, status) {
    const meta = {
      ...file.meta,
      assembly_url: status.assembly_url,
      filename: file.name,
      fieldname: "file"
    };
    const tus = {
      ...file.tus,
      endpoint: status.tus_url,
      addRequestId: true
    };
    let {
      remote
    } = file;
    if (file.remote && TL_COMPANION.test(file.remote.companionUrl)) {
      const newHost = status.companion_url.replace(/\/$/, "");
      const path = file.remote.url.replace(file.remote.companionUrl, "").replace(/^\//, "");
      remote = {
        ...file.remote,
        companionUrl: newHost,
        url: `${newHost}/${path}`
      };
    }
    const newFile = {
      ...file,
      transloadit: {
        assembly: status.assembly_id
      }
    };
    if (!this.opts.importFromUploadURLs) {
      Object.assign(newFile, {
        meta,
        tus,
        remote
      });
    }
    return newFile;
  }
  function _createAssembly2(fileIDs, uploadID, options) {
    this.uppy.log("[Transloadit] Create Assembly");
    return this.client.createAssembly({
      params: options.params,
      fields: options.fields,
      expectedFiles: fileIDs.length,
      signature: options.signature
    }).then(async (newAssembly) => {
      const files = this.uppy.getFiles().filter((_ref2) => {
        let {
          id: id21
        } = _ref2;
        return fileIDs.includes(id21);
      });
      if (files.length !== fileIDs.length) {
        if (files.length === 0) {
          await this.client.cancelAssembly(newAssembly);
          return null;
        }
        await this.client.updateNumberOfFilesInAssembly(newAssembly, files.length);
      }
      const assembly = new Assembly_default(newAssembly, _classPrivateFieldLooseBase15(this, _rateLimitedQueue2)[_rateLimitedQueue2]);
      const {
        status
      } = assembly;
      const assemblyID = status.assembly_id;
      const {
        assemblies,
        uploadsAssemblies
      } = this.getPluginState();
      this.setPluginState({
        assemblies: {
          ...assemblies,
          [assemblyID]: status
        },
        uploadsAssemblies: {
          ...uploadsAssemblies,
          [uploadID]: [...uploadsAssemblies[uploadID], assemblyID]
        }
      });
      const updatedFiles = {};
      files.forEach((file) => {
        updatedFiles[file.id] = _classPrivateFieldLooseBase15(this, _attachAssemblyMetadata)[_attachAssemblyMetadata](file, status);
      });
      this.uppy.setState({
        files: {
          ...this.uppy.getState().files,
          ...updatedFiles
        }
      });
      const fileRemovedHandler = (fileRemoved, reason) => {
        if (reason === "cancel-all") {
          assembly.close();
          this.uppy.off(fileRemovedHandler);
        } else if (fileRemoved.id in updatedFiles) {
          delete updatedFiles[fileRemoved.id];
          const nbOfRemainingFiles = Object.keys(updatedFiles).length;
          if (nbOfRemainingFiles === 0) {
            assembly.close();
            _classPrivateFieldLooseBase15(this, _cancelAssembly)[_cancelAssembly](newAssembly).catch(() => {
            });
            this.uppy.off(fileRemovedHandler);
          } else {
            this.client.updateNumberOfFilesInAssembly(newAssembly, nbOfRemainingFiles).catch(() => {
            });
          }
        }
      };
      this.uppy.on("file-removed", fileRemovedHandler);
      this.uppy.emit("transloadit:assembly-created", status, fileIDs);
      this.uppy.log(`[Transloadit] Created Assembly ${assemblyID}`);
      return assembly;
    }).catch((err) => {
      const wrapped = new ErrorWithCause_default(`${this.i18n("creatingAssemblyFailed")}: ${err.message}`, {
        cause: err
      });
      if ("details" in err) {
        wrapped.details = err.details;
      }
      if ("assembly" in err) {
        wrapped.assembly = err.assembly;
      }
      throw wrapped;
    });
  }
  function _createAssemblyWatcher2(assemblyID, uploadID) {
    const watcher = new AssemblyWatcher_default(this.uppy, assemblyID);
    watcher.on("assembly-complete", (id21) => {
      const files = this.getAssemblyFiles(id21);
      files.forEach((file) => {
        this.completedFiles[file.id] = true;
        this.uppy.emit("postprocess-complete", file);
      });
    });
    watcher.on("assembly-error", (id21, error) => {
      const files = this.getAssemblyFiles(id21);
      files.forEach((file) => {
        this.uppy.emit("upload-error", file, error);
        this.uppy.emit("postprocess-complete", file);
      });
    });
    this.assemblyWatchers[uploadID] = watcher;
  }
  function _shouldWaitAfterUpload2() {
    return this.opts.waitForEncoding || this.opts.waitForMetadata;
  }
  function _reserveFiles2(assembly, fileIDs) {
    return Promise.all(fileIDs.map((fileID) => {
      const file = this.uppy.getFile(fileID);
      return this.client.reserveFile(assembly.status, file);
    }));
  }
  function _findFile2(uploadedFile) {
    const files = this.uppy.getFiles();
    for (let i4 = 0; i4 < files.length; i4++) {
      const file = files[i4];
      if (file.uploadURL === uploadedFile.tus_upload_url) {
        return file;
      }
      if (file.tus && file.tus.uploadUrl === uploadedFile.tus_upload_url) {
        return file;
      }
      if (!uploadedFile.is_tus_file) {
        if (file.name === uploadedFile.name && file.size === uploadedFile.size) {
          return file;
        }
      }
    }
    return void 0;
  }
  function _onFileUploadComplete2(assemblyId, uploadedFile) {
    const state = this.getPluginState();
    const file = _classPrivateFieldLooseBase15(this, _findFile)[_findFile](uploadedFile);
    if (!file) {
      this.uppy.log("[Transloadit] Couldn\u2019t file the file, it was likely removed in the process");
      return;
    }
    this.setPluginState({
      files: {
        ...state.files,
        [uploadedFile.id]: {
          assembly: assemblyId,
          id: file.id,
          uploadedFile
        }
      }
    });
    this.uppy.emit("transloadit:upload", uploadedFile, this.getAssembly(assemblyId));
  }
  function _onResult2(assemblyId, stepName, result2) {
    const state = this.getPluginState();
    const file = state.files[result2.original_id];
    result2.localId = file ? file.id : null;
    const entry = {
      result: result2,
      stepName,
      id: result2.id,
      assembly: assemblyId
    };
    this.setPluginState({
      results: [...state.results, entry]
    });
    this.uppy.emit("transloadit:result", stepName, result2, this.getAssembly(assemblyId));
  }
  function _onAssemblyFinished2(status) {
    const url2 = status.assembly_ssl_url;
    this.client.getAssemblyStatus(url2).then((finalStatus) => {
      const assemblyId = finalStatus.assembly_id;
      const state = this.getPluginState();
      this.setPluginState({
        assemblies: {
          ...state.assemblies,
          [assemblyId]: finalStatus
        }
      });
      this.uppy.emit("transloadit:complete", finalStatus);
    });
  }
  async function _cancelAssembly2(assembly) {
    await this.client.cancelAssembly(assembly);
    this.uppy.emit("transloadit:assembly-cancelled", assembly);
  }
  function _connectAssembly2(assembly) {
    const {
      status
    } = assembly;
    const id21 = status.assembly_id;
    this.activeAssemblies[id21] = assembly;
    assembly.on("status", (newStatus) => {
      const {
        assemblies
      } = this.getPluginState();
      this.setPluginState({
        assemblies: {
          ...assemblies,
          [id21]: newStatus
        }
      });
    });
    assembly.on("upload", (file) => {
      _classPrivateFieldLooseBase15(this, _onFileUploadComplete)[_onFileUploadComplete](id21, file);
    });
    assembly.on("error", (error) => {
      error.assembly = assembly.status;
      this.uppy.emit("transloadit:assembly-error", assembly.status, error);
    });
    assembly.on("executing", () => {
      this.uppy.emit("transloadit:assembly-executing", assembly.status);
    });
    if (this.opts.waitForEncoding) {
      assembly.on("result", (stepName, result2) => {
        _classPrivateFieldLooseBase15(this, _onResult)[_onResult](id21, stepName, result2);
      });
    }
    if (this.opts.waitForEncoding) {
      assembly.on("finished", () => {
        _classPrivateFieldLooseBase15(this, _onAssemblyFinished)[_onAssemblyFinished](assembly.status);
      });
    } else if (this.opts.waitForMetadata) {
      assembly.on("metadata", () => {
        _classPrivateFieldLooseBase15(this, _onAssemblyFinished)[_onAssemblyFinished](assembly.status);
      });
    }
    if (assembly.ok === "ASSEMBLY_COMPLETE") {
      return assembly;
    }
    assembly.connect();
    return assembly;
  }
  var id15, packageJson10, sendErrorToConsole, COMPANION_URL, COMPANION_ALLOWED_HOSTS, TL_COMPANION, _rateLimitedQueue2, _getClientVersion, _attachAssemblyMetadata, _createAssembly, _createAssemblyWatcher, _shouldWaitAfterUpload, _reserveFiles, _onFileUploadURLAvailable, _findFile, _onFileUploadComplete, _onResult, _onAssemblyFinished, _cancelAssembly, _onCancelAll, _getPersistentData, _onRestored, _connectAssembly, _prepareUpload, _afterUpload, _closeAssemblyIfExists, _onError3, _onTusError, Transloadit;
  var init_lib10 = __esm({
    "../packages/@uppy/transloadit/lib/index.js"() {
      init_hasProperty();
      init_ErrorWithCause();
      init_RateLimitedQueue();
      init_BasePlugin();
      init_lib9();
      init_Assembly();
      init_Client();
      init_AssemblyOptions();
      init_AssemblyWatcher();
      init_locale5();
      id15 = 0;
      packageJson10 = {
        "version": "3.0.0-beta.5"
      };
      sendErrorToConsole = (originalErr) => (err) => {
        const error = new ErrorWithCause_default("Failed to send error to the client", {
          cause: err
        });
        console.error(error, originalErr);
      };
      COMPANION_URL = "https://api2.transloadit.com/companion";
      COMPANION_ALLOWED_HOSTS = /\.transloadit\.com$/;
      TL_COMPANION = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/companion/;
      _rateLimitedQueue2 = /* @__PURE__ */ _classPrivateFieldLooseKey15("rateLimitedQueue");
      _getClientVersion = /* @__PURE__ */ _classPrivateFieldLooseKey15("getClientVersion");
      _attachAssemblyMetadata = /* @__PURE__ */ _classPrivateFieldLooseKey15("attachAssemblyMetadata");
      _createAssembly = /* @__PURE__ */ _classPrivateFieldLooseKey15("createAssembly");
      _createAssemblyWatcher = /* @__PURE__ */ _classPrivateFieldLooseKey15("createAssemblyWatcher");
      _shouldWaitAfterUpload = /* @__PURE__ */ _classPrivateFieldLooseKey15("shouldWaitAfterUpload");
      _reserveFiles = /* @__PURE__ */ _classPrivateFieldLooseKey15("reserveFiles");
      _onFileUploadURLAvailable = /* @__PURE__ */ _classPrivateFieldLooseKey15("onFileUploadURLAvailable");
      _findFile = /* @__PURE__ */ _classPrivateFieldLooseKey15("findFile");
      _onFileUploadComplete = /* @__PURE__ */ _classPrivateFieldLooseKey15("onFileUploadComplete");
      _onResult = /* @__PURE__ */ _classPrivateFieldLooseKey15("onResult");
      _onAssemblyFinished = /* @__PURE__ */ _classPrivateFieldLooseKey15("onAssemblyFinished");
      _cancelAssembly = /* @__PURE__ */ _classPrivateFieldLooseKey15("cancelAssembly");
      _onCancelAll = /* @__PURE__ */ _classPrivateFieldLooseKey15("onCancelAll");
      _getPersistentData = /* @__PURE__ */ _classPrivateFieldLooseKey15("getPersistentData");
      _onRestored = /* @__PURE__ */ _classPrivateFieldLooseKey15("onRestored");
      _connectAssembly = /* @__PURE__ */ _classPrivateFieldLooseKey15("connectAssembly");
      _prepareUpload = /* @__PURE__ */ _classPrivateFieldLooseKey15("prepareUpload");
      _afterUpload = /* @__PURE__ */ _classPrivateFieldLooseKey15("afterUpload");
      _closeAssemblyIfExists = /* @__PURE__ */ _classPrivateFieldLooseKey15("closeAssemblyIfExists");
      _onError3 = /* @__PURE__ */ _classPrivateFieldLooseKey15("onError");
      _onTusError = /* @__PURE__ */ _classPrivateFieldLooseKey15("onTusError");
      Transloadit = class extends BasePlugin {
        constructor(uppy, opts) {
          var _this;
          super(uppy, opts);
          _this = this;
          Object.defineProperty(this, _connectAssembly, {
            value: _connectAssembly2
          });
          Object.defineProperty(this, _cancelAssembly, {
            value: _cancelAssembly2
          });
          Object.defineProperty(this, _onAssemblyFinished, {
            value: _onAssemblyFinished2
          });
          Object.defineProperty(this, _onResult, {
            value: _onResult2
          });
          Object.defineProperty(this, _onFileUploadComplete, {
            value: _onFileUploadComplete2
          });
          Object.defineProperty(this, _findFile, {
            value: _findFile2
          });
          Object.defineProperty(this, _reserveFiles, {
            value: _reserveFiles2
          });
          Object.defineProperty(this, _shouldWaitAfterUpload, {
            value: _shouldWaitAfterUpload2
          });
          Object.defineProperty(this, _createAssemblyWatcher, {
            value: _createAssemblyWatcher2
          });
          Object.defineProperty(this, _createAssembly, {
            value: _createAssembly2
          });
          Object.defineProperty(this, _attachAssemblyMetadata, {
            value: _attachAssemblyMetadata2
          });
          Object.defineProperty(this, _getClientVersion, {
            value: _getClientVersion2
          });
          Object.defineProperty(this, _rateLimitedQueue2, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _onFileUploadURLAvailable, {
            writable: true,
            value: (rawFile) => {
              var _file$transloadit;
              const file = this.uppy.getFile(rawFile.id);
              if (!(file != null && (_file$transloadit = file.transloadit) != null && _file$transloadit.assembly)) {
                return;
              }
              const {
                assemblies
              } = this.getPluginState();
              const assembly = assemblies[file.transloadit.assembly];
              this.client.addFile(assembly, file).catch((err) => {
                this.uppy.log(err);
                this.uppy.emit("transloadit:import-error", assembly, file.id, err);
              });
            }
          });
          Object.defineProperty(this, _onCancelAll, {
            writable: true,
            value: async function(_temp) {
              let {
                reason
              } = _temp === void 0 ? {} : _temp;
              try {
                if (reason !== "user")
                  return;
                const {
                  uploadsAssemblies
                } = _this.getPluginState();
                const assemblyIDs = Object.values(uploadsAssemblies).flat(1);
                const assemblies = assemblyIDs.map((assemblyID) => _this.getAssembly(assemblyID));
                await Promise.all(assemblies.map((assembly) => _classPrivateFieldLooseBase15(_this, _cancelAssembly)[_cancelAssembly](assembly)));
              } catch (err) {
                _this.uppy.log(err);
              }
            }
          });
          Object.defineProperty(this, _getPersistentData, {
            writable: true,
            value: (setData) => {
              const {
                assemblies,
                uploadsAssemblies
              } = this.getPluginState();
              setData({
                [this.id]: {
                  assemblies,
                  uploadsAssemblies
                }
              });
            }
          });
          Object.defineProperty(this, _onRestored, {
            writable: true,
            value: (pluginData) => {
              const savedState = pluginData && pluginData[this.id] ? pluginData[this.id] : {};
              const previousAssemblies = savedState.assemblies || {};
              const uploadsAssemblies = savedState.uploadsAssemblies || {};
              if (Object.keys(uploadsAssemblies).length === 0) {
                return;
              }
              const restoreState = (assemblies) => {
                const files = {};
                const results = [];
                for (const [id21, status] of Object.entries(assemblies)) {
                  status.uploads.forEach((uploadedFile) => {
                    const file = _classPrivateFieldLooseBase15(this, _findFile)[_findFile](uploadedFile);
                    files[uploadedFile.id] = {
                      id: file.id,
                      assembly: id21,
                      uploadedFile
                    };
                  });
                  const state = this.getPluginState();
                  Object.keys(status.results).forEach((stepName) => {
                    for (const result2 of status.results[stepName]) {
                      const file = state.files[result2.original_id];
                      result2.localId = file ? file.id : null;
                      results.push({
                        id: result2.id,
                        result: result2,
                        stepName,
                        assembly: id21
                      });
                    }
                  });
                }
                this.setPluginState({
                  assemblies,
                  files,
                  results,
                  uploadsAssemblies
                });
              };
              const restoreAssemblies = () => {
                const {
                  assemblies,
                  uploadsAssemblies: uploadsAssemblies2
                } = this.getPluginState();
                Object.keys(uploadsAssemblies2).forEach((uploadID) => {
                  const assemblyIDs = uploadsAssemblies2[uploadID];
                  _classPrivateFieldLooseBase15(this, _createAssemblyWatcher)[_createAssemblyWatcher](assemblyIDs, uploadID);
                });
                const allAssemblyIDs = Object.keys(assemblies);
                allAssemblyIDs.forEach((id21) => {
                  const assembly = new Assembly_default(assemblies[id21], _classPrivateFieldLooseBase15(this, _rateLimitedQueue2)[_rateLimitedQueue2]);
                  _classPrivateFieldLooseBase15(this, _connectAssembly)[_connectAssembly](assembly);
                });
              };
              const updateAssemblies = () => {
                const {
                  assemblies
                } = this.getPluginState();
                return Promise.all(Object.keys(assemblies).map((id21) => {
                  return this.activeAssemblies[id21].update();
                }));
              };
              this.restored = Promise.resolve().then(() => {
                restoreState(previousAssemblies);
                restoreAssemblies();
                return updateAssemblies();
              });
              this.restored.then(() => {
                this.restored = null;
              });
            }
          });
          Object.defineProperty(this, _prepareUpload, {
            writable: true,
            value: (fileIDs, uploadID) => {
              const files = fileIDs.map((id21) => this.uppy.getFile(id21));
              const filesWithoutErrors = files.filter((file) => {
                if (!file.error) {
                  this.uppy.emit("preprocess-progress", file, {
                    mode: "indeterminate",
                    message: this.i18n("creatingAssembly")
                  });
                  return true;
                }
                return false;
              });
              const createAssembly = async (_ref) => {
                let {
                  fileIDs: fileIDs2,
                  options
                } = _ref;
                try {
                  const assembly = await _classPrivateFieldLooseBase15(this, _createAssembly)[_createAssembly](fileIDs2, uploadID, options);
                  if (this.opts.importFromUploadURLs) {
                    await _classPrivateFieldLooseBase15(this, _reserveFiles)[_reserveFiles](assembly, fileIDs2);
                  }
                  fileIDs2.forEach((fileID) => {
                    const file = this.uppy.getFile(fileID);
                    this.uppy.emit("preprocess-complete", file);
                  });
                  return assembly;
                } catch (err) {
                  fileIDs2.forEach((fileID) => {
                    const file = this.uppy.getFile(fileID);
                    this.uppy.emit("preprocess-complete", file);
                    this.uppy.emit("upload-error", file, err);
                  });
                  throw err;
                }
              };
              const {
                uploadsAssemblies
              } = this.getPluginState();
              this.setPluginState({
                uploadsAssemblies: {
                  ...uploadsAssemblies,
                  [uploadID]: []
                }
              });
              const assemblyOptions = new AssemblyOptions_default(filesWithoutErrors, this.opts);
              return assemblyOptions.build().then((assemblies) => Promise.all(assemblies.map(createAssembly))).then((maybeCreatedAssemblies) => {
                const createdAssemblies = maybeCreatedAssemblies.filter(Boolean);
                const assemblyIDs = createdAssemblies.map((assembly) => assembly.status.assembly_id);
                _classPrivateFieldLooseBase15(this, _createAssemblyWatcher)[_createAssemblyWatcher](assemblyIDs, uploadID);
                return Promise.all(createdAssemblies.map((assembly) => _classPrivateFieldLooseBase15(this, _connectAssembly)[_connectAssembly](assembly)));
              }).catch((err) => {
                filesWithoutErrors.forEach((file) => {
                  this.uppy.emit("preprocess-complete", file);
                  this.uppy.emit("upload-error", file, err);
                });
                throw err;
              });
            }
          });
          Object.defineProperty(this, _afterUpload, {
            writable: true,
            value: (fileIDs, uploadID) => {
              const files = fileIDs.map((fileID) => this.uppy.getFile(fileID));
              const filteredFileIDs = files.filter((file) => !file.error).map((file) => file.id);
              const state = this.getPluginState();
              if (this.restored) {
                return this.restored.then(() => {
                  return _classPrivateFieldLooseBase15(this, _afterUpload)[_afterUpload](filteredFileIDs, uploadID);
                });
              }
              const assemblyIDs = state.uploadsAssemblies[uploadID];
              const closeSocketConnections = () => {
                assemblyIDs.forEach((assemblyID) => {
                  const assembly = this.activeAssemblies[assemblyID];
                  assembly.close();
                  delete this.activeAssemblies[assemblyID];
                });
              };
              if (!_classPrivateFieldLooseBase15(this, _shouldWaitAfterUpload)[_shouldWaitAfterUpload]()) {
                closeSocketConnections();
                const assemblies = assemblyIDs.map((id21) => this.getAssembly(id21));
                this.uppy.addResultData(uploadID, {
                  transloadit: assemblies
                });
                return Promise.resolve();
              }
              if (assemblyIDs.length === 0) {
                this.uppy.addResultData(uploadID, {
                  transloadit: []
                });
                return Promise.resolve();
              }
              const incompleteFiles = files.filter((file) => !has(this.completedFiles, file.id));
              incompleteFiles.forEach((file) => {
                this.uppy.emit("postprocess-progress", file, {
                  mode: "indeterminate",
                  message: this.i18n("encoding")
                });
              });
              const watcher = this.assemblyWatchers[uploadID];
              return watcher.promise.then(() => {
                closeSocketConnections();
                const assemblies = assemblyIDs.map((id21) => this.getAssembly(id21));
                const uploadsAssemblies = {
                  ...this.getPluginState().uploadsAssemblies
                };
                delete uploadsAssemblies[uploadID];
                this.setPluginState({
                  uploadsAssemblies
                });
                this.uppy.addResultData(uploadID, {
                  transloadit: assemblies
                });
              });
            }
          });
          Object.defineProperty(this, _closeAssemblyIfExists, {
            writable: true,
            value: (assemblyID) => {
              var _this$activeAssemblie;
              (_this$activeAssemblie = this.activeAssemblies[assemblyID]) == null ? void 0 : _this$activeAssemblie.close();
            }
          });
          Object.defineProperty(this, _onError3, {
            writable: true,
            value: function(err, uploadID) {
              if (err === void 0) {
                err = null;
              }
              const state = _this.getPluginState();
              const assemblyIDs = state.uploadsAssemblies[uploadID];
              assemblyIDs == null ? void 0 : assemblyIDs.forEach(_classPrivateFieldLooseBase15(_this, _closeAssemblyIfExists)[_closeAssemblyIfExists]);
              _this.client.submitError(err).catch(sendErrorToConsole(err));
            }
          });
          Object.defineProperty(this, _onTusError, {
            writable: true,
            value: (file, err) => {
              var _file$transloadit2, _err$message;
              _classPrivateFieldLooseBase15(this, _closeAssemblyIfExists)[_closeAssemblyIfExists](file == null ? void 0 : (_file$transloadit2 = file.transloadit) == null ? void 0 : _file$transloadit2.assembly);
              if (err != null && (_err$message = err.message) != null && _err$message.startsWith("tus: ")) {
                var _err$originalRequest, _err$originalRequest$;
                const endpoint = (_err$originalRequest = err.originalRequest) == null ? void 0 : (_err$originalRequest$ = _err$originalRequest.getUnderlyingObject()) == null ? void 0 : _err$originalRequest$.responseURL;
                this.client.submitError(err, {
                  endpoint,
                  type: "TUS_ERROR"
                }).catch(sendErrorToConsole(err));
              }
            }
          });
          this.type = "uploader";
          this.id = this.opts.id || "Transloadit";
          this.title = "Transloadit";
          this.defaultLocale = locale_default5;
          const defaultOptions4 = {
            service: "https://api2.transloadit.com",
            errorReporting: true,
            waitForEncoding: false,
            waitForMetadata: false,
            alwaysRunAssembly: false,
            importFromUploadURLs: false,
            signature: null,
            params: null,
            fields: {},
            getAssemblyOptions: defaultGetAssemblyOptions,
            limit: 20,
            retryDelays: [7e3, 1e4, 15e3, 2e4]
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          _classPrivateFieldLooseBase15(this, _rateLimitedQueue2)[_rateLimitedQueue2] = new RateLimitedQueue(this.opts.limit);
          this.i18nInit();
          const hasCustomAssemblyOptions = this.opts.getAssemblyOptions !== defaultOptions4.getAssemblyOptions;
          if (this.opts.params) {
            validateParams(this.opts.params);
          } else if (!hasCustomAssemblyOptions) {
            validateParams(null);
          }
          this.client = new Client({
            service: this.opts.service,
            client: _classPrivateFieldLooseBase15(this, _getClientVersion)[_getClientVersion](),
            errorReporting: this.opts.errorReporting,
            rateLimitedQueue: _classPrivateFieldLooseBase15(this, _rateLimitedQueue2)[_rateLimitedQueue2]
          });
          this.activeAssemblies = {};
          this.assemblyWatchers = {};
          this.completedFiles = /* @__PURE__ */ Object.create(null);
        }
        install() {
          this.uppy.addPreProcessor(_classPrivateFieldLooseBase15(this, _prepareUpload)[_prepareUpload]);
          this.uppy.addPostProcessor(_classPrivateFieldLooseBase15(this, _afterUpload)[_afterUpload]);
          this.uppy.on("error", _classPrivateFieldLooseBase15(this, _onError3)[_onError3]);
          this.uppy.on("cancel-all", _classPrivateFieldLooseBase15(this, _onCancelAll)[_onCancelAll]);
          this.uppy.on("upload-error", _classPrivateFieldLooseBase15(this, _onTusError)[_onTusError]);
          if (this.opts.importFromUploadURLs) {
            this.uppy.on("upload-success", _classPrivateFieldLooseBase15(this, _onFileUploadURLAvailable)[_onFileUploadURLAvailable]);
          } else {
            this.uppy.use(Tus, {
              storeFingerprintForResuming: false,
              useFastRemoteRetry: false,
              metaFields: ["assembly_url", "filename", "fieldname"],
              limit: this.opts.limit,
              rateLimitedQueue: _classPrivateFieldLooseBase15(this, _rateLimitedQueue2)[_rateLimitedQueue2],
              retryDelays: this.opts.retryDelays
            });
          }
          this.uppy.on("restore:get-data", _classPrivateFieldLooseBase15(this, _getPersistentData)[_getPersistentData]);
          this.uppy.on("restored", _classPrivateFieldLooseBase15(this, _onRestored)[_onRestored]);
          this.setPluginState({
            assemblies: {},
            uploadsAssemblies: {},
            files: {},
            results: []
          });
          const {
            capabilities
          } = this.uppy.getState();
          this.uppy.setState({
            capabilities: {
              ...capabilities,
              individualCancellation: false
            }
          });
        }
        uninstall() {
          this.uppy.removePreProcessor(_classPrivateFieldLooseBase15(this, _prepareUpload)[_prepareUpload]);
          this.uppy.removePostProcessor(_classPrivateFieldLooseBase15(this, _afterUpload)[_afterUpload]);
          this.uppy.off("error", _classPrivateFieldLooseBase15(this, _onError3)[_onError3]);
          if (this.opts.importFromUploadURLs) {
            this.uppy.off("upload-success", _classPrivateFieldLooseBase15(this, _onFileUploadURLAvailable)[_onFileUploadURLAvailable]);
          }
          const {
            capabilities
          } = this.uppy.getState();
          this.uppy.setState({
            capabilities: {
              ...capabilities,
              individualCancellation: true
            }
          });
        }
        getAssembly(id21) {
          const {
            assemblies
          } = this.getPluginState();
          return assemblies[id21];
        }
        getAssemblyFiles(assemblyID) {
          return this.uppy.getFiles().filter((file) => {
            var _file$transloadit3;
            return (file == null ? void 0 : (_file$transloadit3 = file.transloadit) == null ? void 0 : _file$transloadit3.assembly) === assemblyID;
          });
        }
      };
      Transloadit.VERSION = packageJson10.version;
      Transloadit.COMPANION = COMPANION_URL;
      Transloadit.COMPANION_PATTERN = COMPANION_ALLOWED_HOSTS;
    }
  });

  // ../packages/@uppy/robodog/lib/TransloaditResultsPlugin.js
  var require_TransloaditResultsPlugin = __commonJS({
    "../packages/@uppy/robodog/lib/TransloaditResultsPlugin.js"(exports, module) {
      function _classPrivateFieldLooseBase21(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id21 = 0;
      function _classPrivateFieldLooseKey21(name) {
        return "__private_" + id21++ + "_" + name;
      }
      var BasePlugin2 = (init_BasePlugin(), __toCommonJS(BasePlugin_exports));
      var _afterUpload2 = /* @__PURE__ */ _classPrivateFieldLooseKey21("afterUpload");
      var TransloaditResultsPlugin = class extends BasePlugin2 {
        constructor(uppy, opts) {
          super(uppy, opts);
          Object.defineProperty(this, _afterUpload2, {
            writable: true,
            value: (fileIDs, uploadID) => {
              const {
                currentUploads
              } = this.uppy.getState();
              const {
                result: result2
              } = currentUploads[uploadID];
              const assemblies = Array.isArray(result2 == null ? void 0 : result2.transloadit) ? result2.transloadit : [];
              const assemblyResults = [];
              assemblies.forEach((assembly) => {
                Object.keys(assembly.results).forEach((stepName) => {
                  const results = assembly.results[stepName];
                  results.forEach((resultObject) => {
                    assemblyResults.push({
                      ...resultObject,
                      assemblyId: assembly.assembly_id,
                      stepName
                    });
                  });
                });
              });
              this.uppy.addResultData(uploadID, {
                results: assemblyResults
              });
            }
          });
          this.type = "modifier";
          this.id = this.opts.id || "TransloaditResultsPlugin";
        }
        install() {
          this.uppy.addPostProcessor(_classPrivateFieldLooseBase21(this, _afterUpload2)[_afterUpload2]);
        }
      };
      module.exports = TransloaditResultsPlugin;
    }
  });

  // ../packages/@uppy/robodog/lib/addTransloaditPlugin.js
  var require_addTransloaditPlugin = __commonJS({
    "../packages/@uppy/robodog/lib/addTransloaditPlugin.js"(exports, module) {
      var Transloadit2 = (init_lib10(), __toCommonJS(lib_exports5));
      var has2 = (init_hasProperty(), __toCommonJS(hasProperty_exports));
      var TransloaditResults = require_TransloaditResultsPlugin();
      var transloaditOptionNames = ["service", "waitForEncoding", "waitForMetadata", "alwaysRunAssembly", "importFromUploadURLs", "signature", "params", "fields", "limit", "locale", "getAssemblyOptions"];
      function addTransloaditPlugin(uppy, opts) {
        const transloaditOptions = {};
        transloaditOptionNames.forEach((name) => {
          if (has2(opts, name))
            transloaditOptions[name] = opts[name];
        });
        uppy.use(Transloadit2, transloaditOptions);
        if (transloaditOptions.waitForEncoding) {
          uppy.use(TransloaditResults);
        }
      }
      module.exports = addTransloaditPlugin;
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/AuthView.js
  function GoogleIcon() {
    return h("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 26 26",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("g", {
      fill: "none",
      "fill-rule": "evenodd"
    }, h("circle", {
      fill: "#FFF",
      cx: "13",
      cy: "13",
      r: "13"
    }), h("path", {
      d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
      fill: "#4285F4",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
      fill: "#34A853",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
      fill: "#FBBC05",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
      fill: "#EA4335",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M4 4h18v18H4z"
    })));
  }
  function AuthView(props) {
    const {
      pluginName,
      pluginIcon,
      i18nArray,
      handleAuth
    } = props;
    const isGoogleDrive = pluginName === "Google Drive";
    const pluginNameComponent = h("span", {
      className: "uppy-Provider-authTitleName"
    }, pluginName, h("br", null));
    return h("div", {
      className: "uppy-Provider-auth"
    }, h("div", {
      className: "uppy-Provider-authIcon"
    }, pluginIcon()), h("div", {
      className: "uppy-Provider-authTitle"
    }, i18nArray("authenticateWithTitle", {
      pluginName: pluginNameComponent
    })), isGoogleDrive ? h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
      onClick: handleAuth,
      "data-uppy-super-focusable": true
    }, h(GoogleIcon, null), i18nArray("signInWithGoogle")) : h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
      onClick: handleAuth,
      "data-uppy-super-focusable": true
    }, i18nArray("authenticateWith", {
      pluginName
    })));
  }
  var AuthView_default;
  var init_AuthView = __esm({
    "../packages/@uppy/provider-views/lib/ProviderView/AuthView.js"() {
      init_preact_module();
      AuthView_default = AuthView;
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/User.js
  var User_default;
  var init_User = __esm({
    "../packages/@uppy/provider-views/lib/ProviderView/User.js"() {
      init_preact_module();
      User_default = (_ref) => {
        let {
          i18n,
          logout,
          username
        } = _ref;
        return [h("span", {
          className: "uppy-ProviderBrowser-user",
          key: "username"
        }, username), h("button", {
          type: "button",
          onClick: logout,
          className: "uppy-u-reset uppy-ProviderBrowser-userLogout",
          key: "logout"
        }, i18n("logOut"))];
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Breadcrumbs.js
  var Breadcrumb, Breadcrumbs_default;
  var init_Breadcrumbs = __esm({
    "../packages/@uppy/provider-views/lib/Breadcrumbs.js"() {
      init_preact_module();
      Breadcrumb = (props) => {
        const {
          getFolder,
          title,
          isLast
        } = props;
        return h(p, null, h("button", {
          type: "button",
          className: "uppy-u-reset",
          onClick: getFolder
        }, title), !isLast ? " / " : "");
      };
      Breadcrumbs_default = (props) => {
        const {
          getFolder,
          title,
          breadcrumbsIcon,
          directories
        } = props;
        return h("div", {
          className: "uppy-Provider-breadcrumbs"
        }, h("div", {
          className: "uppy-Provider-breadcrumbsIcon"
        }, breadcrumbsIcon), directories.map((directory, i4) => h(Breadcrumb, {
          key: directory.id,
          getFolder: () => getFolder(directory.id),
          title: i4 === 0 ? title : directory.title,
          isLast: i4 + 1 === directories.length
        })));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/Header.js
  var Header_default;
  var init_Header = __esm({
    "../packages/@uppy/provider-views/lib/ProviderView/Header.js"() {
      init_User();
      init_Breadcrumbs();
      Header_default = (props) => {
        const components = [];
        if (props.showBreadcrumbs) {
          components.push(Breadcrumbs_default({
            getFolder: props.getFolder,
            directories: props.directories,
            breadcrumbsIcon: props.pluginIcon && props.pluginIcon(),
            title: props.title
          }));
        }
        components.push(User_default({
          logout: props.logout,
          username: props.username,
          i18n: props.i18n
        }));
        return components;
      };
    }
  });

  // ../packages/@uppy/utils/lib/remoteFileObjToLocal.js
  function remoteFileObjToLocal(file) {
    return {
      ...file,
      type: file.mimeType,
      extension: file.name ? getFileNameAndExtension(file.name).extension : null
    };
  }
  var init_remoteFileObjToLocal = __esm({
    "../packages/@uppy/utils/lib/remoteFileObjToLocal.js"() {
      init_getFileNameAndExtension();
    }
  });

  // ../packages/@uppy/provider-views/lib/Filter.js
  var Filter;
  var init_Filter = __esm({
    "../packages/@uppy/provider-views/lib/Filter.js"() {
      init_preact_module();
      Filter = class extends d {
        constructor(props) {
          super(props);
          this.preventEnterPress = this.preventEnterPress.bind(this);
        }
        preventEnterPress(ev) {
          if (ev.keyCode === 13) {
            ev.stopPropagation();
            ev.preventDefault();
          }
        }
        render() {
          const {
            i18n,
            filterInput,
            filterQuery
          } = this.props;
          return h("div", {
            className: "uppy-ProviderBrowser-filter"
          }, h("input", {
            className: "uppy-u-reset uppy-ProviderBrowser-filterInput",
            type: "text",
            placeholder: i18n("filter"),
            "aria-label": i18n("filter"),
            onKeyUp: this.preventEnterPress,
            onKeyDown: this.preventEnterPress,
            onKeyPress: this.preventEnterPress,
            onInput: (e3) => filterQuery(e3),
            value: filterInput
          }), h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon uppy-ProviderBrowser-filterIcon",
            width: "12",
            height: "12",
            viewBox: "0 0 12 12"
          }, h("path", {
            d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
          })), filterInput && h("button", {
            className: "uppy-u-reset uppy-ProviderBrowser-filterClose",
            type: "button",
            "aria-label": i18n("resetFilter"),
            title: i18n("resetFilter"),
            onClick: filterQuery
          }, h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon",
            viewBox: "0 0 19 19"
          }, h("path", {
            d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
          }))));
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/FooterActions.js
  var FooterActions_default;
  var init_FooterActions = __esm({
    "../packages/@uppy/provider-views/lib/FooterActions.js"() {
      init_preact_module();
      FooterActions_default = (_ref) => {
        let {
          cancel,
          done,
          i18n,
          selected
        } = _ref;
        return h("div", {
          className: "uppy-ProviderBrowser-footer"
        }, h("button", {
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
          onClick: done,
          type: "button"
        }, i18n("selectX", {
          smart_count: selected
        })), h("button", {
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
          onClick: cancel,
          type: "button"
        }, i18n("cancel")));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/components/ItemIcon.js
  function FileIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: 11,
      height: 14.5,
      viewBox: "0 0 44 58"
    }, h("path", {
      d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
    }));
  }
  function FolderIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      style: {
        minWidth: 16,
        marginRight: 3
      },
      viewBox: "0 0 276.157 276.157"
    }, h("path", {
      d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
    }));
  }
  function VideoIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      style: {
        width: 16,
        marginRight: 4
      },
      viewBox: "0 0 58 58"
    }, h("path", {
      d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
    }), h("path", {
      d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
    }));
  }
  var ItemIcon_default;
  var init_ItemIcon = __esm({
    "../packages/@uppy/provider-views/lib/Item/components/ItemIcon.js"() {
      init_preact_module();
      ItemIcon_default = (props) => {
        const {
          itemIconString
        } = props;
        if (itemIconString === null)
          return void 0;
        switch (itemIconString) {
          case "file":
            return h(FileIcon, null);
          case "folder":
            return h(FolderIcon, null);
          case "video":
            return h(VideoIcon, null);
          default: {
            const {
              alt
            } = props;
            return h("img", {
              src: itemIconString,
              alt
            });
          }
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/components/GridLi.js
  function GridListItem(props) {
    const {
      className,
      isDisabled,
      restrictionError,
      isChecked,
      title,
      itemIconEl,
      showTitles,
      toggleCheckbox,
      recordShiftKeyPress,
      id: id21,
      children
    } = props;
    return h("li", {
      className,
      title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
    }, h("input", {
      type: "checkbox",
      className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""} uppy-ProviderBrowserItem-checkbox--grid`,
      onChange: toggleCheckbox,
      onKeyDown: recordShiftKeyPress,
      name: "listitem",
      id: id21,
      checked: isChecked,
      disabled: isDisabled,
      "data-uppy-super-focusable": true
    }), h("label", {
      htmlFor: id21,
      "aria-label": title,
      className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
    }, h("span", {
      className: "uppy-ProviderBrowserItem-inner-relative"
    }, itemIconEl, showTitles && title, children)));
  }
  var GridLi_default;
  var init_GridLi = __esm({
    "../packages/@uppy/provider-views/lib/Item/components/GridLi.js"() {
      init_preact_module();
      GridLi_default = GridListItem;
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/components/ListLi.js
  function ListItem(props) {
    const {
      className,
      isDisabled,
      restrictionError,
      isCheckboxDisabled,
      isChecked,
      toggleCheckbox,
      recordShiftKeyPress,
      type,
      id: id21,
      itemIconEl,
      title,
      handleFolderClick,
      showTitles,
      i18n
    } = props;
    return h("li", {
      className,
      title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
    }, !isCheckboxDisabled ? h("input", {
      type: "checkbox",
      className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""}`,
      onChange: toggleCheckbox,
      onKeyDown: recordShiftKeyPress,
      name: "listitem",
      id: id21,
      checked: isChecked,
      "aria-label": type === "file" ? null : i18n("allFilesFromFolderNamed", {
        name: title
      }),
      disabled: isDisabled,
      "data-uppy-super-focusable": true
    }) : null, type === "file" ? h("label", {
      htmlFor: id21,
      className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
    }, h("div", {
      className: "uppy-ProviderBrowserItem-iconWrap"
    }, itemIconEl), showTitles && title) : h("button", {
      type: "button",
      className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
      onClick: handleFolderClick,
      "aria-label": i18n("openFolderNamed", {
        name: title
      })
    }, h("div", {
      className: "uppy-ProviderBrowserItem-iconWrap"
    }, itemIconEl), showTitles && h("span", null, title)));
  }
  var ListLi_default;
  var init_ListLi = __esm({
    "../packages/@uppy/provider-views/lib/Item/components/ListLi.js"() {
      init_preact_module();
      ListLi_default = ListItem;
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/index.js
  function _extends5() {
    _extends5 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends5.apply(this, arguments);
  }
  var import_classnames11, Item_default;
  var init_Item = __esm({
    "../packages/@uppy/provider-views/lib/Item/index.js"() {
      init_preact_module();
      import_classnames11 = __toESM(require_classnames(), 1);
      init_ItemIcon();
      init_GridLi();
      init_ListLi();
      Item_default = (props) => {
        const {
          author,
          getItemIcon,
          isChecked,
          isDisabled,
          viewType
        } = props;
        const itemIconString = getItemIcon();
        const className = (0, import_classnames11.default)("uppy-ProviderBrowserItem", {
          "uppy-ProviderBrowserItem--selected": isChecked
        }, {
          "uppy-ProviderBrowserItem--disabled": isDisabled
        }, {
          "uppy-ProviderBrowserItem--noPreview": itemIconString === "video"
        });
        const itemIconEl = h(ItemIcon_default, {
          itemIconString
        });
        switch (viewType) {
          case "grid":
            return h(
              GridLi_default,
              _extends5({}, props, {
                className,
                itemIconEl
              })
            );
          case "list":
            return h(ListLi_default, _extends5({}, props, {
              className,
              itemIconEl
            }));
          case "unsplash":
            return h(GridLi_default, _extends5({}, props, {
              className,
              itemIconEl
            }), h("a", {
              href: `${author.url}?utm_source=Companion&utm_medium=referral`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "uppy-ProviderBrowserItem-author"
            }, author.name));
          default:
            throw new Error(`There is no such type ${viewType}`);
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Browser.js
  function Browser(props) {
    const {
      currentSelection,
      folders,
      files,
      uppyFiles,
      viewType,
      headerComponent,
      showBreadcrumbs,
      isChecked,
      toggleCheckbox,
      recordShiftKeyPress,
      handleScroll,
      showTitles,
      i18n,
      validateRestrictions,
      showFilter,
      filterQuery,
      filterInput,
      getNextFolder,
      cancel,
      done,
      columns
    } = props;
    const selected = currentSelection.length;
    return h("div", {
      className: (0, import_classnames12.default)("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${viewType}`)
    }, h("div", {
      className: "uppy-ProviderBrowser-header"
    }, h("div", {
      className: (0, import_classnames12.default)("uppy-ProviderBrowser-headerBar", !showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple")
    }, headerComponent)), showFilter && h(Filter, {
      i18n,
      filterQuery,
      filterInput
    }), (() => {
      if (!folders.length && !files.length) {
        return h("div", {
          className: "uppy-Provider-empty"
        }, i18n("noFilesFound"));
      }
      return h("div", {
        className: "uppy-ProviderBrowser-body"
      }, h("ul", {
        className: "uppy-ProviderBrowser-list",
        onScroll: handleScroll,
        role: "listbox",
        tabIndex: "-1"
      }, folders.map((folder) => {
        var _isChecked;
        return Item_default({
          columns,
          showTitles,
          viewType,
          i18n,
          id: folder.id,
          title: folder.name,
          getItemIcon: () => folder.icon,
          isChecked: isChecked(folder),
          toggleCheckbox: (event) => toggleCheckbox(event, folder),
          recordShiftKeyPress,
          type: "folder",
          isDisabled: (_isChecked = isChecked(folder)) == null ? void 0 : _isChecked.loading,
          isCheckboxDisabled: folder.id === VIRTUAL_SHARED_DIR,
          handleFolderClick: () => getNextFolder(folder)
        });
      }), files.map((file) => {
        const restrictionError = validateRestrictions(remoteFileObjToLocal(file), [...uppyFiles, ...currentSelection]);
        return Item_default({
          id: file.id,
          title: file.name,
          author: file.author,
          getItemIcon: () => file.icon,
          isChecked: isChecked(file),
          toggleCheckbox: (event) => toggleCheckbox(event, file),
          recordShiftKeyPress,
          columns,
          showTitles,
          viewType,
          i18n,
          type: "file",
          isDisabled: restrictionError && !isChecked(file),
          restrictionError
        });
      })));
    })(), selected > 0 && h(FooterActions_default, {
      selected,
      done,
      cancel,
      i18n
    }));
  }
  var import_classnames12, VIRTUAL_SHARED_DIR, Browser_default;
  var init_Browser = __esm({
    "../packages/@uppy/provider-views/lib/Browser.js"() {
      init_preact_module();
      import_classnames12 = __toESM(require_classnames(), 1);
      init_remoteFileObjToLocal();
      init_Filter();
      init_FooterActions();
      init_Item();
      VIRTUAL_SHARED_DIR = "shared-with-me";
      Browser_default = Browser;
    }
  });

  // ../packages/@uppy/provider-views/lib/Loader.js
  var Loader_default;
  var init_Loader = __esm({
    "../packages/@uppy/provider-views/lib/Loader.js"() {
      init_preact_module();
      Loader_default = (_ref) => {
        let {
          i18n
        } = _ref;
        return h("div", {
          className: "uppy-Provider-loading"
        }, h("span", null, i18n("loading")));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/CloseWrapper.js
  var CloseWrapper;
  var init_CloseWrapper = __esm({
    "../packages/@uppy/provider-views/lib/CloseWrapper.js"() {
      init_preact_module();
      CloseWrapper = class extends d {
        componentWillUnmount() {
          const {
            onUnmount
          } = this.props;
          onUnmount();
        }
        render() {
          const {
            children
          } = this.props;
          return x(children)[0];
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/SharedHandler.js
  var SharedHandler;
  var init_SharedHandler = __esm({
    "../packages/@uppy/provider-views/lib/SharedHandler.js"() {
      init_remoteFileObjToLocal();
      SharedHandler = class {
        constructor(plugin) {
          this.plugin = plugin;
          this.filterItems = this.filterItems.bind(this);
          this.toggleCheckbox = this.toggleCheckbox.bind(this);
          this.recordShiftKeyPress = this.recordShiftKeyPress.bind(this);
          this.isChecked = this.isChecked.bind(this);
          this.loaderWrapper = this.loaderWrapper.bind(this);
        }
        filterItems(items) {
          const state = this.plugin.getPluginState();
          if (!state.filterInput || state.filterInput === "") {
            return items;
          }
          return items.filter((folder) => {
            return folder.name.toLowerCase().indexOf(state.filterInput.toLowerCase()) !== -1;
          });
        }
        recordShiftKeyPress(e3) {
          this.isShiftKeyPressed = e3.shiftKey;
        }
        toggleCheckbox(e3, file) {
          e3.stopPropagation();
          e3.preventDefault();
          e3.currentTarget.focus();
          const {
            folders,
            files
          } = this.plugin.getPluginState();
          const items = this.filterItems(folders.concat(files));
          if (this.lastCheckbox && this.isShiftKeyPressed) {
            const prevIndex = items.indexOf(this.lastCheckbox);
            const currentIndex = items.indexOf(file);
            const currentSelection2 = prevIndex < currentIndex ? items.slice(prevIndex, currentIndex + 1) : items.slice(currentIndex, prevIndex + 1);
            const reducedCurrentSelection = [];
            for (const item of currentSelection2) {
              const {
                uppy
              } = this.plugin;
              const restrictionError = uppy.validateRestrictions(remoteFileObjToLocal(item), [...uppy.getFiles(), ...reducedCurrentSelection]);
              if (!restrictionError) {
                reducedCurrentSelection.push(item);
              } else {
                uppy.info({
                  message: restrictionError.message
                }, "error", uppy.opts.infoTimeout);
              }
            }
            this.plugin.setPluginState({
              currentSelection: reducedCurrentSelection
            });
            return;
          }
          this.lastCheckbox = file;
          const {
            currentSelection
          } = this.plugin.getPluginState();
          if (this.isChecked(file)) {
            this.plugin.setPluginState({
              currentSelection: currentSelection.filter((item) => item.id !== file.id)
            });
          } else {
            this.plugin.setPluginState({
              currentSelection: currentSelection.concat([file])
            });
          }
        }
        isChecked(file) {
          const {
            currentSelection
          } = this.plugin.getPluginState();
          return currentSelection.some((item) => item.id === file.id);
        }
        loaderWrapper(promise, then, catch_) {
          promise.then((result2) => {
            this.plugin.setPluginState({
              loading: false
            });
            then(result2);
          }).catch((err) => {
            this.plugin.setPluginState({
              loading: false
            });
            catch_(err);
          });
          this.plugin.setPluginState({
            loading: true
          });
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/View.js
  var View;
  var init_View = __esm({
    "../packages/@uppy/provider-views/lib/View.js"() {
      init_getFileType();
      init_isPreviewSupported();
      init_generateFileID();
      init_SharedHandler();
      View = class {
        constructor(plugin, opts) {
          this.plugin = plugin;
          this.provider = opts.provider;
          this.sharedHandler = new SharedHandler(plugin);
          this.isHandlingScroll = false;
          this.preFirstRender = this.preFirstRender.bind(this);
          this.handleError = this.handleError.bind(this);
          this.addFile = this.addFile.bind(this);
          this.clearSelection = this.clearSelection.bind(this);
          this.cancelPicking = this.cancelPicking.bind(this);
        }
        providerFileToId(file) {
          return generateFileID({
            data: file,
            name: file.name || file.id,
            type: file.mimetype
          });
        }
        preFirstRender() {
          this.plugin.setPluginState({
            didFirstRender: true
          });
          this.plugin.onFirstRender();
        }
        shouldHandleScroll(event) {
          const {
            scrollHeight,
            scrollTop,
            offsetHeight
          } = event.target;
          const scrollPosition = scrollHeight - (scrollTop + offsetHeight);
          return scrollPosition < 50 && !this.isHandlingScroll;
        }
        clearSelection() {
          this.plugin.setPluginState({
            currentSelection: [],
            filterInput: ""
          });
        }
        cancelPicking() {
          this.clearSelection();
          const dashboard = this.plugin.uppy.getPlugin("Dashboard");
          if (dashboard) {
            dashboard.hideAllPanels();
          }
        }
        handleError(error) {
          const {
            uppy
          } = this.plugin;
          const message = uppy.i18n("companionError");
          uppy.log(error.toString());
          if (error.isAuthError) {
            return;
          }
          uppy.info({
            message,
            details: error.toString()
          }, "error", 5e3);
        }
        addFile(file) {
          const tagFile = {
            id: this.providerFileToId(file),
            source: this.plugin.id,
            data: file,
            name: file.name || file.id,
            type: file.mimeType,
            isRemote: true,
            meta: {},
            body: {
              fileId: file.id
            },
            remote: {
              companionUrl: this.plugin.opts.companionUrl,
              url: `${this.provider.fileUrl(file.requestPath)}`,
              body: {
                fileId: file.id
              },
              providerOptions: this.provider.opts,
              providerName: this.provider.name
            }
          };
          const fileType = getFileType(tagFile);
          if (fileType && isPreviewSupported(fileType)) {
            tagFile.preview = file.thumbnail;
          }
          if (file.author) {
            if (file.author.name != null)
              tagFile.meta.authorName = String(file.author.name);
            if (file.author.url)
              tagFile.meta.authorUrl = file.author.url;
          }
          this.plugin.uppy.log("Adding remote file");
          try {
            this.plugin.uppy.addFile(tagFile);
            return true;
          } catch (err) {
            if (!err.isRestriction) {
              this.plugin.uppy.log(err);
            }
            return false;
          }
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/ProviderView.js
  function _classPrivateFieldLooseBase16(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey16(name) {
    return "__private_" + id16++ + "_" + name;
  }
  function getOrigin() {
    return location.origin;
  }
  function getRegex(value2) {
    if (typeof value2 === "string") {
      return new RegExp(`^${value2}$`);
    }
    if (value2 instanceof RegExp) {
      return value2;
    }
    return void 0;
  }
  function isOriginAllowed(origin, allowedOrigin) {
    const patterns = Array.isArray(allowedOrigin) ? allowedOrigin.map(getRegex) : [getRegex(allowedOrigin)];
    return patterns.some((pattern) => (pattern == null ? void 0 : pattern.test(origin)) || (pattern == null ? void 0 : pattern.test(`${origin}/`)));
  }
  function _updateFilesAndFolders2(res, files, folders) {
    this.nextPagePath = res.nextPagePath;
    res.items.forEach((item) => {
      if (item.isFolder) {
        folders.push(item);
      } else {
        files.push(item);
      }
    });
    this.plugin.setPluginState({
      folders,
      files
    });
  }
  var id16, packageJson11, _updateFilesAndFolders, ProviderView;
  var init_ProviderView = __esm({
    "../packages/@uppy/provider-views/lib/ProviderView/ProviderView.js"() {
      init_preact_module();
      init_AuthView();
      init_Header();
      init_Browser();
      init_Loader();
      init_CloseWrapper();
      init_View();
      id16 = 0;
      packageJson11 = {
        "version": "3.0.0-beta.3"
      };
      _updateFilesAndFolders = /* @__PURE__ */ _classPrivateFieldLooseKey16("updateFilesAndFolders");
      ProviderView = class extends View {
        constructor(plugin, opts) {
          super(plugin, opts);
          Object.defineProperty(this, _updateFilesAndFolders, {
            value: _updateFilesAndFolders2
          });
          const defaultOptions4 = {
            viewType: "list",
            showTitles: true,
            showFilter: true,
            showBreadcrumbs: true
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.filterQuery = this.filterQuery.bind(this);
          this.getFolder = this.getFolder.bind(this);
          this.getNextFolder = this.getNextFolder.bind(this);
          this.logout = this.logout.bind(this);
          this.handleAuth = this.handleAuth.bind(this);
          this.handleScroll = this.handleScroll.bind(this);
          this.listAllFiles = this.listAllFiles.bind(this);
          this.donePicking = this.donePicking.bind(this);
          this.render = this.render.bind(this);
          this.plugin.setPluginState({
            authenticated: false,
            files: [],
            folders: [],
            directories: [],
            filterInput: "",
            isSearchVisible: false,
            currentSelection: []
          });
        }
        tearDown() {
        }
        getFolder(id21, name) {
          return this.sharedHandler.loaderWrapper(this.provider.list(id21), (res) => {
            const folders = [];
            const files = [];
            let updatedDirectories;
            const state = this.plugin.getPluginState();
            const index = state.directories.findIndex((dir) => id21 === dir.id);
            if (index !== -1) {
              updatedDirectories = state.directories.slice(0, index + 1);
            } else {
              updatedDirectories = state.directories.concat([{
                id: id21,
                title: name
              }]);
            }
            this.username = res.username || this.username;
            _classPrivateFieldLooseBase16(this, _updateFilesAndFolders)[_updateFilesAndFolders](res, files, folders);
            this.plugin.setPluginState({
              directories: updatedDirectories,
              filterInput: ""
            });
          }, this.handleError);
        }
        getNextFolder(folder) {
          this.getFolder(folder.requestPath, folder.name);
          this.lastCheckbox = void 0;
        }
        logout() {
          this.provider.logout().then((res) => {
            if (res.ok) {
              if (!res.revoked) {
                const message = this.plugin.uppy.i18n("companionUnauthorizeHint", {
                  provider: this.plugin.title,
                  url: res.manual_revoke_url
                });
                this.plugin.uppy.info(message, "info", 7e3);
              }
              const newState = {
                authenticated: false,
                files: [],
                folders: [],
                directories: [],
                filterInput: ""
              };
              this.plugin.setPluginState(newState);
            }
          }).catch(this.handleError);
        }
        filterQuery(e3) {
          const state = this.plugin.getPluginState();
          this.plugin.setPluginState({
            ...state,
            filterInput: e3 ? e3.target.value : ""
          });
        }
        addFolder(folder) {
          const folderId = this.providerFileToId(folder);
          const folders = {
            ...this.plugin.getPluginState().selectedFolders
          };
          if (folderId in folders && folders[folderId].loading) {
            return;
          }
          folders[folderId] = {
            loading: true,
            files: []
          };
          this.plugin.setPluginState({
            selectedFolders: {
              ...folders
            }
          });
          return this.listAllFiles(folder.requestPath).then((files) => {
            let count = 0;
            files.forEach((file) => {
              const id21 = this.providerFileToId(file);
              if (!this.plugin.uppy.checkIfFileAlreadyExists(id21)) {
                count++;
              }
            });
            if (count > 0) {
              files.forEach((file) => this.addFile(file));
            }
            const ids = files.map(this.providerFileToId);
            folders[folderId] = {
              loading: false,
              files: ids
            };
            this.plugin.setPluginState({
              selectedFolders: folders,
              filterInput: ""
            });
            let message;
            if (count === 0) {
              message = this.plugin.uppy.i18n("folderAlreadyAdded", {
                folder: folder.name
              });
            } else if (files.length) {
              message = this.plugin.uppy.i18n("folderAdded", {
                smart_count: count,
                folder: folder.name
              });
            } else {
              message = this.plugin.uppy.i18n("emptyFolderAdded");
            }
            this.plugin.uppy.info(message);
          }).catch((e3) => {
            const selectedFolders = {
              ...this.plugin.getPluginState().selectedFolders
            };
            delete selectedFolders[folderId];
            this.plugin.setPluginState({
              selectedFolders
            });
            this.handleError(e3);
          });
        }
        async handleAuth() {
          await this.provider.ensurePreAuth();
          const authState = btoa(JSON.stringify({
            origin: getOrigin()
          }));
          const clientVersion = `@uppy/provider-views=${ProviderView.VERSION}`;
          const link = this.provider.authUrl({
            state: authState,
            uppyVersions: clientVersion
          });
          const authWindow = window.open(link, "_blank");
          const handleToken = (e3) => {
            if (e3.source !== authWindow) {
              this.plugin.uppy.log("rejecting event from unknown source");
              return;
            }
            if (!isOriginAllowed(e3.origin, this.plugin.opts.companionAllowedHosts) || e3.source !== authWindow) {
              this.plugin.uppy.log(`rejecting event from ${e3.origin} vs allowed pattern ${this.plugin.opts.companionAllowedHosts}`);
            }
            const data = typeof e3.data === "string" ? JSON.parse(e3.data) : e3.data;
            if (data.error) {
              this.plugin.uppy.log("auth aborted", "warning");
              const {
                uppy
              } = this.plugin;
              const message = uppy.i18n("authAborted");
              uppy.info({
                message
              }, "warning", 5e3);
              return;
            }
            if (!data.token) {
              this.plugin.uppy.log("did not receive token from auth window", "error");
              return;
            }
            authWindow.close();
            window.removeEventListener("message", handleToken);
            this.provider.setAuthToken(data.token);
            this.preFirstRender();
          };
          window.addEventListener("message", handleToken);
        }
        async handleScroll(event) {
          const path = this.nextPagePath || null;
          if (this.shouldHandleScroll(event) && path) {
            this.isHandlingScroll = true;
            try {
              const response = await this.provider.list(path);
              const {
                files,
                folders
              } = this.plugin.getPluginState();
              _classPrivateFieldLooseBase16(this, _updateFilesAndFolders)[_updateFilesAndFolders](response, files, folders);
            } catch (error) {
              this.handleError(error);
            } finally {
              this.isHandlingScroll = false;
            }
          }
        }
        async listAllFiles(path, files) {
          if (files === void 0) {
            files = null;
          }
          files = files || [];
          const res = await this.provider.list(path);
          res.items.forEach((item) => {
            if (!item.isFolder) {
              files.push(item);
            } else {
              this.addFolder(item);
            }
          });
          const moreFiles = res.nextPagePath;
          if (moreFiles) {
            return this.listAllFiles(moreFiles, files);
          }
          return files;
        }
        donePicking() {
          const {
            currentSelection
          } = this.plugin.getPluginState();
          const promises = currentSelection.map((file) => {
            if (file.isFolder) {
              return this.addFolder(file);
            }
            return this.addFile(file);
          });
          this.sharedHandler.loaderWrapper(Promise.all(promises), () => {
            this.clearSelection();
          }, () => {
          });
        }
        render(state, viewOptions) {
          var _this = this;
          if (viewOptions === void 0) {
            viewOptions = {};
          }
          const {
            authenticated,
            didFirstRender
          } = this.plugin.getPluginState();
          if (!didFirstRender) {
            this.preFirstRender();
          }
          const targetViewOptions = {
            ...this.opts,
            ...viewOptions
          };
          const {
            files,
            folders,
            filterInput,
            loading,
            currentSelection
          } = this.plugin.getPluginState();
          const {
            isChecked,
            toggleCheckbox,
            recordShiftKeyPress,
            filterItems
          } = this.sharedHandler;
          const hasInput = filterInput !== "";
          const headerProps = {
            showBreadcrumbs: targetViewOptions.showBreadcrumbs,
            getFolder: this.getFolder,
            directories: this.plugin.getPluginState().directories,
            pluginIcon: this.plugin.icon,
            title: this.plugin.title,
            logout: this.logout,
            username: this.username,
            i18n: this.plugin.uppy.i18n
          };
          const browserProps = {
            isChecked,
            toggleCheckbox,
            recordShiftKeyPress,
            currentSelection,
            files: hasInput ? filterItems(files) : files,
            folders: hasInput ? filterItems(folders) : folders,
            username: this.username,
            getNextFolder: this.getNextFolder,
            getFolder: this.getFolder,
            filterItems: this.sharedHandler.filterItems,
            filterQuery: this.filterQuery,
            logout: this.logout,
            handleScroll: this.handleScroll,
            listAllFiles: this.listAllFiles,
            done: this.donePicking,
            cancel: this.cancelPicking,
            headerComponent: Header_default(headerProps),
            title: this.plugin.title,
            viewType: targetViewOptions.viewType,
            showTitles: targetViewOptions.showTitles,
            showFilter: targetViewOptions.showFilter,
            showBreadcrumbs: targetViewOptions.showBreadcrumbs,
            pluginIcon: this.plugin.icon,
            i18n: this.plugin.uppy.i18n,
            uppyFiles: this.plugin.uppy.getFiles(),
            validateRestrictions: function() {
              return _this.plugin.uppy.validateRestrictions(...arguments);
            }
          };
          if (loading) {
            return h(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h(Loader_default, {
              i18n: this.plugin.uppy.i18n
            }));
          }
          if (!authenticated) {
            return h(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h(AuthView_default, {
              pluginName: this.plugin.title,
              pluginIcon: this.plugin.icon,
              handleAuth: this.handleAuth,
              i18n: this.plugin.uppy.i18n,
              i18nArray: this.plugin.uppy.i18nArray
            }));
          }
          return h(CloseWrapper, {
            onUnmount: this.clearSelection
          }, h(Browser_default, browserProps));
        }
      };
      ProviderView.VERSION = packageJson11.version;
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/index.js
  var init_ProviderView2 = __esm({
    "../packages/@uppy/provider-views/lib/ProviderView/index.js"() {
      init_ProviderView();
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/InputView.js
  var InputView_default;
  var init_InputView = __esm({
    "../packages/@uppy/provider-views/lib/SearchProviderView/InputView.js"() {
      init_preact_module();
      InputView_default = (_ref) => {
        let {
          i18n,
          search
        } = _ref;
        let input;
        const validateAndSearch = () => {
          if (input.value) {
            search(input.value);
          }
        };
        const handleKeyPress = (ev) => {
          if (ev.keyCode === 13) {
            validateAndSearch();
          }
        };
        return h("div", {
          className: "uppy-SearchProvider"
        }, h("input", {
          className: "uppy-u-reset uppy-c-textInput uppy-SearchProvider-input",
          type: "search",
          "aria-label": i18n("enterTextToSearch"),
          placeholder: i18n("enterTextToSearch"),
          onKeyUp: handleKeyPress,
          ref: (input_) => {
            input = input_;
          },
          "data-uppy-super-focusable": true
        }), h("button", {
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-SearchProvider-searchButton",
          type: "button",
          onClick: validateAndSearch
        }, i18n("searchImages")));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/Header.js
  var SUBMIT_KEY, Header_default2;
  var init_Header2 = __esm({
    "../packages/@uppy/provider-views/lib/SearchProviderView/Header.js"() {
      init_preact_module();
      SUBMIT_KEY = 13;
      Header_default2 = (props) => {
        const {
          searchTerm,
          i18n,
          search
        } = props;
        const handleKeyPress = (ev) => {
          if (ev.keyCode === SUBMIT_KEY) {
            ev.stopPropagation();
            ev.preventDefault();
            search(ev.target.value);
          }
        };
        return h("div", {
          class: "uppy-ProviderBrowser-search"
        }, h("input", {
          class: "uppy-u-reset uppy-ProviderBrowser-searchInput",
          type: "text",
          placeholder: i18n("search"),
          "aria-label": i18n("search"),
          value: searchTerm,
          onKeyUp: handleKeyPress,
          "data-uppy-super-focusable": true
        }), h("svg", {
          "aria-hidden": "true",
          focusable: "false",
          class: "uppy-c-icon uppy-ProviderBrowser-searchIcon",
          width: "12",
          height: "12",
          viewBox: "0 0 12 12"
        }, h("path", {
          d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
        })));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/SearchProviderView.js
  function _classPrivateFieldLooseBase17(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey17(name) {
    return "__private_" + id17++ + "_" + name;
  }
  function _updateFilesAndInputMode2(res, files) {
    this.nextPageQuery = res.nextPageQuery;
    res.items.forEach((item) => {
      files.push(item);
    });
    this.plugin.setPluginState({
      isInputMode: false,
      files,
      searchTerm: res.searchedFor
    });
  }
  var id17, packageJson12, _updateFilesAndInputMode, SearchProviderView;
  var init_SearchProviderView = __esm({
    "../packages/@uppy/provider-views/lib/SearchProviderView/SearchProviderView.js"() {
      init_preact_module();
      init_InputView();
      init_Browser();
      init_Loader();
      init_Header2();
      init_CloseWrapper();
      init_View();
      id17 = 0;
      packageJson12 = {
        "version": "3.0.0-beta.3"
      };
      _updateFilesAndInputMode = /* @__PURE__ */ _classPrivateFieldLooseKey17("updateFilesAndInputMode");
      SearchProviderView = class extends View {
        constructor(plugin, opts) {
          super(plugin, opts);
          Object.defineProperty(this, _updateFilesAndInputMode, {
            value: _updateFilesAndInputMode2
          });
          const defaultOptions4 = {
            viewType: "grid",
            showTitles: false,
            showFilter: false,
            showBreadcrumbs: false
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.search = this.search.bind(this);
          this.triggerSearchInput = this.triggerSearchInput.bind(this);
          this.addFile = this.addFile.bind(this);
          this.handleScroll = this.handleScroll.bind(this);
          this.donePicking = this.donePicking.bind(this);
          this.render = this.render.bind(this);
          this.plugin.setPluginState({
            isInputMode: true,
            files: [],
            folders: [],
            directories: [],
            filterInput: "",
            currentSelection: [],
            searchTerm: null
          });
        }
        tearDown() {
        }
        clearSelection() {
          this.plugin.setPluginState({
            currentSelection: [],
            isInputMode: true,
            files: [],
            searchTerm: null
          });
        }
        search(query) {
          const {
            searchTerm
          } = this.plugin.getPluginState();
          if (query && query === searchTerm) {
            return void 0;
          }
          return this.sharedHandler.loaderWrapper(this.provider.search(query), (res) => {
            _classPrivateFieldLooseBase17(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](res, []);
          }, this.handleError);
        }
        triggerSearchInput() {
          this.plugin.setPluginState({
            isInputMode: true
          });
        }
        async handleScroll(event) {
          const query = this.nextPageQuery || null;
          if (this.shouldHandleScroll(event) && query) {
            this.isHandlingScroll = true;
            try {
              const {
                files,
                searchTerm
              } = this.plugin.getPluginState();
              const response = await this.provider.search(searchTerm, query);
              _classPrivateFieldLooseBase17(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](response, files);
            } catch (error) {
              this.handleError(error);
            } finally {
              this.isHandlingScroll = false;
            }
          }
        }
        donePicking() {
          const {
            currentSelection
          } = this.plugin.getPluginState();
          const promises = currentSelection.map((file) => this.addFile(file));
          this.sharedHandler.loaderWrapper(Promise.all(promises), () => {
            this.clearSelection();
          }, () => {
          });
        }
        render(state, viewOptions) {
          var _this = this;
          if (viewOptions === void 0) {
            viewOptions = {};
          }
          const {
            didFirstRender,
            isInputMode,
            searchTerm
          } = this.plugin.getPluginState();
          if (!didFirstRender) {
            this.preFirstRender();
          }
          const targetViewOptions = {
            ...this.opts,
            ...viewOptions
          };
          const {
            files,
            folders,
            filterInput,
            loading,
            currentSelection
          } = this.plugin.getPluginState();
          const {
            isChecked,
            toggleCheckbox,
            filterItems
          } = this.sharedHandler;
          const hasInput = filterInput !== "";
          const browserProps = {
            isChecked,
            toggleCheckbox,
            currentSelection,
            files: hasInput ? filterItems(files) : files,
            folders: hasInput ? filterItems(folders) : folders,
            handleScroll: this.handleScroll,
            done: this.donePicking,
            cancel: this.cancelPicking,
            headerComponent: Header_default2({
              search: this.search,
              i18n: this.plugin.uppy.i18n,
              searchTerm
            }),
            title: this.plugin.title,
            viewType: targetViewOptions.viewType,
            showTitles: targetViewOptions.showTitles,
            showFilter: targetViewOptions.showFilter,
            showBreadcrumbs: targetViewOptions.showBreadcrumbs,
            pluginIcon: this.plugin.icon,
            i18n: this.plugin.uppy.i18n,
            uppyFiles: this.plugin.uppy.getFiles(),
            validateRestrictions: function() {
              return _this.plugin.uppy.validateRestrictions(...arguments);
            }
          };
          if (loading) {
            return h(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h(Loader_default, {
              i18n: this.plugin.uppy.i18n
            }));
          }
          if (isInputMode) {
            return h(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h(InputView_default, {
              search: this.search,
              i18n: this.plugin.uppy.i18n
            }));
          }
          return h(CloseWrapper, {
            onUnmount: this.clearSelection
          }, h(Browser_default, browserProps));
        }
      };
      SearchProviderView.VERSION = packageJson12.version;
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/index.js
  var init_SearchProviderView2 = __esm({
    "../packages/@uppy/provider-views/lib/SearchProviderView/index.js"() {
      init_SearchProviderView();
    }
  });

  // ../packages/@uppy/provider-views/lib/index.js
  var init_lib11 = __esm({
    "../packages/@uppy/provider-views/lib/index.js"() {
      init_ProviderView2();
      init_SearchProviderView2();
    }
  });

  // ../packages/@uppy/dropbox/lib/locale.js
  var locale_default6;
  var init_locale6 = __esm({
    "../packages/@uppy/dropbox/lib/locale.js"() {
      locale_default6 = {
        strings: {
          pluginNameDropbox: "Dropbox"
        }
      };
    }
  });

  // ../packages/@uppy/dropbox/lib/Dropbox.js
  var packageJson13, Dropbox;
  var init_Dropbox = __esm({
    "../packages/@uppy/dropbox/lib/Dropbox.js"() {
      init_lib2();
      init_lib8();
      init_lib11();
      init_preact_module();
      init_locale6();
      packageJson13 = {
        "version": "3.0.0-beta.2"
      };
      Dropbox = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Dropbox";
          Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Dropbox";
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#0D2481",
            width: "32",
            height: "32",
            rx: "16"
          }), h("path", {
            d: "M11 8l5 3.185-5 3.186-5-3.186L11 8zm10 0l5 3.185-5 3.186-5-3.186L21 8zM6 17.556l5-3.185 5 3.185-5 3.186-5-3.186zm15-3.185l5 3.185-5 3.186-5-3.186 5-3.185zm-10 7.432l5-3.185 5 3.185-5 3.186-5-3.186z",
            fill: "#FFF",
            fillRule: "nonzero"
          })));
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "dropbox",
            pluginId: this.id
          });
          this.defaultLocale = locale_default6;
          this.i18nInit();
          this.title = this.i18n("pluginNameDropbox");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderView(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
        }
        render(state) {
          return this.view.render(state);
        }
      };
      Dropbox.VERSION = packageJson13.version;
    }
  });

  // ../packages/@uppy/dropbox/lib/index.js
  var lib_exports6 = {};
  __export(lib_exports6, {
    default: () => Dropbox
  });
  var init_lib12 = __esm({
    "../packages/@uppy/dropbox/lib/index.js"() {
      init_Dropbox();
    }
  });

  // ../packages/@uppy/google-drive/lib/DriveProviderViews.js
  var DriveProviderViews;
  var init_DriveProviderViews = __esm({
    "../packages/@uppy/google-drive/lib/DriveProviderViews.js"() {
      init_lib11();
      DriveProviderViews = class extends ProviderView {
        toggleCheckbox(e3, file) {
          e3.stopPropagation();
          e3.preventDefault();
          if (!file.custom.isSharedDrive) {
            super.toggleCheckbox(e3, file);
          }
        }
      };
    }
  });

  // ../packages/@uppy/google-drive/lib/locale.js
  var locale_default7;
  var init_locale7 = __esm({
    "../packages/@uppy/google-drive/lib/locale.js"() {
      locale_default7 = {
        strings: {
          pluginNameGoogleDrive: "Google Drive"
        }
      };
    }
  });

  // ../packages/@uppy/google-drive/lib/GoogleDrive.js
  var packageJson14, GoogleDrive;
  var init_GoogleDrive = __esm({
    "../packages/@uppy/google-drive/lib/GoogleDrive.js"() {
      init_lib2();
      init_lib8();
      init_preact_module();
      init_DriveProviderViews();
      init_locale7();
      packageJson14 = {
        "version": "3.0.0-beta.2"
      };
      GoogleDrive = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "GoogleDrive";
          this.title = this.opts.title || "Google Drive";
          Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Google Drive";
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#4285F4",
            width: "32",
            height: "32",
            rx: "16"
          }), h("path", {
            d: "M25.216 17.736L19.043 7h-6.086l6.175 10.736h6.084zm-11.275.896L10.9 24h11.723l3.04-5.368H13.942zm-1.789-10.29l-5.816 10.29L9.38 24l5.905-10.29-3.132-5.369z",
            fill: "#FFF"
          })));
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "drive",
            pluginId: this.id
          });
          this.defaultLocale = locale_default7;
          this.i18nInit();
          this.title = this.i18n("pluginNameGoogleDrive");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new DriveProviderViews(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("root", "/")]);
        }
        render(state) {
          return this.view.render(state);
        }
      };
      GoogleDrive.VERSION = packageJson14.version;
    }
  });

  // ../packages/@uppy/google-drive/lib/index.js
  var lib_exports7 = {};
  __export(lib_exports7, {
    default: () => GoogleDrive
  });
  var init_lib13 = __esm({
    "../packages/@uppy/google-drive/lib/index.js"() {
      init_GoogleDrive();
    }
  });

  // ../packages/@uppy/instagram/lib/locale.js
  var locale_default8;
  var init_locale8 = __esm({
    "../packages/@uppy/instagram/lib/locale.js"() {
      locale_default8 = {
        strings: {
          pluginNameInstagram: "Instagram"
        }
      };
    }
  });

  // ../packages/@uppy/instagram/lib/Instagram.js
  var packageJson15, Instagram;
  var init_Instagram = __esm({
    "../packages/@uppy/instagram/lib/Instagram.js"() {
      init_preact_module();
      init_lib2();
      init_lib8();
      init_lib11();
      init_locale8();
      packageJson15 = {
        "version": "3.0.0-beta.2"
      };
      Instagram = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Instagram";
          Provider.initPlugin(this, opts);
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#E1306C",
            width: "32",
            height: "32",
            rx: "16"
          }), h("path", {
            d: "M16 8.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.392.144.745.374 1.036.673.299.29.529.644.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.671a2.98 2.98 0 0 1-1.708 1.708c-.317.123-.794.27-1.671.31-.95.043-1.234.053-3.637.053s-2.688-.01-3.637-.053c-.877-.04-1.354-.187-1.671-.31a2.788 2.788 0 0 1-1.035-.673 2.788 2.788 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.949-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.144-.392.374-.745.673-1.036.29-.299.644-.529 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052zM16 7c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.419-.6.225-1.145.58-1.594 1.038-.458.45-.813.993-1.039 1.594-.222.572-.374 1.226-.418 2.184C7.01 13.25 7 13.556 7 16s.01 2.75.054 3.71c.044.959.196 1.613.419 2.185.226.6.58 1.145 1.038 1.594.45.458.993.813 1.594 1.038.572.223 1.227.375 2.184.419.96.044 1.267.054 3.711.054s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.602 4.602 0 0 0 2.632-2.632c.223-.572.375-1.226.419-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 23.49 8.51a4.412 4.412 0 0 0-1.594-1.039c-.572-.222-1.226-.374-2.184-.418C18.75 7.01 18.444 7 16 7zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.421a2.921 2.921 0 1 1 0-5.842 2.921 2.921 0 0 1 0 5.842zm4.875-6.671a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25z",
            fill: "#FFF"
          })));
          this.defaultLocale = locale_default8;
          this.i18nInit();
          this.title = this.i18n("pluginNameInstagram");
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "instagram",
            pluginId: this.id
          });
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderView(this, {
            provider: this.provider,
            viewType: "grid",
            showTitles: false,
            showFilter: false,
            showBreadcrumbs: false
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("recent")]);
        }
        render(state) {
          return this.view.render(state);
        }
      };
      Instagram.VERSION = packageJson15.version;
    }
  });

  // ../packages/@uppy/instagram/lib/index.js
  var lib_exports8 = {};
  __export(lib_exports8, {
    default: () => Instagram
  });
  var init_lib14 = __esm({
    "../packages/@uppy/instagram/lib/index.js"() {
      init_Instagram();
    }
  });

  // ../packages/@uppy/facebook/lib/locale.js
  var locale_default9;
  var init_locale9 = __esm({
    "../packages/@uppy/facebook/lib/locale.js"() {
      locale_default9 = {
        strings: {
          pluginNameFacebook: "Facebook"
        }
      };
    }
  });

  // ../packages/@uppy/facebook/lib/Facebook.js
  var packageJson16, Facebook;
  var init_Facebook = __esm({
    "../packages/@uppy/facebook/lib/Facebook.js"() {
      init_lib2();
      init_lib8();
      init_lib11();
      init_preact_module();
      init_locale9();
      packageJson16 = {
        "version": "3.0.0-beta.2"
      };
      Facebook = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Facebook";
          Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Facebook";
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h("rect", {
            className: "uppy-ProviderIconBg",
            width: "32",
            height: "32",
            rx: "16",
            fill: "#3C5A99"
          }), h("path", {
            d: "M17.842 26v-8.667h2.653l.398-3.377h-3.051v-2.157c0-.978.248-1.644 1.527-1.644H21V7.132A19.914 19.914 0 0 0 18.623 7c-2.352 0-3.963 1.574-3.963 4.465v2.49H12v3.378h2.66V26h3.182z",
            fill: "#FFF",
            fillRule: "nonzero"
          })));
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "facebook",
            pluginId: this.id
          });
          this.defaultLocale = locale_default9;
          this.i18nInit();
          this.title = this.i18n("pluginNameFacebook");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderView(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
        }
        render(state) {
          const viewOptions = {};
          if (this.getPluginState().files.length && !this.getPluginState().folders.length) {
            viewOptions.viewType = "grid";
            viewOptions.showFilter = false;
            viewOptions.showTitles = false;
          }
          return this.view.render(state, viewOptions);
        }
      };
      Facebook.VERSION = packageJson16.version;
    }
  });

  // ../packages/@uppy/facebook/lib/index.js
  var lib_exports9 = {};
  __export(lib_exports9, {
    default: () => Facebook
  });
  var init_lib15 = __esm({
    "../packages/@uppy/facebook/lib/index.js"() {
      init_Facebook();
    }
  });

  // ../packages/@uppy/onedrive/lib/locale.js
  var locale_default10;
  var init_locale10 = __esm({
    "../packages/@uppy/onedrive/lib/locale.js"() {
      locale_default10 = {
        strings: {
          pluginNameOneDrive: "OneDrive"
        }
      };
    }
  });

  // ../packages/@uppy/onedrive/lib/OneDrive.js
  var packageJson17, OneDrive;
  var init_OneDrive = __esm({
    "../packages/@uppy/onedrive/lib/OneDrive.js"() {
      init_preact_module();
      init_lib2();
      init_lib8();
      init_lib11();
      init_locale10();
      packageJson17 = {
        "version": "3.0.0-beta.2"
      };
      OneDrive = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "OneDrive";
          Provider.initPlugin(this, opts);
          this.title = this.opts.title || "OneDrive";
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h("rect", {
            className: "uppy-ProviderIconBg",
            width: "32",
            height: "32",
            rx: "16",
            fill: "#0262C0"
          }), h("g", {
            fill: "#FFF",
            fillRule: "nonzero"
          }, h("path", {
            d: "M24.157 22s1.492-.205 1.79-1.655a2.624 2.624 0 0 0 .03-.878c-.22-1.64-1.988-2.01-1.988-2.01s.307-1.765-1.312-2.69c-1.62-.925-3.1 0-3.1 0S18.711 13 16.366 13c-3.016 0-3.519 3.448-3.519 3.448S10 16.618 10 19.14c0 2.523 2.597 2.86 2.597 2.86h11.56z"
          }), h("path", {
            d: "M9.421 19.246c0-2.197 1.606-3.159 2.871-3.472.44-1.477 1.654-3.439 4.135-3.439H16.445c1.721 0 2.79.823 3.368 1.476a3.99 3.99 0 0 1 1.147-.171h.01l.03.002C21.017 13.5 20.691 10 16.757 10c-2.69 0-3.639 2.345-3.639 2.345s-1.95-1.482-3.955.567c-1.028 1.052-.79 2.669-.79 2.669S6 15.824 6 18.412C6 20.757 8.452 21 8.452 21h1.372a3.77 3.77 0 0 1-.403-1.754z"
          }))));
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "onedrive",
            pluginId: this.id
          });
          this.defaultLocale = locale_default10;
          this.i18nInit();
          this.title = this.i18n("pluginNameOneDrive");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderView(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
        }
        render(state) {
          return this.view.render(state);
        }
      };
      OneDrive.VERSION = packageJson17.version;
    }
  });

  // ../packages/@uppy/onedrive/lib/index.js
  var lib_exports10 = {};
  __export(lib_exports10, {
    default: () => OneDrive
  });
  var init_lib16 = __esm({
    "../packages/@uppy/onedrive/lib/index.js"() {
      init_OneDrive();
    }
  });

  // ../packages/@uppy/box/lib/locale.js
  var locale_default11;
  var init_locale11 = __esm({
    "../packages/@uppy/box/lib/locale.js"() {
      locale_default11 = {
        strings: {
          pluginNameBox: "Box"
        }
      };
    }
  });

  // ../packages/@uppy/box/lib/Box.js
  var packageJson18, Box;
  var init_Box = __esm({
    "../packages/@uppy/box/lib/Box.js"() {
      init_lib2();
      init_lib8();
      init_lib11();
      init_preact_module();
      init_locale11();
      packageJson18 = {
        "version": "2.0.0-beta.2"
      };
      Box = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Box";
          Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Box";
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#0061D5",
            width: "32",
            height: "32",
            rx: "16"
          }), h("g", {
            fill: "#fff",
            fillRule: "nonzero"
          }, h("path", {
            d: "m16.4 13.5c-1.6 0-3 0.9-3.7 2.2-0.7-1.3-2.1-2.2-3.7-2.2-1 0-1.8 0.3-2.5 0.8v-3.6c-0.1-0.3-0.5-0.7-1-0.7s-0.8 0.4-0.8 0.8v7c0 2.3 1.9 4.2 4.2 4.2 1.6 0 3-0.9 3.7-2.2 0.7 1.3 2.1 2.2 3.7 2.2 2.3 0 4.2-1.9 4.2-4.2 0.1-2.4-1.8-4.3-4.1-4.3m-7.5 6.8c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5m7.5 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5"
          }), h("path", {
            d: "m27.2 20.6l-2.3-2.8 2.3-2.8c0.3-0.4 0.2-0.9-0.2-1.2s-1-0.2-1.3 0.2l-2 2.4-2-2.4c-0.3-0.4-0.9-0.4-1.3-0.2-0.4 0.3-0.5 0.8-0.2 1.2l2.3 2.8-2.3 2.8c-0.3 0.4-0.2 0.9 0.2 1.2s1 0.2 1.3-0.2l2-2.4 2 2.4c0.3 0.4 0.9 0.4 1.3 0.2 0.4-0.3 0.4-0.8 0.2-1.2"
          }))));
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "box",
            pluginId: this.id
          });
          this.defaultLocale = locale_default11;
          this.i18nInit();
          this.title = this.i18n("pluginNameBox");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderView(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return this.view.getFolder();
        }
        render(state) {
          return this.view.render(state);
        }
      };
      Box.VERSION = packageJson18.version;
    }
  });

  // ../packages/@uppy/box/lib/index.js
  var lib_exports11 = {};
  __export(lib_exports11, {
    default: () => Box
  });
  var init_lib17 = __esm({
    "../packages/@uppy/box/lib/index.js"() {
      init_Box();
    }
  });

  // ../packages/@uppy/unsplash/lib/Unsplash.js
  var packageJson19, Unsplash;
  var init_Unsplash = __esm({
    "../packages/@uppy/unsplash/lib/Unsplash.js"() {
      init_preact_module();
      init_lib2();
      init_lib8();
      init_lib11();
      packageJson19 = {
        "version": "3.0.0-beta.2"
      };
      Unsplash = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Unsplash";
          this.title = this.opts.title || "Unsplash";
          Provider.initPlugin(this, opts, {});
          this.icon = () => h("svg", {
            viewBox: "0 0 32 32",
            height: "32",
            width: "32",
            "aria-hidden": "true"
          }, h("path", {
            d: "M46.575 10.883v-9h12v9zm12 5h10v18h-32v-18h10v9h12z",
            fill: "#fff"
          }), h("rect", {
            className: "uppy-ProviderIconBg",
            width: "32",
            height: "32",
            rx: "16"
          }), h("path", {
            d: "M13 12.5V8h6v4.5zm6 2.5h5v9H8v-9h5v4.5h6z",
            fill: "#fff"
          }));
          if (!this.opts.companionUrl) {
            throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
          }
          this.hostname = this.opts.companionUrl;
          this.provider = new SearchProvider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "unsplash",
            pluginId: this.id
          });
        }
        install() {
          this.view = new SearchProviderView(this, {
            provider: this.provider,
            viewType: "unsplash"
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        onFirstRender() {
        }
        render(state) {
          return this.view.render(state);
        }
        uninstall() {
          this.unmount();
        }
      };
      Unsplash.VERSION = packageJson19.version;
    }
  });

  // ../packages/@uppy/unsplash/lib/index.js
  var lib_exports12 = {};
  __export(lib_exports12, {
    default: () => Unsplash
  });
  var init_lib18 = __esm({
    "../packages/@uppy/unsplash/lib/index.js"() {
      init_Unsplash();
    }
  });

  // ../packages/@uppy/url/lib/UrlUI.js
  var UrlUI, UrlUI_default;
  var init_UrlUI = __esm({
    "../packages/@uppy/url/lib/UrlUI.js"() {
      init_preact_module();
      UrlUI = class extends d {
        constructor(props) {
          super(props);
          this.handleKeyPress = this.handleKeyPress.bind(this);
          this.handleClick = this.handleClick.bind(this);
        }
        componentDidMount() {
          this.input.value = "";
        }
        handleKeyPress(ev) {
          const {
            addFile
          } = this.props;
          if (ev.keyCode === 13) {
            addFile(this.input.value);
          }
        }
        handleClick() {
          const {
            addFile
          } = this.props;
          addFile(this.input.value);
        }
        render() {
          const {
            i18n
          } = this.props;
          return h("div", {
            className: "uppy-Url"
          }, h("input", {
            className: "uppy-u-reset uppy-c-textInput uppy-Url-input",
            type: "text",
            "aria-label": i18n("enterUrlToImport"),
            placeholder: i18n("enterUrlToImport"),
            onKeyUp: this.handleKeyPress,
            ref: (input) => {
              this.input = input;
            },
            "data-uppy-super-focusable": true
          }), h("button", {
            className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
            type: "button",
            onClick: this.handleClick
          }, i18n("import")));
        }
      };
      UrlUI_default = UrlUI;
    }
  });

  // ../packages/@uppy/url/lib/utils/forEachDroppedOrPastedUrl.js
  function forEachDroppedOrPastedUrl(dataTransfer, isDropOrPaste, callback) {
    const items = toArray_default(dataTransfer.items);
    let urlItems;
    switch (isDropOrPaste) {
      case "paste": {
        const atLeastOneFileIsDragged = items.some((item) => item.kind === "file");
        if (atLeastOneFileIsDragged) {
          return;
        }
        urlItems = items.filter((item) => item.kind === "string" && item.type === "text/plain");
        break;
      }
      case "drop": {
        urlItems = items.filter((item) => item.kind === "string" && item.type === "text/uri-list");
        break;
      }
      default: {
        throw new Error(`isDropOrPaste must be either 'drop' or 'paste', but it's ${isDropOrPaste}`);
      }
    }
    urlItems.forEach((item) => {
      item.getAsString((urlString) => callback(urlString));
    });
  }
  var init_forEachDroppedOrPastedUrl = __esm({
    "../packages/@uppy/url/lib/utils/forEachDroppedOrPastedUrl.js"() {
      init_toArray();
    }
  });

  // ../packages/@uppy/url/lib/locale.js
  var locale_default12;
  var init_locale12 = __esm({
    "../packages/@uppy/url/lib/locale.js"() {
      locale_default12 = {
        strings: {
          import: "Import",
          enterUrlToImport: "Enter URL to import a file",
          failedToFetch: "Companion failed to fetch this URL, please make sure it\u2019s correct",
          enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
        }
      };
    }
  });

  // ../packages/@uppy/url/lib/Url.js
  function UrlIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "32",
      height: "32",
      viewBox: "0 0 32 32"
    }, h("g", {
      fill: "none",
      fillRule: "evenodd"
    }, h("rect", {
      className: "uppy-ProviderIconBg",
      fill: "#FF753E",
      width: "32",
      height: "32",
      rx: "16"
    }), h("path", {
      d: "M22.788 15.389l-2.199 2.19a3.184 3.184 0 0 1-.513.437c-.806.584-1.686.876-2.638.876a4.378 4.378 0 0 1-3.519-1.752c-.22-.292-.146-.802.147-1.021.293-.22.806-.146 1.026.146.953 1.313 2.785 1.532 4.105.583a.571.571 0 0 0 .293-.292l2.199-2.189c1.1-1.167 1.1-2.992-.073-4.086a2.976 2.976 0 0 0-4.105 0l-1.246 1.24a.71.71 0 0 1-1.026 0 .703.703 0 0 1 0-1.022l1.246-1.24a4.305 4.305 0 0 1 6.083 0c1.833 1.605 1.906 4.451.22 6.13zm-7.183 5.035l-1.246 1.24a2.976 2.976 0 0 1-4.105 0c-1.172-1.094-1.172-2.991-.073-4.086l2.2-2.19.292-.291c.66-.438 1.393-.657 2.2-.584.805.146 1.465.51 1.905 1.168.22.292.733.365 1.026.146.293-.22.367-.73.147-1.022-.733-.949-1.76-1.532-2.859-1.678-1.1-.22-2.272.073-3.225.802l-.44.438-2.199 2.19c-1.686 1.75-1.612 4.524.074 6.202.88.803 1.979 1.241 3.078 1.241 1.1 0 2.199-.438 3.079-1.24l1.246-1.241a.703.703 0 0 0 0-1.022c-.294-.292-.807-.365-1.1-.073z",
      fill: "#FFF",
      fillRule: "nonzero"
    })));
  }
  function addProtocolToURL(url2) {
    const protocolRegex = /^[a-z0-9]+:\/\//;
    const defaultProtocol = "http://";
    if (protocolRegex.test(url2)) {
      return url2;
    }
    return defaultProtocol + url2;
  }
  function canHandleRootDrop(e3) {
    const items = toArray_default(e3.dataTransfer.items);
    const urls = items.filter((item) => item.kind === "string" && item.type === "text/uri-list");
    return urls.length > 0;
  }
  function checkIfCorrectURL(url2) {
    if (!url2)
      return false;
    const protocol4 = url2.match(/^([a-z0-9]+):\/\//)[1];
    if (protocol4 !== "http" && protocol4 !== "https") {
      return false;
    }
    return true;
  }
  function getFileNameFromUrl(url2) {
    const {
      pathname
    } = new URL(url2);
    return pathname.substring(pathname.lastIndexOf("/") + 1);
  }
  var packageJson20, Url;
  var init_Url = __esm({
    "../packages/@uppy/url/lib/Url.js"() {
      init_preact_module();
      init_lib2();
      init_lib8();
      init_toArray();
      init_UrlUI();
      init_forEachDroppedOrPastedUrl();
      init_locale12();
      packageJson20 = {
        "version": "3.0.0-beta.3"
      };
      Url = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Url";
          this.title = this.opts.title || "Link";
          this.type = "acquirer";
          this.icon = () => h(UrlIcon, null);
          this.defaultLocale = locale_default12;
          const defaultOptions4 = {};
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.i18nInit();
          this.hostname = this.opts.companionUrl;
          if (!this.hostname) {
            throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
          }
          this.getMeta = this.getMeta.bind(this);
          this.addFile = this.addFile.bind(this);
          this.handleRootDrop = this.handleRootDrop.bind(this);
          this.handleRootPaste = this.handleRootPaste.bind(this);
          this.client = new RequestClient(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionCookiesRule: this.opts.companionCookiesRule
          });
        }
        getMeta(url2) {
          return this.client.post("url/meta", {
            url: url2
          }).then((res) => {
            if (res.error) {
              this.uppy.log("[URL] Error:");
              this.uppy.log(res.error);
              throw new Error("Failed to fetch the file");
            }
            return res;
          });
        }
        async addFile(protocollessUrl, optionalMeta) {
          if (optionalMeta === void 0) {
            optionalMeta = void 0;
          }
          const url2 = addProtocolToURL(protocollessUrl);
          if (!checkIfCorrectURL(url2)) {
            this.uppy.log(`[URL] Incorrect URL entered: ${url2}`);
            this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3);
            return void 0;
          }
          try {
            const meta = await this.getMeta(url2);
            const tagFile = {
              meta: optionalMeta,
              source: this.id,
              name: getFileNameFromUrl(url2),
              type: meta.type,
              data: {
                size: meta.size
              },
              isRemote: true,
              body: {
                url: url2
              },
              remote: {
                companionUrl: this.opts.companionUrl,
                url: `${this.hostname}/url/get`,
                body: {
                  fileId: url2,
                  url: url2
                },
                providerOptions: this.client.opts
              }
            };
            this.uppy.log("[Url] Adding remote file");
            try {
              return this.uppy.addFile(tagFile);
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
              return err;
            }
          } catch (err) {
            this.uppy.log(err);
            this.uppy.info({
              message: this.i18n("failedToFetch"),
              details: err
            }, "error", 4e3);
            return err;
          }
        }
        handleRootDrop(e3) {
          forEachDroppedOrPastedUrl(e3.dataTransfer, "drop", (url2) => {
            this.uppy.log(`[URL] Adding file from dropped url: ${url2}`);
            this.addFile(url2);
          });
        }
        handleRootPaste(e3) {
          forEachDroppedOrPastedUrl(e3.clipboardData, "paste", (url2) => {
            this.uppy.log(`[URL] Adding file from pasted url: ${url2}`);
            this.addFile(url2);
          });
        }
        render() {
          return h(UrlUI_default, {
            i18n: this.i18n,
            addFile: this.addFile
          });
        }
        install() {
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.unmount();
        }
      };
      Url.VERSION = packageJson20.version;
      Url.prototype.canHandleRootDrop = canHandleRootDrop;
    }
  });

  // ../packages/@uppy/url/lib/index.js
  var lib_exports13 = {};
  __export(lib_exports13, {
    default: () => Url
  });
  var init_lib19 = __esm({
    "../packages/@uppy/url/lib/index.js"() {
      init_Url();
    }
  });

  // ../packages/@uppy/utils/lib/getFileTypeExtension.js
  function getFileTypeExtension(mimeType) {
    [mimeType] = mimeType.split(";", 1);
    return mimeToExtensions[mimeType] || null;
  }
  var mimeToExtensions;
  var init_getFileTypeExtension = __esm({
    "../packages/@uppy/utils/lib/getFileTypeExtension.js"() {
      mimeToExtensions = {
        "audio/mp3": "mp3",
        "audio/mp4": "mp4",
        "audio/ogg": "ogg",
        "audio/webm": "webm",
        "image/gif": "gif",
        "image/heic": "heic",
        "image/heif": "heif",
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/svg+xml": "svg",
        "video/mp4": "mp4",
        "video/ogg": "ogv",
        "video/quicktime": "mov",
        "video/webm": "webm",
        "video/x-matroska": "mkv",
        "video/x-msvideo": "avi"
      };
    }
  });

  // ../node_modules/is-mobile/index.js
  var require_is_mobile = __commonJS({
    "../node_modules/is-mobile/index.js"(exports, module) {
      "use strict";
      module.exports = isMobile2;
      module.exports.isMobile = isMobile2;
      module.exports.default = isMobile2;
      var mobileRE = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
      var notMobileRE = /CrOS/;
      var tabletRE = /android|ipad|playbook|silk/i;
      function isMobile2(opts) {
        if (!opts)
          opts = {};
        let ua = opts.ua;
        if (!ua && typeof navigator !== "undefined")
          ua = navigator.userAgent;
        if (ua && ua.headers && typeof ua.headers["user-agent"] === "string") {
          ua = ua.headers["user-agent"];
        }
        if (typeof ua !== "string")
          return false;
        let result2 = mobileRE.test(ua) && !notMobileRE.test(ua) || !!opts.tablet && tabletRE.test(ua);
        if (!result2 && opts.tablet && opts.featureDetect && navigator && navigator.maxTouchPoints > 1 && ua.indexOf("Macintosh") !== -1 && ua.indexOf("Safari") !== -1) {
          result2 = true;
        }
        return result2;
      }
    }
  });

  // ../packages/@uppy/utils/lib/canvasToBlob.js
  function canvasToBlob2(canvas, type, quality) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, type, quality);
    });
  }
  var init_canvasToBlob = __esm({
    "../packages/@uppy/utils/lib/canvasToBlob.js"() {
    }
  });

  // ../packages/@uppy/webcam/lib/supportsMediaRecorder.js
  function supportsMediaRecorder() {
    return typeof MediaRecorder === "function" && !!MediaRecorder.prototype && typeof MediaRecorder.prototype.start === "function";
  }
  var init_supportsMediaRecorder = __esm({
    "../packages/@uppy/webcam/lib/supportsMediaRecorder.js"() {
    }
  });

  // ../packages/@uppy/webcam/lib/CameraIcon.js
  var CameraIcon_default;
  var init_CameraIcon = __esm({
    "../packages/@uppy/webcam/lib/CameraIcon.js"() {
      init_preact_module();
      CameraIcon_default = () => {
        return h("svg", {
          "aria-hidden": "true",
          focusable: "false",
          fill: "#0097DC",
          width: "66",
          height: "55",
          viewBox: "0 0 66 55"
        }, h("path", {
          d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
          fillRule: "evenodd"
        }));
      };
    }
  });

  // ../packages/@uppy/webcam/lib/SnapshotButton.js
  var SnapshotButton_default;
  var init_SnapshotButton = __esm({
    "../packages/@uppy/webcam/lib/SnapshotButton.js"() {
      init_preact_module();
      init_CameraIcon();
      SnapshotButton_default = (_ref) => {
        let {
          onSnapshot,
          i18n
        } = _ref;
        return h("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
          type: "button",
          title: i18n("takePicture"),
          "aria-label": i18n("takePicture"),
          onClick: onSnapshot,
          "data-uppy-super-focusable": true
        }, CameraIcon_default());
      };
    }
  });

  // ../packages/@uppy/webcam/lib/RecordButton.js
  function RecordButton(_ref) {
    let {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    } = _ref;
    if (recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
        type: "button",
        title: i18n("stopRecording"),
        "aria-label": i18n("stopRecording"),
        onClick: onStopRecording,
        "data-uppy-super-focusable": true
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "100",
        height: "100",
        viewBox: "0 0 100 100"
      }, h("rect", {
        x: "15",
        y: "15",
        width: "70",
        height: "70"
      })));
    }
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
      type: "button",
      title: i18n("startRecording"),
      "aria-label": i18n("startRecording"),
      onClick: onStartRecording,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "100",
      height: "100",
      viewBox: "0 0 100 100"
    }, h("circle", {
      cx: "50",
      cy: "50",
      r: "40"
    })));
  }
  var init_RecordButton = __esm({
    "../packages/@uppy/webcam/lib/RecordButton.js"() {
      init_preact_module();
    }
  });

  // ../packages/@uppy/webcam/lib/formatSeconds.js
  function formatSeconds(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, 0)}`;
  }
  var init_formatSeconds = __esm({
    "../packages/@uppy/webcam/lib/formatSeconds.js"() {
    }
  });

  // ../packages/@uppy/webcam/lib/RecordingLength.js
  function RecordingLength(_ref) {
    let {
      recordingLengthSeconds,
      i18n
    } = _ref;
    const formattedRecordingLengthSeconds = formatSeconds(recordingLengthSeconds);
    return h("span", {
      "aria-label": i18n("recordingLength", {
        recording_length: formattedRecordingLengthSeconds
      })
    }, formattedRecordingLengthSeconds);
  }
  var init_RecordingLength = __esm({
    "../packages/@uppy/webcam/lib/RecordingLength.js"() {
      init_preact_module();
      init_formatSeconds();
    }
  });

  // ../packages/@uppy/webcam/lib/VideoSourceSelect.js
  var VideoSourceSelect_default;
  var init_VideoSourceSelect = __esm({
    "../packages/@uppy/webcam/lib/VideoSourceSelect.js"() {
      init_preact_module();
      VideoSourceSelect_default = (_ref) => {
        let {
          currentDeviceId,
          videoSources,
          onChangeVideoSource
        } = _ref;
        return h("div", {
          className: "uppy-Webcam-videoSource"
        }, h("select", {
          className: "uppy-u-reset uppy-Webcam-videoSource-select",
          onChange: (event) => {
            onChangeVideoSource(event.target.value);
          }
        }, videoSources.map((videoSource) => h("option", {
          key: videoSource.deviceId,
          value: videoSource.deviceId,
          selected: videoSource.deviceId === currentDeviceId
        }, videoSource.label))));
      };
    }
  });

  // ../packages/@uppy/webcam/lib/SubmitButton.js
  function SubmitButton(_ref) {
    let {
      onSubmit,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--submit",
      type: "button",
      title: i18n("submitRecordedFile"),
      "aria-label": i18n("submitRecordedFile"),
      onClick: onSubmit,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "12",
      height: "9",
      viewBox: "0 0 12 9",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon"
    }, h("path", {
      fill: "#fff",
      fillRule: "nonzero",
      d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
    })));
  }
  var SubmitButton_default;
  var init_SubmitButton = __esm({
    "../packages/@uppy/webcam/lib/SubmitButton.js"() {
      init_preact_module();
      SubmitButton_default = SubmitButton;
    }
  });

  // ../packages/@uppy/webcam/lib/DiscardButton.js
  function DiscardButton(_ref) {
    let {
      onDiscard,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--discard",
      type: "button",
      title: i18n("discardRecordedFile"),
      "aria-label": i18n("discardRecordedFile"),
      onClick: onDiscard,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 13 13",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon"
    }, h("g", {
      fill: "#FFF",
      fillRule: "evenodd"
    }, h("path", {
      d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z"
    }), h("path", {
      d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z"
    }))));
  }
  var DiscardButton_default;
  var init_DiscardButton = __esm({
    "../packages/@uppy/webcam/lib/DiscardButton.js"() {
      init_preact_module();
      DiscardButton_default = DiscardButton;
    }
  });

  // ../packages/@uppy/webcam/lib/CameraScreen.js
  function _extends6() {
    _extends6 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends6.apply(this, arguments);
  }
  function isModeAvailable(modes, mode) {
    return modes.includes(mode);
  }
  var CameraScreen, CameraScreen_default;
  var init_CameraScreen = __esm({
    "../packages/@uppy/webcam/lib/CameraScreen.js"() {
      init_preact_module();
      init_SnapshotButton();
      init_RecordButton();
      init_RecordingLength();
      init_VideoSourceSelect();
      init_SubmitButton();
      init_DiscardButton();
      CameraScreen = class extends d {
        componentDidMount() {
          const {
            onFocus
          } = this.props;
          onFocus();
        }
        componentWillUnmount() {
          const {
            onStop
          } = this.props;
          onStop();
        }
        render() {
          const {
            src,
            recordedVideo,
            recording,
            modes,
            supportsRecording,
            videoSources,
            showVideoSourceDropdown,
            showRecordingLength,
            onSubmit,
            i18n,
            mirror,
            onSnapshot,
            onStartRecording,
            onStopRecording,
            onDiscardRecordedVideo,
            recordingLengthSeconds
          } = this.props;
          const hasRecordedVideo = !!recordedVideo;
          const shouldShowRecordButton = !hasRecordedVideo && supportsRecording && (isModeAvailable(modes, "video-only") || isModeAvailable(modes, "audio-only") || isModeAvailable(modes, "video-audio"));
          const shouldShowSnapshotButton = !hasRecordedVideo && isModeAvailable(modes, "picture");
          const shouldShowRecordingLength = supportsRecording && showRecordingLength && !hasRecordedVideo;
          const shouldShowVideoSourceDropdown = showVideoSourceDropdown && videoSources && videoSources.length > 1;
          const videoProps = {
            playsinline: true
          };
          if (recordedVideo) {
            videoProps.muted = false;
            videoProps.controls = true;
            videoProps.src = recordedVideo;
            if (this.videoElement) {
              this.videoElement.srcObject = void 0;
            }
          } else {
            videoProps.muted = true;
            videoProps.autoplay = true;
            videoProps.srcObject = src;
          }
          return h("div", {
            className: "uppy uppy-Webcam-container"
          }, h("div", {
            className: "uppy-Webcam-videoContainer"
          }, h("video", _extends6({
            ref: (videoElement) => this.videoElement = videoElement,
            className: `uppy-Webcam-video  ${mirror ? "uppy-Webcam-video--mirrored" : ""}`
          }, videoProps))), h("div", {
            className: "uppy-Webcam-footer"
          }, h("div", {
            className: "uppy-Webcam-videoSourceContainer"
          }, shouldShowVideoSourceDropdown ? VideoSourceSelect_default(this.props) : null), h("div", {
            className: "uppy-Webcam-buttonContainer"
          }, shouldShowSnapshotButton && h(SnapshotButton_default, {
            onSnapshot,
            i18n
          }), shouldShowRecordButton && h(RecordButton, {
            recording,
            onStartRecording,
            onStopRecording,
            i18n
          }), hasRecordedVideo && h(SubmitButton_default, {
            onSubmit,
            i18n
          }), hasRecordedVideo && h(DiscardButton_default, {
            onDiscard: onDiscardRecordedVideo,
            i18n
          })), h("div", {
            className: "uppy-Webcam-recordingLength"
          }, shouldShowRecordingLength && h(RecordingLength, {
            recordingLengthSeconds,
            i18n
          }))));
        }
      };
      CameraScreen_default = CameraScreen;
    }
  });

  // ../packages/@uppy/webcam/lib/PermissionsScreen.js
  var PermissionsScreen_default;
  var init_PermissionsScreen = __esm({
    "../packages/@uppy/webcam/lib/PermissionsScreen.js"() {
      init_preact_module();
      PermissionsScreen_default = (_ref) => {
        let {
          icon,
          i18n,
          hasCamera
        } = _ref;
        return h("div", {
          className: "uppy-Webcam-permissons"
        }, h("div", {
          className: "uppy-Webcam-permissonsIcon"
        }, icon()), h("h1", {
          className: "uppy-Webcam-title"
        }, hasCamera ? i18n("allowAccessTitle") : i18n("noCameraTitle")), h("p", null, hasCamera ? i18n("allowAccessDescription") : i18n("noCameraDescription")));
      };
    }
  });

  // ../packages/@uppy/webcam/lib/locale.js
  var locale_default13;
  var init_locale13 = __esm({
    "../packages/@uppy/webcam/lib/locale.js"() {
      locale_default13 = {
        strings: {
          pluginNameCamera: "Camera",
          noCameraTitle: "Camera Not Available",
          noCameraDescription: "In order to take pictures or record video, please connect a camera device",
          recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
          submitRecordedFile: "Submit recorded file",
          discardRecordedFile: "Discard recorded file",
          smile: "Smile!",
          takePicture: "Take a picture",
          startRecording: "Begin video recording",
          stopRecording: "Stop video recording",
          recordingLength: "Recording length %{recording_length}",
          allowAccessTitle: "Please allow access to your camera",
          allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site."
        }
      };
    }
  });

  // ../packages/@uppy/webcam/lib/Webcam.js
  function _extends7() {
    _extends7 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends7.apply(this, arguments);
  }
  function _classPrivateFieldLooseBase18(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey18(name) {
    return "__private_" + id18++ + "_" + name;
  }
  function toMimeType(fileType) {
    if (fileType[0] === ".") {
      return mimeTypes_default[fileType.slice(1)];
    }
    return fileType;
  }
  function isVideoMimeType(mimeType) {
    return /^video\/[^*]+$/.test(mimeType);
  }
  function isImageMimeType(mimeType) {
    return /^image\/[^*]+$/.test(mimeType);
  }
  function getMediaDevices() {
    return navigator.mediaDevices;
  }
  function isModeAvailable2(modes, mode) {
    return modes.includes(mode);
  }
  var import_is_mobile, id18, packageJson21, _enableMirror, Webcam;
  var init_Webcam = __esm({
    "../packages/@uppy/webcam/lib/Webcam.js"() {
      init_preact_module();
      init_lib2();
      init_getFileTypeExtension();
      init_mimeTypes();
      import_is_mobile = __toESM(require_is_mobile(), 1);
      init_canvasToBlob();
      init_supportsMediaRecorder();
      init_CameraIcon();
      init_CameraScreen();
      init_PermissionsScreen();
      init_locale13();
      id18 = 0;
      packageJson21 = {
        "version": "3.0.0-beta.3"
      };
      _enableMirror = /* @__PURE__ */ _classPrivateFieldLooseKey18("enableMirror");
      Webcam = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          Object.defineProperty(this, _enableMirror, {
            writable: true,
            value: void 0
          });
          this.mediaDevices = getMediaDevices();
          this.supportsUserMedia = !!this.mediaDevices;
          this.protocol = location.protocol.match(/https/i) ? "https" : "http";
          this.id = this.opts.id || "Webcam";
          this.type = "acquirer";
          this.capturedMediaFile = null;
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#03BFEF",
            width: "32",
            height: "32",
            rx: "16"
          }), h("path", {
            d: "M22 11c1.133 0 2 .867 2 2v7.333c0 1.134-.867 2-2 2H10c-1.133 0-2-.866-2-2V13c0-1.133.867-2 2-2h2.333l1.134-1.733C13.6 9.133 13.8 9 14 9h4c.2 0 .4.133.533.267L19.667 11H22zm-6 1.533a3.764 3.764 0 0 0-3.8 3.8c0 2.129 1.672 3.801 3.8 3.801s3.8-1.672 3.8-3.8c0-2.13-1.672-3.801-3.8-3.801zm0 6.261c-1.395 0-2.46-1.066-2.46-2.46 0-1.395 1.065-2.461 2.46-2.461s2.46 1.066 2.46 2.46c0 1.395-1.065 2.461-2.46 2.461z",
            fill: "#FFF",
            fillRule: "nonzero"
          })));
          this.defaultLocale = locale_default13;
          const defaultOptions4 = {
            onBeforeSnapshot: () => Promise.resolve(),
            countdown: false,
            modes: ["video-audio", "video-only", "audio-only", "picture"],
            mirror: true,
            showVideoSourceDropdown: false,
            facingMode: "user",
            preferredImageMimeType: null,
            preferredVideoMimeType: null,
            showRecordingLength: false,
            mobileNativeCamera: (0, import_is_mobile.default)({
              tablet: true
            })
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.i18nInit();
          this.title = this.i18n("pluginNameCamera");
          _classPrivateFieldLooseBase18(this, _enableMirror)[_enableMirror] = this.opts.mirror;
          this.install = this.install.bind(this);
          this.setPluginState = this.setPluginState.bind(this);
          this.render = this.render.bind(this);
          this.start = this.start.bind(this);
          this.stop = this.stop.bind(this);
          this.takeSnapshot = this.takeSnapshot.bind(this);
          this.startRecording = this.startRecording.bind(this);
          this.stopRecording = this.stopRecording.bind(this);
          this.discardRecordedVideo = this.discardRecordedVideo.bind(this);
          this.submit = this.submit.bind(this);
          this.oneTwoThreeSmile = this.oneTwoThreeSmile.bind(this);
          this.focus = this.focus.bind(this);
          this.changeVideoSource = this.changeVideoSource.bind(this);
          this.webcamActive = false;
          if (this.opts.countdown) {
            this.opts.onBeforeSnapshot = this.oneTwoThreeSmile;
          }
          this.setPluginState({
            hasCamera: false,
            cameraReady: false,
            cameraError: null,
            recordingLengthSeconds: 0,
            videoSources: [],
            currentDeviceId: null
          });
        }
        setOptions(newOpts) {
          super.setOptions({
            ...newOpts,
            videoConstraints: {
              ...this.opts.videoConstraints,
              ...newOpts == null ? void 0 : newOpts.videoConstraints
            }
          });
        }
        hasCameraCheck() {
          if (!this.mediaDevices) {
            return Promise.resolve(false);
          }
          return this.mediaDevices.enumerateDevices().then((devices) => {
            return devices.some((device) => device.kind === "videoinput");
          });
        }
        isAudioOnly() {
          return this.opts.modes.length === 1 && this.opts.modes[0] === "audio-only";
        }
        getConstraints(deviceId) {
          if (deviceId === void 0) {
            deviceId = null;
          }
          const acceptsAudio = this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("audio-only") !== -1;
          const acceptsVideo = !this.isAudioOnly() && (this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("video-only") !== -1 || this.opts.modes.indexOf("picture") !== -1);
          const videoConstraints = {
            ...this.opts.videoConstraints || {
              facingMode: this.opts.facingMode
            },
            ...deviceId ? {
              deviceId,
              facingMode: null
            } : {}
          };
          return {
            audio: acceptsAudio,
            video: acceptsVideo ? videoConstraints : false
          };
        }
        start(options) {
          if (options === void 0) {
            options = null;
          }
          if (!this.supportsUserMedia) {
            return Promise.reject(new Error("Webcam access not supported"));
          }
          this.webcamActive = true;
          if (this.opts.mirror) {
            _classPrivateFieldLooseBase18(this, _enableMirror)[_enableMirror] = true;
          }
          const constraints = this.getConstraints(options && options.deviceId ? options.deviceId : null);
          this.hasCameraCheck().then((hasCamera) => {
            this.setPluginState({
              hasCamera
            });
            return this.mediaDevices.getUserMedia(constraints).then((stream) => {
              this.stream = stream;
              let currentDeviceId = null;
              const tracks = this.isAudioOnly() ? stream.getAudioTracks() : stream.getVideoTracks();
              if (!options || !options.deviceId) {
                currentDeviceId = tracks[0].getSettings().deviceId;
              } else {
                tracks.forEach((track) => {
                  if (track.getSettings().deviceId === options.deviceId) {
                    currentDeviceId = track.getSettings().deviceId;
                  }
                });
              }
              this.updateVideoSources();
              this.setPluginState({
                currentDeviceId,
                cameraReady: true
              });
            }).catch((err) => {
              this.setPluginState({
                cameraReady: false,
                cameraError: err
              });
              this.uppy.info(err.message, "error");
            });
          });
        }
        getMediaRecorderOptions() {
          const options = {};
          if (MediaRecorder.isTypeSupported) {
            const {
              restrictions
            } = this.uppy.opts;
            let preferredVideoMimeTypes = [];
            if (this.opts.preferredVideoMimeType) {
              preferredVideoMimeTypes = [this.opts.preferredVideoMimeType];
            } else if (restrictions.allowedFileTypes) {
              preferredVideoMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isVideoMimeType);
            }
            const filterSupportedTypes = (candidateType) => MediaRecorder.isTypeSupported(candidateType) && getFileTypeExtension(candidateType);
            const acceptableMimeTypes = preferredVideoMimeTypes.filter(filterSupportedTypes);
            if (acceptableMimeTypes.length > 0) {
              options.mimeType = acceptableMimeTypes[0];
            }
          }
          return options;
        }
        startRecording() {
          this.recorder = new MediaRecorder(this.stream, this.getMediaRecorderOptions());
          this.recordingChunks = [];
          let stoppingBecauseOfMaxSize = false;
          this.recorder.addEventListener("dataavailable", (event) => {
            this.recordingChunks.push(event.data);
            const {
              restrictions
            } = this.uppy.opts;
            if (this.recordingChunks.length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
              const totalSize = this.recordingChunks.reduce((acc, chunk) => acc + chunk.size, 0);
              const averageChunkSize = (totalSize - this.recordingChunks[0].size) / (this.recordingChunks.length - 1);
              const expectedEndChunkSize = averageChunkSize * 3;
              const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
              if (totalSize > maxSize) {
                stoppingBecauseOfMaxSize = true;
                this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
                this.stopRecording();
              }
            }
          });
          this.recorder.start(500);
          if (this.opts.showRecordingLength) {
            this.recordingLengthTimer = setInterval(() => {
              const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
              this.setPluginState({
                recordingLengthSeconds: currentRecordingLength + 1
              });
            }, 1e3);
          }
          this.setPluginState({
            isRecording: true
          });
        }
        stopRecording() {
          const stopped = new Promise((resolve) => {
            this.recorder.addEventListener("stop", () => {
              resolve();
            });
            this.recorder.stop();
            if (this.opts.showRecordingLength) {
              clearInterval(this.recordingLengthTimer);
              this.setPluginState({
                recordingLengthSeconds: 0
              });
            }
          });
          return stopped.then(() => {
            this.setPluginState({
              isRecording: false
            });
            return this.getVideo();
          }).then((file) => {
            try {
              this.capturedMediaFile = file;
              this.setPluginState({
                recordedVideo: URL.createObjectURL(file.data)
              });
              _classPrivateFieldLooseBase18(this, _enableMirror)[_enableMirror] = false;
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
            }
          }).then(() => {
            this.recordingChunks = null;
            this.recorder = null;
          }, (error) => {
            this.recordingChunks = null;
            this.recorder = null;
            throw error;
          });
        }
        discardRecordedVideo() {
          this.setPluginState({
            recordedVideo: null
          });
          if (this.opts.mirror) {
            _classPrivateFieldLooseBase18(this, _enableMirror)[_enableMirror] = true;
          }
          this.capturedMediaFile = null;
        }
        submit() {
          try {
            if (this.capturedMediaFile) {
              this.uppy.addFile(this.capturedMediaFile);
            }
          } catch (err) {
            if (!err.isRestriction) {
              this.uppy.log(err, "error");
            }
          }
        }
        async stop() {
          if (this.stream) {
            const audioTracks = this.stream.getAudioTracks();
            const videoTracks = this.stream.getVideoTracks();
            audioTracks.concat(videoTracks).forEach((track) => track.stop());
          }
          if (this.recorder) {
            await new Promise((resolve) => {
              this.recorder.addEventListener("stop", resolve, {
                once: true
              });
              this.recorder.stop();
              if (this.opts.showRecordingLength) {
                clearInterval(this.recordingLengthTimer);
              }
            });
          }
          this.recordingChunks = null;
          this.recorder = null;
          this.webcamActive = false;
          this.stream = null;
          this.setPluginState({
            recordedVideo: null,
            isRecording: false,
            recordingLengthSeconds: 0
          });
        }
        getVideoElement() {
          return this.el.querySelector(".uppy-Webcam-video");
        }
        oneTwoThreeSmile() {
          return new Promise((resolve, reject) => {
            let count = this.opts.countdown;
            const countDown = setInterval(() => {
              if (!this.webcamActive) {
                clearInterval(countDown);
                this.captureInProgress = false;
                return reject(new Error("Webcam is not active"));
              }
              if (count > 0) {
                this.uppy.info(`${count}...`, "warning", 800);
                count--;
              } else {
                clearInterval(countDown);
                this.uppy.info(this.i18n("smile"), "success", 1500);
                setTimeout(() => resolve(), 1500);
              }
            }, 1e3);
          });
        }
        takeSnapshot() {
          if (this.captureInProgress)
            return;
          this.captureInProgress = true;
          this.opts.onBeforeSnapshot().catch((err) => {
            const message = typeof err === "object" ? err.message : err;
            this.uppy.info(message, "error", 5e3);
            return Promise.reject(new Error(`onBeforeSnapshot: ${message}`));
          }).then(() => {
            return this.getImage();
          }).then((tagFile) => {
            this.captureInProgress = false;
            try {
              this.uppy.addFile(tagFile);
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
            }
          }, (error) => {
            this.captureInProgress = false;
            throw error;
          });
        }
        getImage() {
          const video = this.getVideoElement();
          if (!video) {
            return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
          }
          const width = video.videoWidth;
          const height = video.videoHeight;
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0);
          const {
            restrictions
          } = this.uppy.opts;
          let preferredImageMimeTypes = [];
          if (this.opts.preferredImageMimeType) {
            preferredImageMimeTypes = [this.opts.preferredImageMimeType];
          } else if (restrictions.allowedFileTypes) {
            preferredImageMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isImageMimeType);
          }
          const mimeType = preferredImageMimeTypes[0] || "image/jpeg";
          const ext = getFileTypeExtension(mimeType) || "jpg";
          const name = `cam-${Date.now()}.${ext}`;
          return canvasToBlob2(canvas, mimeType).then((blob) => {
            return {
              source: this.id,
              name,
              data: new Blob([blob], {
                type: mimeType
              }),
              type: mimeType
            };
          });
        }
        getVideo() {
          const mimeType = this.recordingChunks.find((blob2) => {
            var _blob$type;
            return ((_blob$type = blob2.type) == null ? void 0 : _blob$type.length) > 0;
          }).type;
          const fileExtension = getFileTypeExtension(mimeType);
          if (!fileExtension) {
            return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
          }
          const name = `webcam-${Date.now()}.${fileExtension}`;
          const blob = new Blob(this.recordingChunks, {
            type: mimeType
          });
          const file = {
            source: this.id,
            name,
            data: new Blob([blob], {
              type: mimeType
            }),
            type: mimeType
          };
          return Promise.resolve(file);
        }
        focus() {
          if (!this.opts.countdown)
            return;
          setTimeout(() => {
            this.uppy.info(this.i18n("smile"), "success", 1500);
          }, 1e3);
        }
        changeVideoSource(deviceId) {
          this.stop();
          this.start({
            deviceId
          });
        }
        updateVideoSources() {
          this.mediaDevices.enumerateDevices().then((devices) => {
            this.setPluginState({
              videoSources: devices.filter((device) => device.kind === "videoinput")
            });
          });
        }
        render() {
          if (!this.webcamActive) {
            this.start();
          }
          const webcamState = this.getPluginState();
          if (!webcamState.cameraReady || !webcamState.hasCamera) {
            return h(PermissionsScreen_default, {
              icon: CameraIcon_default,
              i18n: this.i18n,
              hasCamera: webcamState.hasCamera
            });
          }
          return h(
            CameraScreen_default,
            _extends7({}, webcamState, {
              onChangeVideoSource: this.changeVideoSource,
              onSnapshot: this.takeSnapshot,
              onStartRecording: this.startRecording,
              onStopRecording: this.stopRecording,
              onDiscardRecordedVideo: this.discardRecordedVideo,
              onSubmit: this.submit,
              onFocus: this.focus,
              onStop: this.stop,
              i18n: this.i18n,
              modes: this.opts.modes,
              showRecordingLength: this.opts.showRecordingLength,
              showVideoSourceDropdown: this.opts.showVideoSourceDropdown,
              supportsRecording: supportsMediaRecorder(),
              recording: webcamState.isRecording,
              mirror: _classPrivateFieldLooseBase18(this, _enableMirror)[_enableMirror],
              src: this.stream
            })
          );
        }
        install() {
          const {
            mobileNativeCamera,
            modes
          } = this.opts;
          if (mobileNativeCamera) {
            this.uppy.getPlugin("Dashboard").setOptions({
              showNativeVideoCameraButton: isModeAvailable2(modes, "video-only") || isModeAvailable2(modes, "video-audio"),
              showNativePhotoCameraButton: isModeAvailable2(modes, "picture")
            });
            return;
          }
          this.setPluginState({
            cameraReady: false,
            recordingLengthSeconds: 0
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
          if (this.mediaDevices) {
            this.updateVideoSources();
            this.mediaDevices.ondevicechange = () => {
              this.updateVideoSources();
              if (this.stream) {
                let restartStream = true;
                const {
                  videoSources,
                  currentDeviceId
                } = this.getPluginState();
                videoSources.forEach((videoSource) => {
                  if (currentDeviceId === videoSource.deviceId) {
                    restartStream = false;
                  }
                });
                if (restartStream) {
                  this.stop();
                  this.start();
                }
              }
            };
          }
        }
        uninstall() {
          this.stop();
          this.unmount();
        }
        onUnmount() {
          this.stop();
        }
      };
      Webcam.VERSION = packageJson21.version;
    }
  });

  // ../packages/@uppy/webcam/lib/index.js
  var lib_exports14 = {};
  __export(lib_exports14, {
    default: () => Webcam
  });
  var init_lib20 = __esm({
    "../packages/@uppy/webcam/lib/index.js"() {
      init_Webcam();
    }
  });

  // ../packages/@uppy/audio/lib/supportsMediaRecorder.js
  function supportsMediaRecorder2() {
    var _MediaRecorder$protot;
    return typeof MediaRecorder === "function" && typeof ((_MediaRecorder$protot = MediaRecorder.prototype) == null ? void 0 : _MediaRecorder$protot.start) === "function";
  }
  var init_supportsMediaRecorder2 = __esm({
    "../packages/@uppy/audio/lib/supportsMediaRecorder.js"() {
    }
  });

  // ../node_modules/preact/hooks/dist/hooks.module.js
  function p2(t3, r3) {
    l.__h && l.__h(u2, t3, i3 || r3), i3 = 0;
    var o3 = u2.__H || (u2.__H = {
      __: [],
      __h: []
    });
    return t3 >= o3.__.length && o3.__.push({
      __V: f2
    }), o3.__[t3];
  }
  function _2(r3, o3) {
    var i4 = p2(t2++, 3);
    !l.__s && w2(i4.__H, o3) && (i4.__ = r3, i4.u = o3, u2.__H.__h.push(i4));
  }
  function s2(n2) {
    return i3 = 5, F(function() {
      return {
        current: n2
      };
    }, []);
  }
  function F(n2, u3) {
    var r3 = p2(t2++, 7);
    return w2(r3.__H, u3) ? (r3.__V = n2(), r3.u = u3, r3.__h = n2, r3.__V) : r3.__;
  }
  function b2() {
    for (var t3; t3 = c2.shift(); )
      if (t3.__P)
        try {
          t3.__H.__h.forEach(j2), t3.__H.__h.forEach(k2), t3.__H.__h = [];
        } catch (u3) {
          t3.__H.__h = [], l.__e(u3, t3.__v);
        }
  }
  function j2(n2) {
    var t3 = u2, r3 = n2.__c;
    "function" == typeof r3 && (n2.__c = void 0, r3()), u2 = t3;
  }
  function k2(n2) {
    var t3 = u2;
    n2.__c = n2.__(), u2 = t3;
  }
  function w2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, u3) {
      return t4 !== n2[u3];
    });
  }
  var t2, u2, r2, o2, i3, c2, f2, e2, a2, v2, l2, m2, g2;
  var init_hooks_module = __esm({
    "../node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      i3 = 0;
      c2 = [];
      f2 = [];
      e2 = l.__b;
      a2 = l.__r;
      v2 = l.diffed;
      l2 = l.__c;
      m2 = l.unmount;
      l.__b = function(n2) {
        u2 = null, e2 && e2(n2);
      }, l.__r = function(n2) {
        a2 && a2(n2), t2 = 0;
        var o3 = (u2 = n2.__c).__H;
        o3 && (r2 === u2 ? (o3.__h = [], u2.__h = [], o3.__.forEach(function(n3) {
          n3.__V = f2, n3.u = void 0;
        })) : (o3.__h.forEach(j2), o3.__h.forEach(k2), o3.__h = [])), r2 = u2;
      }, l.diffed = function(t3) {
        v2 && v2(t3);
        var i4 = t3.__c;
        i4 && i4.__H && (i4.__H.__h.length && (1 !== c2.push(i4) && o2 === l.requestAnimationFrame || ((o2 = l.requestAnimationFrame) || function(n2) {
          var t4, u3 = function() {
            clearTimeout(r3), g2 && cancelAnimationFrame(t4), setTimeout(n2);
          }, r3 = setTimeout(u3, 100);
          g2 && (t4 = requestAnimationFrame(u3));
        })(b2)), i4.__H.__.forEach(function(n2) {
          n2.u && (n2.__H = n2.u), n2.__V !== f2 && (n2.__ = n2.__V), n2.u = void 0, n2.__V = f2;
        })), r2 = u2 = null;
      }, l.__c = function(t3, u3) {
        u3.some(function(t4) {
          try {
            t4.__h.forEach(j2), t4.__h = t4.__h.filter(function(n2) {
              return !n2.__ || k2(n2);
            });
          } catch (r3) {
            u3.some(function(n2) {
              n2.__h && (n2.__h = []);
            }), u3 = [], l.__e(r3, t4.__v);
          }
        }), l2 && l2(t3, u3);
      }, l.unmount = function(t3) {
        m2 && m2(t3);
        var u3, r3 = t3.__c;
        r3 && r3.__H && (r3.__H.__.forEach(function(n2) {
          try {
            j2(n2);
          } catch (n3) {
            u3 = n3;
          }
        }), u3 && l.__e(u3, r3.__v));
      };
      g2 = "function" == typeof requestAnimationFrame;
    }
  });

  // ../packages/@uppy/audio/lib/RecordButton.js
  function RecordButton2(_ref) {
    let {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    } = _ref;
    if (recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
        type: "button",
        title: i18n("stopAudioRecording"),
        "aria-label": i18n("stopAudioRecording"),
        onClick: onStopRecording,
        "data-uppy-super-focusable": true
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "100",
        height: "100",
        viewBox: "0 0 100 100"
      }, h("rect", {
        x: "15",
        y: "15",
        width: "70",
        height: "70"
      })));
    }
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
      type: "button",
      title: i18n("startAudioRecording"),
      "aria-label": i18n("startAudioRecording"),
      onClick: onStartRecording,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "14px",
      height: "20px",
      viewBox: "0 0 14 20"
    }, h("path", {
      d: "M7 14c2.21 0 4-1.71 4-3.818V3.818C11 1.71 9.21 0 7 0S3 1.71 3 3.818v6.364C3 12.29 4.79 14 7 14zm6.364-7h-.637a.643.643 0 0 0-.636.65V9.6c0 3.039-2.565 5.477-5.6 5.175-2.645-.264-4.582-2.692-4.582-5.407V7.65c0-.36-.285-.65-.636-.65H.636A.643.643 0 0 0 0 7.65v1.631c0 3.642 2.544 6.888 6.045 7.382v1.387H3.818a.643.643 0 0 0-.636.65v.65c0 .36.285.65.636.65h6.364c.351 0 .636-.29.636-.65v-.65c0-.36-.285-.65-.636-.65H7.955v-1.372C11.363 16.2 14 13.212 14 9.6V7.65c0-.36-.285-.65-.636-.65z",
      fill: "#FFF",
      "fill-rule": "nonzero"
    })));
  }
  var init_RecordButton2 = __esm({
    "../packages/@uppy/audio/lib/RecordButton.js"() {
      init_preact_module();
    }
  });

  // ../packages/@uppy/audio/lib/formatSeconds.js
  function formatSeconds2(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, 0)}`;
  }
  var init_formatSeconds2 = __esm({
    "../packages/@uppy/audio/lib/formatSeconds.js"() {
    }
  });

  // ../packages/@uppy/audio/lib/RecordingLength.js
  function RecordingLength2(_ref) {
    let {
      recordingLengthSeconds,
      i18n
    } = _ref;
    const formattedRecordingLengthSeconds = formatSeconds2(recordingLengthSeconds);
    return h("span", {
      "aria-label": i18n("recordingLength", {
        recording_length: formattedRecordingLengthSeconds
      })
    }, formattedRecordingLengthSeconds);
  }
  var init_RecordingLength2 = __esm({
    "../packages/@uppy/audio/lib/RecordingLength.js"() {
      init_preact_module();
      init_formatSeconds2();
    }
  });

  // ../packages/@uppy/audio/lib/AudioSourceSelect.js
  var AudioSourceSelect_default;
  var init_AudioSourceSelect = __esm({
    "../packages/@uppy/audio/lib/AudioSourceSelect.js"() {
      init_preact_module();
      AudioSourceSelect_default = (_ref) => {
        let {
          currentDeviceId,
          audioSources,
          onChangeSource
        } = _ref;
        return h("div", {
          className: "uppy-Audio-videoSource"
        }, h("select", {
          className: "uppy-u-reset uppy-Audio-audioSource-select",
          onChange: (event) => {
            onChangeSource(event.target.value);
          }
        }, audioSources.map((audioSource) => h("option", {
          key: audioSource.deviceId,
          value: audioSource.deviceId,
          selected: audioSource.deviceId === currentDeviceId
        }, audioSource.label))));
      };
    }
  });

  // ../packages/@uppy/audio/lib/audio-oscilloscope/index.js
  function _classPrivateFieldLooseBase19(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey19(name) {
    return "__private_" + id19++ + "_" + name;
  }
  function isFunction(v3) {
    return typeof v3 === "function";
  }
  function result(v3) {
    return isFunction(v3) ? v3() : v3;
  }
  var id19, _draw, AudioOscilloscope;
  var init_audio_oscilloscope = __esm({
    "../packages/@uppy/audio/lib/audio-oscilloscope/index.js"() {
      id19 = 0;
      _draw = /* @__PURE__ */ _classPrivateFieldLooseKey19("draw");
      AudioOscilloscope = class {
        constructor(canvas, options) {
          if (options === void 0) {
            options = {};
          }
          Object.defineProperty(this, _draw, {
            writable: true,
            value: () => this.draw()
          });
          const canvasOptions = options.canvas || {};
          const canvasContextOptions = options.canvasContext || {};
          this.analyser = null;
          this.bufferLength = 0;
          this.dataArray = [];
          this.canvas = canvas;
          this.width = result(canvasOptions.width) || this.canvas.width;
          this.height = result(canvasOptions.height) || this.canvas.height;
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.canvasContext = this.canvas.getContext("2d");
          this.canvasContext.fillStyle = result(canvasContextOptions.fillStyle) || "rgb(255, 255, 255)";
          this.canvasContext.strokeStyle = result(canvasContextOptions.strokeStyle) || "rgb(0, 0, 0)";
          this.canvasContext.lineWidth = result(canvasContextOptions.lineWidth) || 1;
          this.onDrawFrame = isFunction(options.onDrawFrame) ? options.onDrawFrame : () => {
          };
        }
        addSource(streamSource) {
          this.streamSource = streamSource;
          this.audioContext = this.streamSource.context;
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 2048;
          this.bufferLength = this.analyser.frequencyBinCount;
          this.source = this.audioContext.createBufferSource();
          this.dataArray = new Uint8Array(this.bufferLength);
          this.analyser.getByteTimeDomainData(this.dataArray);
          this.streamSource.connect(this.analyser);
        }
        draw() {
          const {
            analyser,
            dataArray,
            bufferLength
          } = this;
          const ctx = this.canvasContext;
          const w3 = this.width;
          const h2 = this.height;
          if (analyser) {
            analyser.getByteTimeDomainData(dataArray);
          }
          ctx.fillRect(0, 0, w3, h2);
          ctx.beginPath();
          const sliceWidth = w3 * 1 / bufferLength;
          let x2 = 0;
          if (!bufferLength) {
            ctx.moveTo(0, this.height / 2);
          }
          for (let i4 = 0; i4 < bufferLength; i4++) {
            const v3 = dataArray[i4] / 128;
            const y2 = v3 * (h2 / 2);
            if (i4 === 0) {
              ctx.moveTo(x2, y2);
            } else {
              ctx.lineTo(x2, y2);
            }
            x2 += sliceWidth;
          }
          ctx.lineTo(w3, h2 / 2);
          ctx.stroke();
          this.onDrawFrame(this);
          requestAnimationFrame(_classPrivateFieldLooseBase19(this, _draw)[_draw]);
        }
      };
    }
  });

  // ../packages/@uppy/audio/lib/SubmitButton.js
  function SubmitButton2(_ref) {
    let {
      onSubmit,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Audio-button uppy-Audio-button--submit",
      type: "button",
      title: i18n("submitRecordedFile"),
      "aria-label": i18n("submitRecordedFile"),
      onClick: onSubmit,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "12",
      height: "9",
      viewBox: "0 0 12 9",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon"
    }, h("path", {
      fill: "#fff",
      fillRule: "nonzero",
      d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
    })));
  }
  var SubmitButton_default2;
  var init_SubmitButton2 = __esm({
    "../packages/@uppy/audio/lib/SubmitButton.js"() {
      init_preact_module();
      SubmitButton_default2 = SubmitButton2;
    }
  });

  // ../packages/@uppy/audio/lib/DiscardButton.js
  function DiscardButton2(_ref) {
    let {
      onDiscard,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
      type: "button",
      title: i18n("discardRecordedFile"),
      "aria-label": i18n("discardRecordedFile"),
      onClick: onDiscard,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 13 13",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      className: "uppy-c-icon"
    }, h("g", {
      fill: "#FFF",
      fillRule: "evenodd"
    }, h("path", {
      d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z"
    }), h("path", {
      d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z"
    }))));
  }
  var DiscardButton_default2;
  var init_DiscardButton2 = __esm({
    "../packages/@uppy/audio/lib/DiscardButton.js"() {
      init_preact_module();
      DiscardButton_default2 = DiscardButton2;
    }
  });

  // ../packages/@uppy/audio/lib/RecordingScreen.js
  function RecordingScreen(props) {
    const {
      stream,
      recordedAudio,
      onStop,
      recording,
      supportsRecording,
      audioSources,
      showAudioSourceDropdown,
      onSubmit,
      i18n,
      onStartRecording,
      onStopRecording,
      onDiscardRecordedAudio,
      recordingLengthSeconds
    } = props;
    const canvasEl = s2(null);
    const oscilloscope = s2(null);
    _2(() => {
      return () => {
        oscilloscope.current = null;
        onStop();
      };
    }, [onStop]);
    _2(() => {
      if (!recordedAudio) {
        oscilloscope.current = new AudioOscilloscope(canvasEl.current, {
          canvas: {
            width: 600,
            height: 600
          },
          canvasContext: {
            lineWidth: 2,
            fillStyle: "rgb(0,0,0)",
            strokeStyle: "green"
          }
        });
        oscilloscope.current.draw();
        if (stream) {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          oscilloscope.current.addSource(source);
        }
      }
    }, [recordedAudio, stream]);
    const hasRecordedAudio = recordedAudio != null;
    const shouldShowRecordButton = !hasRecordedAudio && supportsRecording;
    const shouldShowAudioSourceDropdown = showAudioSourceDropdown && !hasRecordedAudio && audioSources && audioSources.length > 1;
    return h("div", {
      className: "uppy-Audio-container"
    }, h("div", {
      className: "uppy-Audio-audioContainer"
    }, hasRecordedAudio ? h("audio", {
      className: "uppy-Audio-player",
      controls: true,
      src: recordedAudio
    }) : h("canvas", {
      ref: canvasEl,
      className: "uppy-Audio-canvas"
    })), h("div", {
      className: "uppy-Audio-footer"
    }, h("div", {
      className: "uppy-Audio-audioSourceContainer"
    }, shouldShowAudioSourceDropdown ? AudioSourceSelect_default(props) : null), h("div", {
      className: "uppy-Audio-buttonContainer"
    }, shouldShowRecordButton && h(RecordButton2, {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    }), hasRecordedAudio && h(SubmitButton_default2, {
      onSubmit,
      i18n
    }), hasRecordedAudio && h(DiscardButton_default2, {
      onDiscard: onDiscardRecordedAudio,
      i18n
    })), h("div", {
      className: "uppy-Audio-recordingLength"
    }, !hasRecordedAudio && h(RecordingLength2, {
      recordingLengthSeconds,
      i18n
    }))));
  }
  var init_RecordingScreen = __esm({
    "../packages/@uppy/audio/lib/RecordingScreen.js"() {
      init_preact_module();
      init_hooks_module();
      init_RecordButton2();
      init_RecordingLength2();
      init_AudioSourceSelect();
      init_audio_oscilloscope();
      init_SubmitButton2();
      init_DiscardButton2();
    }
  });

  // ../packages/@uppy/audio/lib/PermissionsScreen.js
  var PermissionsScreen_default2;
  var init_PermissionsScreen2 = __esm({
    "../packages/@uppy/audio/lib/PermissionsScreen.js"() {
      init_preact_module();
      PermissionsScreen_default2 = (props) => {
        const {
          icon,
          hasAudio,
          i18n
        } = props;
        return h("div", {
          className: "uppy-Audio-permissons"
        }, h("div", {
          className: "uppy-Audio-permissonsIcon"
        }, icon()), h("h1", {
          className: "uppy-Audio-title"
        }, hasAudio ? i18n("allowAudioAccessTitle") : i18n("noAudioTitle")), h("p", null, hasAudio ? i18n("allowAudioAccessDescription") : i18n("noAudioDescription")));
      };
    }
  });

  // ../packages/@uppy/audio/lib/locale.js
  var locale_default14;
  var init_locale14 = __esm({
    "../packages/@uppy/audio/lib/locale.js"() {
      locale_default14 = {
        strings: {
          pluginNameAudio: "Audio",
          startAudioRecording: "Begin audio recording",
          stopAudioRecording: "Stop audio recording",
          allowAudioAccessTitle: "Please allow access to your microphone",
          allowAudioAccessDescription: "In order to record audio, please allow microphone access for this site.",
          noAudioTitle: "Microphone Not Available",
          noAudioDescription: "In order to record audio, please connect a microphone or another audio input device",
          recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
          recordingLength: "Recording length %{recording_length}",
          submitRecordedFile: "Submit recorded file",
          discardRecordedFile: "Discard recorded file"
        }
      };
    }
  });

  // ../packages/@uppy/audio/lib/Audio.js
  function _extends8() {
    _extends8 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends8.apply(this, arguments);
  }
  function _classPrivateFieldLooseBase20(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  function _classPrivateFieldLooseKey20(name) {
    return "__private_" + id20++ + "_" + name;
  }
  function _hasAudioCheck2() {
    if (!_classPrivateFieldLooseBase20(this, _mediaDevices)[_mediaDevices]) {
      return Promise.resolve(false);
    }
    return _classPrivateFieldLooseBase20(this, _mediaDevices)[_mediaDevices].enumerateDevices().then((devices) => {
      return devices.some((device) => device.kind === "audioinput");
    });
  }
  function _getAudio2() {
    const mimeType = _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks].find((blob2) => {
      var _blob$type;
      return ((_blob$type = blob2.type) == null ? void 0 : _blob$type.length) > 0;
    }).type;
    const fileExtension = getFileTypeExtension(mimeType);
    if (!fileExtension) {
      return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
    }
    const name = `audio-${Date.now()}.${fileExtension}`;
    const blob = new Blob(_classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks], {
      type: mimeType
    });
    const file = {
      source: this.id,
      name,
      data: new Blob([blob], {
        type: mimeType
      }),
      type: mimeType
    };
    return Promise.resolve(file);
  }
  var id20, packageJson22, _stream, _audioActive, _recordingChunks, _recorder, _capturedMediaFile, _mediaDevices, _supportsUserMedia, _hasAudioCheck, _start, _startRecording, _stopRecording, _discardRecordedAudio, _submit, _stop, _getAudio, _changeSource, _updateSources, Audio;
  var init_Audio = __esm({
    "../packages/@uppy/audio/lib/Audio.js"() {
      init_preact_module();
      init_lib2();
      init_getFileTypeExtension();
      init_supportsMediaRecorder2();
      init_RecordingScreen();
      init_PermissionsScreen2();
      init_locale14();
      id20 = 0;
      packageJson22 = {
        "version": "1.0.0-beta.2"
      };
      _stream = /* @__PURE__ */ _classPrivateFieldLooseKey20("stream");
      _audioActive = /* @__PURE__ */ _classPrivateFieldLooseKey20("audioActive");
      _recordingChunks = /* @__PURE__ */ _classPrivateFieldLooseKey20("recordingChunks");
      _recorder = /* @__PURE__ */ _classPrivateFieldLooseKey20("recorder");
      _capturedMediaFile = /* @__PURE__ */ _classPrivateFieldLooseKey20("capturedMediaFile");
      _mediaDevices = /* @__PURE__ */ _classPrivateFieldLooseKey20("mediaDevices");
      _supportsUserMedia = /* @__PURE__ */ _classPrivateFieldLooseKey20("supportsUserMedia");
      _hasAudioCheck = /* @__PURE__ */ _classPrivateFieldLooseKey20("hasAudioCheck");
      _start = /* @__PURE__ */ _classPrivateFieldLooseKey20("start");
      _startRecording = /* @__PURE__ */ _classPrivateFieldLooseKey20("startRecording");
      _stopRecording = /* @__PURE__ */ _classPrivateFieldLooseKey20("stopRecording");
      _discardRecordedAudio = /* @__PURE__ */ _classPrivateFieldLooseKey20("discardRecordedAudio");
      _submit = /* @__PURE__ */ _classPrivateFieldLooseKey20("submit");
      _stop = /* @__PURE__ */ _classPrivateFieldLooseKey20("stop");
      _getAudio = /* @__PURE__ */ _classPrivateFieldLooseKey20("getAudio");
      _changeSource = /* @__PURE__ */ _classPrivateFieldLooseKey20("changeSource");
      _updateSources = /* @__PURE__ */ _classPrivateFieldLooseKey20("updateSources");
      Audio = class extends UIPlugin_default {
        constructor(uppy, opts) {
          var _this;
          super(uppy, opts);
          _this = this;
          Object.defineProperty(this, _getAudio, {
            value: _getAudio2
          });
          Object.defineProperty(this, _hasAudioCheck, {
            value: _hasAudioCheck2
          });
          Object.defineProperty(this, _stream, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _audioActive, {
            writable: true,
            value: false
          });
          Object.defineProperty(this, _recordingChunks, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _recorder, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _capturedMediaFile, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _mediaDevices, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _supportsUserMedia, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _start, {
            writable: true,
            value: function(options) {
              if (options === void 0) {
                options = null;
              }
              if (!_classPrivateFieldLooseBase20(_this, _supportsUserMedia)[_supportsUserMedia]) {
                return Promise.reject(new Error("Microphone access not supported"));
              }
              _classPrivateFieldLooseBase20(_this, _audioActive)[_audioActive] = true;
              _classPrivateFieldLooseBase20(_this, _hasAudioCheck)[_hasAudioCheck]().then((hasAudio) => {
                _this.setPluginState({
                  hasAudio
                });
                return _classPrivateFieldLooseBase20(_this, _mediaDevices)[_mediaDevices].getUserMedia({
                  audio: true
                }).then((stream) => {
                  _classPrivateFieldLooseBase20(_this, _stream)[_stream] = stream;
                  let currentDeviceId = null;
                  const tracks = stream.getAudioTracks();
                  if (!options || !options.deviceId) {
                    currentDeviceId = tracks[0].getSettings().deviceId;
                  } else {
                    tracks.forEach((track) => {
                      if (track.getSettings().deviceId === options.deviceId) {
                        currentDeviceId = track.getSettings().deviceId;
                      }
                    });
                  }
                  _classPrivateFieldLooseBase20(_this, _updateSources)[_updateSources]();
                  _this.setPluginState({
                    currentDeviceId,
                    audioReady: true
                  });
                }).catch((err) => {
                  _this.setPluginState({
                    audioReady: false,
                    cameraError: err
                  });
                  _this.uppy.info(err.message, "error");
                });
              });
            }
          });
          Object.defineProperty(this, _startRecording, {
            writable: true,
            value: () => {
              _classPrivateFieldLooseBase20(this, _recorder)[_recorder] = new MediaRecorder(_classPrivateFieldLooseBase20(this, _stream)[_stream]);
              _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks] = [];
              let stoppingBecauseOfMaxSize = false;
              _classPrivateFieldLooseBase20(this, _recorder)[_recorder].addEventListener("dataavailable", (event) => {
                _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks].push(event.data);
                const {
                  restrictions
                } = this.uppy.opts;
                if (_classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks].length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
                  const totalSize = _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks].reduce((acc, chunk) => acc + chunk.size, 0);
                  const averageChunkSize = (totalSize - _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks][0].size) / (_classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks].length - 1);
                  const expectedEndChunkSize = averageChunkSize * 3;
                  const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
                  if (totalSize > maxSize) {
                    stoppingBecauseOfMaxSize = true;
                    this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
                    _classPrivateFieldLooseBase20(this, _stopRecording)[_stopRecording]();
                  }
                }
              });
              _classPrivateFieldLooseBase20(this, _recorder)[_recorder].start(500);
              this.recordingLengthTimer = setInterval(() => {
                const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
                this.setPluginState({
                  recordingLengthSeconds: currentRecordingLength + 1
                });
              }, 1e3);
              this.setPluginState({
                isRecording: true
              });
            }
          });
          Object.defineProperty(this, _stopRecording, {
            writable: true,
            value: () => {
              const stopped = new Promise((resolve) => {
                _classPrivateFieldLooseBase20(this, _recorder)[_recorder].addEventListener("stop", () => {
                  resolve();
                });
                _classPrivateFieldLooseBase20(this, _recorder)[_recorder].stop();
                clearInterval(this.recordingLengthTimer);
                this.setPluginState({
                  recordingLengthSeconds: 0
                });
              });
              return stopped.then(() => {
                this.setPluginState({
                  isRecording: false
                });
                return _classPrivateFieldLooseBase20(this, _getAudio)[_getAudio]();
              }).then((file) => {
                try {
                  _classPrivateFieldLooseBase20(this, _capturedMediaFile)[_capturedMediaFile] = file;
                  this.setPluginState({
                    recordedAudio: URL.createObjectURL(file.data)
                  });
                } catch (err) {
                  if (!err.isRestriction) {
                    this.uppy.log(err);
                  }
                }
              }).then(() => {
                _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks] = null;
                _classPrivateFieldLooseBase20(this, _recorder)[_recorder] = null;
              }, (error) => {
                _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks] = null;
                _classPrivateFieldLooseBase20(this, _recorder)[_recorder] = null;
                throw error;
              });
            }
          });
          Object.defineProperty(this, _discardRecordedAudio, {
            writable: true,
            value: () => {
              this.setPluginState({
                recordedAudio: null
              });
              _classPrivateFieldLooseBase20(this, _capturedMediaFile)[_capturedMediaFile] = null;
            }
          });
          Object.defineProperty(this, _submit, {
            writable: true,
            value: () => {
              try {
                if (_classPrivateFieldLooseBase20(this, _capturedMediaFile)[_capturedMediaFile]) {
                  this.uppy.addFile(_classPrivateFieldLooseBase20(this, _capturedMediaFile)[_capturedMediaFile]);
                }
              } catch (err) {
                if (!err.isRestriction) {
                  this.uppy.log(err, "error");
                }
              }
            }
          });
          Object.defineProperty(this, _stop, {
            writable: true,
            value: async () => {
              if (_classPrivateFieldLooseBase20(this, _stream)[_stream]) {
                const audioTracks = _classPrivateFieldLooseBase20(this, _stream)[_stream].getAudioTracks();
                audioTracks.forEach((track) => track.stop());
              }
              if (_classPrivateFieldLooseBase20(this, _recorder)[_recorder]) {
                await new Promise((resolve) => {
                  _classPrivateFieldLooseBase20(this, _recorder)[_recorder].addEventListener("stop", resolve, {
                    once: true
                  });
                  _classPrivateFieldLooseBase20(this, _recorder)[_recorder].stop();
                  clearInterval(this.recordingLengthTimer);
                });
              }
              _classPrivateFieldLooseBase20(this, _recordingChunks)[_recordingChunks] = null;
              _classPrivateFieldLooseBase20(this, _recorder)[_recorder] = null;
              _classPrivateFieldLooseBase20(this, _audioActive)[_audioActive] = false;
              _classPrivateFieldLooseBase20(this, _stream)[_stream] = null;
              this.setPluginState({
                recordedAudio: null,
                isRecording: false,
                recordingLengthSeconds: 0
              });
            }
          });
          Object.defineProperty(this, _changeSource, {
            writable: true,
            value: (deviceId) => {
              _classPrivateFieldLooseBase20(this, _stop)[_stop]();
              _classPrivateFieldLooseBase20(this, _start)[_start]({
                deviceId
              });
            }
          });
          Object.defineProperty(this, _updateSources, {
            writable: true,
            value: () => {
              _classPrivateFieldLooseBase20(this, _mediaDevices)[_mediaDevices].enumerateDevices().then((devices) => {
                this.setPluginState({
                  audioSources: devices.filter((device) => device.kind === "audioinput")
                });
              });
            }
          });
          _classPrivateFieldLooseBase20(this, _mediaDevices)[_mediaDevices] = navigator.mediaDevices;
          _classPrivateFieldLooseBase20(this, _supportsUserMedia)[_supportsUserMedia] = _classPrivateFieldLooseBase20(this, _mediaDevices)[_mediaDevices] != null;
          this.id = this.opts.id || "Audio";
          this.type = "acquirer";
          this.icon = () => h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32px",
            height: "32px",
            viewBox: "0 0 32 32"
          }, h("g", {
            fill: "none",
            "fill-rule": "evenodd"
          }, h("rect", {
            fill: "#9B59B6",
            width: "32",
            height: "32",
            rx: "16"
          }), h("path", {
            d: "M16 20c-2.21 0-4-1.71-4-3.818V9.818C12 7.71 13.79 6 16 6s4 1.71 4 3.818v6.364C20 18.29 18.21 20 16 20zm-6.364-7h.637c.351 0 .636.29.636.65v1.95c0 3.039 2.565 5.477 5.6 5.175 2.645-.264 4.582-2.692 4.582-5.407V13.65c0-.36.285-.65.636-.65h.637c.351 0 .636.29.636.65v1.631c0 3.642-2.544 6.888-6.045 7.382v1.387h2.227c.351 0 .636.29.636.65v.65c0 .36-.285.65-.636.65h-6.364a.643.643 0 0 1-.636-.65v-.65c0-.36.285-.65.636-.65h2.227v-1.372C11.637 22.2 9 19.212 9 15.6v-1.95c0-.36.285-.65.636-.65z",
            fill: "#FFF",
            "fill-rule": "nonzero"
          })));
          this.defaultLocale = locale_default14;
          this.opts = {
            ...opts
          };
          this.i18nInit();
          this.title = this.i18n("pluginNameAudio");
          this.setPluginState({
            hasAudio: false,
            audioReady: false,
            cameraError: null,
            recordingLengthSeconds: 0,
            audioSources: [],
            currentDeviceId: null
          });
        }
        render() {
          if (!_classPrivateFieldLooseBase20(this, _audioActive)[_audioActive]) {
            _classPrivateFieldLooseBase20(this, _start)[_start]();
          }
          const audioState = this.getPluginState();
          if (!audioState.audioReady || !audioState.hasAudio) {
            return h(PermissionsScreen_default2, {
              icon: this.icon,
              i18n: this.i18n,
              hasAudio: audioState.hasAudio
            });
          }
          return h(
            RecordingScreen,
            _extends8({}, audioState, {
              audioActive: _classPrivateFieldLooseBase20(this, _audioActive)[_audioActive],
              onChangeSource: _classPrivateFieldLooseBase20(this, _changeSource)[_changeSource],
              onStartRecording: _classPrivateFieldLooseBase20(this, _startRecording)[_startRecording],
              onStopRecording: _classPrivateFieldLooseBase20(this, _stopRecording)[_stopRecording],
              onDiscardRecordedAudio: _classPrivateFieldLooseBase20(this, _discardRecordedAudio)[_discardRecordedAudio],
              onSubmit: _classPrivateFieldLooseBase20(this, _submit)[_submit],
              onStop: _classPrivateFieldLooseBase20(this, _stop)[_stop],
              i18n: this.i18n,
              showAudioSourceDropdown: this.opts.showAudioSourceDropdown,
              supportsRecording: supportsMediaRecorder2(),
              recording: audioState.isRecording,
              stream: _classPrivateFieldLooseBase20(this, _stream)[_stream]
            })
          );
        }
        install() {
          this.setPluginState({
            audioReady: false,
            recordingLengthSeconds: 0
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
          if (_classPrivateFieldLooseBase20(this, _mediaDevices)[_mediaDevices]) {
            _classPrivateFieldLooseBase20(this, _updateSources)[_updateSources]();
            _classPrivateFieldLooseBase20(this, _mediaDevices)[_mediaDevices].ondevicechange = () => {
              _classPrivateFieldLooseBase20(this, _updateSources)[_updateSources]();
              if (_classPrivateFieldLooseBase20(this, _stream)[_stream]) {
                let restartStream = true;
                const {
                  audioSources,
                  currentDeviceId
                } = this.getPluginState();
                audioSources.forEach((audioSource) => {
                  if (currentDeviceId === audioSource.deviceId) {
                    restartStream = false;
                  }
                });
                if (restartStream) {
                  _classPrivateFieldLooseBase20(this, _stop)[_stop]();
                  _classPrivateFieldLooseBase20(this, _start)[_start]();
                }
              }
            };
          }
        }
        uninstall() {
          if (_classPrivateFieldLooseBase20(this, _stream)[_stream]) {
            _classPrivateFieldLooseBase20(this, _stop)[_stop]();
          }
          this.unmount();
        }
      };
      Audio.VERSION = packageJson22.version;
    }
  });

  // ../packages/@uppy/audio/lib/index.js
  var lib_exports15 = {};
  __export(lib_exports15, {
    default: () => Audio
  });
  var init_lib21 = __esm({
    "../packages/@uppy/audio/lib/index.js"() {
      init_Audio();
    }
  });

  // ../packages/@uppy/screen-capture/lib/ScreenRecIcon.js
  var ScreenRecIcon_default;
  var init_ScreenRecIcon = __esm({
    "../packages/@uppy/screen-capture/lib/ScreenRecIcon.js"() {
      init_preact_module();
      ScreenRecIcon_default = () => {
        return h("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, h("g", {
          fill: "none",
          fillRule: "evenodd"
        }, h("rect", {
          className: "uppy-ProviderIconBg",
          fill: "#2C3E50",
          width: "32",
          height: "32",
          rx: "16"
        }), h("path", {
          d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z",
          fill: "#FFF",
          fillRule: "nonzero"
        }), h("circle", {
          fill: "#FFF",
          cx: "16",
          cy: "16",
          r: "2"
        })));
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/RecordButton.js
  function RecordButton3(_ref) {
    let {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    } = _ref;
    if (recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec",
        type: "button",
        title: i18n("stopCapturing"),
        "aria-label": i18n("stopCapturing"),
        onClick: onStopRecording,
        "data-uppy-super-focusable": true
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "100",
        height: "100",
        viewBox: "0 0 100 100"
      }, h("rect", {
        x: "15",
        y: "15",
        width: "70",
        height: "70"
      })));
    }
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video",
      type: "button",
      title: i18n("startCapturing"),
      "aria-label": i18n("startCapturing"),
      onClick: onStartRecording,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "100",
      height: "100",
      viewBox: "0 0 100 100"
    }, h("circle", {
      cx: "50",
      cy: "50",
      r: "40"
    })));
  }
  var init_RecordButton3 = __esm({
    "../packages/@uppy/screen-capture/lib/RecordButton.js"() {
      init_preact_module();
    }
  });

  // ../packages/@uppy/screen-capture/lib/SubmitButton.js
  function SubmitButton3(_ref) {
    let {
      recording,
      recordedVideo,
      onSubmit,
      i18n
    } = _ref;
    if (recordedVideo && !recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit",
        type: "button",
        title: i18n("submitRecordedFile"),
        "aria-label": i18n("submitRecordedFile"),
        onClick: onSubmit,
        "data-uppy-super-focusable": true
      }, h("svg", {
        width: "12",
        height: "9",
        viewBox: "0 0 12 9",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon"
      }, h("path", {
        fill: "#fff",
        fillRule: "nonzero",
        d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
      })));
    }
    return null;
  }
  var init_SubmitButton3 = __esm({
    "../packages/@uppy/screen-capture/lib/SubmitButton.js"() {
      init_preact_module();
    }
  });

  // ../packages/@uppy/screen-capture/lib/StopWatch.js
  var StopWatch, StopWatch_default;
  var init_StopWatch = __esm({
    "../packages/@uppy/screen-capture/lib/StopWatch.js"() {
      init_preact_module();
      StopWatch = class extends d {
        constructor(props) {
          super(props);
          this.state = {
            elapsedTime: 0
          };
          this.wrapperStyle = {
            width: "100%",
            height: "100%",
            display: "flex"
          };
          this.overlayStyle = {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "black",
            opacity: 0.7
          };
          this.infoContainerStyle = {
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
            marginBottom: "auto",
            zIndex: 1,
            color: "white"
          };
          this.infotextStyle = {
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
            fontSize: "1.5rem"
          };
          this.timeStyle = {
            display: "block",
            fontWeight: "bold",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "3rem",
            fontFamily: "Courier New"
          };
        }
        startTimer() {
          this.timerTick();
          this.timerRunning = true;
        }
        resetTimer() {
          clearTimeout(this.timer);
          this.setState({
            elapsedTime: 0
          });
          this.timerRunning = false;
        }
        timerTick() {
          this.timer = setTimeout(() => {
            this.setState((state) => ({
              elapsedTime: state.elapsedTime + 1
            }));
            this.timerTick();
          }, 1e3);
        }
        fmtMSS(s3) {
          return (s3 - (s3 %= 60)) / 60 + (s3 > 9 ? ":" : ":0") + s3;
        }
        render() {
          const {
            recording,
            i18n
          } = {
            ...this.props
          };
          const {
            elapsedTime
          } = this.state;
          const minAndSec = this.fmtMSS(elapsedTime);
          if (recording && !this.timerRunning) {
            this.startTimer();
          }
          if (!recording && this.timerRunning) {
            this.resetTimer();
          }
          if (recording) {
            return h("div", {
              style: this.wrapperStyle
            }, h("div", {
              style: this.overlayStyle
            }), h("div", {
              style: this.infoContainerStyle
            }, h("div", {
              style: this.infotextStyle
            }, i18n("recording")), h("div", {
              style: this.timeStyle
            }, minAndSec)));
          }
          return null;
        }
      };
      StopWatch_default = StopWatch;
    }
  });

  // ../packages/@uppy/screen-capture/lib/StreamStatus.js
  var StreamStatus_default;
  var init_StreamStatus = __esm({
    "../packages/@uppy/screen-capture/lib/StreamStatus.js"() {
      init_preact_module();
      StreamStatus_default = (_ref) => {
        let {
          streamActive,
          i18n
        } = _ref;
        if (streamActive) {
          return h("div", {
            title: i18n("streamActive"),
            "aria-label": i18n("streamActive"),
            className: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive"
          }, h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, h("path", {
            d: "M0 0h24v24H0z",
            opacity: ".1",
            fill: "none"
          }), h("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          }), h("path", {
            d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          })));
        }
        return h("div", {
          title: i18n("streamPassive"),
          "aria-label": i18n("streamPassive"),
          className: "uppy-ScreenCapture-icon--stream"
        }, h("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24"
        }, h("path", {
          d: "M0 0h24v24H0z",
          opacity: ".1",
          fill: "none"
        }), h("path", {
          d: "M0 0h24v24H0z",
          fill: "none"
        }), h("path", {
          d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z"
        })));
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/RecorderScreen.js
  function _extends9() {
    _extends9 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends9.apply(this, arguments);
  }
  var RecorderScreen, RecorderScreen_default;
  var init_RecorderScreen = __esm({
    "../packages/@uppy/screen-capture/lib/RecorderScreen.js"() {
      init_preact_module();
      init_RecordButton3();
      init_SubmitButton3();
      init_StopWatch();
      init_StreamStatus();
      RecorderScreen = class extends d {
        componentWillUnmount() {
          const {
            onStop
          } = this.props;
          onStop();
        }
        render() {
          const {
            recording,
            stream: videoStream,
            recordedVideo
          } = this.props;
          const videoProps = {
            playsinline: true
          };
          if (recording || !recordedVideo && !recording) {
            videoProps.muted = true;
            videoProps.autoplay = true;
            videoProps.srcObject = videoStream;
          }
          if (recordedVideo && !recording) {
            videoProps.muted = false;
            videoProps.controls = true;
            videoProps.src = recordedVideo;
            if (this.videoElement) {
              this.videoElement.srcObject = void 0;
            }
          }
          return h("div", {
            className: "uppy uppy-ScreenCapture-container"
          }, h("div", {
            className: "uppy-ScreenCapture-videoContainer"
          }, h(StreamStatus_default, this.props), h("video", _extends9({
            ref: (videoElement) => {
              this.videoElement = videoElement;
            },
            className: "uppy-ScreenCapture-video"
          }, videoProps)), h(StopWatch_default, this.props)), h("div", {
            className: "uppy-ScreenCapture-buttonContainer"
          }, h(RecordButton3, this.props), h(SubmitButton3, this.props)));
        }
      };
      RecorderScreen_default = RecorderScreen;
    }
  });

  // ../packages/@uppy/screen-capture/lib/locale.js
  var locale_default15;
  var init_locale15 = __esm({
    "../packages/@uppy/screen-capture/lib/locale.js"() {
      locale_default15 = {
        strings: {
          startCapturing: "Begin screen capturing",
          stopCapturing: "Stop screen capturing",
          submitRecordedFile: "Submit recorded file",
          streamActive: "Stream active",
          streamPassive: "Stream passive",
          micDisabled: "Microphone access denied by user",
          recording: "Recording"
        }
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/ScreenCapture.js
  function _extends10() {
    _extends10 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends10.apply(this, arguments);
  }
  function isScreenRecordingSupported() {
    var _navigator$mediaDevic;
    return window.MediaRecorder && ((_navigator$mediaDevic = navigator.mediaDevices) == null ? void 0 : _navigator$mediaDevic.getDisplayMedia);
  }
  function getMediaDevices2() {
    return window.MediaRecorder && navigator.mediaDevices;
  }
  var packageJson23, ScreenCapture;
  var init_ScreenCapture = __esm({
    "../packages/@uppy/screen-capture/lib/ScreenCapture.js"() {
      init_preact_module();
      init_lib2();
      init_getFileTypeExtension();
      init_ScreenRecIcon();
      init_RecorderScreen();
      init_locale15();
      packageJson23 = {
        "version": "3.0.0-beta.3"
      };
      ScreenCapture = class extends UIPlugin_default {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.mediaDevices = getMediaDevices2();
          this.protocol = location.protocol === "https:" ? "https" : "http";
          this.id = this.opts.id || "ScreenCapture";
          this.title = this.opts.title || "Screencast";
          this.type = "acquirer";
          this.icon = ScreenRecIcon_default;
          this.defaultLocale = locale_default15;
          const defaultOptions4 = {
            displayMediaConstraints: {
              video: {
                width: 1280,
                height: 720,
                frameRate: {
                  ideal: 3,
                  max: 5
                },
                cursor: "motion",
                displaySurface: "monitor"
              }
            },
            userMediaConstraints: {
              audio: true
            },
            preferredVideoMimeType: "video/webm"
          };
          this.opts = {
            ...defaultOptions4,
            ...opts
          };
          this.i18nInit();
          this.install = this.install.bind(this);
          this.setPluginState = this.setPluginState.bind(this);
          this.render = this.render.bind(this);
          this.start = this.start.bind(this);
          this.stop = this.stop.bind(this);
          this.startRecording = this.startRecording.bind(this);
          this.stopRecording = this.stopRecording.bind(this);
          this.submit = this.submit.bind(this);
          this.streamInterrupted = this.streamInactivated.bind(this);
          this.captureActive = false;
          this.capturedMediaFile = null;
        }
        install() {
          if (!isScreenRecordingSupported()) {
            this.uppy.log("Screen recorder access is not supported", "error");
            return null;
          }
          this.setPluginState({
            streamActive: false,
            audioStreamActive: false
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
          return void 0;
        }
        uninstall() {
          if (this.videoStream) {
            this.stop();
          }
          this.unmount();
        }
        start() {
          if (!this.mediaDevices) {
            return Promise.reject(new Error("Screen recorder access not supported"));
          }
          this.captureActive = true;
          this.selectAudioStreamSource();
          return this.selectVideoStreamSource().then((res) => {
            if (res === false) {
              if (this.parent && this.parent.hideAllPanels) {
                this.parent.hideAllPanels();
                this.captureActive = false;
              }
            }
          });
        }
        selectVideoStreamSource() {
          if (this.videoStream) {
            return new Promise((resolve) => resolve(this.videoStream));
          }
          return this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((videoStream) => {
            this.videoStream = videoStream;
            this.videoStream.addEventListener("inactive", () => {
              this.streamInactivated();
            });
            this.setPluginState({
              streamActive: true
            });
            return videoStream;
          }).catch((err) => {
            this.setPluginState({
              screenRecError: err
            });
            this.userDenied = true;
            setTimeout(() => {
              this.userDenied = false;
            }, 1e3);
            return false;
          });
        }
        selectAudioStreamSource() {
          if (this.audioStream) {
            return new Promise((resolve) => resolve(this.audioStream));
          }
          return this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((audioStream) => {
            this.audioStream = audioStream;
            this.setPluginState({
              audioStreamActive: true
            });
            return audioStream;
          }).catch((err) => {
            if (err.name === "NotAllowedError") {
              this.uppy.info(this.i18n("micDisabled"), "error", 5e3);
            }
            return false;
          });
        }
        startRecording() {
          const options = {};
          this.capturedMediaFile = null;
          this.recordingChunks = [];
          const {
            preferredVideoMimeType
          } = this.opts;
          this.selectVideoStreamSource().then((videoStream) => {
            if (preferredVideoMimeType && MediaRecorder.isTypeSupported(preferredVideoMimeType) && getFileTypeExtension(preferredVideoMimeType)) {
              options.mimeType = preferredVideoMimeType;
            }
            const tracks = [videoStream.getVideoTracks()[0]];
            if (this.audioStream) {
              tracks.push(this.audioStream.getAudioTracks()[0]);
            }
            this.outputStream = new MediaStream(tracks);
            this.recorder = new MediaRecorder(this.outputStream, options);
            this.recorder.addEventListener("dataavailable", (event) => {
              this.recordingChunks.push(event.data);
            });
            this.recorder.start();
            this.setPluginState({
              recording: true
            });
          }).catch((err) => {
            this.uppy.log(err, "error");
          });
        }
        streamInactivated() {
          const {
            recordedVideo,
            recording
          } = {
            ...this.getPluginState()
          };
          if (!recordedVideo && !recording) {
            if (this.parent && this.parent.hideAllPanels) {
              this.parent.hideAllPanels();
            }
          } else if (recording) {
            this.uppy.log("Capture stream inactive \u2014 stop recording");
            this.stopRecording();
          }
          this.videoStream = null;
          this.audioStream = null;
          this.setPluginState({
            streamActive: false,
            audioStreamActive: false
          });
        }
        stopRecording() {
          const stopped = new Promise((resolve) => {
            this.recorder.addEventListener("stop", () => {
              resolve();
            });
            this.recorder.stop();
          });
          return stopped.then(() => {
            this.setPluginState({
              recording: false
            });
            return this.getVideo();
          }).then((file) => {
            this.capturedMediaFile = file;
            this.setPluginState({
              recordedVideo: URL.createObjectURL(file.data)
            });
          }).then(() => {
            this.recordingChunks = null;
            this.recorder = null;
          }, (error) => {
            this.recordingChunks = null;
            this.recorder = null;
            throw error;
          });
        }
        submit() {
          try {
            if (this.capturedMediaFile) {
              this.uppy.addFile(this.capturedMediaFile);
            }
          } catch (err) {
            if (!err.isRestriction) {
              this.uppy.log(err, "error");
            }
          }
        }
        stop() {
          if (this.videoStream) {
            this.videoStream.getVideoTracks().forEach((track) => {
              track.stop();
            });
            this.videoStream.getAudioTracks().forEach((track) => {
              track.stop();
            });
            this.videoStream = null;
          }
          if (this.audioStream) {
            this.audioStream.getAudioTracks().forEach((track) => {
              track.stop();
            });
            this.audioStream.getVideoTracks().forEach((track) => {
              track.stop();
            });
            this.audioStream = null;
          }
          if (this.outputStream) {
            this.outputStream.getAudioTracks().forEach((track) => {
              track.stop();
            });
            this.outputStream.getVideoTracks().forEach((track) => {
              track.stop();
            });
            this.outputStream = null;
          }
          this.setPluginState({
            recordedVideo: null
          });
          this.captureActive = false;
        }
        getVideo() {
          const mimeType = this.recordingChunks[0].type;
          const fileExtension = getFileTypeExtension(mimeType);
          if (!fileExtension) {
            return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
          }
          const name = `screencap-${Date.now()}.${fileExtension}`;
          const blob = new Blob(this.recordingChunks, {
            type: mimeType
          });
          const file = {
            source: this.id,
            name,
            data: new Blob([blob], {
              type: mimeType
            }),
            type: mimeType
          };
          return Promise.resolve(file);
        }
        render() {
          const recorderState = this.getPluginState();
          if (!recorderState.streamActive && !this.captureActive && !this.userDenied) {
            this.start();
          }
          return h(RecorderScreen_default, _extends10({}, recorderState, {
            onStartRecording: this.startRecording,
            onStopRecording: this.stopRecording,
            onStop: this.stop,
            onSubmit: this.submit,
            i18n: this.i18n,
            stream: this.videoStream
          }));
        }
      };
      ScreenCapture.VERSION = packageJson23.version;
    }
  });

  // ../packages/@uppy/screen-capture/lib/index.js
  var lib_exports16 = {};
  __export(lib_exports16, {
    default: () => ScreenCapture
  });
  var init_lib22 = __esm({
    "../packages/@uppy/screen-capture/lib/index.js"() {
      init_ScreenCapture();
    }
  });

  // ../packages/@uppy/robodog/lib/addProviders.js
  var require_addProviders = __commonJS({
    "../packages/@uppy/robodog/lib/addProviders.js"(exports, module) {
      var Transloadit2 = (init_lib10(), __toCommonJS(lib_exports5));
      var has2 = (init_hasProperty(), __toCommonJS(hasProperty_exports));
      var remoteProviders = {
        dropbox: (init_lib12(), __toCommonJS(lib_exports6)),
        "google-drive": (init_lib13(), __toCommonJS(lib_exports7)),
        instagram: (init_lib14(), __toCommonJS(lib_exports8)),
        facebook: (init_lib15(), __toCommonJS(lib_exports9)),
        onedrive: (init_lib16(), __toCommonJS(lib_exports10)),
        box: (init_lib17(), __toCommonJS(lib_exports11)),
        unsplash: (init_lib18(), __toCommonJS(lib_exports12)),
        url: (init_lib19(), __toCommonJS(lib_exports13))
      };
      var localProviders = {
        webcam: (init_lib20(), __toCommonJS(lib_exports14)),
        audio: (init_lib21(), __toCommonJS(lib_exports15)),
        "screen-capture": (init_lib22(), __toCommonJS(lib_exports16))
      };
      var remoteProviderOptionNames = ["companionUrl", "companionAllowedHosts", "companionHeaders", "target"];
      var localProviderOptionNames = ["target"];
      function addRemoteProvider(uppy, name, opts) {
        const Provider2 = remoteProviders[name];
        const providerOptions = {
          companionUrl: Transloadit2.COMPANION,
          companionAllowedHosts: Transloadit2.COMPANION_PATTERN
        };
        remoteProviderOptionNames.forEach((name2) => {
          if (has2(opts, name2))
            providerOptions[name2] = opts[name2];
        });
        if (typeof opts[name] === "object") {
          const overrides = {
            ...opts[name]
          };
          if (overrides.credentialsName) {
            const {
              key
            } = opts.params.auth;
            overrides.companionKeysParams = {
              key,
              credentialsName: overrides.credentialsName
            };
            delete overrides.credentialsName;
          }
          Object.assign(providerOptions, overrides);
        }
        uppy.use(Provider2, providerOptions);
      }
      function addLocalProvider(uppy, name, opts) {
        const Provider2 = localProviders[name];
        const providerOptions = {};
        localProviderOptionNames.forEach((name2) => {
          if (has2(opts, name2))
            providerOptions[name2] = opts[name2];
        });
        if (typeof opts[name] === "object") {
          Object.assign(providerOptions, opts[name]);
        }
        uppy.use(Provider2, providerOptions);
      }
      function addProviders(uppy, names, opts) {
        if (opts === void 0) {
          opts = {};
        }
        names.forEach((name) => {
          if (has2(remoteProviders, name)) {
            addRemoteProvider(uppy, name, opts);
          } else if (has2(localProviders, name)) {
            addLocalProvider(uppy, name, opts);
          } else {
            const validNames = [...Object.keys(remoteProviders), ...Object.keys(localProviders)];
            const expectedNameString = validNames.sort().map((validName) => `'${validName}'`).join(", ");
            throw new Error(`Unexpected provider '${name}', expected one of [${expectedNameString}]`);
          }
        });
      }
      module.exports = addProviders;
    }
  });

  // ../packages/@uppy/robodog/lib/form.js
  var require_form = __commonJS({
    "../packages/@uppy/robodog/lib/form.js"(exports, module) {
      var Uppy2 = (init_lib2(), __toCommonJS(lib_exports));
      var Form2 = (init_lib3(), __toCommonJS(lib_exports2));
      var StatusBar3 = (init_lib4(), __toCommonJS(lib_exports3));
      var findDOMElement2 = (init_findDOMElement(), __toCommonJS(findDOMElement_exports));
      var has2 = (init_hasProperty(), __toCommonJS(hasProperty_exports));
      var AttachFileInputs = require_AttachFileInputs();
      var TransloaditFormResult = require_TransloaditFormResult();
      var addDashboardPlugin = require_addDashboardPlugin();
      var addTransloaditPlugin = require_addTransloaditPlugin();
      var addProviders = require_addProviders();
      var defaultLocaleStrings = {
        chooseFiles: "Choose files"
      };
      function mergeDefaultLocale(defaults, userProvided) {
        if (userProvided === void 0) {
          userProvided = {};
        }
        const strings = userProvided.strings || {};
        return {
          ...userProvided,
          strings: {
            ...defaults,
            ...strings
          }
        };
      }
      function form(target, opts) {
        if (!opts)
          throw new TypeError("robodog.form: must provide an options object");
        opts = {
          ...opts,
          locale: mergeDefaultLocale(defaultLocaleStrings, opts.locale)
        };
        const uppy = new Uppy2(opts);
        addTransloaditPlugin(uppy, opts);
        uppy.use(TransloaditFormResult, {
          target,
          transloaditPluginId: "Transloadit",
          name: "transloadit"
        });
        let submitOnSuccess = true;
        if (has2(opts, "submitOnSuccess")) {
          submitOnSuccess = !!opts.submitOnSuccess;
        }
        const formOptions = {
          target,
          triggerUploadOnSubmit: true,
          submitOnSuccess,
          addResultToForm: false
        };
        if (has2(opts, "triggerUploadOnSubmit")) {
          formOptions.triggerUploadOnSubmit = opts.triggerUploadOnSubmit;
        }
        uppy.use(Form2, formOptions);
        const useDashboard = opts.dashboard || opts.modal;
        if (useDashboard) {
          const dashboardTarget = findDOMElement2(opts.dashboard) || document.body;
          const dashboardId = "form:Dashboard";
          const dashboardOpts = {
            id: dashboardId,
            target: dashboardTarget
          };
          if (opts.modal) {
            const trigger = 'input[type="file"]';
            const button = document.createElement("button");
            button.textContent = uppy.i18n("chooseFiles");
            button.type = "button";
            const old = findDOMElement2(trigger, findDOMElement2(target));
            old.parentNode.replaceChild(button, old);
            dashboardOpts.inline = false;
            dashboardOpts.trigger = button;
          } else {
            dashboardOpts.inline = true;
            dashboardOpts.hideUploadButton = true;
          }
          addDashboardPlugin(uppy, opts, dashboardOpts);
          if (Array.isArray(opts.providers)) {
            addProviders(uppy, opts.providers, {
              ...opts,
              target: uppy.getPlugin(dashboardId)
            });
          }
        } else {
          uppy.use(AttachFileInputs, {
            target
          });
        }
        if (opts.statusBar) {
          uppy.use(StatusBar3, {
            target: opts.statusBar,
            hideUploadButton: true,
            hideAfterFinish: true,
            hideRetryButton: true,
            hidePauseResumeButtons: true,
            hideCancelButtons: true
          });
        }
        return uppy;
      }
      module.exports = form;
    }
  });

  // ../packages/@uppy/robodog/lib/createUppy.js
  var require_createUppy = __commonJS({
    "../packages/@uppy/robodog/lib/createUppy.js"(exports, module) {
      var Uppy2 = (init_lib2(), __toCommonJS(lib_exports));
      var has2 = (init_hasProperty(), __toCommonJS(hasProperty_exports));
      var eventNames = {
        onFileAdded: "file-added",
        onFileRemoved: "file-removed",
        onImportError: "transloadit:import-error",
        onAssemblyCreated: "transloadit:assembly-created",
        onAssemblyExecuting: "transloadit:assembly-executing",
        onAssemblyError: "transloadit:assembly-error",
        onAssemblyComplete: "transloadit:complete",
        onResult: "transloadit:result",
        onStart: "upload",
        onPause: "pause-all",
        onFilePause: "upload-pause",
        onCancel: "cancel-all",
        onError: "error",
        onFileCancel: "upload-cancel",
        onFileProgress: "upload-progress",
        onFileError: "upload-error",
        onUploaded: "transloadit:upload",
        onComplete: "complete"
      };
      var uppyOptionNames = ["autoProceed", "restrictions", "meta", "onBeforeFileAdded", "onBeforeUpload", "debug"];
      function createUppy(opts, overrides) {
        if (overrides === void 0) {
          overrides = {};
        }
        const uppyOptions = {};
        uppyOptionNames.forEach((name) => {
          if (has2(opts, name))
            uppyOptions[name] = opts[name];
        });
        Object.assign(uppyOptions, overrides);
        const uppy = new Uppy2(uppyOptions);
        Object.keys(eventNames).forEach((optionName) => {
          const eventName = eventNames[optionName];
          if (typeof opts[optionName] === "function") {
            uppy.on(eventName, opts[optionName]);
          }
        });
        if (typeof opts.onProgress === "function") {
          uppy.on("upload-progress", () => {
            const {
              totalProgress
            } = uppy.getState();
            opts.onProgress.call(uppy, totalProgress);
          });
        }
        return uppy;
      }
      module.exports = createUppy;
    }
  });

  // ../packages/@uppy/robodog/lib/dashboard.js
  var require_dashboard = __commonJS({
    "../packages/@uppy/robodog/lib/dashboard.js"(exports, module) {
      var createUppy = require_createUppy();
      var addDashboardPlugin = require_addDashboardPlugin();
      var addTransloaditPlugin = require_addTransloaditPlugin();
      var addProviders = require_addProviders();
      function dashboard(target, opts) {
        if (opts === void 0) {
          opts = {};
        }
        const inline = opts.inline == null ? true : opts.inline;
        const pluginId = "Dashboard";
        const uppy = createUppy(opts);
        addTransloaditPlugin(uppy, opts);
        addDashboardPlugin(uppy, opts, {
          id: pluginId,
          inline,
          target,
          closeAfterFinish: false
        });
        if (Array.isArray(opts.providers)) {
          addProviders(uppy, opts.providers, {
            ...opts,
            target: uppy.getPlugin(pluginId)
          });
        }
        return uppy;
      }
      module.exports = dashboard;
    }
  });

  // ../packages/@uppy/robodog/lib/pick.js
  var require_pick = __commonJS({
    "../packages/@uppy/robodog/lib/pick.js"(exports, module) {
      var createUppy = require_createUppy();
      var addDashboardPlugin = require_addDashboardPlugin();
      var addTransloaditPlugin = require_addTransloaditPlugin();
      var addProviders = require_addProviders();
      var CANCEL = {};
      function pick2(opts) {
        if (opts === void 0) {
          opts = {};
        }
        const target = opts.target || document.body;
        const pluginId = "pick";
        const uppy = createUppy(opts, {
          allowMultipleUploadBatches: false
        });
        addTransloaditPlugin(uppy, opts);
        addDashboardPlugin(uppy, opts, {
          id: pluginId,
          target,
          closeAfterFinish: true
        });
        if (Array.isArray(opts.providers)) {
          addProviders(uppy, opts.providers, {
            ...opts,
            target: uppy.getPlugin(pluginId)
          });
        }
        return new Promise((resolve, reject) => {
          uppy.on("complete", (result2) => {
            if (result2.failed.length === 0) {
              resolve(result2);
            }
          });
          uppy.on("error", reject);
          uppy.on("cancel-all", () => reject(CANCEL));
          uppy.getPlugin(pluginId).openModal();
        }).then((result2) => {
          return result2;
        }, (err) => {
          if (err === CANCEL) {
            uppy.getPlugin(pluginId).requestCloseModal();
            return null;
          }
          throw err;
        });
      }
      module.exports = pick2;
    }
  });

  // ../packages/@uppy/robodog/lib/upload.js
  var require_upload = __commonJS({
    "../packages/@uppy/robodog/lib/upload.js"(exports, module) {
      var toArray = (init_toArray(), __toCommonJS(toArray_exports));
      var createUppy = require_createUppy();
      var addTransloaditPlugin = require_addTransloaditPlugin();
      function upload(files, opts) {
        if (opts === void 0) {
          opts = {};
        }
        if (!Array.isArray(files) && typeof files.length === "number") {
          files = toArray(files);
        }
        const uppy = createUppy(opts, {
          allowMultipleUploads: false
        });
        addTransloaditPlugin(uppy, opts);
        files.forEach((file) => {
          uppy.addFile({
            data: file,
            type: file.type,
            name: file.name,
            meta: file.meta || {}
          });
        });
        return uppy.upload();
      }
      module.exports = upload;
    }
  });

  // ../packages/@uppy/robodog/lib/index.js
  var require_lib = __commonJS({
    "../packages/@uppy/robodog/lib/index.js"(exports, module) {
      var form = require_form();
      var dashboard = require_dashboard();
      var pick2 = require_pick();
      var upload = require_upload();
      module.exports = {
        dashboard,
        form,
        pick: pick2,
        upload,
        VERSION: "3.0.0-beta.4"
      };
    }
  });

  // src/examples/markdown-snippets/app.es6
  var import_marked = __toESM(require_marked());
  var import_drag_drop = __toESM(require_drag_drop());
  var import_robodog = __toESM(require_lib());
  var TRANSLOADIT_EXAMPLE_KEY = "35c1aed03f5011e982b6afe82599b6a0";
  var TRANSLOADIT_EXAMPLE_TEMPLATE = "0b2ee2bc25dc43619700c2ce0a75164a";
  var MarkdownTextarea = class {
    constructor(element) {
      this.element = element;
      this.controls = document.createElement("div");
      this.controls.classList.add("mdtxt-controls");
      this.uploadLine = document.createElement("button");
      this.uploadLine.setAttribute("type", "button");
      this.uploadLine.classList.add("form-upload");
      this.uploadLine.appendChild(document.createTextNode("Tap here to upload an attachment"));
    }
    install() {
      const {
        element
      } = this;
      const wrapper = document.createElement("div");
      wrapper.classList.add("mdtxt");
      element.parentNode.replaceChild(wrapper, element);
      wrapper.appendChild(this.controls);
      wrapper.appendChild(element);
      wrapper.appendChild(this.uploadLine);
      this.setupUploadLine();
      this.setupTextareaDrop();
    }
    setupTextareaDrop() {
      (0, import_drag_drop.default)(this.element, (files) => {
        this.uploadFiles(files);
      });
    }
    setupUploadLine() {
      this.uploadLine.addEventListener("click", () => {
        this.pickFiles();
      });
    }
    reportUploadError(err) {
      this.uploadLine.classList.add("error");
      const message = document.createElement("span");
      message.appendChild(document.createTextNode(err.message));
      this.uploadLine.insertChild(message, this.uploadLine.firstChild);
    }
    unreportUploadError() {
      this.uploadLine.classList.remove("error");
      const message = this.uploadLine.querySelector("message");
      if (message) {
        this.uploadLine.removeChild(message);
      }
    }
    insertAttachments(attachments) {
      attachments.forEach((attachment) => {
        const {
          file,
          thumb
        } = attachment;
        const link = `
[LABEL](${file.ssl_url})
`;
        const labelText = `View File ${file.basename}`;
        if (thumb) {
          this.element.value += link.replace("LABEL", `![${labelText}](${thumb.ssl_url})`);
        } else {
          this.element.value += link.replace("LABEL", labelText);
        }
      });
    }
    uploadFiles(files) {
      import_robodog.default.upload(files, {
        waitForEncoding: true,
        params: {
          auth: {
            key: TRANSLOADIT_EXAMPLE_KEY
          },
          template_id: TRANSLOADIT_EXAMPLE_TEMPLATE
        }
      }).then((result2) => {
        if (result2 === null)
          return;
        this.insertAttachments(
          matchFilesAndThumbs(result2.results)
        );
      }).catch((err) => {
        console.error(err);
        this.reportUploadError(err);
      });
    }
    pickFiles() {
      import_robodog.default.pick({
        waitForEncoding: true,
        params: {
          auth: {
            key: TRANSLOADIT_EXAMPLE_KEY
          },
          template_id: TRANSLOADIT_EXAMPLE_TEMPLATE
        },
        providers: ["webcam", "url", "instagram", "google-drive", "dropbox", "box", "unsplash", "audio", "screen-capture"]
      }).then((result2) => {
        if (result2 === null)
          return;
        this.insertAttachments(
          matchFilesAndThumbs(result2.results)
        );
      }).catch((err) => {
        console.error(err);
        this.reportUploadError(err);
      });
    }
  };
  var textarea = new MarkdownTextarea(document.querySelector("#new textarea"));
  textarea.install();
  function renderSnippet(title, text) {
    const template = document.querySelector("#snippet");
    const newSnippet = document.importNode(template.content, true);
    const titleEl = newSnippet.querySelector(".snippet-title");
    const contentEl = newSnippet.querySelector(".snippet-content");
    titleEl.appendChild(document.createTextNode(title));
    contentEl.innerHTML = (0, import_marked.default)(text);
    const list = document.querySelector("#snippets");
    list.insertBefore(newSnippet, list.firstChild);
  }
  function saveSnippet(title, text) {
    const id21 = parseInt(localStorage.numSnippets || 0, 10);
    localStorage[`snippet_${id21}`] = JSON.stringify({
      title,
      text
    });
    localStorage.numSnippets = id21 + 1;
  }
  function loadSnippets() {
    for (let id21 = 0; localStorage[`snippet_${id21}`] != null; id21 += 1) {
      const {
        title,
        text
      } = JSON.parse(localStorage[`snippet_${id21}`]);
      renderSnippet(title, text);
    }
  }
  function matchFilesAndThumbs(results) {
    const filesById = {};
    const thumbsById = {};
    results.forEach((result2) => {
      if (result2.stepName === "thumbnails") {
        thumbsById[result2.original_id] = result2;
      } else {
        filesById[result2.original_id] = result2;
      }
    });
    return Object.keys(filesById).map((key) => ({
      file: filesById[key],
      thumb: thumbsById[key]
    }));
  }
  document.querySelector("#new").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = event.target.elements["title"].value || "Unnamed Snippet";
    const text = textarea.element.value;
    saveSnippet(title, text);
    renderSnippet(title, text);
    event.target.querySelector("input").value = "";
    event.target.querySelector("textarea").value = "";
  });
  window.addEventListener("DOMContentLoaded", loadSnippets, {
    once: true
  });
})();
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * Takes a string with placeholder variables like `%{smart_count} file selected`
 * and replaces it with values from options `{smart_count: 5}`
 *
 * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
 * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
 *
 * @param {string} phrase that needs interpolation, with placeholders
 * @param {object} options with values that will be used to replace placeholders
 * @returns {any[]} interpolated
 */
//# sourceMappingURL=app.js.map
