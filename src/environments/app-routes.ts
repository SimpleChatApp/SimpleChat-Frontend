
export function GenerateAppRoutes(): any {
    return {
        baseUrl: '',
        search: {
            baseUrl: '/search',
        },
        chat: {
            baseUrl: '/chat',
            roomList: '/chat/rooms'
        },
        user: {
            baseUrl: '/user',
            profile: '/user/profile'
        },
        auth: {
            baseUrl: '/auth',
            login: '/auth/login',
            register: '/auth/register',
            forgottenPassword: '/auth/forgottenPassword',
            changePassword: '/auth/changePassword',
            emailVerification: '/auth/emailVerification'
        },
        shared: {
            baseUrl: '/shared'
        }
    };
}
