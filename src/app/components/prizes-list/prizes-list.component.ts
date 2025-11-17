import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrizeService } from '../../services/prize.service';
import { Prize } from '../../models';

@Component({
  selector: 'fg-prizes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prizes-list.component.html',
  styleUrl: './prizes-list.component.scss'
})
export class PrizesListComponent implements OnInit {
  prizes: Prize[] = [];

  constructor(
    private prizeService: PrizeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prizes = this.prizeService.getAllPrizes();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
