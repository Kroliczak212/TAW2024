const { dataEndpoint } = require("./data.endpoint");

const routes = function (router)
{
    dataEndpoint(router);
};

module.exports = {
    routes,
}