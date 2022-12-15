import { gql } from "@apollo/client";

export const QUERY_EXERCISES = gql`
  query getExercises($bodypart: ID) {
    exercises(bodypart: $bodypart) {
      _id
      name
      description
      instruction
      weight
      image
      bodypart {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($exercises: [ID]!) {
    checkout(exercises: $exercises) {
      session
    }
  }
`;

export const QUERY_ALL_EXERCISES = gql`
  {
    exercises {
      _id
      name
      description
      instruction
      weight
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
query User {
  user {
    _id
    firstName
    lastName
    email
    orders {
      exercises {
        _id
        name
        instructions
        weight
        image
        difficulty
        reps
        sets
      }
    }
  }
}
`;
