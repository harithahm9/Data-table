function deleteStudent(rowId) {
    var student = {};
    for (var i = 0; i < students.length; i++) {
        if (students[i]._id.$oid == rowId) {
            student = students[i];

        }
    }
    console.log(student);
    // var removeStudent= confirm("are you sure to delete student "+student.name);
    // if(removeStudent){

    // }
    $("#deleteModal").find(".rowId").text(student._id.$oid);
    $("#deleteModal").find(".student-name").text(student.name);
    $("#deleteModal").modal("show");

}
function removeStudent() {
    studentId = $("#deleteModal").find(".rowId").text();
    $.ajax({
        method: "DELETE",
        url: "https://api.mlab.com/api/1/databases/students/collections/marks/" + studentId + "?apiKey=alHwuwXS7ySwUO0teRHNdeilhqQO5f5S",
        success: function (response) {
            onRemoveStudentSuccessFn(response);
        },
        error: function (error) {
            onRemoveStudentErrorFn(error);
        }

    })
}
function onRemoveStudentErrorFn(error) {
    console.log("error", error);
    
}
function onRemoveStudentSuccessFn(response) {
    console.log("response", response);
    $("#deleteModal").modal("hide");
    location.reload();
}