const db = require('../../database/config');

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

export default class Model {
    table = ''
    timestamp = this.timestamp()
    constructor (fields) {
        this.fields = fields || '*'
    }


    timestamp () {
        var date = new Date()
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
    
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;
        sec = (sec < 10 ? "0" : "") + sec;
        const FullDate = date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
        return FullDate
    }

    /*
    |--------------------------------------------------------------------------
    | Get the related recoreds from the database
    |--------------------------------------------------------------------------
    |
    */

    async HasOne(table, key, userId) {
        try {
            key = key || '' + table + '_id'
            const operator = userId.id ? '=' : '!='
            userId = userId.id || ''
            return await db(this.table).select(this.fields)
            .innerJoin(table, this.table + '.id' , table + '.' + key)
            .first()
            .where(this.table + '.id', operator, userId)
            .first()
        } catch(err) {
            throw { type: "BadRequest", message: err.message }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Get the related recoreds from the database
    |--------------------------------------------------------------------------
    |
    */

    async HasMany(table, key, userId) {
        try {
            key = key || '' + table + '_id'
            const operator = userId.id ? '=' : '!='
            userId = userId.id || ''
            return await db(this.table).select(this.fields)
            .innerJoin(table, this.table + '.id' , table + '.' + key)
            .where(this.table + '.id', operator, userId)
            
        } catch(err) {
            throw { type: "BadRequest", message: err.message }
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Add a new record in the database
    |--------------------------------------------------------------------------
    |
    */

    async Create (Details) {
        try {
            const result = await db(this.table).insert(Details)
            return this.FindBy('id', result)
        } catch(err) {
            throw { type: "BadRequest", message: err.message }
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Get users in the Database based on the indentifier passed as args
    |--------------------------------------------------------------------------
    |
    */

    GetFieldValue (field, value) {
        try {
                return db(this.table).where(field, value)
                .select(this.fields)
                .first()
        } catch(err) {
            throw { type: "BadRequest", message: err.message }
        }
        
    }

    async FindBy (field, value) {
      try {
        return await this.GetFieldValue(field, value)
      }catch(err) {
          return false
      }
      
    }

    /*
    |--------------------------------------------------------------------------
    | Update record in the database based on id passed as parameter
    |--------------------------------------------------------------------------
    |
    */

    async GetAll(limit = 10, offset = 0, order = 'id') {
        try {
            return await db(this.table)
            .orderBy(order, 'asc')
            .limit(+limit)
            .offset(+offset)
            .select(this.fields)
        }catch(err) {
            return false
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Update record in the database based on id passed as parameter
    |--------------------------------------------------------------------------
    |
    */

    async Update (id, newDetails) {
       try {
         const result = await db(this.table).where('id', +id).first().update(newDetails)
         return this.FindBy('id', id)
       } catch(err) {
          throw { type: "BadRequest", message: err.message }
       }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete record in the database based on id passed as parameter
    |--------------------------------------------------------------------------
    |
    */

    async Delete (id) {
        try {
          await db(this.table).del().where('id', +id )
          return true
        } catch(err) {
           throw { type: "BadRequest", message: err.message }
        }
    }

    async Exists(condition) {
        try {
            const result = await db(this.table).select("*").where(condition)
            return result.length > 0
        }catch (err) {
            throw { type: "BadRequest", message: err.message }
        }
    }


}