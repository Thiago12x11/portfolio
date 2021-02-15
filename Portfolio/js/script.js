var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

};
//type write


//time line
var viewportWidth, divWidth, tb;
$(function () {

    viewport = $('#container').innerWidth();
    tb = $('#thumbs');
    divWidth = tb.outerWidth();

    $('#container').mousemove(function (e) {
        tb.css({
            left: ((viewport - divWidth) * ((e.pageX / viewport).toFixed(
                    3)))
                .toFixed(1) + "px"
        });
    });

    $('.history-block').on('click', function () {
        $('.history-block').css('width', '300px');
        $('.history-block').find('.title').css('width', '260px');
        $('.history-block .timeline').hide(300);
        $(this).css('width', '600px');
        $(this).find('.title').css('width', '500px');
        $(this).find('.timeline').show(800);
        $('#container').mousemove(function (e) {
            tb.css({
                left: ((viewport - divWidth - 300) * ((e.pageX /
                        viewport)
                    .toFixed(3))).toFixed(1) + 300 + "px"
            });
        });
    });

    $('.timeline ul li').on('click', function () {
        $(this).parent().blink();
    });
});