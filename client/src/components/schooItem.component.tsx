import React from "react"
import ISchool from "../types/school.type"

interface SchoolProps {
    school: ISchool
}

const SchoolItem: React.FC<SchoolProps> = ({ school }) => {

    return (
        <div className="Card">
            <div className="Card--text">
                <h1>{school.name}</h1>
                <span>Address: {school.address}</span>
            </div>
            <div className="Card--button">
                <button>
                    Edit
                </button>
                <button className="Card-button__delete">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default SchoolItem