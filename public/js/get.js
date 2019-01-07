/**
 * get students
 */

function studentsData() {
    $.ajax({
        url: 'functions.php?fun=displayStudents',
        method: 'GET',
        success: (response) => {
            $('#studentsData').html(response);
        }
    })
}
setInterval(() => {
    studentsData();
},1000);