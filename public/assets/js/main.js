
var menuList = [{
    "label": "Home",
    "url": "index.html"
}, {
    "label": "Projects",
    "sub": [{
        "label": "Web"
    }, {
        "label": "Branding"
    }, {
        "label": "Illustration"
    }]
}, {
    "label": "Github",
    "icon": "github",
    "url": "https://github.com/simonlayfield/",
    "flexible": true
}, {
    "label": "Contact",
    "url": "https://aemail.com/Z6J",
    "flexible": true
}]

var listInspire = [];

$.getJSON("assets/js/projects.json", function (json) {
    var n = 0;
    $.each(json, function (key, val) {
        listInspire.push({"image": val});
        n += 1;
        if (n == 3) {
            n = 0;
        }
    });
});

var ractive = Ractive({
    el: '.some-container',
    template: '#template',
    data: function() {
        return {
            pages: '',
            menu: menuList,
            imageList: listInspire
        }
    },
    oncomplete: function() {

        var self = this;

		if (localStorage.subMenu === 'true') {
			self.set('subMenu', true);
		}

		var submenuLength;

		// Check the total number of flexible menu items
		var flexibleItems = self.get('menu').filter(function(item) {
			if (item.sub) {
				submenuLength = item.sub.length;
			}
			return item.flexible ? 'item.label' : false;
		});

		var menuLength = 2 * Math.ceil((flexibleItems.length + 2) / 2)
			submenuLength = 2 * Math.ceil((submenuLength + 2) / 2);

		menuLength = menuLength / 2;
		submenuLength = submenuLength / 2;

		if (self.get('activeMenu')) {
			self.find('.wrap').className = 'wrap';
		} else if (self.get('subMenu')){
			self.find('.wrap').classList.add('wrap--' + submenuLength);
		} else {
			self.find('.wrap').classList.add('wrap--' + menuLength);
		};

        this.on('toggleMenu', function() {
            self.toggle('activeMenu');
			if (self.get('activeMenu')) {
				self.find('.wrap').className = 'wrap';
			} else if (self.get('subMenu')){
				self.find('.wrap').classList.add('wrap--' + submenuLength);
			} else {
				self.find('.wrap').classList.add('wrap--' + menuLength);
			};
        });

        this.on('switchMenu', function() {
            self.toggle('subMenu');
            localStorage.setItem('subMenu', self.get('subMenu'));
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
