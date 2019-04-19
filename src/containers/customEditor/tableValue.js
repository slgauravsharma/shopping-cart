

import {
    Value
} from 'slate';
const existingValue = JSON.parse(localStorage.getItem('content'))

const initialValue = existingValue && Value.fromJSON(existingValue) ||
    {
        "document": {
            "nodes": []
        }
    }

export const textBlock = {
    "object": "block",
    "type": "paragraph",
    "nodes": [
        {
            "object": "text",
            "leaves": [
                {
                    "text":
                        "Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:"
                }
            ]
        }
    ]
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
        "id": Math.random() * 100000000000000000000,
        "object": "block",
        "type": "table",
        "nodes": rows
    }
    return table
}

export default initialValue