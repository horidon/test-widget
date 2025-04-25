import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

const AddressSchema = Yup.object().shape({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string(),
})

const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').trim(),
    lastName: Yup.string().required('Last name is required').trim(),
    phoneNumber: Yup.string().required('Phone number is required').trim().matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be a valid international format (e.g., +1234567890)'),
    type: Yup.string().oneOf(['personal', 'business', 'family'], 'Type must be one of: personal, business, family').optional(),
    address: AddressSchema.optional(),
    dateOfBirth: Yup.string().optional().test('is-date', 'Date of birth must be a valid date', value => {
        if (!value) return true
        return !isNaN(Date.parse(value))
    }),
})


export const validateContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await ContactSchema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.errors,
            })
        }
       return next(error)
    }
}