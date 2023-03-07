//showing the home page
exports.home = (req, res, next) => {
   res.render('index');
};
//showing the about page
exports.about = (req, res, next) => {
    res.render('about');
 };
 //showing the contact page
 exports.contact = (req, res, next) => {
    res.render('contact');
 };