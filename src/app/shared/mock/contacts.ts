import { Contact } from 'src/app/contacts/models/contact.model';

export const contacts: Array<Contact> = [
    {
        id: 1,
        firstName: 'Addie',
        lastName: 'Hernandez',
        phoneNumberHome: '3856951123',
        phoneNumberWork: '3859478288',
        phoneNumberCell: '3856951123',
        phoneNumberHusband: '3854417899',
        email: 'addie.hernandez@mail.com',
        profilePhoto: '../../assets/images/addie_hernandez.jpg',
        isFavorite: true
    },
    {
        id: 2,
        firstName: 'Oscar',
        lastName: 'Arnold',
        phoneNumberHome: '9842235698',
        phoneNumberWork: '3856951123',
        phoneNumberCell: '3854417899',
        phoneNumberHusband: '3859478233',
        email: 'oscar.arnold@mail.com',
        profilePhoto: '../../assets/images/oscar_arnold.png',
        isFavorite: true
    },
    {
        id: 3,
        firstName: 'Agnes',
        lastName: 'Terry',
        phoneNumberHome: '3859478233',
        phoneNumberWork: '3854417899',
        phoneNumberCell: '3856951123',
        phoneNumberHusband: '9842235698',
        email: 'agnes.terry@mail.com',
        profilePhoto: '../../assets/images/agnes_terry.jpg',
        isFavorite: false
    },
    {
        id: 4,
        firstName: 'Isiah',
        lastName: 'McGuire',
        phoneNumberHome: '3856951123',
        phoneNumberWork: '3859478233',
        phoneNumberCell: '3854417899',
        phoneNumberHusband: '9842235698',
        email: 'isiah.mcguire@mail.com',
        profilePhoto: '../../assets/images/isiah_mcguire.jpg',
        isFavorite: false
    },
    {
        id: 5,
        firstName: 'Ann',
        lastName: 'Schneider',
        phoneNumberHome: '9842235698',
        phoneNumberWork: '3854417899',
        phoneNumberCell: '3859478233',
        phoneNumberHusband: '3856951123',
        email: 'ann.schneider@mail.com',
        profilePhoto: '../../assets/images/ann_schneider.jpg',
        isFavorite: false
    }
];
