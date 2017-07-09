
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
    "flexible": true
}, {
    "label": "Contact",
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

var ractive = new Ractive({
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

		console.log(flexibleItems.length);
		console.log(submenuLength);

		var menuHeight = 2 * Math.ceil((flexibleItems.length + 2) / 2)
			submenuHeight = 2 * Math.ceil((submenuLength + 2) / 2);

		menuHeight = menuHeight / 2;
		submenuHeight = submenuHeight / 2;

		console.log(self.get('activeMenu'));

		if (self.get('activeMenu')) {
			console.log('menu is open');
			self.find('.wrap').style.top = 0;
		} else if (self.get('subMenu')){
			console.log('submenu is active');
			self.find('.wrap').style.top =  '-' + 50 * submenuHeight + 'px';
		} else {
			console.log('main menu is active');
			self.find('.wrap').style.top =  '-' + 50 * menuHeight + 'px';
		};

        this.on('toggleMenu', function() {
            self.toggle('activeMenu');
			if (self.get('activeMenu')) {
				console.log('menu is open');
				self.find('.wrap').style.top = 0;
			} else if (self.get('subMenu')){
				console.log('submenu is active');
				self.find('.wrap').style.top =  '-' + 50 * submenuHeight + 'px';
			} else {
				console.log('main menu is active');
				self.find('.wrap').style.top =  '-' + 50 * menuHeight + 'px';
			};
        });

        this.on('switchMenu', function () {
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
