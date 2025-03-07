"use strict";
var xhrPool = [];
var xhrPoolTemp = [];
var Cloud = function() {
    var cloud = {};
    cloud.send = function(method, url, data, successHandler, errorContainer, completeHandler) {
        var requestHeaders = $("#mainHeaders");
        var getHeaders = initPlugin.getFormData(requestHeaders);
        if (if_mobile) {
            getHeaders.channel = "mobileWeb"
        }
        var globalReqCheck = true;
        // (url == getEndPoints.recentConsumption || url == getEndPoints.consumptionGraphs) ? globalReqCheck = false: globalReqCheck = true;
        (url == getEndPoints.recentConsumption) ? globalReqCheck = false: globalReqCheck = true;

        // var nurl = "https://mewsc0.kw.zain.com/gateway-msdp/mew-integration/rest"  + url
        var nurl = "https://smportal.mew.gov.kw/gateway-msdp/mew-integration/rest" + url;
        // var nurl = "http://172.27.27.149:9081/mew-integration/rest" + url;
        $.ajax({
            type: method,
            url: nurl,
            headers: getHeaders,
            contentType: 'application/json ; charset=utf-8',
            data: data,
            success: function success(result) {
                if (result.responseCode == "200") {
                    console.info("%cresult from: ", "color:green;font-size:16px;font-family:bold;", url, result);
                    try {
                        successHandler(result);
                    } catch (error) {
                        console.log(error);
                        for (var erz in errorContainer) {
                            $(errorContainer[erz]).empty();
                            $(errorContainer[erz]).append("<p class='errorHandlerCall red font_regular font_16 grey padding-tb-10'>" + staticLabels.label().techError + "</p>");
                        }
                    }
                }

                /** Force Logout **/
                else if (result.responseCode == "993") {
                    if ($(document).find("#logoutForm").length > 0) {
                        $(document).find("#submitLogout").click();
                    }
                }
                /** Server under maintenance **/
                else if (result.responseCode == "994") {
                    console.log("redirecting to maintenance");
                    localStorage.setItem("maintenanceTimeTo", result.data.to);
                    localStorage.setItem("maintenanceTimeFrom", result.data.from);
                    // window.location.replace("/primary/maintain?f=result.data.from&t=result.data.to");
                    window.location.href = "/msdpweb/primary/maintain?" + result.data.to;
                } else {
                    console.log("%cRequest Error from: ", "color:red;font-size:16px;font-family:bold;", url, result);
                    var errorCont = errorContainer;
                    for (var _er in errorCont) {
                        $(errorCont[_er]).empty()
                        $(errorCont[_er]).append("<p class='errorHandlerCall red font_regular font_16 grey padding-tb-10'>" + result.responseDesc + "</p>");
                    }
                }
            },
            global: globalReqCheck,
            error: function error(err) {
                console.log("%cError from: ", "color:red;font-size:16px;font-family:bold;", url, err);
                var errorCont = errorContainer;
                var errorMessage = staticLabels.label().techError;
                if (typeof err.responseText != "undefined" && err.responseText != "") {
                    var t = IsJsonString(err.responseText);
                    var responseError = "";
                    if (t) {
                        var resErrCode = JSON.parse(err.responseText);
                        if (resErrCode.responseCode == 993) {
                            if ($(document).find("#logoutForm").length > 0) {
                                $(document).find("#submitLogout").click();
                            }
                        }
                        /** Server under maintenance **/
                        else if (resErrCode.responseCode == 994) {
                            console.log("redirecting to maintenance");
                            localStorage.setItem("maintenanceTimeTo", resErrCode.data.to);
                            // localStorage.setItem("maintenanceTimeFrom" , resErrCode.data.from);
                            // window.location.replace("/primary/maintain?"+resErrCode.data.to);
                            window.location.href = "/msdpweb/primary/maintain?" + resErrCode.data.to;
                        }
                        responseError = JSON.parse(err.responseText);
                        console.log("responseError", responseError);
                        errorMessage = responseError.responseDesc;
                    }
                    if (errorMessage == undefined) {
                        errorMessage = staticLabels.label().techError;
                        console.log("techError error message", errorMessage);
                        console.log("here");
                    }
                }
                for (var er in errorCont) {
                    $(errorCont[er]).empty();
                    $(errorCont[er]).append("<p class='errorHandlerCall red font_regular font_16 grey padding-tb-10'>" + errorMessage + "</p>");
                }
            },
            complete: function complete(c) {
                // var i = xhrPoolTemp.indexOf(c);
                // if (i > -1) xhrPoolTemp.splice(i, 1);
                completeHandler(c)
            }
            // complete: completeHandler
        });

        // $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        // 	console.log('ajaxPrefilter ' + options.url);
        // 	jqXHR.requestURL = options.url;
        // });
    };

    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    return cloud;
}();

$(document).ajaxStart(function() {
    $("#ajaxloader").show();
    $("#preloader").hide();
});
$(document).ajaxStop(function() {
    $("#ajaxloader").fadeOut();
    console.log("All ajax complete");
});