
    $(document).ready(function () {

        $(function() {
            $('.panel').matchHeight();
        });

        var menuElement = document.getElementsByTagName('body');
        var menuIcon = document.getElementById('menu-icon');
        var overlayElement = document.getElementById('overlay');

        menuIcon.addEventListener('click', menuHandler);
        overlayElement.addEventListener('click', menuHandler);

        function menuHandler(e){
            toggleClass(e.target, 'menuActive');
        }

        function toggleClass (element, className) {

            var regexp = new RegExp('\\b(' + className + ')\\b', 'g');

            if (!menuElement[0].className) {

                menuElement[0].className = className;

                return element;
            }

            if (menuElement[0].className.search(regexp) !== -1) {

                menuElement[0].className =
                    _.trim(menuElement[0].className.replace(regexp, ''));

                return element;
            }

            return element;
        }

    });
