import React from "react";

const Table = ({ theadData, tbodyData, customClass }) => {
    return (
        <table className="table p-0 m-0" style={{ backgroundColor: "white", overflowY: "auto" }}>
            <thead className="thead-light" style={{ backgroundColor: "rgb(251, 246, 246)" }}>
                <tr scope="col">
                    {theadData.map((h) => {
                        return <TableHeadItem key={h.title} item={h.title} />;
                    })}
                </tr>
            </thead>
            <tbody>

                {tbodyData.map((item) => {
                    return <tr>{theadData.map((h, index) =>
                        <td key={index}>{h.render ? h.render(item) : (item[h.dataIndex] || '')}</td>)}
                    </tr>
                })
                }
            </tbody>
        </table>
    );
};

const TableHeadItem = ({ item }) => {
    return (
        <td title={item}>
            <b> {item} </b>
        </td>
    );
};
export default Table;