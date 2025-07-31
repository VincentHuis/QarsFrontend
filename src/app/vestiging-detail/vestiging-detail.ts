import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VestigingenService } from '../service/VestigingenService';
import {VestigingDto} from '../dto/VestigingDto';

@Component({
  selector: 'app-vestiging-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vestiging-detail.html',
  styleUrls: ['./vestiging-detail.css']
})
export class VestigingDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(VestigingenService);

  loading = true;
  error: string | null = null;
  v!: VestigingDto;

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isFinite(id)) {
      this.error = 'Ongeldige vestiging-id';
      this.loading = false;
      return;
    }

    try {
      this.v = await this.service.getVestiging(id);
    } catch (e: any) {
      this.error = e?.status === 404
        ? 'Vestiging niet gevonden'
        : 'Er ging iets mis bij het laden';
    } finally {
      this.loading = false;
    }
  }

  back(): void {
    this.router.navigate(['/vestigingen']);
  }
}
