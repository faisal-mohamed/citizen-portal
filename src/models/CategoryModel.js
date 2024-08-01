import { API, graphqlOperation } from "aws-amplify";
import { listCategories } from "../graphql/queries";

const category = {
  list: async () => {
    try {
      const category = await API.graphql(graphqlOperation(listCategories));
      return category.data.listCategories.items;
    } catch (error) {
      console.log(error);
    }
  },
};

export { category };
