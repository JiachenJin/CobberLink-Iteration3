!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define("Pieces", e)
    : (t.Pieces = e());
})(this, function () {
  "use strict";
  function t(t) {
    this.reset(t);
  }
  function e(t, e) {
    return t.indexOf(e) > -1;
  }
  function i(t, e) {
    for (var i in e) t[i] = g.arr(e[i]) ? e[i].slice(0) : e[i];
    return t;
  }
  function n(t, e) {
    t || (t = {});
    for (var n = 1; n < arguments.length; n++) i(t, arguments[n]);
    return t;
  }
  function a(t, e) {
    t.push.apply(t, e);
  }
  function o() {
    var t = document.createElement("canvas"),
      e = t.getContext("2d");
    return { canvas: t, ctx: e };
  }
  function r(t, e) {
    e.forEach(function (e) {
      g.arr(t[e]) || (t[e] = g.und(t[e]) ? [] : [t[e]]);
    });
  }
  function h(t, e, i, n) {
    var a = void 0;
    return (
      i.forEach(function (i) {
        (a = t[i][e]), g.und(a) || (n[i] = a);
      }),
      n
    );
  }
  function s(t, e, i) {
    return !i.some(function (i) {
      return t[i] !== e[i];
    });
  }
  function c(t, e, i) {
    i.forEach(function (i) {
      return (t[i] = e[i]);
    });
  }
  function u(t) {
    return t >= 0 ? t % 360 : (t % 360) + 360;
  }
  function d(t, e) {
    return (
      t &&
      e &&
      t.left <= e.right &&
      e.left <= t.right &&
      t.top <= e.bottom &&
      e.top <= t.bottom
    );
  }
  function f(t, e, i, n, a, o) {
    return (
      n < 2 * o && (o = n / 2),
      a < 2 * o && (o = a / 2),
      t.beginPath(),
      t.moveTo(e + o, i),
      t.arcTo(e + n, i, e + n, i + a, o),
      t.arcTo(e + n, i + a, e, i + a, o),
      t.arcTo(e, i + a, e, i, o),
      t.arcTo(e, i, e + n, i, o),
      t.closePath(),
      t
    );
  }
  function l(t) {
    var e = n({}, this.defaults.animation, t.animation);
    this.init(n({}, this.defaults, t, { animation: e }));
  }
  t.prototype = {
    reset: function (t) {
      (this.m = [1, 0, 0, 1, 0, 0]), t && this.apply(t);
    },
    rotate: function (t) {
      var e = Math.cos(t),
        i = Math.sin(t),
        n = this.m[0] * e + this.m[2] * i,
        a = this.m[1] * e + this.m[3] * i,
        o = this.m[0] * -i + this.m[2] * e,
        r = this.m[1] * -i + this.m[3] * e;
      (this.m[0] = n), (this.m[1] = a), (this.m[2] = o), (this.m[3] = r);
    },
    translate: function (t, e) {
      (this.m[4] += this.m[0] * t + this.m[2] * e),
        (this.m[5] += this.m[1] * t + this.m[3] * e);
    },
    transformPoint: function (t, e) {
      var i = t * this.m[0] + e * this.m[2] + this.m[4],
        n = t * this.m[1] + e * this.m[3] + this.m[5];
      return [i, n];
    },
    apply: function (t) {
      t.setTransform(
        this.m[0],
        this.m[1],
        this.m[2],
        this.m[3],
        this.m[4],
        this.m[5]
      );
    },
  };
  var g = {
    arr: function (t) {
      return Array.isArray(t);
    },
    obj: function (t) {
      return e(Object.prototype.toString.call(t), "Object");
    },
    str: function (t) {
      return "string" == typeof t;
    },
    fnc: function (t) {
      return "function" == typeof t;
    },
    und: function (t) {
      return "undefined" == typeof t;
    },
    num: function (t) {
      return "number" == typeof t;
    },
  };
  return (
    (l.prototype = {
      defaults: {
        canvas: null,
        items: [],
        image: [],
        text: [],
        path: [],
        x: 0,
        y: 0,
        w: [0],
        h: [0],
        tx: [0],
        ty: [0],
        itemSeparation: 1,
        piecesWidth: [5],
        piecesSpacing: [5],
        extraSpacing: [{ extraX: 0, extraY: 0 }],
        angle: [0],
        rotate: [0],
        translate: [{ translateX: 0, translateY: 0 }],
        padding: [0],
        opacity: [1],
        fontFamily: ["sans-serif"],
        fontSize: [100],
        fontWeight: [900],
        color: ["#000"],
        backgroundColor: !1,
        backgroundRadius: 0,
        ghostOpacity: 0,
        checkHover: !1,
        animation: { duration: [1e3], delay: [0], easing: ["easeInOutCubic"] },
        saveShowState: !1,
        debug: !1,
        ready: null,
      },
      init: function (t) {
        var e = this;
        this.initOptions(t),
          this.initCanvas(t),
          this.initEvents(t),
          t.items.length &&
            t.items.forEach(function (i) {
              switch ((e.setItemOptions(t, i.options), i.type)) {
                case "image":
                  return e.initImage(i.value);
                case "text":
                  return e.initText(i.value);
                case "path":
                  return e.initPath(i.value);
              }
            }),
          t.image.length &&
            t.image.forEach(function (i) {
              e.setItemOptions(t), e.initImage(i);
            }),
          t.text.length &&
            t.text.forEach(function (i) {
              e.setItemOptions(t), e.initText(i);
            }),
          t.path.length &&
            t.path.forEach(function (i) {
              e.setItemOptions(t), e.initPath(i);
            }),
          this.drawList.length && (this.initPieces(t), this.loop(t)),
          t.ready && t.ready();
      },
      initOptions: function (t) {
        var e = t.canvas;
        g.str(e) && (t.canvas = document.querySelector(e)),
          r(t, [
            "items",
            "image",
            "text",
            "path",
            "w",
            "h",
            "tx",
            "ty",
            "piecesWidth",
            "piecesSpacing",
            "extraSpacing",
            "angle",
            "rotate",
            "translate",
            "svgWidth",
            "svgHeight",
            "color",
            "backgroundColor",
            "backgroundRadius",
            "padding",
            "opacity",
            "fontFamily",
            "fontSize",
            "fontWeight",
            "ghost",
            "ghostOpacity",
          ]),
          r(t.animation, ["duration", "delay", "easing"]),
          (this.v = {}),
          (this.o = []),
          (this.drawList = []);
      },
      initCanvas: function (t) {
        t.canvas ? (t.ctx = t.canvas.getContext("2d")) : n(t, o()),
          (t.canvas.width = this.width = t.canvas.clientWidth),
          (t.canvas.height = this.height = t.canvas.clientHeight);
      },
      initEvents: function (t) {
        var e = this;
        (t.canvas.onmousemove = function (i) {
          var n = t.canvas.getBoundingClientRect(),
            a = i.clientX - n.left,
            o = i.clientY - n.top,
            r = n.width / t.canvas.offsetWidth,
            h = n.height / t.canvas.offsetHeight;
          (e.mouseX = a * (1 / r)), (e.mouseY = o * (1 / h));
        }),
          (t.canvas.onmouseout = function () {
            (e.mouseX = void 0), (e.mouseY = void 0);
          });
      },
      setItemOptions: function (t, e) {
        var i = this.drawList.length;
        h(
          t,
          i,
          [
            "text",
            "color",
            "backgroundColor",
            "backgroundRadius",
            "padding",
            "fontFamily",
            "fontSize",
            "fontWeight",
            "svgWidth",
            "svgHeight",
            "piecesWidth",
            "piecesSpacing",
            "extraSpacing",
            "opacity",
            "angle",
            "rotate",
            "translate",
            "ghost",
            "ghostOpacity",
            "w",
            "h",
            "tx",
            "ty",
          ],
          this.v
        ),
          h(t.animation, i, ["duration", "delay", "easing"], this.v),
          this.o.push(n({}, this.v, e || {}));
      },
      initImage: function (t) {
        var e = this.o[this.o.length - 1],
          i = g.fnc(e.padding) ? e.padding() : e.padding;
        i = i
          ? i.split(" ").map(function (t) {
              return parseFloat(t);
            })
          : [0, 0, 0, 0];
        var n = o(),
          a = n.canvas,
          r = n.ctx;
        (a.width = t.width + 2 + i[1] + i[3]),
          (a.height = t.height + 2 + i[0] + i[2]),
          e.backgroundColor &&
            ((r.fillStyle = e.backgroundColor),
            e.backgroundRadius
              ? (f(r, 1, 1, a.width - 2, a.height - 2, e.backgroundRadius),
                r.fill())
              : r.fillRect(1, 1, a.width - 2, a.height - 2)),
          r.drawImage(
            t,
            0,
            0,
            t.naturalWidth,
            t.naturalHeight,
            1 + i[3],
            1 + i[0],
            t.width,
            t.height
          ),
          this.drawList.push(a);
      },
      initText: function (t) {
        var e = this.o[this.o.length - 1],
          i = g.fnc(e.padding) ? e.padding() : e.padding;
        i = i
          ? i.split(" ").map(function (t) {
              return parseFloat(t);
            })
          : [0, 0, 0, 0];
        var n = g.fnc(e.fontSize) ? e.fontSize() : e.fontSize,
          a = o(),
          r = a.canvas,
          h = a.ctx;
        (h.textBaseline = "bottom"),
          (h.font = e.fontWeight + " " + n + "px " + e.fontFamily),
          (r.width = h.measureText(t).width + i[1] + i[3]),
          (r.height = n + i[0] + i[2]),
          e.backgroundColor &&
            ((h.fillStyle = e.backgroundColor),
            e.backgroundRadius
              ? (f(h, 1, 1, r.width - 2, r.height - 2, e.backgroundRadius),
                h.fill())
              : h.fillRect(1, 1, r.width - 2, r.height - 2)),
          (h.textBaseline = "bottom"),
          (h.font = e.fontWeight + " " + n + "px " + e.fontFamily),
          (h.fillStyle = e.color),
          h.fillText(t, i[3], n + i[0]),
          this.drawList.push(r);
      },
      initPath: function (t) {
        var e = this.o[this.o.length - 1],
          i = g.fnc(e.padding) ? e.padding() : e.padding;
        i = i
          ? i.split(" ").map(function (t) {
              return parseFloat(t);
            })
          : [0, 0, 0, 0];
        var n = o(),
          a = n.canvas,
          r = n.ctx;
        (a.width = e.svgWidth + i[1] + i[3]),
          (a.height = e.svgHeight + i[0] + i[2]),
          e.backgroundColor &&
            ((r.fillStyle = e.backgroundColor),
            e.backgroundRadius
              ? (f(r, 1, 1, a.width - 2, a.height - 2, e.backgroundRadius),
                r.fill())
              : r.fillRect(1, 1, a.width - 2, a.height - 2)),
          r.translate(i[3], i[0]),
          (r.fillStyle = e.color),
          r.fill(new Path2D(g.str(t) ? t : t.getAttribute("d"))),
          this.drawList.push(a);
      },
      initPieces: function (e) {
        var i = this,
          n = new t(),
          a = void 0,
          r = void 0,
          h = void 0,
          s = void 0,
          c = void 0,
          d = void 0,
          f = void 0,
          l = void 0,
          m = void 0,
          p = void 0,
          v = void 0;
        (this.pieces = []), (this.items = []);
        var x = e.itemSeparation;
        (f =
          "center" === e.x
            ? this.width / 2 -
              (this.drawList.reduce(function (t, e) {
                return t + e.width;
              }, 0) +
                x * this.drawList.length) /
                2
            : e.x),
          (m =
            "center" === e.y
              ? this.height / 2 - this.drawList[0].height / 2
              : e.y);
        var y = void 0;
        this.drawList.forEach(function (t, w) {
          y = i.o[w];
          var b = g.obj(y.extraSpacing)
              ? y.extraSpacing
              : { extraX: y.extraSpacing, extraY: y.extraSpacing },
            S = b.extraX,
            _ = b.extraY,
            k = g.fnc(y.translate)
              ? y.translate()
              : g.obj(y.translate)
              ? y.translate
              : { translateX: y.translate, translateY: y.translate },
            P = k.translateX,
            I = k.translateY;
          "centerAll" === e.x && (f = i.width / 2 - t.width / 2),
            "centerAll" === e.y && (m = i.height / 2 - t.height / 2),
            (f += P),
            (m += I),
            (c = { angle: null }),
            (s = { last: c, index: w, y: m, extraY: _, img: t }),
            (s.x = l = f),
            (s.width = t.width),
            (s.height = t.height),
            (s.angle = u(y.angle)),
            (s.rotate = u(y.rotate)),
            (s.ghost = y.ghost),
            (s.ghostDashArray = [20, 10]),
            (s.ghostDashOffset = s.ghostDashArray[0] + s.ghostDashArray[1]),
            (s.ghostOpacity = y.ghostOpacity),
            (s.pieces = []),
            (s.shown = !1),
            (s.hidden = !0),
            i.items.push(s);
          var R = o(),
            E = R.ctx,
            M = R.canvas;
          for (
            M.width = s.width, M.height = s.height;
            l - (s.width + 2 * S) < s.x;

          ) {
            (a = g.fnc(y.piecesWidth) ? y.piecesWidth() : y.piecesWidth),
              (r = s.height + 2 * _),
              (h = g.fnc(y.piecesSpacing)
                ? y.piecesSpacing()
                : y.piecesSpacing),
              (p = Math.min(g.fnc(y.w) ? y.w() : y.w, a)),
              (v = Math.min(g.fnc(y.h) ? y.h() : y.h, r)),
              (c = {}),
              (d = { last: c, item: s }),
              (d.h_x = d.x = c.x = l - S + a / 2 - p / 2),
              (d.s_x = l - S),
              (d.h_y = d.y = c.y = m + s.height / 2 - v / 2),
              (d.s_y = m - _),
              (d.h_w = d.w = c.w = p),
              (d.s_w = a),
              (d.h_h = d.h = c.h = v),
              (d.s_h = r),
              (d.h_tx = d.s_tx = d.tx = c.tx = g.fnc(y.tx) ? y.tx() : y.tx),
              (d.h_ty = d.ty = c.ty = _ + (g.fnc(y.ty) ? y.ty() : y.ty)),
              (d.s_ty = _),
              (d.opacity = g.fnc(y.opacity) ? y.opacity() : y.opacity),
              (d.duration = g.fnc(y.duration) ? y.duration() : y.duration),
              (d.delay = g.fnc(y.delay) ? y.delay() : y.delay),
              (d.easing = y.easing),
              s.pieces.push(d),
              i.pieces.push(d),
              (l += a + h),
              E.save(),
              n.translate(s.width / 2, s.height / 2),
              n.rotate((s.angle * Math.PI) / 180),
              n.translate(-s.width / 2, -s.height / 2),
              n.translate(d.s_tx, d.s_ty - s.extraY),
              n.translate(d.s_x + d.s_w / 2 - s.x, d.s_y + d.s_h / 2 - s.y),
              n.apply(E),
              E.beginPath(),
              E.rect(-d.s_w / 2, -d.s_h / 2, d.s_w, d.s_h),
              E.clip(),
              n.reset(E),
              (E.globalAlpha = d.opacity);
            var O = s.img.height / s.img.width;
            E.drawImage(
              s.img,
              (1 - O) / 2,
              O / 2,
              s.img.width - (1 - O),
              s.img.height - O
            ),
              E.restore();
          }
          (s.imgShown = M),
            (s.rectShown = {
              left: s.x,
              top: s.y,
              right: s.x + s.width,
              bottom: s.y + s.height,
            }),
            "centerAll" !== e.x && (f += t.width + x);
        });
      },
      renderPieces: function (e, i) {
        var n = e.ctx,
          a = new t(),
          o = void 0,
          r = void 0;
        i.redraw &&
          ((i.redraw = !1),
          i.shown && e.saveShowState
            ? n.drawImage(
                i.imgShown,
                0,
                0,
                i.width,
                i.height,
                i.x,
                i.y,
                i.width,
                i.height
              )
            : i.hidden ||
              ((o = u(i.angle)),
              (r = u(i.rotate)),
              i.pieces.forEach(function (t) {
                n.save(),
                  a.translate(i.x, i.y),
                  a.translate(i.width / 2, i.height / 2),
                  a.rotate(((o + r) * Math.PI) / 180),
                  a.translate(-i.width / 2, -i.height / 2),
                  a.translate(t.tx, t.ty - i.extraY),
                  a.translate(t.x + t.w / 2 - i.x, t.y + t.h / 2 - i.y),
                  a.apply(n),
                  n.beginPath(),
                  n.rect(-t.w / 2, -t.h / 2, t.w, t.h),
                  e.debug
                    ? (n.setLineDash([]), (n.strokeStyle = "black"), n.stroke())
                    : n.clip(),
                  a.translate(-(t.x + t.w / 2 - i.x), -(t.y + t.h / 2 - i.y)),
                  a.translate(i.width / 2, i.height / 2),
                  a.rotate((-o * Math.PI) / 180),
                  a.translate(-i.width / 2, -i.height / 2),
                  a.apply(n),
                  (n.globalAlpha = t.opacity);
                var h = i.img.height / i.img.width;
                n.drawImage(
                  i.img,
                  (1 - h) / 2,
                  h / 2,
                  i.img.width - (1 - h),
                  i.img.height - h
                ),
                  a.reset(),
                  n.restore();
              })));
      },
      isItemDifferent: function (t) {
        return (
          !s(t, t.last, ["angle"]) ||
          t.pieces.some(function (t) {
            return !s(t, t.last, ["x", "y", "w", "h", "tx", "ty"]);
          })
        );
      },
      isItemShown: function (t) {
        return t.pieces.every(function (t) {
          return (
            t.x === t.s_x &&
            t.y === t.s_y &&
            t.w === t.s_w &&
            t.h === t.s_h &&
            t.tx === t.s_tx &&
            t.ty === t.s_ty
          );
        });
      },
      isItemHidden: function (t) {
        return t.pieces.every(function (t) {
          return 0 === t.w && 0 === t.h;
        });
      },
      renderGhost: function (t, e) {
        var i = this.o[e.index],
          n = g.fnc(i.fontSize) ? i.fontSize() : i.fontSize;
        e.ghost &&
          i.text &&
          ((t.ctx.textBaseline = "bottom"),
          (t.ctx.font = i.fontWeight + " " + n + "px " + i.fontFamily),
          (t.ctx.strokeStyle = i.color),
          t.ctx.setLineDash(e.ghostDashArray),
          (t.ctx.lineDashOffset = e.ghostDashOffset),
          (t.ctx.globalAlpha = e.ghostOpacity),
          t.ctx.strokeText(i.text, e.x, e.y + e.height),
          (t.ctx.globalAlpha = 1));
      },
      clearRect: function (e) {
        var i = this,
          n = new t(),
          a = !1,
          o = void 0,
          r = void 0,
          h = void 0,
          s = void 0,
          f = void 0,
          l = void 0,
          g = void 0,
          m = void 0,
          p = void 0,
          v = void 0,
          x = void 0,
          y = void 0,
          w = void 0,
          b = void 0,
          S = void 0,
          _ = null;
        for (
          this.items.forEach(function (t) {
            (b = u(t.angle)),
              (S = u(t.rotate)),
              i.isItemDifferent(t)
                ? ((a = !0),
                  (w = null),
                  (t.redraw = !0),
                  (t.shown = i.isItemShown(t)),
                  (t.hidden = i.isItemHidden(t)),
                  c(t.last, t, ["angle"]),
                  t.pieces.forEach(function (e) {
                    var a = e.last;
                    n.translate(t.x, t.y),
                      n.translate(t.width / 2, t.height / 2),
                      n.rotate(((b + S) * Math.PI) / 180),
                      n.translate(-t.width / 2, -t.height / 2),
                      n.translate(a.tx, a.ty - t.extraY),
                      n.translate(a.x + a.w / 2 - t.x, a.y + a.h / 2 - t.y),
                      (o = -a.w / 2 - 1),
                      (r = -a.h / 2 - 1),
                      (h = a.w + 2),
                      (s = a.h + 2),
                      (f = n.transformPoint(o, r)),
                      (l = n.transformPoint(o + h, r)),
                      (g = n.transformPoint(o + h, r + s)),
                      (m = n.transformPoint(o, r + s)),
                      (p = Math.min(f[0], l[0], g[0], m[0])),
                      (v = Math.min(f[1], l[1], g[1], m[1])),
                      (x = Math.max(f[0], l[0], g[0], m[0])),
                      (y = Math.max(f[1], l[1], g[1], m[1])),
                      (w = i.extendRect(w, {
                        left: p,
                        top: v,
                        right: x,
                        bottom: y,
                      })),
                      n.reset(),
                      c(a, e, ["x", "y", "w", "h", "tx", "ty"]);
                  }),
                  (_ = i.extendRect(_, w)),
                  (t.rect = t.shown ? t.rectShown : w))
                : (t.redraw = !1),
              t.hidden &&
                t.ghost &&
                ((a = !0), (_ = i.extendRect(_, t.rectShown)));
          });
          a;

        )
          (a = !1),
            this.items.forEach(function (t) {
              !t.redraw &&
                d(_, t.rect) &&
                ((a = !0), (t.redraw = !0), (_ = i.extendRect(_, t.rect)));
            });
        _ &&
          (e.ctx.clearRect(_.left, _.top, _.right - _.left, _.bottom - _.top),
          e.debug &&
            (e.ctx.setLineDash([10]),
            (e.ctx.strokeStyle = "rgba(255, 0, 0, 1)"),
            e.ctx.strokeRect(
              _.left,
              _.top,
              _.right - _.left,
              _.bottom - _.top
            )));
      },
      extendRect: function (t, e) {
        return t && e
          ? {
              left: Math.max(0, Math.min(t.left, e.left)),
              top: Math.max(0, Math.min(t.top, e.top)),
              right: Math.min(this.width, Math.max(t.right, e.right)),
              bottom: Math.min(this.height, Math.max(t.bottom, e.bottom)),
            }
          : e;
      },
      checkHover: function (t, e) {
        var i =
          this.mouseX >= e.x &&
          this.mouseX <= e.x + e.width &&
          this.mouseY >= e.y &&
          this.mouseY <= e.y + e.height;
        return (
          i && !e.hover
            ? g.fnc(t.itemEnter) && t.itemEnter(e)
            : !i && e.hover && g.fnc(t.itemLeave) && t.itemLeave(e),
          (e.hover = i),
          i
        );
      },
      renderDebug: function (t, e) {
        if (t.debug) {
          t.checkHover &&
            ((t.ctx.fillStyle = e.hover
              ? "rgba(255, 0, 0, 0.3)"
              : "rgba(0, 0, 0, 0.3)"),
            t.ctx.fillRect(e.x, e.y, e.width, e.height));
          var i = e.rect;
          i &&
            (t.ctx.setLineDash([]),
            (t.ctx.strokeStyle = "rgba(255, 0, 0, 0.5)"),
            t.ctx.strokeRect(
              i.left,
              i.top,
              i.right - i.left,
              i.bottom - i.top
            ));
        }
      },
      loop: function (t) {
        var e = this;
        (this.frame = requestAnimationFrame(this.loop.bind(this, t))),
          this.clearRect(t),
          (this.hoverItem = null),
          this.items.forEach(function (i) {
            t.checkHover && e.checkHover(t, i) && (e.hoverItem = i),
              e.renderPieces(t, i),
              e.renderGhost(t, i),
              e.renderDebug(t, i);
          });
      },
      stop: function () {
        cancelAnimationFrame(this.frame),
          anime.remove(this.items),
          anime.remove(this.pieces);
      },
      getPieces: function (t) {
        var e = this,
          i = [];
        return (
          g.und(t)
            ? (i = this.pieces)
            : g.num(t)
            ? (i = this.items[t].pieces)
            : g.arr(t)
            ? t.forEach(function (t) {
                return g.num(t) ? a(i, e.items[t].pieces) : a(i, t.pieces);
              })
            : (i = t.pieces),
          i
        );
      },
      getItems: function (t) {
        var e = this,
          i = [];
        return (
          g.und(t)
            ? (i = this.items)
            : g.num(t)
            ? (i = this.items[t])
            : g.arr(t)
            ? t.forEach(function (t) {
                return g.num(t) ? i.push(e.items[t]) : i.push(t);
              })
            : (i = t),
          i
        );
      },
      animatePieces: function (t) {
        var e = n(
            {
              duration: function (t) {
                return t.duration;
              },
              delay: function (t) {
                return t.delay;
              },
              easing: function (t) {
                return t.easing;
              },
              remove: !0,
              singly: !1,
            },
            t
          ),
          i = this.getPieces(t.items);
        e.remove && anime.remove(i),
          e.ignore &&
            e.ignore.forEach(function (t) {
              return delete e[t];
            }),
          e.singly
            ? i.forEach(function (t) {
                return anime(n(e, { targets: t }));
              })
            : anime(n(e, { targets: i }));
      },
      showPieces: function (t) {
        var e = n(
          {
            x: function (t) {
              return t.s_x;
            },
            y: function (t) {
              return t.s_y;
            },
            w: function (t) {
              return t.s_w;
            },
            h: function (t) {
              return t.s_h;
            },
            tx: function (t) {
              return t.s_tx;
            },
            ty: function (t) {
              return t.s_ty;
            },
          },
          t
        );
        this.animatePieces(e);
      },
      hidePieces: function (t) {
        var e = n(
          {
            x: function (t) {
              return t.h_x;
            },
            y: function (t) {
              return t.h_y;
            },
            w: function (t) {
              return t.h_w;
            },
            h: function (t) {
              return t.h_h;
            },
            tx: function (t) {
              return t.h_tx;
            },
            ty: function (t) {
              return t.h_ty;
            },
          },
          t
        );
        this.animatePieces(e);
      },
      animateItems: function (t) {
        var e = n({ easing: "linear", remove: !0 }, t, {
          targets: this.getItems(t.items),
        });
        e.remove && anime.remove(e.targets), anime(e);
      },
    }),
    (l.version = "1.0.0"),
    (l.random = anime.random),
    (l.extend = n),
    l
  );
});
