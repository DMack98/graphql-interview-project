import {
  findPersonQuery,
  getAllDepartmentsQuery,
  getAllPeopleQuery,
  getDepartmentQuery,
  getPersonQuery,
  updatePersonMutation,
} from "./queries";

const Resolvers = {
  Query: {
    getAllPeople: getAllPeopleQuery,
    getPerson: getPersonQuery,
    findPerson: findPersonQuery,
    getAllDepartments: getAllDepartmentsQuery,
    getDepartment: getDepartmentQuery,
  },
  Mutation: {
    updatePerson: updatePersonMutation
  },
};

export default Resolvers;
