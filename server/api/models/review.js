
const db = require('../../database/config');
const bcrypt = require('bcrypt');

/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
|
*/

exports.get_reviews = (req) => {
    return new Promise((resolve, reject) => {
        db('review')
        .select("*")
        .where('user_id', 2)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}

/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
|
*/

exports.get_review = (req) => {
    return new Promise((resolve, reject) => {
        db('review')
        .select("*")
        .where('listing_id', 2)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })       
}


/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
|
*/

exports.add_reviews = (req, data) => {
    return new Promise((resolve, reject) => {
        db('review')
        .insert(data)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })       
}


/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
|
*/

exports.update_reviews = (req, review_id, new_review) => {
    return new Promise((resolve, reject) => {
        db('review')
        .where('id', review_id)
        .update(new_review)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}

/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
|
*/

exports.delete_reviews = (req, review_id) => {
    return new Promise((resolve, reject) => {
        db('review')
        .where('id', review_id)
        .del()
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}



