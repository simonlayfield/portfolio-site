var listInspire = [];


$.getJSON("./js/list-gif.json", function (json) {

    var n = 0;

    $.each(json, function (key, val) {
        listInspire.push({"image": val});
        n += 1;
        if (n == 3) {
            n = 0;
        }
    });

});

var ractive = new Ractive({
    el: '.some-container',
    template: '#template',
    data: {
        imageList: listInspire
    },
    oncomplete: function () {

        setTimeout(function(){

            var columnHeights = [],
            imagelists = document.querySelectorAll('.imagelist'),
            imageIncrement = 9,
            n = 0,
            scrollLock = true;

            var shortestColumn = function (arr) {
                var lowest = 0;
                for (var i = 1; i < arr.length; i++) {
                    if (arr[i] < arr[lowest]) lowest = i;
                }
                return lowest;
            }

            function insertImage (image) {

                [].forEach.call(imagelists, function(list, index) {
                    columnHeights[index] = list.offsetHeight;
                });

                var column = shortestColumn(columnHeights);

                imagelists[column].appendChild(image);

            }

            function loadImage (image) {

                if (image.indexOf('.webm') > 0) {
                    var video = document.createElement('video');
                    video.autoplay = true;
                    video.loop = true;

                    var source = document.createElement('source');
                    source.src = '/img/auto/gif/' + image;
                    source.type = "video/webm";
                    video.appendChild(source);

                    video.addEventListener('loadeddata', function() {
                       insertImage(video);
                    }, false);

                } else {

                    var img = new Image();
                    img.src = '/img/auto/gif/' + image;
                    img.className = 'loaded';
                    img.onload = function() {
                        insertImage(img);
                    };

                }

            }

            function cycleImages () {

                if (n == listInspire.length) {
                    scrollLock = false;
                    return;
                }

                if (n + imageIncrement > listInspire.length) {
                    var limit = listInspire.length - n;
                } else {
                    var limit = n + imageIncrement;
                }

                for (var i = n; i < limit; i++) {

                    scrollLock = false;

                    var nextImage = ractive.get('imageList.' + i + '.image');
                    loadImage(nextImage);

                }

                n = n + imageIncrement;
                scrollLock = true;

            }

            cycleImages();

            window.onscroll = function(ev) {
                if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
                    if (scrollLock) {
                        cycleImages();
                    }
                }
            };

        }, 1000);

    }

});
