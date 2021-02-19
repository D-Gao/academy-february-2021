import React from "react";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";

const TableComponent = props => {
    const { tableData, pagination, rows, rowsOptions, columnsList } = props;

    const columns = columnsList.map(column => <Column key={column.field} field={column.field} header={column.header}
                                                      sortable={column.sortable}/>)
    return (pagination ?
            <DataTable value={tableData}
                       paginator
                       rows={rows}
                       rowsPerPageOptions={rowsOptions}
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                {columns}
            </DataTable> :
            <DataTable value={tableData}>
                {columns}
            </DataTable>
    )
};

export default TableComponent;