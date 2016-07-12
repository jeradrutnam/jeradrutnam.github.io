$(function(){
    
    var mainNav = '#home-nav',
        mainNavOffset = function(){
            return $(window).height() - $(mainNav).height();
        };

    $(mainNav).affix({
        offset: {
            top: mainNavOffset()
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    $(window).resize(function() {
        $(mainNav).data('bs.affix').options.offset.top = mainNavOffset;
    });
    
});