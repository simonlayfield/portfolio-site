
var ractive = new Ractive({
  el: '#customizer',
  template: '#template',
  data: data,
  setColours: function () {
    ractive.set('selectedColours', ractive.get('beanies.howitt.colors'));

    var paths = document.getElementsByClassName('pattern active')[0].getElementsByTagName('svg')[0].children;

    console.log(paths);

    for (var i=0; i < paths.length; i++) {
        $('.st' + i).addClass(ractive.get('selectedColours[' + i + ']'));
    }

    var activeColour = document.getElementsByClassName('selectedColours')[0].getElementsByTagName('li')[0];

    activeColour.className += ' active';

    // paths.forEach(function (index) {
    //     $('.st' + index).addClass(ractive.get('selectedColours[' + index + ']'));
    // });

    // $.each($('.pattern.active svg g').children(), function (index) {
    //
    //     $('.st' + index).addClass(ractive.get('selectedColours[' + index + ']'));
    //
    // });
  }
});

ractive.setColours();

ractive.on('changeBeanie', function (event) {

    var beanieColours = ractive.get(event.keypath + '.colors');
    ractive.set('selectedColours', beanieColours);

    $.each($('.pattern.active svg').children(), function (index) {

        $('.st' + index).addClass(ractive.get('selectedColours[' + index + ']'));

    });

});

ractive.on('changeColour', function (event) {

    var activeColour = ractive.get('activeColour');
    ractive.set('selectedColours[' + activeColour + ']', event.context);

});

ractive.on('changeSelected', function (event) {

    var currentColour = document.getElementsByClassName('selectedColours')[0].getElementsByTagName('li')[ractive.get('activeColour')];
    currentColour.className = currentColour.className.replace(new RegExp(" ?\\bactive\\b"),'')

    ractive.set('activeColour', event.index.i);

    var currentColour = document.getElementsByClassName('selectedColours')[0].getElementsByTagName('li')[ractive.get('activeColour')];
    currentColour.className += ' active';

});
