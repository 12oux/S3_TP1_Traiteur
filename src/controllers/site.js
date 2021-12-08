

exports.getHomepage = (req, res, next) => {
    res.render("main", { title: "Chez bRoux" });
  };

  
exports.getMenu = (req, res, next) => {
    res.render("menu", {title: "Menu"
      })};
