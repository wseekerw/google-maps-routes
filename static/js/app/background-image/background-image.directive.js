//DIREKTIVA ZA BACKGROUND IMAGE

angular.module('background-image').directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url('+ value +')',
                'background-size' : '100% 100%'
            });
        });
    };
});