import { ValidationChain, validationResult } from "express-validator";
import { body, param, query } from "express-validator";
import { Request, Response, NextFunction } from "express";







const registerValidation =[
    body('firstname')
      .notEmpty()
      .withMessage('First name is required')
      .isAlpha()
      .withMessage('First name must contain only alphabetic characters'),

    body('lastname')
     .optional()
     .if(body('lastname').exists())
     .isAlpha()
     .withMessage('Last name must contain only alphabetic characters'),

    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid formate email'),

    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({min:8})
      .withMessage('password must be 8 charecter')
]

const login = [
    body('email')
     .notEmpty()
     .withMessage('email is required'),
   

    body('password')
     .notEmpty()
     .withMessage('password is required')
     
]



const profile =[
    body('firstname')
        .notEmpty()
        .withMessage('First name is required'),

    body('lastname')
        .optional()
        .if(body('lastname').exists()) // Make sure lastname exists before applying isAlpha validation
        .isAlpha()
        .withMessage('Last name must contain only alphabetic characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    body('age')
      .notEmpty()
      .withMessage('specilization is required'),

    body('address')
      .notEmpty()
      .withMessage('address is required'),




    
]



const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const validaton of validations) {
                await validaton.run(req)
            }

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                return next()
            }
            let error = ''

            for (const err of errors.array()) {
                error += err.msg
            }

            res.status(400).json({ error });

        } catch (error) {
            res.status(500).json({ error })
        }
    }
}








module.exports = {validate,registerValidation,login,profile}