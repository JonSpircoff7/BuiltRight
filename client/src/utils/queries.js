import { gql } from "@apollo/client";

export const QUERY_EXERCISES = gql`
  query getProducts($bodypart: ID) {
    products(bodypart: $bodypart) {
      _id
      name
      description
      price
      quantity
      image
      bodypart {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_EXERCISES = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      bodypart {
        name
      }
    }
  }
`;

export const QUERY_BODYPARTS = gql`
  {
    bodyparts {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
