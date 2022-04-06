

export function seo(data = {}) {
    data.title = data.title || "Default";
    data.metaDescription = data.metaDescription || 'Default description';

    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
}