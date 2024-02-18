
const server = require('server');
const csrfProtection = require('*/cartridge/scripts/middleware/csrf');
const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.get(
    'ShowMyForm',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function(req, res, next){
        const urlUtils = require('dw/web/URLUtils');
        const Resource = require('dw/web/Resource');

        const formData = server.forms.getForm('myform');
        formData.clear(); //clear the value of the fields

        res.render(
            'training/myform',
            {
                title : Resource.msg('training.myform.title.submit', 'forms', null),
                formData : formData,
                actionUrl : urlUtils.url('Training-DataFromMyForm').toString()
            }
        );
        next();
    }
);

server.get(
    'SitePreference',
    function(req, res, next){
        const Site = require('dw/system/Site');

        res.render('training/site_preference',{
            keys : Object.keys(Site.getCurrent().getPreferences()),

            pref : Site.getCurrent().getPreferences()
        });

        next();
    }
);

server.post(
    'DataFromMyForm',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function(req, res, next){
        //so you get the form by name, name established from the cartridge/forms/default/.xml file
        //and yes you need to go trough all of those members
        //first through the group, than to the actual field, than you need to access .value
        const form = server.forms.getForm('myform');

        res.render('training/myform_data', {
            form : form
        });
        next();
    }
);


server.get(
    'ShowExampleForm',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next){
        const urlUTILS = require('dw/web/URLUtils');
        const Resource = require('dw/web/Resource');

        var profileForm  = server.forms.getForm('training');
        profileForm.clear();

        res.render('training/trainingform', {
            title : Resource.msg('training.form.title.submit', 'forms', null),
            profileForm : profileForm,
            actionUrl : urlUTILS.url('Training-SubmitRegistrationFromExampleForm').toString()
        });

        next();
    }
);


server.post(
    'SubmitRegistrationFromExampleForm',
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function(req, res, next){
        const Resource = require('dw/web/Resource');
        const urlUtils = require('dw/web/URLUtils');

        const profileForm = server.forms.getForm('training');

        res.render('training/trainingform',{
            title : Resource.msg('training.form.title.edit', 'forms', null),
            profileForm : profileForm,
            actionUrl : urlUtils.url('Training-SubmitRegistrationFromExampleForm').toString()
        });

        next();
    }
);

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

server.get('ContentAsset', function(req, res, next){
    res.render('training/content_asset');
    return next();
});


server.get('AssetsFromMyFolder', function(req, res, next){
    const dw = require('dw');
    let assetsFolder = dw.content.ContentMgr.getFolder('student_guide_folder');
    if(!empty(assetsFolder)){
        let assetMap = assetsFolder.getOnlineContent();
        if(assetMap.size() > 0){
            let assets = new dw.util.ArrayList();
            for(let i=0; i < assetMap.size(); i++){
                assets.add(assetMap[i].getID());
            }
            res.render('training/folder_of_assets', {
                assets : assets
            });
        }
    }
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