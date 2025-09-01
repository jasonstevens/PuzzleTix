import * as React from 'react';
import {
    DataGridPro,
    GridActionsCellItem,
    type GridColDef,
    type GridRowId,
    type GridRowModel,
    type GridRowOrderChangeParams,
} from '@mui/x-data-grid-pro';

import OutgoingMailIcon from '@mui/icons-material/OutgoingMail';

function updateRowPosition(
    initialIndex: number,
    newIndex: number,
    rows: Array<GridRowModel>,
): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(
            () => {
                const rowsClone = [...rows];
                const row = rowsClone.splice(initialIndex, 1)[0];
                rowsClone.splice(newIndex, 0, row);
                resolve(rowsClone);
            },
            Math.random() * 500 + 100,
        ); // simulate network latency
    });
}

export default function WaitGrid() {

    let content = [
        { id: 1, first: 'Harry', last: "McGarry", email: "harry@mcgarry.com", status: 2, remaining: '11hrs' },
        { id: 2, first: 'Garry', last: "McLarry", email: "garry@mclarry.com", status: 1, remaining: '37hrs' },
        { id: 3, first: 'Larry', last: "McHarry", email: "larry@mcharry.com" },
        { id: 4, first: 'Bruce', last: "Bruceington", email: "bruce@brucer.com" },
    ];

    const [rows, setRows] = React.useState(content);

    const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
        const newRows = await updateRowPosition(
            params.oldIndex,
            params.targetIndex,
            rows,
        );
        setRows(newRows);
    };

    const columns: GridColDef[] = [
        { field: 'first', headerName: 'First', type: 'string', sortable: false },
        { field: 'last', headerName: 'Last', type: 'string', sortable: false },
        { field: 'email', headerName: 'E-Mail', width: 200, editable: true, type: 'string', sortable: false },

        {
            field: 'status', headerName: 'Status', width: 140,
            editable: true,
            type: 'singleSelect',
            valueOptions: [
                { value: 1, label: "Offer Sent" },
                { value: 2, label: "Reminder Sent" },
            ],
        },

        { field: 'remaining', headerName: 'Remaining Time', width: 200, editable: true, type: 'string', sortable: false },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Make Offer',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                function send(_id: GridRowId): React.MouseEventHandler<HTMLElement> | undefined {
                    throw new Error('Function not implemented.');
                }

                return [
                    <GridActionsCellItem
                        icon={<OutgoingMailIcon sx={{ fontSize: '2rem' }} />}
                        label="Save"

                        onClick={() => send(id)}
                    />,
                ];
            },
        },
    ];

    return (
        <DataGridPro
            columns={columns}
            rows={rows}
            rowReordering
            onRowOrderChange={handleRowOrderChange}
        />
    );
}