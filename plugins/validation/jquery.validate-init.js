
jQuery(".form-valide").validate({
    submitHandler: function (form, event) {
        event.preventDefault();
     
    },
    ignore: [],
    errorClass: "invalid-feedback animated fadeInDown",
    errorElement: "div",
    errorPlacement: function (e, a) {
        jQuery(a).parents(".form-group > div").append(e);
    },
    highlight: function (e) {
        jQuery(e)
            .closest(".form-group")
            .removeClass("is-invalid")
            .addClass("is-invalid");
    },
    success: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid"),
            jQuery(e).remove();
    },
    rules: {
        "val-title": { required: !0, minlength: 3 },
        "val-image": { required: !0, minlength: 3 },
        // "val-password": { required: !0, minlength: 5 },
        // "val-confirm-password": { required: !0, equalTo: "#val-password" },
        "val-select2": { required: !0 },
        "val-select2-multiple": { required: !0, minlength: 2 },
        "val-suggestions": { required: !0, minlength: 5 },
        "val-brand": { required: !0 },
        "val-color": { required: !0 },
        "val-price": { required: !0, number: !0 },
        "val-website": { required: !0, url: !0 },
        "val-phoneus": { required: !0, phoneUS: !0 },
        "val-digits": { required: !0, digits: !0 },
        "val-number": { required: !0, number: !0 },
        "val-range": { required: !0, range: [1, 5] },
        "val-terms": { required: !0 },
    },
    messages: {
        "val-title": {
            required: "Please enter a title",
            minlength: "Your title must consist of at least 3 characters",
        },
        "val-image": "Please enter a valid image",
        "val-password": {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long",
        },
        "val-confirm-password": {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long",
            equalTo: "Please enter the same password as above",
        },
        "val-select2": "Please select a value!",
        "val-select2-multiple": "Please select at least 2 values!",
        "val-suggestions": "Please enter description !",
        "val-brand": "Please select a brand!",
        "val-color": "Please select a color!",
        "val-price": "Please enter a price!",
        "val-website": "Please enter your website!",
        "val-phoneus": "Please enter a US phone!",
        "val-digits": "Please enter quantity above 0!",
        "val-number": "Please enter a number!",
        "val-range": "Please enter a number between 1 and 5!",
        "val-terms": "You must agree to the service terms!",
    },
});
