export type Social = {
    name: 'Twitter' | 'LinkedIn'|'Discord' | 'GitHub' | 'Instagram';
    url: string;
}

export const constants = {
    version: "1.0.0",
    email:'support@nerdz.com',
    phone:'+15551234567',
    address: '123 Main St, Anytown, USA',
    socials: [
        //todo update
        {
            name: 'Twitter',
            url: 'https://twitter.com/nerdz'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/company/nerdz'
        },
        // done
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/nerdz4u/'
        },
        {
            name: 'Discord',
            url: 'https://discord.gg/QXMuhDn3nu'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/nerdzOSS/'
        }
    ] as Social[]
}