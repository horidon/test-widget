import { v4 as uuidv4 } from 'uuid'

export interface IContact {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    type?: 'personal' | 'business' | 'family'
    address?: {
        street: string
        city: string
        state?: string
        postalCode?: string
        country?: string
    }
    dateOfBirth?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
}

const contactStore: IContact[] = []

export type ICreateContactPayload = Omit<IContact, 'id' | 'createdAt' | 'updatedAt'>

export const createContact = (payload: ICreateContactPayload) => {
    const newContact: IContact = {
        ...payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    contactStore.push(newContact)

    console.log('Contact created:', newContact)
    return newContact
}

export const getAllContacts = () => {
    return contactStore
}

export type IUpdateContactPayload = Omit<IContact, | 'createdAt' | 'updatedAt'>

export const updateContact = (payload: IUpdateContactPayload) => {
    const contactIndex = contactStore.findIndex(contact => contact.id === payload.id)
    
    if (contactIndex === -1) {
        throw new Error(`Contact with id ${payload.id} not found`)
    }

    const updatedContact: IContact = {
        ...contactStore[contactIndex],
        ...payload,
        updatedAt: new Date().toISOString(),
    }

    contactStore[contactIndex] = updatedContact
    console.log('Contact updated:', updatedContact)
    return updatedContact
}

export const deleteContact = (id: string): IContact => {
    const contactIndex = contactStore.findIndex(contact => contact.id === id)
    
    if (contactIndex === -1) {
        throw new Error(`Contact with id ${id} not found`)
    }

    const deletedContact = contactStore[contactIndex]
    contactStore.splice(contactIndex, 1)

    console.log('Contact deleted:', deletedContact)
    return deletedContact
}