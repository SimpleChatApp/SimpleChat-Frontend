
export function GenerateAPIRoutes(host: string): APIRoutes{
    const apiUrl = host + '/api';
    const authentications = apiUrl + '/authentications';
    const tokens = apiUrl + '/tokens';
    const searches = apiUrl + '/searches';
    const chatRooms = apiUrl + '/chatrooms';
    const users = apiUrl + '/users';
    const messages = apiUrl + '/messages';

    return {
        hostAddress: host,
        baseUrl: apiUrl,

        health: host + '/health',
        auth: {
            createToken: tokens + '/create',
            register: authentications + '/register',
            isUserExist: authentications + '/isuserexist?username={userName}&email={eMail}',
            refresh: tokens + '/refresh',
            revoke: tokens + '/revoke',
            validate: tokens + '/validate'
        },
        search: {
            baseUrl: searches
        },
        chatRoom: {
            baseUrl: chatRooms,
            messages: chatRooms + '/{id}/messages',
            users: chatRooms + '/{id}/users',
        },
        user: {
            baseUrl: users
        },
        message: {
            baseUrl: messages
        }
    };
}

export interface APIRoutes {
    hostAddress: string;
    baseUrl: string;

    health: string;
    auth: {
        createToken: string,
        register: string,
        isUserExist: string,
        refresh: string,
        revoke: string,
        validate: string
    };
    search: {
        baseUrl: string
    };
    chatRoom: {
        baseUrl: string,
        messages: string,
        users: string,
    };
    user: {
        baseUrl: string
    };
    message: {
        baseUrl: string
    };
}
