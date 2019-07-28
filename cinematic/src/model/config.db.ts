import MongoClient, { MongoClientOptions } from 'mongodb';

// here we create the url connection string that the driver needs
const getMongoURL = (options: any) => {
  const url = options.servers
  .reduce((prev: any, cur: any) => prev + `${cur.ip}:${cur.port},`, 'mongodb://')
  
  return `${url.substr(0, url.length - 1)}/${options.db}`
}

// mongoDB function to connect, open and authenticate
const connect = (options: any, mediator: any) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(getMongoURL(options), {
      db: options.dbParameters(),
      server: options.serverParameters(),
      replset: options.replsetParameters(options.repl)
    } as MongoClientOptions , (err, db: any) => {
      if (err) {
        mediator.emit('db.error', err)
      }

      db.admin().authenticate(options.user, options.pass, (err: any, result: any) => {
        if (err) {
          mediator.emit('db.error', err)
        }
        mediator.emit('db.ready', db)
      })
    })
  })
}

module.exports = Object.assign({}, { connect })