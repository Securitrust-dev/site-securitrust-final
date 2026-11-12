import { describe, expect, it, vi } from "vitest";
import { contactSchema, sendContact } from "./securitrust-contact";

const input = { name: "Client Test", email: "client@example.fr", phone: "01 86 04 44 31", need: "Je dois me certifier" as const, consent: true as const, website: "" };
describe("Existing contact integration", () => {
  it("requires consent on submission", () => {
    expect(contactSchema.safeParse(input).success).toBe(true);
    expect(contactSchema.safeParse({ ...input, consent: false }).success).toBe(false);
  });
  it("limits names to 100 characters and emails to 255", () => {
    expect(contactSchema.safeParse({ ...input, name: "a".repeat(101) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...input, email: `${"a".repeat(250)}@example.fr` }).success).toBe(false);
  });
  it("rejects invalid email, name and unknown need", () => {
    for (const change of [{ email: "invalid" }, { name: "<script>" }, { name: "\n" }, { need: "unknown" }]) expect(contactSchema.safeParse({ ...input, ...change }).success).toBe(false);
  });
  it("blocks spam honeypot submissions", () => {
    expect(contactSchema.safeParse({ ...input, website: "spam" }).success).toBe(false);
  });
  it("does not send preview leads to the production service", async () => {
    const fetcher = vi.fn();
    await expect(sendContact(input, "http://localhost:8080", "token", fetcher)).rejects.toThrow("intégration");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("requires an anti-spam token on the official site", async () => {
    const fetcher = vi.fn();
    await expect(sendContact(input, "https://www.securitrust.fr", "", fetcher)).rejects.toThrow("anti-spam");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("posts the qualified request to the current /api/contact", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ leadId: "test-lead" }));
    await expect(sendContact(input, "https://www.securitrust.fr", "captcha-token", fetcher)).resolves.toEqual({ leadId: "test-lead" });
    const call = fetcher.mock.calls[0];
    if (!call) throw new Error("Expected a contact request");
    expect(call[0]).toBe("/api/contact");
    const body = JSON.parse(call[1].body);
    expect(body.message).toBe("Besoin : Je dois me certifier");
    expect(body.turnstileToken).toBe("captcha-token");
    expect(body.consent).toBe(true);
  });
  it("never reports success for a refused request", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 422 }));
    await expect(sendContact(input, "https://www.securitrust.fr", "token", fetcher)).rejects.toThrow("professionnelle");
  });
});