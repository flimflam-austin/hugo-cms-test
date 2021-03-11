!(function (t) {
	var e = {};
	function i(n) {
		if (e[n]) return e[n].exports;
		var o = (e[n] = { i: n, l: !1, exports: {} });
		return t[n].call(o.exports, o, o.exports, i), (o.l = !0), o.exports;
	}
	(i.m = t),
		(i.c = e),
		(i.d = function (t, e, n) {
			i.o(t, e) ||
				Object.defineProperty(t, e, {
					configurable: !1,
					enumerable: !0,
					get: n,
				});
		}),
		(i.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return i.d(e, "a", e), e;
		}),
		(i.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(i.p = ""),
		i((i.s = 48));
})({
	13: function (t, e, i) {
		(function (t) {
			i(14),
				t(".nav-close").click(function (e) {
					e.preventDefault(), t(".site-overlay").trigger("click");
				}),
				t(".search-btn").on("click", function () {
					t(".search-wrapper #searchform").toggleClass("show");
				}),
				t(".video-promo-close").on("click", function () {
					(document.cookie = "promo1_read=1"),
						t(".video-promo").addClass("video-promo-closed");
				});
		}.call(e, i(4)));
	},
	14: function (t, e) {
		!(function (t) {
			var e = t(".pushy"),
				i = t("body"),
				n = t("#container"),
				o = t(".push"),
				s = "pushy-left",
				r = "pushy-open-left",
				a = "pushy-open-right",
				c = t(".site-overlay"),
				d = t(".menu-btn, .pushy-link"),
				l = t(".menu-btn"),
				h = t(e.data("focus")),
				u = 200,
				p = e.width() + "px",
				f = ".pushy-submenu",
				m = "pushy-submenu-open",
				g = "pushy-submenu-closed";
			t(f);
			function v() {
				e.hasClass(s) ? i.toggleClass(r) : i.toggleClass(a),
					h &&
						e.one("transitionend", function () {
							h.focus();
						});
			}
			function b() {
				e.hasClass(s)
					? (i.addClass(r),
					  e.animate({ left: "0px" }, u),
					  n.animate({ left: p }, u),
					  o.animate({ left: p }, u))
					: (i.addClass(a),
					  e.animate({ right: "0px" }, u),
					  n.animate({ right: p }, u),
					  o.animate({ right: p }, u)),
					h && h.focus();
			}
			function w() {
				e.hasClass(s)
					? (i.removeClass(r),
					  e.animate({ left: "-" + p }, u),
					  n.animate({ left: "0px" }, u),
					  o.animate({ left: "0px" }, u))
					: (i.removeClass(a),
					  e.animate({ right: "-" + p }, u),
					  n.animate({ right: "0px" }, u),
					  o.animate({ right: "0px" }, u));
			}
			function y() {
				t(f).addClass(g),
					t(f).on("click", function () {
						var e = t(this);
						e.hasClass(g)
							? (t(f).addClass(g).removeClass(m),
							  e.removeClass(g).addClass(m))
							: e.addClass(g).removeClass(m);
					});
			}
			t(document).keyup(function (t) {
				27 == t.keyCode &&
					(i.hasClass(r) || i.hasClass(a)) &&
					(x
						? e.hasClass(s)
							? i.removeClass(r)
							: i.removeClass(a)
						: (w(), (k = !1)),
					l && l.focus());
			});
			var x = (function () {
				var t = document.createElement("p"),
					e = !1,
					i = {
						webkitTransform: "-webkit-transform",
						OTransform: "-o-transform",
						msTransform: "-ms-transform",
						MozTransform: "-moz-transform",
						transform: "transform",
					};
				if (null !== document.body) {
					for (var n in (document.body.insertBefore(t, null), i))
						void 0 !== t.style[n] &&
							((t.style[n] = "translate3d(1px,1px,1px)"),
							(e = window
								.getComputedStyle(t)
								.getPropertyValue(i[n])));
					return (
						document.body.removeChild(t),
						void 0 !== e && e.length > 0 && "none" !== e
					);
				}
				return !1;
			})();
			if (x)
				y(),
					d.on("click", function () {
						v();
					}),
					c.on("click", function () {
						v();
					});
			else {
				i.addClass("no-csstransforms3d"),
					e.hasClass(s)
						? e.css({ left: "-" + p })
						: e.css({ right: "-" + p }),
					n.css({ "overflow-x": "hidden" });
				var k = !1;
				y(),
					d.on("click", function () {
						k ? (w(), (k = !1)) : (b(), (k = !0));
					}),
					c.on("click", function () {
						k ? (w(), (k = !1)) : (b(), (k = !0));
					});
			}
		})(jQuery);
	},
	4: function (t, e) {
		t.exports = jQuery;
	},
	48: function (t, e, i) {
		i(13), (t.exports = i(49));
	},
	49: function (t, e, i) {
		var n = i(50);
		i(51),
			i(52),
			jQuery(document).ready(function (t) {
				function e(e, i) {
					if (
						window.ga &&
						-1 === location.hostname.indexOf(".local") &&
						!t("body").hasClass("logged-in")
					) {
						$card = e.closest(".deck");
						var n = $card.data("category"),
							o = $card.data("cardTitle");
						window.ga("gtm1.send", {
							hitType: "event",
							eventCategory: n,
							eventAction: i,
							eventLabel: o,
						});
					}
				}
				function i(e) {
					var i = e;
					i.bookblock({
						orientation: "horizontal",
						shadowSides: 1,
						shadowFlip: 1,
						speed: 600,
					}),
						i.each(function () {
							var e = t(this),
								i = e.find(".bb-item").length;
							e.addClass("static");
							for (var n = 0; n < i; n++)
								0 == n
									? e
											.next()
											.append(
												'<span class="current"></span>'
											)
									: e.next().append("<span></span>");
						});
				}
				function o(t) {
					var i = t.closest(".deck").data("card"),
						o = n.getJSON("read") || [];
					-1 ===
						(o = "string" == typeof o ? o.split(",") : o).indexOf(
							i
						) &&
						(o.push(i),
						n.set("read", o, { expires: 365 }),
						e(t, "End of Card"));
				}
				function s(t) {
					var i = t.index();
					t.hasClass("bb-item-last") ||
						(t.parent().bookblock("jump", i + 2),
						t
							.parent()
							.next()
							.find("span.current")
							.removeClass("current"),
						t
							.parent()
							.next()
							.find("span")
							.eq(i + 1)
							.addClass("current"),
						e(t, "Card Flip Forward")),
						t.is(":nth-last-child(2)") &&
							(t.next().find(".checkmark").addClass("checked"),
							t.parents(".deck").addClass("show-read"),
							setTimeout(function () {
								t.next()
									.find(".check")
									.css("stroke-dashoffset", 0);
							}, 500),
							o(t));
				}
				function r() {
					var e = n.getJSON("read") || [],
						i = void 0;
					(e = "string" == typeof e ? e.split(",") : e).forEach(
						function (e) {
							(i = t('[data-card="' + e + '"]')).length &&
								i.addClass("show-read");
						}
					);
					var o = [].concat(
						(function (t) {
							if (Array.isArray(t)) {
								for (
									var e = 0, i = Array(t.length);
									e < t.length;
									e++
								)
									i[e] = t[e];
								return i;
							}
							return Array.from(t);
						})(new Set(e))
					);
					n.set("read", o);
				}
				t.fn.isInViewport = function () {
					var e = t(this).offset().top,
						i = e + t(this).outerHeight(),
						n = t(window).scrollTop(),
						o = n + t(window).height();
					return i > n && e < o;
				};
				var a = t(".deck-wrapper .deck:first-child .bb-bookblock"),
					c = t(".header-main"),
					d = t(".logo-wrap"),
					l = c.find("button"),
					h = c.find(".social"),
					u = c.outerHeight(),
					p = d.offset().top,
					f = t(".main"),
					m = !1,
					g = t(".more-cards");
				i(t(".bb-bookblock")),
					f.on("click", ".bb-item", function (i) {
						if (!t(i.target).closest("a").length) {
							var n = t(this),
								o = t(this).outerWidth(),
								r = t(this).offset();
							o / 2 > i.pageY - r.top
								? (function (t) {
										var i = t.index();
										t.hasClass("bb-item-first") ||
											(t.parent().bookblock("jump", i),
											t
												.parent()
												.next()
												.find("span.current")
												.removeClass("current"),
											t
												.parent()
												.next()
												.find("span")
												.eq(i - 1)
												.addClass("current"),
											e(t, "Card Flip Backward"));
								  })(n)
								: s(n);
						}
					}),
					f.on("click", ".card-nav span", function () {
						var i,
							n,
							s = t(this),
							r = s
								.parent()
								.prev()
								.find(".bb-item:visible")
								.index(),
							a = s.index();
						s.hasClass("current") ||
							(a > r &&
								((n = (i = s).index()),
								i
									.parent()
									.prev()
									.bookblock("jump", n + 1),
								i
									.addClass("current")
									.siblings()
									.removeClass("current"),
								i.is(":last-child") &&
									(i
										.parent()
										.prev()
										.find(".checkmark")
										.addClass("checked"),
									i.parents(".deck").addClass("show-read"),
									setTimeout(function () {
										i.parent()
											.prev()
											.find(".check")
											.css("stroke-dashoffset", 0);
									}, 500),
									o(i)),
								e(i, "Card Flip Forward")),
							a < r &&
								(function (t) {
									var i = t.index();
									t
										.parent()
										.prev()
										.bookblock("jump", i + 1),
										t
											.addClass("current")
											.siblings()
											.removeClass("current"),
										e(t, "Card Flip Backward");
								})(s));
					}),
					f.on("click", ".clone-up", function () {
						s(t(this).parent().find(".bb-item:first-child")),
							t(".clone").remove();
					}),
					r(),
					t(window).resize(function () {
						var e, i, n;
						(e = t(".deck:first-of-type")),
							(i = e.find(
								".bb-bookblock:first-child .bb-item:first-child"
							)),
							(n =
								e.innerWidth() < 367
									? e.innerWidth() + 7
									: e.innerWidth()),
							i.find(".card-content").outerWidth(),
							t(".card-content").each(function () {
								var e = t(this);
								e.closest(".bb-item").is(":first-child") &&
									e
										.closest(".bb-bookblock")
										.css({ width: n, height: n });
							});
					}),
					t(window).trigger("resize"),
					t(window).on("scroll resize", function (e) {
						var i;
						(i = t(window).scrollTop()) >= 12
							? (l.addClass("sticky"), h.addClass("sticky"))
							: (l.removeClass("sticky"),
							  h.removeClass("sticky")),
							i >= p - 10
								? d.addClass("sticky")
								: d.removeClass("sticky"),
							i >= u - 50
								? (c.addClass("sticky"),
								  c.next().css({ marginTop: u }))
								: (c.removeClass("sticky"),
								  c.next().css({
										marginTop: 0,
										paddingBottom: 0,
								  }));
						var n = a.next();
						n.length &&
							n.isInViewport() &&
							(function () {
								if (!m) {
									var e = a.parent(),
										i = a.height() / 2;
									a
										.clone()
										.addClass("clone-up clone")
										.appendTo(e)
										.addClass("tease"),
										a
											.clone()
											.addClass("clone-mask clone")
											.appendTo(e)
											.height(i);
									var n = t(".clone-up"),
										o = t(".clone-mask");
									n.bookblock({
										orientation: "horizontal",
										shadowSides: 1,
										shadowFlip: 1,
										easing: "linear",
										speed: 1e3,
									}),
										setTimeout(function () {
											n.remove(), o.remove();
										}, 3500),
										(m = !0);
								}
							})();
					});
				var v = 0.8 * t(window).width(),
					b = 0.609375 * v;
				t(".card .youtube").colorbox({
					iframe: !0,
					innerWidth: v,
					innerHeight: b,
				}),
					t(".deck").length < 12 && g.remove(),
					g.find("a").click(function (e) {
						e.preventDefault();
						var n = t(this),
							o = {
								action: "loadmore",
								page: sher_loadmore_params.current_page,
								category: sher_loadmore_params.category
									? sher_loadmore_params.category
									: null,
							};
						t.ajax({
							url: sher_loadmore_params.ajaxurl,
							data: o,
							type: "GET",
							beforeSend: function (t) {
								n.text("Loading...");
							},
							success: function (e) {
								e.success
									? (n
											.text("view more stories")
											.parent()
											.before(e.data),
									  t(
											".deck-wrapper > div > .more-cards"
									  ).remove(),
									  sher_loadmore_params.current_page++,
									  r(),
									  t(window).trigger("resize"),
									  i(
											t(".ajax-posts .bb-bookblock").not(
												".static"
											)
									  ),
									  window.a2a && a2a.init_all("page"),
									  sher_loadmore_params.current_page >
											sher_loadmore_params.max_page &&
											n.remove())
									: (console.error(e.data), n.remove());
							},
						});
					});
				var w = t(".deck-wrapper"),
					y = t(".featured-card"),
					x = function (e) {
						t(e.target)
							.closest(".share")
							.find(".a2a_kit")
							.toggleClass("visible");
					};
				y.length && y.on("click", ".deck .share-button", x),
					w.length
						? w.on("click", ".deck .share-button", x)
						: t(".deck .share-button").on("click", x);
			});
	},
	50: function (t, e, i) {
		var n, o;
		!(function (s) {
			if (
				(void 0 ===
					(o =
						"function" == typeof (n = s)
							? n.call(e, i, e, t)
							: n) || (t.exports = o),
				!0,
				(t.exports = s()),
				!!0)
			) {
				var r = window.Cookies,
					a = (window.Cookies = s());
				a.noConflict = function () {
					return (window.Cookies = r), a;
				};
			}
		})(function () {
			function t() {
				for (var t = 0, e = {}; t < arguments.length; t++) {
					var i = arguments[t];
					for (var n in i) e[n] = i[n];
				}
				return e;
			}
			return (function e(i) {
				function n(e, o, s) {
					var r;
					if ("undefined" != typeof document) {
						if (arguments.length > 1) {
							if (
								"number" ==
								typeof (s = t({ path: "/" }, n.defaults, s))
									.expires
							) {
								var a = new Date();
								a.setMilliseconds(
									a.getMilliseconds() + 864e5 * s.expires
								),
									(s.expires = a);
							}
							s.expires = s.expires
								? s.expires.toUTCString()
								: "";
							try {
								(r = JSON.stringify(o)),
									/^[\{\[]/.test(r) && (o = r);
							} catch (t) {}
							(o = i.write
								? i.write(o, e)
								: encodeURIComponent(String(o)).replace(
										/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
										decodeURIComponent
								  )),
								(e = (e = (e = encodeURIComponent(
									String(e)
								)).replace(
									/%(23|24|26|2B|5E|60|7C)/g,
									decodeURIComponent
								)).replace(/[\(\)]/g, escape));
							var c = "";
							for (var d in s)
								s[d] &&
									((c += "; " + d),
									!0 !== s[d] && (c += "=" + s[d]));
							return (document.cookie = e + "=" + o + c);
						}
						e || (r = {});
						for (
							var l = document.cookie
									? document.cookie.split("; ")
									: [],
								h = /(%[0-9A-Z]{2})+/g,
								u = 0;
							u < l.length;
							u++
						) {
							var p = l[u].split("="),
								f = p.slice(1).join("=");
							this.json ||
								'"' !== f.charAt(0) ||
								(f = f.slice(1, -1));
							try {
								var m = p[0].replace(h, decodeURIComponent);
								if (
									((f = i.read
										? i.read(f, m)
										: i(f, m) ||
										  f.replace(h, decodeURIComponent)),
									this.json)
								)
									try {
										f = JSON.parse(f);
									} catch (t) {}
								if (e === m) {
									r = f;
									break;
								}
								e || (r[m] = f);
							} catch (t) {}
						}
						return r;
					}
				}
				return (
					(n.set = n),
					(n.get = function (t) {
						return n.call(n, t);
					}),
					(n.getJSON = function () {
						return n.apply({ json: !0 }, [].slice.call(arguments));
					}),
					(n.defaults = {}),
					(n.remove = function (e, i) {
						n(e, "", t(i, { expires: -1 }));
					}),
					(n.withConverter = e),
					n
				);
			})(function () {});
		});
	},
	51: function (t, e) {
		!(function (t, e, i) {
			var n = t(e),
				o = e.Modernizr;
			o.addTest("csstransformspreserve3d", function () {
				var t,
					i = o.prefixed("transformStyle"),
					n = "preserve-3d";
				return (
					!!i &&
					((i = i
						.replace(/([A-Z])/g, function (t, e) {
							return "-" + e.toLowerCase();
						})
						.replace(/^ms-/, "-ms-")),
					o.testStyles(
						"#modernizr{" + i + ":" + n + ";}",
						function (n, o) {
							t = e.getComputedStyle
								? getComputedStyle(n, null).getPropertyValue(i)
								: "";
						}
					),
					t === n)
				);
			});
			var s,
				r,
				a = t.event;
			(s = a.special.debouncedresize = {
				setup: function () {
					t(this).on("resize", s.handler);
				},
				teardown: function () {
					t(this).off("resize", s.handler);
				},
				handler: function (t, e) {
					var i = this,
						n = arguments,
						o = function () {
							(t.type = "debouncedresize"),
								a.dispatch.apply(i, n);
						};
					r && clearTimeout(r),
						e ? o() : (r = setTimeout(o, s.threshold));
				},
				threshold: 150,
			}),
				(t.BookBlock = function (e, i) {
					(this.$el = t(i)), this._init(e);
				}),
				(t.BookBlock.defaults = {
					orientation: "vertical",
					direction: "ltr",
					speed: 1e3,
					easing: "ease-in-out",
					shadows: !0,
					shadowSides: 0.2,
					shadowFlip: 0.1,
					circular: !1,
					nextEl: "",
					prevEl: "",
					autoplay: !1,
					interval: 3e3,
					onEndFlip: function (t, e, i) {
						return !1;
					},
					onBeforeFlip: function (t) {
						return !1;
					},
				}),
				(t.BookBlock.prototype = {
					_init: function (e) {
						(this.options = t.extend(
							!0,
							{},
							t.BookBlock.defaults,
							e
						)),
							this.$el.addClass("bb-" + this.options.orientation),
							(this.$items = this.$el
								.children(".bb-item")
								.hide()),
							(this.itemsCount = this.$items.length),
							(this.current = 0),
							(this.previous = -1),
							(this.$current = this.$items
								.eq(this.current)
								.show()),
							(this.elWidth = this.$el.width());
						(this.transEndEventName =
							{
								WebkitTransition: "webkitTransitionEnd",
								MozTransition: "transitionend",
								OTransition: "oTransitionEnd",
								msTransition: "MSTransitionEnd",
								transition: "transitionend",
							}[o.prefixed("transition")] + ".bookblock"),
							(this.support =
								o.csstransitions &&
								o.csstransforms3d &&
								o.csstransformspreserve3d),
							this._initEvents(),
							this.options.autoplay &&
								((this.options.circular = !0),
								this._startSlideshow());
					},
					_initEvents: function () {
						var e = this;
						"" !== this.options.nextEl &&
							t(this.options.nextEl).on(
								"click.bookblock touchstart.bookblock",
								function () {
									return e._action("next"), !1;
								}
							),
							"" !== this.options.prevEl &&
								t(this.options.prevEl).on(
									"click.bookblock touchstart.bookblock",
									function () {
										return e._action("prev"), !1;
									}
								),
							n.on("debouncedresize", function () {
								e.elWidth = e.$el.width();
							});
					},
					_action: function (t, e) {
						this._stopSlideshow(), this._navigate(t, e);
					},
					_navigate: function (t, e) {
						if (this.isAnimating) return !1;
						this.options.onBeforeFlip(this.current),
							(this.isAnimating = !0),
							(this.$current = this.$items.eq(this.current)),
							void 0 !== e
								? (this.current = e)
								: ("next" === t &&
										"ltr" === this.options.direction) ||
								  ("prev" === t &&
										"rtl" === this.options.direction)
								? this.options.circular ||
								  this.current !== this.itemsCount - 1
									? ((this.previous = this.current),
									  (this.current =
											this.current < this.itemsCount - 1
												? this.current + 1
												: 0))
									: (this.end = !0)
								: (("prev" === t &&
										"ltr" === this.options.direction) ||
										("next" === t &&
											"rtl" ===
												this.options.direction)) &&
								  (this.options.circular || 0 !== this.current
										? ((this.previous = this.current),
										  (this.current =
												this.current > 0
													? this.current - 1
													: this.itemsCount - 1))
										: (this.end = !0)),
							(this.$nextItem =
								!this.options.circular && this.end
									? this.$current
									: this.$items.eq(this.current)),
							this.support
								? this._layout(t)
								: this._layoutNoSupport(t);
					},
					_layoutNoSupport: function (t) {
						this.$items.hide(),
							this.$nextItem.show(),
							(this.end = !1),
							(this.isAnimating = !1);
						var e =
							("next" === t &&
								this.current === this.itemsCount - 1) ||
							("prev" === t && 0 === this.current);
						this.options.onEndFlip(this.previous, this.current, e);
					},
					_layout: function (e) {
						var i = this,
							n = this._addSide("left", e),
							o = this._addSide("middle", e),
							s = this._addSide("right", e),
							r = n.find("div.bb-overlay"),
							a = o.find("div.bb-flipoverlay:first"),
							c = o.find("div.bb-flipoverlay:last"),
							d = s.find("div.bb-overlay"),
							l = this.end ? 400 : this.options.speed;
						if (
							(this.$items.hide(),
							this.$el.prepend(n, o, s),
							o
								.css({
									transitionDuration: l + "ms",
									transitionTimingFunction: this.options
										.easing,
								})
								.on(this.transEndEventName, function (n) {
									if (t(n.target).hasClass("bb-page")) {
										i.$el.children(".bb-page").remove(),
											i.$nextItem.show(),
											(i.end = !1),
											(i.isAnimating = !1);
										var o =
											("next" === e &&
												i.current ===
													i.itemsCount - 1) ||
											("prev" === e && 0 === i.current);
										i.options.onEndFlip(
											i.previous,
											i.current,
											o
										);
									}
								}),
							"prev" === e && o.addClass("bb-flip-initial"),
							this.options.shadows && !this.end)
						) {
							var h =
									"next" === e
										? {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear " +
													this.options.speed / 2 +
													"ms",
										  }
										: {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear",
												opacity: this.options
													.shadowSides,
										  },
								u =
									"next" === e
										? {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear",
										  }
										: {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear " +
													this.options.speed / 2 +
													"ms",
												opacity: this.options
													.shadowFlip,
										  },
								p =
									"next" === e
										? {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear " +
													this.options.speed / 2 +
													"ms",
												opacity: this.options
													.shadowFlip,
										  }
										: {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear",
										  },
								f =
									"next" === e
										? {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear",
												opacity: this.options
													.shadowSides,
										  }
										: {
												transition:
													"opacity " +
													this.options.speed / 2 +
													"ms linear " +
													this.options.speed / 2 +
													"ms",
										  };
							a.css(u), c.css(p), r.css(h), d.css(f);
						}
						setTimeout(function () {
							o.addClass(
								i.end ? "bb-flip-" + e + "-end" : "bb-flip-" + e
							),
								i.options.shadows &&
									!i.end &&
									(a.css({
										opacity:
											"next" === e
												? i.options.shadowFlip
												: 0,
									}),
									c.css({
										opacity:
											"next" === e
												? 0
												: i.options.shadowFlip,
									}),
									r.css({
										opacity:
											"next" === e
												? i.options.shadowSides
												: 0,
									}),
									d.css({
										opacity:
											"next" === e
												? 0
												: i.options.shadowSides,
									}));
						}, 25);
					},
					_addSide: function (e, i) {
						var n;
						switch (e) {
							case "left":
								n = t(
									'<div class="bb-page"><div class="bb-back"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' +
										("next" === i
											? this.$current.html()
											: this.$nextItem.html()) +
										'</div></div><div class="bb-overlay"></div></div></div></div>'
								).css("z-index", 102);
								break;
							case "middle":
								n = t(
									'<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' +
										("next" === i
											? this.$current.html()
											: this.$nextItem.html()) +
										'</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:' +
										this.elWidth +
										'px"><div class="bb-inner">' +
										("next" === i
											? this.$nextItem.html()
											: this.$current.html()) +
										'</div></div><div class="bb-flipoverlay"></div></div></div></div>'
								).css("z-index", 103);
								break;
							case "right":
								n = t(
									'<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' +
										("next" === i
											? this.$nextItem.html()
											: this.$current.html()) +
										'</div></div><div class="bb-overlay"></div></div></div></div>'
								).css("z-index", 101);
						}
						return n;
					},
					_startSlideshow: function () {
						var t = this;
						this.slideshow = setTimeout(function () {
							t._navigate("next"),
								t.options.autoplay && t._startSlideshow();
						}, this.options.interval);
					},
					_stopSlideshow: function () {
						this.options.autoplay &&
							(clearTimeout(this.slideshow),
							(this.options.autoplay = !1));
					},
					next: function () {
						this._action(
							"ltr" === this.options.direction ? "next" : "prev"
						);
					},
					prev: function () {
						this._action(
							"ltr" === this.options.direction ? "prev" : "next"
						);
					},
					jump: function (t) {
						if (
							(t -= 1) === this.current ||
							t >= this.itemsCount ||
							t < 0
						)
							return !1;
						var e;
						(e =
							"ltr" === this.options.direction
								? t > this.current
									? "next"
									: "prev"
								: t > this.current
								? "prev"
								: "next"),
							this._action(e, t);
					},
					last: function () {
						this.jump(this.itemsCount);
					},
					first: function () {
						this.jump(1);
					},
					isActive: function () {
						return this.isAnimating;
					},
					update: function () {
						var t = this.$items.eq(this.current);
						(this.$items = this.$el.children(".bb-item")),
							(this.itemsCount = this.$items.length),
							(this.current = t.index());
					},
					destroy: function () {
						this.options.autoplay && this._stopSlideshow(),
							this.$el.removeClass(
								"bb-" + this.options.orientation
							),
							this.$items.show(),
							"" !== this.options.nextEl &&
								t(this.options.nextEl).off(".bookblock"),
							"" !== this.options.prevEl &&
								t(this.options.prevEl).off(".bookblock"),
							n.off("debouncedresize");
					},
				});
			var c = function (t) {
				e.console && e.console.error(t);
			};
			t.fn.bookblock = function (e) {
				if ("string" == typeof e) {
					var i = Array.prototype.slice.call(arguments, 1);
					this.each(function () {
						var n = t.data(this, "bookblock");
						n
							? t.isFunction(n[e]) && "_" !== e.charAt(0)
								? n[e].apply(n, i)
								: c(
										"no such method '" +
											e +
											"' for bookblock instance"
								  )
							: c(
									"cannot call methods on bookblock prior to initialization; attempted to call method '" +
										e +
										"'"
							  );
					});
				} else
					this.each(function () {
						var i = t.data(this, "bookblock");
						i
							? i._init()
							: (i = t.data(
									this,
									"bookblock",
									new t.BookBlock(e, this)
							  ));
					});
				return this;
			};
		})(jQuery, window);
	},
	52: function (t, e) {
		!(function (t, e, i) {
			var n,
				o,
				s,
				r,
				a,
				c,
				d,
				l,
				h,
				u,
				p,
				f,
				m,
				g,
				v,
				b,
				w,
				y,
				x,
				k,
				C,
				T,
				_,
				S,
				E,
				$,
				F,
				I,
				B,
				j,
				W,
				z,
				M,
				A = {
					html: !1,
					photo: !1,
					iframe: !1,
					inline: !1,
					transition: "elastic",
					speed: 300,
					fadeOut: 300,
					width: !1,
					initialWidth: "600",
					innerWidth: !1,
					maxWidth: !1,
					height: !1,
					initialHeight: "450",
					innerHeight: !1,
					maxHeight: !1,
					scalePhotos: !0,
					scrolling: !0,
					opacity: 0.9,
					preloading: !0,
					className: !1,
					overlayClose: !0,
					escKey: !0,
					arrowKey: !0,
					top: !1,
					bottom: !1,
					left: !1,
					right: !1,
					fixed: !1,
					data: void 0,
					closeButton: !0,
					fastIframe: !0,
					open: !1,
					reposition: !0,
					loop: !0,
					slideshow: !1,
					slideshowAuto: !0,
					slideshowSpeed: 2500,
					slideshowStart: "start slideshow",
					slideshowStop: "stop slideshow",
					photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
					retinaImage: !1,
					retinaUrl: !1,
					retinaSuffix: "@2x.$1",
					current: "image {current} of {total}",
					previous: "previous",
					next: "next",
					close: "close",
					xhrError: "This content failed to load.",
					imgError: "This image failed to load.",
					returnFocus: !0,
					trapFocus: !0,
					onOpen: !1,
					onLoad: !1,
					onComplete: !1,
					onCleanup: !1,
					onClosed: !1,
					rel: function () {
						return this.rel;
					},
					href: function () {
						return t(this).attr("href");
					},
					title: function () {
						return this.title;
					},
					createImg: function () {
						var e = new Image(),
							i = t(this).data("cbox-img-attrs");
						return (
							"object" == typeof i &&
								t.each(i, function (t, i) {
									e[t] = i;
								}),
							e
						);
					},
					createIframe: function () {
						var i = e.createElement("iframe"),
							n = t(this).data("cbox-iframe-attrs");
						return (
							"object" == typeof n &&
								t.each(n, function (t, e) {
									i[t] = e;
								}),
							"frameBorder" in i && (i.frameBorder = 0),
							"allowTransparency" in i &&
								(i.allowTransparency = "true"),
							(i.name = new Date().getTime()),
							(i.allowFullscreen = !0),
							i
						);
					},
				},
				H = "colorbox",
				O = "cbox",
				L = O + "Element",
				R = O + "_open",
				D = O + "_load",
				N = O + "_complete",
				P = O + "_cleanup",
				K = O + "_closed",
				U = O + "_purge",
				q = t("<a/>"),
				J = "div",
				Q = 0,
				V = {};
			function G(i, n, o) {
				var s = e.createElement(i);
				return n && (s.id = O + n), o && (s.style.cssText = o), t(s);
			}
			function Z() {
				return i.innerHeight ? i.innerHeight : t(i).height();
			}
			function Y(e, i) {
				i !== Object(i) && (i = {}),
					(this.cache = {}),
					(this.el = e),
					(this.value = function (e) {
						var n;
						return (
							void 0 === this.cache[e] &&
								(void 0 !==
								(n = t(this.el).attr("data-cbox-" + e))
									? (this.cache[e] = n)
									: void 0 !== i[e]
									? (this.cache[e] = i[e])
									: void 0 !== A[e] &&
									  (this.cache[e] = A[e])),
							this.cache[e]
						);
					}),
					(this.get = function (e) {
						var i = this.value(e);
						return t.isFunction(i) ? i.call(this.el, this) : i;
					});
			}
			function X(t) {
				var e = h.length,
					i = ($ + t) % e;
				return i < 0 ? e + i : i;
			}
			function tt(t, e) {
				return Math.round(
					(/%/.test(t) ? ("x" === e ? u.width() : Z()) / 100 : 1) *
						parseInt(t, 10)
				);
			}
			function et(t, e) {
				return t.get("photo") || t.get("photoRegex").test(e);
			}
			function it(t, e) {
				return t.get("retinaUrl") && i.devicePixelRatio > 1
					? e.replace(t.get("photoRegex"), t.get("retinaSuffix"))
					: e;
			}
			function nt(t) {
				"contains" in o[0] &&
					!o[0].contains(t.target) &&
					t.target !== n[0] &&
					(t.stopPropagation(), o.focus());
			}
			function ot(t) {
				ot.str !== t &&
					(o.add(n).removeClass(ot.str).addClass(t), (ot.str = t));
			}
			function st(i) {
				t(e).trigger(i), q.triggerHandler(i);
			}
			var rt = (function () {
				var t,
					e,
					i = O + "Slideshow_",
					n = "click." + O;
				function s() {
					clearTimeout(e);
				}
				function r() {
					(C.get("loop") || h[$ + 1]) &&
						(s(),
						(e = setTimeout(z.next, C.get("slideshowSpeed"))));
				}
				function a() {
					b.html(C.get("slideshowStop")).unbind(n).one(n, c),
						q.bind(N, r).bind(D, s),
						o.removeClass(i + "off").addClass(i + "on");
				}
				function c() {
					s(),
						q.unbind(N, r).unbind(D, s),
						b
							.html(C.get("slideshowStart"))
							.unbind(n)
							.one(n, function () {
								z.next(), a();
							}),
						o.removeClass(i + "on").addClass(i + "off");
				}
				function d() {
					(t = !1),
						b.hide(),
						s(),
						q.unbind(N, r).unbind(D, s),
						o.removeClass(i + "off " + i + "on");
				}
				return function () {
					t
						? C.get("slideshow") || (q.unbind(P, d), d())
						: C.get("slideshow") &&
						  h[1] &&
						  ((t = !0),
						  q.one(P, d),
						  C.get("slideshowAuto") ? a() : c(),
						  b.show());
				};
			})();
			function at(s) {
				var u, v;
				if (!j) {
					if (
						((u = t(s).data(H)),
						(C = new Y(s, u)),
						(v = C.get("rel")),
						($ = 0),
						v && !1 !== v && "nofollow" !== v
							? ((h = t("." + L).filter(function () {
									return (
										new Y(this, t.data(this, H)).get(
											"rel"
										) === v
									);
							  })),
							  -1 === ($ = h.index(C.el)) &&
									((h = h.add(C.el)), ($ = h.length - 1)))
							: (h = t(C.el)),
						!I)
					) {
						(I = B = !0),
							ot(C.get("className")),
							o.css({
								visibility: "hidden",
								display: "block",
								opacity: "",
							}),
							(p = G(
								J,
								"LoadedContent",
								"width:0; height:0; overflow:hidden; visibility:hidden"
							)),
							r.css({ width: "", height: "" }).append(p),
							(T =
								a.height() +
								l.height() +
								r.outerHeight(!0) -
								r.height()),
							(_ =
								c.width() +
								d.width() +
								r.outerWidth(!0) -
								r.width()),
							(S = p.outerHeight(!0)),
							(E = p.outerWidth(!0));
						var b = tt(C.get("initialWidth"), "x"),
							w = tt(C.get("initialHeight"), "y"),
							y = C.get("maxWidth"),
							M = C.get("maxHeight");
						(C.w = Math.max(
							(!1 !== y ? Math.min(b, tt(y, "x")) : b) - E - _,
							0
						)),
							(C.h = Math.max(
								(!1 !== M ? Math.min(w, tt(M, "y")) : w) -
									S -
									T,
								0
							)),
							p.css({ width: "", height: C.h }),
							z.position(),
							st(R),
							C.get("onOpen"),
							k.add(g).hide(),
							o.focus(),
							C.get("trapFocus") &&
								e.addEventListener &&
								(e.addEventListener("focus", nt, !0),
								q.one(K, function () {
									e.removeEventListener("focus", nt, !0);
								})),
							C.get("returnFocus") &&
								q.one(K, function () {
									t(C.el).focus();
								});
					}
					var A = parseFloat(C.get("opacity"));
					n
						.css({
							opacity: A == A ? A : "",
							cursor: C.get("overlayClose") ? "pointer" : "",
							visibility: "visible",
						})
						.show(),
						C.get("closeButton")
							? x.html(C.get("close")).appendTo(r)
							: x.appendTo("<div/>"),
						(function () {
							var e,
								n,
								o,
								s = z.prep,
								r = ++Q;
							(B = !0),
								(F = !1),
								st(U),
								st(D),
								C.get("onLoad"),
								(C.h = C.get("height")
									? tt(C.get("height"), "y") - S - T
									: C.get("innerHeight") &&
									  tt(C.get("innerHeight"), "y")),
								(C.w = C.get("width")
									? tt(C.get("width"), "x") - E - _
									: C.get("innerWidth") &&
									  tt(C.get("innerWidth"), "x")),
								(C.mw = C.w),
								(C.mh = C.h),
								C.get("maxWidth") &&
									((C.mw =
										tt(C.get("maxWidth"), "x") - E - _),
									(C.mw = C.w && C.w < C.mw ? C.w : C.mw));
							C.get("maxHeight") &&
								((C.mh = tt(C.get("maxHeight"), "y") - S - T),
								(C.mh = C.h && C.h < C.mh ? C.h : C.mh));
							if (
								((e = C.get("href")),
								(W = setTimeout(function () {
									m.show();
								}, 100)),
								C.get("inline"))
							) {
								var a = t(e).eq(0);
								(o = t("<div>").hide().insertBefore(a)),
									q.one(U, function () {
										o.replaceWith(a);
									}),
									s(a);
							} else
								C.get("iframe")
									? s(" ")
									: C.get("html")
									? s(C.get("html"))
									: et(C, e)
									? ((e = it(C, e)),
									  (F = C.get("createImg")),
									  t(F)
											.addClass(O + "Photo")
											.bind("error." + O, function () {
												s(
													G(J, "Error").html(
														C.get("imgError")
													)
												);
											})
											.one("load", function () {
												r === Q &&
													setTimeout(function () {
														var e;
														C.get("retinaImage") &&
															i.devicePixelRatio >
																1 &&
															((F.height =
																F.height /
																i.devicePixelRatio),
															(F.width =
																F.width /
																i.devicePixelRatio)),
															C.get(
																"scalePhotos"
															) &&
																((n = function () {
																	(F.height -=
																		F.height *
																		e),
																		(F.width -=
																			F.width *
																			e);
																}),
																C.mw &&
																	F.width >
																		C.mw &&
																	((e =
																		(F.width -
																			C.mw) /
																		F.width),
																	n()),
																C.mh &&
																	F.height >
																		C.mh &&
																	((e =
																		(F.height -
																			C.mh) /
																		F.height),
																	n())),
															C.h &&
																(F.style.marginTop =
																	Math.max(
																		C.mh -
																			F.height,
																		0
																	) /
																		2 +
																	"px"),
															h[1] &&
																(C.get(
																	"loop"
																) ||
																	h[$ + 1]) &&
																((F.style.cursor =
																	"pointer"),
																t(F).bind(
																	"click." +
																		O,
																	function () {
																		z.next();
																	}
																)),
															(F.style.width =
																F.width + "px"),
															(F.style.height =
																F.height +
																"px"),
															s(F);
													}, 1);
											}),
									  (F.src = e))
									: e &&
									  f.load(e, C.get("data"), function (e, i) {
											r === Q &&
												s(
													"error" === i
														? G(J, "Error").html(
																C.get(
																	"xhrError"
																)
														  )
														: t(this).contents()
												);
									  });
						})();
				}
			}
			function ct() {
				o ||
					((M = !1),
					(u = t(i)),
					(o = G(J)
						.attr({
							id: H,
							class: !1 === t.support.opacity ? O + "IE" : "",
							role: "dialog",
							tabindex: "-1",
						})
						.hide()),
					(n = G(J, "Overlay").hide()),
					(m = t([
						G(J, "LoadingOverlay")[0],
						G(J, "LoadingGraphic")[0],
					])),
					(s = G(J, "Wrapper")),
					(r = G(J, "Content").append(
						(g = G(J, "Title")),
						(v = G(J, "Current")),
						(y = t('<button type="button"/>').attr({
							id: O + "Previous",
						})),
						(w = t('<button type="button"/>').attr({
							id: O + "Next",
						})),
						(b = t('<button type="button"/>').attr({
							id: O + "Slideshow",
						})),
						m
					)),
					(x = t('<button type="button"/>').attr({
						id: O + "Close",
					})),
					s
						.append(
							G(J).append(
								G(J, "TopLeft"),
								(a = G(J, "TopCenter")),
								G(J, "TopRight")
							),
							G(J, !1, "clear:left").append(
								(c = G(J, "MiddleLeft")),
								r,
								(d = G(J, "MiddleRight"))
							),
							G(J, !1, "clear:left").append(
								G(J, "BottomLeft"),
								(l = G(J, "BottomCenter")),
								G(J, "BottomRight")
							)
						)
						.find("div div")
						.css({ float: "left" }),
					(f = G(
						J,
						!1,
						"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"
					)),
					(k = w.add(y).add(v).add(b))),
					e.body &&
						!o.parent().length &&
						t(e.body).append(n, o.append(s, f));
			}
			function dt() {
				function i(t) {
					t.which > 1 ||
						t.shiftKey ||
						t.altKey ||
						t.metaKey ||
						t.ctrlKey ||
						(t.preventDefault(), at(this));
				}
				return (
					!!o &&
					(M ||
						((M = !0),
						w.click(function () {
							z.next();
						}),
						y.click(function () {
							z.prev();
						}),
						x.click(function () {
							z.close();
						}),
						n.click(function () {
							C.get("overlayClose") && z.close();
						}),
						t(e).bind("keydown." + O, function (t) {
							var e = t.keyCode;
							I &&
								C.get("escKey") &&
								27 === e &&
								(t.preventDefault(), z.close()),
								I &&
									C.get("arrowKey") &&
									h[1] &&
									!t.altKey &&
									(37 === e
										? (t.preventDefault(), y.click())
										: 39 === e &&
										  (t.preventDefault(), w.click()));
						}),
						t.isFunction(t.fn.on)
							? t(e).on("click." + O, "." + L, i)
							: t("." + L).live("click." + O, i)),
					!0)
				);
			}
			t[H] ||
				(t(ct),
				((z = t.fn[H] = t[H] = function (e, i) {
					var n = this;
					return (
						(e = e || {}),
						t.isFunction(n) && ((n = t("<a/>")), (e.open = !0)),
						n[0]
							? (ct(),
							  dt() &&
									(i && (e.onComplete = i),
									n
										.each(function () {
											var i = t.data(this, H) || {};
											t.data(this, H, t.extend(i, e));
										})
										.addClass(L),
									new Y(n[0], e).get("open") && at(n[0])),
							  n)
							: n
					);
				}).position = function (e, i) {
					var n,
						h,
						p,
						f = 0,
						m = 0,
						g = o.offset();
					function v() {
						(a[0].style.width = l[0].style.width = r[0].style.width =
							parseInt(o[0].style.width, 10) - _ + "px"),
							(r[0].style.height = c[0].style.height = d[0].style.height =
								parseInt(o[0].style.height, 10) - T + "px");
					}
					if (
						(u.unbind("resize." + O),
						o.css({ top: -9e4, left: -9e4 }),
						(h = u.scrollTop()),
						(p = u.scrollLeft()),
						C.get("fixed")
							? ((g.top -= h),
							  (g.left -= p),
							  o.css({ position: "fixed" }))
							: ((f = h),
							  (m = p),
							  o.css({ position: "absolute" })),
						!1 !== C.get("right")
							? (m += Math.max(
									u.width() -
										C.w -
										E -
										_ -
										tt(C.get("right"), "x"),
									0
							  ))
							: !1 !== C.get("left")
							? (m += tt(C.get("left"), "x"))
							: (m += Math.round(
									Math.max(u.width() - C.w - E - _, 0) / 2
							  )),
						!1 !== C.get("bottom")
							? (f += Math.max(
									Z() -
										C.h -
										S -
										T -
										tt(C.get("bottom"), "y"),
									0
							  ))
							: !1 !== C.get("top")
							? (f += tt(C.get("top"), "y"))
							: (f += Math.round(
									Math.max(Z() - C.h - S - T, 0) / 2
							  )),
						o.css({
							top: g.top,
							left: g.left,
							visibility: "visible",
						}),
						(s[0].style.width = s[0].style.height = "9999px"),
						(n = {
							width: C.w + E + _,
							height: C.h + S + T,
							top: f,
							left: m,
						}),
						e)
					) {
						var b = 0;
						t.each(n, function (t) {
							n[t] === V[t] || (b = e);
						}),
							(e = b);
					}
					(V = n),
						e || o.css(n),
						o.dequeue().animate(n, {
							duration: e || 0,
							complete: function () {
								v(),
									(B = !1),
									(s[0].style.width = C.w + E + _ + "px"),
									(s[0].style.height = C.h + S + T + "px"),
									C.get("reposition") &&
										setTimeout(function () {
											u.bind("resize." + O, z.position);
										}, 1),
									t.isFunction(i) && i();
							},
							step: v,
						});
				}),
				(z.resize = function (t) {
					var e;
					I &&
						((t = t || {}).width &&
							(C.w = tt(t.width, "x") - E - _),
						t.innerWidth && (C.w = tt(t.innerWidth, "x")),
						p.css({ width: C.w }),
						t.height && (C.h = tt(t.height, "y") - S - T),
						t.innerHeight && (C.h = tt(t.innerHeight, "y")),
						t.innerHeight ||
							t.height ||
							((e = p.scrollTop()),
							p.css({ height: "auto" }),
							(C.h = p.height())),
						p.css({ height: C.h }),
						e && p.scrollTop(e),
						z.position(
							"none" === C.get("transition") ? 0 : C.get("speed")
						));
				}),
				(z.prep = function (i) {
					if (I) {
						var n,
							s =
								"none" === C.get("transition")
									? 0
									: C.get("speed");
						p.remove(),
							(p = G(J, "LoadedContent").append(i))
								.hide()
								.appendTo(f.show())
								.css({
									width:
										((C.w = C.w || p.width()),
										(C.w = C.mw && C.mw < C.w ? C.mw : C.w),
										C.w),
									overflow: C.get("scrolling")
										? "auto"
										: "hidden",
								})
								.css({
									height:
										((C.h = C.h || p.height()),
										(C.h = C.mh && C.mh < C.h ? C.mh : C.h),
										C.h),
								})
								.prependTo(r),
							f.hide(),
							t(F).css({ float: "none" }),
							ot(C.get("className")),
							(n = function () {
								var i,
									n,
									r = h.length;
								function a() {
									!1 === t.support.opacity &&
										o[0].style.removeAttribute("filter");
								}
								I &&
									((n = function () {
										clearTimeout(W),
											m.hide(),
											st(N),
											C.get("onComplete");
									}),
									g.html(C.get("title")).show(),
									p.show(),
									r > 1
										? ("string" ==
												typeof C.get("current") &&
												v
													.html(
														C.get("current")
															.replace(
																"{current}",
																$ + 1
															)
															.replace(
																"{total}",
																r
															)
													)
													.show(),
										  w[
												C.get("loop") || $ < r - 1
													? "show"
													: "hide"
										  ]().html(C.get("next")),
										  y[
												C.get("loop") || $
													? "show"
													: "hide"
										  ]().html(C.get("previous")),
										  rt(),
										  C.get("preloading") &&
												t.each(
													[X(-1), X(1)],
													function () {
														var i = h[this],
															n = new Y(
																i,
																t.data(i, H)
															),
															o = n.get("href");
														o &&
															et(n, o) &&
															((o = it(n, o)),
															(e.createElement(
																"img"
															).src = o));
													}
												))
										: k.hide(),
									C.get("iframe")
										? ((i = C.get("createIframe")),
										  C.get("scrolling") ||
												(i.scrolling = "no"),
										  t(i)
												.attr({
													src: C.get("href"),
													class: O + "Iframe",
												})
												.one("load", n)
												.appendTo(p),
										  q.one(U, function () {
												i.src = "//about:blank";
										  }),
										  C.get("fastIframe") &&
												t(i).trigger("load"))
										: n(),
									"fade" === C.get("transition")
										? o.fadeTo(s, 1, a)
										: a());
							}),
							"fade" === C.get("transition")
								? o.fadeTo(s, 0, function () {
										z.position(0, n);
								  })
								: z.position(s, n);
					}
				}),
				(z.next = function () {
					!B &&
						h[1] &&
						(C.get("loop") || h[$ + 1]) &&
						(($ = X(1)), at(h[$]));
				}),
				(z.prev = function () {
					!B &&
						h[1] &&
						(C.get("loop") || $) &&
						(($ = X(-1)), at(h[$]));
				}),
				(z.close = function () {
					I &&
						!j &&
						((j = !0),
						(I = !1),
						st(P),
						C.get("onCleanup"),
						u.unbind("." + O),
						n.fadeTo(C.get("fadeOut") || 0, 0),
						o.stop().fadeTo(C.get("fadeOut") || 0, 0, function () {
							o.hide(),
								n.hide(),
								st(U),
								p.remove(),
								setTimeout(function () {
									(j = !1), st(K), C.get("onClosed");
								}, 1);
						}));
				}),
				(z.remove = function () {
					o &&
						(o.stop(),
						t[H].close(),
						o.stop(!1, !0).remove(),
						n.remove(),
						(j = !1),
						(o = null),
						t("." + L)
							.removeData(H)
							.removeClass(L),
						t(e)
							.unbind("click." + O)
							.unbind("keydown." + O));
				}),
				(z.element = function () {
					return t(C.el);
				}),
				(z.settings = A));
		})(jQuery, document, window);
	},
});
