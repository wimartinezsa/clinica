import React from "react";
import TablePacientes from "../organisms/TablePacientes";

export default function PacientePage() {
    return (
        <div className="flex min-h-screen flex-col m-10">
            <TablePacientes/>
        </div>
    );
}