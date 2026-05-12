declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"2022-1-23-随笔-优秀的-PM.md": {
	id: "2022-1-23-随笔-优秀的-PM.md";
  slug: "2022-1-23-随笔-优秀的-pm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2022-1-26-点淘（淘宝直播）产品分析.md": {
	id: "2022-1-26-点淘（淘宝直播）产品分析.md";
  slug: "2022-1-26-点淘淘宝直播产品分析";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"A-global-analysis-of-the-impact-of-COVID-19.md": {
	id: "A-global-analysis-of-the-impact-of-COVID-19.md";
  slug: "a-global-analysis-of-the-impact-of-covid-19";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI时代每个人都要懂的概念.md": {
	id: "AI时代每个人都要懂的概念.md";
  slug: "ai时代每个人都要懂的概念";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"After-watching-video-about-Polar-Codes.md": {
	id: "After-watching-video-about-Polar-Codes.md";
  slug: "after-watching-video-about-polar-codes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Crime-Feeds-on-Legal-Activities-Daily-Mobility-Flows-Help-to-Explain-Thieves-Target-Location-Choices.md": {
	id: "Crime-Feeds-on-Legal-Activities-Daily-Mobility-Flows-Help-to-Explain-Thieves-Target-Location-Choices.md";
  slug: "crime-feeds-on-legal-activities-daily-mobility-flows-help-to-explain-thieves-target-location-choices";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"DBSCAN-算法.md": {
	id: "DBSCAN-算法.md";
  slug: "dbscan-算法";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ES6模块化.md": {
	id: "ES6模块化.md";
  slug: "es6模块化";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"GitBug总结.md": {
	id: "GitBug总结.md";
  slug: "gitbug总结";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Go-language.md": {
	id: "Go-language.md";
  slug: "go-language";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Golang-Web.md": {
	id: "Golang-Web.md";
  slug: "golang-web";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-to-hexo-blog.md": {
	id: "How-to-hexo-blog.md";
  slug: "how-to-hexo-blog";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Inspired-From-Professer-Song.md": {
	id: "Inspired-From-Professer-Song.md";
  slug: "inspired-from-professer-song";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Location-Choice-of-Snatching-Offenders-in-Chennai-City.md": {
	id: "Location-Choice-of-Snatching-Offenders-in-Chennai-City.md";
  slug: "location-choice-of-snatching-offenders-in-chennai-city";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"MBTI-爆火背后的需求.md": {
	id: "MBTI-爆火背后的需求.md";
  slug: "mbti-爆火背后的需求";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"My-first-bolg.md": {
	id: "My-first-bolg.md";
  slug: "my-first-bolg";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Statistical-Learning-with-R.md": {
	id: "Statistical-Learning-with-R.md";
  slug: "statistical-learning-with-r";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"css-样式书写规范.md": {
	id: "css-样式书写规范.md";
  slug: "css-样式书写规范";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"产品经理的思维方式.md": {
	id: "产品经理的思维方式.md";
  slug: "产品经理的思维方式";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"什么是-NFT-音乐股票又是啥.md": {
	id: "什么是-NFT-音乐股票又是啥.md";
  slug: "什么是-nft-音乐股票又是啥";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"前端-HTTP-知识总结.md": {
	id: "前端-HTTP-知识总结.md";
  slug: "前端-http-知识总结";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"前端工程师进阶笔记.md": {
	id: "前端工程师进阶笔记.md";
  slug: "前端工程师进阶笔记";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"前端跨域知识总结.md": {
	id: "前端跨域知识总结.md";
  slug: "前端跨域知识总结";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"好的产品原型有哪些特点.md": {
	id: "好的产品原型有哪些特点.md";
  slug: "好的产品原型有哪些特点";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我平凡且又不平凡的2021.md": {
	id: "我平凡且又不平凡的2021.md";
  slug: "我平凡且又不平凡的2021";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"深度学习与神经网络.md": {
	id: "深度学习与神经网络.md";
  slug: "深度学习与神经网络";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"疫情封控下的温暖.md": {
	id: "疫情封控下的温暖.md";
  slug: "疫情封控下的温暖";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"统计学习方法-李航.md": {
	id: "统计学习方法-李航.md";
  slug: "统计学习方法-李航";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"认知负荷.md": {
	id: "认知负荷.md";
  slug: "认知负荷";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"读《人人都是产品经理》有感.md": {
	id: "读《人人都是产品经理》有感.md";
  slug: "读人人都是产品经理有感";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
