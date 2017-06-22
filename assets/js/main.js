
var listInspire = [];

$.getJSON("assets/js/list-inspire.json", function (json) {
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

        var self = this;

        if (localStorage.subMenu === 'true') {
            self.set('subMenu', true);
        }

        this.on('toggleMenu', function() {
            this.toggle('activeMenu');
        });

        this.on('switchMenu', function () {
            this.toggle('subMenu');
            localStorage.setItem('subMenu', this.get('subMenu'));
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
