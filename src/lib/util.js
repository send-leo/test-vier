import React from 'react';


import '../index.css';

function makeTable(obj) {

    const rows = Object.entries(obj).map(([key, value]) =>
        <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
        </tr>
    );

    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export default {
    makeTable,
}
