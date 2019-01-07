/**
 * User Login Form
 */

 $("#login").submit(e => {
    e.preventDefault();
    $(".form-control").attr("disabled", "disabled");
    $(".btn").attr("disabled", "disabled");
    let data = {
        emailid: $("#emailid").val(),
        password: $("#password").val()
    };
    $.ajax({
        method: "POST",
        url: "index.php",
        data: {
            data: data
        },
        success: (response) => {
            console.log(response);
            if(response == true) {
                var alert_msg = `<div class="alert alert-success">
                Login Successfully
                </div>`;
                $("#login").prepend(alert_msg);
                setTimeout(() => {
                    window.location.href = "dashboard.php";
                }, 5000);
            } else if (response == "Password And Email Does Not Match") {
                $(".form-control").removeAttr("disabled");
                $(".btn").removeAttr("disabled");
                var alert_msg = `<div class="alert alert-danger">
                Password And Email Does Not Match
                </div>`;
                $("#login").prepend(alert_msg);
                setTimeout(() => {
                    $('.alert').remove();
                }, 3000);

            } else if (response == "User does not exist!") {
                $(".form-control").removeAttr("disabled");
                $(".btn").removeAttr("disabled");
                var alert_msg = `<div class="alert alert-danger">
                User does not exist!
                </div>`;
                $("#login").prepend(alert_msg);
                setTimeout(() => {
                    $('.alert').remove();
                }, 5000);
            }
        }
    });
    
 });