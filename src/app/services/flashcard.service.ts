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
    { id: '18', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxOzAPnbxIGpLeAd9ebitWVCBzgaVaP6xaw&s', caption: 'Neck' },
    { id: '19', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/fingerprints-2-unit-1-lesson-4/run.PNG', caption: 'Jog' },
    { id: '20', imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/10/0/202410060935391271841.jpg', caption: 'Cop' },
    { id: '21', imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2023/09/1/202309130901199337990.jpg', caption: 'Hop' },
    { id: '22', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/sgk-tieng-anh-2-i-learn-smart-start-unit-5-2/top.PNG', caption: 'Top' },
    { id: '23', imageUrl: 'https://yourhomework.net/yhw/bfc/images/vocabulary/english/oxford-phonics-world-2-unit-6-op/pop.jpg', caption: 'Pop' },
    { id: '24', imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/04/2/202404201426231378483.jpg', caption: 'Pot' },
    { id: '25', imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/07/1/202407120853336547315.jpg', caption: 'Stop' },
    { id: '26', imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/04/2/202404201426373654125.jpg', caption: 'Mop' },
    // fog
    { id: '27', imageUrl: 'https://media.baamboozle.com/uploads/images/22651/1572868650_13691', caption: 'Fog' },
    // rod
    { id: '28', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-6-o/rod.PNG', caption: 'Rod' },
    // rob
    { id: '29', imageUrl: 'https://englishunite.com/wp-content/uploads/2025/03/magic-e-rob-eu-webp.webp', caption: 'Rob' },
    // sob
    { id: '30', imageUrl: 'https://englishunite.com/wp-content/uploads/2021/08/cvc-o-sob.jpg', caption: 'Sob' },
    // AI vocabulary
    { id: '31', imageUrl: 'https://img.freepik.com/premium-vector/laptop-vector-mockup-647546_982290-58.jpg?semt=ais_hybrid&w=740&q=80', caption: 'Computer' },
    { id: '32', imageUrl: 'https://www.apple.com/v/ipad-air/ae/images/overview/two-sizes/gallery-toggle/spin_reverse_static__ehmkt90jzu6a_large.png', caption: 'Tablet' },
    // smart speaker
    { id: '33', imageUrl: 'https://i.pinimg.com/736x/6e/9b/6a/6e9b6a49294825a43e6f11a3fdb36ef4.jpg', caption: 'Smart Speaker' },
    // vacuum cleaner
    { id: '34', imageUrl: 'https://cdn.manomano.com/images/images_products/32961599/P/111006397_1.jpg', caption: 'Vacuum Cleaner' },
    // chatbot
    { id: '35', imageUrl: 'https://www.ismartrecruit.com/upload/blog/main_image/recruitment_chatbot_definition_features_and_benefits.webp', caption: 'Chatbot' },
    // map app
    { id: '36', imageUrl: 'https://thumbs.dreamstime.com/b/hand-holding-mobile-navigation-city-map-mobile-app-map-gps-navigation-smartphone-mobile-navigator-205618297.jpg', caption: 'Map App' },
    // robot
    { id: '37', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg', caption: 'Robot' },
    // smartphone
    { id: '38', imageUrl: 'https://images-cdn.ubuy.co.in/634d031dba8fe623b47893cc-smart-phone-android-8-1-smartphone-hd.jpg', caption: 'Smartphone' },

    { id: '39', imageUrl: 'https://fsa2-assets.imgix.net/assets/UNIV/USU/cyber/iStock-1332378618.jpg?auto=compress%2Cformat&crop=focalpoint&domain=fsa2-assets.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=800&ixlib=php-3.3.0&w=1200', caption: 'Coding' },
    { id: '40', imageUrl: 'https://servodynamics.com.vn/wp-content/uploads/2024/11/SD_Series_Photoelectric_Smoke_Detectors.jpg', caption: 'Sensor' },
    { id: '41', imageUrl: 'https://illustoon.com/photo/221.png', caption: 'Move Forward' },
    { id: '42', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrvzCXsgyXS6xMs4TW77XJOcNRGzPdUgjvQ&s', caption: 'Move Backward' },
    { id: '43', imageUrl: 'https://illustoon.com/photo/211.png', caption: 'Turn Left' },
    { id: '44', imageUrl: 'https://cdn-icons-png.flaticon.com/512/5548/5548318.png', caption: 'Turn Right' },
    { id: '45', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXP3FVr-YQNSXMnXo8X2DiI2SE_61t6j8z8WG7EMnWsJ5x2jRG2p6wTtZb1qD2S-_wdg&usqp=CAU', caption: 'Step' },
    { id: '46', imageUrl: 'https://thumbs.dreamstime.com/b/footprints-circle-paint-print-30525995.jpg', caption: 'Loop' },
    { id: '47', imageUrl: 'https://c8.alamy.com/comp/2WX4T3E/a-vector-showing-multicoloured-human-footprints-in-a-line-symbolic-of-the-way-forward-in-life-2WX4T3E.jpg', caption: 'Sequence' },
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
      id: 'set6',
      name: 'Short vowel O',
      description: 'Words with short vowel O sound',
      flashcardIds: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
    },
    {
      id: 'set7',
      name: 'AI Vocabulary',
      description: 'AI and programming related vocabulary',
      flashcardIds: ['31', '32', '33', '34', '35', '36', '37', '38', '39', '40']
    },
    {
      id: 'set8',
      name: 'Commands',
      description: 'Commands related vocabulary',
      flashcardIds: ['41', '42', '43', '44', '45', '46', '47']
    },
    // always keep this last
    // always add all flashcards to this set
    {
      id: 'set5',
      name: 'All',
      description: 'All flashcards',
      flashcardIds: this.flashcards.map(flashcard => flashcard.id)
    },
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
