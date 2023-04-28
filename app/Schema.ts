import { gql } from "apollo-server-express";

const Schema = gql`
  type Department {
    id: ID!
    name: String!
  }

  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    jobTitle: String!
    department: Department!
    manager: Person
  }
  type Mutation {
    updatePerson(id: String, firstName: String, lastName: String, jobTitle: String, departmentId: String, managerId: String): Person
  }
  

  type Query {
    getAllPeople: [Person]
    getPerson(id: String): Person
    findPerson(firstName: String, lastName: String, jobTitle: String): [Person]
    getAllDepartments: [Department]
    getDepartment(id: String): Department
  }
`;

export default Schema;
