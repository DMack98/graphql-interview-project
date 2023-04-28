import { findPersonQuery, getAllDepartmentsQuery, getAllPeopleQuery, getDepartmentQuery, getPersonQuery, updatePersonMutation } from "./queries";
import { people } from "./dataset";

const cleanPeople = JSON.parse(JSON.stringify(people));

describe("People Queries Suite", () => {
  test('gets all people from dataset', () => {
    const people = getAllPeopleQuery();
    expect(people.length).toBe(100);
  });
  
  test('gets all people with jobTitle of "CEO"', () => {
    const people = findPersonQuery(null, { jobTitle: "CEO" });
    expect(people.length).toBe(1);
    expect(people[0].jobTitle).toBe("CEO");
    expect(people[0].firstName).toBe("Orval");
  });
  
  test('Should return Stanley', () => {
    const person = getPersonQuery(null, { id: "46956d54-093b-47c0-9c15-e1c512e0c155" });
    expect(person.firstName).toBe("Stanley");
    expect(person.lastName).toBe("Bergstrom");
  })
  
  test("Should return Bergstron, Then mutate to be Smith", () => {
    const person = getPersonQuery(null, { id: "46956d54-093b-47c0-9c15-e1c512e0c155" });
    expect(person.lastName).toBe("Bergstrom");
    const updatePerson = updatePersonMutation(null, { id: "46956d54-093b-47c0-9c15-e1c512e0c155", lastName: "Smith" });
    expect(updatePerson.lastName).toBe("Smith");
  });
  
  test("Should return Stanley's Manager as Asia, then mutate to be Orval", () => {
    const person = getPersonQuery(null, { id: "46956d54-093b-47c0-9c15-e1c512e0c155" });
    expect(person.manager.firstName).toBe("Asia");
    expect(person.manager.jobTitle). toBe("Dynamic Branding Orchestrator");
    const updatePerson = updatePersonMutation(null, { id: "46956d54-093b-47c0-9c15-e1c512e0c155", managerId: "2798c35b-5b8f-4a5d-9858-0a818d48cbef" });
    expect(updatePerson.manager.firstName).toBe("Orval");
    expect(updatePerson.manager.jobTitle).toBe("CEO");
  });
  test("Expect Francisco's manager's manager's manager to be Orval", () => {
    const person = getPersonQuery(null, { id: "a8f51791-9a06-46a3-a125-f14bdf401e55" });
    expect(person.firstName).toBe("Francisco");
    expect(person.manager.firstName).toBe("Hilma");
    expect(person.manager.manager.firstName).toBe("Stanley");
    expect(person.manager.manager.manager.firstName).toBe("Orval");
  });
  test("Expect Francisco's manager's manager's manager to be in the Management department", () => {
    const person = getPersonQuery(null, { id: "a8f51791-9a06-46a3-a125-f14bdf401e55" });
    expect(person.firstName).toBe("Francisco");
    expect(person.manager.firstName).toBe("Hilma");
    expect(person.manager.manager.firstName).toBe("Stanley");
    expect(person.manager.manager.manager.firstName).toBe("Orval");
    expect(person.manager.manager.manager.department.name).toBe("Management");
  });
  
  test("Expect to Find Orval when looking for CEO", () => {
    const people = findPersonQuery(null, { jobTitle: "CEO" });
    expect(people.length).toBe(1);
    expect(people[0].jobTitle).toBe("CEO");
    expect(people[0].firstName).toBe("Orval");
  });
});

describe("Department Queries Suite", () => {
  test("Expect to find 7 departments", () => {
    const departments = getAllDepartmentsQuery();
    expect(departments.length).toBe(7);
  })
  
  test("Expect to find the Engineering department", () => {
    const department = getDepartmentQuery(null, { id: "920a774e-617a-4a5b-82ea-8205c18eef75" });
    expect(department?.name).toBe("Engineering");
  });
});
