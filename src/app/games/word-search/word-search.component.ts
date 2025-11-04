import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface WordPosition {
  word: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  direction: 'horizontal' | 'vertical' | 'diagonal';
  found: boolean;
  givenUp?: boolean;
}

interface Cell {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  wordIndex: number | null;
  isGivenUp?: boolean;
}

@Component({
  selector: 'fg-word-search',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './word-search.component.html',
  styleUrl: './word-search.component.scss'
})
export class WordSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('gridContainer', { static: false }) gridContainer!: ElementRef;

  selectedSet: FlashcardSet | null = null;
  flashcards: Flashcard[] = [];
  words: string[] = [];
  gridSize: number = 15;
  grid: Cell[][] = [];
  wordPositions: WordPosition[] = [];
  foundWords: number = 0;
  selectedCells: { row: number; col: number }[] = [];
  gameComplete: boolean = false;
  readyToFinish: boolean = false;
  allFlashcards: Flashcard[] = [];

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const setId = this.route.snapshot.params['setId'];
    if (setId) {
      const allSets = this.flashcardService.getAllSets();
      this.selectedSet = allSets.find(s => s.id === setId) || null;

      if (this.selectedSet) {
        this.initializeGame();
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  initializeGame(): void {
    if (!this.selectedSet) return;

    this.flashcards = this.flashcardService.getFlashcardsBySetId(this.selectedSet.id);
    this.allFlashcards = this.flashcardService.getAllFlashcards();
    
    // Get words from flashcards (convert to uppercase, filter short words)
    this.words = this.flashcards
      .map(f => f.caption.toUpperCase())
      .filter(word => word.length >= 3); // Only words with 3+ letters

    if (this.words.length === 0) {
      this.words = this.flashcards.map(f => f.caption.toUpperCase());
    }

    // Adjust grid size based on number of words (smaller grid)
    this.gridSize = Math.max(8, Math.min(12, Math.ceil(Math.sqrt(this.words.length * 6))));

    this.generateGrid();
  }

  generateGrid(): void {
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      // Initialize empty grid
      this.grid = Array(this.gridSize).fill(null).map(() => 
        Array(this.gridSize).fill(null).map(() => ({
          letter: '',
          isSelected: false,
          isFound: false,
          wordIndex: null,
          isGivenUp: false
        }))
      );

      this.wordPositions = [];
      
      // Shuffle words for random placement
      const shuffledWords = [...this.words];
      this.shuffleArray(shuffledWords);

      // Place words in grid
      let placedWordIndex = 0;
      for (let i = 0; i < shuffledWords.length; i++) {
        const word = shuffledWords[i];
        if (this.placeWord(word, placedWordIndex)) {
          this.wordPositions.push({
            word,
            startRow: 0,
            startCol: 0,
            endRow: 0,
            endCol: 0,
            direction: 'horizontal',
            found: false
          });
          placedWordIndex++;
        }
      }

      // If all words are placed, we're done
      if (this.wordPositions.length === this.words.length) {
        break;
      }

      // If not all words placed, increase grid size and try again
      if (this.gridSize < 15) {
        this.gridSize = Math.min(15, this.gridSize + 2);
      }
      
      attempts++;
    }

    // If still not all words placed, try with larger grid
    if (this.wordPositions.length < this.words.length && this.gridSize < 15) {
      this.gridSize = 15;
      this.generateGrid();
      return;
    }

    // Fill remaining cells with random letters
    this.fillRandomLetters();

    // Update word positions with actual coordinates
    this.updateWordPositions();
    
    // Reset game state
    this.foundWords = 0;
    this.selectedCells = [];
    this.readyToFinish = false;
  }

  placeWord(word: string, wordIndex: number): boolean {
    const directions = [
      { dr: 0, dc: 1 }, // horizontal
      { dr: 1, dc: 0 }  // vertical
    ];

    // Shuffle directions for random placement
    const shuffledDirections = [...directions];
    this.shuffleArray(shuffledDirections);

    // Try random positions
    const attempts = 100;
    for (let attempt = 0; attempt < attempts; attempt++) {
      const direction = shuffledDirections[attempt % shuffledDirections.length];
      
      // Calculate valid bounds for this direction
      let maxRow = this.gridSize;
      let maxCol = this.gridSize;
      let minCol = 0;

      if (direction.dr > 0) {
        maxRow = this.gridSize - word.length;
      }
      if (direction.dc > 0) {
        maxCol = this.gridSize - word.length;
      }
      if (direction.dc < 0) {
        minCol = word.length - 1;
        maxCol = this.gridSize;
      }

      if (maxRow < 0 || maxCol < 0 || minCol >= maxCol) continue;

      const row = direction.dr === 0 
        ? Math.floor(Math.random() * this.gridSize)
        : Math.floor(Math.random() * Math.max(1, maxRow));
      const col = direction.dc < 0 
        ? minCol + Math.floor(Math.random() * Math.max(1, maxCol - minCol))
        : direction.dc === 0
        ? Math.floor(Math.random() * this.gridSize)
        : Math.floor(Math.random() * Math.max(1, maxCol));

      // Check if word can be placed here
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + i * direction.dr;
        const c = col + i * direction.dc;
        if (r < 0 || r >= this.gridSize || c < 0 || c >= this.gridSize) {
          canPlace = false;
          break;
        }
        if (this.grid[r][c].letter !== '' && this.grid[r][c].letter !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        // Place the word
        for (let i = 0; i < word.length; i++) {
          const r = row + i * direction.dr;
          const c = col + i * direction.dc;
          this.grid[r][c].letter = word[i];
          this.grid[r][c].wordIndex = wordIndex;
        }
        return true;
      }
    }
    return false;
  }

  fillRandomLetters(): void {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col].letter === '') {
          this.grid[row][col].letter = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  }

  updateWordPositions(): void {
    for (let i = 0; i < this.wordPositions.length; i++) {
      const word = this.wordPositions[i].word;
      // Find the word in the grid by checking wordIndex
      let startRow = -1, startCol = -1;
      
      for (let row = 0; row < this.gridSize; row++) {
        for (let col = 0; col < this.gridSize; col++) {
          if (this.grid[row][col].wordIndex === i) {
            startRow = row;
            startCol = col;
            break;
          }
        }
        if (startRow !== -1) break;
      }

      if (startRow === -1) continue; // Word not found

      // Check all directions to find the end (only horizontal and vertical)
      const directions = [
        { dr: 0, dc: 1, name: 'horizontal' as const },
        { dr: 1, dc: 0, name: 'vertical' as const }
      ];

      for (const dir of directions) {
        const endRow = startRow + (word.length - 1) * dir.dr;
        const endCol = startCol + (word.length - 1) * dir.dc;
        
        if (endRow >= 0 && endRow < this.gridSize && 
            endCol >= 0 && endCol < this.gridSize &&
            this.grid[endRow][endCol]?.wordIndex === i) {
          this.wordPositions[i] = {
            word,
            startRow,
            startCol,
            endRow,
            endCol,
            direction: dir.name,
            found: false
          };
          break;
        }
      }
    }
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  onCellClick(row: number, col: number): void {
    if (this.gameComplete) return;
    
    // Allow selecting all cells, even if they're part of found words (words can cross)
    
    const cellIndex = this.selectedCells.findIndex(c => c.row === row && c.col === col);
    
    // If clicking on already selected cell, deselect it and all after it
    if (cellIndex !== -1) {
      this.selectedCells = this.selectedCells.slice(0, cellIndex);
      this.updateSelection();
      return;
    }
    
    // If no cells selected yet, start selection
    if (this.selectedCells.length === 0) {
      this.selectedCells = [{ row, col }];
      this.updateSelection();
      return;
    }
    
    // Check if the clicked cell is adjacent to the last selected cell (horizontal or vertical only)
    const lastCell = this.selectedCells[this.selectedCells.length - 1];
    const rowDiff = row - lastCell.row;
    const colDiff = col - lastCell.col;
    
    // Must be adjacent horizontally (same row) or vertically (same column), no diagonal
    const isHorizontal = rowDiff === 0 && Math.abs(colDiff) === 1;
    const isVertical = colDiff === 0 && Math.abs(rowDiff) === 1;
    
    if (isHorizontal || isVertical) {
      // Check if we're maintaining direction
      if (this.selectedCells.length === 1) {
        // First extension - any horizontal or vertical direction is fine
        this.selectedCells.push({ row, col });
        this.updateSelection();
        // Auto-check if word matches
        this.autoCheckWord();
      } else {
        // Check if we're continuing in the same direction
        const firstCell = this.selectedCells[0];
        const secondCell = this.selectedCells[1];
        
        const firstDir = {
          dr: secondCell.row - firstCell.row,
          dc: secondCell.col - firstCell.col
        };
        
        const newDir = {
          dr: rowDiff,
          dc: colDiff
        };
        
        // Must continue in same direction (normalize direction)
        const normalizedFirstDir = {
          dr: firstDir.dr === 0 ? 0 : (firstDir.dr > 0 ? 1 : -1),
          dc: firstDir.dc === 0 ? 0 : (firstDir.dc > 0 ? 1 : -1)
        };
        const normalizedNewDir = {
          dr: newDir.dr === 0 ? 0 : (newDir.dr > 0 ? 1 : -1),
          dc: newDir.dc === 0 ? 0 : (newDir.dc > 0 ? 1 : -1)
        };
        
        // Must continue in same direction
        if (normalizedFirstDir.dr === normalizedNewDir.dr && normalizedFirstDir.dc === normalizedNewDir.dc) {
          this.selectedCells.push({ row, col });
          this.updateSelection();
          // Auto-check if word matches
          this.autoCheckWord();
        } else {
          // Not continuing in same direction - clear selection
          this.clearSelection();
        }
      }
    } else {
      // Not adjacent horizontally or vertically - clear selection
      this.clearSelection();
      // Start new selection with this cell
      this.selectedCells = [{ row, col }];
      this.updateSelection();
    }
  }
  
  autoCheckWord(): void {
    // Check if current selection matches any word
    if (this.selectedCells.length < 3) return;
    
    const selectedWord = this.selectedCells
      .map(cell => this.grid[cell.row][cell.col].letter)
      .join('');

    const reversedWord = selectedWord.split('').reverse().join('');

    // Find matching word
    for (let i = 0; i < this.wordPositions.length; i++) {
      const wordPos = this.wordPositions[i];
      if (wordPos.found) continue;

      if (selectedWord === wordPos.word || reversedWord === wordPos.word) {
        // Mark word as found
        wordPos.found = true;
        this.foundWords++;

        // Mark cells as found
        this.selectedCells.forEach(cell => {
          this.grid[cell.row][cell.col].isFound = true;
        });

        // Clear selection
        this.selectedCells = [];
        this.updateSelection();

        // Check if game is complete (defer popup to Continue button)
        if (this.foundWords >= this.wordPositions.length) {
          this.readyToFinish = true;
        }
        return;
      }
    }
  }

  updateSelection(): void {
    // Clear previous selection
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.grid[row][col].isSelected = false;
      }
    }

    // Mark selected cells
    this.selectedCells.forEach(cell => {
      this.grid[cell.row][cell.col].isSelected = true;
    });
  }

  clearSelection(): void {
    this.selectedCells = [];
    this.updateSelection();
  }

  giveUp(): void {
    // Mark all unplaced words as found and show them in red
    for (let i = 0; i < this.wordPositions.length; i++) {
      const wordPos = this.wordPositions[i];
      if (!wordPos.found) {
        wordPos.found = true;
        wordPos.givenUp = true;
        this.foundWords++;
        
        // Mark all cells of this word as found (but show in red)
        const direction = this.getDirectionVector(wordPos);
        for (let j = 0; j < wordPos.word.length; j++) {
          const row = wordPos.startRow + j * direction.dr;
          const col = wordPos.startCol + j * direction.dc;
          if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
            this.grid[row][col].isFound = true;
            this.grid[row][col].isGivenUp = true;
          }
        }
      }
    }
    // If all words are resolved, allow finishing
    if (this.foundWords >= this.wordPositions.length) {
      this.readyToFinish = true;
    }
  }

  getDirectionVector(wordPos: WordPosition): { dr: number; dc: number } {
    const dr = wordPos.endRow - wordPos.startRow;
    const dc = wordPos.endCol - wordPos.startCol;
    
    // Normalize direction
    if (dr === 0) {
      return { dr: 0, dc: dc > 0 ? 1 : -1 };
    } else if (dc === 0) {
      return { dr: dr > 0 ? 1 : -1, dc: 0 };
    } else {
      return { dr: dr > 0 ? 1 : -1, dc: dc > 0 ? 1 : -1 };
    }
  }

  restartGame(): void {
    this.foundWords = 0;
    this.gameComplete = false;
    this.selectedCells = [];
    // Reset grid size to initial value
    this.gridSize = Math.max(8, Math.min(12, Math.ceil(Math.sqrt(this.words.length * 6))));
    this.readyToFinish = false;
    this.initializeGame();
  }

  finishGame(): void {
    this.gameComplete = true;
  }

  getScorePercentage(): number {
    if (this.wordPositions.length === 0) return 0;
    return Math.round((this.foundWords / this.wordPositions.length) * 100);
  }

  getCompletionMessage(): string {
    const percentage = this.getScorePercentage();
    let message = `Words Found: ${this.foundWords}/${this.wordPositions.length} (${percentage}%)\n\n`;

    if (percentage === 100) {
      message += 'Perfect! 🌟';
    } else if (percentage >= 80) {
      message += 'Great job! 👍';
    } else if (percentage >= 60) {
      message += 'Good try! 💪';
    } else {
      message += 'Keep practicing! 📚';
    }

    return message;
  }

  goBack(): void {
    const routeUrl = this.route.snapshot.url;
    if (routeUrl.length >= 2 && routeUrl[0].path === 'games') {
      const gameId = routeUrl[1].path;
      this.router.navigate(['/games', gameId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

