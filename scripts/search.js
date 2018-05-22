function searchTable(search) {
    $("#studentTable tbody tr").show();
    if(!search){
        return;
    }
    // console.log("search",search);

    $("#studentTable tbody tr").each(function (rowIndex,row) {
        // console.log("row",row);
        rowDataMatches = false;
        $(row).find("td:lt(10)").each(function (tdIndex, td) {
            data = $(this).text();
            // console.log("data",data);
            if (data.indexOf(search)===0) {
                rowDataMatches = true;
            }
        });
        console.log("rowDataMatches", rowDataMatches);
        if(!rowDataMatches){
            $("#studentTable tbody tr:eq("+rowIndex+")").hide();

        }
    });
}