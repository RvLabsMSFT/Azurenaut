/**
 * Service config properties
 * 
 * API configsf
 * 
 */

export const b2cTenant = { 
    clientId: 'dc8849d0-2a84-45ed-a2d1-2a603ec8c0c7',
    authorityDomain: 'b2crvlabs.onmicrosoft.com',
    policies: {
        names: {
            signUpSignIn: 'B2C_1_gh54_susi',
            promoSusi: 'B2C_1A_signup_signin'
        },
        authorities: {
            signUpSignIn: {
                authority: 'https://b2crvlabs.b2clogin.com/b2crvlabs.onmicrosoft.com/B2C_1_gh54_susi'
            },
            promoSusi: {
                authority: 'https://b2crvlabs.b2clogin.com/b2crvlabs.onmicrosoft.com/B2C_1A_signup_signin'
            }
        }
    }

};

export const apiConfig: {scopes: string[]; uri: string} = {
    scopes: ['https://b2crvlabs.onmicrosoft.com/api-gh54/gh54.read'],
    uri: '/'
};
