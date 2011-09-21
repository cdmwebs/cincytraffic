couchapp = require('couchapp')
path = require('path')

ddoc =
  _id:'_design/app'
  rewrites: [
    {from:"/", to:'index.html'}
    {from:"/api", to:'../../'}
    {from:"/api/*", to:'../../*'}
    {from:"/*", to:'*'} ]

ddoc.views =
  byName:
    map: (doc) -> emit(doc.name, null) if doc.name?

ddoc.validate_doc_update = (newDoc, oldDoc, userCtx) ->
  if (newDoc._deleted == true && userCtx.roles.indexOf('_admin') == -1)
    throw "Only admin can delete documents on this database."

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'))
module.exports = ddoc
