import productsAPI from "../api/productApi.js";

const getNamebyIDProduct = async (id) => {
    const result = await productsAPI.getProductById(id);
    // console.log(result[0].title);
   let name =result[0].title
    console.log(result[0].title);


    return name;
}

export default getNamebyIDProduct