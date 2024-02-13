'use strict';

const server = require('server');
/*
//This syntax worked when the controller files had the same name
server.extend(module.superModule);
//The syntax located below is now used
*/

//OBS: The new controller name is reflected in the path
const baseContr = require('app_storefront_base/cartridge/controllers/Cart');
server.extend(baseContr);

server.append('Show', function (req, res, next) {
    let viewData = res.getViewData(); // get original

    viewData.addedField = 'The base controller was extended'; //add new field

    res.setViewData(viewData);

    return next();
})


module.exports = server.exports();