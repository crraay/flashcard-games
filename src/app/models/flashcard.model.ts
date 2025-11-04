export interface Flashcard {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface FlashcardSet {
  id: string;
  name: string;
  description: string;
  flashcardIds: string[];
}
