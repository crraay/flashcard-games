import { Injectable } from '@angular/core';
import { Flashcard, FlashcardSet } from '../models';

const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/512x512?text=Flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private flashcards: Flashcard[] = [
    {
      id: '1',
      caption: 'Tree',
      imageUrl: 'https://img.freepik.com/premium-vector/tree-cute-drawing-school-flash-card_213861-1457.jpg'
    },
    {
      id: '2',
      caption: 'Sun',
      imageUrl: 'https://study.com/cimages/multimages/16/sun-157126_1280.png'
    },
    {
      id: '3',
      caption: 'Cat',
      imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/cat.PNG'
    },
    {
      id: '4',
      caption: 'Dog',
      imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/03/1/202403130229419046373.jpg'
    },
    {
      id: '5',
      caption: 'House',
      imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2023/09/1/202309191315544202107.jpg'
    },
    {
      id: '6',
      caption: 'Car',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThs8Hniu6PyqzsrAKBhSsGPEtiPbjFAGZm4g&s'
    },
    {
      id: '7',
      caption: 'Ball',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ8rq-QLt8FM__yuswJjIc5l7no4KmIRZy8w&s'
    },
    {
      id: '8',
      caption: 'Apple',
      imageUrl: 'https://www.shutterstock.com/image-vector/cartoon-illustration-red-apple-green-600nw-2668481887.jpg'
    },
    {
      id: '9',
      caption: 'Book',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9KPb1Gdjwdl9hDx2arKKRcyJbiuNFjt_sXw&s'
    },
    {
      id: '10',
      caption: 'Rain',
      imageUrl: 'https://bestflashcard.com/images/vocabulary/english/weather-flashcards-2/rainy.PNG'
    },
    {
      id: '11',
      caption: 'Truck',
      imageUrl: 'https://bestflashcard.com/images/vocabulary/english/get-ready-for-movers-unit-12-2/lorry.PNG'
    },
    {
      id: '12',
      caption: 'Clock',
      imageUrl: 'https://o.quizlet.com/FwXCaAQmOmJzvBiXBuBTBQ.png'
    },
    {
      id: '13',
      caption: 'Pick',
      imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-girl-sun-hat-picking-flowers-garden-illustration-cheerful-orange-striped-dress-380021630.jpg'
    },
    {
      id: '14',
      caption: 'Quick',
      imageUrl: 'https://thumbs.dreamstime.com/b/comic-fast-running-superhero-25331787.jpg'
    },
    {
      id: '15',
      caption: 'Snack',
      imageUrl: 'https://i.pinimg.com/736x/fd/b5/e9/fdb5e92095e956b781b5046b569a25a0.jpg'
    },
    {
      id: '16',
      caption: 'Duck',
      imageUrl: 'https://i.pinimg.com/564x/71/98/d9/7198d94e74a561dca6576916547b5cec.jpg'
    },
    {
      id: '17',
      caption: 'Lock',
      imageUrl: 'https://img.freepik.com/free-vector/padlock-coloured-outline_78370-548.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '18',
      caption: 'Neck',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxOzAPnbxIGpLeAd9ebitWVCBzgaVaP6xaw&s'
    },
    {
      id: '19',
      caption: 'Jog',
      imageUrl: 'https://bestflashcard.com/images/vocabulary/english/fingerprints-2-unit-1-lesson-4/run.PNG'
    },
    {
      id: '20',
      caption: 'Cop',
      imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/10/0/202410060935391271841.jpg'
    },
    {
      id: '21',
      caption: 'Hop',
      imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2023/09/1/202309130901199337990.jpg'
    },
    {
      id: '22',
      caption: 'Top',
      imageUrl: 'https://bestflashcard.com/images/vocabulary/english/sgk-tieng-anh-2-i-learn-smart-start-unit-5-2/top.PNG'
    },
    {
      id: '23',
      caption: 'Pop',
      imageUrl: 'https://yourhomework.net/yhw/bfc/images/vocabulary/english/oxford-phonics-world-2-unit-6-op/pop.jpg'
    },
    {
      id: '24',
      caption: 'Pot',
      imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/04/2/202404201426231378483.jpg'
    },
    {
      id: '25',
      caption: 'Stop',
      imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/07/1/202407120853336547315.jpg'
    },
    {
      id: '26',
      caption: 'Mop',
      imageUrl: 'https://yourhomework.net/yhw/f/yhw-voca/2024/04/2/202404201426373654125.jpg'
    },
    {
      id: '27',
      caption: 'Fog',
      imageUrl: 'https://media.baamboozle.com/uploads/images/22651/1572868650_13691'
    },
    {
      id: '28',
      caption: 'Rod',
      imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-6-o/rod.PNG'
    },
    {
      id: '29',
      caption: 'Rob',
      imageUrl: 'https://media.istockphoto.com/id/164315913/vector/thief.jpg?s=612x612&w=0&k=20&c=Qs-dP2z9D-xBy4eGfSwrY6uUS0pllBURN5QyiyJC_aw='
    },
    {
      id: '30',
      caption: 'Sob',
      imageUrl: 'https://img.freepik.com/premium-vector/cute-little-boy-with-crying-tantrum-expression_97632-4413.jpg'
    },
    {
      id: '31',
      caption: 'Computer',
      imageUrl: 'https://img.freepik.com/premium-vector/laptop-vector-mockup-647546_982290-58.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '32',
      caption: 'Tablet',
      imageUrl: 'https://www.apple.com/v/ipad-air/ae/images/overview/two-sizes/gallery-toggle/spin_reverse_static__ehmkt90jzu6a_large.png'
    },
    {
      id: '33',
      caption: 'Smart Speaker',
      imageUrl: 'https://i.pinimg.com/736x/6e/9b/6a/6e9b6a49294825a43e6f11a3fdb36ef4.jpg'
    },
    {
      id: '34',
      caption: 'Vacuum Cleaner',
      imageUrl: 'https://cdn.manomano.com/images/images_products/32961599/P/111006397_1.jpg'
    },
    {
      id: '35',
      caption: 'Voice assistant',
      imageUrl: 'https://www.ismartrecruit.com/upload/blog/main_image/recruitment_chatbot_definition_features_and_benefits.webp'
    },
    {
      id: '36',
      caption: 'Google Map',
      imageUrl: 'https://thumbs.dreamstime.com/b/hand-holding-mobile-navigation-city-map-mobile-app-map-gps-navigation-smartphone-mobile-navigator-205618297.jpg'
    },
    {
      id: '37',
      caption: 'Robot',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg'
    },
    {
      id: '38',
      caption: 'Smartphone',
      imageUrl: 'images/flashcards/38-smartphone.png'
    },
    {
      id: '39',
      caption: 'Coding',
      imageUrl: 'https://fsa2-assets.imgix.net/assets/UNIV/USU/cyber/iStock-1332378618.jpg?auto=compress%2Cformat&crop=focalpoint&domain=fsa2-assets.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=800&ixlib=php-3.3.0&w=1200'
    },
    {
      id: '40',
      caption: 'Sensor',
      imageUrl: 'https://servodynamics.com.vn/wp-content/uploads/2024/11/SD_Series_Photoelectric_Smoke_Detectors.jpg'
    },
    {
      id: '41',
      caption: 'Move Forward',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/841/071/non_2x/cute-funny-red-arrow-icon-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-on-white-background-red-arrow-up-direction-vector.jpg'
    },
    {
      id: '42',
      caption: 'Move Backward',
      imageUrl: 'https://media.istockphoto.com/id/1448780430/nl/vector/cute-funny-red-arrow-icon-vector-hand-drawn-cartoon-kawaii-character-illustration-icon.jpg?s=612x612&w=0&k=20&c=SDTcbATxAj0CxgEypE1VYPPi33z29wy1a2qu0l0WQ-o='
    },
    {
      id: '43',
      caption: 'Turn Left',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/841/066/non_2x/cute-funny-red-arrow-icon-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-on-white-background-red-arrow-left-direction-vector.jpg'
    },
    {
      id: '44',
      caption: 'Turn Right',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/841/068/non_2x/cute-funny-red-arrow-icon-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-on-white-background-red-arrow-right-direction-vector.jpg'
    },
    {
      id: '45',
      caption: 'Step',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXP3FVr-YQNSXMnXo8X2DiI2SE_61t6j8z8WG7EMnWsJ5x2jRG2p6wTtZb1qD2S-_wdg&usqp=CAU'
    },
    {
      id: '46',
      caption: 'Loop',
      imageUrl: 'images/flashcards/46-loop.png'
    },
    {
      id: '47',
      caption: 'Sequence',
      imageUrl: 'https://media.istockphoto.com/id/689997052/vector/human-footprint-vector-icon.jpg?s=612x612&w=0&k=20&c=IXT6i7ZVz6Yo82ylJYHz-nMYY8tU8nZmorsliFheNgQ='
    },
    {
      id: '48',
      caption: 'Spring',
      imageUrl: 'https://img.freepik.com/free-vector/flat-spring-illustration_23-2149282337.jpg'
    },
    {
      id: '49',
      caption: 'King',
      imageUrl: 'https://t3.ftcdn.net/jpg/09/38/74/26/360_F_938742621_7VaKGUxoUqFOlSc48O8hXxJoFx6D5Xmu.jpg'
    },
    {
      id: '50',
      caption: 'Bring',
      imageUrl: 'https://img.freepik.com/premium-vector/courier-brings-packages-customer-illustration_338371-67.jpg'
    },
    {
      id: '51',
      caption: 'Song',
      imageUrl: 'https://t3.ftcdn.net/jpg/02/79/95/98/360_F_279959867_EufPXDNyxENxhDxAah2qC6GtPffQ4IV9.jpg'
    },
    {
      id: '56',
      caption: 'Ring',
      imageUrl: 'https://media.istockphoto.com/id/148772039/vector/diamond-ring.jpg?s=612x612&w=0&k=20&c=kcYwxLJIgAp05waeZsfa7eYYua6xfKXBMgDW_Yfv97g='
    },
    {
      id: '57',
      caption: 'Ping Pong',
      imageUrl: 'https://t3.ftcdn.net/jpg/17/14/31/00/360_F_1714310015_fg03gYNdzTiu1oUFsiJrDU3I9NY7PlLp.jpg'
    },
    {
      id: '58',
      caption: 'Wing',
      imageUrl: 'https://img.freepik.com/premium-vector/illustration-wing_757131-683.jpg'
    },
    {
      id: '59',
      caption: 'Building',
      imageUrl: 'https://media.istockphoto.com/id/908578348/vector/business-building-illustration.jpg?s=612x612&w=0&k=20&c=thg6Bom79dCRo8pMV3fo7p-8b7m1p-EdLZZPKYpXYvg='
    },
    {
      id: '52',
      caption: 'Mink',
      imageUrl: 'https://img.freepik.com/premium-vector/cute-mink-vector-cartoon-illustration-white-background_1025757-25149.jpg'
    },
    {
      id: '53',
      caption: 'Bank',
      imageUrl: 'https://img.freepik.com/premium-vector/bank-building-building-landmark-icon-illustration-vector_679085-55.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '54',
      caption: 'Blank',
      imageUrl: 'images/flashcards/54-blank.png'
    },
    {
      id: '55',
      caption: 'Wink',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_21Ko3jKTRkemD7g-RpLl1k5BSEXuib6FQ&s'
    },
    {
      id: '60',
      caption: 'Sink',
      imageUrl: 'https://img.freepik.com/premium-vector/colorful-cartoon-sink-illustration-white-background_1120554-60648.jpg'
    },
    {
      id: '61',
      caption: 'Pink',
      imageUrl: 'https://www.clker.com/cliparts/H/n/Z/W/5/r/ink-splash-pink.svg.hi.png'
    },
    {
      id: '62',
      caption: 'Drink',
      imageUrl: 'https://thumbs.dreamstime.com/b/drinking-milk-cute-boy-red-shirt-holding-glass-kid-thumbs-up-emotionally-healthy-concepts-growth-child-nutrition-vector-109127904.jpg'
    },
    {
      id: '63',
      caption: 'Think',
      imageUrl: 'https://media.istockphoto.com/id/1355408523/vector/kid-cartoon-character_32.jpg?s=612x612&w=0&k=20&c=YbMpwjbtIZXCKJufk6rrFIf3x89nI8Qc0PVyZpQyH-M='
    },
    {
      id: '64',
      caption: 'Photo',
      imageUrl: 'https://png.pngtree.com/png-vector/20220701/ourmid/pngtree-group-selfie-on-smartphone-png-image_5677466.png'
    },
    {
      id: '65',
      caption: 'Dolphin',
      imageUrl: 'https://media.istockphoto.com/id/968475622/vector/cartoon-dolphin.jpg?s=612x612&w=0&k=20&c=d5u0Xm_jcBh-1aFnWfeavX79u75Z-yECb8vy9iHz5Gk='
    },
    {
      id: '66',
      caption: 'Elephant',
      imageUrl: 'https://www.shutterstock.com/image-vector/cute-baby-elephant-outline-coloring-600nw-2490295647.jpg'
    },
    {
      id: '67',
      caption: 'Bug',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/060/826/787/non_2x/cartoon-green-bug-illustration-cheerful-insect-character-graphics-vector.jpg'
    },
    {
      id: '68',
      caption: 'Tug',
      imageUrl: 'https://media.istockphoto.com/id/831537350/vector/cute-children-playing-tug-of-war.jpg?s=612x612&w=0&k=20&c=ETTLHkCqiN5Vu243CKmVKx2KkkpGl6FqvQR6SeCd9Ac='
    },
    {
      id: '69',
      caption: 'Nut',
      imageUrl: 'https://img.freepik.com/free-vector/acorn-sticker-white-background_1308-70248.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '70',
      caption: 'Mud',
      imageUrl: 'https://media.istockphoto.com/id/866875396/vector/little-boy-playing-in-the-mud.jpg?s=612x612&w=0&k=20&c=AZ_6nP987J3lf8z0c3Oyv632fHxHW9bw7F_NZxDR2zg='
    },
    {
      id: '71',
      caption: 'Hut',
      imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/015/014/906/small_2x/hut-icon-cartoon-style-vector.jpg'
    },
    {
      id: '72',
      caption: 'Cut',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/096/479/non_2x/scissor-cutting-paper-cartoon-icon-illustration-education-object-icon-concept-isolated-premium-flat-cartoon-style-free-vector.jpg'
    },
    {
      id: '73',
      caption: 'Tub',
      imageUrl: 'https://img.freepik.com/premium-vector/bathtub-clipart-cartoon-illustration-drawing_871209-12277.jpg'
    },
    {
      id: '74',
      caption: 'Fun',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/012/576/575/non_2x/children-laugh-at-the-fun-funny-cartoon-character-illustration-isolated-on-white-background-free-vector.jpg'
    },
    {
      id: '75',
      caption: 'Hug',
      imageUrl: 'https://thumbs.dreamstime.com/b/illustration-cartoon-happy-mother-hugging-her-son-cartoon-happy-mother-hugging-her-son-144238202.jpg'
    },
    {
      id: '76',
      caption: 'Rug',
      imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-rug-isolated-white-background-illustration-cute-style-clean-404296006.jpg'
    },

    // Handicrafts I
    {
      id: '77',
      caption: 'Pottery/Ceramic',
      imageUrl: 'https://shop.vitcas.com/media/amasty/blog/cache/P/o/1000/690/Pottery-craft-ceramics.jpg'
    },
    {
      id: '78',
      caption: 'Bamboo/Rattan',
      imageUrl: 'https://image.vietnamlawmagazine.vn/uploadvietnamlaw/2022/6/13/trang-37-tradition-a1jpg113327806.jpg'
    },
    {
      id: '79',
      caption: 'Paper',
      imageUrl: 'images/flashcards/79-paper.png'
    },
    {
      id: '80',
      caption: 'Plastic',
      imageUrl: 'https://noithatzear.vn/wp-content/uploads/2024/07/Plastic-la-gi.jpg'
    },
    {
      id: '81',
      caption: 'Fabric',
      imageUrl: 'https://vico.com.hk/be/uploads/blogs/image_pFONUQ1fk.png'
    },
    {
      id: '82',
      caption: 'Yarn/Wool',
      imageUrl: 'https://m.media-amazon.com/images/I/81Ry4Zp9S8L._AC_SL1500_.jpg'
    },
    {
      id: '83',
      caption: 'Glass',
      imageUrl: 'https://hwestequipment.com/wp-content/uploads/2019/02/Things-Made-from-Recycled-Glass.jpg'
    },
    {
      id: '84',
      caption: 'Rubber',
      imageUrl: 'https://zetarmoulding.com/wp-content/webp-express/webp-images/uploads/2022/10/natural-rubber-products.jpg.webp'
    },

    // Handicrafts II
    // {
    //   id: '85',
    //   caption: 'Bowl',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/bowl.PNG'
    // },
    // {
    //   id: '86',
    //   caption: 'Case',
    //   imageUrl: 'https://img.freepik.com/premium-vector/suitcase-travel-case-vector-illustration_97632-4413.jpg'
    // },
    // {
    //   id: '87',
    //   caption: 'Chair',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/chair.PNG'
    // },
    // {
    //   id: '88',
    //   caption: 'Basket',
    //   imageUrl: 'https://img.freepik.com/premium-vector/basket-wicker-basket-vector-illustration_97632-4413.jpg'
    // },
    // {
    //   id: '89',
    //   caption: 'Picture',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/picture.PNG'
    // },
    // {
    //   id: '90',
    //   caption: 'Cup',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/cup.PNG'
    // },
    // {
    //   id: '91',
    //   caption: 'Spoon',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/spoon.PNG'
    // },
    // {
    //   id: '92',
    //   caption: 'Toy',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/toy.PNG'
    // },
    // {
    //   id: '93',
    //   caption: 'Scarf',
    //   imageUrl: 'https://img.freepik.com/premium-vector/scarf-winter-scarf-vector-illustration_97632-4413.jpg'
    // },
    // {
    //   id: '94',
    //   caption: 'Sweater',
    //   imageUrl: 'https://img.freepik.com/premium-vector/sweater-knit-sweater-vector-illustration_97632-4413.jpg'
    // },
    // {
    //   id: '95',
    //   caption: 'T-shirt',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/tshirt.PNG'
    // },
    // {
    //   id: '96',
    //   caption: 'Bag',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/bag.PNG'
    // },
    // {
    //   id: '97',
    //   caption: 'Bottle',
    //   imageUrl: 'https://bestflashcard.com/images/vocabulary/english/oxford-phonics-world-2-unit-1-a/bottle.PNG'
    // }

    // 1 Consonant pattern: KN - kneel, knot, knead, knee
    {
      id: '98',
      caption: 'Kneel',
      imageUrl: 'https://www.shutterstock.com/image-vector/little-kid-show-praying-pose-600nw-2318772437.jpg'
    },
    {
      id: '99',
      caption: 'Knot',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHZsJsN1P5sJEaPnyiV5P9ldq5ARB02WjRg&s'
    },
    {
      id: '100',
      caption: 'Knead',
      imageUrl: 'https://media.istockphoto.com/id/525107259/vector/hands-kneading-dough.jpg?s=612x612&w=0&k=20&c=mWKl5mVQ8XbaLxv-wrZs8NoC1sPmbey1LSFZV7PBxmw='
    },
    {
      id: '101',
      caption: 'Knee',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0G-vFf9vw-F6wOplM7zGYFw0jBSky_benJg&s'
    },
    // 2 Consonant pattern: TCH - catch, pitch, crutch, match
    {
      id: '102',
      caption: 'Catch',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX5PCi0Tcg10gBn4pEqxj1NzpqZWAOTAxooQ&s'
    },
    {
      id: '103',
      caption: 'Pitch',
      imageUrl: 'https://media.istockphoto.com/id/1445646363/vector/a-baseball-player-now-pitching-a-ball.jpg?s=612x612&w=0&k=20&c=49s2swKltrbEWe7n24TxrbSuYiVT3NWc45QfI9itUVs='
    },
    {
      id: '104',
      caption: 'Crutch',
      imageUrl: 'https://www.shutterstock.com/image-vector/injured-man-walking-crutches-illustration-600nw-2643702771.jpg'
    },
    {
      id: '105',
      caption: 'Match',
      imageUrl: 'https://img.freepik.com/premium-vector/cartoon-isolated-vector-object-matches-fire_311865-9412.jpg'
    },
    // 3 Consonant pattern: MB - lamb, limb, crumb, thumb
    {
      id: '106',
      caption: 'Lamb',
      imageUrl: 'https://t3.ftcdn.net/jpg/05/90/17/26/360_F_590172680_mL0VBYGjt979JSmyNDpa1GKwz6ftViTF.jpg'
    },
    {
      id: '107',
      caption: 'Limb',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Af6gbUozTQOa8U4k2PcmVhZJTleIMLPxig&s'
    },
    {
      id: '108',
      caption: 'Crumb',
      imageUrl: 'https://media.istockphoto.com/id/1292898075/vector/bitten-chocolate-chip-cookie-crunch-homemade-brown-biscuits-broken-with-crumbs-cartoon-baked.jpg?s=612x612&w=0&k=20&c=eSX6FiWDrPfj2qC4Kj9JgHlxUGocMS3pSrFGI_mJu5w='
    },
    {
      id: '109',
      caption: 'Thumb',
      imageUrl: 'https://img.pikbest.com/png-images/qiantu/cartoon-thumb-up-gesture-illustration_2601767.png!sw800'
    },
    // 4 Consonant pattern: WR - wrap, unwrap, write, wreath
    {
      id: '110',
      caption: 'Wrap',
      imageUrl: 'https://i.pinimg.com/736x/dc/2d/84/dc2d84a46859e7b565ea1f630d0f08a8.jpg'
    },
    {
      id: '111',
      caption: 'Unwrap',
      imageUrl: 'https://thumbs.dreamstime.com/b/girl-unwrapping-present-12052067.jpg'
    },
    {
      id: '112',
      caption: 'Write',
      imageUrl: 'https://www.shutterstock.com/image-vector/animated-cute-boy-writing-book-600nw-2615213357.jpg'
    },
    {
      id: '113',
      caption: 'Wreath',
      imageUrl: 'https://t4.ftcdn.net/jpg/00/74/79/29/360_F_74792937_UfhWnXDF7ZCX9C34N6RAFr20Y4ADN6oh.jpg'
    },

    // Long Vowel A (ai / ay)
    {
      id: '114',
      caption: 'Snail',
      imageUrl: 'https://thumbs.dreamstime.com/b/cute-cartoon-snail-heart-funny-insect-hand-drawing-isolated-objects-white-background-vector-illustration-78263165.jpg'
    },
    {
      id: '115',
      caption: 'Paint',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGUcXu8ch7dVcUwToVLNvO5eoQ-GzCuZCYKw&s'
    },
    {
      id: '116',
      caption: 'Tail',
      imageUrl: 'https://media.istockphoto.com/id/1193261146/vector/mermaid-tail.jpg?s=612x612&w=0&k=20&c=lUaB3DveILYflWwICFcWuzrM4R31D1jfaYsUg1I_oM0='
    },
    {
      id: '117',
      caption: 'Rail',
      imageUrl: 'https://www.shutterstock.com/image-vector/cute-toy-train-locomotive-kid-600nw-2362636429.jpg'
    },
    {
      id: '118',
      caption: 'Play',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/026/234/984/non_2x/happy-cute-kids-play-slide-vector.jpg'
    },
    {
      id: '119',
      caption: 'Tray',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/066/318/408/non_2x/illustration-art-cute-mochi-on-the-wooden-tray-sticker-design-free-vector.jpg'
    },
    {
      id: '120',
      caption: 'Hay',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/047/852/834/non_2x/cute-kawaii-haystack-clipart-illustration-free-vector.jpg'
    },
    {
      id: '121',
      caption: 'Clay',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL8U8yYbdDlG77vIoRXnkcJw1u72sSEHckzg&s'
    },

    // Long Vowel A (a_e)
    {
      id: '122',
      caption: 'Bake',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe9305w8Ud0nnDG10BTmZubbkIrn7vDu6ow&s'
    },
    {
      id: '123',
      caption: 'Cake',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/047/852/819/non_2x/cute-kawaii-cake-cartoon-illustration-free-vector.jpg'
    },
    {
      id: '124',
      caption: 'Late',
      imageUrl: 'https://media.istockphoto.com/id/519039810/vector/running-late-to-school.jpg?s=612x612&w=0&k=20&c=pXa3NyhzzgYUj9HaET1UolOSmTIiJt7BHXIMqcx6kuc='
    },
    {
      id: '125',
      caption: 'Take',
      imageUrl: 'https://thumbs.dreamstime.com/b/opposite-give-take-vector-opposite-give-take-vector-illustration-115565007.jpg'
    },
    {
      id: '126',
      caption: 'Lake',
      imageUrl: 'https://vcdn1-english.vnecdn.net/2025/01/04/ho-gu-o-m-5852-1730994042-1735-6840-3701-1735962280.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=MaibxImQb3K0y1GWmorNJw'
    },
    {
      id: '127',
      caption: 'Wave',
      imageUrl: 'https://img.freepik.com/premium-vector/stylized-blue-ocean-wave-illustration_815570-13125.jpg'
    },
    {
      id: '128',
      caption: 'Same',
      imageUrl: 'https://media.istockphoto.com/id/2147666918/vector/cute-little-smiling-boys-twins-in-flat-design-on-white-background.jpg?s=612x612&w=0&k=20&c=uSTuKGOPDb8_x1JfxDVTnUWu6AYAqG203B4ipQzMxZc='
    },
    {
      id: '129',
      caption: 'Name',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/014/448/315/non_2x/plastic-name-badge-with-neck-strap-icon-flat-style-vector.jpg'
    },

    // Letter Dd words
    {
      id: '130',
      caption: 'Dive',
      imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-scuba-diver-exploring-vibrant-underwater-world-surrounded-coral-bubbles-illustration-discovering-colorful-352701380.jpg'
    },
    {
      id: '131',
      caption: 'Dig',
      imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/001/307/915/small/cute-little-boy-digging-hole-cartoon.jpg'
    },
    {
      id: '132',
      caption: 'Dad',
      imageUrl: 'https://www.shutterstock.com/image-vector/dad-my-superhero-fathers-day-600nw-2459864421.jpg'
    },
    {
      id: '133',
      caption: 'Panda',
      imageUrl: 'https://t4.ftcdn.net/jpg/06/62/75/19/360_F_662751973_USPJ5vrdRjgvNZGUUMTY1uLViCcc6SSG.jpg'
    },
    {
      id: '134',
      caption: 'Windy',
      imageUrl: 'https://thumbs.dreamstime.com/b/image-windy-day-trees-cloud-blowing-wind-cartoon-windy-day-trees-cloud-blowing-wind-110475663.jpg'
    },
    {
      id: '135',
      caption: 'Candy',
      imageUrl: 'https://thumbs.dreamstime.com/b/bright-pink-cartoon-candy-wrapped-exaggerated-ends-features-purple-stripes-glossy-sheen-suggesting-shiny-surface-390789149.jpg'
    },
    {
      id: '136',
      caption: 'Lid',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/005/390/257/non_2x/lid-icon-hand-drawn-color-illustration-isolated-on-white-background-kitchen-tool-cover-for-frying-pan-saucepan-pot-dishes-flat-cartoon-clipart-glass-object-with-plastic-handle-vector.jpg'
    },
    {
      id: '137',
      caption: 'Sled',
      imageUrl: 'https://t3.ftcdn.net/jpg/00/75/07/70/360_F_75077016_bESBy1flPXCkew6U7RWzQV9PXr42s0SJ.jpg'
    },
    {
      id: '138',
      caption: 'Bed',
      imageUrl: 'https://img.freepik.com/free-vector/cozy-wooden-single-bed-illustration_1308-169624.jpg?semt=ais_hybrid&w=740&q=80'
    },

    // Letter Gg words
    {
      id: '139',
      caption: 'Garden',
      imageUrl: 'https://img.freepik.com/premium-vector/cartoon-illustration-garden-with-fence-flowers_730620-949943.jpg'
    },
    {
      id: '140',
      caption: 'Grab',
      imageUrl: 'https://st2.depositphotos.com/1221766/5492/v/950/depositphotos_54928237-stock-illustration-grab-hand-elemment.jpg'
    },
    {
      id: '141',
      caption: 'Goat',
      imageUrl: 'https://www.shutterstock.com/image-vector/goat-vector-drawing-cartoon-fourlegged-600nw-2291378547.jpg'
    },
    {
      id: '142',
      caption: 'Sugar',
      imageUrl: 'https://img.freepik.com/premium-vector/jar-sugar-with-spoon_642458-971.jpg'
    },
    {
      id: '143',
      caption: 'Yogurt',
      imageUrl: 'https://thumbs.dreamstime.com/b/yogurt-clip-art-cartoon-illustration-fresh-fruit-spoon-32879220.jpg'
    },
    {
      id: '144',
      caption: 'Dragon',
      imageUrl: 'https://media.istockphoto.com/id/636949046/vector/angry-dragon-cartoon.jpg?s=612x612&w=0&k=20&c=Tk2D3kCK7JSmCZyFm0yz20TZR7U0Oe2pvaJsSI72_7Y='
    },
    {
      id: '145',
      caption: 'Frog',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/034/994/463/non_2x/adorable-cartoon-frog-sitting-on-water-lilly-leaf-vector.jpg'
    },

    // Letter Oo words
    {
      id: '146',
      caption: 'Ostrich',
      imageUrl: 'https://classroomclipart.com/image/static7/preview2/cartoon-ostrich-with-a-pink-neck-and-black-feathers-is-running-55848.jpg'
    },
    {
      id: '147',
      caption: 'Otter',
      imageUrl: 'https://t3.ftcdn.net/jpg/09/66/68/92/360_F_966689259_FUffErSpMFlCpIRwFyyrJ1I4eFgI0XnC.jpg'
    },
    {
      id: '148',
      caption: 'Orange',
      imageUrl: 'https://png.pngtree.com/png-vector/20231123/ourmid/pngtree-single-fruit-orange-cartoon-png-image_10706676.png'
    },
    {
      id: '149',
      caption: 'Sock',
      imageUrl: 'https://media.istockphoto.com/id/1401842987/vector/cute-cotton-and-woolen-socks-vector-illustration-of-stylish-hosiery-collection-cartoon.jpg?s=612x612&w=0&k=20&c=sr1fKl4qdZtggMIVK3Ldfc94hqU1BOrgoxbJjS4uVRg='
    },
    {
      id: '150',
      caption: 'Rock',
      imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-rock-illustration-design-automotive-fans-white-background-cartoon-illustration-featuring-large-rock-322723360.jpg'
    },

    // Consonant pattern: G
    {
      id: '151',
      caption: 'Game',
      imageUrl: 'https://thumbs.dreamstime.com/b/kids-playing-board-game-sitting-floor-vector-illustration-103460442.jpg'
    },
    {
      id: '152',
      caption: 'Glide',
      imageUrl: 'https://img.freepik.com/free-vector/hang-glider_1308-29195.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '153',
      caption: 'Gap',
      imageUrl: 'https://www.shutterstock.com/image-vector/ledge-chasm-empty-template-cliff-600nw-1777547960.jpg'
    },
    {
      id: '154',
      caption: 'Goal',
      imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-soccer-football-goalie-keeper-saving-goal-illustration-50840009.jpg'
    },
    {
      id: '155',
      caption: 'Gem',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvZI3hmuf98NPfPs-gXXGNDsLQKIU7YYYhQ&s'
    },
    {
      id: '156',
      caption: 'Magic',
      imageUrl: 'https://thumbs.dreamstime.com/b/magic-hat-isolated-show-cartoon-concept-illustrations-60822015.jpg'
    },
    {
      id: '157',
      caption: 'Stage',
      imageUrl: 'https://img.freepik.com/free-vector/retro-theater-stage-with-curtains-spotlights_107791-13864.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '158',
      caption: 'Huge',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/003/253/121/non_2x/big-and-small-elephants-cartoon-on-white-background-free-vector.jpg'
    },

    // Consonant pattern: C
    {
      id: '159',
      caption: 'Cape',
      imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-superhero-girl-stick-figure-red-cape-cute-94998506.jpg'
    },
    {
      id: '160',
      caption: 'Cane',
      imageUrl: 'https://thumbs.dreamstime.com/b/wooden-walking-stick-cane-wooden-walking-stick-cane-symbol-wooden-walking-stick-cane-sign-114114670.jpg'
    },
    {
      id: '161',
      caption: 'Cab',
      imageUrl: 'https://png.pngtree.com/png-clipart/20230330/ourmid/pngtree-taxi-yellow-taxi-cartoon-png-image_6673884.png'
    },
    {
      id: '162',
      caption: 'Cone',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoCIkJXjUbzRtV-JBv7c3EKG_gvuWhlXCwA&s'
    },
    {
      id: '163',
      caption: 'Mice',
      imageUrl: 'images/flashcards/163-mice.png'
    },
    {
      id: '164',
      caption: 'City',
      imageUrl: 'https://img.freepik.com/free-vector/scene-beautiful-cityscape-with-hight-building-shop-street-with-park_1150-48972.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '165',
      caption: 'Fancy',
      imageUrl: 'https://thumbs.dreamstime.com/b/beautiful-blonde-cartoon-girl-7128502.jpg'
    },
    {
      id: '166',
      caption: 'Lacy',
      imageUrl: 'https://img.kwcdn.com/product/fancy/8afc25ad-4fdf-41e3-8e71-6891b68d65df.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp'
    },

    // Musical Instruments
    {
      id: '167',
      caption: 'Guitar',
      imageUrl: 'https://img.freepik.com/premium-vector/guitar-clipart-vector-icon-sticker-illustration_761413-9146.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '168',
      caption: 'Tambourine',
      imageUrl: 'https://thumbs.dreamstime.com/b/simple-wooden-tambourine-hand-drawing-classic-81124960.jpg'
    },
    {
      id: '169',
      caption: 'Drum',
      imageUrl: 'https://img.freepik.com/free-vector/yellow-drum-illustration_24908-81974.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '170',
      caption: 'Piano',
      imageUrl: 'images/flashcards/170-piano.png'
    },
    {
      id: '171',
      caption: 'Maracas',
      imageUrl: 'https://png.pngtree.com/png-vector/20191028/ourlarge/pngtree-maracas-icon-cartoon-style-png-image_1889975.jpg'
    },
    {
      id: '174',
      caption: 'Violin',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTShd_JoQbY1uDaHt3jNVAg7nRIcxiu-DqzKQ&s'
    },
    {
      id: '175',
      caption: 'Xylophone',
      imageUrl: 'https://thumbs.dreamstime.com/b/xylophone-illustration-colorful-isolated-white-background-50726946.jpg'
    },
    {
      id: '176',
      caption: 'Handbell',
      imageUrl: 'https://media.istockphoto.com/id/502526048/vector/school-bell.jpg?s=612x612&w=0&k=20&c=-ZgcPs5_ITyo7X0p53m-Xi89D0udE3-D_PBXOWz6xdg='
    },
    {
      id: '177',
      caption: 'tea',
      imageUrl: 'images/flashcards/177-tea.png'
    },
    {
      id: '178',
      caption: 'pea',
      imageUrl: "https://www.shutterstock.com/image-vector/peas-pod-cartoon-600nw-2344437293.jpg"
    },
    {
      id: '179',
      caption: 'seal',
      imageUrl: "https://static.vecteezy.com/system/resources/previews/068/808/716/non_2x/illustration-of-a-cute-seal-cartoon-design-flat-marine-animal-icon-isolated-on-white-background-perfect-for-kids-and-sea-life-visuals-vector.jpg"
    },
    {
      id: '180',
      caption: 'meal',
      imageUrl: "https://img.freepik.com/premium-vector/cute-kawaii-lunch-box-menu-fried-rice-colorful-illustration_90661-287.jpg"
    },
    {
      id: '181',
      caption: 'leap',
      imageUrl: "https://thumb.ac-illust.com/64/6483717a059cca29f915f150d8425c7f_t.jpeg"
    },
    {
      id: '182',
      caption: 'clean',
      imageUrl: "https://www.shutterstock.com/image-vector/girl-mopping-floor-on-white-600nw-2162329623.jpg"
    },
    {
      id: '183',
      caption: 'stream',
      imageUrl: "https://media.istockphoto.com/id/1411364072/vector/beautiful-forest-stream.jpg?s=612x612&w=0&k=20&c=1c622tqfso9gGpdPbQ7TojP_OBa3lu4A1NbrM5Iq780="
    },
    {
      id: '184',
      caption: 'dream',
      imageUrl: "https://thumbs.dreamstime.com/b/girl-dreaming-whilst-sleeping-hand-drawn-picture-child-happy-thoughts-illustrated-loose-style-vector-eps-available-32518299.jpg"
    },
    {
      id: '185',
      caption: 'see',
      imageUrl: "https://media.istockphoto.com/id/1498871358/vector/vector-illustration-of-happy-woman-holding-binocular-and-looking-far-ahead-observation.jpg?s=612x612&w=0&k=20&c=p6mDM_yWqKdPzWXvjo0yMrPPa2s-3ogX50Du4EoBiK0="
    },
    {
      id: '186',
      caption: 'meet',
      imageUrl: "https://thumbs.dreamstime.com/b/cute-happy-kid-hand-shake-friend-agreement-background-boy-cartoon-character-children-clipart-design-friends-friendship-160885724.jpg"
    },
    {
      id: '187',
      caption: 'seed',
      imageUrl: "https://thumbs.dreamstime.com/b/sprouting-seed-illustration-cartoon-plant-seedling-different-stages-isolated-vector-clip-art-120244234.jpg"
    },
    {
      id: '188',
      caption: 'feed',
      imageUrl: "https://static.vecteezy.com/ti/vecteur-libre/t1/13432915-mignon-petit-garcon-nourrissant-son-chat-avec-de-la-nourriture-pour-animaux-a-la-maison-vectoriel.jpg"
    },
    {
      id: '189',
      caption: 'need',
      imageUrl: "https://cdn.displate.com/artwork/270x380/2025-05-10/88817b11-2b95-48e3-9c4d-e0d32877c6d8.jpg"
    },
    {
      id: '190',
      caption: 'week',
      imageUrl: "https://us.123rf.com/450wm/heebyj/heebyj1504/heebyj150400017/39180284-days-of-the-week-sticky-notes.jpg?ver=6"
    },
    {
      id: '191',
      caption: 'beet',
      imageUrl: "https://media.istockphoto.com/id/1975450250/vector/beet-character-cartoon-plays-the-guitar-sings-joy-cute-smile-face-vegetable-beautiful-vector.jpg?s=612x612&w=0&k=20&c=a4UNNdbrNWVHIVfIn-GTAjwy5vHRoaIDI3ZcF1dXjZg="
    },
    {
      id: '192',
      caption: 'leek',
      imageUrl: "https://i.pinimg.com/736x/c3/55/bc/c355bc0e06b0cd3be91faa218702d6fc.jpg"
    },
    {
      id: '193',
      caption: 'Clean/decorate the house',
      imageUrl: "https://i.pinimg.com/736x/ac/d4/17/acd41793e2374d8055d5b3a4788cb57f.jpg"
    },
    {
      id: '194',
      caption: 'Make Chung cake',
      imageUrl: "https://thumbs.dreamstime.com/b/hands-crafting-beautiful-sticky-rice-cake-lunar-new-year-holiday-person-carefully-wrapping-square-shaped-sticky-427669336.jpg"
    },
    {
      id: '195',
      caption: 'Go to the Tet market',
      imageUrl: "https://en-cdn.nhandan.vn/images/767e7ba477f43c18c09baa99f30631291c9e6a6dbf3b5cde262f02de6bbbf6b4c0a675fcdb07abc939b4248d1c09fd61a6d473f98ea0eb1a23ddbce29a634003b21f20756843905cd7e23f056b551287/fa33584c267699e2931b4ac22e057233.jpg"
    },
    {
      id: '196',
      caption: 'Visit grandparents',
      imageUrl: "https://img.freepik.com/premium-vector/happy-asian-girl-receiving-red-envelope-from-her-grandparents-lunar-new-year_699917-47.jpg"
    },
    {
      id: '197',
      caption: 'Meet friends',
      imageUrl: "https://www.shutterstock.com/image-vector/cute-chinese-children-wearing-traditional-260nw-2701620615.jpg"
    },
    {
      id: '198',
      caption: 'Watch fireworks',
      imageUrl: "https://img.freepik.com/premium-photo/asian-family-watching-fireworks-celebrating-happy-new-year-paint_303714-128.jpg"
    },
    {
      id: '199',
      caption: 'Go to the Pagoda',
      imageUrl: "https://static.vecteezy.com/system/resources/previews/055/011/143/non_2x/happy-chinese-new-year-poster-with-cartoon-chinese-girl-holding-envelope-in-front-of-heaven-temple-and-lanterns-hang-vector.jpg"
    },
    {
      id: '200',
      caption: 'Get lucky money',
      imageUrl: "https://media.istockphoto.com/id/1765418607/photo/chinese-new-year-tradition-for-good-luck.jpg?s=612x612&w=0&k=20&c=tV8P6oSrWKLAZlWxNrq7pdItqlCeeMk3XzIoEEjduAk="
    },
    {
      id: '201',
      caption: 'Lucky money',
      imageUrl: 'https://media.istockphoto.com/id/1301156648/vector/hand-holding-angpao-money-on-envelope-chinese-new-year-celebrate-concept-in-cartoon.jpg?s=612x612&w=0&k=20&c=3oDrOCxr8yRVoQRGGEPuviW9_BXa7oCsec1bqs0CqDI='
    },
    {
      id: '202',
      caption: 'Chung cake',
      imageUrl: 'https://www.shutterstock.com/image-vector/banh-tet-vietnamese-food-square-600nw-2569830947.jpg'
    },
    {
      id: '203',
      caption: 'Kumquat tree',
      imageUrl: 'https://media.istockphoto.com/id/1283044469/vector/mandarin-tree-for-chinese-new-year.jpg?s=612x612&w=0&k=20&c=tUr2wHS3wiIr75Tj-xz26rF5I94sP91lnzzDzdcROY4='
    },
    {
      id: '204',
      caption: 'Fireworks',
      imageUrl: 'https://cdn.tutsplus.com/cdn-cgi/image/width=600/vector/uploads/legacy/tuts/000-2011/385-fireworks-boom/final.jpg'
    },
    {
      id: '205',
      caption: 'Firecrackers',
      imageUrl: 'https://cbx-prod.b-cdn.net/COLOURBOX52704999.jpg?width=800&height=800&quality=70'
    },
    {
      id: '206',
      caption: 'Peach blossom',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/035/262/810/non_2x/peach-blossom-flat-illustration-isolated-on-white-background-element-for-spring-lunar-new-year-chinese-new-year-concept-clip-art-for-greating-card-banner-brochure-web-sticker-vector.jpg'
    },

    // Vowel patterns: oi, oy
    {
      id: '207',
      caption: 'oink',
      imageUrl: "https://media.istockphoto.com/id/1338098525/vector/pig-says-oink-hand-drawn-vector-illustration-cute-animal-with-lettering.jpg?s=612x612&w=0&k=20&c=Cm_z1Z7Aixw3ZVaybjZXx3G4ckp-0CPtFL9Z61F5XOI="
    },
    {
      id: '208',
      caption: 'oil',
      imageUrl: "https://thumbs.dreamstime.com/b/vector-illustration-olive-oil-bottle-hand-drawing-66539032.jpg"
    },
    {
      id: '209',
      caption: 'soil',
      imageUrl: "https://img.freepik.com/premium-vector/pile-ground-soil-growing-plants-vector-illustration_118339-5731.jpg"
    },
    {
      id: '210',
      caption: 'coin',
      imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/006/607/020/small/flat-illustration-of-gold-icon-suitable-for-design-element-of-banking-business-investment-and-finance-activity-coin-for-online-payment-free-vector.jpg"
    },
    {
      id: '211',
      caption: 'boy',
      imageUrl: "https://media.istockphoto.com/id/1241499465/vector/vector-mexican-boy-jumping-and-laughing-cartoon-character-design-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=nGEI21M6TDh9bZqC7tEbNpOfNtFrB4ZKeNIQB5CTq_g="
    },
    {
      id: '212',
      caption: 'toy',
      imageUrl: "https://img.freepik.com/free-vector/flat-design-christmas-toy-collection_23-2148355715.jpg"
    },
    {
      id: '213',
      caption: 'joy',
      imageUrl: "https://i.fbcd.co/products/resized/resized-750-500/wm-transparent-kids112-creative-d11e7346e8cd719a571efc711ed90420502a1af2c7a9e7f242e3d067e18ea34e.jpg"
    },
    {
      id: '214',
      caption: 'soybean',
      imageUrl: "https://media.istockphoto.com/id/1281064398/vector/set-of-soy-bean-plant-with-ripe-pods-and-green-leaves-whole-and-half-green-and-dry-brown.jpg?s=612x612&w=0&k=20&c=SKVaaBBy_96VlQx0f2oFWNKoEQ1KNjFfpkoow0h28z4="
    },

    // Vowel patterns: ou and ow
    {
      id: '215',
      caption: 'shout',
      imageUrl: "https://img.freepik.com/premium-vector/little-boy-angry-shout-little-girl_97632-3666.jpg"
    },
    {
      id: '216',
      caption: 'pouch',
      imageUrl: "https://thumbs.dreamstime.com/b/old-coin-pouch-full-gold-coins-cartoon-vector-illustration-279160684.jpg"
    },
    {
      id: '217',
      caption: 'pout',
      imageUrl: "https://media.istockphoto.com/id/1366367172/vector/little-girl-is-angry-and-dissatisfied-with-a-boy.jpg?s=612x612&w=0&k=20&c=NdIlEFoHLbkhTxa_tHDaThxaGCDiA3azzkm-PaJrq1c="
    },
    {
      id: '218',
      caption: 'ground',
      imageUrl: "https://thumbs.dreamstime.com/b/cartoon-empty-playground-vector-cute-insects-background-illustration-94729093.jpg"
    },
    {
      id: '219',
      caption: 'owl',
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5a182fa2e5dd5b3614f9907b/1528639256277-T9YU96SVAFFARCZI86AV/Tawny+owl+and+its+prey"
    },
    {
      id: '220',
      caption: 'cow',
      imageUrl: "https://t3.ftcdn.net/jpg/00/84/09/18/360_F_84091840_8wn1lAJ7jIuYRczt4PRqrrZUoAOoPVrO.jpg"
    },
    {
      id: '221',
      caption: 'frown',
      imageUrl: "https://www.shutterstock.com/image-vector/illustration-shows-angry-boy-black-600nw-2632544079.jpg"
    },
    {
      id: '222',
      caption: 'down',
      imageUrl: "https://i.graphicmama.com/resources/toons/cartoon-down-arrow-character-set/site-previews/siteBigWatermarkedImages/45-holding-a-pencil(concepts).jpg"
    },

    // Letter Uu - beginning and middle sounds
    {
      id: '224',
      caption: 'umbrella',
      imageUrl: "https://drawingsof.com/wp-content/uploads/2023/11/Umbrella3.png"
    },
    {
      id: '225',
      caption: 'up',
      imageUrl: "https://img.freepik.com/premium-vector/going-up-concept-illustration_114360-2292.jpg"
    },
    {
      id: '226',
      caption: 'under',
      imageUrl: "https://voca-land.sgp1.cdn.digitaloceanspaces.com/0/1757652180409/befdb826.jpg"
    },
    {
      id: '227',
      caption: 'Cup',
      imageUrl: "https://img.freepik.com/premium-vector/coffee-love-foam-with-beans-cartoon-icon_1185634-1890.jpg?semt=ais_hybrid&w=740&q=80"
    },

    // Letter Ll - beginning and middle sounds
    {
      id: '228',
      caption: 'Lion',
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1280px-Lion_waiting_in_Namibia.jpg"
    },
    {
      id: '229',
      caption: 'little',
      imageUrl: "https://static.vecteezy.com/system/resources/previews/001/883/033/non_2x/little-finger-making-pinky-sign-vector.jpg"
    },
    {
      id: '230',
      caption: 'laugh',
      imageUrl: "https://media.istockphoto.com/id/1171405497/vector/kids-children-laughing-together-vector.jpg?s=612x612&w=0&k=20&c=8YvBmmh2Nbu0PP_0jpW2I8U17MsaaqyVziYZKDNdy9w="
    },
    {
      id: '231',
      caption: 'leg',
      imageUrl: "https://media.istockphoto.com/id/931734144/vector/leg-vector-in-front-view.jpg?s=612x612&w=0&k=20&c=YLYm-riT2qe2u3XQJ2m46WwKxSnW6Le4UJpLfxB4CTc="
    },
    {
      id: '232',
      caption: 'lime',
      imageUrl: "https://t4.ftcdn.net/jpg/05/21/30/51/360_F_521305129_7qAZ0ySwXs0GqU7dQDdN3DugGeYWFq0x.jpg"
    },
    {
      id: '233',
      caption: 'plum',
      imageUrl: "https://t4.ftcdn.net/jpg/02/65/83/25/360_F_265832557_CISNdGFGlwUasm6seZ2t0TH0qGEhXIya.jpg"
    },
    {
      id: '234',
      caption: 'fly',
      imageUrl: "https://thumbs.dreamstime.com/b/cartoon-fly-character-waving-hello-cheerful-illustration-has-large-red-grid-patterned-eyes-smiling-gloved-395047009.jpg"
    },
    {
      id: '235',
      caption: 'to fly',
      imageUrl: "https://thumbs.dreamstime.com/b/happy-boy-kid-play-toy-fly-plane-160957915.jpg"
    },
    {
      id: '236',
      caption: 'plane',
      imageUrl: "https://as2.ftcdn.net/v2/jpg/01/14/28/33/1000_F_114283392_N0QIvEybkTEgx1mHCjfb0Xfq0q9mvuz9.jpg"
    },

    // Letter Bb - beginning, middle, and ending sounds
    {
      id: '237',
      caption: 'Box',
      imageUrl: 'https://www.shutterstock.com/image-vector/cute-cardboard-box-vector-illustration-600nw-2684480605.jpg'
    },
    {
      id: '238',
      caption: 'bee',
      imageUrl: 'https://www.shutterstock.com/image-vector/flat-vector-illustration-simple-childrens-600nw-2657592787.jpg'
    },
    {
      id: '239',
      caption: 'bird',
      imageUrl: 'https://www.shutterstock.com/image-vector/cute-little-blue-bird-good-600nw-2499877877.jpg'
    },
    {
      id: '240',
      caption: 'bus',
      imageUrl: 'https://thumb.ac-illust.com/46/467f43de7c0ae49ec2dc2f87d6395540_t.jpeg'
    },
    {
      id: '241',
      caption: 'bag',
      imageUrl: 'https://i.pinimg.com/474x/12/a9/42/12a942d1e0fcf7f4d52a13d87975aaab.jpg'
    },
    {
      id: '242',
      caption: 'cowboy',
      imageUrl: 'https://www.shutterstock.com/image-vector/cute-little-cowboy-riding-horse-600nw-2628588073.jpg'
    },
    {
      id: '243',
      caption: 'web',
      imageUrl: 'https://thumbs.dreamstime.com/b/charming-vector-illustration-cute-spider-diligently-spinning-its-web-showcasing-nature-s-intricate-design-image-419683097.jpg'
    },
    {
      id: '244',
      caption: 'crab',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTs4A2UCp2w66oiEkmCptrDD1JRGutzY2pg&s'
    },
    {
      id: '245',
      caption: 'bib',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/022/100/096/non_2x/baby-bib-decorated-with-a-cute-elephant-in-color-doodle-style-flat-style-with-outline-hand-drawn-illustration-isolated-on-white-pastel-colors-pink-blue-beige-child-feeding-item-vector.jpg'
    },

    // Letter Jj - beginning sounds
    {
      id: '246',
      caption: 'Jungle',
      imageUrl: 'https://media.istockphoto.com/id/1436040893/vector/beautiful-jungle-waterfall.jpg?s=612x612&w=0&k=20&c=0QDETo_7vl5E3Gejf4MTVgop_okXv27HLTKsi4rXts4='
    },
    {
      id: '247',
      caption: 'jaguar',
      imageUrl: 'https://i.fbcd.co/products/original/1-d8ba1fb15056e24fb1f3b9023cbd4b2b432d7c4a1e70bec8ffa6dc8f4ce01731.jpg'
    },
    {
      id: '248',
      caption: 'jump',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/027/161/432/non_2x/illustration-of-a-cute-girl-in-a-jump-vector.jpg'
    },

    // Letter Ww - beginning and middle sounds
    {
      id: '249',
      caption: 'Watch',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWk003-lUHgy1ljEYAS_fmcyQyazE4x2tI3A&s'
    },
    {
      id: '250',
      caption: 'wolf',
      imageUrl: 'https://thumbs.dreamstime.com/b/illustration-cute-cartoon-wolf-white-background-76092877.jpg'
    },
    {
      id: '251',
      caption: 'wig',
      imageUrl: 'https://www.shutterstock.com/image-vector/blonde-wig-on-mannequin-isolated-600nw-2604998079.jpg'
    },
    {
      id: '252',
      caption: 'wet',
      imageUrl: 'https://thumbs.dreamstime.com/b/unhappy-girl-under-rain-flat-vector-illustration-sad-preteen-child-bad-rainy-weather-unhappy-girl-under-rain-flat-vector-185754867.jpg'
    },
    {
      id: '253',
      caption: 'swing',
      imageUrl: 'https://thumbs.dreamstime.com/b/happy-cute-little-kid-girl-play-swing-177080143.jpg'
    },
    {
      id: '254',
      caption: 'swan',
      imageUrl: 'https://img.freepik.com/premium-vector/cartoon-illustration-cute-swan_29937-9860.jpg'
    },

    // Long vowel: o_e
    {
      id: '255',
      caption: 'mole',
      imageUrl: 'https://thumbs.dreamstime.com/b/cute-brown-cartoon-mole-illustration-cute-brown-cartoon-mole-illustration-380203629.jpg'
    },
    {
      id: '256',
      caption: 'home',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/065/493/574/non_2x/cute-house-cartoon-house-character-free-vector.jpg'
    },
    {
      id: '257',
      caption: 'hole',
      imageUrl: 'https://media.istockphoto.com/id/2155948344/vector/soil-pit-and-pile-cartoon-vector-icon.jpg?s=612x612&w=0&k=20&c=XqXnFcSU0qXu91JqYTWUnWosifpcKM7PYppatVULVhc='
    },
    {
      id: '258',
      caption: 'rope',
      imageUrl: 'https://png.pngtree.com/png-clipart/20230630/ourmid/pngtree-rope-illustration-png-image_7369994.png'
    },
    {
      id: '259',
      caption: 'bone',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/054/025/036/non_2x/a-cute-dog-bone-icon-with-a-pink-face-free-vector.jpg'
    },
    {
      id: '260',
      caption: 'hope',
      imageUrl: 'https://www.shutterstock.com/image-vector/little-kid-show-praying-pose-600nw-2318772437.jpg'
    },
    {
      id: '261',
      caption: 'poke',
      imageUrl: 'https://media.istockphoto.com/id/1807980694/vector/girl-and-boy-point-fingers-at-each-other.jpg?s=612x612&w=0&k=20&c=k3tRXVvdEWA-NVjTV5AX9caHoMzU0kjwqKwDGd2gljI='
    },
    {
      id: '262',
      caption: 'stone',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnqoCDpIL21H0DF1Gq2hKjBW3GCvllzG8XQ&s'
    },

    // Vowel pattern: oo
    {
      id: '263',
      caption: 'wood',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQu-5gsRKawXXPDyLfSqOudRSYm4D-lcWVEA&s'
    },
    {
      id: '264',
      caption: 'cook',
      imageUrl: 'https://thumbs.dreamstime.com/b/cute-chef-cooking-icon-cartoon-smiling-pan-stove-vegetables-utensils-around-pastel-kawaii-design-403582374.jpg'
    },
    {
      id: '265',
      caption: 'foot',
      imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-foot-cartoon-illustration_23-2151086600.jpg?semt=ais_rp_progressive&w=740&q=80'
    },
    {
      id: '266',
      caption: 'scoop',
      imageUrl: 'https://i.pinimg.com/736x/51/68/58/516858e3c0d6244597fed90cbb623c82.jpg'
    },
    {
      id: '267',
      caption: 'spoon',
      imageUrl: 'https://img.freepik.com/free-vector/sticker-spoon-kitchenware-white-background_1308-67037.jpg?semt=ais_user_personalization&w=740&q=80'
    },
    {
      id: '268',
      caption: 'food',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/011/888/913/non_2x/fast-food-cute-doodle-free-vector.jpg'
    },
    {
      id: '269',
      caption: 'zoo',
      imageUrl: 'https://thumbs.dreamstime.com/b/adorable-zoo-animals-wearing-sunglasses-sunny-day-illustration-ai-generated-charming-features-group-animals%E2%80%94a-lion-413541720.jpg'
    },

    // Vowel patterns: au, aw
    {
      id: '270',
      caption: 'August',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ZsblU8OWxS42aqbXwCVc9sZzUtMIBJlyYw&s'
    },
    // {
    //   id: '271',
    //   caption: 'lunch',
    //   imageUrl: 'https://www.shutterstock.com/image-vector/orange-lunch-box-illustration-hand-260nw-2504346221.jpg'
    // },
    {
      id: '271',
      caption: 'launch',
      imageUrl: 'https://img.freepik.com/premium-vector/rocket-launch-illustration_118339-46.jpg'
    },
    {
      id: '272',
      caption: 'laundry',
      imageUrl: 'https://www.shutterstock.com/image-vector/woman-busy-dirty-laundry-vector-600nw-2453362105.jpg'
    },
    {
      id: '273',
      caption: 'maul',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPZebobIXoXNYheuVQYjI06Xlw50-7bjtCw&s'
    },
    {
      id: '274',
      caption: 'hawk',
      imageUrl: 'https://thumb.ac-illust.com/c3/c3cb95e7f257575b7f39935ce19c66da_t.jpeg'
    },
    {
      id: '275',
      caption: 'crawl',
      imageUrl: 'https://media.istockphoto.com/id/1844317102/vector/cute-and-happy-little-black-baby-crawling-vector-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qGQgJcIEsnKJG0PnoYAZFxXqR6PI3APru5FX8ooAhtI='
    },
    {
      id: '276',
      caption: 'paw',
      imageUrl: 'https://media.istockphoto.com/id/1205839419/vector/paws-raised.jpg?s=612x612&w=0&k=20&c=CAO44zrxjZIKFLfZ48X0FVk41xoXKSXn49hZWaglQ94='
    },
    {
      id: '277',
      caption: 'claw',
      imageUrl: 'https://img.freepik.com/premium-vector/tiger-claws-icon-clipart-avatar-logotype-isolated-vector-illustration_955346-957.jpg'
    },

    // Vowel pattern: ar
    {
      id: '278',
      caption: 'farm',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/002/752/392/non_2x/cute-cartoon-farm-animals-illustration-vector.jpg'
    },
    {
      id: '279',
      caption: 'cart',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi_cJ4jjC65yRUBSskF7X9gEII0g5TLwH-JQ&s'
    },
    {
      id: '280',
      caption: 'yard',
      imageUrl: 'images/flashcards/280-yard.png'
    },
    {
      id: '281',
      caption: 'barn',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSZIgWa0y0WlwsMIehbvv5x8KFsiDFv7k_rQ&s'
    },

    // Caterpillar story (The Very Hungry Caterpillar) – characters & food
    {
      id: '282',
      caption: 'egg',
      imageUrl: 'https://www.shutterstock.com/image-vector/vector-egg-character-set-cute-600nw-2497161403.jpg'
    },
    {
      id: '283',
      caption: 'caterpillar',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU5ajFo1RCMxDr4zAnaGh1yEZw6IRKqr3rmg&s'
    },
    {
      id: '284',
      caption: 'cocoon',
      imageUrl: 'https://img.freepik.com/free-vector/cartoon-illustration-caterpillar-sleeping-branch_341269-1180.jpg?w=360'
    },
    {
      id: '285',
      caption: 'butterfly',
      imageUrl: 'https://t4.ftcdn.net/jpg/02/10/89/63/360_F_210896350_lCaO4AFuh3NB9Qn4GDJn7mn2EfBgjIUL.jpg'
    },
    {
      id: '287',
      caption: 'pear',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9-OvlpGNBsTqT6xlKDluwZRZY_xI5ZL0-DA&s'
    },
    {
      id: '288',
      caption: 'strawberry',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/016/733/285/non_2x/strawberry-cute-illustration-concept-in-cartoon-style-on-isolated-background-vector.jpg'
    },
    {
      id: '289',
      caption: 'chocolate cake',
      imageUrl: 'https://i.pinimg.com/736x/2d/09/f4/2d09f405524fec7a1762da0fefc895e7.jpg'
    },
    {
      id: '290',
      caption: 'ice-cream cone',
      imageUrl: 'https://i.pinimg.com/736x/34/5a/23/345a2394d37343344f334f8d3e8b069a.jpg'
    },
    {
      id: '291',
      caption: 'pickle',
      imageUrl: 'https://thumbs.dreamstime.com/b/cartoon-pickle-character-happy-face-arms-legs-stands-against-green-background-pickle-has-cute-cheerful-386547372.jpg'
    },
    {
      id: '292',
      caption: 'slice of cheese',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/041/927/422/non_2x/cheese-slice-clip-art-cartoon-illustration-design-vector.jpg'
    },
    {
      id: '293',
      caption: 'slice of salami',
      imageUrl: 'https://as2.ftcdn.net/jpg/03/21/07/71/1000_F_321077112_J9Gw19G4Cu3yfHphiaRm9YazOCg7Q9Ya.jpg'
    },
    {
      id: '294',
      caption: 'lollipop',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCjx6MP0f-y1-jgT1nXV9X0S_Ch3yFTPBSyA&s'
    },
    {
      id: '295',
      caption: 'piece of cherry pie',
      imageUrl: 'https://www.shutterstock.com/image-vector/piece-cherry-pie-fruit-dessert-600nw-2376184791.jpg'
    },
    {
      id: '296',
      caption: 'sausage',
      imageUrl: 'https://media.istockphoto.com/id/1128896178/vector/two-sausages-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=z1EN0zh4PlJpcKquDtqqifV8bs0tnT2L0ILTVH5O578='
    },
    {
      id: '297',
      caption: 'green leaf',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mxnBfQP3B0fLvTSIbc405p70OsTrAWeSBQ&s'
    },

    // Farm and home words (from photo set)
    {
      id: '298',
      caption: 'fork',
      imageUrl: 'https://img.pikbest.com/png-images/qianku/cartoon-style-hand-drawn-pink-cute-fork_2033369.png!sw800'
    },
    {
      id: '299',
      caption: 'corn',
      imageUrl: 'https://img.freepik.com/premium-vector/cute-cartoon-sweet-vegetable-corn-vector-illustration_773815-136.jpg'
    },
    {
      id: '300',
      caption: 'porch',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo88SY5XhLagNOjqC8eVARNEnoxN-f3a41Og&s'
    },
    {
      id: '301',
      caption: 'north',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/026/178/385/non_2x/cute-penguin-eating-fish-with-north-pole-arctic-vector.jpg'
    },

    // Vowel patterns: air, are, ear
    {
      id: '302',
      caption: 'airplane',
      imageUrl: 'https://i.pinimg.com/564x/34/de/1d/34de1d8c26fce68770336743c5023cc5.jpg'
    },
    {
      id: '303',
      caption: 'fair',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_iwKPlTvjbGGL-nW-MT_zZHTvOGnxRK6Pw&s'
    },
    {
      id: '304',
      caption: 'chair',
      imageUrl: 'https://img.magnific.com/premium-vector/chair-clipart-cartoon-style-illustration_761413-4364.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '305',
      caption: 'hare',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-E3he1LD4kio2rX2V7m1ugvAlbQPHAb5EkQ&s'
    },
    {
      id: '306',
      caption: 'square',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSabqbtAqblyKqAJzzsEVaMQ4NNcZThUjia3Q&s'
    },
    {
      id: '307',
      caption: 'share',
      imageUrl: 'https://thumbs.dreamstime.com/b/happy-cute-little-kid-boy-girl-sharing-food-to-friend-202346713.jpg'
    },
    {
      id: '308',
      caption: 'bear',
      imageUrl: 'https://www.shutterstock.com/image-vector/cartoon-brown-grizzly-bear-isolated-600nw-2485523341.jpg'
    },
    {
      id: '309',
      caption: 'tear',
      imageUrl: 'https://thumbs.dreamstime.com/b/eyes-crying-tears-cartoon-illustration-eyes-crying-tears-cartoon-illustration-vector-430184579.jpg'
    },

    // Camping
    {
      id: '310',
      caption: 'tent',
      imageUrl: 'https://img.magnific.com/premium-vector/outdoor-tourist-tent-cartoon-icon-campsite-symbol_81894-13209.jpg'
    },
    {
      id: '311',
      caption: 'torch',
      imageUrl: 'https://st4.depositphotos.com/1742172/22540/v/450/depositphotos_225400868-stock-illustration-cartoon-doodle-burning-torch-brand.jpg'
    },
    {
      id: '311b',
      caption: 'flashlight',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQamsTfUu3_Iyszt6_CozxPNund8pbM09Hy2Q&s'
    },
    {
      id: '312',
      caption: 'map',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/035/157/354/non_2x/cute-cartoon-map-illustration-2d-or-flat-design-style-with-ornament-on-the-map-children-style-use-for-icon-game-game-design-children-book-story-book-vector.jpg'
    },
    {
      id: '313',
      caption: 'sleeping bag',
      imageUrl: 'https://img.freepik.com/premium-vector/young-girl-resting-inside-sleeping-bag-after-camping_98396-142148.jpg'
    },
    {
      id: '314',
      caption: 'backpack',
      imageUrl: 'https://png.pngtree.com/png-vector/20241210/ourmid/pngtree-cute-cartoon-backpack-with-school-supplies-clipart-png-image_14652842.png'
    },

    // Long vowel: u_e
    {
      id: '315',
      caption: 'mule',
      imageUrl: 'https://cdn.vectorstock.com/i/500p/61/46/cute-baby-donkey-cartoon-walking-vector-38706146.jpg'
    },
    {
      id: '316',
      caption: 'cube',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQuwEOJxMTrI4GUebIj3xLipyaJZlGQIn5fA&s'
    },
    {
      id: '317',
      caption: 'cute',
      imageUrl: 'https://images.playgroundai.com/fc9924ed-3c84-4682-acb9-97ac7317a860.png?c=1'
    },
    {
      id: '318',
      caption: 'mute',
      imageUrl: 'https://thumbs.dreamstime.com/b/emoticon-cartoon-making-silence-sign-illustration-33233448.jpg'
    },
    {
      id: '319',
      caption: 'June',
      imageUrl: 'https://thumbs.dreamstime.com/b/june-calendar-wall-funny-dogs-fun-children-s-illustration-cartoon-style-colorful-vector-background-vertical-92635915.jpg'
    },
    {
      id: '320',
      caption: 'dune',
      imageUrl: 'https://thumbs.dreamstime.com/b/desert-dune-landscape-vector-cartoon-illustration-desert-dune-mountain-background-sahara-cartoon-minimal-sand-design-desert-dune-373375935.jpg'
    },
    {
      id: '321',
      caption: 'tube',
      imageUrl: 'https://thumbs.dreamstime.com/b/blank-blue-cosmetic-tube-cream-gel-cartoon-vector-illustration-413479149.jpg'
    },
    {
      id: '322',
      caption: 'tune',
      imageUrl: 'https://img.freepik.com/free-vector/doodle-cartoon-character-singer-girl-singing-with-musical-melody-symbols_1308-65839.jpg?semt=ais_hybrid&w=740&q=80'
    },

    // Review short vowel a
    {
      id: '323',
      caption: 'mat',
      imageUrl: 'https://thumbs.dreamstime.com/b/purple-rolled-yoga-mat-cartoon-vector-illustration-449832685.jpg'
    },
    {
      id: '324',
      caption: 'jam',
      imageUrl: 'https://img.magnific.com/premium-vector/strawberry-jam-cartoon-vector-icon-illustration_635131-3116.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: '325',
      caption: 'nap',
      imageUrl: 'https://i.pinimg.com/736x/5f/60/73/5f6073418804b4f90dc65a266d70b1ce.jpg'
    },
    {
      id: '326',
      caption: 'rat',
      imageUrl: 'https://www.shutterstock.com/image-vector/vector-illustration-cheerful-black-rat-600nw-2654474323.jpg'
    },
    {
      id: '327',
      caption: 'mad',
      imageUrl: 'https://img.magnific.com/free-vector/flat-design-hate-emoji-illustration_23-2151007709.jpg?semt=ais_hybrid&w=740&q=80'
    },

    // Review short vowel e
    {
      id: '328',
      caption: 'hen',
      imageUrl: 'images/flashcards/328-hen.png'
    },
    {
      id: '329',
      caption: 'pen',
      imageUrl: 'images/flashcards/329-pen.png'
    },
    {
      id: '330',
      caption: 'ten',
      imageUrl: 'images/flashcards/330-ten.png'
    },
    {
      id: '331',
      caption: 'men',
      imageUrl: 'images/flashcards/331-men.png'
    },
    {
      id: '332',
      caption: 'red',
      imageUrl: 'images/flashcards/332-red.png'
    },
    {
      id: '333',
      caption: 'pet',
      imageUrl: 'images/flashcards/333-pet.png'
    },
    {
      id: '334',
      caption: 'end',
      imageUrl: 'images/flashcards/334-end.png'
    },
    {
      id: '335',
      caption: 'bend',
      imageUrl: 'images/flashcards/335-bend.png'
    },
    {
      id: '336',
      caption: 'help',
      imageUrl: 'images/flashcards/336-help.png'
    },
    {
      id: '337',
      caption: 'vet',
      imageUrl: 'images/flashcards/337-vet.png'
    },
    {
      id: '338',
      caption: 'rest',
      imageUrl: 'images/flashcards/338-rest.png'
    },
    {
      id: '339',
      caption: 'rules',
      imageUrl: 'images/flashcards/339-rules.png'
    },
    {
      id: '340',
      caption: 'be quiet',
      imageUrl: 'images/flashcards/340-be-quiet.png'
    },
    {
      id: '341',
      caption: 'sit nicely',
      imageUrl: 'images/flashcards/341-sit-nicely.png'
    },
    {
      id: '342',
      caption: 'be nice/kind',
      imageUrl: 'images/flashcards/342-be-nice-kind.png'
    },
    {
      id: '343',
      caption: 'listen to the teacher',
      imageUrl: 'images/flashcards/343-listen-to-the-teacher.png'
    },
    {
      id: '344',
      caption: 'look and listen',
      imageUrl: 'images/flashcards/344-look-and-listen.png'
    },
    {
      id: '345',
      caption: 'speak English',
      imageUrl: 'images/flashcards/345-speak-english.png'
    },
    {
      id: '346',
      caption: 'raise your hand',
      imageUrl: 'images/flashcards/346-raise-your-hand.png'
    },
    {
      id: '347',
      caption: 'wait your turn',
      imageUrl: 'images/flashcards/347-wait-your-turn.png'
    },
    {
      id: '348',
      caption: 'clean up',
      imageUrl: 'images/flashcards/348-clean-up.png'
    },
    {
      id: '349',
      caption: 'learning corner',
      imageUrl: 'images/flashcards/349-learning-corner.png'
    },
    {
      id: '350',
      caption: 'reading corner',
      imageUrl: 'images/flashcards/350-reading-corner.png'
    },
    {
      id: '351',
      caption: 'building corner',
      imageUrl: 'images/flashcards/351-building-corner.png'
    },
    {
      id: '352',
      caption: 'music corner',
      imageUrl: 'images/flashcards/352-music-corner.png'
    },
    {
      id: '353',
      caption: 'cooking corner',
      imageUrl: 'images/flashcards/353-cooking-corner.png'
    },
    {
      id: '354',
      caption: 'role play corner',
      imageUrl: 'images/flashcards/354-role-play-corner.png'
    },

    // Review short vowel i
    {
      id: '355',
      caption: 'big',
      imageUrl: 'images/flashcards/355-big.png'
    },
    {
      id: '356',
      caption: 'pig',
      imageUrl: 'images/flashcards/356-pig.png'
    },
    {
      id: '357',
      caption: 'sit',
      imageUrl: 'images/flashcards/357-sit.png'
    },
    {
      id: '358',
      caption: 'pit',
      imageUrl: 'images/flashcards/358-pit.png'
    },
    {
      id: '359',
      caption: 'kid',
      imageUrl: 'images/flashcards/359-kid.png'
    },
    {
      id: '360',
      caption: 'bin',
      imageUrl: 'images/flashcards/360-bin.png'
    },
    {
      id: '361',
      caption: 'fig',
      imageUrl: 'images/flashcards/361-fig.png'
    },
    {
      id: '362',
      caption: 'tip',
      imageUrl: 'images/flashcards/362-tip.png'
    },
    {
      id: '363',
      caption: 'rip',
      imageUrl: 'images/flashcards/363-rip.png'
    },
    {
      id: '364',
      caption: 'hit',
      imageUrl: 'images/flashcards/364-hit.png'
    },
    {
      id: '365',
      caption: 'gift',
      imageUrl: 'images/flashcards/365-gift.png'
    },
    {
      id: '366',
      caption: 'twin',
      imageUrl: 'images/flashcards/366-twin.png'
    },
    {
      id: '367',
      caption: 'trip',
      imageUrl: 'images/flashcards/367-trip.png'
    },
    {
      id: '368',
      caption: 'slip',
      imageUrl: 'images/flashcards/368-slip.png'
    },
    {
      id: '369',
      caption: 'flip',
      imageUrl: 'images/flashcards/369-flip.png'
    },

    // Learning Corner
    {
      id: '370',
      caption: 'pencil',
      imageUrl: 'images/flashcards/370-pencil.png'
    },
    {
      id: '371',
      caption: 'crayon',
      imageUrl: 'images/flashcards/371-crayon.png'
    },
    {
      id: '372',
      caption: 'glue',
      imageUrl: 'images/flashcards/372-glue.png'
    },
    {
      id: '373',
      caption: 'scissors',
      imageUrl: 'images/flashcards/373-scissors.png'
    },
    {
      id: '374',
      caption: 'write the letter',
      imageUrl: 'images/flashcards/374-write-the-letter.png'
    },
    {
      id: '375',
      caption: 'do homework',
      imageUrl: 'images/flashcards/375-do-homework.png'
    },

    // Reading Corner
    {
      id: '376',
      caption: 'bookshelf',
      imageUrl: 'images/flashcards/376-bookshelf.png'
    },
    {
      id: '377',
      caption: 'story books',
      imageUrl: 'images/flashcards/377-story-books.png'
    },
    {
      id: '378',
      caption: 'table',
      imageUrl: 'images/flashcards/378-table.png'
    },
    {
      id: '379',
      caption: 'read a book',
      imageUrl: 'images/flashcards/379-read-a-book.png'
    },
    {
      id: '380',
      caption: 'listen to the story',
      imageUrl: 'images/flashcards/380-listen-to-the-story.png'
    },
    {
      id: '381',
      caption: 'tell the story',
      imageUrl: 'images/flashcards/381-tell-the-story.png'
    },

    // Building Corner
    {
      id: '382',
      caption: 'blocks',
      imageUrl: 'images/flashcards/382-blocks.png'
    },
    {
      id: '383',
      caption: 'bricks',
      imageUrl: 'images/flashcards/383-bricks.png'
    },
    {
      id: '384',
      caption: 'safety helmet',
      imageUrl: 'images/flashcards/384-safety-helmet.png'
    },
    {
      id: '385',
      caption: 'build the house',
      imageUrl: 'images/flashcards/385-build-the-house.png'
    },
    {
      id: '386',
      caption: 'build the bridge',
      imageUrl: 'images/flashcards/386-build-the-bridge.png'
    },

    // Music Corner
    {
      id: '387',
      caption: 'musical instruments',
      imageUrl: 'images/flashcards/387-musical-instruments.png'
    },
    {
      id: '388',
      caption: 'play the musical instruments',
      imageUrl: 'images/flashcards/388-play-the-musical-instruments.png'
    },
    {
      id: '389',
      caption: 'sing a song',
      imageUrl: 'images/flashcards/389-sing-a-song.png'
    },

    // Disneyland
    {
      id: '390',
      caption: 'castle',
      imageUrl: 'images/flashcards/390-castle.png'
    },
    {
      id: '391',
      caption: 'park',
      imageUrl: 'images/flashcards/391-park.png'
    },
    {
      id: '392',
      caption: 'princess',
      imageUrl: 'images/flashcards/392-princess.png'
    },
    {
      id: '393',
      caption: 'prince',
      imageUrl: 'images/flashcards/393-prince.png'
    },
    {
      id: '394',
      caption: 'fairy',
      imageUrl: 'images/flashcards/394-fairy.png'
    },
    {
      id: '395',
      caption: 'Mickey & Minnie Mouse',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjSAhNqyUvxbG9_iNWBrVKNWElQoAFnGRnEw&s'
    },
    {
      id: '396',
      caption: 'Donald Duck',
      imageUrl: 'https://i.pinimg.com/736x/13/6c/13/136c13f7425cae5d3bf71b5bf8a41f6f.jpg'
    },
    {
      id: '397',
      caption: 'Elsa',
      imageUrl: 'https://i.pinimg.com/564x/13/7d/1f/137d1fed5fff4104910e162fdccd1479.jpg'
    },
    {
      id: '398',
      caption: 'Anna',
      imageUrl: 'https://i.pinimg.com/736x/87/31/34/873134247dd1b8074c4585ea402ac56c.jpg'
    },
    {
      id: '399',
      caption: 'Cinderella',
      imageUrl: 'https://easydrawingguides.com/wp-content/uploads/2019/07/how-to-draw-cinderella-featured-image-1200.png'
    },
    {
      id: '400',
      caption: 'Moana',
      imageUrl: 'https://cdn.displate.com/artwork/857x1200/2024-08-13/9e0a69f50a0888adf15f4cd781d710a6_16b927cc2332ca6b5515bb5141cc1e23.jpg'
    },
    {
      id: '401',
      caption: 'Judy',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7iLCJJYZJ31E9mXZ6I9Gi2UmE1sVd8lsRmQ&s'
    },
    {
      id: '402',
      caption: 'Belle',
      imageUrl: 'https://i.pinimg.com/736x/99/65/ab/9965abc1cea322ecb6ea4f764691268d.jpg'
    },
    {
      id: '403',
      caption: 'Beast',
      imageUrl: 'https://i.pinimg.com/474x/d3/00/c5/d300c5ad0e6079941b483ac19e7ce100.jpg'
    },
    {
      id: '404',
      caption: 'Snow White',
      imageUrl: 'https://e7.pngegg.com/pngimages/115/558/png-clipart-snow-white-illustration-snow-white-dress-at-the-movies-cartoons.png'
    },
    {
      id: '405',
      caption: 'stepmother',
      imageUrl: 'https://mickeyblog.com/wp-content/uploads/2021/04/A-Wicked-Stepmothers-Side-Of-The-Story-Cinderella-Evil-Stepmother.jpg'
    },
    {
      id: '406',
      caption: 'stepsisters',
      imageUrl: 'https://i.pinimg.com/736x/d0/32/8c/d0328c09856014a80c25bab114ce7d93.jpg'
    },
    {
      id: '407',
      caption: 'fairy Godmother',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Q8aF_SkiMM3AEkPmAn5eF-WKoGceCOBCsW2DrnRB8yJvfRn1BZ0bqtjK&s=10'
    },
    {
      id: '408',
      caption: 'pumpkin',
      imageUrl: 'images/flashcards/408-pumpkin.png'
    },
    {
      id: '409',
      caption: 'lizard',
      imageUrl: 'images/flashcards/409-lizard.png'
    },
    {
      id: '410',
      caption: 'mouse',
      imageUrl: 'images/flashcards/410-mouse.png'
    },
    {
      id: '411',
      caption: 'carriage',
      imageUrl: 'https://i.pinimg.com/564x/56/ba/a8/56baa8ed60283a1548fdf09eccd690cc.jpg'
    },
    {
      id: '412',
      caption: 'driver',
      imageUrl: 'images/flashcards/412-driver.png'
    },
    {
      id: '413',
      caption: 'sad',
      imageUrl: 'images/flashcards/413-sad.png'
    },
    {
      id: '414',
      caption: 'happy',
      imageUrl: 'images/flashcards/414-happy.png'
    },
    {
      id: '415',
      caption: 'beautiful',
      imageUrl: 'images/flashcards/415-beautiful.png'
    },
    {
      id: '416',
      caption: 'ugly',
      imageUrl: 'images/flashcards/416-ugly.png'
    },
    {
      id: '417',
      caption: 'mean',
      imageUrl: 'images/flashcards/417-mean.png'
    },
    {
      id: '418',
      caption: 'Pinocchio',
      imageUrl: 'https://www.shutterstock.com/image-vector/picture-pinocchios-hand-smiling-260nw-2490410481.jpg'
    },
    {
      id: '419',
      caption: 'fox',
      imageUrl: 'images/flashcards/419-fox.png'
    },
    {
      id: '420',
      caption: 'donkey',
      imageUrl: 'images/flashcards/420-donkey.png'
    },
    {
      id: '421',
      caption: 'sea gull',
      imageUrl: 'images/flashcards/421-sea-gull.png'
    },
    {
      id: '422',
      caption: 'whale',
      imageUrl: 'images/flashcards/422-whale.png'
    },
    {
      id: '423',
      caption: 'long',
      imageUrl: 'images/flashcards/423-long.png'
    },
    {
      id: '424',
      caption: 'small',
      imageUrl: 'images/flashcards/424-small.png'
    },
    {
      id: '425',
      caption: 'school',
      imageUrl: 'images/flashcards/425-school.png'
    },
    {
      id: '426',
      caption: 'teacher',
      imageUrl: 'images/flashcards/426-teacher.png'
    },
    {
      id: '427',
      caption: 'eraser',
      imageUrl: 'images/flashcards/427-eraser.png'
    },
    {
      id: '428',
      caption: 'ruler',
      imageUrl: 'images/flashcards/428-ruler.png'
    },
    {
      id: '429',
      caption: 'sharpener',
      imageUrl: 'images/flashcards/429-sharpener.png'
    },
    {
      id: '430',
      caption: 'notebook',
      imageUrl: 'images/flashcards/430-notebook.png'
    },

    // Long vowel: i_e, ie, igh
    {
      id: '431',
      caption: 'hike',
      imageUrl: 'images/flashcards/431-hike.png'
    },
    {
      id: '432',
      caption: 'pine',
      imageUrl: 'images/flashcards/432-pine.png'
    },
    {
      id: '433',
      caption: 'five',
      imageUrl: 'images/flashcards/433-five.png'
    },
    {
      id: '434',
      caption: 'kite',
      imageUrl: 'images/flashcards/434-kite.png'
    },
    {
      id: '435',
      caption: 'rise',
      imageUrl: 'images/flashcards/435-rise.png'
    },
    {
      id: '436',
      caption: 'time',
      imageUrl: 'images/flashcards/436-time.png'
    },
    {
      id: '437',
      caption: 'lie',
      imageUrl: 'images/flashcards/437-lie.png'
    },
    {
      id: '438',
      caption: 'pie',
      imageUrl: 'images/flashcards/438-pie.png'
    },
    {
      id: '439',
      caption: 'die',
      imageUrl: 'images/flashcards/439-die.png'
    },
    {
      id: '440',
      caption: 'tie',
      imageUrl: 'images/flashcards/440-tie.png'
    },
    {
      id: '441',
      caption: 'sigh',
      imageUrl: 'images/flashcards/441-sigh.png'
    },
    {
      id: '442',
      caption: 'night',
      imageUrl: 'images/flashcards/442-night.png'
    },
    {
      id: '443',
      caption: 'light',
      imageUrl: 'images/flashcards/443-light.png'
    },
    {
      id: '444',
      caption: 'fight',
      imageUrl: 'images/flashcards/444-fight.png'
    },

    // Long vowel: oa, ow
    {
      id: '445',
      caption: 'oat',
      imageUrl: 'images/flashcards/445-oat.png'
    },
    {
      id: '446',
      caption: 'toad',
      imageUrl: 'images/flashcards/446-toad.png'
    },
    {
      id: '447',
      caption: 'toast',
      imageUrl: 'images/flashcards/447-toast.png'
    },
    {
      id: '448',
      caption: 'grow',
      imageUrl: 'images/flashcards/448-grow.png'
    },
    {
      id: '449',
      caption: 'snow',
      imageUrl: 'images/flashcards/449-snow.png'
    },
    {
      id: '450',
      caption: 'blow',
      imageUrl: 'images/flashcards/450-blow.png'
    },
    {
      id: '451',
      caption: 'window',
      imageUrl: 'images/flashcards/451-window.png'
    }
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
      flashcardIds: ['3', '4', '16', '133', '141', '144', '145', '146', '147', '66']
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
      flashcardIds: ['11', '12', '13', '14', '15', '16', '17', '18'],
      highlightPatterns: ['CK']
    },
    {
      id: 'set6',
      name: 'Short vowel O',
      description: 'Words with short vowel O sound',
      flashcardIds: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      highlightPatterns: ['O']
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
      flashcardIds: ['48', '49', '50', '51', '56', '57', '58', '59'],
      highlightPatterns: ['NG']
    },
    {
      id: 'set10',
      name: 'Consonant pattern: NK',
      description: 'Words with NK consonant pattern',
      flashcardIds: ['52', '53', '54', '55', '60', '61', '62', '63'],
      highlightPatterns: ['NK']
    },
    {
      id: 'set11',
      name: 'Consonant pattern: PH',
      description: 'Words with PH consonant pattern',
      flashcardIds: ['38', '64', '65', '66'],
      highlightPatterns: ['PH']
    },
    {
      id: 'set12',
      name: 'Short vowel U',
      description: 'Words with short vowel U sound',
      flashcardIds: ['67', '68', '69', '70', '71', '72', '73', '74', '75', '76'],
      highlightPatterns: ['U']
    },
    {
      id: 'set13',
      name: 'Handicrafts I',
      description: 'Handicraft materials and items',
      flashcardIds: ['77', '78', '79', '80', '81', '82', '83', '84']
    },
    {
      id: 'set14',
      name: 'Consonant pattern: KN',
      description: 'Words with KN consonant pattern',
      flashcardIds: ['98', '99', '100', '101'],
      highlightPatterns: ['KN']
    },
    {
      id: 'set15',
      name: 'Consonant pattern: TCH',
      description: 'Words with TCH consonant pattern',
      flashcardIds: ['102', '103', '104', '105'],
      highlightPatterns: ['TCH']
    },
    {
      id: 'set16',
      name: 'Consonant pattern: MB',
      description: 'Words with MB consonant pattern',
      flashcardIds: ['106', '107', '108', '109'],
      highlightPatterns: ['MB']
    },
    {
      id: 'set17',
      name: 'Consonant pattern: WR',
      description: 'Words with WR consonant pattern',
      flashcardIds: ['110', '111', '112', '113'],
      highlightPatterns: ['WR']
    },
    {
      id: 'set18',
      name: 'Long Vowel AI / AY',
      description: 'Words with long vowel A sound spelled ai or ay',
      flashcardIds: ['114', '115', '116', '117', '118', '119', '120', '121'],
      highlightPatterns: ['AI', 'AY']
    },
    {
      id: 'set19',
      name: 'Long Vowel A_E',
      description: 'Words with long vowel A sound',
      flashcardIds: ['122', '123', '124', '125', '126', '127', '128', '129'],
      highlightPatterns: ['A', 'E']
    },
    {
      id: 'set20',
      name: 'Letter Dd',
      description: 'Words with Dd sound (beginning, middle, and ending)',
      flashcardIds: ['130', '131', '132', '4', '16', '133', '134', '135', '136', '137', '138'],
      highlightPatterns: ['D']
    },
    {
      id: 'set21',
      name: 'Letter Gg',
      description: 'Words with Gg sound (beginning, middle, and ending)',
      flashcardIds: ['139', '140', '141', '142', '143', '144', '145', '68', '4'],
      highlightPatterns: ['G']
    },
    {
      id: 'set22',
      name: 'Letter Oo',
      description: 'Words with Oo sound (beginning and middle)',
      flashcardIds: ['146', '147', '148', '149', '12', '150'],
      highlightPatterns: ['O']
    },
    {
      id: 'set23',
      name: 'Consonant pattern: G',
      description: 'Words with G consonant pattern (hard and soft G)',
      flashcardIds: ['151', '152', '153', '154', '155', '156', '157', '158'],
      highlightPatterns: ['G']
    },
    {
      id: 'set24',
      name: 'Consonant pattern: C',
      description: 'Words with C consonant pattern (hard and soft C)',
      flashcardIds: ['159', '160', '161', '162', '163', '164', '165', '166'],
      highlightPatterns: ['C']
    },
    {
      id: 'set25',
      name: 'Musical Instruments',
      description: 'Musical instruments vocabulary',
      flashcardIds: ['167', '168', '169', '170', '171', '174', '175', '176']
    },
    {
      id: 'set26',
      name: 'Long vowel: ea',
      description: 'Words with long vowel EA sound',
      flashcardIds: ['177', '178', '179', '180', '181', '182', '183', '184'],
      highlightPatterns: ['EA']
    },
    {
      id: 'set27',
      name: 'Long vowel: ee',
      description: 'Words with long vowel EE sound',
      flashcardIds: ['185', '186', '187', '188', '189', '190', '191', '192'],
      highlightPatterns: ['EE']
    },
    {
      id: 'set28',
      name: 'Tet Holiday',
      description: 'Tet holiday activities',
      flashcardIds: ['193', '194', '195', '196', '197', '198', '199', '200']
    },
    {
      id: 'set29',
      name: 'Tet Symbols',
      description: 'Symbols associated with Tet holiday',
      flashcardIds: ['201', '202', '203', '204', '205', '206']
    },
    {
      id: 'set30',
      name: 'Vowel patterns: oi, oy',
      description: 'Words with oi and oy vowel patterns',
      flashcardIds: ['207', '208', '209', '210', '211', '212', '213', '214'],
      highlightPatterns: ['OI', 'OY']
    },
    {
      id: 'set31',
      name: 'Vowel patterns: ou and ow',
      description: 'Words with ou and ow vowel patterns',
      flashcardIds: ['215', '216', '217', '218', '219', '220', '221', '222'],
      highlightPatterns: ['OU', 'OW']
    },
    {
      id: 'set32',
      name: 'Letter Uu',
      description: 'Words with Uu sound (beginning and middle)',
      flashcardIds: ['223', '224', '225', '226', '227', '2', '70'],
      highlightPatterns: ['U']
    },
    {
      id: 'set33',
      name: 'Letter Ll',
      description: 'Words with Ll sound (beginning and middle)',
      flashcardIds: ['228', '229', '230', '231', '232', '233', '234', '235'],
      highlightPatterns: ['L']
    },
    {
      id: 'set34',
      name: 'Letter Bb',
      description: 'Letter name & sound intro: Bb – beginning, middle, and ending sounds',
      flashcardIds: ['237', '238', '239', '240', '241', '138', '37', '242', '32', '243', '244', '245'],
      highlightPatterns: ['B']
    },
    {
      id: 'set35',
      name: 'Letter Jj',
      description: 'Letter name & sound intro: Jj – beginning sounds',
      flashcardIds: ['246', '247', '248'],
      highlightPatterns: ['J']
    },
    {
      id: 'set36',
      name: 'Letter Ww',
      description: 'Letter name & sound intro: Ww – beginning and middle sounds',
      flashcardIds: ['249', '250', '251', '243', '252', '253', '254'],
      highlightPatterns: ['W']
    },
    {
      id: 'set37',
      name: 'Long vowel: o_e',
      description: 'Words with long vowel O sound (silent e pattern)',
      flashcardIds: ['255', '256', '257', '258', '259', '260', '261', '262'],
      highlightPatterns: ['O', 'E']
    },
    {
      id: 'set38',
      name: 'Vowel pattern: oo',
      description: 'Words with oo vowel pattern',
      flashcardIds: ['263', '9', '264', '265', '266', '267', '268', '269'],
      highlightPatterns: ['OO']
    },
    {
      id: 'set39',
      name: 'Vowel patterns: au, aw',
      description: 'Words with au and aw vowel patterns',
      flashcardIds: ['270', '271', '272', '273', '274', '275', '276', '277'],
      highlightPatterns: ['AU', 'AW']
    },
    {
      id: 'set40',
      name: 'Vowel pattern: ar',
      description: 'Words with ar vowel pattern',
      flashcardIds: ['278', '279', '280', '281'],
      highlightPatterns: ['AR']
    },
    {
      id: 'set41',
      name: 'Caterpillar story',
      description: 'The Very Hungry Caterpillar – characters and caterpillar food',
      flashcardIds: ['282', '283', '284', '285', '286', '8', '287', '233', '288', '148', '289', '290', '291', '292', '293', '294', '295', '296', '297']
    },
    {
      id: 'set42',
      name: 'Vowel pattern: ar, or',
      description: 'Vocabulary from photo set: fork, corn, barn, farm, porch, north, cart, yard',
      flashcardIds: ['298', '299', '281', '278', '300', '301', '279', '280'],
      highlightPatterns: ['AR', 'OR']
    },
    {
      id: 'set43',
      name: 'Vowel patterns: air, are, ear',
      description: 'Words with air, are, and ear vowel patterns',
      flashcardIds: ['302', '303', '304', '305', '306', '307', '308', '287', '309'],
      highlightPatterns: ['AIR', 'ARE', 'EAR']
    },
    {
      id: 'set44',
      name: 'Camping',
      description: 'Camping vocabulary: tent, torch, flashlight, match, map, sleeping bag, backpack',
      flashcardIds: ['310', '311', '311b', '105', '312', '313', '314']
    },
    {
      id: 'set45',
      name: 'Long vowel: u_e',
      description: 'Words with long vowel U sound (silent e pattern)',
      flashcardIds: ['315', '316', '317', '318', '319', '320', '321', '322'],
      highlightPatterns: ['U', 'E']
    },
    {
      id: 'set46',
      name: 'Review short vowel a',
      description: 'Review vocabulary with short vowel A sound',
      flashcardIds: ['3', '323', '324', '325', '326', '327', '312'],
      highlightPatterns: ['A']
    },
    {
      id: 'set47',
      name: 'Review short vowel e',
      description: 'Review vocabulary with short vowel E sound',
      flashcardIds: ['328', '329', '330', '331', '332', '252', '333', '243', '334', '137', '335', '336', '337', '338', '231'],
      highlightPatterns: ['E']
    },
    {
      id: 'set48',
      name: 'Classroom',
      description: 'Classroom rules and activity corner vocabulary',
      flashcardIds: ['339', '340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '350', '351', '352', '353', '354']
    },
    {
      id: 'set49',
      name: 'Review short vowel i',
      description: 'Review vocabulary with short vowel I sound',
      flashcardIds: ['355', '356', '357', '358', '359', '360', '361', '362', '136', '363', '364', '365', '366', '367', '368', '369'],
      highlightPatterns: ['I']
    },
    {
      id: 'set50',
      name: 'Learning Corner',
      description: 'Objects and activities in the learning corner',
      flashcardIds: ['79', '370', '371', '372', '373', '374', '375']
    },
    {
      id: 'set51',
      name: 'Reading Corner',
      description: 'Objects and activities in the reading corner',
      flashcardIds: ['376', '377', '304', '378', '379', '380', '381']
    },
    {
      id: 'set52',
      name: 'Building Corner',
      description: 'Objects and activities in the building corner',
      flashcardIds: ['382', '383', '384', '385', '386']
    },
    {
      id: 'set53',
      name: 'Music Corner',
      description: 'Objects and activities in the music corner',
      flashcardIds: ['387', '388', '389']
    },
    {
      id: 'set54',
      name: 'Disneyland',
      description: 'Disneyland places and characters vocabulary',
      flashcardIds: ['390', '391', '392', '393', '394', '395', '396', '397', '398', '399', '400', '401', '402', '403', '404']
    },
    {
      id: 'set55',
      name: 'Cinderella story',
      description: 'Cinderella story vocabulary: characters, feelings, and concepts',
      flashcardIds: ['399', '405', '406', '407', '393', '408', '239', '409', '410', '411', '5', '412', '413', '414', '415', '416', '417']
    },
    {
      id: 'set56',
      name: 'Pinocchio story',
      description: 'Pinocchio story vocabulary: characters, feelings, concepts, and structure',
      flashcardIds: ['418', '394', '419', '3', '420', '211', '421', '422', '414', '423', '424']
    },
    {
      id: 'set57',
      name: 'School Items',
      description: 'School places, people, and classroom supplies',
      flashcardIds: ['425', '304', '378', '376', '314', '426', '427', '428', '329', '370', '429', '373', '79', '430', '9', '372', '371']
    },
    {
      id: 'set58',
      name: 'Long vowel: i_e',
      description: 'Words with long vowel I sound (silent e pattern)',
      flashcardIds: ['431', '432', '433', '434', '435', '436', '130', '232'],
      highlightPatterns: ['I', 'E']
    },
    {
      id: 'set59',
      name: 'Long vowel: ie',
      description: 'Words with long vowel IE pattern',
      flashcardIds: ['437', '438', '439', '440'],
      highlightPatterns: ['IE']
    },
    {
      id: 'set60',
      name: 'Long vowel: igh',
      description: 'Words with long vowel IGH pattern',
      flashcardIds: ['441', '442', '443', '444'],
      highlightPatterns: ['IGH']
    },
    {
      id: 'set61',
      name: 'Long vowel: oa',
      description: 'Words with long vowel O sound spelled oa',
      flashcardIds: ['445', '446', '141', '447'],
      highlightPatterns: ['OA']
    },
    {
      id: 'set62',
      name: 'Long vowel: ow',
      description: 'Words with long vowel O sound spelled ow',
      flashcardIds: ['448', '449', '450', '451'],
      highlightPatterns: ['OW']
    },
    // {
    //   id: 'set18',
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

  private normalizeFlashcard(flashcard: Flashcard): Flashcard {
    return {
      ...flashcard,
      caption: flashcard.caption.toUpperCase()
    };
  }

  getAllFlashcards(): Flashcard[] {
    return this.flashcards.map(flashcard => this.normalizeFlashcard(flashcard));
  }

  getAllSets(): FlashcardSet[] {
    const sets = [...this.flashcardSets];
    const allSetIndex = sets.findIndex(s => s.id === 'set5');
    const allSet = allSetIndex >= 0 ? sets.splice(allSetIndex, 1)[0] : undefined;
    sets.reverse();
    if (allSet) {
      sets.push(allSet);
    }
    return sets;
  }

  getFlashcardsBySetId(setId: string): Flashcard[] {
    const set = this.flashcardSets.find(s => s.id === setId);
    if (!set) {
      return [];
    }
    return this.flashcards
      .filter(flashcard => set.flashcardIds.includes(flashcard.id))
      .map(flashcard => this.normalizeFlashcard(flashcard));
  }

  getFlashcardsBySetIds(setIds: string[]): Flashcard[] {
    if (!setIds || setIds.length === 0) {
      return [];
    }

    // Use a Map to track unique flashcards by ID (for deduplication)
    const uniqueFlashcards = new Map<string, Flashcard>();

    // Get flashcards from each set
    for (const setId of setIds) {
      const flashcards = this.getFlashcardsBySetId(setId);
      // Add flashcards to map (duplicates will be overwritten, keeping only one instance)
      flashcards.forEach(flashcard => {
        if (!uniqueFlashcards.has(flashcard.id)) {
          uniqueFlashcards.set(flashcard.id, flashcard);
        }
      });
    }

    // Convert map values to array
    return Array.from(uniqueFlashcards.values());
  }

  getHighlightPatternsForFlashcard(flashcardId: string, sets: FlashcardSet[]): string[] | undefined {
    const patterns = new Set<string>();

    for (const set of sets) {
      if (!set.highlightPatterns?.length || !set.flashcardIds.includes(flashcardId)) {
        continue;
      }

      set.highlightPatterns.forEach(pattern => patterns.add(pattern.toUpperCase()));
    }

    return patterns.size > 0 ? Array.from(patterns) : undefined;
  }
}
