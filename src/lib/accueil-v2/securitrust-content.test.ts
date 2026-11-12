import { describe, expect, it } from "vitest";
import { contact, team } from "./securitrust-content";

describe("SecuriTrust contact rules", () => {
  it("uses the actual phone number", () => {
    expect(contact.phone).toBe("01 86 04 44 31");
    expect(contact.phoneHref).toBe("tel:+33186044431");
  });
  it("identifies only the real team", () => {
    expect(team.map(person => person.name)).toEqual(["Jad J.", "Brice G.", "Camelia M."]);
  });
});