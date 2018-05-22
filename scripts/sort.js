function sortByFn(sortBy,reverse){
    console.log("sortBy",sortBy);
    if(sortBy.split(".").length==1){
        students.sort(function(a,b){
        return a[sortBy]>b[sortBy];

    });
}
else{
    splittedSortBy=sortBy.split(".");
    students.sort(function(a,b){
        return a[splittedSortBy[0]][splittedSortBy[1]]>b[splittedSortBy[0]][splittedSortBy[1]];

    });
}
    
    if(reverse){
        students.reverse();
    }
    populateStudentTable(students);

}