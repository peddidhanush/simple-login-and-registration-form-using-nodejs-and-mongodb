/**
 * Add Student Form
 */

 $("#add").submit( e => {
    e.preventDefault();
    let data = {
       id: $("#id").val(),
       name: $("#name").val(),
       email: $("#email").val(),
       class: $("#class").val(),
       year: $("#year").val(),
       city: $("#city").val(),
       country: $("#country").val()
    };
    $.ajax({
      method: "POST",
      url: "dashboard.php",
      data: {
         data: data
      },
      success: (response) => {
         console.log(response);
         if(response == true) {
            var alert_msg = `<div class="alert alert-success">Student Added Successfully</div>`;
            $("#add .modal-body").prepend(alert_msg);
            setTimeout(() => {
               $('.alert').remove();
               window.location.reload();
            }, 2000);
            $(".form-control").val("");
         } else {
            var alert_msg = `<div class="alert alert-danger">Something Went Wrong</div>`;
            $(".table").prepend(alert_msg);
            setTimeout(() => {
               $('.alert').remove();
            }, 2000);
         }
      }
    });
 });