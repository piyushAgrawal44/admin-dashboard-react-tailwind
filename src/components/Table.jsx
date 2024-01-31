import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
export default function Table(props) {

    const [expandedRows, setExpandedRows] = useState([]);

    const handleRowClick = (row) => {

        if (expandedRows === row._id)
            setExpandedRows(null);
        else
            setExpandedRows(row._id);
    };

   
    const columns = [
        {
            name: <b>Title</b>,
            selector: (row) => <div
                style={{
                    whiteSpace: expandedRows === (row._id) ? 'normal' : 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                   
                    cursor: 'pointer', // Change cursor to pointer
                }}
                onClick={() => handleRowClick(row)}
                
            >
                {row.title}
            </div>,
            sortable: true,

        },
        {
            name: <b>Topic</b>,
            selector: (row) => <span>{row.topic}</span>,
            sortable: true,

        },
        {
            name: <b>Article Insight</b>,
            selector: (row) => row.insight,

        },
        {
            name: <b>Sector</b>,
            selector: (row) => row.sector ? row.sector : <>Not Available</>,
            sortable: true,

        },
        {
            name: <b>Pestle</b>,
            selector: (row) => row.pestle,
            
        },
        {
            name: <b>Source</b>,
            selector: (row) => row.source,

        },
        {
            name: <b>Country</b>,
            selector: (row) => row.country ? <b>{row.country}</b>: <>Not Available</>,
            sortable: true,

        },
        {
            name: <b>Published</b>,
            selector: (row) => row.published ? row.published : <>Not Available</>,
            sortable: true,

        },
        {
            name: <b>URL</b>,
            selector: (row) => <Link target={"_blank"} to={row.url} rel="noreferrer">URL</Link>,
           
        }

    ]

    return (

        <>
            <DataTable
                columns={columns}
                data={props.data}
                responsive={true}
                pagination={false}
            />

        </>
    )
}
