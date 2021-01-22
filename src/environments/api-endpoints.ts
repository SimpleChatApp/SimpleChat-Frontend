
export function GenerateRoutes(apiUrl: string): any {
    return {
        baseUrl: apiUrl,

        products: {
            baseUrl: apiUrl + '/product'
        },
        customers: {
            baseUrl: apiUrl + '/customer'
        },
        users: {
            baseUrl: apiUrl + '/user'
        },
        auth: {
            token: apiUrl + '/authentication/CreateToken',
            register: apiUrl + '/authentication/register'
        }
    };
}
