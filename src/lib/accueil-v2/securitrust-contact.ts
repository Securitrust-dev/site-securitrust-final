import { z } from "zod/v3";

export const contactNeeds = ["Je dois me certifier", "Suis-je concerné par NIS2 / DORA ?", "Je veux tester ma sécurité", "J’ai un questionnaire à remplir", "J’ai besoin d’un RSSI"] as const;
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Indiquez votre nom et prénom.").max(100, "Votre nom est trop long.").regex(/^[^\u0000-\u001f\u007f<>]+$/, "Vérifiez votre nom."),
  email: z.string().trim().max(255, "Votre email est trop long.").email("Indiquez une adresse email valide."),
  phone: z.string().trim().max(30, "Votre numéro est trop long.").regex(/^[+\d ().-]*$/, "Vérifiez votre numéro de téléphone."),
  need: z.enum(contactNeeds, { errorMap: () => ({ message: "Choisissez votre priorité." }) }),
  consent: z.literal(true, { errorMap: () => ({ message: "Acceptez l’utilisation de vos coordonnées pour que nous puissions répondre à votre demande." }) }),
  website: z.string().max(0, "La demande n’a pas pu être envoyée."),
});
export type ContactInput = z.input<typeof contactSchema>;

export function isOfficialOrigin(origin: string) {
  return origin === "https://www.securitrust.fr" || origin === "https://securitrust.fr";
}

export async function sendContact(input: ContactInput, origin: string, token: string, request: typeof fetch = fetch) {
  const data = contactSchema.parse(input);
  if (!isOfficialOrigin(origin)) throw new Error("L’envoi nécessite l’intégration de cette page au site SecuriTrust. Vos informations n’ont pas été transmises. Contactez-nous par téléphone ou réservez un créneau.");
  if (!token) throw new Error("Validez la vérification anti-spam, puis réessayez.");
  const response = await request("/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, subject: "Demande de rappel sous 2h — Accueil", message: `Besoin : ${data.need}`, source: "Accueil — formulaire Être rappelé sous 2h", turnstileToken: token, consent: data.consent }),
  });
  if (!response.ok) throw new Error(response.status === 422 ? "Indiquez votre adresse email professionnelle : les adresses personnelles ou jetables ne sont pas acceptées." : "Votre demande n’a pas pu être envoyée. Réessayez ou contactez-nous par téléphone.");
  return response.json() as Promise<{ leadId?: string }>;
}