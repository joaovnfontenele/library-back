import epub from 'epub-gen-memory';
import type { Options } from 'epub-gen-memory';
import { Book } from 'src/modules/book/entities/book'


export class MergeEpub {

    static async merge({ id, title, image, chapters, siteId }: Book): Promise<any> {

        try {

            let content = [] as any

            const siteMergeOptions = {
                //novelhall
                "01e42894-4916-4e2d-8615-f80db0a0ba1e": async () => {

                    chapters?.map((item) => {
                        let data = ``
                        item.paragraphs.map((paragraph) => {
                            data = `${data}<p>${paragraph.content}</p>`
                        })

                        content.push({
                            title: `Capítulo ${item.number}`,
                            content: `<h2>${item.title}</h2>${data}`
                        })
                    })

                }
            }

            const option: Options = {
                title: title,
                cover: image ? image : '',

            }

            if (siteId in siteMergeOptions) {

                await siteMergeOptions[siteId]()
            } else {
                chapters?.map((item) => {
                    let data = ``
                    item.paragraphs.map((paragraph) => {
                        data = `${data}<p>${paragraph.content}</p>`
                    })

                    content.push({
                        title: item.title,
                        content: data
                    },)
                })
            }

            const buffer = await epub(option, content)

            return buffer
        } catch (error) {
            throw new Error(error)
        }

    }

}


// export function createBookEpub(book: BookDTO, image?: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//         try {
//             let content = [] as any
//             book.chapter.map((item) => {
//                 let data = ``
//                 item.paragraphs.map((paragraph) => {
//                     data = `${data}<p>${paragraph.content}</p>`
//                 })
//                 content.push({
//                     title: item.title,
//                     data: data
//                 },)
//             })
//             const option: Epub.Options = {
//                 title: book.title,
//                 cover: image ? image : '',
//                 content: content
//             }

//             const nameFile = join(process.cwd(), 'files', `${book.id}.epub`)

//             const epub = new Epub(option, nameFile)



//             resolve(epub)

//         } catch (error) {
//             reject(error)
//         }
//     })
// }
