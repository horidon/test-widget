export interface IContact {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    type?: 'personal' | 'business' | 'family';
    address?: {
        street?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
    };
    dateOfBirth?: string;
    createdAt?: string;
    updatedAt?: string;
}