import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeEventFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    location: EntryFieldTypes.Symbol;
    summary: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    registrationLink?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    qrCodeImage?: EntryFieldTypes.AssetLink;
    featured?: EntryFieldTypes.Boolean;
    date: EntryFieldTypes.Date;
}

export type TypeEventSkeleton = EntrySkeletonType<TypeEventFields, "event">;
export type TypeEvent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEventSkeleton, Modifiers, Locales>;
