function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        //eslint-disable-next-line
        .replace(/\s+/g, "-") // Replace spaces with -
        //eslint-disable-next-line
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        //eslint-disable-next-line
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        //eslint-disable-next-line
        .replace(/^-+/, "") // Trim - from start of text
        //eslint-disable-next-line
        .replace(/-+$/, ""); // Trim - from end of text
        //eslint-disable-next-line
}

export default {
    slugify
}