export class Track {
	private readonly _categoryCode: string;
	private readonly _linkImg: string;
	private readonly _fk: number;
	private readonly _link: string;
	private readonly _updated: Date;
	private readonly _title: string;
	private readonly _author: string;
	private readonly _category: string;
	private readonly IMG_NOT_FOUND =
		'https://avatars.mds.yandex.net/i?id=ebef5788e349fab3452f691d24d0f1a74d2f3a93-8340026-images-thumbs&n=13';

	constructor(
		id: string[],
		link: fieldTrack[],
		updated: string,
		title: string[],
		author: fieldTrack[],
		category: categoryTrack[],
	) {
		this._fk = this.getIdFromString(id);
		this._linkImg = this.IMG_NOT_FOUND;
		this._link = this.getLinkFromObject(link);
		this._updated = new Date(updated);
		this._title = this.getTitle(title);
		this._author = this.getAuthorFomString(author);
		[this._category, this._categoryCode] = this.getCategory(category);
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

	public get fk(): number {
		return this._fk;
	}
	public get linkImg(): string {
		return this._linkImg;
	}
	public get categoryCode(): string {
		return this._categoryCode;
	}
	public get category(): string {
		return this._category;
	}
	public get author(): string {
		return this._author;
	}
	public get title(): string {
		return this._title;
	}
	public get updated(): Date {
		return this._updated;
	}
	public get link(): string {
		return this._link;
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
