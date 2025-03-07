$(document).ready(function() {

    /***** clear local storage on logout *****/

    if ($(".putPrimaryId21").length > 0) {
        $(".putPrimaryId21").html($("#mainHeaders input[name='primaryid']").val());
    }

    $(document).on("click", "#submitLogout ,#clearStorage", function() {
        localStorage.clear();
    });

    // Don't submit form if submit button is not visible 

    $(window).keydown(function(event) {
        if ($(document).find('.hideOnError').length > 0) {
            if (event.keyCode == 13) {
                if ($('.hideOnError').css('display') == 'none') {
                    event.preventDefault();
                    return false;
                }
            }
        }
    });


    $(document).on("submit", "#privateLoginForm,#regFormId,#forFormId", function(e) {
        var civilIDPrivate = $(this).find(".civilIDvalidation");
        if (civilIDPrivate.length > 0) {
            var civilIDPrivateVal = civilIDPrivate.val();
            if (civilIDPrivateVal.length != 12 && civilIDPrivateVal.length != 8) {
                e.preventDefault();
                $("#popupForValidation").addClass("active");
                $(".page_mwrapper").addClass("show_overlay");
            }
        }
    });



    $(document).on("click", ".resetCacheOTP", function() {
        localStorage.removeItem("otpTimerC");
    });

    $(document).on("submit", "#privateLoginForm ,#publicLoginForm", function() {
        localStorage.clear();
    });

    var prmIdCheck = $("#mainHeaders input[name='primaryid']").val();
    if (prmIdCheck !== "" && $("#page_dashboard").length > 0 && typeof(Storage) !== "undefined" && localStorage.getItem("paramToDb") == null) {
        var locToStore = window.location.href;
        locToStore = window.btoa(unescape(encodeURIComponent(locToStore)));
        localStorage.setItem("paramToDb", locToStore);
    }
    if ($(".putDBParam").length > 0 && typeof(Storage) !== "undefined" && localStorage.getItem("paramToDb") !== null) {
        var locToGet = localStorage.getItem("paramToDb");
        locToGet = atob(locToGet);
        $(".putDBParam").attr("href", locToGet);
    }

    if ($("#page_payStepOne").length > 0 && $(".baladiyaChargesInput").length > 0) {
        var oVal = $(".baladiyaChargesInput").val();
        oVal = parseFloat(oVal);
        $(".baladiyaChargesInput").val(oVal);
    }


    // Get account type stored in localstorage
    var accountType = localStorage.getItem("dashboardSelectedAccount") || "";
    /*********** Show Financial Statement in view&bill menu ***********/
    if (!publicLogin.status()) {
        if (accountType == "1") {
            if ($(".onlyPrepaid").length > 0 || $(".onlyPostpaid").length > 0) {
                $(".onlyPrepaid").removeClass('hide').show();
                $(".onlyPostpaid").addClass('hide').hide();
            }
        } else {
            if ($(".onlyPrepaid").length > 0 || $(".onlyPostpaid").length > 0) {
                $(".onlyPrepaid").addClass('hide').hide();
                $(".onlyPostpaid").removeClass('hide').show();
            }
        }
    }
    /***** update this as per required for public login *****/
    else {

        $(".onlyPostpaid").removeClass('hide').show();
        $(".onlyPrepaid").addClass('hide').hide();

        /********* Disable Routing if selected user is bp **********/
        disableBp();
        $(document).on("change", ".getDashboardValPublic ", function() {
            disableBp();
        });
    }


    function disableBp() {
        var publicAccountType = localStorage.getItem('accountSelectionLevel') || "";

        if (publicAccountType === "bp") {
            $(document).find(".notifyUserLevel").each(function() {
                $(this).addClass("bpNotify");
            });
        } else {
            $(document).find(".notifyUserLevel").each(function() {
                $(this).removeClass("bpNotify");
            });
        }
    }

    /****************************/

    if ($(".getImagePath").length > 0) {
        $(".getImagePath").each(function(param) {
            var imageSrc = $(this).attr("src");
            $(this).closest(".putImagePath").css({
                'background-image': 'url(' + imageSrc + ')',
                'border-radius': '10px'
            });
        });
    }


    if ($("#getMainHeading").length > 0) {
        var getMainhead = $("#getMainHeading").val();
        $("#putMainHeading").text($.trim(getMainhead));
    }

    $(document).ajaxStart(function() {
        $("#ajaxloader").show();
        $("#preloader").hide();
        console.log("ajax Started");
    });
    $(document).ajaxStop(function() {
        console.log("ajax end");
        $("#ajaxloader").fadeOut();

        /*** only for those dymanic elements that are being append in dom after ajax response ***/

        if ($(".customSelect").length > 0) {
            initPlugin.initSelect(".customSelect:not([class^='select2']");
        }


    });


    /******* Pay for Others Check *******/
    var premiseLen = $(":input[name='premiseIdlength']").val();
    var caLeng = $(":input[name='pCaIdLength']").val();
    $(document).on("change", '.getMaxLength .customRadioBox', function() {
        var addLenOn = $(this).val();
        if (addLenOn == "3") {
            $(document).find(".putMaxLength > :input").attr("value", "");
            $(document).find(".putMaxLength > :input").attr("maxLength", caLeng);
        }
        if (addLenOn == "5") {
            $(document).find(".putMaxLength > :input").attr("value", "");
            $(document).find(".putMaxLength > :input").attr("maxLength", premiseLen);
        }
    });


    /************ input functions *************/

    $("#inpt_search").on('focus', function() {
        $(this).parent('label').addClass('active');
    });

    $("#inpt_search").on('blur', function() {
        if ($(this).val().length == 0)
            $(this).parent('label').removeClass('active');
    });



    /*********** Enable Select on CHeckBox change *********/
    if ($(".disableSelect").length > 0) {
        $(".disableSelect").prop("disabled", true);
    }

    $(document).on("change", ".allowOnCheck", function(e) {
        $(this).closest(".allowOnCheckedContainer").find(".disableUnchecked").prop("disabled", true);
        var elemId = $(this).attr("id");
        $(this).closest(".allowOnCheckedContainer").find("." + elemId).prop("disabled", false);
    });
    /*******************/


    /**************** default tabs ****************/

    if ($(".tabbs").length > 0) {
        var clsCounter = 1;
        $(".tabbs li").each(function() {
            $('.switcherButton', this).attr("data-tag", "tabb" + clsCounter);
            clsCounter++;
        });
        clsCounter = 1;
        $(".tabbs .list_tabb").each(function() {
            $(this).attr("id", "tabb" + clsCounter);
            clsCounter++;
        });

        $(document).on("click", ".tabbs .switcherButton", function(e) {
            e.preventDefault();
            if (!$(this).hasClass("activelink")) {
                $('.tabbs .switcherButton').removeClass('activelink');
                $(this).addClass('activelink');
                var tagid = $(this).attr('data-tag');
                $('.list_tabb').removeClass('active').addClass('hide');
                if ($(".tabbs").hasClass("animTab")) {
                    $('#' + tagid).addClass('active pulse').removeClass('hide');
                    setTimeout(function() {
                        $('#' + tagid).removeClass("pulse");
                    }, 220);
                } else {
                    $('#' + tagid).addClass('active').removeClass('hide');
                }
            }
        });

    }

    if ($(".tabsContainer").length > 0) {

        $(document).on("click", ".tabsBtn", function(e) {
            e.preventDefault();
            $(this).closest(".tabsContainer").find(".tabsBtn").removeClass('activelink');
            $(this).closest(".tabsContainer").find('.list_tabb').removeClass('active').addClass('hide');
            var elemHref = $(this).attr("href");
            $(this).addClass('activelink');
            $(this).closest(".tabsContainer").find(elemHref).addClass('active').removeClass('hide');
        });

    }

    /*********** default placeholder **********/

    if ($(".addPlaceHolder").length > 0) {

        $(".addPlaceHolder").each(function() {

            var palceParent = $(this).closest(".getPlaceHolder");
            var palceValue = $(".placeholderVal", palceParent).text();
            $(this).attr("placeholder", palceValue.trim());

        });

    }

    /************** Custom Select *******************/


    if ($(".customSelect").length > 0) {
        $(".customSelect").each(function() {
            var dropParent = $(this).closest(".customSelectParent");
            if (!(dropParent.length > 0)) {
                dropParent = $("body");
            }
            $(this).select2({
                width: '100%',
                dropdownParent: dropParent,
                // maximumInputLength: 50,
                minimumResultsForSearch: -1,
                language: {
                    noResults: function(params) {
                        return translatedLabels.noResultFound;
                    }
                }
            });
        });
    }


    /************** Custom Search **************/

    $(document).on('keyup', ".basicSearch", function() {
        var self = $(this);
        var parenElem = self.closest(".getSearched");
        var valueTyped = self.val().toLowerCase();

        /***** hide error div if no result *****/

        if ($(".noResultFound", parenElem).length > 0) {
            $(".noResultFound", parenElem).remove();
        }

        /***** if input has value *****/

        if (valueTyped != '') {

            /***** intially hide all elements in list *****/
            /***** if any element is active then also remove active status of that element *****/

            $(".filterParent", parenElem).hide();
            $(".filterParent", parenElem).removeClass("active");
            $(".innerSelectToggle", parenElem).removeClass("active");
            $(".filterChildParent", parenElem).hide();

            /***** If search is applied on simple element with no dropdown *****/

            if (!$(".hasDropDown", parenElem).length > 0) {

                $(".searchFilter", parenElem).each(function() {
                    var filteredValue = $(this).text().toLowerCase();
                    if (filteredValue.indexOf(valueTyped) != -1) {
                        $(this).closest(".filterParent").show();
                    } else {
                        $(this).closest(".filterParent").hide();
                    }

                });

            }

            /***** If search is applied dropdown element *****/
            else {
                $(".searchFilterParent", parenElem).each(function() {
                    var filteredValue = $(this).text().toLowerCase();
                    if (filteredValue.indexOf(valueTyped) != -1) {
                        $(this).closest(".filterParent").show();
                    } else {
                        $(this).closest(".filterParent").hide();
                    }

                });

                /***** if drop down child exists then also filter result from child *****/

                if ($(".searchFilterChild", parenElem).length > 0) {
                    $(".searchFilterChild", parenElem).each(function() {
                        var filteredValue = $(this).text().toLowerCase();
                        if (filteredValue.indexOf(valueTyped) != -1) {
                            $(this).closest(".filterParent").show();
                            $(this).closest(".filterChildParent").show();

                            /****** Active toggle behaviour if result is in dropdown *******/

                            $(this).closest(".filterParent:not(.active)").addClass("active");
                            $(this).closest(".filterParent.active").find(".innerSelectToggle").addClass("active");
                        }

                    });
                }

            }

            /******** Append Error if no result found *******/

            var visibleCount = $(".filterParent:visible", parenElem).length;
            if (visibleCount < 1) {
                if ($(".noResultFound", parenElem).length == 0) {
                    parenElem.append("<p class='noResultFound padding-tblr-15 text_align_center'>No Result Found</p>");
                    $(".filterParent", parenElem).hide();
                }
            }
        }

        /******* Reset default Behaviour *******/
        else {
            $(".filterParent", parenElem).show();
            $(".filterParent .filterParent", parenElem).hide();
            $(".filterChildParent", parenElem).hide();
            $(".filterParent.active", parenElem).removeClass("active");
            $(".filterParent.active", parenElem).find(".innerSelectToggle").removeClass("active");
        }
    });


    /************* Custom Search End **************/


    /************** Disabled *******************/

    if ($(".disabled").length > 0) {
        $(".disabled").each(function() {
            $(this).attr("disabled", "true");
        });
    }


    /******** Table toggle ***********/
    $(document).on("click", ".tableDropDown", function(e) {
        e.preventDefault();
        var tHref = $(this).attr("href");
        tHref = tHref.split("#")[1];
        console.log(tHref);
        $("." + tHref).stop().toggle();
        $(this).stop().toggleClass("active");
    });


    /*******   targetBlank  ********/

    if ($(".targetBlank").length > 0) {
        $(".targetBlank").each(function() {
            $(this).attr("target", "_blank");
        });
    }


    /************** View and PayBill *******************/

    $(document).on("submit", ".setCheckedCaIds", function(e) {
        var eelm = $(this);
        var getAllCaIds = eelm.find(".getCheckedCaIds .checkbox-custom:checked").map(function() {
            return this.value;
        }).get().join(',')
        eelm.find(".putCheckedCaIds").val(getAllCaIds);
    });

    if ($(".switchView").length > 0) {
        var selectAccounts = "",
            currentHtml = "";
        $(document).on("click", ".switchView", function(e) {

            //Store Reference to Self Variable
            var self = $(this);
            if (!self.hasClass("blocked")) {

                // Store View in variables

                var getViewsParent = self.closest(".viewsParent");
                var getVisible = getViewsParent.find(".activeView").attr("id");

                currentHtml = $("#" + getVisible).find(".selectDetail").html();

                var getHidden = getViewsParent.find(".hiddenView").attr("id");
                // Get Form
                var getForm = self.closest("form");
                // Get total ammount
                var totalAmmountValue = $(document).find(".checkFornext").attr("data-totalamount");

                if ($("#putTotalCount").length > 0) {
                    console.log("totalAmmountValue", totalAmmountValue);
                    $("#putTotalCount").val(totalAmmountValue);
                }

                // Get all selected inputs with parent element
                selectAccounts = $(":input[type='checkbox']:checked", getForm).map(function(_, elem) {
                    return $(elem).closest(".detailData");
                });

                $("#" + getHidden + " .selectDetail").empty();

                // Set all selected inputs to next view (pay bill view)
                if (selectAccounts.length > 0) {
                    var totalAccounts = selectAccounts.length;
                    for (var i = 0; i <= totalAccounts - 1; i++) {
                        var currentElement = selectAccounts[i];
                        if (!currentElement.hasClass("hide")) {
                            $("#" + getHidden + " .selectDetail").append(currentElement);
                            $("#" + getHidden + " .selectDetail input[type='checkbox']").prop("readonly", true);
                            $("#" + getHidden + " .selectDetail .select_checked p").removeClass("padding-lr-25");
                            $("#" + getHidden + " .selectDetail .select_checked p").addClass("padding-lr-5");
                            $("#" + getHidden + " .selectDetail .select_checked p.addGap").addClass("padding-lr-25");
                        }
                    }
                }

                //Get total amount
                var getTotalAmount = getViewsParent.find(".totalAmount h1").attr("data-totalamount");
                var noNegative = parseFloat(getTotalAmount);

                noNegative <= 0 ? noNegative = "0.00" : noNegative = getTotalAmount;

                noNegative = $.trim(noNegative);

                // var getTotalAmountWithLabel = getViewsParent.find(".totalAmount h1").attr("data-totalamount") + " KD";
                if (noNegative == "0.00") {
                    $("#" + getHidden + " .hideOnError ").hide();
                }
                //Set total amount
                // $("#" + getHidden + " .putTotal").val(getTotalAmount).prop("disabled", true);
                $("#" + getHidden + " .putTotal").val(noNegative).prop("disabled", false);

                if ($("#page_rechargeBill").length > 0) {
                    $("#" + getHidden + " .putTotal").val("0.00").prop("disabled", false);
                }

                // $("#" + getHidden + " .putTotal.baladiyaChargesInput").val(parseInt(getTotalAmount)).prop("disabled", false);
                // added as per QA

                $("#" + getHidden + " .editCharges").removeAttr("href");

                $(".cancelEditCharges").removeClass("hide");

                $("#" + getHidden + " .putDataInID").attr("id", noNegative);
                // $("#" + getHidden + " .putDataInID.baladiyaChargesInput").attr("id", parseInt(getTotalAmount));
                // $("#" + getHidden + " .putTotal").text(getTotalAmount);  

                // Change/Switch Views
                $("#" + getVisible).removeClass("activeView").addClass("hiddenView hide");
                $("#" + getHidden).removeClass("hiddenView hide").addClass("activeView pulse");

                // Remove Animated Class
                setTimeout(function() {
                    $("#" + getHidden).removeClass("pulse");
                }, 500);

                // Prevent form from submitting 
                e.preventDefault();
            }

            // Prevent form from submitting 
            e.preventDefault();

        });

        $(document).on("click", ".switchBackView", function(e) {
            console.log(selectAccounts);

            $(".showCompareVal").hide();
            $(".hideOnError").show();
            //Store Reference to Self Variable
            var self = $(this);

            if (!self.hasClass("blocked")) {

                // Store View in variables
                var getViewsParent = self.closest(".viewsParent");
                var getVisible = getViewsParent.find(".activeView").attr("id");
                var getHidden = getViewsParent.find(".hiddenView").attr("id");
                // Change/Switch Views
                $("#" + getHidden).find(".selectDetail").html(currentHtml);
                currentHtml = "";
                $("#" + getVisible).removeClass("activeView").addClass("hiddenView hide");
                $("#" + getHidden).removeClass("hiddenView hide").addClass("activeView pulse");

                // Remove Animated Class
                setTimeout(function() {
                    $("#" + getHidden).removeClass("pulse");
                }, 500);
                // Prevent form from submitting 
                e.preventDefault();
            }

        });

    }



    /*****************/

    $(document).on("click", " html, body ", function(e) {
        $(".mMenuitem > a").removeClass("active");
        $(".jqTopNav").removeClass("clickedToOpen");
        $(".mMenuitem").removeClass("low-border");
        $(".jqTopNav").slideUp();
        $(".mobileToggleContent").removeClass("active");
        $(".activeToggleValue").removeClass("active");
        $(".selectAbleToggles").slideUp();
    });

    $(document).on("click", " .jqTopNav a", function(e) {
        $(".mMenuitem > a").removeClass("active");
        $(".jqTopNav").removeClass("clickedToOpen");
        $(".mMenuitem").removeClass("low-border");
        $(".jqTopNav").fadeOut('fast');
    });

    $(document).on("click", ".mMenuitem * ,.currentToggle", function(e) {
        e.stopPropagation();
    });

    /*****************/

    /************** Custom Toggle *******************/

    $(document).on("click", ".activeToggleValue", function() {
        var elem = $(this);
        elem.stop().toggleClass("active");
        elem.next().stop().slideToggle();
    });

    $(document).on("click", ".selectAbleToggles .selectToggleValue", function() {
        var elem = $(this);
        var accountTitle = $(".accountId", elem).html();
        var accountAddress = $(".accountAddress", elem).text();
        $(".activeToggleValue .accountId").html(accountTitle);
        $(".activeToggleValue .accountAddress").text(accountAddress);
        $(".activeToggleValue").removeClass("active");
        $(".selectAbleToggles").slideUp();
        $(".selectAbleToggles").find(".selectedColor").removeClass("selectedColor");
        elem.addClass("selectedColor");
    });

    $(document).on("click", ".edit-btn", function() {
        var elem = $(this);
        $(".bill-amount").removeAttr("disabled");
        $(".cancel-btn").removeClass("hide");
        elem.hide();
    });
    $(document).on("click", ".cancel-btn", function() {
        var elem = $(this);
        $(".bill-amount").attr("disabled", "true");
        $(".edit-btn").show();
        elem.addClass("hide");
        return false;
    });



    /******  Other charges max allowed values  *******/
    $(document).on("click", ".editCharges", function(e) {
        e.preventDefault();
        // $(this).closest(".otherChargesEditor").find(".allowToEdit").prop("disabled", false);
        // $(this).closest(".otherChargesEditor").find(".cancelEditCharges").removeClass("hide");
    });

    $(document).on("click", ".cancelEditCharges", function(e) {
        e.preventDefault();
        // $(this).closest(".otherChargesEditor").find(".allowToEdit").prop("disabled", true);
        // $(this).closest(".otherChargesEditor").find(".cancelEditCharges").addClass("hide");
        var valtoPut = $(this).closest(".otherChargesEditor").find(".allowToEdit").attr("id");
        $(this).closest(".otherChargesEditor").find(".allowToEdit").val(valtoPut);
        $(".showCompareVal").hide();
        if (parseFloat(valtoPut) > 0) {
            console.log("true")
            $(".hideOnError").show();
        } else {
            console.log("false");
            $(".hideOnError").hide();
        }
        // matchMaxVal();
    });


    $(document).on("keyup", ".matchMaxVal", function(e) {
        e.preventDefault();
        $(".showCompareVal").hide();
        $(".hideOnError").show();
        if ($(this).hasClass("noAdvancePayment")) {
            matchMaxVal();
        }
        if ($(this).val() == "" || parseFloat($(this).val()) == 0) {
            $(".hideOnError").hide();
        }

    });


    function matchMaxVal() {
        var totalToMatch = $(".totalAmoutCalc").html();
        totalToMatch = parseFloat(totalToMatch);
        var matchMaxVal = 0;
        $(".matchMaxVal").each(function(e) {
            var itsz = parseFloat($(this).val());
            matchMaxVal += itsz;
        });
        if (matchMaxVal > totalToMatch) {
            $(".showCompareVal").show();
            $(".hideOnError").hide();
        }
    }

    $(document).on("change", ".paymentTypeSwitcher", function(e) {
        $(".hideOnError").hide();
        // $("#voucherValue, #putTotalCount ,.clearONVoucher").val("");
        // $("#voucherValue, #putTotalCount ,.clearONVoucher").val("");
        if ($(this).val() == "voucher") {
            var getVoucherAction = $(".getVoucherAction").attr("href");
            $(".changeActionOnSelect").attr("action", getVoucherAction);
            $("#voucherValue").prop('disabled', false);

            $("#voucherValue").val() == "" || 0 ? $(".hideOnError").hide() : $(".hideOnError").show();

            $("#putTotalCount ,.clearONVoucher").prop('disabled', true);
        } else {
            var getKnetAction = $(".getKnetAction").attr("href");
            $(".changeActionOnSelect").attr("action", getKnetAction);
            $("#voucherValue").prop('disabled', true);
            $("#putTotalCount, .clearONVoucher").prop('disabled', false);
            if ($("#putTotalCount").val() == "") {
                $(".hideOnError").hide()
            } else if (parseFloat($("#putTotalCount").val()) == 0) {
                $(".hideOnError").hide()
            } else {
                $(".hideOnError").show()
            }
        }
    });

    /*****************************/


    /************** Equal Col Height ****************/


    // if($('.getMaxCol').length > 0) {
    //     $('.getMaxCol').each(function(){
    //         var max = -1;
    //         $(this).find('.colEqHeight').each(function() {
    //         var h = $(this).height(); 
    //         max = h > max ? h : max;
    //         });
    //     $('.colEqHeight',$(this)).height(max);
    //     });
    // }


    /************** Click Actions *******************/

    if ($('.fileupload_btn').length > 0) {

        $('.fileupload_btn').bind("click", function() {
            var uploadBtn = $(this).closest(".uploadParent");
            $('.file_btn', uploadBtn).click();
        });

    }


    /************* Disable profile form  **************/

    if ($("#page_contactInfo").length > 0) {

        var loggedInLevel = $("#getLoggedInLevel").val() || "";
        console.log(loggedInLevel);
        if (loggedInLevel != "") {
            if (loggedInLevel != "14") {
                var parentForm = $("#getLoggedInLevel").closest("form");
                $(":input", parentForm).each(function() {
                    $(this).prop("disabled", true);
                });
                $(".multiNumberFiled", parentForm).addClass("disabled-btn");
            }
        }

    }



    /************* Disable profile end  **************/


    /************* Add number field **************/

    if ($(".multiNumberFiled").length > 0) {
        var numberClass = 0;
        var counter = 0;

        var emailClass = 0;
        var emailCounter = 0;

        function inputlengthcheck() {
            $(".multiNumberParent").each(function(e) {
                var checkInpLength = $(this).find("input[type='text']").length;
                console.log(checkInpLength);
                if (checkInpLength == 2) {
                    $(this).find(".multiNumberFiled").hide();
                } else {
                    $(this).find(".multiNumberFiled").show();
                }
            });
        }

        inputlengthcheck();

        var getMobileFieldLength = "";
        if ($("#getMobileFieldLength").length > 0) {
            getMobileFieldLength = $("#getMobileFieldLength").val();
        }

        $(document).on("click", ".multiNumberFiled", function() {
            if (!$(this).hasClass("disabled-btn")) {
                var multiNumberFile = "";
                if ($(this).hasClass("secondaryEmail")) {
                    emailClass = emailClass + 2;
                    if (emailCounter <= 2) {
                        multiNumberFile = $(this).closest(".multiNumberParent");
                        $(multiNumberFile).append(
                            '<div class="form_field relative margin-b-5 deleteAble validation_message_container number_' + emailClass + '">' +
                            '<input type="text" maxlength="' + $("#getEmailLength").val() + '" name="addsecondaryEmailId_' + emailClass + '" value="" class="newInputAdded requiredEmail padding-r-40 input_with_icon">' +
                            '<a id="Secondary Email" class="del-btn"></a> <span class="validation_message">' + $("#emailRequiredlabel").val() + '</span></div>'
                        );
                        $(".number_" + emailClass + " > input").val('').removeAttr("disabled");
                    }

                } else {
                    numberClass = numberClass + 2;
                    if (counter <= 2) {
                        multiNumberFile = $(this).closest(".multiNumberParent");

                        if ($(":input[type=text]", multiNumberFile).length < 2) {
                            $(multiNumberFile).append(
                                '<div class="form_field relative margin-b-5 deleteAble validation_message_container number_' + numberClass + '">' +
                                '<input type="text" maxlength="' + getMobileFieldLength + '"  name="addsecondaryMobileNumber_' + numberClass + '" value=" " class="newInputAdded numberOnlyInput text_align_left emptyCheck validateMinMobile numberOnlyInput number_initials_inp">' +
                                '<a class="del-btn"></a>  <span class="number_initials ltr"> +965 </span> <span class="validation_message">' + $("#mobileRequiredlabel").val() + '</span> <span class="onlyNumberMessage">Only Digits are allowed</span> </div>'
                            );
                            $(".number_" + numberClass + " > input").val('').removeAttr("disabled");
                        }
                    }
                }
                console.log($(".multiNumberParent :input[type=text]").length);
                inputlengthcheck();
            }
        });

        $(document).on('click', '.del-btn', function() {
            if (!$(this).hasClass("showInfoBox")) {
                if ($(this).closest(".deleteAble").length > 0) {
                    var currentName = $(this).siblings(".newInputAdded").attr("name");
                    var deleteName = "";
                    if (currentName.startsWith("updated_add")) {
                        deleteName = currentName.replace("updated_add", "deleted_");
                    } else if (currentName.startsWith("updated_")) {
                        deleteName = currentName.replace("updated_", "deleted_");

                    } else if (currentName.startsWith("add")) {
                        deleteName = currentName.replace("add", "deleted_");
                    } else {
                        deleteName = "deleted_" + currentName;
                    }
                    $(this).closest(".validation_message_container").hide();
                    $(this).siblings(".newInputAdded").attr("type", "hidden");
                    $(this).siblings(".newInputAdded").attr("name", deleteName);
                    $(this).siblings(".del-btn").remove();
                    $(this).siblings(".newInputAdded").removeClass("emptyCheck");
                    $(this).siblings(".newInputAdded").removeClass("requiredEmail");
                    $(this).siblings(".validation_message").remove();
                    $(this).siblings(".number_initials").remove();
                    $(this).remove();
                    inputlengthcheck();
                }
            } else {
                $('.del-btn').removeClass("checkConfirmation");
                $(this).addClass("checkConfirmation");
                var getMessageDelete = $("#getMessageDelete").val();
                getMessageDelete = getMessageDelete.replace("#secondaryInfoType", $(this).attr("id") + ' ?');
                $("#putMessageDelete").html(getMessageDelete);
            }
        });

        $(document).on('click', "#removeSecR", function() {
            var elemR = $(".checkConfirmation");
            if (elemR.closest(".deleteAble").length > 0) {
                var currentName = elemR.siblings(".s_mobileno").attr("name");
                var deleteName = "";
                if (currentName.startsWith("updated_add")) {
                    deleteName = currentName.replace("updated_add", "deleted_");
                } else if (currentName.startsWith("updated_")) {
                    deleteName = currentName.replace("updated_", "deleted_");

                } else if (currentName.startsWith("add")) {
                    deleteName = currentName.replace("add", "deleted_");
                } else {
                    deleteName = "deleted_" + currentName;
                }
                elemR.siblings(".newInputAdded").attr("type", "hidden");
                elemR.siblings(".newInputAdded").attr("name", deleteName);
                elemR.closest(".validation_message_container").hide();
                elemR.siblings(".del-btn").remove();
                elemR.siblings(".newInputAdded").removeClass("emptyCheck");
                elemR.siblings(".newInputAdded").removeClass("requiredEmail");
                elemR.siblings(".number_initials").remove();
                elemR.siblings(".validation_message").remove();
                elemR.remove();
                inputlengthcheck();
            }
        });


        $(document).on('change', '.s_mobileno', function() {
            if ($(this).closest(".deleteAble").length > 0) {
                var currentName = "updated_" + $(this).attr("name");
                $(this).attr("name", currentName);
            }
        });
    }

    /****************** Collapse Toggle ******************/

    $(document).on("click", ".mCollpaseClick", function() {
        $(this).toggleClass("collapsed");
        $(this).siblings(".mCollapseContent").toggleClass("hide");
        $(this).siblings(".CollapseContent").toggleClass("hide");
    });

    /****************** Collapse Toggle ******************/

    $(document).on("keyup", ".nameChange", function() {
        var elemval = $(this).val();
        $(this).closest("div").find(".nameChangeContainer").attr("name", elemval);
    });

    /************ Custom Scrollbar   *************/



    var is_mobile = ((/Mobile|Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ? true : false);


    if (!is_mobile) {
        if ($(".customScroll").length > 0) {
            $(".customScroll").mCustomScrollbar({
                theme: "dark",
                snapOffset: 2,
                autoHideScrollbar: false,
                alwaysShowScrollbar: 1,
            });
        }
        if ($(".mCustomScrollbar").length > 0) {
            $(".mCustomScrollbar").mCustomScrollbar("destroy");
            $(".mCustomScrollbar").mCustomScrollbar({
                theme: "dark",
                snapOffset: 2,
                autoHideScrollbar: false,
                alwaysShowScrollbar: 1
            });
        }
    }

    if (is_mobile) {
        if ($(".mCustomScrollbar").length > 0) {
            $(".mCustomScrollbar").mCustomScrollbar("destroy");
        }
    }
    /************ Date Picker   *************/

    if ($(".datepicker").length > 0) {
        $(".datepicker").datepicker();
    }


    if ($(".mReading input[type=text]").length > 0) {
        var charLimit = 1;
        $(".mReading input[type=text]").keydown(function(e) {
            var keys = [8, 9, /*16, 17, 18,*/ 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];

            if (e.which == 8 && this.value.length == 0) {
                $(this).prev('.mReading input[type=text]').focus();
            } else if ($.inArray(e.which, keys) >= 0) {
                return true;
            } else if (this.value.length >= charLimit) {
                $(this).next('.mReading input[type=text]').focus();
                return false;
            } else if (e.shiftKey || e.which <= 48 || e.which >= 58) {
                return false;
            }
        }).keyup(function() {
            if (this.value.length >= charLimit) {
                $(this).next('.mReading input[type=text]').focus();
                return false;
            }
        });
    }

    /** updates on integration  ***/

    /*** select box change based tabs ***/

    $(document).on("change", ".tabs_switcher", function(e) {
        e.preventDefault();
        var switchToContent = $(this).val();
        var parent = $(this).closest(".select_based_tabs");
        parent.find(".tabs_content").addClass("hide");
        parent.find("#" + switchToContent).removeClass("hide");
        if (switchToContent == "" || switchToContent == "all") {
            parent.find(".tabs_content:not('.no_value_available')").removeClass("hide");
        }
    });
    /****** Top Menu in header *********/
    $(document).on("click", ".navigationToggleIcon", function(e) {
        $(this).stop().toggleClass("open");
        $(".module_mMainMenu").stop().toggleClass("active");
    });

    /****** footer Toggle in mobile *********/
    $(document).on("click", ".mobileToggle", function(e) {
        e.stopPropagation();
        var elem = $(this);
        var innerElem = elem.closest(".mobileToggleWrap").find(".mobileToggleContent");
        if (innerElem.hasClass("active")) {
            innerElem.removeClass("active");
        } else {
            $(".mobileToggleContent").removeClass("active");
            innerElem.addClass("active");
        }
    });


    function responsiveFooter() {
        if ($(window).width() > 590) {
            $(".mobileToggleWrap").addClass("active");
        } else {
            $(".mobileToggleWrap").removeClass("active");
        }
    }

    if ($(".mobileToggleContent").length > 0) {
        responsiveFooter();
    }

    function navigationAppender() {
        $(".mMenuitem").each(function() {
            var elem = $(this).attr("id");
            var elemAppend = $("." + elem).clone();
            elemAppend.removeClass("hide").addClass("jqTopNav");
            $(this).append(elemAppend);
        });
    }

    if ($(".mMenuitem").length > 0) {
        navigationAppender();
    }

    /********* form validation ************/
    $(document).on("keypress", ".numberOnlyInput", function(evt) {
        // var str = $(this).val();
        var patt1 = /[0-9]/g;
        // var result = str.match(patt1);
        // var evtobj = window.event ? event : evt
        var keyCode = "";
        // keyCode = evt.keyCode;
        if (window.event) {
            keyCode = evt.keyCode;
        } else {
            keyCode = evt.which;
        }
        var inp = String.fromCharCode(keyCode);
        var onlyNumberMessage = $(this).closest(".validation_message_container").find(".onlyNumberMessage").length;
        if (!patt1.test(inp) && keyCode != "13" && keyCode != "8" && keyCode != "0") {
            console.log(keyCode);
            evt.preventDefault();
            $(this).addClass("errorHere");
            console.log(onlyNumberMessage);
            if (onlyNumberMessage > 0) {
                $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeIn();
                $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
            } else {
                $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeOut()
                $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
            }
        } else {
            $(this).removeClass("errorHere");
            $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
            $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeOut();
        }
    });

    var passwordValidator = /^([0-9]+)$/;
    /********* form validation passwordValidator************/
    $(document).on("keypress", ".validatePassFeild", function(evt) {
        // var str = $(this).val();
        // var patt1 = /[0-9]/g;
        // var result = str.match(patt1);
        // var evtobj = window.event ? event : evt
        var keyCode = "";
        // keyCode = evt.keyCode;
        if (window.event) {
            keyCode = evt.keyCode;
        } else {
            keyCode = evt.which;
        }
        var inp = String.fromCharCode(keyCode);
        var onlyNumberMessage = $(this).closest(".validation_message_container").find(".onlyNumberMessage").length;
        if (!passwordValidator.test(inp) && keyCode != "13" && keyCode != "8" && keyCode != "0") {
            console.log(keyCode);
            evt.preventDefault();
            $(this).addClass("errorHere");
            console.log(onlyNumberMessage);
            if (onlyNumberMessage > 0) {
                $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeIn();
                $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
            } else {
                $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeOut()
                $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
            }
        } else {
            $(this).removeClass("errorHere");
            $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
            $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeOut();
        }
    });

    $(document).on("keypress", ".decimalOnly", function(evt) {

        var text = $(this).val();
        // var str = $(this).val();
        var patt1 = /^\d*\.?\d*$/;
        // var result = str.match(patt1);
        // var evtobj = window.event ? event : evt
        var keyCode;
        // keyCode = evt.keyCode;
        if (window.event) {
            keyCode = evt.keyCode;
        } else {
            keyCode = evt.which;
        }


        var inp = String.fromCharCode(keyCode);
        /* 13 to allwo enter key*/
        if (!patt1.test(inp) && keyCode != "13" && keyCode != "8" && keyCode != "32") {
            evt.preventDefault();
            $(this).addClass("errorHere");
            $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
        } else {
            $(this).removeClass("errorHere");
            $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
        }
        if ((text.indexOf('.') != -1) && (keyCode == "46" || keyCode == "0")) {
            return false;
        }
        if ((text.indexOf('.') != -1) &&
            (text.substring(text.indexOf('.')).length > 3) &&
            (keyCode.which != 0 && keyCode.which != 8) &&
            ($(this)[0].selectionStart >= text.length - 3)) {
            evt.preventDefault();
        }
    });

    $(document).on("keypress", ".disableSpecialChar", function(evt) {
        var patt1 = /[^a-zA-Z0-9\u0621-\u064A\u0660-\u0669 ]+/i;
        var keyCode;
        // keyCode = evt.keyCode;
        if (window.event) {
            keyCode = evt.keyCode;
        } else {
            keyCode = evt.which;
        }
        var inp = String.fromCharCode(keyCode);
        if (patt1.test(inp) && keyCode != "13" && keyCode != "8" && keyCode != "32") {
            evt.preventDefault();
            $(this).addClass("errorHere");
            $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
        } else {
            $(this).removeClass("errorHere");
            $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
        }

    });


    /*upload files validation*/
    function openFile(file) {
        var extension = file.substr((file.lastIndexOf('.') + 1));
        switch (extension) {
            case 'jpg':
            case 'png':
                // case 'gif':
            case 'pdf':
            case 'doc':
                return ('valid');
                break;
            default:
                return ('error');
        }
    };

    function validateImageFn(file) {
        var extension = file.substr((file.lastIndexOf('.') + 1));
        switch (extension) {
            case 'jpg':
            case 'png':
            case 'gif':
                return ('valid');
                break;
            default:
                return ('error');
        }
    };

    // var emailFilter = /^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var sameEmailCheckVal = $(".sameEmailCheck").val();
    /****test form validation *****/
    $(document).on("submit", "form", function(e) {
        var thisForm = $(this);
        var allEmptyCheck = thisForm.find(".emptyCheck");
        var onlyNumber = thisForm.find(".onlyNumber");
        var notRequiredEmail = thisForm.find(".notRequiredEmail");
        var requiredEmail = thisForm.find(".requiredEmail");
        var sameEmailCheck = thisForm.find(".sameEmailCheck");
        var fileinput = thisForm.find(".validateFile");
        var validImg = thisForm.find(".validateImage");
        var newpass = thisForm.find(".npswd");
        var confirmpass = thisForm.find(".cpswd");
        var civilID = thisForm.find(".civilIDvalidation");
        var numberOnlyInput = thisForm.find(".numberOnlyInput");
        var decimalOnly = thisForm.find(".decimalOnly");
        var minPassLength = thisForm.find(".minPassLength");
        var maxPassLength = thisForm.find(".maxPassLength");
        var putMinConfVal = thisForm.find(".putMinConfVal");
        var validateMin = thisForm.find(".validateMin");
        var requiredSelect = thisForm.find("select.emptyCheck") || thisForm.find("select.requiredSelect");
        var noFraction = thisForm.find(".baladiyaChargesInput");
        var validateMinMobile = thisForm.find(".validateMinMobile");
        var validatePassFeild = thisForm.find(".validatePassFeild");

        // var requiredSelect = thisForm.find("select.requiredSelect");

        if (sameEmailCheck.length > 0) {
            sameEmailCheck.each(function() {
                var val = $(this).val();
                if (val != sameEmailCheckVal) {
                    $(this).attr("name", "updated_primaryEmail");
                }
            });
        }

        $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeOut();
        /*empty values check*/
        if (allEmptyCheck.length > 0) {
            allEmptyCheck.each(function() {
                var val = $(this).val();
                if (!$(this).prop("disabled")) {
                    if ($.trim(val) == "" && !$(this).hasClass("validateFile")) {
                        e.preventDefault();
                        $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                        $(this).addClass("errorHere");
                    } else {
                        $(this).removeClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                    }
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }
        /***** required select ******/
        if (requiredSelect.length > 0) {
            requiredSelect.each(function() {
                var val = $(this).val();
                if (!$(this).prop("disabled")) {
                    if ($.trim(val) == "" || $.trim(val) == "null" || $.trim(val) == "0") {
                        e.preventDefault();
                        $(this).addClass("errorHere");
                        $(this).closest(".validation_message_container").find(".errorMessage").fadeIn();
                        $(this).closest(".validation_message_container").find(".select2-selection").addClass("errorHere");
                    } else {
                        $(this).removeClass("errorHere");
                        $(this).closest(".validation_message_container").find(".select2-selection").removeClass("errorHere");
                        $(this).closest(".validation_message_container").find(".errorMessage").fadeOut();
                    }
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".select2-selection").removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".errorMessage").fadeOut();
                }

                $(".select2-container").removeClass("errorHere");

            });
        }


        /***** number only check ******/
        if (onlyNumber.length > 0) {
            onlyNumber.each(function() {
                var val = $(this).val();
                if (!$(this).prop("disabled")) {
                    if (val.length < 9 || $.trim(val) == "" || $.trim(val) == "null") {
                        e.preventDefault();
                        $(this).addClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    } else {
                        $(this).removeClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                    }
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }

        if (minPassLength.length > 0) {
            minPassLength.each(function() {
                var val = $(this).val();
                if (!$(this).prop("disabled")) {
                    if (val.length < $("#getMinPasswordLength").val() || $.trim(val) == "") {
                        e.preventDefault();
                        $(this).addClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    } else {
                        $(this).removeClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                    }
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }



        if (maxPassLength.length > 0) {
            maxPassLength.each(function() {
                var val = $(this).val();
                if (!$(this).prop("disabled")) {
                    if (val.length > $("#getMaxPasswordLength").val() || $.trim(val) == "") {
                        e.preventDefault();
                        $(this).addClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    } else {
                        $(this).removeClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                    }
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }



        /*** when email can be empty but not ivalid check  ***/
        if (notRequiredEmail.length > 0) {
            notRequiredEmail.each(function() {
                if (!($.trim($(this).val()) == "") && !(emailFilter.test($(this).val()))) {
                    $(this).addClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    e.preventDefault();
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }

        /*** when email is requiredcheck  ***/
        if (requiredEmail.length > 0) {
            requiredEmail.each(function() {
                if ($.trim($(this).val()) == "" || !(emailFilter.test($(this).val()))) {
                    $(this).addClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    e.preventDefault();
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }
        /***** required select ******/
        if (requiredSelect.length > 0) {
            requiredSelect.each(function() {
                var val = $(this).val();
                // console.log(val);
                if (!$(this).prop("disabled")) {
                    if ($.trim(val) == "" || $.trim(val) == "null" || $.trim(val) == "0") {
                        e.preventDefault();
                        $(this).addClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                        $(this).parent().find(".select2-container").addClass("errorHere");
                    } else {
                        $(this).removeClass("errorHere");
                        $(this).parent().find(".select2-container").removeClass("errorHere");
                        $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                    }
                } else {
                    $(this).removeClass("errorHere");
                    $(this).parent().find(".select2-container").removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }
        /*file validation*/
        if (fileinput.length > 0) {
            fileinput.each(function() {
                var fileValidValue = $(this).val();
                var validFile = openFile(fileValidValue);
                if (validFile == "error") {
                    e.preventDefault();
                    $(this).addClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }
        /*file validation*/
        if (validImg.length > 0) {
            validImg.each(function() {
                var fileValidValue = $(this).val();
                var validFile = validateImageFn(fileValidValue);
                if ($.trim($(this).val()) == "" || validFile == "error") {
                    e.preventDefault();
                    $(this).addClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                } else {
                    $(this).removeClass("errorHere");
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
            });
        }

        /*password validator*/

        if (newpass.length > 0) {
            newpass.each(function() {
                var password = $(this).val();

                if (password.length < 6) {
                    e.preventDefault();
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                } else {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                }
                if (password.match(passwordValidator)) {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
                } else {
                    e.preventDefault();
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                }
            });
        }

        if (confirmpass.length > 0) {
            confirmpass.each(function() {
                if ($('.cpswd').val() == $('.npswd').val()) {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".error-msg").removeClass('validation_message').addClass('valid');
                } else {
                    e.preventDefault();
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".error-msg").removeClass('valid').addClass('validation_message').fadeIn();
                }

            });
        }

        if (civilID.length > 0) {
            civilID.each(function() {
                var civilid = $(this).val();
                if (civilid.length < 6 || civilid.length > 60) {
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    e.preventDefault();
                } else {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".validation_message").addClass('valid');
                }
            });
        }

        if (numberOnlyInput.length > 0) {
            numberOnlyInput.each(function() {
                var civilid = $(this).val();
                if (isNaN(civilid)) {
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    e.preventDefault();
                } else {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".validation_message").addClass('valid');
                }
            });
        }

        if (validatePassFeild.length > 0) {
            validatePassFeild.each(function() {
                var pasVal = $(this).val();
                if (!pasVal.match(passwordValidator)) {
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    e.preventDefault();
                } else {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".validation_message").addClass('valid');
                }
            });
        }

        if (noFraction.length > 0) {
            if (initValidate.nonDecimal(noFraction)) {
                noFraction.removeClass("errorHere");
                $(".fractionNotAllowedError").fadeOut().addClass("hide");
            } else {
                noFraction.addClass("errorHere");
                $(".fractionNotAllowedError").fadeIn().removeClass("hide");
                e.preventDefault();
            }
        }

        if (decimalOnly.length > 0) {
            decimalOnly.each(function() {
                if (!$(this).is(":disabled")) {
                    var elemVal = $.trim($(this).val());
                    var patt1 = /^\d*\.?\d*$/;
                    if (!patt1.test(elemVal)) {
                        $(this).removeClass('valid').addClass('errorHere');
                        $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                        e.preventDefault();
                    } else {
                        $(this).removeClass('errorHere').addClass('valid');
                        $(this).closest(".validation_message_container").find(".validation_message").addClass('valid');
                    }
                }
            });
        }


        if (putMinConfVal.length > 0) {
            putMinConfVal.each(function() {
                var itsid = $(this).attr("id");
                var vzl = $(this).val();
                var getName = itsid.split("_");
                $("input[name='" + getName[1] + "']").attr("data-minLen", vzl);
            });
        }


        if (validateMin.length > 0) {
            validateMin.each(function() {
                var validateMin = $(this).val();
                var minval = $(this).attr("data-minLen") || 1;

                if (validateMin.length < minval) {
                    console.log("min length is ", minval);
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    e.preventDefault();
                } else {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".validation_message").addClass('valid');
                }

            });
        }

        if (validateMinMobile.length > 0) {
            validateMinMobile.each(function() {
                var validateMinM = $(this).val();
                var minvalM = 8;
                if (validateMinM.length < minvalM) {
                    console.log("min length is ", minvalM);
                    $(this).removeClass('valid').addClass('errorHere');
                    $(this).closest(".validation_message_container").find(".validation_message").fadeIn();
                    e.preventDefault();
                } else {
                    $(this).removeClass('errorHere').addClass('valid');
                    $(this).closest(".validation_message_container").find(".validation_message").addClass('valid');
                }
            });
        }


    });


    $(document).on("submit", "form.changePasswordForm", function(e) {
        var thisForm = $(this);
        var parent = $(this).closest(".passwordCheckContainer");
        var inputPass = thisForm.find(".comparePass");
        var inputOld = thisForm.find(".oldPassword");
        parent.find(".errorMessage").fadeOut();
        thisForm.removeClass("errorContainer");
        inputPass.removeClass("errorHere");
        var pwd1 = thisForm.find(".pwd1").val();
        var pwd2 = thisForm.find(".pwd2").val();
        var oldpass = inputOld.val();
        if (inputOld.length > 0 && $.trim(oldpass) == "") {
            thisForm.addClass("errorContainer");
            inputOld.addClass("errorHere");
            parent.find(".error_1").fadeIn();
            console.log("Old password is empty");
            return false;
        }
        if ($.trim(pwd1) == "") {
            thisForm.addClass("errorContainer");
            inputPass.addClass("errorHere");
            console.log("new password is empty");
            parent.find(".error_2").fadeIn();
            return false;
        }
        if (pwd1.length < $("#getMinPasswordLength").val() || pwd1.length > $("#getMaxPasswordLength").val()) {
            thisForm.addClass("errorContainer");
            inputPass.addClass("errorHere");
            parent.find(".error_2").fadeIn();
            console.log("password less than 8");
            return false;
        }
        //  var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[0-9])(?=.*[!@?#\$%\^&\*]))|((?=.*[A-Z])(?=.*[0-9])))");
        // var mediumRegex = /^(0|[1-9][0-9]*)$/;
        // var mediumRegex = /^\d+$/;

        if (!passwordValidator.test(pwd1)) {
            thisForm.addClass("errorContainer");
            parent.find(".error_3").fadeIn();
            inputPass.addClass("errorHere");
            return false;
        }
        if (thisForm.find(".pwd2").length > 0) {
            if (pwd1 !== pwd2) {
                thisForm.addClass("errorContainer");
                console.log("password miss match");
                inputPass.addClass("errorHere");
                parent.find(".error_4").fadeIn();
                return false;
            }
        }
    });



    /****** on focus remove error ******/
    $(document).on("focus", "input , textarea", function() {
        if ($(this).hasClass("errorHere")) {
            $(this).removeClass("errorHere");
            $(this).closest(".validation_message_container").find(".errorMsg").addClass("hideIt");
            $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
            $(this).closest(".validation_message_container").find(".onlyNumberMessage").fadeOut();
        }
    });

    $(document).on("change", "select", function() {
        if ($(this).hasClass("errorHere")) {
            $(this).removeClass("errorHere");
            $(this).closest(".validation_message_container").find(".validation_message").addClass("hide");
            $(this).closest(".validation_message_container").find(".validation_message").fadeOut();
            $(this).closest(".validation_message_container").find(".select2-selection").removeClass("errorHere");
        }
    });

    /*************************************************************************/

    /*******login form **********/
    $(document).on("change", ".TypeSelect", function() {
        var tabId = $(this).closest(".list_tabb").attr('id');
        var itsVal = $(this).find("option:selected").text();

        var inputUserIdentifier = $(this).closest("form").find("input[name='useridentifier']");
        var inputPrimaryId = $(this).closest("form").find("input[name='primaryId']");

        var caidlength = $("#loginidsLengths input[name=caIdlength]").val();
        var premiseidlength = $("#loginidsLengths input[name=premiseIdlength]").val();
        var meteridlength = $("#loginidsLengths input[name=meterIdlength]").val();
        var passwlength = $("#loginidsLengths input[name=passwordLength]").val();
        var pBpIdlength = $("#loginidsLengths input[name=pBpIdLength]").val();
        var pCcaIdlength = $("#loginidsLengths input[name=pCcaIdLength]").val();
        var pCaIdlength = $("#loginidsLengths input[name=pCaIdLength]").val();

        if (tabId != "tabb2") {
            inputUserIdentifier.attr("placeholder", itsVal);
            inputUserIdentifier.val("");
            $("#putValidationLogin").text(itsVal);

            $("#putPlaceHolderIcon").removeClass("caIdPlaceholder meterPlaceholder passPlaceholder");
            if ($.trim($(this).val()) == "1") {
                inputUserIdentifier.attr("maxlength", caidlength);
                inputUserIdentifier.attr("type", "text");
                $("#putPlaceHolderIcon").addClass("caIdPlaceholder");
                inputUserIdentifier.removeClass("validatePassFeild").addClass("numberOnlyInput");
            }
            if ($.trim($(this).val()) == "2") {
                inputUserIdentifier.attr("maxlength", premiseidlength);
                inputUserIdentifier.attr("type", "text");
                $("#putPlaceHolderIcon").addClass("caIdPlaceholder");
                inputUserIdentifier.removeClass("validatePassFeild").addClass("numberOnlyInput");
            }
            if ($.trim($(this).val()) == "3") {
                inputUserIdentifier.attr("maxlength", meteridlength);
                inputUserIdentifier.attr("type", "text");
                inputUserIdentifier.removeClass("validatePassFeild").addClass("numberOnlyInput");
                $("#putPlaceHolderIcon").addClass("meterPlaceholder");
            }
            if ($.trim($(this).val()) == "4") {
                $("#showPasswordLogin").removeClass("hide");
                inputUserIdentifier.attr("maxlength", passwlength);
                inputUserIdentifier.attr("type", "password");
                inputUserIdentifier.removeClass("numberOnlyInput").addClass("validatePassFeild");
                $("#putPlaceHolderIcon").addClass("passPlaceholder");
            } else {
                $("#showPasswordLogin").addClass("hide")
            }
        } else {
            inputPrimaryId.attr("placeholder", itsVal);
            inputPrimaryId.val("");
            $(".putValidationPublicLogin").text(itsVal);
            if ($.trim($(this).val()) == "1") {
                inputPrimaryId.attr("maxlength", pBpIdlength);
                inputPrimaryId.attr("type", "text");

            }
            if ($.trim($(this).val()) == "2") {
                inputPrimaryId.attr("maxlength", pCcaIdlength);
                inputPrimaryId.attr("type", "text");

            }
            if ($.trim($(this).val()) == "3") {
                inputPrimaryId.attr("maxlength", pCaIdlength);
                inputPrimaryId.attr("type", "text");
            }
        }

    });

    $(document).on("click", ".infoBoxClose", function(e) {
        e.preventDefault();
        console.log("clicked");
        $(this).closest(".info_container").removeClass("active");
        $(".page_mwrapper").removeClass("show_overlay");
    });

    $(document).on("click", ".showInfoBox", function(e) {
        e.preventDefault();
        var elemRef = $(this).attr("href");
        $(elemRef).addClass("active");
        $(".page_mwrapper").addClass("show_overlay");
    });

    $(document).on("click", ".bpNotify", function(e) {
        e.preventDefault();
        var elemRef = $(document).find("#notifyBp");
        $(elemRef).addClass("active");
        $(".page_mwrapper").addClass("show_overlay");
    });

    $(document).on("click", ".mMenuitem > a", function(e) {
        console.log("menu item clicked");
        e.preventDefault();
        if (!$(this).hasClass("bpNotify")) {
            var elemToOpenParent = $(this).closest(".mMenuitem");
            var elemToOpen = $(this).closest(".mMenuitem").find(".jqTopNav");

            if (elemToOpen.hasClass("clickedToOpen")) {
                elemToOpen.slideUp();
                elemToOpen.removeClass("clickedToOpen");
                elemToOpenParent.removeClass("low-border");
                $(this).removeClass("active");
            } else {
                $(".mMenuitem > a").removeClass("active");
                $(".jqTopNav").removeClass("clickedToOpen");
                $(".mMenuitem").removeClass("low-border");
                $(".jqTopNav").slideUp();
                elemToOpen.slideDown();
                elemToOpen.addClass("clickedToOpen");
                elemToOpenParent.addClass("low-border");
                $(this).addClass("active_elem");
                $(this).parent().siblings().children().removeClass("active_elem");
            }
        }

    });


    if ($(".info_container").hasClass("active")) {
        $(".page_mwrapper").addClass("show_overlay");
    }


    /*****************RESIZE CALL***********************/
    $(window).resize(function() {
        if ($(".mobileToggleContent").length > 0) {
            responsiveFooter();
        }
    });

    /*****************  Main Search on Top Header  *****************/

    $(document).on("submit", "#searchForm", function(e) {
        if (localStorage.getItem("searchParam")) {
            localStorage.removeItem("searchParam");
        }
        e.preventDefault();
        var action = $(this).attr("action");
        var data = $(this).serialize();
        data = btoa(data);
        if ($("#onSearchPage").length > 0) {
            e.preventDefault();
        } else {
            window.location.href = action + '?' + data + '!!!';
        }
        localStorage.setItem("searchParam", $.trim($("#searchParam").val()));
        console.log(localStorage.getItem("searchParam"));
    });

    $(document).on("click", ".searchbox-toggle", function(e) {
        var action = $("#searchForm").attr("action");
        if ($("#onSearchPage").length > 0) {
            e.preventDefault();
            $(this).stop().addClass("active");
            $(".show_search").stop().fadeIn("500", "linear");
        } else {
            window.location.href = action;
        }
    });


    $(document).on("click", ".innerSelectToggle", function() {
        $(this).stop().toggleClass("active");
        $(this).closest(".hasDropDown").stop().toggleClass("active");
        $(this).closest(".hasDropDown").find(".inner_selectBox").stop().slideToggle();
    });

    if ($("#getLoggedInFlag").length > 0 && $("#getLoggedInFlag").val() != "") {
        console.log("in if condition of login check");
        var logFlag = $("#getLoggedInFlag").val();

        // Switch tabs according to previous selection of tabs
        logFlagOne = logFlag.charAt(0);
        $(".switcherButton[data-tag='tabb" + logFlagOne + "']").trigger('click');

        // Select the previous selected option from dropdown
        logFlagTwo = logFlag.charAt(1);
        console.log(logFlagTwo);
        if (logFlagOne == "1") {
            console.log("changed has been called");
            $(document).find("#spt").val(logFlagTwo).trigger("change");
        } else {
            $(document).find("#spt2").val(logFlagTwo).trigger("change");
        }

    } else {
        var currentVal = $(document).find("#spt").val();
        $(document).find("#spt").val(currentVal).trigger("change");
    }

});

//*****/ $(window).load(function () { ****///
$(window).on("load", function() {
    /** track request tab 2 trigger **/
    if ($(".tab2InitClick").length > 0) {
        var winLoc = window.location.href.split("?")[1] || "";
        if (winLoc == "t2") {
            $(".tab2InitClick").trigger("click");
        }
    }

    $("#preloader").fadeOut();
    var is_mobile = ((/Mobile|Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ? true : false);
    if (is_mobile) {
        if ($(".mCustomScrollbar").length > 0) {
            $(".mCustomScrollbar").mCustomScrollbar("destroy");
        }
    }
});