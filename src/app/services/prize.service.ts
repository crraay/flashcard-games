import { Injectable } from '@angular/core';
import { Prize } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private prizes: Prize[] = [
    {
      id: '1',
      caption: 'Red Labubu',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/051/895/584/non_2x/pink-labubu-illustration-free-vector.jpg'
    },
    {
      id: '2',
      caption: 'Blue Labubu',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/051/895/588/non_2x/blue-labubu-illustration-free-vector.jpg'
    },
    {
      id: '3',
      caption: 'Elsa',
      imageUrl: 'https://i.pinimg.com/564x/76/a7/bf/76a7bf34596fed510d97aa3b60288fe1.jpg'
    },
    {
      id: '4',
      caption: 'Pokemon',
      imageUrl: 'https://w7.pngwing.com/pngs/773/168/png-transparent-pokemon-pikachu-illustration-pokemon-go-pokemon-yellow-pikachu-ash-ketchum-pikachu-mammal-vertebrate-video-game-thumbnail.png'
    },
    {
      id: '5',
      caption: 'Lego Unicorn',
      imageUrl: 'https://salt.tikicdn.com/cache/w300/ts/product/a8/71/fa/4a171a5cb555870f015c2924d5b18748.jpg'
    },
    // {
    //   id: '6',
    //   caption: 'Fireworks',
    //   imageUrl: 'https://img.freepik.com/premium-vector/fireworks-icon-isolated-white-background_120819-1209.jpg'
    // },
    // {
    //   id: '7',
    //   caption: 'Diamond',
    //   imageUrl: 'https://img.freepik.com/premium-vector/diamond-icon-isolated-white-background_120819-1210.jpg'
    // },
    // {
    //   id: '8',
    //   caption: 'Rocket',
    //   imageUrl: 'https://img.freepik.com/premium-vector/rocket-icon-isolated-white-background_120819-1211.jpg'
    // },
    // {
    //   id: '9',
    //   caption: 'Rainbow Star',
    //   imageUrl: 'https://img.freepik.com/premium-vector/rainbow-star-icon-isolated-white-background_120819-1212.jpg'
    // },
    // {
    //   id: '10',
    //   caption: 'Champion Badge',
    //   imageUrl: 'https://img.freepik.com/premium-vector/champion-badge-icon-isolated-white-background_120819-1213.jpg'
    // }
  ];

  constructor() { }

  getAllPrizes(): Prize[] {
    return [...this.prizes];
  }

  getRandomPrize(): Prize {
    const randomIndex = Math.floor(Math.random() * this.prizes.length);
    return this.prizes[randomIndex];
  }
}
