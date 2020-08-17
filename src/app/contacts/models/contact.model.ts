import { PhoneNumber } from './phone-number.model';

export class Contact {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    isFavorite: boolean;
    phoneNumbers: Array<PhoneNumber>;

}
