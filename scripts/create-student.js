function onCreateStudentButtonClick() {
    $("#studentModal .student-rollno").val('');
    $("#studentModal .student-name").val('');
    $("#studentModal .student-marks--english").val('');
    $("#studentModal .student-marks--french").val('');
    $("#studentModal .student-marks--japanese").val('');
    $("#studentModal .student-marks--germen").val('');
    $("#studentModal .student-marks--spanish").val('');
    $("#studentModal .updateStudent").hide();
    $("#studentModal .saveStudent").show();
    $("#studentModal").modal("show");

}
function onSaveStudentButtonClick() {
    data = {
        name: "",
        rollno: "",
        marks: { "english": "", "french": "", "japanese": "", "germen": "", "spanish": "" }
    }
    data.name = $(".student-name").val();
    data.rollno = $(".student-rollno").val();
    data.marks.english = $(".student-marks--english").val();
    data.marks.french = $(".student-marks--french").val();
    data.marks.japanese = $(".student-marks--japanese").val();
    data.marks.germen = $(".student-marks--germen").val();
    data.marks.spanish = $(".student-marks--spanish").val();
    createStudent(data);
}
function createStudent(data) {
    $.ajax({
        method: "POST",
        url: "https://api.mlab.com/api/1/databases/students/collections/marks?apiKey=alHwuwXS7ySwUO0teRHNdeilhqQO5f5S",
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data),
        dataType: "JSON",
        success: function (response) {
            onCreateStudentSuccessFn(response)
        },
        error: function (error) {
            onCreateStudentErrorFn(error)
        }
    });
}
function onCreateStudentSuccessFn(response) {
    console.log("response", response);
    students.push(response);
    $("#studentModal").modal("hide");
    getListOfStudentsFromDatabaseSuccessFn(students);
}
function onCreateStudentErrorFn(error) {
    console.log("error", error);
}
