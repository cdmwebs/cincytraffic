/**
 *
 * Backcouch.js (inspired by Backbone.couch.js - http://goo.gl/wIR5Z)
 * copyright 2011 Seth Baur
 * http://github.com/sethbaur/backcouch.js
 *
 * @version 0.1
 * @license GPLv3 - <http://www.gnu.org/licenses/>
 *
 **/
(function() {

    Backbone.couch = {

        // couchdb database name
        dbname: '',

        // couchdb design doc name
        design_doc: '',
        
        db: function(name) {
            if ( ! name) {
                name = this.dbname;
            }
            return $.couch.db(name);
        },

        // create or update object
        save: function(obj, options) {
            var that = this;
            if (obj.attributes.id) {
                delete obj.attributes.id;
            }
            this.db().saveDoc(obj, {
                success: function(data) {
                    // obj saved, fetch obj and set all attributes
                    that.db().openDoc(data.id, {
                        success: function(read_data) {
                            // set object id and all attributes
                            obj.id = read_data._id;
                            if (options.success) {
                                options.success(read_data);
                            }
                        },
                        error: function(read_error) {
                            // read error - callback
                            if (options.error) {
                                options.error(status);
                            }
                        }
                    });
                    
                },
                error: function(status) {
                    // error callback
                    if (options.error) {
                        options.error(status);
                    }
                }
            });
        },

        // destroy an object
        destroy: function(obj, options) {
            this.db().removeDoc(obj.attributes, {
                success: function(data) {
                    // success callback
                    if (options.success) {
                        options.success(data);
                    }
                },
                error: function(status) {
                    // error callback
                    if (options.error) {
                        options.error(status);
                    } 
                }
            });
        }, 

        // read from db, using object id
        read: function(obj, options) {
            var id;
            if (obj.id) {
                id = obj.id;
            } else if (obj.get('_id')) {
                id = obj.get('_id');
            }

            // is id set?
            if (id) {
                this.db().openDoc(id, {
                    success: function(data) {
                        // success callback
                        if (options.success) {
                            options.success(data);
                        }
                    },
                    error: function(status) {
                        // error callback
                        if (options.error) {
                            options.error(status);
                        }
                    }
                });
            }
        }, 

        // read from db all models for collection
        read_collection: function(obj, options) {
            // determine view name from collection url
            var collection_url = _.isFunction( obj.url ) ? obj.url() : obj.url,
                view = this.design_doc + collection_url;
            this.db().view(view, {
                success: function(data) {
                    var objects = [];
                    _.each(data.rows, function(row){
                        if ( ! row.value.id) row.value.id = row.value._id;
                        objects.push(row.value);
                    });
                    // success callback
                    if (options.success) {
                        options.success(objects);
                    }
                },
                error: function(status) {
                    // error callback
                    if (options.error) {
                        options.error(status);
                    } 
                },
                reduce: false
            });
        }
    };

    /**
     * Override for Backbone's sync function
     *
     * @param method ('create'|'update'|'read'|'delete')
     * @param obj the model or collection to sync
     * @param success callback
     * @param error callback
     **/
    Backbone.sync = function(method, obj, options) {
        if (method === 'create' || method === 'update') {
            Backbone.couch.save(obj, options);
        } else if (method === 'delete') {
            Backbone.couch.destroy(obj, options);
        } else if (method === 'read') {
            if (obj.model) {
                Backbone.couch.read_collection(obj, options);
            } else {
                Backbone.couch.read(obj, options);
            }
        }
    }

}) ();
