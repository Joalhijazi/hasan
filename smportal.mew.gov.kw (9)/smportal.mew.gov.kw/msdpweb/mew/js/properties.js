'use strict';
/***********  API End Points only ************/
var getEndPoints = function() {
    var sendEndPoint = {
        'generalFaqs': '/general/faqs',
        'guestFaqs': '/guest/faqs',
        'guestStores': '/guest/stores',
        'generalStores': '/stores/locator',
        'favoriteStores': '/stores/fav/location',
        'userProfile': '/user/profiles',
        'getNotifications': '/notification/unread/notifications',
        'getTariff': '/tariff/getTariffs',
        'guestGetTariff': '/guest/tariff/getTariffs',
        'tips': '/general/tips',
        'guestTips': '/guest/tips',
        'calculateTariff': '/tariff/calculate',
        'guestCalculateTariff': '/guest/tariff/calculate',
        'guestInfo': '/guest/support/info',
        'generalInfo': '/general/support/info',
        'generalMedia': '/general/social/media',
        'guestMedia': '/guest/social/media',
        'search': '/general/search',
        'guestSearch': '/guest/search',
        'feedback': '/feedback/app',
        'dashboardInfo': '/dashboard/web/get',
        'caIds': '/dashboard/public/private/ca/ids',
        'balanceCharges': '/balanceandcharges/balance/ca/get',
        'billSummary': '/history/bill/summary',
        'baldiyaCharges': '/balanceandcharges/baladiya/charges',
        'transactionHistoryBill': '/history/bill',
        'transactionHistoryPayments': '/history/payment',
        'financialHistory': '/history/financial/statement',
        'consumptionGraphs': '/consumption/graph/web/ca',
        'recentConsumption': '/consumption/recent/graph',
        'meterBasedConsumption': '/consumption/graph/meter',
        'dashboardGraph': '/consumption/graph/dashboard',
        'installments': '/balanceandcharges/installments/get',
        'accountstatment': '/balanceandcharges/get/account/statement',
        'addComplaint': '/complaint/add',
        'otherCharges': '/balanceandcharges/get/other/charges',
        'getMeterDetails': '/meterreadings/meter/details',
        'updateMeter': '/meterreadings/meter/update',
        'confirmMeterReading': '/meterreadings/meter/confirm'
    };
    return sendEndPoint;
}();


