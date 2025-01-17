import type {RequestHandler} from '@sveltejs/kit'

// GET /lessons.json
export const get: RequestHandler = async () => {
	const relativePathsToContent = import.meta.globEager('./content/*.md')
	const lessons = Object.entries(relativePathsToContent)
		.map(([path, {attributes}]) => ({
			attributes,
			href: `/lessons/${path.match(/\.\/content\/_(.+).md/)[1]}`,
		}))
		.sort((a, b) =>
			new Date(a.attributes.date) > new Date(b.attributes.date) ? -1 : 1
		)

	return {
		body: {lessons},
	}
}
