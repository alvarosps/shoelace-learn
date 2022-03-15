import React from "react"
import ISchool from "../types/school.type"

interface SchoolProps {
    school: ISchool
}

type Props = SchoolProps & {
    deleteSchool: (_id: string) => void
}

const SchoolItem: React.FC<Props> = ({ school, deleteSchool }) => {
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
                <button
                    className="Card-button__delete"
                    onClick={() => deleteSchool(school._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default SchoolItem