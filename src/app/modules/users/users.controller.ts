import { Request, Response } from 'express'
import usersService from './users.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (err) {
    if (err) {
      console.log(err)
    }
    res.status(400).json({
      sucess: false,
      message: 'Failed to create user',
    })
  }
}

export default {
  createUser,
}
