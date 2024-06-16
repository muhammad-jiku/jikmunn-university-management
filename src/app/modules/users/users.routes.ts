import express from 'express'
import usersController from './users.controller'

const usersRouter = express.Router()

usersRouter.post('/create-user', usersController.createUser)

export default usersRouter
