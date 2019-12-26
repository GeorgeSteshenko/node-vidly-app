module.exports = function (handler) {
    retrun async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch(ex) {
            next(ex);
        }
    };
}