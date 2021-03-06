/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  
  /***************************************************************************
   * Path to the public folder
   * Can be accessed as sails.config.paths.public
   ***************************************************************************/
  paths: {
    public: __dirname + '/../../views/dist' // or wherever
  },

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'localDiskDb'
  },

  // session: {
  //   adapter: 'connect-mongo',
  //   url: process.env.MONGODB_URI
  // }

};
