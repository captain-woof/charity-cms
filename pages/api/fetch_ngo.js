const contentful = require("contentful");

//api for fetching all the ngos
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_DELIVERY,
});

const ngo = async function getAllNgo() {
  const query = {
    content_type: "ngo",
    include: 10,
    select:
      "sys.createdAt,sys.id,fields.title,fields.description,fields.images,fields.yearOfEstablish,fields.contact",

    "fields.isVerified": true,
  };
  try {
    const ngoList = await client.getEntries(query);
    // return response.items;
    const ngoData = {
      total: ngoList.total,
      ngos: ngoList.items.map((ngoData) => {
        const { title, description, images, yearOfEstablish, contact } =
          ngoData.fields;
        const { createdAt: createdOn } = ngoData.sys;
        return {
          title,
          description,
          images,
          yearOfEstablish,
          contact,
        };
      }),
    };
    return ngoData;
  } catch (err) {
    return err.message;
  }
};

export default ngo;
