export class Track {
	readonly categoryCode: string;
	readonly linkImg: string;
	readonly fk: number;
	readonly link: string;
	readonly updated: Date;
	readonly title: string;
	readonly author: string;
	readonly category: string;

	constructor(
		id: string[],
		link: fieldTrack[],
		updated: string,
		title: string[],
		author: fieldTrack[],
		category: categoryTrack[],
	) {
		this.fk = this.getIdFromString(id);
		this.linkImg =
			'https://avatars.mds.yandex.net/i?id=ebef5788e349fab3452f691d24d0f1a74d2f3a93-8340026-images-thumbs&n=13';
		this.link = this.getLinkFromObject(link);
		this.updated = new Date(updated);
		this.title = this.getTitle(title);
		this.author = this.getAuthorFomString(author);
		[this.category, this.categoryCode] = this.getCategory(category);
	}

	private getTitle(row: string[]): string {
		return row[0];
	}

	private getCategory(obj: categoryTrack[]): string[] {
		return [obj[0]['$']['label'], obj[0]['$']['term']];
	}

	private getAuthorFomString(row: fieldTrack[]): string {
		return row[0]['name'][0];
	}

	private getIdFromString(row: string[]): number {
		const fk = row[0].split('/').pop();
		if (fk === undefined) throw new Error('[getIdFromString] Ошибка парсинга id');
		return parseInt(fk);
	}

	private getLinkFromObject<T extends fieldTrack>(obj: T[]): string {
		return obj[0]['$']['href'];
	}
}

interface fieldTrack {
	[key: string]: { [key: string]: string };
}

interface categoryTrack {
	[key: string]: {
		[key: string]: string;
	};
}
