
$(document).ready(function() {
    // are we running in native app or in a browser?
    window.isphone = false
    if (document.URL.indexOf("http://") === -1
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true
    }

    console.log('phonegap?', window.isphone)
    if (window.isphone) { // //file is a browser
        document.addEventListener("deviceready", onDeviceReady, false)
    } else {
        onDeviceReady()
    }
})

loadjs([
    'https://cdn.jsdelivr.net/npm/signals@1.0.0/dist/signals.min.js'
    ,


    , 'https://cdn.jsdelivr.net/npm/js-offcanvas@1.2.6/dist/_js/js-offcanvas.pkgd.js'
    , 'https://cdn.jsdelivr.net/npm/js-offcanvas@1.2.6/dist/_css/prefixed/js-offcanvas.css'
    , ROOT + 'assets/css/gridforms/gridforms.css'
    , ROOT + 'assets/js/lorem.js'
], 'cssJs')

function onDeviceReady() { // nothing will work before this
    console.log('deviceready!')
    loadjs.done('device')
}

function cssLoaded() {// called by the style sheet in layout
    loadjs.done('css')
}

loadjs.ready(['css', 'device', 'cssJs'], function() {
    loadjs.done('style')
})

let _scSz = true
function setupUserSzSc() {
    $(window).scroll(function() {
        _scSz = true
    })
    $(window).resize(function() {
        _scSz = true
    })
}//()
setInterval(function() {
    if (_scSz) {
        _scSz = false
        userSzSc()
    }
}, 150)

// usage: ////////////////////////////////////////////////////////////////////
loadjs.ready(['style'], function() {// 'show' page, ex: unhide
    setupUserSzSc()


    $('#off-canvas').offcanvas({
        triggerButton: '#off-cbut' // btn to open offcanvas
    })
    let offcanvas = $('#off-canvas').data('offcanvas-component')
    $('#offItems').click(function() {
        console.log('#offItems')
        offcanvas.close()
    })
    $('.delayShowing').removeClass('delayShowing') // show

    loadjs(ROOT + 'assets/router/spa-router.js')

    console.log('style done', Date.now() - _start)
})//ready

// util: /////////////////////////////////////////////////////////////////////
function getUrlVars() {
    var vars = [], hash
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=')
        vars.push(hash[0])
        vars[hash[0]] = hash[1]
    }
    return vars
}

function inView(el) { // is element in viewport
    //special bonus for jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect()

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    )
}

