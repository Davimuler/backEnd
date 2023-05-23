import {body} from 'express-validator'

export const loginValidation=[
    body('email').isEmail(),
    body('password').isLength({min:5}),

];
export const registerValidation=[
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('fullName').isLength({min:3}),
    body('avatarUrl').optional().isURL(),
];

export const postCreateValidation=[
   body('title','Input name of post').isLength({min:3}).isString(),
    body('text','Input text of post').isLength({min:3}).isString(),
    body('tags','Wrong form of tags(needed array)').optional().isString(),
    body('imageUrl','Wrong link to image').optional().isString()
];



