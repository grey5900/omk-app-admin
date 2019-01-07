/**
 * Created by Grey on 16/5/27.
 */

module.exports = function ($) {

  console.log('injection');
  $.fn.fixedtableheader = function (options) {
    console.log(options);
    var settings = jQuery.extend({
        headerrowsize: 1,
        highlightrow: false,
        highlightclass: "highlight"
      },
      options);
    console.log(this);
    this.each(function (i) {
      var $tbl = $(this);
      console.log('$tbl: ', $tbl);
      var $tblhfixed = $tbl.find("tr:lt(" + settings.headerrowsize + ")");
      var headerelement = "th";
      var headerElements = $tblhfixed.find(headerelement);
      if (headerElements.length == 0) {
        headerelement = "td";
        headerElements = $tblhfixed.find(headerelement);
        if (headerElements.length > 0) {
          headerElements.each(function () {
            console.log('headerElements loop: ', $(this));
            $(this).css("width", $(this).width());
          });

          var $clonedTable = $tbl.clone().empty();
          var tblwidth = GetTblWidth($tbl);

          $clonedTable.attr("id", "fixedtableheader" + i).css({
            "position": "fixed",
            "top": "0",
            "left": $tbl.offset().left
          }).append($tblhfixed.clone()).width(tblwidth).hide().appendTo($("body"));

          if (settings.highlightrow)
            $("tr:gt(" + (settings.headerrowsize - 1) + ")", $tbl).hover(function () {
                $(this).addClass(settings.highlightclass);
              },
              function () {
                $(this).removeClass(settings.highlightclass);
              });
          
          $(window).scroll(function () {
            if (jQuery.browser.msie && jQuery.browser.version == "6.0")
              $clonedTable.css({
                "position": "absolute",
                "top": $(window).scrollTop(),
                "left": $tbl.offset().left
              });
            else $clonedTable.css({
              "position": "fixed",
              "top": "0",
              "left": $tbl.offset().left - $(window).scrollLeft()
            })
            var sctop = $(window).scrollTop();
            var elmtop = $tblhfixed.offset().top;
            if (sctop > elmtop && sctop <= (elmtop + $tbl.height() - $tblhfixed.height()))
              $clonedTable.show();
            else
              $clonedTable.hide();
          });
          $(window).resize(function () {
            if ($clonedTable.outerWidth() != $tbl.outerWidth()) {
              $tblhfixed.find(headerelement).each(function (index) {
                var w = $(this).width();
                $(this).css("width", w);
                $clonedTable.find(headerelement).eq(index).css("width", w);
              });
              $clonedTable.width($tbl.outerWidth());
            }
            $clonedTable.css("left", $tbl.offset().left);
          });
        }
      }
    });
    function GetTblWidth($tbl) {
      var tblwidth = $tbl.outerWidth();
      return tblwidth;
    }
  };
};

