function updateStudent(rowId) {
    var student = {};
    for (var i = 0; i < students.length; i++) {
        if (students[i]._id.$oid === rowId) {
            student = students[i];
        }
    }
    console.log("student", student);
    $("#studentModal .student-rollno").val(student.rollno);
    $("#studentModal .student-name").val(student.name);
    $("#studentModal .student-marks--english").val(student.marks.english);
    $("#studentModal .student-marks--french").val(student.marks.french);
    $("#studentModal .student-marks--japanese").val(student.marks.japanese);
    $("#studentModal .student-marks--germen").val(student.marks.germen);
    $("#studentModal .student-marks--spanish").val(student.marks.spanish);
    $("#studentModal .updateStudent").show();
    $("#studentModal .saveStudent").hide();
    $("#studentModal .updateStudent").attr("data-id", rowId);
    $("#studentModal").modal("show");
}
function onUpdateStudentButtonClick() {
    rowId = $("#studentModal .updateStudent").attr("data-id");
    student = {};
    student.rollno = $("#studentModal .student-rollno").val();
    student.name = $("#studentModal .student-name").val();
    student.marks = {};
    student.marks.english = $("#studentModal .student-marks--english").val();
    student.marks.french = $("#studentModal .student-marks--french").val();
    student.marks.japanese = $("#studentModal .student-marks--japanese").val();
    student.marks.germen = $("#studentModal .student-marks--germen").val();
    student.marks.spanish = $("#studentModal .student-marks--spanish").val();
    console.log("student", student);

    updateStudentInDB(student, rowId)
}
function updateStudentInDB(student, rowId) {
    $.ajax({
        method: "PUT",
        url: "https://api.mlab.com/api/1/databases/students/collections/marks/" + rowId + "?apiKey=alHwuwXS7ySwUO0teRHNdeilhqQO5f5S",
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(student),
        dataType: "JSON",
        success: function (response) {
            onUpdateStudentSuccessFn(response)
        },
        error: function (error) {
            onUpdateStudentErrorFn(error)
        }
    });
}
function onUpdateStudentSuccessFn(response) {
    console.log("response", response);
    $("#studentModal").modal("hide");
    var rowId=-1;
    for(var i=0;i<students.length;i++){
        if(students[i]._id.$oid===response._id.$oid){
            rowId=i;
        }

    }
    delete students[rowId];
    students.splice(rowId,1,response);
    getListOfStudentsFromDatabaseSuccessFn(students);
}
function onUpdateStudentErrorFn(error) {
    console.log("error", error);

}

