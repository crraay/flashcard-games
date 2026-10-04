import { Injectable } from '@angular/core';
import { SightWordSet } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SightWordService {
  private sets: SightWordSet[] = [
    {
      id: 'sw-his-give-is',
      name: 'his, give, is',
      description: 'Sight words: his, give, is',
      sightWords: ['his', 'give', 'is'],
      sentences: [
        'I give you a muffin.',
        'Tom is his cat.'
      ]
    },
    {
      id: 'sw-the-him-a-and',
      name: 'the, him, a, and',
      description: 'Sight words: the, him, a, and',
      sightWords: ['the', 'him', 'a', 'and'],
      sentences: [
        'The fuzzy bear is sleeping.',
        'I give him a muffin.',
        'I want a muffin and a fizzy soda.'
      ]
    }
  ];

  getAllSets(): SightWordSet[] {
    return this.sets.map(set => this.copySet(set));
  }

  getSetById(id: string): SightWordSet | undefined {
    const set = this.sets.find(s => s.id === id);
    if (!set) {
      return undefined;
    }
    return this.copySet(set);
  }

  private copySet(set: SightWordSet): SightWordSet {
    return {
      ...set,
      sightWords: [...set.sightWords],
      sentences: [...set.sentences]
    };
  }
}
