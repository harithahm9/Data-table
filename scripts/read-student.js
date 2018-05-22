function getListOfStudentsFromDatabase() {
    $.ajax({
        method: "GET",
        url: "https://api.mlab.com/api/1/databases/students/collections/marks?apiKey=alHwuwXS7ySwUO0teRHNdeilhqQO5f5S",
        success: function (response) {
            getListOfStudentsFromDatabaseSuccessFn(response)
        },
        error: function (error) {
            getListOfStudentsFromDatabaseErrorFn(error)
        }
    });
}
function getListOfStudentsFromDatabaseSuccessFn(response) {

    students = response;
    console.log(students);
    for (var i = 0; i < students.length; i++) {
        students[i].total = 0;
        for (subject in students[i].marks) {
            students[i].total = students[i].total + parseInt(students[i].marks[subject])
        }
    }
    students.sort(function (a, b) {
        return a.total - b.total;
    });
    students.reverse();
    rank = 1;
    previousTotal = 0;
    previousRank = 1;
    for (var i = 0; i < students.length; i++) {
        if (previousTotal == students[i].total) {
            students[i].rank = previousRank;
        }
        else {
            students[i].rank = rank;
            previousRank= rank;
        }
        previousTotal=students[i].total;
        rank++;
    }
    //TODO:Poplualte students data into StudentsTable
    populateStudentTable(students);
}
function getListOfStudentsFromDatabaseErrorFn(error) {
    console.log("error", error);
}
function populateStudentTable(students) {
    var tableRow = "";
    for (var i = 0; i < students.length; i++) {
        tableRow = tableRow + "<tr data-id='"+students[i]._id.$oid.toString()+"'>"
        tableRow = tableRow + "<td>" + parseInt(i + 1) + "</td>";
        tableRow = tableRow + "<td>" + students[i].rollno + "</td>";
        tableRow = tableRow + "<td>" + students[i].name + "</td>";
        tableRow = tableRow + "<td>" + students[i].marks.english + "</td>";
        tableRow = tableRow + "<td>" + students[i].marks.french + "</td>";
        tableRow = tableRow + "<td>" + students[i].marks.japanese + "</td>";
        tableRow = tableRow + "<td>" + students[i].marks.germen + "</td>";
        tableRow = tableRow + "<td>" + students[i].marks.spanish + "</td>";
        tableRow = tableRow + "<td>" + students[i].total + "</td>";
        tableRow = tableRow + "<td>" + students[i].rank + "</td>";
        tableRow = tableRow+"<td><button class='btn btn-warning btn-update'>Update</button><button class='btn btn-danger btn-delete'>Delete</button></td>"
        tableRow = tableRow + "</tr>";
    }
    $("#studentTable").find("tbody").html(tableRow);
}
