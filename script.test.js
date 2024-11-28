import { saveToLocalStorage, loadSignups } from './script';
 
describe("Event Signup Component", () => {
    beforeEach(() => {
        localStorage.clear();
    });
 
    test("Save data to localStorage", () => {
        const signup = { eventName: "Event 1", representativeName: "Alice", representativeEmail: "alice@example.com", role: "sponsor" };
        saveToLocalStorage(signup);
 
        const data = JSON.parse(localStorage.getItem("eventSignups"));
        expect(data).toContainEqual(signup);
    });
 
    test("Load data from localStorage", () => {
        const signups = [{ eventName: "Event 2", representativeName: "Bob", representativeEmail: "bob@example.com", role: "organizer" }];
        localStorage.setItem("eventSignups", JSON.stringify(signups));
 
        document.body.innerHTML = `<table><tbody></tbody></table>`;
        loadSignups();
 
        const tableRows = document.querySelectorAll("tbody tr");
        expect(tableRows.length).toBe(1);
    });
});