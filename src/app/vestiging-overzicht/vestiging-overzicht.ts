import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {VestigingDto} from '../dto/VestigingDto';
import {catchError, debounceTime, distinctUntilChanged, map, of, startWith, Subscription} from 'rxjs';
import {VestigingenService} from '../service/VestigingenService';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-vestiging-overzicht',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './vestiging-overzicht.html',
  styleUrl: './vestiging-overzicht.css'
})
export class VestigingOverzicht implements OnInit, OnDestroy {
  private vestigingenService = inject(VestigingenService);
  private subs = new Subscription();

  vestigingen: VestigingDto[] = [];
  filteredVestigingen: VestigingDto[] = [];

  searchCtrl = new FormControl<string>('', { nonNullable: true });

  async ngOnInit(): Promise<void> {
    this.vestigingen = await this.vestigingenService.getVestigingen();
    this.filteredVestigingen = this.vestigingen;

    const s = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(v => v.trim()),
      distinctUntilChanged(),
      debounceTime(0),
      map(q => this.filterByPlaats(q))
    ).subscribe(list => this.filteredVestigingen = list);

    this.subs.add(s);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  trackById = (_: number, v: VestigingDto) => v.id;

  ariaLabel(v: VestigingDto): string {
    const a = v.adres;
    return `Vestiging ${v.naam}, ${a.straat} ${a.huisnummer}, ${a.postcode} ${a.woonplaats}`;
  }

  clearSearch(): void {
    this.searchCtrl.setValue('');
  }

  private normalize(text: string): string { //Negeer trema’s en HOOFDLETTERS
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private filterByPlaats(query: string): VestigingDto[] {
    if (!query)
      return this.vestigingen;
    const q = this.normalize(query);
    return this.vestigingen.filter(v =>
      this.normalize(v.adres?.woonplaats || '').includes(q)
    );
  }
}
