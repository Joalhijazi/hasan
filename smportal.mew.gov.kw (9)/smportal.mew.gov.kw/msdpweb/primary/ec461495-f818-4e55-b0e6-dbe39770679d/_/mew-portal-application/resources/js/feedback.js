(function() {

    // Default global request param object, userLogin status whether user is login or not as true or false
    var requestParam = {
            "language": "en"
        },
        isUserLoggedIn = $(":input[name='loggedIn']").val() || "";

    //check whether user is loggedin or not
    if (isUserLoggedIn != "" && isUserLoggedIn == "true") {

        // Feedback api endpoint
        var endPoint = getEndPoints.feedback

        // Get feedback type when feedback type is selected
        $(document).on("change", ".feebackForm .customRadioBox", function() {

            var feebackType = $(this).attr("id") || "";
            if (feebackType != "") {
                var feedbackToId = feebackType.toLowerCase();

                // check selected feedback and converted into id
                if (feedbackToId == "happy") feedbackToId = 1;
                if (feedbackToId == "neutral") feedbackToId = 2;
                if (feedbackToId == "unhappy") feedbackToId = 3;

                // adding converted feedbackId into global requestparam object
                requestParam.feedback = feedbackToId;

                //call feedback function with converted feedbackId and as param
                feedback(feebackType);
            }

        });

        // Post feedback function
        function feedback(feebackType) {

            // endPoint = endpoint for feedback api stored in properties
            // requestParam = it contains feedback type id and lang attribute
            Cloud.send("POST", endPoint, JSON.stringify(requestParam),

                function(result) {

                    // store response message
                    var responseMessage = result.data.message;

                    // changeContent = tentative class for showing hiding content
                    // hiding feedback form content and show response message on request complete
                    $("#showFeedback").addClass("changeContent");
                    $(".changeContent .feebackForm").addClass("hide").fadeOut();
                    $(".changeContent .feedbackMessage").removeClass("hide").fadeIn();
                    $(".changeContent .feedbackMessage p").text(responseMessage);

                }, [" "],
                function(complete) {
                    console.log("Feedback Submitted Successfully");
                }
            );

        }

        $(document).on("click", ".changeContent .infoBoxClose", function() {

            // changeContent = removing tentative class
            // hiding/showing feedback form content and show response message on popup close
            // reseting feedback form
            $(".customSelectParent").find("input[type='radio']:checked").prop("checked", false);
            $(".changeContent .feedbackMessage").addClass("hide").fadeOut();
            $(".changeContent .feedbackMessage p").text("");
            $(".changeContent .feebackForm").removeClass("hide").fadeIn();
            $("#showFeedback").removeClass("changeContent");

        });

    } else {
        //Hide feeback if user is not logged in 
        $(document).find(".showInfoBox").addClass("hide");
    }

}());