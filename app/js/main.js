require('ractive');
require('./plugins.js');
import projects from './projects.json';
import Ractive from 'ractive';

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

var n = 0;
$.each(projects, function (key, val) {
    listInspire.push({"image": val});
    n += 1;
    if (n == 3) {
        n = 0;
    }
});

var ractive = new Ractive({
    el: '.some-container',
    template: '#template',
    data: function() {
        return {
            pages: projects,
            menu: menuList,
            imageList: listInspire
        }
    },
    oncomplete: function() {

        var self = this;

		if (self.find('.nav--main')) {

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

		}

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
