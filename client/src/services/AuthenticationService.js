//this file is used for hitting that register endpoint

import api from '@/services/api';

export default {
    //have an object which allows us to call a register method which will hit the register endpoint
    register (credentials) {
        return api().post('register', credentials)
    }
}

// example: to call a method from another file
// AuthenticationService.register({
//     email: 'testing@gmail.com',
//     password: '123456'
// })