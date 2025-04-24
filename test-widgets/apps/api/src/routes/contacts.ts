import { Express, Request, Response } from 'express'
import { validateContact } from '../middlewares'
import {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
  IUpdateContactPayload,
} from '../store'

const getAllContactsController = (req: Request, res: Response) => {
  const contacts = getAllContacts()
  res.status(200).json(contacts)
}

const createContactController = (req: Request, res: Response) => {
  const newContact = createContact(req.body)
  res.status(201).json(newContact)
}

const updateContactController = (req: Request, res: Response) => {
  try {
    const payload: IUpdateContactPayload = {
      ...req.body,
      id: req.params.id,
    }
    const updatedContact = updateContact(payload)
    res.status(200).json(updatedContact)
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      res.status(404).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}

const deleteContactController = (req: Request, res: Response) => {
  try {
    const deletedContact = deleteContact(req.params.id)
    res
      .status(200)
      .json({ message: 'Contact deleted', contact: deletedContact })
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      res.status(404).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}

export const createContactRoutes = (app: Express) => {
  app.get('/contacts', getAllContactsController)
  app.post('/contacts', validateContact, createContactController)
  app.put('/contacts/:id', validateContact, updateContactController)
  app.delete('/contacts/:id', deleteContactController)
}
