// src/app/models/register.dto.ts

import { KlantDto } from './KlantDto';

export interface RegisterDto {
  loginNaam: string;
  password: string;
  klant: KlantDto;
}
