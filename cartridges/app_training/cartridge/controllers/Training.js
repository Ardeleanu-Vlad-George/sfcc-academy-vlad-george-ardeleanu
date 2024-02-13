
const server = require('server');

//don't forget to access by <base-site-URL> / <ControllerName> - <GivenPath>
server.get('HelloWorld', function (req, res, next) {

    res.render('training/hello_world', {
        message : "Hello World!"
    });

    return next();
});

server.get('SessionVariable', function(req, res, next){
    res.render('training/session_var')
    return next();
});


server.get('ShowProduct', function(req, res, next){
    const ProductMgr = require('dw/catalog/ProductMgr');

    const selected = ProductMgr.getProduct(req.querystring.pid);

    res.render('training/finding_product', {
        givenID : req.querystring.pid,
        found : !selected ? "NO" : "YES",
        product : selected
    });

    return next();
});


server.get('TestDecorator', function(req, res, next){
    res.render('training/test_decorator');
    return next();
});

server.get('BasketList', function(req, res, next){
    const BasketMgr = require('dw/order/BasketMgr');
    const currentBasket = BasketMgr.getCurrentBasket();
    res.render('training/basket_list', {
        basket : currentBasket
    });
    return next();
});

module.exports = server.exports();