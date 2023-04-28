import { departments, people } from './dataset';


const resolveDepartment = (person: any) => {
  return departments.find(department => department.id === person.departmentId);
};

const resolveManager = (person: any) => {
  const { managerId } = person;
  if (!managerId) return null;
  const manager: any = people.find(person => person.id === managerId);
  manager.department = resolveDepartment(manager);
  manager.manager = resolveManager(manager);
  return manager;
};




export const getAllPeopleQuery = () => {
  const finalPeople = people.map(person => {
    const finalPerson: any = {
      ...person,
      department: resolveDepartment(person),
      manager: resolveManager(person)
    };
    return finalPerson;
  });
  return finalPeople;
};

export const getPersonQuery = (_: any, args: any) => {
  const { id } = args;
  const foundPerson = people.find(person => person.id === id);
  if (!foundPerson) return null;
  const finalPerson: any = {
    ...foundPerson,
    department: resolveDepartment(foundPerson),
    manager: resolveManager(foundPerson)
  };
  return finalPerson;
};

export const findPersonQuery = (_: any, args: any) => {
  const { firstName, lastName, jobTitle } = args;
  const filteredResults =  people.filter(person => {
    if (firstName && person.firstName !== firstName) return false;
    if (lastName && person.lastName !== lastName) return false;
    if (jobTitle && person.jobTitle !== jobTitle) return false;
    return true;
  });
  const finalPeople = filteredResults.map(person => {
    const finalPerson: any = {
      ...person,
      department: resolveDepartment(person),
      manager: resolveManager(person)
    };
    return finalPerson;
  });
  return finalPeople;
}

export const getAllDepartmentsQuery = () => {
  return departments;
}

export const getDepartmentQuery = (_: any, args: any) => {
  const { id } = args;
  const foundDepartment = departments.find(department => department.id === id);
  return foundDepartment;
}

export const updatePersonMutation = (_: any, args: any) => {
  const { id, firstName, lastName, jobTitle, departmentId, managerId } = args;
  const foundPerson = people.find(person => person.id === id);
  if (!foundPerson) return null;
  if (firstName) foundPerson.firstName = firstName;
  if (lastName) foundPerson.lastName = lastName;
  if (jobTitle) foundPerson.jobTitle = jobTitle;
  if (departmentId) foundPerson.departmentId = departmentId;
  if (managerId) foundPerson.managerId = managerId;
  const finalPerson: any = {
    ...foundPerson,
    department: resolveDepartment(foundPerson),
    manager: resolveManager(foundPerson)
  };
  return finalPerson;
}
