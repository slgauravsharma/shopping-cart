export const validURL = str => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export const generateTable = (noOfRows, noOfColumns) => {
    const column = {
        "object": "block",
        "type": "table-cell",
        "nodes": [{
            "object": "text",
            "leaves": [{
                "text": "",
                // "marks": [
                //     { "type": "bold" }
                // ]
            }
            ]
        }]
    }
    const columns = []
    for (let c = 0; c < noOfColumns; c++) {
        columns.push(column)
    }

    const row = {
        "object": "block",
        "type": "table-row",
        "nodes": columns
    }

    const rows = []
    for (let r = 0; r < noOfRows; r++) {
        rows.push(row)
    }

    const table = {
        "object": "block",
        "type": "table",
        "nodes": rows
    }
    return table
}