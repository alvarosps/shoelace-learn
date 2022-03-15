import { Response, Request } from 'express'
import { ISchool } from '../types/school.types'
import School from '../models/school.models'
import mongoose from 'mongoose'

const getSchools = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.query

        const schools: ISchool[] = await School.find({
            'user': userId
        })
        res.status(200).json({ schools })
    } catch (error: any) {
        res.status(500).json({ error: error.toString() })
    }
}

const updateSchool = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id }
        } = req

        const updatedSchool: ISchool | null = await School.findByIdAndUpdate(
            { _id: id },
            req.query
        )

        const allSchools: ISchool[] = await School.find()

        res.status(200).json({
            message: 'School updated',
            school: updatedSchool,
            schools: allSchools 
        })
    } catch (error: any) {
        res.status(500).json({ error: error.toString() })
    }
}

const deleteSchool = async (req: Request, res: Response) => {
    try {
        const deletedSchool: ISchool | null = await School.findByIdAndRemove(req.params.id)

        const allSchools: ISchool[] = await School.find()

        res.status(200).json({
            message: 'School Deleted',
            school: deletedSchool,
            schools: allSchools
        })
    } catch (error: any) {
        res.status(500).json({ error: error.toString() })
    }
}

const addSchool = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const school: ISchool = new School({
            name: body.name,
            address: body.address,
            user: body.user,
        })

        const newSchool: ISchool = await school.save()
        const allSchools: ISchool[] = await School.find()

        res.status(200).json({
            message: 'School added',
            school: newSchool,
            schools: allSchools
        })
    } catch (error: any) {
        res.status(500).json({ error: error.toString() })
    }
}

export default {
    getSchools,
    updateSchool,
    deleteSchool,
    addSchool
}
