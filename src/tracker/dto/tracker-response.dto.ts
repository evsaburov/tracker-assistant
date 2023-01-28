export interface TrackerResponse {
	feed: Feed;
}

export interface Feed {
	id: string;
	link: Link;
	updated: Date;
	title: string;
	entry: Entry[];
	_xmlns: string;
}

export interface Entry {
	id: string;
	link: Link;
	updated: Date;
	title: string;
	author: Author;
	category: Category;
}

export interface Author {
	name: string;
}

export interface Category {
	_term: string;
	_label: string;
}

export interface Link {
	_href: string;
}
