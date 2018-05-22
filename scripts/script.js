var students = [];//global variable
$(document).ready(function () {
    getListOfStudentsFromDatabase();
    $("#createStudent").click(function () {
        onCreateStudentButtonClick();
    });
    $(".saveStudent").click(function () {
        onSaveStudentButtonClick();
    });
    $(".updateStudent").click(function () {
        onUpdateStudentButtonClick();
    });
    // $(".btn-delete").click(function(){
    //     console.log("delete");
    // });
    $(document).on("click", ".btn-delete", function () {
        console.log("delete");
        rowIndex = $(this).closest("tr").index(); //local var enclosed within function
        console.log("rowIndex", rowIndex);
        rowId = $("#studentTable tbody tr:eq(" + rowIndex + ")").attr("data-id");
        console.log("rowId", rowId);
        deleteStudent(rowId);


    });
    $(document).on("click", ".btn-update", function () {
        console.log("update");
        rowIndex = $(this).closest("tr").index(); //local var enclosed within function
        console.log("rowIndex", rowIndex);
        rowId = $("#studentTable tbody tr:eq(" + rowIndex + ")").attr("data-id");
        console.log("rowId", rowId);
        updateStudent(rowId);


    });
    $(".deleteStudentBtn").click(function () {
        removeStudent()
    });

    $(".search").keyup(function () {
        search = $(this).val();
        console.log("search", search);
        searchTable(search);
    });
    $("#studentTable thead th").click(function(){
        sortBy= $(this).attr("data-sort");
        if(!sortBy){
            return;   
        }
        if($(this).hasClass("asc")){
            $(this).removeClass("asc").addClass("desc");
             sortByFn(sortBy,true);
             
        }
       else{
           $(this).removeClass("desc").addClass("asc");
            sortByFn(sortBy,false);
       }
        
    });

});


