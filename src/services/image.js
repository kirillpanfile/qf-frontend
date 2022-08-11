function ImageCompressor(t) {
    ;(t = Object.assign({}, defaultOptions, t)),
        (this.options = t),
        (this.file = t.file),
        (this.image = null),
        (this.ParsedOrientationInfo = null),
        this.init()
}
var WIN = window,
    REGEXP_IMAGE_TYPE = /^image\//,
    REGEXP_EXTENSION = /\.\w+$/,
    util = {},
    defaultOptions = {
        file: null,
        quality: 0.8,
        convertSize: 2048e3,
        loose: !0,
        redressOrientation: !0,
    },
    isFunc = function (t) {
        return 'function' == typeof t
    },
    isImageType = function (t) {
        return REGEXP_IMAGE_TYPE.test(t)
    },
    imageTypeToExtension = function (t) {
        var e = isImageType(t) ? t.substr(6) : ''
        return 'jpeg' === e && (e = 'jpg'), '.' + e
    },
    _proto = ImageCompressor.prototype
export default ImageCompressor
for (var key in ((_proto.init = function () {
    var t = this,
        e = this.file,
        i = this.options
    e && isImageType(e.type)
        ? (isImageType(i.mimeType) || (i.mimeType = e.type),
          util.file2Image(
              e,
              function (a) {
                  isFunc(t.beforeCompress) &&
                      ((t.image = a), (e.width = a.naturalWidth), (e.height = a.naturalHeight), t.beforeCompress(e)),
                      'image/jpeg' === e.type && i.redressOrientation
                          ? t.getParsedOrientationInfo(function (e) {
                                ;(t.parsedOrientationInfo = e), t.rendCanvas()
                            })
                          : ((t.parsedOrientationInfo = {
                                rotate: 0,
                                scaleX: 1,
                                scaleY: 1,
                            }),
                            t.rendCanvas())
              },
              t.error
          ))
        : t.error('Please upload image files!')
}),
(_proto.rendCanvas = function () {
    var t = this,
        e = this.options,
        i = this.image,
        a = this.getExpectedEdge(),
        n = a.dWidth,
        r = a.dHeight,
        o = a.width,
        s = a.height,
        l = util.image2Canvas(i, n, r, t.beforeDraw.bind(t), t.afterDraw.bind(t), o, s)
    util.canvas2Blob(
        l,
        function (e) {
            e && ((e.width = l.width), (e.height = l.height)), t.success(e)
        },
        e.quality,
        e.mimeType
    )
}),
(_proto.beforeCompress = function () {
    isFunc(this.options.beforeCompress) && this.options.beforeCompress(this.file)
}),
(_proto.getExpectedEdge = function () {
    var t,
        e = this.image,
        i = this.parsedOrientationInfo,
        a = i.rotate,
        n = this.options,
        r = e.naturalWidth,
        o = e.naturalHeight,
        s = Math.abs(a) % 180 == 90
    s && ((t = o), (o = r), (r = t))
    var l = r / o,
        u = Math.max(n.maxWidth, 0) || 1 / 0,
        c = Math.max(n.maxHeight, 0) || 1 / 0,
        f = Math.max(n.minWidth, 0) || 0,
        h = Math.max(n.minHeight, 0) || 0,
        g = Math.max(n.width, 0) || r,
        p = Math.max(n.height, 0) || o
    u < 1 / 0 && c < 1 / 0
        ? c * l > u
            ? (c = u / l)
            : (u = c * l)
        : u < 1 / 0
        ? (c = u / l)
        : c < 1 / 0 && (u = c * l),
        f > 0 && h > 0 ? (h * l > f ? (h = f / l) : (f = h * l)) : f > 0 ? (h = f / l) : h > 0 && (f = h * l),
        p * l > g ? (p = g / l) : (g = p * l),
        (g = Math.floor(Math.min(Math.max(g, f), u))),
        (p = Math.floor(Math.min(Math.max(p, h), c)))
    var m = g,
        d = p
    return s && ((t = d), (d = m), (m = t)), { dWidth: m, dHeight: d, width: g, height: p }
}),
(_proto.getParsedOrientationInfo = function (t) {
    var e = this
    this.getOrientation(function (i) {
        isFunc(t) && t(e.parseOrientation(i))
    })
}),
(_proto.getOrientation = function (t) {
    var e = this
    util.file2ArrayBuffer(this.file, function (i) {
        isFunc(t) && t(e.resetAndGetOrientation(i))
    })
}),
(_proto.resetAndGetOrientation = function (t) {
    var e,
        i = new DataView(t)
    try {
        var a, n, r
        if (255 === i.getUint8(0) && 216 === i.getUint8(1))
            for (var o = i.byteLength, s = 2; s + 1 < o; ) {
                if (255 === i.getUint8(s) && 225 === i.getUint8(s + 1)) {
                    n = s
                    break
                }
                s += 1
            }
        if (n) {
            var l = n + 4,
                u = n + 10
            if ('Exif' === util.getStringFromCharCode(i, l, 4)) {
                var c = i.getUint16(u)
                if (((a = 18761 === c), (a || 19789 === c) && 42 === i.getUint16(u + 2, a))) {
                    var f = i.getUint32(u + 4, a)
                    f >= 8 && (r = u + f)
                }
            }
        }
        if (r) {
            var h
            o = i.getUint16(r, a)
            for (h = 0; h < o; h += 1)
                if (((s = r + 12 * h + 2), 274 === i.getUint16(s, a))) {
                    ;(s += 8), (e = i.getUint16(s, a)), i.setUint16(s, 1, a)
                    break
                }
        }
    } catch (t) {
        console.error(t), (e = 1)
    }
    return e
}),
(_proto.parseOrientation = function (t) {
    var e = 0,
        i = 1,
        a = 1
    switch (t) {
        case 2:
            i = -1
            break
        case 3:
            e = -180
            break
        case 4:
            a = -1
            break
        case 5:
            ;(e = 90), (a = -1)
            break
        case 6:
            e = 90
            break
        case 7:
            ;(e = 90), (i = -1)
            break
        case 8:
            e = -90
    }
    return { rotate: e, scaleX: i, scaleY: a }
}),
(_proto.beforeDraw = function (t, e) {
    var i = this.parsedOrientationInfo,
        a = i.rotate,
        n = i.scaleX,
        r = i.scaleY,
        o = this.file,
        s = this.options,
        l = 'transparent',
        u = e.width,
        c = e.height
    switch (
        (o.size > s.convertSize && 'image/png' === s.mimeType && ((l = '#fff'), (s.mimeType = 'image/jpeg')),
        (t.fillStyle = l),
        t.fillRect(0, 0, u, c),
        isFunc(s.beforeDraw) && s.beforeDraw.call(this, t, e),
        t.save(),
        a)
    ) {
        case 90:
            t.translate(u, 0)
            break
        case -90:
            t.translate(0, c)
            break
        case -180:
            t.translate(u, c)
    }
    t.rotate((a * Math.PI) / 180), t.scale(n, r)
}),
(_proto.afterDraw = function (t, e) {
    var i = this.options
    isFunc(i.afterDraw) && i.afterDraw.call(this, t, e)
}),
(_proto.error = function (t) {
    var e = this.options
    if (!isFunc(e.error)) throw new Error(t)
    e.error.call(this, t)
}),
(_proto.success = function (t) {
    var e = this.options,
        i = this.file,
        a = this.image,
        n = this.getExpectedEdge(),
        r = a.naturalHeight,
        o = a.naturalWidth
    if (t && t.size)
        if (!e.loose && t.size > i.size && !(n.width > o || n.height > r))
            console.warn(
                'The current setting is non-relaxed mode, the compression result is larger than the source image, and the source image is output.'
            ),
                (t = i)
        else {
            var s = new Date()
            ;(t.lastModified = s.getTime()),
                (t.lastModifiedDate = s),
                (t.name = i.name),
                t.name && t.type !== i.type && (t.name = t.name.replace(REGEXP_EXTENSION, imageTypeToExtension(t.type)))
        }
    else console.warn('The picture is compressed a bit unexpectedly, the output source picture'), (t = i)
    isFunc(e.success) && e.success.call(this, t)
}),
(util.file2DataUrl = function (t, e, i) {
    var a = new FileReader()
    ;(a.onload = function () {
        e(a.result)
    }),
        (a.onerror = function () {
            isFunc(i) && i('Failed to read file！')
        }),
        a.readAsDataURL(t)
}),
(util.file2ArrayBuffer = function (t, e, i) {
    var a = new FileReader()
    ;(a.onload = function (t) {
        e(t.target.result)
    }),
        (a.onerror = function () {
            isFunc(i) && i('Failed to read file！')
        }),
        a.readAsArrayBuffer(t)
}),
(util.getStringFromCharCode = function (t, e, i) {
    var a,
        n = ''
    for (i += e, a = e; a < i; a += 1) n += String.fromCharCode(t.getUint8(a))
    return n
}),
(util.file2Image = function (t, e, i) {
    var a = new Image(),
        n = WIN.URL || WIN.webkitURL
    if (
        (WIN.navigator &&
            /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WIN.navigator.userAgent) &&
            (a.crossOrigin = 'anonymous'),
        (a.alt = t.name),
        (a.onerror = function () {
            isFunc(i) && i('Image loading error!')
        }),
        n)
    ) {
        var r = n.createObjectURL(t)
        ;(a.onload = function () {
            e(a), n.revokeObjectURL(r)
        }),
            (a.src = r)
    } else
        this.file2DataUrl(
            t,
            function (t) {
                ;(a.onload = function () {
                    e(a)
                }),
                    (a.src = t)
            },
            i
        )
}),
(util.url2Image = function (t, e, i) {
    var a = new Image()
    ;(a.src = t),
        (a.onload = function () {
            e(a)
        }),
        (a.onerror = function () {
            isFunc(i) && i('Image loading error!')
        })
}),
(util.image2Canvas = function (t, e, i, a, n, r, o) {
    var s = document.createElement('canvas'),
        l = s.getContext('2d')
    return (
        (s.width = r || t.naturalWidth),
        (s.height = o || t.naturalHeight),
        isFunc(a) && a(l, s),
        l.save(),
        l.drawImage(t, 0, 0, e, i),
        l.restore(),
        isFunc(n) && n(l, s),
        s
    )
}),
(util.canvas2DataUrl = function (t, e, i) {
    return t.toDataURL(i || 'image/jpeg', e)
}),
(util.dataUrl2Image = function (t, e, i) {
    var a = new Image()
    ;(a.onload = function () {
        e(a)
    }),
        (a.error = function () {
            isFunc(i) && i('Image loading error!')
        }),
        (a.src = t)
}),
(util.dataUrl2Blob = function (t, e) {
    for (
        var i = t.split(',')[1],
            a = /^data:(.*?)(;base64)?,/,
            n = t.match(a)[1],
            r = atob(i),
            o = i.length,
            s = new Uint8Array(o),
            l = 0;
        l < o;
        l++
    )
        s[l] = r.charCodeAt(l)
    return new Blob([s], { type: e || n })
}),
(util.blob2DataUrl = function (t, e, i) {
    this.file2DataUrl(t, e, i)
}),
(util.blob2Image = function (t, e, i) {
    this.file2Image(t, e, i)
}),
(util.canvas2Blob = function (t, e, i, a) {
    var n = this
    HTMLCanvasElement.prototype.toBlob ||
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (t, e, i) {
                var a = this.toDataURL(e, i)
                t(n.dataUrl2Blob(a))
            },
        }),
        t.toBlob(
            function (t) {
                e(t)
            },
            a || 'image/jpeg',
            i || 0.8
        )
}),
(util.upload = function (t, e, i) {
    var a = new XMLHttpRequest(),
        n = new FormData()
    n.append('file', e),
        (a.onreadystatechange = function () {
            if (4 !== a.readyState || 200 !== a.status) throw new Error(a)
            i && i(a.responseText)
        }),
        a.open('POST', t, !0),
        a.send(n)
}),
util))
    util.hasOwnProperty(key) && (ImageCompressor[key] = util[key])
