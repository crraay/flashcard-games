import { Injectable } from '@angular/core';
import { Flashcard, FlashcardSet } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private flashcards: Flashcard[] = [
    { id: '1', imageUrl: 'https://img.freepik.com/premium-vector/tree-cute-drawing-school-flash-card_213861-1457.jpg', caption: 'Tree' },
    { id: '2', imageUrl: 'https://study.com/cimages/multimages/16/sun-157126_1280.png', caption: 'Sun' },
    { id: '3', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/cat.PNG', caption: 'Cat' },
    { id: '4', imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/03/1/202403130229419046373.jpg', caption: 'Dog' },
    { id: '5', imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2023/09/1/202309191315544202107.jpg', caption: 'House' },
    { id: '6', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThs8Hniu6PyqzsrAKBhSsGPEtiPbjFAGZm4g&s', caption: 'Car' },
    { id: '7', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ8rq-QLt8FM__yuswJjIc5l7no4KmIRZy8w&s', caption: 'Ball' },
    { id: '8', imageUrl: 'https://www.flashcards.com.sg/wp-content/uploads/2017/10/Slide363.jpg', caption: 'Apple' },
    { id: '9', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9KPb1Gdjwdl9hDx2arKKRcyJbiuNFjt_sXw&s', caption: 'Book' },
    { id: '10', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/weather-flashcards-2/rainy.PNG', caption: 'Rain' },
    { id: '11', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/get-ready-for-movers-unit-12-2/lorry.PNG', caption: 'Truck' },
    { id: '12', imageUrl: 'https://o.quizlet.com/FwXCaAQmOmJzvBiXBuBTBQ.png', caption: 'Clock' },
    { id: '13', imageUrl: 'https://clipart-library.com/img1/1241251.png', caption: 'Pick' },
    { id: '14', imageUrl: 'https://thumbs.dreamstime.com/b/comic-fast-running-superhero-25331787.jpg', caption: 'Quick' },
    { id: '15', imageUrl: 'https://i.pinimg.com/736x/fd/b5/e9/fdb5e92095e956b781b5046b569a25a0.jpg', caption: 'Snack' },
    { id: '16', imageUrl: 'https://i.pinimg.com/564x/71/98/d9/7198d94e74a561dca6576916547b5cec.jpg', caption: 'Duck' },
    { id: '17', imageUrl: 'https://img.freepik.com/free-vector/padlock-coloured-outline_78370-548.jpg?semt=ais_hybrid&w=740&q=80', caption: 'Lock' },
    { id: '18', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxOzAPnbxIGpLeAd9ebitWVCBzgaVaP6xaw&s', caption: 'Neck' }
  ];

  private flashcardSets: FlashcardSet[] = [
    {
      id: 'set1',
      name: 'Nature',
      description: 'Nature-related vocabulary',
      flashcardIds: ['1', '2', '10']
    },
    {
      id: 'set2',
      name: 'Animals',
      description: 'Animal vocabulary',
      flashcardIds: ['3', '4', '16']
    },
    {
      id: 'set3',
      name: 'House Items',
      description: 'Items found in and around the house',
      flashcardIds: ['5', '6', '7', '9', '12', '17']
    },
    {
      id: 'set4',
      name: 'Diagraph CK',
      description: 'Words with CK diagraph',
      flashcardIds: ['11', '12', '13', '14', '15', '16', '17', '18']
    },
    {
      id: 'set5',
      name: 'All',
      description: 'All flashcards',
      flashcardIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
    }
  ];

  constructor() { }

  getAllFlashcards(): Flashcard[] {
    return [...this.flashcards];
  }

  getAllSets(): FlashcardSet[] {
    return [...this.flashcardSets];
  }

  getFlashcardsBySetId(setId: string): Flashcard[] {
    const set = this.flashcardSets.find(s => s.id === setId);
    if (!set) {
      return [];
    }
    return this.flashcards.filter(flashcard => set.flashcardIds.includes(flashcard.id));
  }
}
