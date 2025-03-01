import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePartnerResourcesFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    partnerName: EntryFieldTypes.Symbol;
    summary: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    topics: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    pdfFile: EntryFieldTypes.AssetLink;
    image?: EntryFieldTypes.AssetLink;
    publishDate: EntryFieldTypes.Date;
    featured?: EntryFieldTypes.Boolean;
}

export type TypePartnerResourcesSkeleton = EntrySkeletonType<TypePartnerResourcesFields, "partnerResources">;
export type TypePartnerResources<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePartnerResourcesSkeleton, Modifiers, Locales>;
