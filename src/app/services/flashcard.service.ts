import { Injectable } from '@angular/core';
import { Flashcard, FlashcardSet } from '../models';

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
    { id: '13', imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-girl-sun-hat-picking-flowers-garden-illustration-cheerful-orange-striped-dress-380021630.jpg', caption: 'Pick' },
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
    { id: '27', imageUrl: 'https://media.baamboozle.com/uploads/images/22651/1572868650_13691', caption: 'Fog' },
    { id: '28', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-6-o/rod.PNG', caption: 'Rod' },
    { id: '29', imageUrl: 'https://media.istockphoto.com/id/164315913/vector/thief.jpg?s=612x612&w=0&k=20&c=Qs-dP2z9D-xBy4eGfSwrY6uUS0pllBURN5QyiyJC_aw=', caption: 'Rob' },
    { id: '30', imageUrl: 'https://img.freepik.com/premium-vector/cute-little-boy-with-crying-tantrum-expression_97632-4413.jpg', caption: 'Sob' },
    { id: '31', imageUrl: 'https://img.freepik.com/premium-vector/laptop-vector-mockup-647546_982290-58.jpg?semt=ais_hybrid&w=740&q=80', caption: 'Computer' },
    { id: '32', imageUrl: 'https://www.apple.com/v/ipad-air/ae/images/overview/two-sizes/gallery-toggle/spin_reverse_static__ehmkt90jzu6a_large.png', caption: 'Tablet' },
    { id: '33', imageUrl: 'https://i.pinimg.com/736x/6e/9b/6a/6e9b6a49294825a43e6f11a3fdb36ef4.jpg', caption: 'Smart Speaker' },
    { id: '34', imageUrl: 'https://cdn.manomano.com/images/images_products/32961599/P/111006397_1.jpg', caption: 'Vacuum Cleaner' },
    { id: '35', imageUrl: 'https://www.ismartrecruit.com/upload/blog/main_image/recruitment_chatbot_definition_features_and_benefits.webp', caption: 'Voice assistant' },
    { id: '36', imageUrl: 'https://thumbs.dreamstime.com/b/hand-holding-mobile-navigation-city-map-mobile-app-map-gps-navigation-smartphone-mobile-navigator-205618297.jpg', caption: 'Google Map' },
    { id: '37', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg', caption: 'Robot' },
    { id: '38', imageUrl: 'https://images-cdn.ubuy.co.in/634d031dba8fe623b47893cc-smart-phone-android-8-1-smartphone-hd.jpg', caption: 'Smartphone' },
    { id: '39', imageUrl: 'https://fsa2-assets.imgix.net/assets/UNIV/USU/cyber/iStock-1332378618.jpg?auto=compress%2Cformat&crop=focalpoint&domain=fsa2-assets.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=800&ixlib=php-3.3.0&w=1200', caption: 'Coding' },
    { id: '40', imageUrl: 'https://servodynamics.com.vn/wp-content/uploads/2024/11/SD_Series_Photoelectric_Smoke_Detectors.jpg', caption: 'Sensor' },
    { id: '41', imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/841/071/non_2x/cute-funny-red-arrow-icon-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-on-white-background-red-arrow-up-direction-vector.jpg', caption: 'Move Forward' },
    { id: '42', imageUrl: 'https://media.istockphoto.com/id/1448780430/nl/vector/cute-funny-red-arrow-icon-vector-hand-drawn-cartoon-kawaii-character-illustration-icon.jpg?s=612x612&w=0&k=20&c=SDTcbATxAj0CxgEypE1VYPPi33z29wy1a2qu0l0WQ-o=', caption: 'Move Backward' },
    { id: '43', imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/841/066/non_2x/cute-funny-red-arrow-icon-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-on-white-background-red-arrow-left-direction-vector.jpg', caption: 'Turn Left' },
    { id: '44', imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/841/068/non_2x/cute-funny-red-arrow-icon-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-on-white-background-red-arrow-right-direction-vector.jpg', caption: 'Turn Right' },
    { id: '45', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXP3FVr-YQNSXMnXo8X2DiI2SE_61t6j8z8WG7EMnWsJ5x2jRG2p6wTtZb1qD2S-_wdg&usqp=CAU', caption: 'Step' },
    { id: '46', imageUrl: 'https://www.publicdomainpictures.net/pictures/200000/nahled/footprints-logo-circle.jpg', caption: 'Loop' },
    { id: '47', imageUrl: 'https://media.istockphoto.com/id/689997052/vector/human-footprint-vector-icon.jpg?s=612x612&w=0&k=20&c=IXT6i7ZVz6Yo82ylJYHz-nMYY8tU8nZmorsliFheNgQ=', caption: 'Sequence' },
    { id: '48', imageUrl: 'https://img.freepik.com/free-vector/flat-spring-illustration_23-2149282337.jpg', caption: 'Spring' },
    { id: '49', imageUrl: 'https://t3.ftcdn.net/jpg/09/38/74/26/360_F_938742621_7VaKGUxoUqFOlSc48O8hXxJoFx6D5Xmu.jpg', caption: 'King' },
    { id: '50', imageUrl: 'https://img.freepik.com/premium-vector/courier-brings-packages-customer-illustration_338371-67.jpg', caption: 'Bring' },
    { id: '51', imageUrl: 'https://t3.ftcdn.net/jpg/02/79/95/98/360_F_279959867_EufPXDNyxENxhDxAah2qC6GtPffQ4IV9.jpg', caption: 'Song' },
    { id: '56', imageUrl: 'https://media.istockphoto.com/id/148772039/vector/diamond-ring.jpg?s=612x612&w=0&k=20&c=kcYwxLJIgAp05waeZsfa7eYYua6xfKXBMgDW_Yfv97g=', caption: 'Ring' },
    { id: '57', imageUrl: 'https://t3.ftcdn.net/jpg/17/14/31/00/360_F_1714310015_fg03gYNdzTiu1oUFsiJrDU3I9NY7PlLp.jpg', caption: 'Ping Pong' },
    { id: '58', imageUrl: 'https://img.freepik.com/premium-vector/illustration-wing_757131-683.jpg', caption: 'Wing' },
    { id: '59', imageUrl: 'https://media.istockphoto.com/id/908578348/vector/business-building-illustration.jpg?s=612x612&w=0&k=20&c=thg6Bom79dCRo8pMV3fo7p-8b7m1p-EdLZZPKYpXYvg=', caption: 'Building' },
    { id: '52', imageUrl: 'https://img.freepik.com/premium-vector/cute-mink-vector-cartoon-illustration-white-background_1025757-25149.jpg', caption: 'Mink' },
    { id: '53', imageUrl: 'https://img.freepik.com/premium-vector/bank-building-building-landmark-icon-illustration-vector_679085-55.jpg?semt=ais_hybrid&w=740&q=80', caption: 'Bank' },
    { id: '54', imageUrl: 'https://freedesignfile.com/upload/2016/12/Cartoon-school-children-with-blank-paper-vector-05.jpg', caption: 'Blank' },
    { id: '55', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_21Ko3jKTRkemD7g-RpLl1k5BSEXuib6FQ&s', caption: 'Wink' },
    { id: '60', imageUrl: 'https://img.freepik.com/premium-vector/colorful-cartoon-sink-illustration-white-background_1120554-60648.jpg', caption: 'Sink' },
    { id: '61', imageUrl: 'https://www.clker.com/cliparts/H/n/Z/W/5/r/ink-splash-pink.svg.hi.png', caption: 'Pink' },
    { id: '62', imageUrl: 'https://thumbs.dreamstime.com/b/drinking-milk-cute-boy-red-shirt-holding-glass-kid-thumbs-up-emotionally-healthy-concepts-growth-child-nutrition-vector-109127904.jpg', caption: 'Drink' },
    { id: '63', imageUrl: 'https://media.istockphoto.com/id/1355408523/vector/kid-cartoon-character_32.jpg?s=612x612&w=0&k=20&c=YbMpwjbtIZXCKJufk6rrFIf3x89nI8Qc0PVyZpQyH-M=', caption: 'Think' },
    { id: '64', imageUrl: 'https://png.pngtree.com/png-vector/20220701/ourmid/pngtree-group-selfie-on-smartphone-png-image_5677466.png', caption: 'Photo' },
    { id: '65', imageUrl: 'https://media.istockphoto.com/id/968475622/vector/cartoon-dolphin.jpg?s=612x612&w=0&k=20&c=d5u0Xm_jcBh-1aFnWfeavX79u75Z-yECb8vy9iHz5Gk=', caption: 'Dolphin' },
    { id: '66', imageUrl: 'https://www.shutterstock.com/image-vector/cute-baby-elephant-outline-coloring-600nw-2490295647.jpg', caption: 'Elephant' },
    { id: '67', imageUrl: 'https://static.vecteezy.com/system/resources/previews/060/826/787/non_2x/cartoon-green-bug-illustration-cheerful-insect-character-graphics-vector.jpg', caption: 'Bug' },
    { id: '68', imageUrl: 'https://media.istockphoto.com/id/831537350/vector/cute-children-playing-tug-of-war.jpg?s=612x612&w=0&k=20&c=ETTLHkCqiN5Vu243CKmVKx2KkkpGl6FqvQR6SeCd9Ac=', caption: 'Tug' },
    { id: '69', imageUrl: 'https://img.freepik.com/free-vector/acorn-sticker-white-background_1308-70248.jpg?semt=ais_hybrid&w=740&q=80', caption: 'Nut' },
    { id: '70', imageUrl: 'https://media.istockphoto.com/id/866875396/vector/little-boy-playing-in-the-mud.jpg?s=612x612&w=0&k=20&c=AZ_6nP987J3lf8z0c3Oyv632fHxHW9bw7F_NZxDR2zg=', caption: 'Mud' },
    { id: '71', imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/015/014/906/small_2x/hut-icon-cartoon-style-vector.jpg', caption: 'Hut' },
    { id: '72', imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/096/479/non_2x/scissor-cutting-paper-cartoon-icon-illustration-education-object-icon-concept-isolated-premium-flat-cartoon-style-free-vector.jpg', caption: 'Cut' },
    { id: '73', imageUrl: 'https://img.freepik.com/premium-vector/bathtub-clipart-cartoon-illustration-drawing_871209-12277.jpg', caption: 'Tub' },
    { id: '74', imageUrl: 'https://static.vecteezy.com/system/resources/previews/012/576/575/non_2x/children-laugh-at-the-fun-funny-cartoon-character-illustration-isolated-on-white-background-free-vector.jpg', caption: 'Fun' },
    { id: '75', imageUrl: 'https://thumbs.dreamstime.com/b/illustration-cartoon-happy-mother-hugging-her-son-cartoon-happy-mother-hugging-her-son-144238202.jpg', caption: 'Hug' },
    { id: '76', imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-rug-isolated-white-background-illustration-cute-style-clean-404296006.jpg', caption: 'Rug' },

    // Handicrafts I
    { id: '77', imageUrl: 'https://shop.vitcas.com/media/amasty/blog/cache/P/o/1000/690/Pottery-craft-ceramics.jpg', caption: 'Pottery/Ceramic' },
    { id: '78', imageUrl: 'https://image.vietnamlawmagazine.vn/uploadvietnamlaw/2022/6/13/trang-37-tradition-a1jpg113327806.jpg', caption: 'Bamboo/Rattan' },
    { id: '79', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Various_products_made_from_paper.JPG/1200px-Various_products_made_from_paper.JPG', caption: 'Paper' },
    { id: '80', imageUrl: 'https://noithatzear.vn/wp-content/uploads/2024/07/Plastic-la-gi.jpg', caption: 'Plastic' },
    { id: '81', imageUrl: 'https://vico.com.hk/be/uploads/blogs/image_pFONUQ1fk.png', caption: 'Fabric' },
    { id: '82', imageUrl: 'https://m.media-amazon.com/images/I/81Ry4Zp9S8L._AC_SL1500_.jpg', caption: 'Yarn/Wool' },
    { id: '83', imageUrl: 'https://hwestequipment.com/wp-content/uploads/2019/02/Things-Made-from-Recycled-Glass.jpg', caption: 'Glass' },
    { id: '84', imageUrl: 'https://zetarmoulding.com/wp-content/webp-express/webp-images/uploads/2022/10/natural-rubber-products.jpg.webp', caption: 'Rubber' },

    // Handicrafts II
    // { id: '85', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/bowl.PNG', caption: 'Bowl' },
    // { id: '86', imageUrl: 'https://img.freepik.com/premium-vector/suitcase-travel-case-vector-illustration_97632-4413.jpg', caption: 'Case' },
    // { id: '87', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/chair.PNG', caption: 'Chair' },
    // { id: '88', imageUrl: 'https://img.freepik.com/premium-vector/basket-wicker-basket-vector-illustration_97632-4413.jpg', caption: 'Basket' },
    // { id: '89', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/picture.PNG', caption: 'Picture' },
    // { id: '90', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/cup.PNG', caption: 'Cup' },
    // { id: '91', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/spoon.PNG', caption: 'Spoon' },
    // { id: '92', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/toy.PNG', caption: 'Toy' },
    // { id: '93', imageUrl: 'https://img.freepik.com/premium-vector/scarf-winter-scarf-vector-illustration_97632-4413.jpg', caption: 'Scarf' },
    // { id: '94', imageUrl: 'https://img.freepik.com/premium-vector/sweater-knit-sweater-vector-illustration_97632-4413.jpg', caption: 'Sweater' },
    // { id: '95', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/tshirt.PNG', caption: 'T-shirt' },
    // { id: '96', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/bag.PNG', caption: 'Bag' },
    // { id: '97', imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/bottle.PNG', caption: 'Bottle' }
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
    {
      id: 'set9',
      name: 'Consonant pattern: NG',
      description: 'Words with NG consonant pattern',
      flashcardIds: ['48', '49', '50', '51', '56', '57', '58', '59']
    },
    {
      id: 'set10',
      name: 'Consonant pattern: NK',
      description: 'Words with NK consonant pattern',
      flashcardIds: ['52', '53', '54', '55', '60', '61', '62', '63']
    },
    {
      id: 'set11',
      name: 'Consonant pattern: PH',
      description: 'Words with PH consonant pattern',
      flashcardIds: ['38', '64', '65', '66']
    },
    {
      id: 'set12',
      name: 'Short vowel U',
      description: 'Words with short vowel U sound',
      flashcardIds: ['67', '68', '69', '70', '71', '72', '73', '74', '75', '76']
    },
    {
      id: 'set13',
      name: 'Handicrafts I',
      description: 'Handicraft materials and items',
      flashcardIds: ['77', '78', '79', '80', '81', '82', '83', '84']
    },
    // {
    //   id: 'set14',
    //   name: 'Handicrafts II',
    //   description: 'Handicraft items and products',
    //   flashcardIds: ['85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97']
    // },
    // always keep this last
    // always add all flashcards to this set
    {
      id: 'set5',
      name: 'All',
      description: 'All flashcards',
      flashcardIds: this.flashcards.map(flashcard => flashcard.id)
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
