const contentful = require("contentful");

//api for fetching all the ngos
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_DELIVERY,
});

export const ngo = async function getAllNgo() {
  const query = {
    content_type: "ngo",
    include: 10,
    select:
      "sys.createdAt,sys.id,fields.title,fields.description,fields.images,fields.category,fields.yearOfEstablish,fields.contact",

    "fields.isVerified": false,
  };
  try {
    const ngoList = await client.getEntries(query);
    // return response.items;
    return {
      total: ngoList.total,
      ngos: ngoList.items.map((ngoData) => {
        const { title, description, images, category ,yearOfEstablish, contact } =
          ngoData.fields;
        const {id, createdAt: createdOn } = ngoData.sys;
        return {
          id,
          title,
          description,
          createdOn,
          images : images.map((image)=>({
            alt : image.fields.title,
            src : `https:${image.fields.file.url}`,
            height : image.fields.file.details.image.height,
            width : image.fields.file.details.image.width
          })),
          category:category.fields.categoryName,
          yearOfEstablish,
          contact,
        };
      }),
    };
    
  } catch (err) {
    return err.message;
  }
};



export const allTransaction = async()=>{
  const query = {
    content_type : 'transactionDetails',
    include : 10,

  }
}

