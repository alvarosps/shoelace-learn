import React, { useState } from 'react'
import ISchool from '../types/school.type'

interface Props {
    school: ISchool,
    saveSchool: (e: React.FormEvent, formData: ISchool) => void,
}

const EditSchool: React.FC<Props> = ({ school, saveSchool }) => {
    const [formData, setFormData] = useState<ISchool>(school)

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    return (
        <form
            className='Form'
            onSubmit={e => saveSchool(e, formData)}
        >
            <div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input onChange={handleForm} type="text" id="name" value={formData.name} />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input onChange={handleForm} type="text" id="address" value={formData.address} />
                </div>
            </div>
            <button disabled={formData === undefined}>Save School</button>
        </form>
    )
}

export default EditSchool