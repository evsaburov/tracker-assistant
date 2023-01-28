import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const shops = [
	{ id: 1, name: 'Магазин 1', city: 'Челябинск', street: 'пл. Революции', build: '1' },
	{ id: 2, name: 'Магазин 2', city: 'Челябинск', street: 'пр-кт Ленина', build: '5' },
	{ id: 3, name: 'Магазин 3', city: 'Златоуст', street: 'пр-кт Ленина', build: '3' },
	{ id: 4, name: 'Магазин 4', city: 'Златоуст', street: 'ул. Сони Кривой', build: '5' },
	{ id: 5, name: 'Магазин 5', city: 'Златоуст', street: 'ул. Труда', build: '2' },
	{ id: 6, name: 'Магазин 6', city: 'Златоуст', street: 'ул. Худякова', build: '4' },
	{ id: 7, name: 'Магазин 7', city: 'Озерск', street: 'ул. Воровского', build: '5' },
	{ id: 8, name: 'Магазин 8', city: 'Озерск', street: 'ул. Комарова', build: '4' },
	{ id: 9, name: 'Магазин 9', city: 'Снежинск', street: 'ул. Салютная', build: '7' },
	{ id: 10, name: 'Магазин 10', city: 'Снежинск', street: 'ул. Мамина', build: '3' },
	{ id: 11, name: 'Магазин 11', city: 'Магнитогорск', street: 'пл. Мамина', build: '4' },
	{ id: 12, name: 'Магазин 12', city: 'Магнитогорск', street: 'ул. Елкина', build: '6' },
	{ id: 13, name: 'Магазин 13', city: 'Магнитогорск', street: 'ул. Елкина', build: '7' },
	{ id: 14, name: 'Магазин 14', city: 'Миасс', street: 'ул. Блюхера', build: '9' },
	{ id: 15, name: 'Магазин 15', city: 'Чебаркуль', street: 'ул. Дарвина', build: '3' },
	{ id: 16, name: 'Магазин 16', city: 'Чебаркуль', street: 'ул. Румянцева', build: '3' },
	{ id: 17, name: 'Магазин 17', city: 'Чебаркуль', street: 'ул. Гагарина', build: '3' },
];

const shoes = [
	{
		id: 1,
		name: "adidas Originals Men's Stan Smith",
		link: 'https://www.amazon.com/adidas-Originals-Smith-Sneaker-White/dp/B087F1NWL9/ref=sr_1_3?c=ts&keywords=Men%27s+Fashion+Sneakers&qid=1665226576&qu=eyJxc2MiOiIxMy42MSIsInFzYSI6IjEyLjg0IiwicXNwIjoiMTEuNjcifQ%3D%3D&s=apparel&sr=1-3&ts_id=679312011',
		images: 'https://m.media-amazon.com/images/I/61CCEhF7T9L._AC_UX500_.jpg',
	},
	{
		id: 2,
		name: "Skechers Men's Afterburn Memory-Foam Lace-up Sneaker",
		link: 'https://www.amazon.com/Skechers-Afterburn-Memory-Lace-Up-Sneaker/dp/B00FZN1MS6/ref=sr_1_11?c=ts&keywords=Men%27s+Fashion+Sneakers&qid=1665226576&qu=eyJxc2MiOiIxMy42MSIsInFzYSI6IjEyLjg0IiwicXNwIjoiMTEuNjcifQ%3D%3D&s=apparel&sr=1-11&ts_id=679312011',
		images: 'https://m.media-amazon.com/images/I/81sqMokxZzL._AC_UX500_.jpg',
	},
	{
		id: 3,
		name: "Vans Men's Low-Top Sneakers",
		link: 'https://www.amazon.com/Vans-Low-Top-Sneakers-Pewter-Womens/dp/B00K5OWW7A/ref=sr_1_12?c=ts&keywords=Men%27s+Fashion+Sneakers&qid=1665226576&qu=eyJxc2MiOiIxMy42MSIsInFzYSI6IjEyLjg0IiwicXNwIjoiMTEuNjcifQ%3D%3D&s=apparel&sr=1-12&ts_id=679312011',
		images: 'https://m.media-amazon.com/images/I/81iCHtXDcjL._AC_UX500_.jpg',
	},
	{
		id: 4,
		name: "adidas Originals Men's Stan Smith",
		link: 'https://www.amazon.com/Cole-Haan-Stitchlite-Sneaker-Ironstone/dp/B07954DWP3/ref=sr_1_15?c=ts&keywords=Men%27s+Fashion+Sneakers&qid=1665226576&qu=eyJxc2MiOiIxMy42MSIsInFzYSI6IjEyLjg0IiwicXNwIjoiMTEuNjcifQ%3D%3D&s=apparel&sr=1-15&ts_id=679312011',
		images: 'https://m.media-amazon.com/images/I/81RTN2ctDrL._AC_UX500_.jpg',
	},
];

const store = [
	{
		id: 1,
		size: 34,
		color: 'Red',
		amount: 10,
		price: 3000,
		description:
			'Shaft measures approximately low-top from arch, Proprietary stitchlite knit upper with crafted woven leather overlay details',
		catalogId: 1,
	},
	{
		id: 2,
		size: 37,
		color: 'Green',
		amount: 12,
		price: 3300,
		description:
			'Shaft measures approximately low-top from arch, Proprietary stitchlite knit upper with.',
		catalogId: 1,
	},
	{
		id: 3,
		size: 33,
		color: 'White',
		amount: 20,
		price: 6000,
		description:
			'Shaft measures approximately low-top from arch, Proprietary stitchlite knit upper with crafted. ',
		catalogId: 2,
	},
	{
		id: 4,
		size: 28,
		color: 'Magnet',
		amount: 12,
		price: 4600,
		description: 'Shaft measures approximately low-top from arch.',
		catalogId: 3,
	},
	{
		id: 5,
		size: 16,
		color: 'Black',
		amount: 40,
		price: 4500,
		description: 'Shaft measures approximately low-top from arch.',
		catalogId: 4,
	},
	{
		id: 6,
		size: 17,
		color: 'Red',
		amount: 12,
		price: 4700,
		description: 'Shaft measures approximately low-top from arch, Proprietary stitchlite... ',
		catalogId: 4,
	},
	{
		id: 7,
		size: 18,
		color: 'White',
		amount: 4,
		price: 4800,
		description: 'Shaft measures approximately low-top from arch.',
		catalogId: 4,
	},
];

async function main(): Promise<void> {
	prisma.$connect();
	console.log(`Start seeding ...`);

	// create shops
	for (const shop of shops) {
		const shopUpsert = await prisma.shop.upsert({
			where: { id: shop.id },
			update: {},
			create: shop,
		});
		console.log(`Upsert shop with id: ${shopUpsert.id}`);
	}
	// create shoes
	for (const one of shoes) {
		const shoesUpsert = await prisma.catalog.upsert({
			where: { id: one.id },
			update: {},
			create: one,
		});
		console.log(`Upsert shoes with id: ${shoesUpsert.id}`);
	}
	// create store
	for (const one of store) {
		const storeUpsert = await prisma.store.upsert({
			where: { id: one.id },
			update: {},
			create: one,
		});
		console.log(`Upsert store with id: ${storeUpsert.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
