
jQuery(function($) {

    var newCard = 0;

    // Initialize grid & attach widget
    var $grid = $(".grid");
    $grid.cardView();
    $grid.on("change:selection", function(e) {
        var gl = e.widget;
        /*
        console.log(gl.getSelection());
        console.log(gl.getSelection(true));
        */
    });

    $("#main-rail").on("open close", function() {
        CUI.CardView.get($grid).relayout();
    });

    $("#selection-mode").fipo("tap", "click", function(e) {
        // use API
        CUI.CardView.get($grid).toggleGridSelectionMode();
        // use CSS contract
        // $grid.toggleClass("selection-mode");
        // $grid.find("article").removeClass("selected");
        // adjust button state
        if (CUI.CardView.get($grid).isGridSelectionMode()) {
            $("#selection-mode").removeClass("icon-check-circle");
            $("#selection-mode").addClass("icon-close-circle");
        } else {
            $("#selection-mode").addClass("icon-check-circle");
            $("#selection-mode").removeClass("icon-close-circle");
        }
    });

    function createNewCard() {
        return $("<article class=\"card-page\">" +
                "<i class=\"select\"></i>" +
                "<i class=\"move\"></i>" +
                "<a href=\"#\">" +
                    "<span class=\"image\"><img src=\"images/previews/preview1.png\" alt=\"\"></span>" +
                    "<div class=\"label\">" +
                        "<h4 class=\"main\">New Card #" + (++newCard) + "</h4>" +
                        "<div class=\"info\">" +
                            "<p class=\"published\"><i class=\"icon-site\">Published</i> <span class=\"date\">12 hours ago</span> <span class=\"user\">Alison Parker</span></p>" +
                            "<p class=\"modified\"><i class=\"icon-edit\">Modified</i> <span class=\"date\">2 days ago</span> <span class=\"user\">John Doe</span></p>" +
                            "<p class=\"links\"><i class=\"icon-arrowright\">Link</i> <span class=\"links-number\">3</span></p>" +
                        "</div>" +
                    "</div>" +
                "</a>" +
            "</article>");
    }

    $("#prepend").fipo("tap", "click", function(e) {
        var $itemEl = createNewCard();
        CUI.CardView.get($grid).getModel().insertItemAt($itemEl, 0, false);
        // CUI.CardView.get($grid).getModel().insertItemAt($itemEl, 2, false);
    });

    $("#append").fipo("tap", "click", function(e) {
        var $itemEl = createNewCard();
        CUI.CardView.get($grid).getModel().insertItemAt($itemEl, null); // null: append
    });

    $("#display-mode").fipo("tap", "click", function(e) {
        var gl = CUI.CardView.get($grid);
        var dispMode = gl.getDisplayMode();
        switch (dispMode) {
            case CUI.CardView.DISPLAY_GRID:
                $("#display-mode").removeClass("icon-viewlist");
                $("#display-mode").addClass("icon-viewgrid");
                $("#selection-mode").hide();
                gl.setDisplayMode(CUI.CardView.DISPLAY_LIST);
                break;
            case CUI.CardView.DISPLAY_LIST:
                $("#display-mode").removeClass("icon-viewgrid");
                $("#display-mode").addClass("icon-viewlist");
                $("#selection-mode").show();
                gl.setDisplayMode(CUI.CardView.DISPLAY_GRID);
                break;
        }
    });

    $('.tagpicker').filters({
        multiple: true
    });

    // make rail pullable
    var rail = $('#main-rail');
    rail.removeClass('with-toolbar-bottom');
    rail.rail({
        refreshCallback: function() {
            var def = $.Deferred();
            setTimeout(function() {
                def.resolve();
            }, 3000);

            return def.promise();
        }
    });

    // closable rail
    $('#close-rail').fipo('tap', 'click', function () {
        if (rail.hasClass("closed")) {
            rail.removeClass("closed");
            rail.trigger("open");
//          $(this).removeClass("icon-rightrailclose");
//          $(this).addClass("icon-rightrailopen");
        } else {
            rail.addClass("closed");
            rail.trigger("close");
//          $(this).addClass("icon-rightrailclose");
//          $(this).removeClass("icon-rightrailopen");
        }
    });

    // closable bottom toolbar in rail
    var quickform = $('.quickform');

    quickform.find('.trigger').fipo('tap', 'click', function () {
        quickform.toggleClass('open');
    });
});
