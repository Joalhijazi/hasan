(function() {

    var requestParam = {
            "language": "en"
        },
        isUserLoggedIn = $(":input[name='loggedIn']").val() || "",
        endPoint = "";
    if (isUserLoggedIn != "" && isUserLoggedIn == "true") {
        endPoint = getEndPoints.generalMedia;
    } else {
        endPoint = getEndPoints.guestMedia;
    }
    Cloud.send("POST", endPoint, JSON.stringify(requestParam),
        function(result) {
            var socialLinks = result.data.links;
            $(".socialDescription").append(result.data.message);
            for (var i in socialLinks) {
                var socialClass = "";
                var socialKey = !!socialLinks[i].key;
                var socialKeyVal = socialLinks[i].key.toLowerCase();
                var socialLink = socialLinks[i].value;
                if (socialKey) {
                    if (socialKeyVal == "twitter") {
                        socialClass = 'twitter_icon'
                    }
                    if (socialKeyVal == "facebook") {
                        socialClass = 'facebook_icon'
                    }
                    if (socialKeyVal == "linkedin") {
                        socialClass = 'linkedin_icon'
                    }
                    if (socialKeyVal == "youtube") {
                        socialClass = 'youtube_icon'
                    }
                    if (socialKeyVal == "google") {
                        socialClass = 'google_icon'
                    }
                    if (socialKeyVal == "instagram") {
                        socialClass = 'instagram_icon'
                    }
                }
                $(".mSocial ul").append('<li class="align_left"><a target="_blank" href="' + socialLink + '" class="' + socialClass + ' block"> </a> </li>');
            }
        }, [".socialError"],
        function(complete) {
            console.log(" Social call is complete");
        }
    );
}());