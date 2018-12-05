
var account = {
    users:   []     //includes array of { user objects }
}

/*
 * Note: all common functionality should be moved to prototype chain for better performance and optimal storage
 */

// register user
account.register = ( user )  => {
    if(!user || !user.username || !user.password)      //mandatory fields check
        return false;
    
    const data_encrypted = token._encrypt(user.password);

    console.log('encrypted data: ' + data_encrypted);

    // search if username exists
    var user_inx = account._search_username( user );

    if( user_inx == -1 ) {   // new entry
        // store user data, synonymous to registering user
        account.users.push({
            name:       user.username,
            address:    user.address,
            email:      user.email,
            password:   data_encrypted
        });
    } else {    // entry exists, skip registration
        return false;
    }

    return true;
}

// deregister user
account.deregister = ( user )  => {
    if(!user || !user.username || !user.password)      //mandatory fields check
        return false;
    
    const data_encrypted = token._encrypt(user.password);

    console.log('encrypted data: ' + data_encrypted);

    // search if username exists
    var user_inx = account._search_username( user );

    if( user_inx >= 0 ) {   // entry exists
        // remove from registered users
        account.users.splice( user_inx, 1 );
    } else {    // entry exists, skip registration
        return false;
    }

    return true;
}

// find user by username, returns index (-1 means not found)
account._search_username = ( user )  => {
    if(!user || !user.username)
        return -1;
    
    console.log('search data: ' + user.username);

    // search user data
    for(var i=0; i<account.users.length; i++) {
        if(user.username === account.users[i].username)
            return i;
    }

    return -1;
}