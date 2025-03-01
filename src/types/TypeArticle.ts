import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    summary: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    author: EntryFieldTypes.Symbol;
    publishDate: EntryFieldTypes.Date;
    image?: EntryFieldTypes.AssetLink;
    topics?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    featured?: EntryFieldTypes.Boolean;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;
