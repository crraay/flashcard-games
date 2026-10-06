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
      imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/567/082/products/6933356301597-6.jpg?v=1746851365663'
    },
    {
      id: '5',
      caption: 'Lego Unicorn',
      imageUrl: 'https://salt.tikicdn.com/cache/w300/ts/product/a8/71/fa/4a171a5cb555870f015c2924d5b18748.jpg'
    },
    {
      id: '6',
      caption: 'Cinnamoroll',
      imageUrl: 'https://cdn11.bigcommerce.com/s-89ffd/images/stencil/728x728/products/135656/487496/4550337234631_c86577c2c22ae8838e11b2178dc7babf__96693.1695266504.jpg?c=2'
    },
    {
      id: '7',
      caption: 'Kuromi',
      imageUrl: 'https://cdn11.bigcommerce.com/s-miruu5f5ec/images/stencil/728x728/products/2021/12325/Sanrio-Kuromi-Plush-Medium-1__20045.1671057507.jpg?c=2'
    },
    {
      id: '8',
      caption: 'Hello Kitty',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/052/921/531/non_2x/blue-hello-kitty-free-vector.jpg'
    },
    {
      id: '9',
      caption: 'Robot',
      imageUrl: 'https://www.thelittlelearnerstoys.com/cdn/shop/files/robby-the-robot-interactive-toy-1.jpg?v=1762847960'
    },
    {
      id: '10',
      caption: 'Dinosaur',
      imageUrl: 'https://media.istockphoto.com/id/1440486497/vector/little-cartoon-tyrannosaurus-dinosaur.jpg?s=612x612&w=0&k=20&c=rEPIxJh0yQPUNdHDdUB0Om5KnJPL8k2G5lvyLqUjzG8='
    },
    {
      id: '11',
      caption: 'Teddy Bear',
      imageUrl: 'https://www.buildabear.co.uk/dw/image/v2/BBNG_PRD/on/demandware.static/-/Sites-buildabear-master/default/dwa49d338d/29231221227229x20237010.jpg?sw=800&sh=800&sm=fit'
    },
    {
      id: '12',
      caption: 'Slime',
      imageUrl: 'https://www.crazyaarons.com/cdn/shop/files/CosmicMatter_Dripping.jpg?v=1775225944&width=1445'
    },
    {
      id: '13',
      caption: 'Capibara',
      imageUrl: 'https://m.media-amazon.com/images/I/510jrZgVARL.jpg'
    },
    {
      id: '14',
      caption: 'Spiderman',
      imageUrl: 'https://easydrawingguides.com/wp-content/uploads/2021/02/how-to-draw-a-chibi-spider-man-featured-image-1200.png'
    },
    {
      id: '15',
      caption: 'LOL Doll',
      imageUrl: 'https://shop.mgae.com/cdn/shop/files/567523-Princess-Baby-Sistersx.jpg?v=1761326487&width=800'
    },
    {
      id: '16',
      caption: 'Minon',
      imageUrl: 'https://file.hstatic.net/1000231532/file/cua_hang_ban_minion_stuart_laughing_action_figure_grande.jpg'
    },
    {
      id: '17',
      caption: 'Doraemon',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png'
    },
    {
      id: '18',
      caption: 'Baby Cry',
      imageUrl: 'https://product.hstatic.net/200000863773/product/remove-bg.ai_1733232751906_56282c9f079041d196c500b986ac9ce5_grande.png'
    },
    {
      id: '19',
      caption: 'Creeper',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/4/49/Creeper_%28Minecraft%29.png'
    },
    {
      id: '20',
      caption: 'Sword',
      imageUrl: 'https://preview.redd.it/uqoo11j3qzs31.jpg?width=640&crop=smart&auto=webp&s=8981138c1e854e1c738a10c63b250a22c33364d4'
    },
    {
      id: '21',
      caption: 'Lego Set',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7eD7nXRv4nNC9YadahKsD9BqhdyItjg2Itg&s'
    },
    {
      id: '22',
      caption: 'Transformer',
      imageUrl: 'https://cdn.hswstatic.com/gif/real-transformer-movie-5.jpg'
    },
    {
      id: '23',
      caption: 'Barbie Mermaid',
      imageUrl: 'https://en.barbiepedia.com/img/barbie/800/1434_mermaid_0.jpg'
    },
    {
      id: '24',
      caption: 'Puzzle',
      imageUrl: 'https://www.arjoos.com/cdn/shop/files/Frank-Disney-Frozen-Jigsaw--Puzzle-1.jpg?v=1718021319&width=1445'
    },
    {
      id: '25',
      caption: 'Mickey Mouse',
      imageUrl: 'https://www.mykingdom.com.vn/cdn/shop/products/ag2101021_02.jpg?v=1724298294&width=600'
    },
    {
      id: '26',
      caption: 'Furby',
      imageUrl: 'https://down-vn.img.susercontent.com/file/sg-11134201-7rcf4-ltt2e1bs13t89e'
    },
    {
      id: '27',
      caption: 'Monster',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0731/6514/4343/t/7/assets/mykingdom-do-choi-schleich-2.jpg?v=1686019275'
    },
    {
      id: '28',
      caption: 'Steve',
      imageUrl: 'https://s.namemc.com/3d/skin/body.png?id=59e3a240bd150317&model=classic&width=308&height=308'
    },
    {
      id: '29',
      caption: 'Skeleton',
      imageUrl: 'https://png.pngtree.com/png-vector/20241119/ourlarge/pngtree-cute-pink-skeleton-toy-for-children-png-image_14498543.png'
    },
    {
      id: '30',
      caption: 'Pickaxe',
      imageUrl: 'https://i5.walmartimages.com/seo/Minecraft-Diamond-Foam-Pickaxe-Exclusive_a8f35304-e644-45c9-84a7-1b55bb82f19f.a24c0e8dc764fb51f2d8fa3cb0a56099.jpeg'
    },
    {
      id: '31',
      caption: 'Barbie',
      imageUrl: 'https://www.mykingdom.com.vn/cdn/shop/products/hcn46_6.jpg'
    },
    {
      id: '32',
      caption: 'Minecraft',
      imageUrl: 'https://bizweb.dktcdn.net/thumb/grande/100/096/240/products/332889021114-1.jpg?v=1465878381727'
    },
    {
      id: '34',
      caption: 'Mermaid Doll',
      imageUrl: 'https://m.media-amazon.com/images/I/71peXjYVrIL._AC_UF894,1000_QL80_.jpg'
    },
    {
      id: '35',
      caption: 'Donald Duck',
      imageUrl: 'https://www.kidrobot.com/cdn/shop/products/disney-donald-duck-7-5-phunny-plush-by-kidrobot-default-title-plush-21180216737889.jpg?v=1774436055'
    },
    {
      id: '36',
      caption: 'Bratz',
      imageUrl: 'https://media.very.ie/i/littlewoodsireland/WONUA_SQ1_0000000099_N_A_SLf?$pdp_300x400_x2$&fmt=jpg'
    },
    {
      id: '37',
      caption: 'Matcha Bubble Tea',
      imageUrl: 'https://down-vn.img.susercontent.com/file/6c761edfe7c1456cb97fa57c32a1ac6e'
    },
    {
      id: '38',
      caption: 'Play Doh Ice Maker',
      imageUrl: 'https://static01.galaxus.com/productimages/8/8/6/7/8/3/0/1/9/3/6/0/1/3/2/6/9/7/5/6db5b771-6fbf-49a5-97e7-b9518ac1cc97_cropped.jpg_720.jpeg'
    },
    {
      id: '39',
      caption: 'Peppa Pig Backpack',
      imageUrl: 'https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m30ua134jo4nc8'
    },
    {
      id: '40',
      caption: 'Dinosaurs with Kids Toys',
      imageUrl: 'https://m.media-amazon.com/images/I/51OJiz1JuaL._SL500_.jpg'
    },
    {
      id: '41',
      caption: 'Squishmallow',
      imageUrl: 'https://netjatek.hu/images/common/products/large/26/41/264155-1-squishmallows-miriam-pluche-20-cm-1742379110943674.webp'
    },
    {
      id: '42',
      caption: 'Bluey Toy',
      imageUrl: 'https://m.media-amazon.com/images/I/71uNwW3XAaL._AC_UF894,1000_QL80_.jpg'
    },
    {
      id: '43',
      caption: 'Dinosaur Digging',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-S0_cYaIEeg0RNV6Gg4hvX3mdI87NVn2FNg&s'
    },
    {
      id: '44',
      caption: 'Dinosaur Egg',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0KfQezepOxA9J2LIT7Si2_ubng_KjBLvYg&s'
    },
    {
      id: '45',
      caption: 'Doctor Playset',
      imageUrl: 'https://i5.walmartimages.com/seo/Battat-Mini-Medic-Doctor-Plastic-Play-Set-with-10pcs-and-Storage-Bag-Toddler-and-Preschool-Toys_bd66b768-8021-4c94-bb17-f5b6c926292a.360df755d9898fda8f879b2570b05a9c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'
    },
    {
      id: '46',
      caption: 'Building Blocks',
      imageUrl: 'https://kidsroar.in/cdn/shop/products/500-pieces-building-bricks-bulk-blocks-toy-big-pack-of-basic-original-imag3ayscjfqvja2_416x.webp?v=1676706200'
    },
    {
      id: '47',
      caption: 'Number Blocks',
      imageUrl: 'https://i.etsystatic.com/23407641/r/il/a6ca66/3712890992/il_1080xN.3712890992_vqrd.jpg'
    },
    {
      id: '48',
      caption: '100 Points',
      imageUrl: 'https://thumb.ac-illust.com/41/41e2dea8364c2f22f72cc3227c4f2af8_t.jpeg'
    }
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
