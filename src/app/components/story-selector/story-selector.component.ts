import { Component, OnInit } from '@angular/core';
import { Story } from '../../models';
import { StoryService } from '../../services/story.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fg-story-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-selector.component.html',
  styleUrl: './story-selector.component.scss'
})
export class StorySelectorComponent implements OnInit {
  stories: Story[] = [];
  gameId: string = '';
  selectedStoryId: string | null = null;

  constructor(
    private storyService: StoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.stories = this.storyService.getAllStories();
    this.gameId = this.route.snapshot.params['gameId'] || '';

    if (!this.gameId) {
      this.router.navigate(['/']);
    }
  }

  selectStory(storyId: string): void {
    this.selectedStoryId = this.selectedStoryId === storyId ? null : storyId;
  }

  isStorySelected(storyId: string): boolean {
    return this.selectedStoryId === storyId;
  }

  getSentenceCount(story: Story): number {
    return story.sentenceIds.length;
  }

  startGame(): void {
    if (!this.selectedStoryId || !this.gameId) {
      return;
    }

    this.router.navigate(['/games', this.gameId], {
      queryParams: { story: this.selectedStoryId }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