var if_mobile = ((/Mobile|Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ? true : false);


function formatOutput(optionElement) {
    if (!optionElement.id) {
        return optionElement.text;
    }
    var valElem = optionElement.element.value;
    if (valElem.split(",").length > 1) {
        var cca = optionElement.element.getAttribute("data-ccaValue");
        if (cca !== "" && cca !== null) {
            valElem = '<span class="padding-lr-5 font_bold">' + cca + '</span>';
        } else {
            valElem = "";
        }
    } else {
        valElem = '<span class="padding-lr-5 font_bold"> A/C ' + optionElement.element.value + '</span>';
    }
    var $state = $(
        '<span class="padding-lr-10 align_left">' + optionElement.text + '</span>' + valElem + '<div class="clear clearfix"></div>'
    );
    return $state;
};

/***********  Plugin initializations ************/
var initPlugin = function() {
    var plugins = {};
    plugins.initSelect = function(element) {
        var perform = function perform() {
            $(element).each(function() {
                var dropParent = $(this).closest(".customSelectParent");
                if (!(dropParent.length > 0)) {
                    dropParent = $("body");
                }
                $(this).select2({
                    width: '100%',
                    dropdownParent: dropParent,
                    minimumResultsForSearch: -1,
                    // maximumInputLength: 50,
                    language: {
                        noResults: function(params) {
                            // return translatedLabels.noResultFound;
                            return "";
                        }
                    }
                });
            });
        };
        return perform();
    };
    plugins.initSelectWithAccount = function(param) {
        var acPerform = function acPerform() {
            $(param).each(function() {
                var dropParentAc = $(this).closest(".cpSelect");
                if (!(dropParentAc.length > 0)) {
                    dropParentAc = $("body");
                }
                $(this).select2({
                    width: '100%',
                    dropdownParent: dropParentAc,
                    minimumResultsForSearch: -1,
                    templateResult: formatOutput,
                    templateSelection: formatOutput,
                    // maximumInputLength: 50,
                    language: {
                        noResults: function(params) {
                            // return translatedLabels.noResultFound;
                            return "";
                        }
                    }
                });
            });
        };
        return acPerform();
    };
    plugins.getUnique = function(arr, prop) {
        return arr.map(function(e) {
            return e[prop];
        }).filter(function(e, i, a) {
            return i === a.indexOf(e);
        });
    };
    plugins.getAllChecked = function(name) {
        return $('input[name="' + name + '"]:checked').map(function() {
            return this.value;
        }).get();
    };
    plugins.compareContain = function(s, m) {
        if (s.indexOf($.trim(m)) != -1) {
            return true;
        } else {
            return false;
        }
    }
    plugins.getFormData = function(formid) {
        var unindexed_array = formid.serializeArray();
        var indexed_array = {};
        $.map(unindexed_array, function(n, i) {
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    }
    return plugins;

}();

/************** validation *****************/
var initValidate = function() {
    var validate = {};
    validate.emptyCheck = function(element) {
        var elemVal = $.trim($(element).val());
        if (elemVal == "") {
            return false;
        } else {
            return true;
        }
    };
    validate.numberOnly = function(element) {
        var elemVal = $.trim($(element).val());
        if (isNaN(elemVal)) {
            return false;
        } else {
            return true;
        }
    };
    validate.decimal = function(element) {
        var elemVal = $.trim($(element).val());
        var patt1 = /^\d*\.?\d*$/;
        if (!patt1.test(elemVal)) {
            return false;
        } else {
            return true;
        }
    };
    validate.nonDecimal = function(element) {
        var noFraction = $.trim($(element).val());
        if (isNaN(noFraction) || noFraction.indexOf('.') != -1) {
            return false;
        } else {
            return true;
        }
    };
    validate.email = function(element) {
        var elemVal = $.trim($(element).val());
        var emailFilter = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (elemVal == "" || !emailFilter.test(elemVal)) {
            return false;
        } else {
            return true;
        }
    };
    return validate;
}();

/***********  List Divisions only ************/
var listDivisions = function() {
    var get = {};
    get.Divisions = function() {
        var formDivisionsId = $("#listDivisions");
        var getDivi = initPlugin.getFormData(formDivisionsId);
        return getDivi;
    }
    return get;
}();

/***********  Translations only ************/
var staticLabels = function() {
    var get = {};
    get.label = function() {
        var formLabelId = $("#translatedLabels");
        var getVal = initPlugin.getFormData(formLabelId);
        return getVal;
    }
    return get;
}();

/******** configurable values  *********/
var getConfiguration = function() {
    var sendConf = {};
    sendConf.get = function() {
        return initPlugin.getFormData($("#jsConfiguration"));
    }
    return sendConf;
}();


/*************Public Login Cases   ***************/

var publicLogin = function() {
    var status = {};
    status.status = function() {
        if ($("#getLoggedInType").val() == "21" || $("#getLoggedInType").val() == "22" || $("#getLoggedInType").val() == "23") {
            return true;
        } else {
            return false;
        }
    }
    return status;
}();

var publicLoginLevel = function() {
    return {
        "21": "bp",
        "22": "cca",
        "23": "ca"
    }
}();

var publicLevelMapping = function() {
    return {
        "21": 1,
        "22": 2,
        "23": 3,
    }
}();

var staticMapData = function() {
    return {
        latitude: "29.3117",
        longitude: "47.4818"
    }
}();

/************ Pagination Start *************/

var pagination = (function() {

    return {

        getTablePagination: function(size) {
            // Enable Height Comment for height animation of div
            // var parentHeight = "", tableHeight = "", heightDiff = "";

            var table = $('.addTablePagination');
            var paginationParent = $('.addTablePagination').closest(".paginationParent");

            var totalRows = table.find('tr:has(td)').length;
            var recordPerPage = size;
            var totalPages = Math.ceil(totalRows / recordPerPage);

            var $pages = $('<div id="pages"></div>');
            var nActive = "active";
            for (var i = 0; i < totalPages; i++) {
                if (i > 0) {
                    nActive = "";
                }
                $('<span class="pointer pageNumber ' + nActive + ' ">' + (i + 1) + '</span>').appendTo($pages);
            }

            $pages.appendTo(paginationParent);

            table.find('tr:has(td)').hide();

            var tr = $('tr:has(td)', table);
            for (var i = 0; i <= recordPerPage - 1; i++) {
                $(tr[i]).show();
            }

            // parentHeight = paginationParent.outerHeight();
            // tableHeight = table.height();
            // heightDiff = parentHeight - tableHeight;
            // paginationParent.height(parentHeight);
            // console.log(parentHeight,tableHeight,heightDiff);

            $(document).on('click', "#pages span", function() {
                $("#pages span").removeClass("active");
                $(this).addClass("active");
                table.find('tr:has(td)').hide();
                var nBegin = ($(this).text() - 1) * recordPerPage;
                var nEnd = $(this).text() * recordPerPage - 1;
                for (var i = nBegin; i <= nEnd; i++) {
                    $(tr[i]).show();
                }

                // tableHeight = table.height();
                // paginationParent.height(tableHeight+heightDiff);

            });

        },
        getListPagination: function(size) {
            // var parentHeight = "", tableHeight = "", heightDiff = "";
            var list = $('.addListPagination');
            var paginationParent = $('.addListPagination').closest(".paginationParent");

            var totalRows = list.find('li').length;
            var recordPerPage = size;
            var totalPages = Math.ceil(totalRows / recordPerPage);


            var $pages = $('<div id="pages"></div>');

            var lActive = "active";
            for (var i = 0; i < totalPages; i++) {
                if (i > 0) {
                    lActive = "";
                }
                $('<span class="pointer pageNumber ' + lActive + '">' + (i + 1) + '</span>').appendTo($pages);
            }

            $pages.appendTo(paginationParent);

            list.find('li').hide();

            var li = $('li', list);
            for (var i = 0; i <= recordPerPage - 1; i++) {
                $(li[i]).show();
            }

            // parentHeight = paginationParent.outerHeight();
            // tableHeight = table.height();
            // heightDiff = parentHeight - tableHeight;
            // paginationParent.height(parentHeight);
            // console.log(parentHeight,tableHeight,heightDiff);

            $(document).on('click', "#pages span", function() {
                $("#pages span").removeClass("active");
                $(this).addClass("active");
                list.find('li').hide();
                var nBegin = ($(this).text() - 1) * recordPerPage;
                var nEnd = $(this).text() * recordPerPage - 1;
                for (var i = nBegin; i <= nEnd; i++) {
                    $(li[i]).show();
                }
                // tableHeight = table.height();
                // paginationParent.height(tableHeight+heightDiff);
            });
        }

    }

})();

/** this function has been called directly in jsp  **/
function otpExpiryCheck(id) {
    var reSet = $(".otpResendTimer").val();
    var param = "otpTimerC";
    if (localStorage.getItem(param) == "stop" && reSet == "") {
        $(".infoOtpTimer").hide();
        return false;
    } else if (reSet == "true" && localStorage.getItem(param) == "stop") {
        localStorage.removeItem(param);
    }

    $(".resendBtnOtp").css({
        "opacity": "0.3",
        "cursor": "not-allowed"
    });

    $("#" + id).prop("disabled", true);
    var currentDate = new Date();
    var timerCache = new Date();
    if (typeof(Storage) !== "undefined" && localStorage.getItem(param) !== null) {
        timerCache = localStorage.getItem(param)
    } else {
        timerCache = timerCache.setTime(currentDate.getTime() + (1 * 60 * 1000));
        console.log(timerCache);
        localStorage.setItem(param, timerCache)
    }
    var cacheTime = new Date(parseFloat(timerCache)).getTime();
    var seconds = (cacheTime - currentDate.getTime()) / 1000;
    var idleSecondsTimer = null;
    var idleSecondsCounter = parseInt(seconds);
    idleSecondsTimer = window.setInterval(function() {
        currentDate = new Date();
        idleSecondsCounter--;
        $("#containerTimer").html(idleSecondsCounter);
        if (currentDate > timerCache || idleSecondsCounter <= 0) {
            $("#containerTimer").html(0);
            window.clearInterval(idleSecondsTimer);
            $("#" + id).prop("disabled", false);
            $(".resendBtnOtp").css({
                "opacity": "1",
                "cursor": "pointer"
            });
            $(".infoOtpTimer").hide();
            localStorage.setItem(param, "stop");
        }
    }, 1000);
}

/************ Pagination Ends *************/