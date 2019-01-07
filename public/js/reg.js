/**
 * User registration form
 */

$('#registration').submit(e => {
    e.preventDefault();
    const name_regx = /^[a-zA-Z\s]{3,25}$/;
    const email_regx = /^([a-zA-Z\d\.]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/;
    const mobile_regx = /^[\d]{10}$/;
    if (name_regx.test($('#fname').val()) && email_regx.test($('#emailid').val()) && name_regx.test($("#lname").val()) && $('#password').val != '' && $("#cpassword").val() != '') {
        $(".form-control").attr("disabled", "disabled");
        $(".btn").attr("disabled", "disabled");
        if ($("#password").val() != $('#cpassword').val()) {
            $(".form-control").removeAttr("disabled");
            $(".btn").removeAttr("disabled");
            var alert_msg = `<div class="alert alert-danger">
                Password And Confirm Password Does not match
            </div>`;
            $("#registration").prepend(alert_msg);
            setTimeout(() => {
                $('.alert').remove();
            }, 5000);
        } else {
            var fname = $("#fname").val();
            var mname = $("#mname").val();
            var lname = $("#lname").val();
            var emailid = $("#emailid").val();
            var password = $("#password").val();
            if ($('#mobile').val() != '') {
                if (mobile_regx.test($('#mobile').val())) {
                    var mobile = $("#mobile").val();
                    var data = {
                        fname: fname,
                        mname: mname,
                        lname: lname,
                        emailid: emailid,
                        password: password,
                        mobile: mobile
                    }

                } else {
                    $(".form-control").removeAttr("disabled");
                    $(".btn").removeAttr("disabled");
                    var alert_msg = `<div class="alert alert-danger">
                    Enter a Valid Mobile Number.
                    </div>`;
                    $("#registration").prepend(alert_msg);
                    setTimeout(() => {
                        $('.alert').remove();
                    }, 5000);
                }
            } else {
                var data = {
                    fname: fname,
                    mname: mname,
                    lname: lname,
                    emailid: emailid,
                    password: password,
                    mobile: mobile
                }
            }
            $.ajax({
                url: "register.php",
                data: {
                    data: data
                },
                method: "POST",
                success: (response) => {
                    if (response == true) {
                        var alert_msg = `<div class="alert alert-success">
                            Registration Success.
                        </div>`;
                        $("#registration").prepend(alert_msg);
                        setTimeout(() => {
                            window.location.href = 'index.php';
                        }, 5000)
                    } else if (response == "User Already Exist With The Email Id") {
                        $(".form-control").removeAttr("disabled");
                        $(".btn").removeAttr("disabled");
                        var alert_msg = `<div class="alert alert-warning">
                        User Already Exist With The Email Id.
                        </div>`;
                        $("#registration").prepend(alert_msg);
                        setTimeout(() => {
                            $('.alert').remove();
                        }, 5000)
                    }
                }
            });
        }
    } else {
        $(".form-control").removeAttr("disabled");
        $(".btn").removeAttr("disabled");
        var alert_msg = `<div class="alert alert-danger">
            Fill the required Fields / Fill the details in correct manner 
        </div>`;
        $("#registration").prepend(alert_msg);
        setTimeout(() => {
            $('.alert').remove();
        }, 5000);
    }

});