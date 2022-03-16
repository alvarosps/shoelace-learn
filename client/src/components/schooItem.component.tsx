import React, { useState } from "react"
import ISchool from "../types/school.type"
import EditSchool from "./editSchool.component"
import schoolService from "../services/school.service"
import IUser from "../types/user.type"

interface SchoolProps {
    school: ISchool,
    user: IUser
}

type Props = SchoolProps & {
    deleteSchool: (_id: string) => void,
    updateSchoolList: (schoolList: ISchool[]) => void
}

const SchoolItem: React.FC<Props> = ({ school, deleteSchool, user, updateSchoolList }) => {
    const [showEditForm, setShowEditForm] = useState(false)

    const toggleEdit = () => {
        const newShowEditForm = !showEditForm

        setShowEditForm(newShowEditForm)
    }

    const handleSaveSchool = (e: React.FormEvent, formData: ISchool): void => {
        e.preventDefault()
        schoolService.updateSchool(formData, user)
            .then(({ data }) => {
                updateSchoolList(data.schools)
                toggleEdit()
            })
            .catch((err: any) => {
                console.log('Error updating', err)
            })
    }

    return (
        <div>
            <div className="Card">
                <div className="Card--text">
                    <h1>{school.name}</h1>
                    <span>Address: {school.address}</span>
                </div>
                <div className="Card--button">
                    <button onClick={toggleEdit}>
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
            {showEditForm &&
                <EditSchool
                    saveSchool={handleSaveSchool}
                    school={school}
                />
            }
        </div>
    )
}

export default SchoolItem