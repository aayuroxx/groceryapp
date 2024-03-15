using grocery_app.API.Models;
using System;

namespace grocery_app.API.DataAccess
{
    public interface IDataAccess
    {
        List<ProductCategory>GetProductCategories();
        ProductCategory GetProductCategory(int id);
        Offer GetOffer(int id);
        List<Product> GetProducts(string category, string subcategory, int count);
        Product GetProduct(int id);
        bool InsertUser(User user);

        string IsUserPresent(string email, string password);
        bool InsertCartItem(int userId, int productId);
        User GetUser(int id);
        Cart GetActiveCartOfUser(int userid);
        Cart GetCart(int cartid);
    }
}
