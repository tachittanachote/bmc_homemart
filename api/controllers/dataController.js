const db = require("../db_connection");
require('dotenv').config();

//User
exports.registerUser = (user, password) =>{
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO USERS(username, password) VALUES(?, ?)`,
      [
        user,
        password
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  })
}

exports.findUserByUsername = (username) =>{
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE username = ?`, [username], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.updatePasswordByUsername = (username, password) =>{
  return new Promise((resolve, reject) => {
    db.query(`UPDATE users SET password = ? WHERE username = ?`, [password, username], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.loginUser = (user) =>{

}

//Catagories
exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, title_thai, title_english FROM categories`, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM categories WHERE id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

//Types
exports.getTypes = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM types`, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getTypeById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM types WHERE id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getTypeByCategoryId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM types WHERE category_id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

//Products
exports.countProducts = () =>{
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as count FROM products`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products`, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithDeatil = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products p JOIN details d ON d.product_id = p.id`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithDeatilTH = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products p JOIN details d ON d.product_id = p.id WHERE d.language = ?`,['THAI'], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithDeatilEN = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products p JOIN details d ON d.product_id = p.id WHERE d.language = ?`,['ENGLISH'], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductByKey = (key) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE product_key = ?`, [key], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductKeyById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT product_key FROM products WHERE id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductWithDetailById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products p JOIN details d ON d.product_id = p.id WHERE p.id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductWithDetailAndImagesById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products p JOIN details d ON d.product_id = p.id JOIN images i ON i.product_id = p.id WHERE p.id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};


exports.getProductByTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE type_id = ?`, [tid], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};


exports.getProductsWithNameByTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT p.id, p.product_key, d.name as name, d2.name as name2 FROM products p 
      JOIN details d ON d.product_id = p.id 
      JOIN details d2 ON d.product_id = d2.product_id
      WHERE p.type_id = ? AND d.language <> d2.language AND d.id < d2.id
      ORDER BY p.id
    `, [tid], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithNameTHByTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT p.id, d.name, d.product_id FROM products p JOIN details d ON d.product_id = p.id WHERE p.type_id = ? AND d.language = ?`, [tid, "THAI"], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithNameENByTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT p.id, d.name, d.product_id FROM products p JOIN details d ON d.product_id = p.id WHERE p.type_id = ? AND d.language = ?`, [tid, "ENGLISH"], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithDeatilByTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT d.*, i.* FROM products p JOIN details d ON d.product_id = p.id JOIN (SELECT DISTINCT product_id, name as image_name FROM images GROUP BY product_id) i ON d.product_id = i.product_id WHERE p.type_id = ?`, [tid], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithDeatilTHByTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products p JOIN details d ON d.product_id = p.id WHERE p.type_id = ? AND d.language = ?`, [tid, "THAI"], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProductsWithDeatilENByTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products p JOIN details d ON d.product_id = p.id WHERE p.type_id = ? AND d.language = ?`, [tid, "ENGLISH"], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.createProduct = (key, link, recommend, typeId) =>{
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO products(product_key, shopee_link, recommend, type_id) VALUES(?, ?, ?, ?)`, [key, link, recommend, typeId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.updateProductKey = (id, key) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE products SET product_key = ? WHERE id = ?`, [key, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.updateProduct = (id, link, recommend) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE products SET shopee_link = ?, recommend = ? WHERE id = ?`, [link, recommend, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.deleteProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM products WHERE id = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

//Images
exports.getImages = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM images`, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getImageByProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM images WHERE product_id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getImageNameByProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, name FROM images WHERE product_id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.createImage = (name, productId) =>{
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO images(name, product_id) VALUES(?, ?)`, 
    [
      name,	
      productId
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.deleteImageById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM images WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.deleteImageByProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM images WHERE product_id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

//Deatils
exports.getDetails = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM details`, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getDetailsTH = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM details WHERE language = ?`,
      ["THAI", id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getDetailsEN = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM details WHERE language = ?`,
      ["ENGLISH"],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getDetailByProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM details WHERE products_id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getDetailTHByProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM details WHERE language = ? AND d.products_id = ?`,
      ["THAI", id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getDetailENByProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM details WHERE language = ? AND d.products_id = ?`,
      ["ENGLISH", id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.createDetailTH = (name,	price, brand, color, size, unit, material, status,	description, property, delivery, productId) =>{
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO details(name,	price, brand, color,	size, unit, material,	status,	description, property, delivery, language, product_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      name,	
      price, 
      brand,
      color,	
      size,	
      unit,
      material,	
      status,
      description, 
      property, 
      delivery,
      "THAI", 
      productId
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.createDetailENG = (name,	price, brand, color, size, unit, material, status,	description, property, delivery, productId) =>{
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO details(name,	price, brand, color,	size, unit, material,	status,	description, property, delivery, language, product_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      name,	
      price, 
      brand,
      color,	
      size,	
      unit,	
      material,
      status,	
      description, 
      property, 
      delivery, 
      "ENGLISH",
      productId
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.updateDeatail = (id, name,	price, brand, color,	size, unit, material,	status,	description, property, delivery) =>{
  return new Promise((resolve, reject) => {
    db.query(`UPDATE details SET name = ?,	price= ?, brand= ?, color= ?,	size= ?, unit= ?, material= ?,	status= ?,	description= ?, property= ?, delivery= ? WHERE id = ?`, 
    [
      name,	
      price, 
      brand,
      color,	
      size,	
      unit,
      material,
      status,	
      description, 
      property, 
      delivery, 
      id
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.deleteDetailsByProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM details WHERE product_id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

//slide-show
exports.getSlides = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM slide`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getSlideById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM slide WHERE id = ?`,[id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};


exports.updateSlide = (id, title_thai, subtitle_thai, title_english, subtitle_english, link, image) =>{
  return new Promise((resolve, reject) => {
    db.query(`UPDATE slide SET title_thai= ?, subtitle_thai= ?, title_english= ?, subtitle_english= ?, link= ?, image= ? WHERE id= ?`, 
    [
      title_thai, 
      subtitle_thai, 
      title_english, 
      subtitle_english, 
      link, 
      image,
      id
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.createSlide = (title_thai, subtitle_thai, title_english, subtitle_english, link, image) =>{
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO slide (title_thai, subtitle_thai, title_english, subtitle_english, link, image)  VALUES(?, ?, ?, ?, ?, ?)`, 
    [
      title_thai, 
      subtitle_thai, 
      title_english, 
      subtitle_english, 
      link, 
      process.env.url + '/uploads/' + image
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.deleteSlideById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM slide WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};


//promotions
exports.getPromotions = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM promotions`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getPromotionById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM promotions WHERE id = ?`,[id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.createPromotion = (name, image, product_id) =>{
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO promotions (name, image, product_id)  VALUES(?, ?, ?)`, 
    [
      name, 
      image,
      product_id
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.updatePromotion = (id, name, image) =>{
  return new Promise((resolve, reject) => {
    db.query(`UPDATE promotions SET name = ?, image = ? WHERE id= ? `, 
    [
      name, 
      image,
      id
    ], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.deletePromotionById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM promotions WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getRecommendsWithProductsDetails = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT d.*, d.name as thumbnailLabel, i.*, p.*, t.* FROM products p 
      JOIN details d ON d.product_id = p.id 
      JOIN (SELECT DISTINCT product_id, name as original, name as thumbnail FROM images GROUP BY product_id) i ON d.product_id = i.product_id 
      JOIN types t ON t.id = p.type_id
      WHERE p.recommend = ?`
      ,
      ["TRUE"],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getRecommendsWithProductsDetailsWithTypeId = (tid) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT d.*, d.name as thumbnailLabel, i.*, p.*, t.* FROM products p 
      JOIN details d ON d.product_id = p.id 
      JOIN (SELECT DISTINCT product_id, name as original, name as thumbnail FROM images GROUP BY product_id) i ON d.product_id = i.product_id 
      JOIN types t ON t.id = p.type_id
      WHERE p.recommend = ? AND p.type_id = ?
      `
      ,
      [
        "TRUE", 
        tid
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.getPromotionsWithProductsDetails = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT d.*, i.*, pm.*, pm.name as promotion_name, p.*, d.name as product_name, t.* FROM products p 
      JOIN promotions pm ON pm.product_id = p.id 
      JOIN types t ON t.id = p.type_id
      JOIN details d ON d.product_id = p.id 
      JOIN (SELECT DISTINCT product_id, name as image_name FROM images GROUP BY product_id) i ON d.product_id = i.product_id`
      ,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};