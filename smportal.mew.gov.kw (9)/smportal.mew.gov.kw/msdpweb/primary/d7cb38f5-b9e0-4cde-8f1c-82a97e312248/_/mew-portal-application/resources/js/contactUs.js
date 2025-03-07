"use strict";

(function() {
    var requestParam = {};

    var endPoint = getEndPoints.guestInfo,
        loggedIn = $("input[name='loggedIn']").val(),
        onContactUsPage = false;

    if ($("#allowContactUsPage").length > 0) {
        onContactUsPage = true;
    }

    if (loggedIn == 'true') {
        endPoint = getEndPoints.generalInfo;
    }
    var supportIcons = "";
    if ($("#getSupportConf")) {
        supportIcons = initPlugin.getFormData($("#getSupportConf"));
    }


    Cloud.send("POST", endPoint, JSON.stringify(requestParam),

        function(result) {
            // var cats = result.data.categories;

            var supportMap = result.data.supportInfoMap;
            $(".listAnimateBorder").empty();

            for (var _i in supportMap) {
                if (supportIcons[supportMap[_i].customKey] != 'website') {
                    var tempAttributes = "";
                    for (var _i2 in supportMap[_i].attributes) {

                        if (supportMap[_i].customKey == "C4") {
                            $("#appendAddress").append('<p class="white padding-t-5 fromApi">' + supportMap[_i].attributes[_i2].value + '</p>');

                            tempAttributes += '<div class="clear clearfix"><p class="align_left font_14 width-30 bad_grey lineheight_24 font_regular">' + supportMap[_i].attributes[_i2].value + '</p></div>';

                        } else {

                            tempAttributes += '<div class="clear clearfix"><p class="align_left font_14 width-30 bad_grey lineheight_24 font_regular">' + supportMap[_i].attributes[_i2].key + '</p><p class=" ' + (supportMap[_i].customKey == "C3" ? "ltr" : "") + '  align_left font_14 width-30 bad_grey lineheight_24 font_regular">' + supportMap[_i].attributes[_i2].value + '</p></div>';

                        }

                    }
                    if (onContactUsPage) {
                        $(".listAnimateBorder").append(
                            ' <li class="padding-tb-15 text_align_left relative animatedBorder">' +
                            '<h3 class="blue padding-lr-10 padding-b-10 font_18 font_medium ' + supportIcons[supportMap[_i].customKey].toLowerCase() + 'icon">' +
                            supportMap[_i].categoryName +
                            '</h3><div class="clearfix padding-lr-35 putSupportData_' + supportMap[_i].categoryName + '"> ' + tempAttributes + '</div>' +
                            '</li>'

                        );

                    }
                }

            }


        }, ["#contactUsContainer , #appendAddress"],

        function(complete) {
            console.log("contact us call is complete");
        }
    )



}());