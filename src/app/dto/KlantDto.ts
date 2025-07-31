export interface KlantDto {
  voornaam: string;
  achternaam: string;
  telefoonnummer: string;
  email: string;
  geboortedatum?: string;        // ISO‑datum, b.v. "1990-05-15"

  // Voor later, indien je toe wilt voegen:
  // rijbewijsNummer?: string;
  // rijbewijsBestandPad?: string;
  // adres?: {
  //   straat: string;
  //   huisnummer: string;
  //   postcode: string;
  //   woonplaats: string;
  //   land: string;
  // };
}
