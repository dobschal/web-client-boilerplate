import {PlainNode} from "./render.ts";

export function Link(text: string, href: string): PlainNode {
    return {
        tag: "a",
        text,
        href,

        // If the passed href is an external URL, do not attach the navigo attribute
        ...(href.startsWith("https://") || href.startsWith("http://") ? {} : {'data-navigo': ''})
    };
}