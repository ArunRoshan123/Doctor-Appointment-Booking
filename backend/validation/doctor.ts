import { ValidationChain, validationResult } from "express-validator";
import { body, param, query } from 'express-validator'
import { Request, Response, NextFunction } from "express";



const registerValidation = [
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

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];


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

    body('specilization')
      .notEmpty()
      .withMessage('specilization is required'),

    body('about')
      .notEmpty()
      .withMessage('about is required'),

    body('gender')
      .notEmpty()
      .withMessage('ger is required'),

    body('price')
      .notEmpty()
      .withMessage('price is required')


    
]



const sendreportss =[
    body('reports')
      .notEmpty()
      .withMessage("reports is required")
]






const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const validation of validations) {
                await validation.run(req);
            }

            const errors = validationResult(req);
            if (errors.isEmpty()) {   // if the errors are empty
                return next();    // we are going to next function or controller
            }

            let error = ''

            for (const err of errors.array()) {
                error += err.msg
            }

            res.status(400).json({ error});
        } catch (error) {
            res.status(500).json({ error });
        }
    };
};




module.exports = { validate, registerValidation,login,profile,sendreportss };
