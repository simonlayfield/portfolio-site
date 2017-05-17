
var listInspire = [];

$.getJSON("./assets/js/list-inspire.json", function (json) {
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
    data: function() {
        return {
            pages: '',
            imageList: listInspire
            }

    },
    oncomplete: function() {
        this.on('toggleMenu', function() {
            this.toggle('activeMenu');
        });

        this.on('switchMenu', function () {
            this.toggle('subMenu');
        });
    }
});

Promise.all([
    $.getJSON('assets/js/projects.json'),
    ractive.set('loading', true)
]).then(function(results) {
    var ajaxData = results[0];
    ractive.set({
        loading: false,
        pages: ajaxData
    });
}).catch(e => {
    console.log(e);
});;
