'use strict';

const server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    let viewData = res.getViewData(); // get original 

    viewData.addedField = 'Value of added field, in heading 3 tags'; //add new field

    res.setViewData(viewData);

    return next();
})


module.exports = server.exports();